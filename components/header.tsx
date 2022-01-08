import Link from "next/link";
import { FunctionComponent } from "react";
import Container from "./container";
import { useRouter } from "next/router";

const Header: FunctionComponent = () => {
  const router = useRouter();


  return (
    <header className="py-10">
      <Container>
        <nav className="flex space-x-6 pl-8" >
          <Link href="/">
            <a className={router.pathname == "/" ? "underline text-xl" : "text-xl"}>About</a>
          </Link>
          <Link href="/posts">
            <a className={router.pathname == "/posts" ? "underline text-xl" : "text-xl"}>Posts</a>
          </Link>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
