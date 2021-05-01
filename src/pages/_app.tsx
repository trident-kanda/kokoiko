import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import { supabase } from "../../supabase/key";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const { replace, pathname } = useRouter();
  if (pathname === "/signin" || pathname === "/signup") {
    useEffect(() => {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          const body = JSON.stringify({ event, session });
          await fetch("/api/auth", {
            method: "post",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body,
          });
          replace("/");
        }
      );
      return () => {
        authListener?.unsubscribe();
      };
    }, []);
  } else {
    useEffect(() => {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          const body = JSON.stringify({ event, session });
          await fetch("/api/auth", {
            method: "post",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body,
          });
          replace("/signin");
        }
      );
      return () => {
        authListener?.unsubscribe();
      };
    }, []);
  }
  return <Component {...pageProps} />;
}

export default MyApp;
