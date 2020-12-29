import { render } from '@app/mdx-compile';
import { Mdx } from '@page/layout';
import fg from 'fast-glob';
import fs from 'fs';
import { isArray } from 'lodash';
import { GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';
import path from 'path';
import remarkSlug from 'remark-slug';

import { getComponents, getHydrationComponentsList } from './getComponents';
import { getMetadata } from './getMetadata';
import { getPageDirectory } from './pages';

const h2 = dynamic(() => import('@page/layout').then(module => module.Mdx.h2));
const h3 = dynamic(() => import('@page/layout').then(module => module.Mdx.h3));
const h4 = dynamic(() => import('@page/layout').then(module => module.Mdx.h4));
const h5 = dynamic(() => import('@page/layout').then(module => module.Mdx.h5));
const h6 = dynamic(() => import('@page/layout').then(module => module.Mdx.h6));

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

  const { disableShare, ...restMetaData } = metaData;

  const hydrationComponentsList = getHydrationComponentsList(content);

  const mdxSource = await render(content, {
    components: {
      ...getComponents(hydrationComponentsList),
      h1: Mdx.h1({ disableShare, meta: restMetaData }),
      h2,
      h3,
      h4,
      h5,
      h6
    },
    compileOptions: {
      remarkPlugins: [remarkSlug],
      rehypePlugins: [],
      compilers: [],
      resourceToURL(s) {
        return s;
      }
    }
  });

  return {
    mdxSource,
    metaData,
    hydrationComponentsList,
    rawContent: content
  };
};
