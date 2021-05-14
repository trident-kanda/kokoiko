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
      <div className="bg-white shadow-sm sm:rounded-lg p-10 flex items-center h-96"></div>
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
