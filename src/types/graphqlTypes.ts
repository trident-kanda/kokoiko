// export type sendFriendRes = {
//   data: {
//     insert_friendrequest: {
//       returning: {
//         uid: string;
//       }[];
//     };
//   };
// };

export type getFriendRes = {
  data: {
    friends: {
      frienduid: string;
    }[];
  };
};
