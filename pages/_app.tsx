import '../docs/css/diagram.css';

import { HouxProvider } from 'houx';
import { enableMapSet } from 'immer';
import App, { AppContext } from 'next/app';
import React from 'react';
import ReactGA from 'react-ga';

import AppFrame from '../docs/src/modules/components/AppFrame';
import AppWrapper from '../docs/src/modules/components/AppWrapper';
import { loadFAIcons } from '../docs/src/modules/components/icon/FAIconLoader';
import reducers from '../docs/src/modules/redux/reducers';
import { detectDevice } from '../docs/src/modules/utils/device';
import { appWithTranslation } from '../i18n';

// const TRACKING_CODE_MILLIPEDE = 'UA-151314446-1';
const TRACKING_CODE_PRIVACY_SHIELD = 'UA-154899959-1';

loadFAIcons();

enableMapSet();

interface PageProps {
  isMobile: boolean;
}

interface Props extends AppContext {
  pageProps: PageProps;
}

class MillipedeApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const isMobile = detectDevice(ctx.req);

    const pageProps = Component.getInitialProps
      ? {
          ...(await Component.getInitialProps(ctx)),
          isMobile
        }
      : { isMobile };

    return { pageProps };
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    // ReactGA.initialize(TRACKING_CODE_MILLIPEDE);
    ReactGA.initialize(TRACKING_CODE_PRIVACY_SHIELD);
  }

  render() {
    const { Component, pageProps } = this.props;

    const { isMobile } = pageProps;

    return (
      <HouxProvider reducers={reducers}>
        <AppWrapper isMobile={isMobile}>
          <AppFrame>
            <Component {...pageProps} />
          </AppFrame>
        </AppWrapper>
      </HouxProvider>
    );
  }
}

export default appWithTranslation(MillipedeApp);
