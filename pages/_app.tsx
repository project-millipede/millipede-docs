import '../docs/css/diagram.css';

import { defaultAnalytics } from '@app/analytics';
import { Portal } from '@app/components';
import { HouxProvider } from '@app/houx';
import { AppFrame, AppWrapper, reducers as layoutReducers } from '@app/layout';
import { DeviceUtil } from '@app/utils';
import { reducers as demonstratorLayoutReducers } from '@demonstrator/layout';
import { NextComponentType } from 'next';
import I18nProvider from 'next-translate/I18nProvider';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { AnalyticsProvider } from 'use-analytics';

import { loadFAIcons } from '../docs/src/modules/components/icon/FAIconLoader';

loadFAIcons();

const MillipedeApp: NextComponentType<
  AppContext,
  AppInitialProps,
  AppProps
> = ({ Component, pageProps }) => {
  const { isMobile, namespaces } = pageProps;

  const { locale } = useRouter();

  return (
    <I18nProvider lang={locale} namespaces={namespaces}>
      <AnalyticsProvider instance={defaultAnalytics}>
        <Portal.PortalProvider>
          <RecoilRoot>
            <HouxProvider
              initialReducers={{
                ...layoutReducers,
                ...demonstratorLayoutReducers
              }}
            >
              <AppWrapper isMobile={isMobile}>
                <AppFrame>
                  <Component {...pageProps} />
                </AppFrame>
              </AppWrapper>
            </HouxProvider>
          </RecoilRoot>
        </Portal.PortalProvider>
      </AnalyticsProvider>
    </I18nProvider>
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
  const isMobile = DeviceUtil.detectDevice(ctx.req);

  const pageProps = Component.getInitialProps
    ? {
        ...(await Component.getInitialProps(ctx)),
        isMobile
      }
    : { isMobile };

  return { pageProps };
};

export default MillipedeApp;
