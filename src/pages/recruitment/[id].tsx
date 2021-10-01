import { GetServerSideProps } from "next";
import { friendCheck, getRecruintmentData } from "../../../util/graphql";
import { supabase } from "../../../util/key";
import Container from "../../components/Container";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
const id = ({user,
  recData,check}:any) => {
    const router = useRouter()
    useEffect(()=>{
      //フレンドの記事じゃない場合戻る
      if(!check){
        alert("フレンドの記事ではありません")
        router.push("/")
      }
    },[])
  return (
    <>
      <Container>
        <Head>
          <title>KOKOIKO</title>
        </Head>
        <Link href="/">
          <a className="hover:text-gray-500">戻る</a>
        </Link>
        <div className="bg-white shadow-sm sm:rounded-lg pt-5 px-10 pb-10">
            
        </div>
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
  const recData = res.recruitments[0]
  let check = true
  if(user.id !== recData.uid){
    //自分のフレンドの投稿かどうかを確認する
   check = await friendCheck(user.id,recData.uid)
  }
  return {
    props: {
      user,
      recData,
      check
    },
  };
};
