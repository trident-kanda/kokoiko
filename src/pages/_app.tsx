import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import { supabase } from "../../supabase/key";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import "../style/global.scss";
const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache: new InMemoryCache(),
});
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
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
