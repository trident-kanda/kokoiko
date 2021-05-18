import { GetServerSideProps } from "next";
import { supabase } from "../../util/key";
import Container from "../components/Container";
import Link from "next/link";
import { useState } from "react";
import {
  useMutation,
  gql,
  useLazyQuery,
  useApolloClient,
} from "@apollo/client";
import Modal from "react-modal";
const friendsearch = ({ user }: any) => {
  const [inputid, setId] = useState("");
  const [modalState, modalChange] = useState(false);
  const SEND_FRIEND = gql`
    mutation ($uid: uuid!, $name: String!) {
      update_users(_set: { name: $name }, where: { uid: { _eq: $uid } }) {
        returning {
          name
        }
      }
    }
  `;
  const GET_USER = gql`
    query ($friendid: Int!) {
      users(where: { friendid: { _eq: $friendid } }) {
        name
      }
    }
  `;
  const [sendFriendMutation] = useMutation(SEND_FRIEND);
  const [getUserData, { loading, data, error }] = useLazyQuery(GET_USER);
  const client = useApolloClient();
  Modal.setAppElement("#__next");
  const closeModal = () => {
    modalChange(false);
  };

  const customStyles: any = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
    },

    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "500px",
      height: "300px",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Container>
      <Link href="/userpage">
        <a className="hover:text-gray-500">戻る</a>
      </Link>
      <div className="bg-white shadow-sm sm:rounded-lg pt-5 px-10 pb-10  ">
        <Modal
          isOpen={modalState}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div>
            <button
              onClick={() => {
                modalChange(false);
              }}
            >
              閉じる
            </button>
          </div>
        </Modal>
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
              onClick={() => {
                // getUserData({ variables: { friendid: inputid } });
                client
                  .query({
                    query: GET_USER,
                    variables: { friendid: inputid },
                  })
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                // modalChange(true);
              }}
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
