import { ReactNode } from "react";
import Header from "./Header";
type props = {
  children: ReactNode;
};
const Container = ({ children }: props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className=" mx-auto w-full max-w-3xl lg:max-w-5xl pb-16 pt-6 sm:pt-8 sm:px-6 lg:px-8 ">
        {children}
      </div>
    </div>
  );
};

export default Container;
