import Link from "next/link";
import { FunctionComponent } from "react";
import Container from "./container";
import { useRouter } from "next/router";
import { AiOutlineMail } from "react-icons/ai";

const Header: FunctionComponent = () => {
  const router = useRouter();

  return (
    <header className="py-10">
      <Container>
        <nav className="flex md:pl-8 sm:pl-2 justify-between">
          <div className="space-x-6 ">
            <Link
              href="/"
              className={
                router.pathname == "/" ? "underline text-xl" : "text-xl"
              }
            >
              About
            </Link>
            <Link
              href="/posts"
              className={
                router.pathname == "/posts" ? "underline text-xl" : "text-xl"
              }
            >
              Posts
            </Link>
          </div>

          <div className="ml-6 flex align-middle">
            <AiOutlineMail className="inline-block mt-1" />{" "}
            <span className="ml-1 inline-block">stefanoslignos@gmail.com</span>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
