import { GetServerSideProps } from "next";
import { getRecruintmentData } from "../../../util/graphql";
import { supabase } from "../../../util/key";
import Container from "../../components/Container";
import Head from "next/head";
import Link from "next/link";
const id = () => {
  return (
    <>
      <Container>
        <Head>
          <title>KOKOIKO</title>
        </Head>
        <Link href="/">
          <a className="hover:text-gray-500">戻る</a>
        </Link>
        <div className="bg-white shadow-sm sm:rounded-lg pt-5 px-10 pb-10  "></div>
      </Container>
    </>
  );
};

export default id;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const id: string = String(query.id);
  //idの募集データを取得
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
