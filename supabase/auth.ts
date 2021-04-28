import { User } from "@supabase/gotrue-js";
import { Dispatch, SetStateAction } from "react";
import { supabase } from "../supabase/key";

type loginProps = {
  email:string
  password:string
}
type signinProps = {
  email:string
  password:string
}


export const signIn = async({email,password}:loginProps,setErrorMessage:Dispatch<SetStateAction<string | null>>) => {
      const { error ,user} = await supabase.auth.signIn({
        email: email,
        password: password,
      })
    
      if (error) {
        console.log(error.message);
        switch (error.message) {
          case "Invalid email or password":
            setErrorMessage("メールアドレスかパスワードが違います。");
            break;
        }
      }
}

export const signUp = async({email,password}:signinProps,setErrorMessage:Dispatch<SetStateAction<string | null>>) => {
      const { error,user } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if(user){
        return user
      }
      if(error){
        console.log(error.message)
        switch(error.message){
          case "A user with this email address has already been registered":
            setErrorMessage("登録済みのメールアドレス")
          break;
        }
      }
}

export const googleLogin = async() => {
  const {user} = await supabase.auth.signIn({ provider: "google" })
}

export const changeName = async(user:any,name:string,) => {
    await supabase.auth.update({
      data:{full_name: name}
    })
}