import { GetServerSideProps } from "next";
import { redirect } from "next/dist/next-server/server/api-utils";
import { useRouter } from "next/router";
import { friendCheck, getRecruintmentData } from "../../../util/graphql";
import { supabase } from "../../../util/key";

const id = () => {
  return (
    <div>
      <h1>aaa</h1>
    </div>
  );
};

export default id;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const id: string = String(query.id);
  const res = await getRecruintmentData(id);
  console.log(res);
  if (!user) {
    return {
      props: {},
      redirect: { destination: "/signin", permanent: false },
    };
  }
  // 投稿がなかったら404に返す;
  if (!res) {
    return {
      props: {},
      redirect: { destination: "/404" },
    };
  }
  // const check = friendCheck(user.id);
  return {
    props: {
      user,
    },
  };
};
