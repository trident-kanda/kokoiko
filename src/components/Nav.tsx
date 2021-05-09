import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "./Icon/HomeIcon";
import RecruitIcon from "./Icon/RecruitIcon";
import UserIcon from "./Icon/UserIcon";
const Nav = () => {
  const { pathname } = useRouter();
  return (
    <nav className="h-20 flex fixed bottom-0  bg-white sm:rounded-lg shadow w-full sm:static sm:mb-6 lg:hidden">
      <Link href="/">
        <a className=" w-1/3 py-2 flex items-center justify-center hover:bg-gray-200 sm:rounded-l-lg">
          <div className="flex items-center justify-center h-full">
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
        <a className="w-1/3 py-2 flex items-center justify-center hover:bg-gray-200 border-r border-l">
          <div className="flex items-center justify-center h-full">
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
        <a className="w-1/3 py-2 flex items-center justify-center hover:bg-gray-200 sm:rounded-r-lg">
          <div className="flex items-center justify-center h-full">
            {pathname === "/userpage" && (
              <>
                <UserIcon color="rgb(16, 185, 129)" width={30} height={30} />
                <span className=" text-green-500">ユーザページ</span>
              </>
            )}
            {pathname !== "/userpage" && (
              <>
                <UserIcon color="rgb(107, 114, 128)" width={30} height={30} />
                <span className=" text-gray-500">ユーザページ</span>
              </>
            )}
          </div>
        </a>
      </Link>
    </nav>
  );
};

export default Nav;
