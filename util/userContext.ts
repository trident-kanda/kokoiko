import { Session, User } from "@supabase/gotrue-js";
import { createContext } from "react";
type value = {
    user: User | null |undefined
    session:Session | null | undefined
}
export const UserContext = createContext<value >({user: undefined, session: undefined})