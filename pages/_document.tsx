import { ServerStyleSheets as MaterialServerStyleSheets } from '@material-ui/core';
import NextDocument, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import React, { Fragment } from 'react';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';

/* eslint-disable class-methods-use-this */
class MillipedeDocument extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          {/* <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          /> */}
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/icon?family=Material+Icons'
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
