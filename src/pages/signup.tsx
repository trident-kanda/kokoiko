import { useContext, useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import Link from "next/link";
import { signUp, googleLogin, changeName } from "../../supabase/auth";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { UserContext } from "../../util/userContext";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
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
            <label htmlFor="name" className="font-bold">
              名前<span className=" text-red-500">*</span>
              {errors.text && (
                <span className="ml-3 text-red-500">{errors.text.message}</span>
              )}
            </label>
            <input
              placeholder="名前"
              {...register("name", {
                required: "必須項目です",
              })}
              type="text"
              className="w-full border-gray-300 border-2 rounded-md focus:outline-none focus:border-green-300"
            />
            <label htmlFor="email" className="font-bold">
              メールアドレス<span className=" text-red-500">*</span>
              {errors.email && (
                <span className="ml-3 text-red-500">
                  {errors.email.message}
                </span>
              )}
              {errorMessage && (
                <span className="ml-3 text-red-500">{errorMessage}</span>
              )}
            </label>
            <input
              onClick={() => {
                setErrorMessage(null);
              }}
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
            <label className="font-bold">
              パスワード(確認用)<span className=" text-red-500">*</span>
              {errors.cfmpassword && (
                <span className="ml-3 text-red-500">
                  {errors.cfmpassword.message}
                </span>
              )}
            </label>
            <input
              type="password"
              placeholder="パスワード(確認用)"
              className="w-full border-gray-300 border-2 rounded-md focus:outline-none focus:border-green-300"
              {...register("cfmpassword", {
                required: "必須項目です",
                pattern: {
                  value: /^[a-z\d]{8,100}$/i,
                  message: "パスワードは8文字以上です",
                },
                validate: (value) =>
                  value === password.current || "パスワードが一致しません",
              })}
            />
            <div className="h-4" />
            <input
              type="submit"
              className="py-2 text-white rounded-lg  bg-green-500 hover:bg-green-300 focus:outline-none w-36"
              value="会員登録"
            />
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
