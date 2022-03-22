import '@fortawesome/fontawesome-svg-core/styles.css';

import { defaultAnalytics } from '@app/analytics';
import { loadFAIcons } from '@app/components';
import { AppWrapper } from '@app/layout';
import { Components as RenderComponents } from '@app/render-utils';
import { CacheProvider } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { NextComponentType } from 'next';
import I18nProvider from 'next-translate/I18nProvider';
import { AppContext, AppInitialProps } from 'next/app';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { AnalyticsProvider } from 'use-analytics';

import { createEmotionCache } from '../docs/src/lib/emotion';
import { CustomAppProps } from '../docs/src/lib/types';

config.autoAddCss = false;

loadFAIcons();

const clientSideEmotionCache = createEmotionCache();

const {
  Media: { MediaContextProvider }
} = RenderComponents;

const MillipedeApp: NextComponentType<
  AppContext,
  AppInitialProps,
  CustomAppProps
> = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const { __namespaces, __lang, ...pagePropsWitoutI18n } = pageProps;

  const { navigation, content } = pagePropsWitoutI18n;

  /**
   * Note:
   * The page blog index generates content as an array.
   * All other pages, including dynamic pages, include a toc property
   * with either array or undefined value.
   */
  const { toc } = (!Array.isArray(content) && content) || { toc: undefined };

  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <AnalyticsProvider instance={defaultAnalytics}>
      <I18nProvider lang={__lang} namespaces={__namespaces}>
        <MediaContextProvider>
          <CacheProvider value={emotionCache}>
            <RecoilRoot>
              <AppWrapper>
                {getLayout(
                  <Component {...pagePropsWitoutI18n} />,
                  navigation,
                  toc && toc.length > 0
                )}
              </AppWrapper>
            </RecoilRoot>
          </CacheProvider>
        </MediaContextProvider>
      </I18nProvider>
    </AnalyticsProvider>
  );
};

export default MillipedeApp;
