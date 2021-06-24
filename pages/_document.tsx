import { Components } from '@app/render-utils';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import NextDocument, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import React, { Children } from 'react';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';

const {
  Media: { mediaStyles }
} = Components;

const getCache = () => {
  const cache = createCache({ key: 'css', prepend: true });
  cache.compat = true;
  return cache;
};
class MillipedeDocument extends NextDocument {
  render() {
    const { locale, defaultLocale } = this.props.__NEXT_DATA__;
    const lang = locale ? locale : defaultLocale;

    return (
      <Html lang={lang}>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
            rel='stylesheet'
          />
          <link rel='shortcut icon' href='/favicon.ico' />
          <style
            type='text/css'
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

type InitialProps = DocumentInitialProps;

MillipedeDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<InitialProps> => {
  const styledComponentSheet = new StyledComponentSheets();

  const originalRenderPage = ctx.renderPage;

  const cache = getCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props =>
          styledComponentSheet.collectStyles(<App {...props} />),
        // Take precedence over the CacheProvider in our custom _app.js
        enhanceComponent: Component => props =>
          (
            <CacheProvider value={cache}>
              <Component {...props} />
            </CacheProvider>
          )
      });

    const initialProps = await NextDocument.getInitialProps(ctx);

    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map(style => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...Children.toArray(initialProps.styles),
        styledComponentSheet.getStyleElement(),
        ...emotionStyleTags
      ]
    };
  } finally {
    styledComponentSheet.seal();
  }
};

export default MillipedeDocument;
