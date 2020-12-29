import '../docs/css/diagram.css';

import { defaultAnalytics } from '@app/analytics';
import { Portal, Query } from '@app/components';
import { HouxProvider } from '@app/houx';
import { AppFrame, AppWrapper } from '@app/layout';
import { NextComponentType } from 'next';
import appWithI18n from 'next-translate/appWithI18n';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { AnalyticsProvider } from 'use-analytics';

import i18nConfig from '../i18n';

const MillipedeApp: NextComponentType<
  AppContext,
  AppInitialProps,
  AppProps
> = ({ Component, pageProps }) => {
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
              <AppWrapper>
                <AppFrame>
                  <Component {...pageProps} />
                </AppFrame>
              </AppWrapper>
            </HouxProvider>
          </RecoilRoot>
        </Portal.PortalProvider>
      </Query.QueryParamProvider>
    </AnalyticsProvider>
  );
};

export default appWithI18n(MillipedeApp, {
  ...i18nConfig,
  skipInitialProps: true
});
