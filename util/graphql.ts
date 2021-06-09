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
  query ($uid: uuid!) {
    friendrequest(where: { uid: { _eq: $uid } }) {
      uid
    }
  }
`;

const DELETE_REQUEST = gql`
  mutation ($uid: uuid!, $requestuid: uuid!) {
    delete_friendrequest(
      where: { uid: { _eq: $uid }, _and: { requestuid: { _eq: $requestuid } } }
    )
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

export const requestCheck = async (
  uid: string,
  client: ApolloClient<object>
) => {
  return await client
    .mutate({
      mutation: REQURST_CHECK,
      variables: { uid: uid },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

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
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const setFriend = async (
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
    .catch((err) => {
      return err;
    });
};
