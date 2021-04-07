import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import { supabase } from "../supabase/key";
import { useEffect } from "react";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
  const { pathname, push } = useRouter();
  return <Component {...pageProps} />;
}

export default MyApp;
