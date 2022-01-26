import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro&display=swap"
            rel="stylesheet"
          />
          <meta property="og:title" content="Stefanos Lignos 🚀" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="My blog! Stefanos Lignos" />
          <meta charSet="utf-8" />
          <meta name="robots" content="follow, index" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
