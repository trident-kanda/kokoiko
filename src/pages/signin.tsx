import Container from "../components/Container";
import Link from "next/link";
import { signIn, googleLogin, setFriendId } from "../../util/auth";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { supabase } from "../../util/key";
import Input from "../components/form/Input";
import ErrorLabel from "../components/form/ErrorLabel";
import { createId } from "../../util/util";
import { checkUser, setUser } from "../../util/graphql";

const Signin = () => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          if (checkUser(session?.user?.id)) {
            const id = createId();
            setUser(
              session?.user?.user_metadata.full_name,
              session.user.id,
              id
            );
          }
        }
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, []);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  type form = {
    email: string;
    password: string;
  };
  const onSubmit = (data: form) => {
    signIn(data, setErrorMessage);
  };
  return (
    <Container>
      <Head>
        <title>KOKOIKO | signin</title>
      </Head>
      <div className="bg-white shadow-sm rounded-lg p-5 ">
        <p className="font-bold">ログイン</p>
        <div className="h-4" />
        <div className="md:flex">
          <div className="md:flex-1">
            <button
              onClick={googleLogin}
              className=" py-2 bg-googlered text-white rounded-lg  hover:bg-red-300 focus:outline-none w-52"
            >
              Googleでログイン
            </button>
            <div className="h-4" />
          </div>
          <form className="md:flex-1" onSubmit={handleSubmit(onSubmit)}>
            <ErrorLabel
              name="メールアドレス"
              error={errors.email}
              anotherError={errorMessage}
              required={true}
            />
            <Input
              type="email"
              placeholder="メールアドレス"
              register={register}
              name="email"
              value={
                /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
              }
              message="メールアドレスが不適切です"
            />
            <ErrorLabel
              name="パスワード"
              error={errors.password}
              required={true}
            />
            <Input
              type="password"
              placeholder="パスワード(8文字以上)"
              register={register}
              name="password"
              value={/^[a-z\d]{8,100}$/i}
              message="パスワードは8文字以上です"
            />
            <div className="h-4" />
            <button className="py-2 text-white rounded-lg  bg-green-500 hover:bg-green-300 focus:outline-none w-36">
              ログイン
            </button>
            <div className="h-4" />
            <Link href="/signup">
              <a className="font-bold hover:text-gray-400">会員登録はこちら</a>
            </Link>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Signin;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user) {
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
  return {
    props: {
      user,
    },
  };
};
