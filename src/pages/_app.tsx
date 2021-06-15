import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import { supabase } from "../../util/key";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client/react";
import "../style/global.scss";
import { client } from "../../util/graphql";

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
          if (!session) {
            const body = JSON.stringify({ event, session });
            await fetch("/api/auth", {
              method: "post",
              headers: new Headers({ "Content-Type": "application/json" }),
              credentials: "same-origin",
              body,
            });
            replace("/signin");
          }
        }
      );
      return () => {
        authListener?.unsubscribe();
      };
    }, []);
  }
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
