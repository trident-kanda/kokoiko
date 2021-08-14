import Link from "next/link";
import Container from "../components/Container";
import Main from "../components/Main";
const Custom404 = () => {
  return (
    <Container>
      <Main>
        <div className=" bg-white  sm:rounded-lg shadow p-4">
          <h1 className="text-green-500 text-7xl text-center">404</h1>
          <p className="text-center text-gray-500 text-xl">
            このページは存在しません。
          </p>
          <div className="text-center">
            <button className="py-2 text-black rounded-lg  bg-gray-200 hover:bg-gray-300 focus:outline-none w-36 shadow-md my-8 items-center">
              <Link href="/">
                <a>トップに戻る</a>
              </Link>
            </button>
          </div>
        </div>
      </Main>
    </Container>
  );
};

export default Custom404;
