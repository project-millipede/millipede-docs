import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MillipedeDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MillipedeDocument;
