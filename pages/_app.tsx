import '../docs/css/diagram.css';

import { HouxProvider } from '@app/houx';
import { enableMapSet } from 'immer';
import { NextComponentType } from 'next';
import I18nProvider from 'next-translate/I18nProvider';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { RecoilRoot } from 'recoil';

import { AppFrame } from '../docs/src/modules/components/AppFrame';
import { AppWrapper } from '../docs/src/modules/components/AppWrapper';
import { loadFAIcons } from '../docs/src/modules/components/icon/FAIconLoader';
import reducers from '../docs/src/modules/redux/reducers';
import { detectDevice } from '../docs/src/modules/utils/device';
import { PortalProvider } from '../src/components/layout/grid/animation/framer/components/shared/portals/portals';

// import { appWithTranslation } from '../i18n';

// const TRACKING_CODE_MILLIPEDE = 'UA-151314446-1';
const TRACKING_CODE_PRIVACY_SHIELD = 'UA-154899959-1';

loadFAIcons();

enableMapSet();

// interface PageProps {
//   isMobile: boolean;
// }

// interface Props extends AppContext {
//   pageProps: PageProps;
// }

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
    // ReactGA.initialize(TRACKING_CODE_MILLIPEDE);
    ReactGA.initialize(TRACKING_CODE_PRIVACY_SHIELD);
  }, []);

  const { isMobile } = pageProps;

  const { locale } = useRouter();

  return (
    // eslint-disable-next-line no-underscore-dangle
    <I18nProvider lang={locale} namespaces={pageProps._ns}>
      <PortalProvider>
        <HouxProvider reducers={reducers} logDispatchedActions>
          <RecoilRoot>
            <AppWrapper isMobile={isMobile}>
              <AppFrame>
                <Component {...pageProps} />
              </AppFrame>
            </AppWrapper>
          </RecoilRoot>
        </HouxProvider>
      </PortalProvider>
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
