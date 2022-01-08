import Image from "next/image";
import Container from "../components/container";
import LongStoryShort from "../components/long-story-short";

function HomePage() {
  return (
    <>
      <Container>
        <div className="flex flex-col max-w-xl mx-auto">
          <div className="flex pt-4 items-center">
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
          <div className="flex mt-16">
            <a
              className="underline text-orange-500 text-lg  mr-10"
              href="http://twitter.com/stefanos_lig"
            >
              twitter
            </a>
            <a
              className="underline text-emerald-500	text-lg mr-10"
              href="http://github.com/stefanoslig"
            >
              github
            </a>
            <a
              className="underline text-sky-500	text-lg  mr-10"
              href="https://www.linkedin.com/in/stefanoslignos/"
            >
              linkedin
            </a>
            <a
              className="underline text-red-500	text-lg  mr-10"
              href="https://medium.com/@stefanoslignos"
            >
              medium
            </a>
          </div>

          <LongStoryShort />
        </div>
      </Container>
    </>
  );
}

export default HomePage;
