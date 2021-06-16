import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

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

const GET_FRIEND = gql`
  query ($uid: uuid!) {
    friends(where: { uid: { _eq: $uid } }) {
      frienduid
    }
  }
`;

const SET_RECRUITMENT = gql`
  mutation (
    $date: date!
    $detailPlace: String!
    $numberPeople: smallint!
    $overview: String!
    $time: time!
    $title: String!
    $uid: uuid!
    $lat: float8!
    $lng: float8!
  ) {
    insert_recruitments(
      objects: {
        date: $date
        detailPlace: $detailPlace
        numberPeople: $numberPeople
        overview: $overview
        time: $time
        title: $title
        uid: $uid
        lat: $lat
        lng: $lng
      }
    ) {
      returning {
        id
      }
    }
  }
`;

const SET_USER = gql`
  mutation ($name: String!, $uid: uuid!, $friendid: Int!) {
    insert_users(objects: { name: $name, uid: $uid, friendid: $friendid }) {
      returning {
        name
        uid
        friendid
      }
    }
  }
`;

const CHECK_USER = gql`
  query ($uid: uuid) {
    users(where: { uid: { _eq: $uid } }) {
      uid
    }
  }
`;

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache: new InMemoryCache(),
});

//フレンドリクエストを送信する
export const sendFriend = async (uid: string, requid: string) => {
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
export const getUser = async (friendid: string) => {
  return await client
    .query({
      query: GET_USER,
      variables: { friendid: friendid },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return "err";
    });
};

//相手が自分にリクエストを送っているか確認
export const requestCheck = async (uid: string, requid: string) => {
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
export const deleteRequest = async (uid: string, requid: string) => {
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
export const setFriend = async (uid: string, requid: string) => {
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
export const friendCheck = async (uid: string, checkuid: string) => {
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

//募集情報を送信
export const setRecruitment = async (
  uid: string,
  date: string,
  detailPlace: string,
  numberPeople: string,
  overview: string,
  time: string,
  title: string,
  lat: number,
  lng: number
) => {
  return await client
    .mutate({
      mutation: SET_RECRUITMENT,
      variables: {
        uid: uid,
        date: date,
        detailPlace: detailPlace,
        numberPeople: numberPeople,
        overview: overview,
        time: time,
        title: title,
        lat: lat,
        lng: lng,
      },
    })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};

export const setUser = async (
  name: string,
  uid: string,
  friendid: number,
  client: ApolloClient<object>
) => {
  return await client
    .mutate({
      mutation: SET_USER,
      variables: {
        name: name,
        uid: uid,
        friendid: friendid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const checkUser = async (uid: string, client: ApolloClient<object>) => {
  return await client
    .query({
      query: CHECK_USER,
      variables: {
        uid: uid,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const getFriend = async (uid: string) => {
  return await client
    .query({
      query: GET_USER,
      variables: {
        uid: uid,
      },
    })
    .then((res) => {})
    .catch((err) => {});
};
