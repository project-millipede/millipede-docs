import { ServerStyleSheets as MaterialServerStyleSheets } from '@material-ui/core';
import NextDocument, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import React, { Fragment } from 'react';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';

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
  const materialSheets = new MaterialServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  try {
    const newCtx = {
      ...ctx,
      renderPage: () =>
        originalRenderPage({
          enhanceApp: App => props =>
            styledComponentSheet.collectStyles(
              materialSheets.collect(<App {...props} />)
            )
        })
    };

    const initialProps = await NextDocument.getInitialProps(newCtx);

    return {
      ...initialProps,
      styles: (
        <Fragment key='styles'>
          {initialProps.styles}
          {materialSheets.getStyleElement()}
          {styledComponentSheet.getStyleElement()}
        </Fragment>
      )
    };
  } finally {
    styledComponentSheet.seal();
  }
};

export default MillipedeDocument;
