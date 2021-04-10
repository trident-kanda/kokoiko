import { useRouter } from "next/router";
import { supabase } from "../supabase/key";

const Header = () => {
  const { pathname } = useRouter();
  return (
    <header className="h-16 bg-white shadow-sm border-b-2 border-green-500">
      <div className="py-1.5 px-4 sm:px-6 max-w-3xl lg:max-w-5xl mx-auto lg:px-8 ">
        <p>KOKOIKO</p>
        {pathname !== "/signin" && pathname !== "/signup" && (
          <div>
            <button
              onClick={() => {
                supabase.auth.signOut();
              }}
            >
              ログアウト
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
