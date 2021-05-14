import Container from "../components/Container";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { supabase } from "../../util/key";
const friendlist = () => {
  return (
    <Container>
      <Link href="/userpage">
        <a className="hover:text-gray-500">戻る</a>
      </Link>
      <div className="bg-white shadow-sm sm:rounded-lg pt-5 px-10 pb-10  ">
        <h2 className="text-xl bold text-gray-500 pb-1">フレンドリスト</h2>
      </div>
    </Container>
  );
};

export default friendlist;

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
