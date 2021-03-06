import Container from "../components/Container";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { supabase } from "../../util/key";
import { getFriend, getFriendData } from "../../util/graphql";
import { User } from "@supabase/supabase-js";
import FriendView from "../components/FriendView";
import { useCallback, useState } from "react";
import SadIcon from "../components/Icon/SadIcon";
type friendData = {
  uid: string;
  name: string;
  friendid: string;
}[];
type props = {
  user: User;
  friendData: friendData;
};
const friendlist = ({ user, friendData }: props) => {
  const [friendList, setList] = useState<friendData>(friendData);
  const deleteList = useCallback(
    (id: string) => {
      setList(
        friendList.filter((list) => {
          return list.friendid !== id;
        })
      );
    },
    [setList]
  );
  return (
    <Container>
      <Link href="/userpage">
        <a className="hover:text-gray-500">戻る</a>
      </Link>
      <div className="bg-white shadow-sm sm:rounded-lg pt-5 px-10 pb-10  ">
        <h2 className="text-xl bold text-gray-500 pb-1">フレンドリスト</h2>
        {friendList.length === 0 && (
          <div className="flex items-center justify-center h-96">
            <div>
              <SadIcon />
              <p className="text-lg font-bold text-gray-500">
                フレンドがいません
              </p>
            </div>
          </div>
        )}
        {friendList.map((data, num) => {
          return (
            <FriendView
              frienduid={data.uid}
              name={data.name}
              uid={user.id}
              id={data.friendid}
              key={num}
              deleteList={deleteList}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default friendlist;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      props: {},
      redirect: { destination: "/signin", permanent: false },
    };
  }
  const friendList: string[] = await getFriend(user.id);
  const friendData = await getFriendData(friendList);
  return {
    props: {
      user,
      friendData,
    },
  };
};
