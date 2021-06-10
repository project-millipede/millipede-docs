import fg from 'fast-glob';
import fs from 'fs';
import isArray from 'lodash/isArray';
import { GetStaticPropsContext } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import remarkSlug from 'remark-slug';

import { getHydrationComponentsList } from './getComponents';
import { getMetadata } from './getMetadata';
import { getPageDirectory } from './pages';

const fsPromises = fs.promises;

export const getContent = async (
  context: GetStaticPropsContext,
  pageType: string
) => {
  const {
    params: { slug },
    locale
  } = context;

  if (!slug || !locale) {
    throw new Error(`"slug" and "locale" are required for page props`);
  }

  const sourceDirectory = getPageDirectory(pageType);

  const pathNoExt = isArray(slug) ? slug.join(path.sep) || '.' : slug;

  const [file] = await fg(`${pathNoExt}/${locale}.{md,mdx}`, {
    cwd: sourceDirectory
  });

  const mdFile = path.join(sourceDirectory, file);

  const fileContents = await fsPromises.readFile(mdFile);

  const { metaData, content } = await getMetadata(fileContents);

  const hydrationComponentsList = getHydrationComponentsList(content);

  const mdxSource = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkSlug] }
  });

  return {
    mdxSource,
    metaData,
    hydrationComponentsList,
    rawContent: content
  };
};
