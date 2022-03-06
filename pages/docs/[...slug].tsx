import { AppFrame, AppThemeProvider } from '@app/layout';
import { Navigation } from '@app/types';
import { Components, Mdx } from '@page/layout';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { mergeProps } from 'next-merge-props';
import React, { Fragment, ReactElement, useMemo } from 'react';

import { getPath } from '../../docs/src/lib/getPath';
import { GetStaticContentProps, getStaticContentProps } from '../../docs/src/lib/getStaticContentProps';
import { GetStaticNavigationProps, getStaticNavigationProps } from '../../docs/src/lib/getStaticNavigationProps';
import { GetStaticTranslationProps, getStaticTranslationProps } from '../../docs/src/lib/getStaticTranslationProps';
import { docComponents } from '../../docs/src/lib/page-config';
import { NextPageWithLayout } from '../../docs/src/lib/types';
import { getLoadableComponents } from '../../docs/src/lib/utils/hydration';

const { AppHead } = Components;

export type DynamicPageProps = GetStaticTranslationProps &
  GetStaticContentProps &
  GetStaticNavigationProps;

const DynamicPage: NextPageWithLayout<DynamicPageProps> = ({
  content,
  navigation
}) => {
  const { mdxSource, metaData, hydratedComponents, toc, slug } =
    !Array.isArray(content) && content;

  const slugArray = Array.isArray(slug) && slug;

  const Component = useMemo(() => {
    return getMDXComponent(mdxSource.code);
  }, [mdxSource.code]);

  return (
    <Fragment>
      <AppHead metaData={metaData} />
      <Mdx.MdxDocs
        toc={toc}
        slug={slugArray}
        navigation={navigation}
        metaData={metaData}
      >
        <Component
          components={{
            h1: Mdx.h1,
            h2: Mdx.h2,
            h3: Mdx.h3,
            h4: Mdx.h4,
            h5: Mdx.h5,
            h6: Mdx.h6,
            blockquote: Mdx.blockquote,
            ...getLoadableComponents(docComponents, hydratedComponents)
          }}
        />
      </Mdx.MdxDocs>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = mergeProps(
  [
    getStaticTranslationProps(),
    getStaticNavigationProps({ pageType: 'docs' }),
    getStaticContentProps({
      pageType: 'docs'
    })
  ],
  {
    resolutionType: 'sequential'
  }
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPath('docs');
  return {
    paths,
    fallback: false
  };
};

DynamicPage.getLayout = (
  page: ReactElement,
  navigation: Navigation,
  hasToc: boolean
) => {
  return (
    <AppThemeProvider>
      <AppFrame hasToc={hasToc} navigation={navigation}>
        {page}
      </AppFrame>
    </AppThemeProvider>
  );
};

export default DynamicPage;
