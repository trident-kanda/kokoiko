import Container from "../components/Container";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { supabase } from "../../util/key";
import { getFriend, getFriendData } from "../../util/graphql";
import { User } from "@supabase/supabase-js";
type friendData = {
  data: {
    users: {
      name: string;
      friendId: string;
    }[];
  };
};
type props = {
  user: User;
  friendData: friendData;
};
const friendlist = ({ user, friendData }: props) => {
  return (
    <Container>
      <Link href="/userpage">
        <a className="hover:text-gray-500">戻る</a>
      </Link>
      <div className="bg-white shadow-sm sm:rounded-lg pt-5 px-10 pb-10  ">
        <h2 className="text-xl bold text-gray-500 pb-1">フレンドリスト</h2>
      </div>
    </Container>
  );
};

export default friendlist;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  type idData = {
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
  const friendId: idData = await getFriend(user.id);
  const friendList = friendId.data.friends.map((friend) => {
    return friend.frienduid;
  });
  const friendData = await getFriendData(friendList);
  return {
    props: {
      user,
      friendData,
    },
  };
};
