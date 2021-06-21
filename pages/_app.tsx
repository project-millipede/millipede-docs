import { defaultAnalytics } from '@app/analytics';
import { Portal, Query } from '@app/components';
import { HouxProvider } from '@app/houx';
import { AppFrame, AppWrapper } from '@app/layout';
import { Components } from '@app/render-utils';
import { NextComponentType } from 'next';
import I18nProvider from 'next-translate/I18nProvider';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { AnalyticsProvider } from 'use-analytics';

const {
  Media: { MediaContextProvider }
} = Components;

const MillipedeApp: NextComponentType<AppContext, AppInitialProps, AppProps> =
  ({ Component, pageProps }) => {
    useEffect(() => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }, []);

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
                  <AppWrapper>
                    <MediaContextProvider>
                      <AppFrame>
                        <Component {...pageProps} />
                      </AppFrame>
                    </MediaContextProvider>
                  </AppWrapper>
                </I18nProvider>
              </HouxProvider>
            </RecoilRoot>
          </Portal.PortalProvider>
        </Query.QueryParamProvider>
      </AnalyticsProvider>
    );
  };

export default MillipedeApp;
