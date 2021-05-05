import { useRef, useState } from "react";
import Container from "../components/Container";
import Link from "next/link";
import { signUp, googleLogin, changeName } from "../../supabase/auth";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { User } from "@supabase/supabase-js";
import { GetServerSideProps } from "next";
import { supabase } from "../../supabase/key";
import Input from "../components/form/Input";
import ErrorLabel from "../components/form/ErrorLabel";
import { setUserData } from "../../graphql/query";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();
  type form = {
    name: string;
    email: string;
    password: string;
    cfmpassword: string;
  };
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = async (data: form) => {
    const user: User | undefined = await signUp(data, setErrorMessage);
    if (user) {
      changeName(user, data.name);
      setUserData(user.id, data.name);
    }
  };
  return (
    <Container>
      <Head>
        <title>KOKOIKO | signup</title>
      </Head>
      <div className="bg-white shadow-sm rounded-lg p-5 ">
        <p className="font-bold">会員登録</p>
        <div className="h-4" />
        <div className="md:flex">
          <div className="md:flex-1">
            <button
              onClick={googleLogin}
              className=" py-2  bg-googlered text-white rounded-lg  hover:bg-red-300 focus:outline-none w-52 "
            >
              Googleでログイン
            </button>
            <div className="h-4" />
          </div>
          <form className="md:flex-1" onSubmit={handleSubmit(onSubmit)}>
            <ErrorLabel name="名前" error={errors.name} required={true} />
            <Input
              placeholder="名前"
              name="name"
              type="text"
              register={register}
            />
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
            <ErrorLabel
              name="パスワード(確認用)"
              error={errors.cfmpassword}
              required={true}
            />
            <Input
              type="password"
              placeholder="パスワード(確認用)"
              register={register}
              name="cfmpassword"
              value={/^[a-z\d]{8,100}$/i}
              message="パスワードは8文字以上です"
              validate={password.current}
            />
            <div className="h-4" />
            <button className="py-2 text-white rounded-lg  bg-green-500 hover:bg-green-300 focus:outline-none w-36">
              会員登録
            </button>
            <div className="h-4" />
            <Link href="/signin">
              <a className="font-bold hover:text-gray-400">ログインはこちら</a>
            </Link>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Signup;

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
