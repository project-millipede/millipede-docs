import '../docs/css/diagram.css';

import * as Sentry from '@sentry/browser';
import { HouxProvider } from 'houx';
import App from 'next/app';
import React from 'react';
import ReactGA from 'react-ga';

import AppWrapper from '../docs/src/modules/components/AppWrapper';
import { loadFAIcons } from '../docs/src/modules/components/icon/FAIconLoader';
import reducers from '../docs/src/modules/redux/reducers';
import { appWithTranslation } from '../i18n';

const USE_STRICT_MODE = false;
const ReactMode = USE_STRICT_MODE ? React.StrictMode : React.Fragment;

// const TRACKING_CODE_MILLIPEDE = 'UA-151314446-1';
const TRACKING_CODE_PRIVACY_SHIELD = 'UA-154899959-1';

loadFAIcons();

/* eslint-disable class-methods-use-this */
class MillipedeApp extends App {
  componentDidMount() {
    // TODO - determine purpose
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    // ReactGA.initialize(TRACKING_CODE_MILLIPEDE);
    ReactGA.initialize(TRACKING_CODE_PRIVACY_SHIELD);
    Sentry.init({
      dsn: 'https://ed3aa0e18051477384a59be73931f3b6@sentry.io/1805383'
    });
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ReactMode>
        {/* TODO - determine purpose */}
        {/* <NextHead>
          {fonts.map(font => (
            <link rel='stylesheet' href={font} key={font} />
          ))}
        </NextHead> */}
        <HouxProvider reducers={reducers} logDispatchedActions>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </HouxProvider>
      </ReactMode>
    );
  }
}

export default appWithTranslation(MillipedeApp);
