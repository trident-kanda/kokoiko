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
    users: {
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
export type getRecruitmentDataRes = {
  data: {
    recruitments: {
      id: string;
      date: string;
      title: string;
      name: string;
      overview: string;
    }[];
  };
};
export type getFriendDataRes = {
  data: {
    users: {
      uid: string;
      name: string;
      friendid: string;
    }[];
  };
};
export type checkUserRes = {
  data: {
    users: {
      uid: string;
    }[];
  };
};
