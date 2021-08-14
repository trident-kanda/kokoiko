import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../util/key";

const Header = () => {
  const { pathname, push } = useRouter();
  return (
    <header className="h-16 bg-white shadow-sm border-b-2 border-green-500">
      <div className="py-1.5 px-4 sm:px-6 max-w-3xl lg:max-w-5xl mx-auto lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Link href="/">
            <a className=" font-bold text-3xl text-green-500">KOKOIKO</a>
          </Link>
          {pathname !== "/signin" &&
            pathname !== "/signup" &&
            pathname !== "/404" && (
              <button
                className="py-2 bg-green-500 rounded-lg hover:bg-green-300 w-24 text-white focus:outline-none"
                onClick={() => {
                  supabase.auth.signOut();
                  push("/signin");
                }}
              >
                ログアウト
              </button>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
