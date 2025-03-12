import { Outlet } from "react-router-dom";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";

const Root = () => {
  return (
    <div className="mx-auto  ">
      <Header></Header>
      <Outlet className=""></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
