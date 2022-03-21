import fg from 'fast-glob';
import get from 'lodash/get';
import path from 'path';

import { idToPathBlogParams, idToPathParams } from './getStaticPathsHelper';
import { pageDirectories } from './page-setup';

export const getPageDirectory = (
  pages: { [index: string]: string },
  pageType: string
) => {
  return path.resolve(process.cwd(), get(pages, pageType));
};

/**
 * The documentation is written in English and German;
 * the document engine uses internationalization.
 *
 * abc => folder-name
 * - en.mdx | en => file-name => locale
 * - de.mdx | de => file-name => locale
 *
 * generated paths: /${locale}/${folder-name}
 */

export const getPath = async (pageType: string) => {
  const sourceDirectory = getPageDirectory(pageDirectories, pageType);
  const files = await fg(['**/*.{md,mdx}'], { cwd: sourceDirectory });
  const paths = files.map(file => idToPathParams(file));
  return paths;
};

const locales = ['en', 'de'];

/**
 * The blog is written in English, while certain parts of the
 * blog engine use internationalization, such as the table of contents.
 *
 * To span the paths associated with a blog entry,
 * all the languages mapped in the blog engine must be considered.
 *
 * Flat structure, no folders
 * abc.mdx | abc => file-name
 *
 * supported locales
 * - en
 * - en
 *
 * generated paths: /${locale}/${file-name}
 */

export const getBlogPath = async (pageType: string) => {
  const sourceDirectory = getPageDirectory(pageDirectories, pageType);
  const files = await fg(['**/*.{md,mdx}'], { cwd: sourceDirectory });
  const paths = locales
    .map(locale => {
      return files.map(file => {
        return idToPathBlogParams(file, locale);
      });
    })
    .flat();
  return paths;
};
