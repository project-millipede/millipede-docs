import { HiddenUnderlineLink } from '@app/components';
import { BlogFrame, BlogThemeProvider } from '@app/layout';
import { Navigation } from '@app/types';
import { Variant } from '@mui/material/styles/createTypography';
import { Components, Mdx } from '@page/layout';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { mergeProps } from 'next-merge-props';
import { Fragment, ReactElement, useMemo } from 'react';

import { getBlogPath } from '../../docs/src/lib/getPath';
import { GetStaticContentProps, getStaticContentProps } from '../../docs/src/lib/getStaticContentProps';
import { GetStaticNavigationProps, getStaticNavigationProps } from '../../docs/src/lib/getStaticNavigationProps';
import { GetStaticTranslationProps, getStaticTranslationProps } from '../../docs/src/lib/getStaticTranslationProps';
import { blogComponents } from '../../docs/src/lib/page-config';
import { NextPageWithLayout } from '../../docs/src/lib/types';
import { getComponents } from '../../docs/src/lib/utils/hydration';

const { AppHead } = Components;

export type HeaderProps = {
  // id generated through slug
  id: string;
  variant: Variant;
  children: string;
};

export type DynamicBlogPageProps = GetStaticTranslationProps &
  GetStaticContentProps &
  GetStaticNavigationProps;

const DynamicBlogPage: NextPageWithLayout<DynamicBlogPageProps> = ({
  content,
  navigation
}) => {
  const { mdxSource, metaData, hydratedComponents, toc, slug } =
    !Array.isArray(content) && content;

  const slugStr = !Array.isArray(slug) && slug;

  const [Component, headerComponents, components] = useMemo(() => {
    return [
      getMDXComponent(mdxSource.code),
      {
        h2: (props: HeaderProps) => <Mdx.Header variant='h2' {...props} />,
        h3: (props: HeaderProps) => <Mdx.Header variant='h3' {...props} />,
        h4: (props: HeaderProps) => <Mdx.Header variant='h4' {...props} />
      },
      getComponents(blogComponents, hydratedComponents)
    ];
  }, [mdxSource.code]);

  return (
    <Fragment>
      <AppHead metaData={metaData} />
      <Mdx.MdxBlog
        toc={toc}
        slug={['blog', slugStr]}
        navigation={navigation}
        metaData={metaData}
      >
        <Component
          components={{
            a: HiddenUnderlineLink as any,
            h1: Mdx.h1,
            h5: Mdx.h5,
            h6: Mdx.h6,
            blockquote: Mdx.blockquote,
            ...headerComponents,
            ...components
          }}
        />
      </Mdx.MdxBlog>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = mergeProps(
  [
    getStaticTranslationProps(),
    getStaticNavigationProps({
      pageType: 'blog'
    }),
    getStaticContentProps({
      pageType: 'blog'
    })
  ],
  {
    resolutionType: 'sequential'
  }
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getBlogPath('blog');
  return {
    paths,
    fallback: false
  };
};

DynamicBlogPage.getLayout = (
  page: ReactElement,
  navigation: Navigation,
  hasToc: boolean
) => {
  return (
    <BlogThemeProvider>
      <BlogFrame hasToc={hasToc} navigation={navigation}>
        {page}
      </BlogFrame>
    </BlogThemeProvider>
  );
};

export default DynamicBlogPage;
