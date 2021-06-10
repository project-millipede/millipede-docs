import { Components } from '@app/render-utils';
import { Mdx } from '@page/layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { mergeProps } from 'next-merge-props';
import React, { FC } from 'react';

import { getComponents } from '../../docs/src/lib/getComponents';
import { getPath } from '../../docs/src/lib/getPath';
import { GetStaticContentProps, getStaticContentProps } from '../../docs/src/lib/getStaticContentProps';
import { GetStaticTranslationProps, getStaticTranslationProps } from '../../docs/src/lib/getStaticTranslationProps';

const {
  Responsive: { isMobile }
} = Components;

type DynamicPageProps = GetStaticTranslationProps & GetStaticContentProps;

const DynamicPage: FC<DynamicPageProps> = ({
  mdxSource,
  metaData,
  hydrationComponentsList,
  rawContent
}) => {
  const renderMobile = isMobile();
  const { disableShare, ...restMetaData } = metaData;

  const content = (
    <MDXRemote
      {...mdxSource}
      components={{
        ...getComponents(hydrationComponentsList),
        h1: Mdx.h1({ disableShare, meta: restMetaData }),
        h2: Mdx.h2({ isMobile: renderMobile }),
        h3: Mdx.h3({ isMobile: renderMobile }),
        h4: Mdx.h4({ isMobile: renderMobile }),
        h5: Mdx.h5,
        h6: Mdx.h6
      }}
      // scope={scope}
    />
  );

  return (
    <Mdx.MdxDocs meta={restMetaData} raw={rawContent} isMobile={renderMobile}>
      {content}
    </Mdx.MdxDocs>
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
