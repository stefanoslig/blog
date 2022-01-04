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

      <div>long</div>story<div>short</div>
    </>
  );
}

export default HomePage;
