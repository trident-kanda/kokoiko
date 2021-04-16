import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import { supabase } from "../supabase/key";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Session, User } from "@supabase/supabase-js";
import { UserContext } from "../lib/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname, push } = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, session }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
