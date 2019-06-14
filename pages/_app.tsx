import { HouxProvider } from 'houx';
import App, { Container } from 'next/app';
import React from 'react';

import AppWrapper from '../docs/src/modules/components/AppWrapper';
import reducers from '../docs/src/modules/redux/reducers';

class MillipedeApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <HouxProvider reducers={reducers} logDispatchedActions>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </HouxProvider>
      </Container>
    );
  }
}

export default MillipedeApp;
