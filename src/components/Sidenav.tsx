import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "./Icon/HomeIcon";
import RecruitIcon from "./Icon/RecruitIcon";
import UserIcon from "./Icon/UserIcon";
const Sidenav = () => {
  const { pathname } = useRouter();
  return (
    <nav className="bg-white rounded-lg  shadow  flex flex-col ">
      <Link href="/">
        <a className="flex-1 py-4 flex items-center justify-center hover:bg-gray-200 h-20 rounded-t-lg">
          <div className="flex items-center justify-center h-full ">
            {pathname === "/" && (
              <>
                <HomeIcon color="rgb(16, 185, 129)" />
                <span className=" text-green-500">ホーム</span>
              </>
            )}
            {pathname !== "/" && (
              <>
                <HomeIcon color="rgb(107, 114, 128)" />
                <span className=" text-gray-500">ホーム</span>
              </>
            )}
          </div>
        </a>
      </Link>
      <Link href="/recruitment">
        <a className="flex-1 py-4 flex items-center justify-center hover:bg-gray-200 h-20 border-t border-b">
          <div className="flex items-center justify-center h-full ">
            {pathname === "/recruitment" && (
              <>
                <RecruitIcon color="rgb(16, 185, 129)" />
                <span className=" text-green-500">募集</span>
              </>
            )}
            {pathname !== "/recruitment" && (
              <>
                <RecruitIcon color="rgb(107, 114, 128)" />
                <span className=" text-gray-500">募集</span>
              </>
            )}
          </div>
        </a>
      </Link>
      <Link href="/userpage">
        <a className="flex-1 py-4 flex items-center justify-center hover:bg-gray-200 h-20 rounded-b-lg">
          <div className="flex items-center justify-center h-full ">
            {pathname === "/userpage" && (
              <>
                <UserIcon color="rgb(16, 185, 129)" />
                <span className=" text-green-500">ユーザーページ</span>
              </>
            )}
            {pathname !== "/userpage" && (
              <>
                <UserIcon color="rgb(107, 114, 128)" />
                <span className=" text-gray-500">ユーザーページ</span>
              </>
            )}
          </div>
        </a>
      </Link>
    </nav>
  );
};

export default Sidenav;
