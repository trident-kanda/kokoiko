import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "../../../util/key"

export default function handler(req: NextApiRequest, res:NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res)
}