import { Components } from '@app/render-utils';
import createEmotionServer from '@emotion/server/create-instance';
import { AppType } from 'next/dist/shared/lib/utils';
import NextDocument, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import React, { Children } from 'react';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';

import { createEmotionCache } from '../docs/src/lib/emotion';
import { CustomAppProps } from '../docs/src/lib/types';

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
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700'
            rel='stylesheet'
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

MillipedeDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps> => {
  const styledComponentSheet = new StyledComponentSheets();

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();

  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: AppType) => (props: CustomAppProps) =>
        styledComponentSheet.collectStyles(
          <App emotionCache={cache} {...props} />
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
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...Children.toArray(initialProps.styles),
      ...emotionStyleTags,
      styledComponentSheet.getStyleElement(),
      mediaQueryStyles
    ]
  };
};

export default MillipedeDocument;
