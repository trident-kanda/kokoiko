import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import { supabase } from "../supabase/key";
import { useEffect } from "react";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
  const { pathname, push } = useRouter();
  supabase.auth.onAuthStateChange((e, session) => {
    if (session?.user && (pathname === "/signin" || pathname === "/signup")) {
      push("/");
    } else if (!session?.user && pathname !== "/signup") {
      push("/signin");
    }
  });

  useEffect(() => {
    const check = async () => {
      const user = supabase.auth.user();
      if (user && (pathname === "/signin" || pathname === "/signup")) {
        await push("/");
      }
      if (!user && pathname !== "/signup") {
        await push("/signin");
      }
    };
    check();
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
