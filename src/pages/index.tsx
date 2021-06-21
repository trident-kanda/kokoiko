import Head from "next/head";
import Container from "../components/Container";
import Nav from "../components/Nav";
import Main from "../components/Main";
import { GetServerSideProps } from "next";
import { supabase } from "../../util/key";
import { getDisplayData, getFriend } from "../../util/graphql";
type displayData = {
  data: {
    recruitments: {
      id: number;
      date: string;
      title: string;
    }[];
  };
};
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
  type data = {
    data: {
      friends: {
        frienduid: string;
      }[];
    };
  };
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      props: {},
      redirect: { destination: "/signin", permanent: false },
    };
  }
  const friendData: data = await getFriend(user.id);
  if (friendData.data.friends.length === 0) {
    return {
      props: {
        user,
      },
    };
  }
  const friendList = friendData.data.friends.map((friend) => {
    return friend.frienduid;
  });
  const res: displayData = await getDisplayData(friendList);
  console.log(res.data);
  return {
    props: {
      user,
    },
  };
};
