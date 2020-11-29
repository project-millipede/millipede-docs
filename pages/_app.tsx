import '../docs/css/diagram.css';

import { defaultAnalytics } from '@app/analytics';
import { Portal } from '@app/components';
import { HouxProvider } from '@app/houx';
import { AppFrame, AppWrapper, reducers as layoutReducers } from '@app/layout';
import { NextComponentType } from 'next';
import I18nProvider from 'next-translate/I18nProvider';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { AnalyticsProvider } from 'use-analytics';

import { loadFAIcons } from '../docs/src/modules/components/icon/FAIconLoader';
import { reducers } from '../docs/src/modules/redux/reducers';
import { detectDevice } from '../docs/src/modules/utils/device';

loadFAIcons();

const MillipedeApp: NextComponentType<
  AppContext,
  AppInitialProps,
  AppProps
> = ({ Component, pageProps }) => {
  const { isMobile } = pageProps;

  const { locale } = useRouter();

  return (
    // eslint-disable-next-line no-underscore-dangle
    <HouxProvider
      reducers={{ ...reducers, ...layoutReducers }}
      logDispatchedActions
    >
      <I18nProvider lang={locale} namespaces={pageProps._ns}>
        <AnalyticsProvider instance={defaultAnalytics}>
          <Portal.Portal.PortalProvider>
            <RecoilRoot>
              <AppWrapper isMobile={isMobile}>
                <AppFrame>
                  <Component {...pageProps} />
                </AppFrame>
              </AppWrapper>
            </RecoilRoot>
          </Portal.Portal.PortalProvider>
        </AnalyticsProvider>
      </I18nProvider>
    </HouxProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext)
//   return { ...appProps }
// }

MillipedeApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const isMobile = detectDevice(ctx.req);

  const pageProps = Component.getInitialProps
    ? {
        ...(await Component.getInitialProps(ctx)),
        isMobile
      }
    : { isMobile };

  return { pageProps };
};

export default MillipedeApp;
