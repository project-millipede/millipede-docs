import { loadPages } from '@app/layout';
import { Navigation } from '@app/types';
import { RouterUtils } from '@app/utils';
import fg from 'fast-glob';
import { promises as fsPromises } from 'fs';
import isArray from 'lodash/isArray';
import { GetStaticPropsContext } from 'next';
import path from 'path';

import { getMetadata } from './getMetadata';
import { getPageDirectory } from './getPath';
import { pageDirectories } from './page-config';

/**
 * Create the navigation structure for pages such as documentation and blog.
 * Load and pre-process page definitions to determine active and expanded
 * pages used within various navigation components, such as
 * - tree-based navigation,
 * - previous/following page navigation and
 * - breadcrumbs.
 */

/**
 * The navigation structure is nested; the determination is static.
 * Information for positioning, grouping (nesting), the path to pages, and resources (icons)
 * get loaded from a hand-maintained structure.
 */

export const getNavigation = async (
  ctx: GetStaticPropsContext
): Promise<Navigation> => {
  const { params: { slug } = { slug: [] } } = ctx;

  const pathname = isArray(slug) ? slug.join(path.sep) : slug;
  const pages = loadPages();

  const flattenedPages = RouterUtils.flatten(pages, 'children');
  const activePage = RouterUtils.getActivePage(flattenedPages, pathname);
  const expandedPages = RouterUtils.getExpandedPages(activePage.pathname);

  return {
    pages,
    flattenedPages,
    activePage,
    expandedPages,
    pageType: 'docs'
  };
};

/**
 * The navigation structure is flat; the determination is dynamic.
 * Relevant information such as positioning (date of publishing) gets
 * determined from metadata embedded in the respective document.
 * Due to the flat hierarchy, aspects for grouping and determining
 * a page's path are not required.
 *
 * Note:
 * Gather the title of an individual blog post.
 * The title gets used in breadcrumb and the blog navigation stepper
 * component (walking to the previous and subsequent blog post).
 * Executing a meta-data gathering process for reading the title seems
 * unnecessary overhead; assumed the file name is correctly pronounced,
 * the file name could correspond to a blog posts title.
 */

export const getBlogNavigation = async (
  ctx: GetStaticPropsContext,
  pageType: string
): Promise<Navigation> => {
  const { params: { slug } = { slug: [] } } = ctx;

  const pathname = isArray(slug) ? slug.join(path.sep) : slug;

  const sourceDirectory = getPageDirectory(pageDirectories, pageType);

  const files = await fg(['**/*.{md,mdx}'], { cwd: sourceDirectory });

  const pages = await Promise.all(
    files.map(async file => {
      const mdFile = path.join(sourceDirectory, file);
      const fileContents = await fsPromises.readFile(mdFile);
      const { metaData } = await getMetadata(fileContents);
      const [pathname] = file.split('.');
      return {
        pathname,
        title: metaData.title
      };
    })
  );

  const activePage = RouterUtils.getActivePage(pages, pathname);

  return {
    pages,
    flattenedPages: pages,
    activePage,
    expandedPages: [],
    pageType: 'blog'
  };
};
