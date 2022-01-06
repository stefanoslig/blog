import Image from "next/image";
import Container from "../components/container";

function HomePage() {
  return (
    <>
      <Container>
        <div className="flex justify-center pt-4">
          <div className="pr-10">
            <h1 className="text-2xl text-gray-800 font-bold">
              Stefanos Lignos
            </h1>
            <h2 className="text-xl text-neutral-500	">
              Software Engineer in Amsterdam
            </h2>
          </div>
          <Image
            src="/assets/my-photo.jpeg"
            alt="my photo"
            className="rounded-full"
            width={250}
            height={250}
          />
        </div>

        <div className="flex justify-center pt-12">
          <a
            className="underline text-orange-500 text-lg	 rounded-lg p-2 m-3"
            href="http://twitter.com/stefanos_lig"
          >
            twitter
          </a>
          <a
            className="underline text-emerald-500	text-lg rounded-lg p-2 m-3"
            href="http://github.com/stefanoslig"
          >
            github
          </a>
          <a
            className="underline text-sky-500	text-lg rounded-lg p-2 m-3"
            href="https://www.linkedin.com/in/stefanoslignos/"
          >
            linkedin
          </a>
        </div>
        <div className="flex justify-center pt-6">
          <div className="about">long story short</div>
          <div>long story</div>
          <div>short story</div>
        </div>
      </Container>
    </>
  );
}

export default HomePage;
