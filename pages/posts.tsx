import Container from "../components/container";

function Posts() {
  return (
    <>
      <Container>
        <h4>
          I&apos;m currently implementing my blog. It will be released on the 21st of
          January 2022.
        </h4>
        <h4>
          Until then have a look on my account on
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

export default Posts;
