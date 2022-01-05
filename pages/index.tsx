import Image from "next/image";
import Container from "../components/container";

function HomePage() {
  return (
    <>
      <Container>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Stefanos Lignos</h1>
          <h2 className="text-2xl font-bold">Software Engineer in Amsterdam</h2>
        </div>
        <div className="container max-w-4xl m-auto px-4 mt-20">
          <Image
            src="/assets/my-photo.jpeg"
            alt="my photo"
            className="rounded-full"
            width={250}
            height={250}
          />
        </div>
      </Container>
      <div className="links">
        <a href="http://twitter.com/stefanos_lig">twitter</a>
        <a href="http://github.com/stefanoslig">github</a>
        <a href="https://www.linkedin.com/in/stefanoslignos/">linkedin</a>
      </div>
      <div className="about">long story short</div>
      <div>long story</div>
      <div>short story</div>
    </>
  );
}

export default HomePage;
