import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
const Nav = () => {
  const { pathname } = useRouter();
  return (
    <nav className="h-20 hidden bg-white md:rounded-lg shadow md:flex lg:hidden mb-6">
      <Link href="/">
        <a className="flex-1 py-2 flex items-center justify-center hover:bg-gray-200">
          {pathname === "/" && (
            <div className="flex items-center justify-center h-full">
              <Image src="/svg/home_light.svg" width="30" height="30" />
              <span className=" text-green-500">ホーム</span>
            </div>
          )}
          {pathname !== "/" && (
            <div className="flex items-center justify-center h-full">
              <Image src="/svg/home.svg" width="30" height="30" />
              <span className=" text-gray-500">ホーム</span>
            </div>
          )}
        </a>
      </Link>
      <Link href="/recruitment">
        <a className="flex-1 py-2 flex items-center justify-center hover:bg-gray-200">
          {pathname === "/recruitment" && (
            <div className="flex items-center justify-center h-full">
              <Image src="/svg/write_light.svg" width="30" height="30" />
              <span className=" text-green-500">募集</span>
            </div>
          )}
          {pathname !== "/recruitment" && (
            <div className="flex items-center justify-center h-full">
              <Image src="/svg/write.svg" width="30" height="30" />
              <span className=" text-gray-500">募集</span>
            </div>
          )}
        </a>
      </Link>
      <Link href="/userpage">
        <a className="flex-1 py-2 flex items-center justify-center hover:bg-gray-200">
          {pathname === "/userpage" && (
            <div className="flex items-center justify-center h-full">
              <Image src="/svg/userpage_light.svg" width="30" height="30" />
              <span className=" text-green-500">ユーザページ</span>
            </div>
          )}
          {pathname !== "/userpage" && (
            <div className="flex items-center justify-center h-full">
              <Image src="/svg/userpage.svg" width="30" height="30" />
              <span className=" text-gray-500">ユーザページ</span>
            </div>
          )}
        </a>
      </Link>
    </nav>
  );
};

export default Nav;
