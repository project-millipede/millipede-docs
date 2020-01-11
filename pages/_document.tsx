import { ServerStyleSheets } from '@material-ui/core/styles';
import { compose } from 'compose-middleware';
import { IncomingMessage, ServerResponse } from 'http';
import nextI18NextMiddleware from 'next-i18next-serverless/dist/commonjs/middlewares/next-i18next-middleware';
import NextDocument, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import { PathnameToLanguage, pathnameToLanguage } from '../docs/src/modules/utils/helpers';
import { Logger } from '../docs/src/modules/utils/logging';
import { NextI18NextInstance } from '../i18n';

const wrapI18n = (req: IncomingMessage, res: ServerResponse) => {
  const middleware = compose(nextI18NextMiddleware(NextI18NextInstance));

  const done = () => {
    Logger.log('done');
  };

  middleware(req, res, _next => {
    return done();
  });
};

export const middleware = async ({ req, res }: DocumentContext) => {
  await wrapI18n(req, res);
};

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

type InitialProps = PathnameToLanguage & DocumentInitialProps;

MillipedeDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<InitialProps> => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  const newCtx = {
    ...ctx,
    renderPage: () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />)
      })
  };

  const initialProps = await NextDocument.getInitialProps(newCtx);

  return {
    ...initialProps,

    canonical: pathnameToLanguage(ctx.req.url).canonical,
    userLanguage: ctx.query.userLanguage as string,

    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ) as any
    // styles: [...(initialProps.styles || []), sheets.getStyleElement()]
  };
};

export default MillipedeDocument;
