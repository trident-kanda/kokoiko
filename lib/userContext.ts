import { User } from "@supabase/gotrue-js";
import { Session } from "@supabase/supabase-js";
import { createContext } from "react";

export const UserContext = createContext<{
    user: User | null;
    session: Session | null;
  }>({
    user: null,
    session: null,
  });