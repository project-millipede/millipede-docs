import { AppFrame, AppThemeProvider } from '@app/layout';
import { Navigation } from '@app/types';
import { Variant } from '@mui/material/styles/createTypography';
import { Components, Mdx } from '@page/layout';
import { Toc } from '@stefanprobst/remark-extract-toc';
import { AnimatePresence } from 'framer-motion';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { mergeProps } from 'next-merge-props';
import { ReactElement, useMemo } from 'react';

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

/**
 * Navigation to anchors should not cause any re-render; however, changing the hash
 * through NextJs building blocks Link and Router does cause a re-render.
 *
 * Re-rendering the entire app from _app and the respective page
 * with the page's content can get quite substantial.
 *
 * FIXME:
 * https://github.com/vercel/next.js/issues/34729
 *
 * Note:
 * Re-rendering is reduced to the minimum in the respective MDX-components loaded.
 * However, using the translation hook causes a re-render, not because of the hook's implementation
 * detail (not using memo), but rather due to the global re-rendering from the app root.
 *
 * - no re-render for h2-h4 tags using custom components
 * - re-render e.g., for concept tags and their respective components such as title
 */

export type HeaderProps = {
  // id generated through slug
  id: string;
  variant: Variant;
  children: string;
};

const DynamicPage: NextPageWithLayout<DynamicPageProps> = ({
  content,
  navigation
}) => {
  const { mdxSource, metaData, hydratedComponents, slug } =
    !Array.isArray(content) && content;

  const slugArray = Array.isArray(slug) && slug;

  const [Component, headerComponents, components] = useMemo(() => {
    return [
      getMDXComponent(mdxSource.code),
      {
        h2: (props: HeaderProps) => <Mdx.Header variant='h2' {...props} />,
        h3: (props: HeaderProps) => <Mdx.Header variant='h3' {...props} />,
        h4: (props: HeaderProps) => <Mdx.Header variant='h4' {...props} />
      },
      getLoadableComponents(docComponents, hydratedComponents)
    ];
  }, [mdxSource.code]);

  return (
    <>
      <AppHead metaData={metaData} />

      <Mdx.MdxDocs slug={slugArray} navigation={navigation} metaData={metaData}>
        <Component
          components={{
            h1: Mdx.h1,
            h5: Mdx.h5,
            h6: Mdx.h6,
            blockquote: Mdx.blockquote,
            ...headerComponents,
            ...components
          }}
        />
      </Mdx.MdxDocs>
    </>
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
  toc: Toc
) => {
  return (
    <AppThemeProvider>
      <AppFrame navigation={navigation} toc={toc}>
        {/* Required for page transitions */}
        <AnimatePresence exitBeforeEnter initial={false}>
          {page}
        </AnimatePresence>
      </AppFrame>
    </AppThemeProvider>
  );
};

export default DynamicPage;
