import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import { supabase } from "../supabase/key";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthSession, User } from "@supabase/supabase-js";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname, push } = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    if (user && (pathname === "/signup" || pathname === "/signin")) {
      push("/");
    }
    if (!user && pathname !== "/signin" && pathname !== "signup") {
      push("/signin");
    }
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (user && (pathname === "/signin" || pathname === "/signup")) {
          push("/");
        }
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);
  return <Component {...pageProps} />;
}

export default MyApp;
