import { GetServerSideProps } from "next";
import { supabase } from "../../supabase/key";
import Container from "../components/Container";
import Link from "next/link";
import { useState } from "react";
import { changeName } from "../../supabase/auth";
import { useMutation, gql } from "@apollo/client";
const namechange = ({ user }: any) => {
  const startName = user.user_metadata.full_name;
  const [name, setName] = useState(startName);
  const CHANGE_NAME = gql`
    mutation($uid: uuid!, $name: String!) {
      update_users(_set: { name: $name }, where: { uid: { _eq: $uid } }) {
        returning {
          name
        }
      }
    }
  `;
  const [nameChangeMutation] = useMutation(CHANGE_NAME);
  return (
    <Container>
      <Link href="/userpage">
        <a className="hover:text-gray-500">戻る</a>
      </Link>
      <div className="bg-white shadow-sm rounded-lg p-10 flex items-center ">
        <div className=" w-5/6 ">
          <input
            className="w-full border-gray-300 border-2 rounded-md focus:outline-none focus:border-green-300 px-2 py-1"
            defaultValue={startName}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className=" w-1/6">
          {startName === name && (
            <button
              className="ml-2 py-2 bg-gray-500 rounded-lg pointer-events-none w-full text-white focus:outline-none"
              onClick={() => {
                changeName(name);
                nameChangeMutation({ variables: { uid: user.id, name: name } });
              }}
            >
              変更
            </button>
          )}
          {startName !== name && (
            <button
              className="ml-2 py-2 bg-green-500 rounded-lg hover:bg-green-300 w-full text-white focus:outline-none"
              onClick={() => {
                changeName(name);
              }}
            >
              変更
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default namechange;

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
