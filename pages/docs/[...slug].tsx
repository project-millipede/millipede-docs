import { AppFrame } from '@app/layout';
import { NavigationState } from '@app/layout/src/recoil/features/pages/reducer';
import { Components, Mdx } from '@page/layout';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { mergeProps } from 'next-merge-props';
import React, { Fragment, ReactElement, useMemo } from 'react';

import { getComponents } from '../../docs/src/lib/getComponents';
import { getPath } from '../../docs/src/lib/getPath';
import {
  GetStaticContentProps,
  getStaticContentProps
} from '../../docs/src/lib/getStaticContentProps';
import {
  GetStaticNavigationProps,
  getStaticNavigationProps
} from '../../docs/src/lib/getStaticNavigationProps';
import {
  GetStaticTranslationProps,
  getStaticTranslationProps
} from '../../docs/src/lib/getStaticTranslationProps';
import { NextPageWithLayout } from '../../docs/src/lib/types';

const { AppHead } = Components;

export type DynamicPageProps = GetStaticTranslationProps &
  GetStaticContentProps &
  GetStaticNavigationProps;

const DynamicPage: NextPageWithLayout<DynamicPageProps> = ({
  mdxSource,
  metaData,
  hydrationComponentsList,
  toc,
  slug,
  navigation
}) => {
  const { disableToc, ...contentMetaData } = metaData;

  const Component = useMemo(
    () => getMDXComponent(mdxSource.code),
    [mdxSource.code]
  );

  return (
    <Fragment>
      <AppHead metaData={contentMetaData} />
      <Mdx.MdxDocs
        disableToc={disableToc}
        toc={toc}
        slug={slug}
        navigation={navigation}
        metaData={contentMetaData}
      >
        <Component
          disableToc={disableToc}
          slug={slug}
          navigation={navigation}
          components={{
            h1: Mdx.h1,
            h2: props => <Mdx.Header variant='h2' {...props} />,
            h3: props => <Mdx.Header variant='h3' {...props} />,
            h4: props => <Mdx.Header variant='h4' {...props} />,
            h5: Mdx.h5,
            h6: Mdx.h6,
            blockquote: Mdx.blockquote,
            ...getComponents(hydrationComponentsList)
          }}
        />
      </Mdx.MdxDocs>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = mergeProps(
  [
    getStaticTranslationProps({
      onSuccess: _props => {
        // console.log('static translation props', props);
      }
    }),
    getStaticNavigationProps({
      onSuccess: _props => {
        // console.log('static navigation props', props);
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
    resolutionType: 'sequential',
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

DynamicPage.getLayout = (page: ReactElement, navigation: NavigationState) => {
  return (
    <AppFrame hasToc navigation={navigation}>
      {page}
    </AppFrame>
  );
};

export default DynamicPage;
