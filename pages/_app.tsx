import { HouxProvider } from 'houx';
import App from 'next/app';
import React from 'react';

import AppWrapper from '../docs/src/modules/components/AppWrapper';
import reducers from '../docs/src/modules/redux/reducers';
import { appWithTranslation } from '../i18n';

// import { I18N, namespaces } from '../i18n';
const USE_STRICT_MODE = false;
const ReactMode = USE_STRICT_MODE ? React.StrictMode : React.Fragment;

/* eslint-disable class-methods-use-this */
class MillipedeApp extends App {
  componentDidMount() {
    // TODO - determine purpose
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
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

// MillipedeApp.getInitialProps = async ({ Component, ctx }: any): Promise<any> => {
//   let pageProps = {};

//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   return { pageProps };
// };

MillipedeApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // Inject env variables into SSR
  // pageProps.CONFIG = getConfig().publicRuntimeConfig.env as AppConfig;

  // Fetch correct required namespaces depending on route
  // pageProps.namespacesRequired = namespaces[router.route];

  // Logger.log('pageProps.namespacesRequired', pageProps.namespacesRequired);

  return { pageProps };
};

export default appWithTranslation(MillipedeApp);
