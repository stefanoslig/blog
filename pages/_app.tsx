import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>stefanos.dev 🚀</title>
      </Head>

      <Header />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
