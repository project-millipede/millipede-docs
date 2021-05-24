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

const MdxDocs = dynamic(
  () => import('@page/layout').then(module => module.Mdx.MdxDocs),
  { ssr: false }
);
const MdxDocsMobile = dynamic(
  () => import('@page/layout').then(module => module.Mdx.MdxDocsMobile),
  { ssr: false }
);

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
      h2: Mdx.h2({ isMobile: isMobile }),
      h3: Mdx.h3({ isMobile: isMobile }),
      h4: Mdx.h4({ isMobile: isMobile }),
      h5: Mdx.h5,
      h6: Mdx.h6
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
