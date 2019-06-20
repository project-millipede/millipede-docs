import { HouxProvider } from 'houx';
import App, { Container } from 'next/app';
import React from 'react';

import AppWrapper from '../docs/src/modules/components/AppWrapper';
import reducers from '../docs/src/modules/redux/reducers';

const USE_STRICT_MODE = false;
const ReactMode = USE_STRICT_MODE ? React.StrictMode : React.Fragment;

/* eslint-disable class-methods-use-this */
class MillipedeApp extends App {
  componentDidMount() {
    // TODO - determine purpose
    // Remove the server-side injected CSS.
    // const jssStyles = document.querySelector('#jss-server-side');
    // if (jssStyles) {
    //   jssStyles.parentNode.removeChild(jssStyles);
    // }
  }

  render() {
    const fonts = ['https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'];
    const { Component, pageProps } = this.props;

    return (
      <ReactMode>
        {/* TODO - determine purpose */}
        {/* <NextHead>
          {fonts.map(font => (
            <link rel='stylesheet' href={font} key={font} />
          ))}
        </NextHead> */}
        <Container>
          <HouxProvider reducers={reducers} logDispatchedActions>
            <AppWrapper>
              <Component {...pageProps} />
            </AppWrapper>
          </HouxProvider>
        </Container>
      </ReactMode>
    );
  }
}

export default MillipedeApp;
