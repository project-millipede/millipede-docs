import '@fortawesome/fontawesome-svg-core/styles.css';

import { defaultAnalytics } from '@app/analytics';
import { loadFAIcons, Portal, Query } from '@app/components';
import { HouxProvider } from '@app/houx';
import { AppWrapper } from '@app/layout';
import { Components as RenderComponents } from '@app/render-utils';
import { CacheProvider } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { NextComponentType } from 'next';
import I18nProvider from 'next-translate/I18nProvider';
import { AppContext, AppInitialProps } from 'next/app';
import React, { ReactNode } from 'react';
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
  const { navigation } = pagePropsWitoutI18n;

  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <AnalyticsProvider instance={defaultAnalytics}>
      <Query.QueryParamProvider>
        <Portal.PortalProvider>
          <RecoilRoot>
            <HouxProvider>
              <I18nProvider lang={__lang} namespaces={__namespaces}>
                <MediaContextProvider>
                  <CacheProvider value={emotionCache}>
                    <AppWrapper>
                      {getLayout(
                        <Component {...pagePropsWitoutI18n} />,
                        navigation
                      )}
                    </AppWrapper>
                  </CacheProvider>
                </MediaContextProvider>
              </I18nProvider>
            </HouxProvider>
          </RecoilRoot>
        </Portal.PortalProvider>
      </Query.QueryParamProvider>
    </AnalyticsProvider>
  );
};

export default MillipedeApp;
