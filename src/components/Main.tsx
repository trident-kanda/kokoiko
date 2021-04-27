import { ReactNode } from "react";
import Sidenav from "../components/Sidenav";
type props = {
  children: ReactNode;
};
const Main = ({ children }: props) => {
  return (
    <div className="lg:flex">
      <main className="  max-w-3xl lg:w-4/5 ">{children}</main>
      <div className=" hidden lg:block w-1/5 ml-5">
        <Sidenav />
      </div>
      <div className=" h-16 sm:hidden" />
    </div>
  );
};

export default Main;
