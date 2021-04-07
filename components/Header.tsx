import { useRouter } from "next/router";
import { supabase } from "../supabase/key";

const Header = () => {
  const { pathname, push } = useRouter();
  return (
    <header className="h-16 bg-white shadow-sm">
      <p>KOKOIKO</p>
      {pathname === "/" && (
        <div>
          <button>ログアウト</button>
        </div>
      )}
    </header>
  );
};

export default Header;
