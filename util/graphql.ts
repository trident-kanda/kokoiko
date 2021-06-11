import { ApolloClient, gql } from "@apollo/client";

const SEND_FRIEND = gql`
  mutation ($uid: uuid!, $requestuid: uuid!) {
    insert_friendrequest(objects: { uid: $uid, requestuid: $requestuid }) {
      returning {
        uid
        requestuid
      }
    }
  }
`;
const GET_USER = gql`
  query ($friendid: Int!) {
    users(where: { friendid: { _eq: $friendid } }) {
      name
      uid
    }
  }
`;

const REQURST_CHECK = gql`
  query ($uid: uuid!, $requestuid: uuid!) {
    friendrequest(
      where: { uid: { _eq: $uid }, _and: { requestuid: { _eq: $requestuid } } }
    ) {
      uid
    }
  }
`;

const DELETE_REQUEST = gql`
  mutation ($uid: uuid!, $requestuid: uuid!) {
    delete_friendrequest(
      where: { uid: { _eq: $uid }, _and: { requestuid: { _eq: $requestuid } } }
    ) {
      returning {
        uid
      }
    }
  }
`;

const SET_FRIEND = gql`
  mutation ($uid: uuid!, $frienduid: uuid!) {
    insert_friends(objects: { uid: $uid, frienduid: $frienduid }) {
      returning {
        frienduid
        uid
      }
    }
  }
`;

const CHECK_FRIEND = gql`
  query ($uid: uuid!, $frienduid: uuid!) {
    friends(
      where: { uid: { _eq: $uid }, _and: { frienduid: { _eq: $frienduid } } }
    ) {
      uid
    }
  }
`;

//フレンドリクエストを送信する
export const sendFriend = async (
  uid: string,
  requid: string,
  client: ApolloClient<object>
) => {
  return await client
    .mutate({
      mutation: SEND_FRIEND,
      variables: { uid: uid, requestuid: requid },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

//ユーザーデータを取得
export const getUser = async (
  friendid: string,
  client: ApolloClient<object>
) => {
  return await client
    .query({
      query: GET_USER,
      variables: { friendid: friendid },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

//相手が自分にリクエストを送っているか確認
export const requestCheck = async (
  uid: string,
  requid: string,
  client: ApolloClient<object>
) => {
  return await client
    .query({
      query: REQURST_CHECK,
      variables: { uid: uid, requestuid: requid },
    })
    .then((res) => {
      if (res.data.friendrequest.length == 0) {
        return false;
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.log(err);
      return "err";
    });
};

//フレンドリクエストを削除する
export const deleteRequest = async (
  uid: string,
  requid: string,
  client: ApolloClient<object>
) => {
  return await client
    .mutate({
      mutation: DELETE_REQUEST,
      variables: { uid: uid, requestuid: requid },
    })
    .catch((err) => {
      return "err";
    });
};

//フレンドをセットする
export const setFriend = async (
  uid: string,
  requid: string,
  client: ApolloClient<object>
) => {
  return await client
    .mutate({
      mutation: SET_FRIEND,
      variables: { uid: uid, frienduid: requid },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

//フレンドリクエストを送る相手がフレンドじゃないか確認
export const friendCheck = async (
  uid: string,
  checkuid: string,
  client: ApolloClient<object>
) => {
  return await client
    .query({
      query: CHECK_FRIEND,
      variables: {
        uid: uid,
        frienduid: checkuid,
      },
    })
    .then((res) => {
      if (res.data.friends.length == 0) {
        return false;
      } else {
        return true;
      }
    })
    .catch((err) => {
      return false;
    });
};
