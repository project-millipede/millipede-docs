import { ServerStyleSheets as MaterialServerStyleSheets } from '@material-ui/core';
import { compose, Handler, RequestHandler } from 'compose-middleware';
import { IncomingMessage, ServerResponse } from 'http';
import nextI18NextMiddleware from 'next-i18next-serverless/dist/commonjs/middlewares/next-i18next-middleware';
import NextDocument, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import React, { Fragment } from 'react';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';

import { Logger } from '../docs/src/modules/utils/logging';
import { NextI18NextInstance } from '../i18n';

export const composeTestMiddleware = (
  req: IncomingMessage,
  res: ServerResponse
) => (middlewares: Array<Handler<IncomingMessage, ServerResponse>>) => {
  const handler: RequestHandler<IncomingMessage, ServerResponse> = compose(
    middlewares
  );

  const done = () => {
    Logger.log('Execution of middleware succeeded');
  };

  handler(req, res, _next => {
    return done();
  });

  return handler;
};

export const instantiateTestMiddleware = (
  req: IncomingMessage,
  res: ServerResponse
) =>
  composeTestMiddleware(req, res)(nextI18NextMiddleware(NextI18NextInstance));

/* eslint-disable class-methods-use-this */
class MillipedeDocument extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
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
  instantiateTestMiddleware(ctx.req, ctx.res);

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
