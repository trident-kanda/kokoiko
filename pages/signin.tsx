import Container from "../components/Container";
import Link from "next/link";
import { logIn, googleLogin } from "../supabase/auth";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { UserContext } from "../util/userContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const Signin = () => {
  const { user, session } = useContext(UserContext);
  const { replace } = useRouter();
  useEffect(() => {
    if (user) {
      replace("/");
    }
  }, [user]);
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
    logIn(data);
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
            <label htmlFor="email" className="font-bold">
              メールアドレス<span className=" text-red-500">*</span>
              {errors.email && (
                <span className="ml-3 text-red-500">
                  {errors.email.message}
                </span>
              )}
            </label>
            <input
              placeholder="メールアドレス"
              {...register("email", {
                required: "必須項目です",
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "メールアドレスが不適切です",
                },
              })}
              type="email"
              className="w-full border-gray-300 border-2 rounded-md focus:outline-none focus:border-green-300"
            />
            <label className="font-bold">
              パスワード<span className=" text-red-500">*</span>
              {errors.password && (
                <span className="ml-3 text-red-500">
                  {errors.password.message}
                </span>
              )}
            </label>
            <input
              type="password"
              placeholder="パスワード(8文字以上)"
              className="w-full border-gray-300 border-2 rounded-md focus:outline-none focus:border-green-300"
              {...register("password", {
                required: "必須項目です",
                pattern: {
                  value: /^[a-z\d]{8,100}$/i,
                  message: "パスワードは8文字以上です",
                },
              })}
            />
            <div className="h-4" />
            <input
              type="submit"
              className="py-2 text-white rounded-lg  bg-green-500 hover:bg-green-300 focus:outline-none w-36"
              value="ログイン"
            />
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
