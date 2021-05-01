import Head from "next/head";
import Container from "../components/Container";
import Nav from "../components/Nav";
import Main from "../components/Main";
import { GetServerSideProps } from "next";
import { supabase } from "../../supabase/key";

export default function Home() {
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      props: {},
      redirect: { destination: "/signin", permanent: false },
    };
  }
  return {
    props: {
      user,
    },
  };
};
