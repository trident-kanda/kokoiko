import { supabase } from "../supabase/key";

const mailCheck = (mail:string) => {
    const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      return reg.test(mail)
}
export const logIn = async(email:string,password:string,setError:(s:string)=>void) => {
    
    if (email === "" || password === "") {
        setError("必須項目が未入力です。");
        return;
    }
    if(!mailCheck(email)){
        setError("メールアドレスが不適切です。");
        return;
    }
      const { error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
  
      if (error) {
        console.log(error.message);
        switch (error.message) {
          case "Invalid email or password":
            setError("存在しないアカウントです。");
            break;
          case "Unable to validate email address: invalid format":
            setError("無効なメールアドレスです。");
            break;
        }
      }
}

export const signUp = async(email:string ,password:string ,confirmPass:string ,setError:(s:string)=>void) => {
    if (email === "" || password === "") {
        setError("必要項目が未入力です。");
        return;
      }
      if (password.length < 6) {
        setError("パスワードは六文字以上必要です。");
      }
      if (password !== confirmPass) {
        setError("確認パスワードが違います。");
        return;
      }
      if(!mailCheck(email)){
        setError("メールアドレスが不適切です。");
        return;
    }
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if(error){
        switch(error.message){
          case "A user with this email address has already been registered":
            setError("登録済みのメールアドレスです。")
          break;
        }
      }
}

export const googleLogin = async() => {
     await supabase.auth.signIn({ provider: "google" })
}