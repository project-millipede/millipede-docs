import { Components } from '@page/layout';
import fg from 'fast-glob';
import { promises as fsPromises } from 'fs';
import isArray from 'lodash/isArray';
import { bundleMDX } from 'mdx-bundler';
import { GetStaticPropsContext } from 'next';
import path from 'path';
import remarkSlug from 'remark-slug';

import { getMetadata } from './getMetadata';
import { getPageDirectory } from './getPath';
import { blogComponents, docComponents } from './page-config';
import { pageDirectories } from './page-setup';
import { getHydratedComponents } from './utils/hydration';

const {
  Toc: { generateToc, filterToc }
} = Components;

export const getContent = async (
  ctx: GetStaticPropsContext,
  pageType: string
) => {
  const {
    params: { slug },
    locale
  } = ctx;

  const sourceDirectory = getPageDirectory(pageDirectories, pageType);

  const pathname = isArray(slug) ? slug.join(path.sep) : slug;
  const [file] = await fg(`${pathname}/${locale}.{md,mdx}`, {
    cwd: sourceDirectory
  });

  const mdFile = path.join(sourceDirectory, file);
  const fileContents = await fsPromises.readFile(mdFile);

  const { metaData, content } = await getMetadata(fileContents);

  const {
    data: { toc }
  } = await generateToc(content);
  const filteredToc = filterToc(toc);

  const hydratedComponents = getHydratedComponents(content, docComponents);

  const mdxSource = await bundleMDX({
    source: content,
    xdmOptions: options => {
      // eslint-disable-next-line no-param-reassign
      options.remarkPlugins = [remarkSlug];
      return options;
    }
  });

  return {
    mdxSource,
    metaData,
    hydratedComponents,
    slug,
    toc: filteredToc
  };
};

export const getBlogContent = async (
  ctx: GetStaticPropsContext,
  pageType: string
) => {
  const {
    params: { slug }
  } = ctx;

  const sourceDirectory = getPageDirectory(pageDirectories, pageType);

  const pathname = isArray(slug) ? slug.join(path.sep) : slug;
  const [file] = await fg(`${pathname}.{md,mdx}`, {
    cwd: sourceDirectory
  });

  const mdFile = path.join(sourceDirectory, file);
  const fileContents = await fsPromises.readFile(mdFile);

  const { metaData, content } = await getMetadata(fileContents);

  const {
    data: { toc }
  } = await generateToc(content);
  const filteredToc = filterToc(toc);

  const hydratedComponents = getHydratedComponents(content, blogComponents);

  const mdxSource = await bundleMDX({
    source: content,
    xdmOptions: options => {
      // eslint-disable-next-line no-param-reassign
      options.remarkPlugins = [remarkSlug];
      return options;
    }
  });

  return {
    mdxSource,
    metaData,
    hydratedComponents,
    slug,
    toc: filteredToc
  };
};

export const getContentBlogIndex = async (pageType: string) => {
  const sourceDirectory = getPageDirectory(pageDirectories, pageType);

  const files = await fg(['**/*.{md,mdx}'], { cwd: sourceDirectory });

  const posts = await Promise.all(
    files.map(async file => {
      const mdFile = path.join(sourceDirectory, file);
      const fileContents = await fsPromises.readFile(mdFile);
      const { metaData } = await getMetadata(fileContents);
      const [slug] = file.split('.');
      return {
        metaData,
        slug
      };
    })
  );

  return posts;
};
