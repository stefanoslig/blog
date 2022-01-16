import Container from "../../components/container";

function Index() {
  return (
    <>
      <Container>
        <h4>
          I&apos;m currently implementing my blog. It will be available soon.
        </h4>
        <h4>
          Until then have a look at my account on
          <a
            className="underline text-sky-500	text-lg rounded-lg"
            href="https://medium.com/@stefanoslignos"
          >
            {" "}
            Medium
          </a>
          .
        </h4>
      </Container>
    </>
  );
}

export default Index;
