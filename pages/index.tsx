import Image from "next/image";
import Head from "next/head";
import Container from "../components/container";

function HomePage() {
  return (
    <>
      <Head>
        <title>Stefanos.dev 🚀</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">
            Hey! This is my persolnal blog!
          </h1>
          <p>This blog is built with Next.js.</p>
        </div>
      </Container>

      <div className="container">
        <Image
          src="/assets/under-construction.png"
          alt="under construction"
          width={1280 / 2}
          height={1280 / 2}
        />
      </div>
    </>
  );
}

export default HomePage;
