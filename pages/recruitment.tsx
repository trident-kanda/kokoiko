import Head from "next/head";
import Container from "../components/Container";
import Bottomnav from "../components/Bottomnav";
import Nav from "../components/Nav";
export default function recruiment() {
  return (
    <div>
      <Container>
        <Head>
          <title>KOKOIKO</title>
        </Head>
        <Nav />
        <div className="lg:flex">
          <div className=" h-96 bg-white  sm:rounded-lg shadow max-w-3xl flex-8 p-4"></div>
          <div className=" lg:block flex-2 ml-5">
            <div className="bg-white rounded-lg  shadow p-4 hidden lg:block ">
              <a></a>
              <a></a>
              <a></a>
            </div>
          </div>
        </div>
      </Container>
      <Bottomnav />
    </div>
  );
}
