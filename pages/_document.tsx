import createEmotionServer from '@emotion/server/create-instance';
import { AppType } from 'next/dist/shared/lib/utils';
import NextDocument, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import { Children } from 'react';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';

import { createEmotionCache } from '../docs/src/lib/emotion';
import { CustomAppProps } from '../docs/src/lib/types';

class MillipedeDocument extends NextDocument {
  render() {
    const { locale, defaultLocale, page } = this.props.__NEXT_DATA__;
    const lang = locale ? locale : defaultLocale;

    const isBlog = page.includes('blog');

    /**
     * Used fonts and available font-weights
     *
     * font-family: 'Bellota', cursive; // 300;400;700
     * font-family: 'Karla', sans-serif; // 200;300;400;500;700
     * font-family: 'Roboto', sans-serif; // 100;300;400;500;700
     * font-family: 'Roboto Mono', monospace; // 100;300;400;500;700
     *
     */

    const fontHref = !isBlog
      ? 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700'
      : 'https://fonts.googleapis.com/css2?family=Bellota:wght@300;400;700&family=Karla:wght@200;300;400;500;700&family=Roboto+Mono:wght@400;500';

    return (
      <Html lang={lang}>
        <Head>
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />

          <link href={fontHref} rel='stylesheet' />
          <link rel='icon' href='/favicon.ico' />
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

  /**
   * Note:
   * You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
   * However, be aware that it can have global side effects.
   */

  const cache = createEmotionCache();

  const { extractCriticalToChunks } = createEmotionServer(cache);

  try {
    // eslint-disable-next-line no-param-reassign
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
        dangerouslySetInnerHTML={{ __html: css }}
      />
    ));

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...emotionStyleTags,
        styledComponentSheet.getStyleElement(),
        ...Children.toArray(initialProps.styles)
      ]
    };
  } finally {
    styledComponentSheet.seal();
  }
};

export default MillipedeDocument;
