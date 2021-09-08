import { GetServerSideProps } from "next";
import { redirect } from "next/dist/next-server/server/api-utils";
import { useRouter } from "next/router";
import { getRecruintmentData } from "../../../util/graphql";
import { supabase } from "../../../util/key";

const id = () => {
  return (
    <div>
      <h1>aaa</h1>
    </div>
  );
};

export default id;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const id = Number(req.url?.split("/")[2]);
  const res = await getRecruintmentData(id);
  console.log(res.data);
  if (!user) {
    return {
      props: {},
      redirect: { destination: "/signin", permanent: false },
    };
  }
  if (!res.data) {
    return {
      props: {},
      redirect: { destination: "/404" },
    };
  }
  return {
    props: {
      user,
    },
  };
};
