import Head from "next/head";
import Container from "../components/Container";
import Nav from "../components/Nav";
import Main from "../components/Main";
import Link from "next/link";
import TagIcon from "../components/Icon/TagIcon";
import SearchIcon from "../components/Icon/SearchIcon";
import UserIcon from "../components/Icon/UserIcon";
import ListIcon from "../components/Icon/ListIcon";
export default function userpage() {
  return (
    <div>
      <Container>
        <Head>
          <title>KOKOIKO</title>
        </Head>
        <Nav />
        <Main>
          <div className=" bg-white rounded-lg shadow sm:m-0 mx-5 divhover">
            <Link href="/namechange">
              <a className="flex items-center h-full p-5 ">
                <div className=" w-1/6 ">
                  <TagIcon
                    width={"50"}
                    height={"50"}
                    color="rgb(107, 114, 128)"
                  />
                </div>
                <div className=" w-5/6">
                  <p className="text-lg font-bold text-gray-500">名前変更</p>
                </div>
              </a>
            </Link>
          </div>
          <div className="h-4" />
          <div className=" bg-white rounded-lg shadow sm:m-0 mx-5 divhover">
            <Link href="/friendsearch">
              <a className="flex items-center h-full p-5 ">
                <div className=" w-1/6 ">
                  <SearchIcon
                    width={"50"}
                    height={"50"}
                    color="rgb(107, 114, 128)"
                  />
                </div>
                <div className=" w-5/6">
                  <p className="text-lg font-bold text-gray-500">
                    ユーザー検索
                  </p>
                </div>
              </a>
            </Link>
          </div>
          <div className="h-4" />
          <div className=" bg-white rounded-lg shadow sm:m-0 mx-5 divhover">
            <Link href="/namechange">
              <a className="flex items-center h-full p-5 ">
                <div className=" w-1/6 ">
                  <ListIcon
                    width={"50"}
                    height={"50"}
                    color="rgb(107, 114, 128)"
                  />
                </div>
                <div className=" w-5/6">
                  <p className="text-lg font-bold text-gray-500">
                    フレンドリスト
                  </p>
                </div>
              </a>
            </Link>
          </div>
          <div className="h-4" />
        </Main>
      </Container>
    </div>
  );
}
