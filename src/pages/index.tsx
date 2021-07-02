import Head from "next/head";
import Container from "../components/Container";
import Nav from "../components/Nav";
import Main from "../components/Main";
import { GetServerSideProps } from "next";
import { supabase } from "../../util/key";
import { getFriend, getRecruitmentData } from "../../util/graphql";
import { User } from "@supabase/supabase-js";
import DisplayData from "../components/DisplayData";

type displayData = {
  id: number;
  date: string;
  title: string;
}[];
type props = {
  user: User;
  displayData?: displayData;
};
export default function Home({ user, displayData }: props) {
  return (
    <div>
      <Container>
        <Head>
          <title>KOKOIKO</title>
        </Head>
        <Nav />
        <Main>
          <div className="h-96 bg-white  sm:rounded-lg shadow p-4 flex flex-wrap">
            <DisplayData title={"名古屋観光"} />
            <DisplayData title={"東京観光"} />
          </div>
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
  const friendList: string[] = await getFriend(user.id);
  const displayData: displayData = await getRecruitmentData(friendList);
  return {
    props: {
      user,
      displayData,
    },
  };
};
