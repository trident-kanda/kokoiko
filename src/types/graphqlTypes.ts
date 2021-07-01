// export type sendFriendRes = {
//   data: {
//     insert_friendrequest: {
//       returning: {
//         uid: string;
//       }[];
//     };
//   };
// };
export type getUserRes = {
  data: {
    friends: {
      name: string;
      uid: string;
    }[];
  };
};
export type getFriendRes = {
  data: {
    friends: {
      frienduid: string;
    }[];
  };
};
export type getFriendDataRes = {
  data: {
    users: {
      name: string;
      friendid: string;
    }[];
  };
};
