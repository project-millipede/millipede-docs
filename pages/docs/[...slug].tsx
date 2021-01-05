import { useMdx } from '@app/mdx-runtime';
import { Mdx } from '@page/layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { mergeProps } from 'next-merge-props';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import { isMobile } from 'react-device-detect';

import { getComponents } from '../../docs/src/lib/getComponents';
import { getPath } from '../../docs/src/lib/getPath';
import { GetStaticContentProps, getStaticContentProps } from '../../docs/src/lib/getStaticContentProps';
import { GetStaticTranslationProps, getStaticTranslationProps } from '../../docs/src/lib/getStaticTranslationProps';

const MdxDocs = dynamic(() =>
  import('@page/layout').then(module => module.Mdx.MdxDocs)
);
const MdxDocsMobile = dynamic(() =>
  import('@page/layout').then(module => module.Mdx.MdxDocsMobile)
);

const h2 = dynamic(() => import('@page/layout').then(module => module.Mdx.h2));
const h3 = dynamic(() => import('@page/layout').then(module => module.Mdx.h3));
const h4 = dynamic(() => import('@page/layout').then(module => module.Mdx.h4));
const h5 = dynamic(() => import('@page/layout').then(module => module.Mdx.h5));
const h6 = dynamic(() => import('@page/layout').then(module => module.Mdx.h6));

type DynamicPageProps = GetStaticTranslationProps & GetStaticContentProps;

const DynamicPage: FC<DynamicPageProps> = ({
  mdxSource,
  metaData,
  hydrationComponentsList,
  rawContent
}) => {
  const { compiledSource, scope } = mdxSource;

  const { disableShare, ...restMetaData } = metaData;

  const content = useMdx(compiledSource, {
    components: {
      ...getComponents(hydrationComponentsList),
      h1: Mdx.h1({ disableShare, meta: restMetaData }),
      h2,
      h3,
      h4,
      h5,
      h6
    },
    scope
  });
  return isMobile ? (
    <MdxDocsMobile meta={restMetaData}>{content}</MdxDocsMobile>
  ) : (
    <MdxDocs meta={restMetaData} raw={rawContent}>
      {content}
    </MdxDocs>
  );
};

export const getStaticProps: GetStaticProps = mergeProps(
  [
    getStaticTranslationProps({
      onSuccess: _props => {
        // console.log('static translation props', props);
      }
    }),
    getStaticContentProps({
      pageType: 'docs',
      onSuccess: _props => {
        // console.log('static content props', props);
      }
    })
  ],
  {
    resolutionType: 'parallel',
    debug: true
  }
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPath('docs');
  return {
    paths,
    fallback: false
  };
};

export default DynamicPage;
