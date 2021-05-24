import { render } from '@app/mdx-compile';
import { Mdx } from '@page/layout';
import fg from 'fast-glob';
import fs from 'fs';
import isArray from 'lodash/isArray';
import { GetStaticPropsContext } from 'next';
import path from 'path';
import { isMobile } from 'react-device-detect';
import remarkSlug from 'remark-slug';

import { getComponents, getHydrationComponentsList } from './getComponents';
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

  const { disableShare, ...restMetaData } = metaData;

  const hydrationComponentsList = getHydrationComponentsList(content);

  const mdxSource = await render(content, {
    components: {
      ...getComponents(hydrationComponentsList),
      h1: Mdx.h1({ disableShare, meta: restMetaData }),
      h2: Mdx.h2({ isMobile: isMobile }),
      h3: Mdx.h3({ isMobile: isMobile }),
      h4: Mdx.h4({ isMobile: isMobile }),
      h5: Mdx.h5,
      h6: Mdx.h6
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
