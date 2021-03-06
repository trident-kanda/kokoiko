import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { format } from "date-fns";
import {
  checkUserRes,
  getFriendDataRes,
  getFriendRes,
  getRecruitmentsDataRes,
  getUserRes,
} from "../src/types/graphqlTypes";
const SEND_FRIEND = gql`
  mutation ($uid: uuid!, $requestuid: uuid!) {
    insert_friendrequest(objects: { uid: $uid, requestuid: $requestuid }) {
      returning {
        uid
      }
    }
  }
`;
const GET_USER_DATA = gql`
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
    $name: String!
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
        name: $name
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

const GET_RECRUITMENTS_DATA = gql`
  query ($idList: [uuid!], $today: date) {
    recruitments(where: { uid: { _in: $idList }, date: { _gte: $today } }) {
      id
      date
      title
      name
      overview
    }
  }
`;

const GET_RECRUITMENT_DATA = gql`
  query ($id: Int!) {
    recruitments(where: { id: { _eq: $id } }) {
      date
      detailPlace
      id
      lat
      lng
      name
      numberPeople
      overview
      time
      title
      uid
    }
  }
`;

const GET_FRIENDDATA = gql`
  query ($uid: [uuid!]) {
    users(where: { uid: { _in: $uid } }) {
      uid
      name
      friendid
    }
  }
`;

const DELETE_FRIEND = gql`
  mutation ($uid: uuid!, $frienduid: uuid!) {
    delete_friends(
      where: { uid: { _eq: $uid }, _and: { frienduid: { _eq: $frienduid } } }
    ) {
      returning {
        uid
      }
    }
  }
`;
//apollo????????????????????????
export const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache: new InMemoryCache(),
});

//??????????????????????????????????????????
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

//??????????????????????????????
export const getUserData = async (friendid: string) => {
  return await client
    .query({
      query: GET_USER_DATA,
      variables: { friendid: friendid },
    })
    .then((res: getUserRes) => {
      return res.data.users;
    })
    .catch((err) => {
      return "err";
    });
};

//????????????????????????????????????????????????????????????
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

//??????????????????????????????????????????
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

//??????????????????????????????
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

//??????????????????????????????????????????????????????????????????????????????
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

//?????????????????????
export const setRecruitment = async (
  uid: string,
  date: string,
  detailPlace: string,
  numberPeople: string,
  overview: string,
  time: string,
  title: string,
  lat: number,
  lng: number,
  name: string
) => {
  console.log(uid);
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
        name: name,
      },
    })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
//?????????????????????
export const setUser = async (name: string, uid: string, friendid: string) => {
  return await client
    .mutate({
      mutation: SET_USER,
      variables: {
        name: name,
        uid: uid,
        friendid: friendid,
      },
    })
    .then((res) => {})
    .catch((err) => {});
};
//uid????????????????????????????????????
export const checkUser = async (uid: string) => {
  return await client
    .query({
      query: CHECK_USER,
      variables: {
        uid: uid,
      },
    })
    .then((res: checkUserRes) => {
      if (res.data.users.length === 0) {
        return true;
      }
      if (res.data.users.length !== 0) {
        return false;
      }
    })
    .catch((err) => {
      return false;
    });
};
//????????????????????????uid?????????
export const getFriend = async (uid: string) => {
  return await client
    .query({
      query: GET_FRIEND,
      variables: {
        uid: uid,
      },
    })
    .then((res: getFriendRes) => {
      const friendList = res.data.friends.map((friend) => {
        return friend.frienduid;
      });
      return friendList;
    })
    .catch((err) => {
      return err;
    });
};
//???????????????????????????????????????
export const getRecruitmentsData = async (list: String[]) => {
  const today = format(new Date(), "yyyy-MM-dd");
  return await client
    .query({
      query: GET_RECRUITMENTS_DATA,
      variables: {
        uid: list,
        today: today,
      },
    })
    .then((res: getRecruitmentsDataRes) => {
      return res.data.recruitments;
    })
    .catch((err) => {
      return err;
    });
};

//??????????????????????????????????????????
export const getFriendData = async (uid: String[]) => {
  return await client
    .query({
      query: GET_FRIENDDATA,
      variables: {
        uid: uid,
      },
    })
    .then((res: getFriendDataRes) => {
      return res.data.users;
    })
    .catch((err) => {
      return err;
    });
};
//???????????????????????????
export const deleteFriend = async (uid: string, frienduid: string) => {
  return await client
    .mutate({
      mutation: DELETE_FRIEND,
      variables: {
        uid: uid,
        frienduid: frienduid,
      },
    })
    .then((res) => {})
    .catch((err) => {});
};

//id?????????????????????
export const getRecruintmentData = async (id: number | string) => {
  return await client
    .query({
      query: GET_RECRUITMENT_DATA,
      variables: {
        id: id,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return false;
    });
};
