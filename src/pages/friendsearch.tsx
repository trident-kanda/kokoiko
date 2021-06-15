import { GetServerSideProps } from "next";
import { supabase } from "../../util/key";
import Container from "../components/Container";
import Link from "next/link";
import { useState } from "react";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import Modal from "react-modal";
import ReactLoading from "react-loading";
import {
  deleteRequest,
  friendCheck,
  getUser,
  requestCheck,
  sendFriend,
  setFriend,
} from "../../util/graphql";

const friendsearch = ({ user }: any) => {
  const [inputid, setId] = useState("");
  const [modalState, modalChange] = useState(false);
  const [userData, setUserdata] = useState<userDataProps>();
  const [load, loadChange] = useState(false);
  const [mutualState, mutualChange] = useState(false);
  type userDataProps = {
    name: string;
    uid: string;
    __typename: string;
  };

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
      width: "300px",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Container>
      <Link href="/userpage">
        <a className="hover:text-gray-500">戻る</a>
      </Link>
      <div className="bg-white shadow-sm sm:rounded-lg pt-5 px-10 pb-10 relative">
        {load && (
          <ReactLoading
            type={"spin"}
            color="gray"
            height={40}
            width={40}
            className="loading"
          />
        )}
        <Modal
          isOpen={modalState}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div className="relative">
            {load && (
              <div className=" loading ">
                <ReactLoading
                  type={"spin"}
                  color="gray"
                  height={40}
                  width={40}
                />
              </div>
            )}
            <p className="text-lg text-gray-500">ユーザー名</p>
            <p className=" text-lg font-bold">{userData?.name}</p>
            <div className="h-4" />
            <div className="flex justify-around ">
              <button
                className="ml-2 py-2 bg-red-500 rounded-lg hover:bg-red-300  text-white focus:outline-none w-1/3"
                onClick={() => {
                  modalChange(false);
                }}
              >
                閉じる
              </button>
              <button
                className="ml-2 py-2 bg-green-500 rounded-lg hover:bg-green-300  text-white focus:outline-none w-1/3"
                onClick={async () => {
                  loadChange(true);
                  if (userData) {
                    const friendState: boolean = await friendCheck(
                      user.id,
                      userData.uid
                    );
                    if (friendState || mutualState) {
                      loadChange(false);
                      modalChange(false);
                      alert("そのユーザーはフレンドです");
                      return;
                    }
                    const reqState: boolean | String = await requestCheck(
                      userData.uid,
                      user.id
                    );
                    console.log(friendState);
                    if (reqState === "err") {
                      alert("失敗しました。");
                      loadChange(false);
                      modalChange(false);
                      return;
                    }
                    if (reqState) {
                      await deleteRequest(userData.uid, user.id);
                      await setFriend(user.id, userData.uid);
                      await setFriend(userData.uid, user.id);
                      mutualChange(true);
                    }
                    if (!reqState) {
                      const res = await sendFriend(user.id, userData.uid);
                    }
                  }
                  loadChange(false);
                  modalChange(false);
                }}
              >
                送信
              </button>
            </div>
          </div>
        </Modal>
        <h2 className="text-xl bold text-gray-500 pb-1">自分のID</h2>
        <input
          defaultValue={user.user_metadata.friendid}
          readOnly
          className="w-full border-gray-300 border-2 rounded-md focus:outline-none focus:border-green-300 px-2 py-1"
        />
        <h2 className="text-xl bold text-gray-500 pb-1">ユーザー検索</h2>
        <div className="flex items-center">
          <div className=" w-5/6 ">
            <input
              placeholder="9桁のIDを入力"
              className="w-full border-gray-300 border-2 rounded-md focus:outline-none focus:border-green-300 px-2 py-1"
              onChange={(e) => {
                setId(e.target.value);
              }}
              maxLength={9}
            />
          </div>
          <div className=" w-1/6 ml-2">
            {inputid.length !== 9 && (
              <button className=" py-2 bg-gray-500 rounded-lg pointer-events-none w-full text-white focus:outline-none">
                検索
              </button>
            )}
            {inputid.length === 9 && (
              <button
                className=" py-2 bg-green-500 rounded-lg hover:bg-green-300 w-full text-white focus:outline-none"
                onClick={async () => {
                  if (user.user_metadata.friendid === inputid) {
                    alert("自分のIDです");
                    return;
                  }
                  loadChange(true);
                  const res: any = await getUser(inputid);
                  if (res.data.users.length !== 0) {
                    setUserdata(res.data.users[0]);
                    loadChange(false);
                    modalChange(true);
                  }
                  if (res.data.users.length === 0) {
                    loadChange(false);
                    alert("存在してないIDです");
                  }
                  if (res === "err") {
                    loadChange(false);
                    alert("エラー");
                  }
                }}
              >
                検索
              </button>
            )}
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
