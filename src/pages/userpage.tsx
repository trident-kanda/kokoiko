import Head from "next/head";
import Container from "../components/Container";
import Nav from "../components/Nav";
import Main from "../components/Main";
import Input from "../components/form/Input";
import Link from "next/link";
export default function userpage() {
  return (
    <div>
      <Container>
        <Head>
          <title>KOKOIKO</title>
        </Head>
        <Nav />
        <Main>
          <div className="h-20 bg-white  sm:rounded-lg shadow">
            <Link href="/namechange">
              <a>名前変更</a>
            </Link>
          </div>
          <div className="h-4" />
          <div className="h-20  bg-white  sm:rounded-lg shadow"></div>
          <div className="h-4" />
          <div className="h-20  bg-white  sm:rounded-lg shadow"></div>
          <div className="h-4" />
        </Main>
      </Container>
    </div>
  );
}
