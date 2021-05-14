import { GetServerSideProps } from "next";
import { supabase } from "../../util/key";
import Container from "../components/Container";
import Link from "next/link";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
const friendsearch = ({ user }: any) => {
  const [inputid, setId] = useState("");
  const SEND_FRIEND = gql`
    mutation ($uid: uuid!, $name: String!) {
      update_users(_set: { name: $name }, where: { uid: { _eq: $uid } }) {
        returning {
          name
        }
      }
    }
  `;
  const [nameChangeMutation] = useMutation(SEND_FRIEND);
  return (
    <Container>
      <Link href="/userpage">
        <a className="hover:text-gray-500">戻る</a>
      </Link>
      <div className="bg-white shadow-sm sm:rounded-lg pt-5 px-10 pb-10  ">
        <h2 className="text-xl bold text-gray-500 pb-1">ユーザー検索</h2>
        <div className="flex items-center">
          <div className=" w-5/6 ">
            <input
              className="w-full border-gray-300 border-2 rounded-md focus:outline-none focus:border-green-300 px-2 py-1"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </div>
          <div className=" w-1/6">
            <button
              className="ml-2 py-2 bg-green-500 rounded-lg hover:bg-green-300 w-full text-white focus:outline-none"
              onClick={() => {}}
            >
              検索
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default friendsearch;

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
