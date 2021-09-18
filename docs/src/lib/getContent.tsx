import { Components } from '@page/layout';
import fg from 'fast-glob';
import fs from 'fs';
import isArray from 'lodash/isArray';
import { bundleMDX } from 'mdx-bundler';
import { GetStaticPropsContext } from 'next';
import path from 'path';
import remarkSlug from 'remark-slug';

import { getHydrationComponentsList } from './getComponents';
import { getMetadata } from './getMetadata';
import { getPageDirectory } from './pages';

const {
  Toc: { generateToc, filterToc }
} = Components;

const fsPromises = fs.promises;

export const getContent = async (
  ctx: GetStaticPropsContext,
  pageType: string
) => {
  const {
    params: { slug },
    locale
  } = ctx;

  const sourceDirectory = getPageDirectory(pageType);

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

  const hydrationComponentsList = getHydrationComponentsList(content);

  const mdxSource = await bundleMDX(content, {
    xdmOptions: options => {
      options.remarkPlugins = [remarkSlug];
      return options;
    }
  });

  return {
    mdxSource,
    metaData,
    hydrationComponentsList,
    slug,
    toc: filteredToc || []
  };
};
