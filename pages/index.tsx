import Head from "next/head";
import Container from "../components/Container";
import Bottomnav from "../components/Bottomnav";
import Nav from "../components/Nav";
import Sidenav from "../components/Sidenav";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../util/userContext";
export default function Home() {
  const { user, session } = useContext(UserContext);
  const { replace } = useRouter();
  useEffect(() => {
    if (!user) {
      replace("/signin");
    }
  }, [user]);
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
            <Sidenav />
          </div>
        </div>
      </Container>
      <Bottomnav />
    </div>
  );
}
