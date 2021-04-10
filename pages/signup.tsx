import { useCallback, useState } from "react";
import Container from "../components/Container";
import Link from "next/link";
import { signUp, googleLogin } from "../supabase/auth";
import Head from "next/head";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [errorMessage, setError] = useState("");
  const emailInput = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const passInput = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const confirmPassInput = useCallback(
    (event) => {
      setconfirmPass(event.target.value);
    },
    [setconfirmPass]
  );

  const setErrortext = useCallback(
    (text: string) => {
      setError(text);
    },
    [setError]
  );

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
          <div className="md:flex-1">
            <p className="font-bold">
              メールアドレス<span className=" text-red-500">*</span>
              <span className="text-red-500 ml-6">{errorMessage}</span>
            </p>
            <input
              type="email"
              className="w-full border-gray-300 border-2 rounded-md focus:outline-none focus:border-green-300"
              onChange={emailInput}
            />
            <p className="font-bold">
              パスワード<span className=" text-red-500">*</span>
            </p>
            <input
              type="password"
              className="w-full border-gray-300 border-2 rounded-md focus:outline-none focus:border-green-300"
              onChange={passInput}
            />
            <p className="font-bold">
              確認用パスワード<span className=" text-red-500">*</span>
            </p>
            <input
              type="password"
              className="w-full border-gray-300 border-2 rounded-md focus:outline-none focus:border-green-300"
              onChange={confirmPassInput}
            />
            <div className="h-4" />
            <button
              onClick={() => {
                signUp(email, password, confirmPass, setErrortext);
              }}
              className=" py-2  text-white rounded-lg  bg-green-500 hover:bg-green-300 focus:outline-none w-36"
            >
              会員登録
            </button>
            <div className="h-4" />
            <Link href="/signin">
              <a className="font-bold hover:text-gray-400">ログインはこちら</a>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
