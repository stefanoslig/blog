import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>stefanos.dev 🚀</title>
      </Head>

      <Header />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
