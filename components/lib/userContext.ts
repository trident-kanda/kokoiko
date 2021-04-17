import { Session, User } from "@supabase/gotrue-js";
import { createContext } from "react";
type value = {
    user: User | null
    session:Session | null
}
export const UserContext = createContext<value >({user: null, session: null})