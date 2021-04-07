import { useCallback, useState } from "react";
import { supabase } from "../supabase/key";
import Container from "../components/Container";
import Link from "next/link";
import { logIn } from "../util/check";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const setErrortext = useCallback(
    (text: string) => {
      setError(text);
    },
    [setError]
  );

  const googleLogin = () => {
    const res = supabase.auth.signIn({ provider: "google" });
    console.log(res);
  };

  return (
    <Container>
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
            <div className="h-4" />
            <button
              onClick={() => {
                logIn(email, password, setErrortext);
              }}
              className="py-2 text-white rounded-lg  bg-green-500 hover:bg-green-300 focus:outline-none w-36"
            >
              ログイン
            </button>
            <div className="h-4" />
            <Link href="/signup">
              <a className="font-bold hover:text-gray-400">会員登録はこちら</a>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signin;
