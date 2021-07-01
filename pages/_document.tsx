import { Components } from '@app/render-utils';
import { CacheProvider } from '@emotion/react';
import NextDocument, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import React, { Children } from 'react';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';

import { cache, extractCriticalToChunks } from '../docs/src/lib/emotion';

const {
  Media: { mediaStyles }
} = Components;

class MillipedeDocument extends NextDocument {
  render() {
    const { locale, defaultLocale } = this.props.__NEXT_DATA__;
    const lang = locale ? locale : defaultLocale;

    return (
      <Html lang={lang}>
        <Head>
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
            rel='stylesheet'
          />
          <link rel='shortcut icon' href='/favicon.ico' />
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
  const emotionStyleTags = emotionStyles.styles.map(({ key, ids, css }) => (
    <style
      data-emotion={`${key} ${ids.join(' ')}`}
      key={key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: css }}
    />
  ));

  const mediaQueryStyles = (
    <style
      key={'mediaStyles'}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: mediaStyles }}
    />
  );

  return {
    ...initialProps,
    styles: [
      ...Children.toArray(initialProps.styles),
      mediaQueryStyles,
      styledComponentSheet.getStyleElement(),
      ...emotionStyleTags
    ]
  };
};

export default MillipedeDocument;
