import { supabase } from "../supabase/key";

type loginProps = {
  email:string
  password:string
}
type signinProps = {
  email:string
  password:string
}

export const logIn = async({email,password}:loginProps) => {
      const { error ,user} = await supabase.auth.signIn({
        email: email,
        password: password,
      })
    
      if (error) {
        console.log(error.message);
        switch (error.message) {
          case "Invalid email or password":
            console.log("存在しないアカウントです。");
            break;
          case "Unable to validate email address: invalid format":
            console.log("無効なメールアドレスです。");
            break;
        }
      }
}

export const signUp = async({email,password}:signinProps) => {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if(error){
        switch(error.message){
          case "A user with this email address has already been registered":
            console.log("登録済みのメールアドレス")
          break;
        }
      }
}

export const googleLogin = async() => {
  const {user} = await supabase.auth.signIn({ provider: "google" })
}