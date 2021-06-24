import { defaultAnalytics } from '@app/analytics';
import { Portal, Query } from '@app/components';
import { HouxProvider } from '@app/houx';
import { AppFrame, AppWrapper } from '@app/layout';
import { Components } from '@app/render-utils';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { NextComponentType } from 'next';
import I18nProvider from 'next-translate/I18nProvider';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { AnalyticsProvider } from 'use-analytics';

const cache = createCache({ key: 'css' });
cache.compat = true;

const {
  Media: { MediaContextProvider }
} = Components;

const MillipedeApp: NextComponentType<AppContext, AppInitialProps, AppProps> =
  ({ Component, pageProps }) => {
    return (
      <AnalyticsProvider instance={defaultAnalytics}>
        <Query.QueryParamProvider>
          <Portal.PortalProvider>
            <RecoilRoot>
              <HouxProvider>
                <I18nProvider
                  lang={pageProps && pageProps.__lang}
                  namespaces={pageProps && pageProps.__namespaces}
                >
                  <CacheProvider value={cache}>
                    <AppWrapper>
                      <MediaContextProvider>
                        <AppFrame>
                          <Component {...pageProps} />
                        </AppFrame>
                      </MediaContextProvider>
                    </AppWrapper>
                  </CacheProvider>
                </I18nProvider>
              </HouxProvider>
            </RecoilRoot>
          </Portal.PortalProvider>
        </Query.QueryParamProvider>
      </AnalyticsProvider>
    );
  };

export default MillipedeApp;
