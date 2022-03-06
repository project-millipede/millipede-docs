import { Navigation } from '@app/types';
import { EmotionCache } from '@emotion/cache';
import { NextPage } from 'next';
import { AppPropsType } from 'next/dist/shared/lib/utils';
import { ComponentType, ReactElement, ReactNode } from 'react';

import { DynamicPageProps } from '../../../pages/docs/[...slug]';

export type ComponentMap = {
  [index: string]: { component: ComponentType; requireWrapper?: boolean };
};

export type NextPageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
  getLayout: (
    page: ReactElement,
    navigation: Navigation,
    hasToc: boolean
  ) => ReactNode;
};

export type CustomAppProps = Omit<AppPropsType, 'pageProps'> & {
  Component: NextPageWithLayout;
  emotionCache: EmotionCache;
  pageProps: DynamicPageProps & { children: ReactNode };
};
