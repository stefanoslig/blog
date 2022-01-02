import Image from "next/image";
import Head from "next/head";
import underConstruction from "../public//assets/under-construction.png";

function Maintenance() {
  return (
    <>
      <Head>
        <title>stefanos.dev 🚀</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <Image
          src={underConstruction}
          alt="under construction"
          width={1280 / 2}
          height={1280 / 2}
        />
      </div>
    </>
  );
}

export default Maintenance;
