import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import { supabase } from "../../supabase/key";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Session, User } from "@supabase/supabase-js";
import { UserContext } from "../../util/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, session }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
