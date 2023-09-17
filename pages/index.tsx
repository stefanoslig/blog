import Image from "next/image";
import Container from "../components/container";
import LongStoryShort from "../components/long-story-short";

function HomePage() {
  return (
    <>
      <Container>
        <div className="flex flex-col mx-auto max-w-md">
          <div className="flex pt-4 items-center">
            <div className="pr-4">
              <h1 className="text-2xl text-slate-700 font-bold">
                Stefanos Lignos
              </h1>
              <h2 className="text-xl text-slate-600">
                Freelance Senior Front-end Engineer in Amsterdam
              </h2>
            </div>
            <Image
              src="/assets/my-photo-2.jpg"
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
