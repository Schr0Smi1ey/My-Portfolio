import { Outlet } from "react-router-dom";
import Header from "../Shared/Header/Header";

const Root = () => {
  return (
    <div className="mx-auto  ">
      <Header></Header>
      <Outlet className=""></Outlet>
    </div>
  );
};

export default Root;
