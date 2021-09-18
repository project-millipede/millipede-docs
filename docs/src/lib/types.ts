import { NavigationState } from '@app/layout/src/recoil/features/pages/reducer';
import createCache, { EmotionCache } from '@emotion/cache';
import { NextPage } from 'next';
import { AppPropsType, NextComponentType } from 'next/dist/shared/lib/utils';
import { DynamicPageProps } from 'pages/docs/[...slug]';
import { ReactNode } from 'react';

export const createEmotionCache = () => {
  return createCache({ key: 'css' });
};

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout: (page: ReactNode, navigation: NavigationState) => ReactNode;
};

type NextComponentTypeWithLayout = NextComponentType & {
  getLayout?: (page: JSX.Element, navigation: NavigationState) => JSX.Element;
};

export type CustomAppProps = Omit<AppPropsType, 'pageProps'> & {
  Component: NextComponentTypeWithLayout;
  emotionCache: EmotionCache;
  pageProps: DynamicPageProps & { children: ReactNode };
};
