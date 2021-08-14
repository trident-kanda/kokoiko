import Head from "next/head";
import Container from "../components/Container";
import Nav from "../components/Nav";
import Main from "../components/Main";
import { GetServerSideProps } from "next";
import { supabase } from "../../util/key";
import { getFriend, getRecruitmentData } from "../../util/graphql";
import { User } from "@supabase/supabase-js";
import RecruitmentView from "../components/RecruitmentView";
import SadIcon from "../components/Icon/SadIcon";

type displayData = {
  id: number;
  date: string;
  title: string;
  name: string;
  overview: string;
}[];
type props = {
  user: User;
  displayData: displayData;
};
export default function Home({ user, displayData }: props) {
  return (
    <>
      <Container>
        <Head>
          <title>KOKOIKO</title>
        </Head>
        <Nav />
        <Main>
          {displayData.length === 0 && (
            <div className=" bg-white  sm:rounded-lg shadow p-4  ">
              <div className="flex items-center justify-center h-96">
                <div>
                  <SadIcon />
                  <p className="text-lg font-bold text-gray-500">
                    投稿がありません
                  </p>
                </div>
              </div>
            </div>
          )}
          {displayData.length !== 0 && (
            <div className=" bg-white  sm:rounded-lg shadow p-4 flex flex-wrap ">
              {displayData.map((item) => {
                return (
                  <RecruitmentView
                    key={item.id}
                    title={item.title}
                    date={item.date}
                    name={item.name}
                    overview={item.overview}
                    id={item.id}
                  />
                );
              })}
            </div>
          )}
        </Main>
      </Container>
    </>
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
