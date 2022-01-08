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
        <nav className="flex pl-8 justify-between">
          <div className="space-x-6 ">
            <Link href="/">
              <a
                className={
                  router.pathname == "/" ? "underline text-xl" : "text-xl"
                }
              >
                About
              </a>
            </Link>
            <Link href="/posts">
              <a
                className={
                  router.pathname == "/posts" ? "underline text-xl" : "text-xl"
                }
              >
                Posts
              </a>
            </Link>
          </div>
          <div className="">
            <AiOutlineMail  className="inline-block"/> <span className="ml-1">stefanoslignos@gmail.com</span>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
