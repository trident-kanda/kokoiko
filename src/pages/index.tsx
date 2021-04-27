import Head from "next/head";
import Container from "../components/Container";
import Nav from "../components/Nav";
import Sidenav from "../components/Sidenav";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../util/userContext";
import Main from "../components/Main";
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
      {user && (
        <Container>
          <Head>
            <title>KOKOIKO</title>
          </Head>
          <Nav />
          <Main>
            <div className="h-96 bg-white  sm:rounded-lg shadow p-4"></div>
          </Main>
        </Container>
      )}
    </div>
  );
}
