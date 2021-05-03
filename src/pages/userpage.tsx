import Head from "next/head";
import Container from "../components/Container";
import Nav from "../components/Nav";
import Main from "../components/Main";
import Input from "../components/form/Input";
export default function userpage() {
  return (
    <div>
      <Container>
        <Head>
          <title>KOKOIKO</title>
        </Head>
        <Nav />
        <Main>
          <div className="h-96 bg-white  sm:rounded-lg shadow p-4"></div>
        </Main>
      </Container>
    </div>
  );
}
