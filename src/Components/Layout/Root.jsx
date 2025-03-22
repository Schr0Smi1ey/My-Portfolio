import { Outlet } from "react-router-dom";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";
import { ToastContainer } from "react-toastify";
import CustomCursor from "../Element/CustomCursor";
const Root = () => {
  return (
    <div className="overflow-x-hidden dark:bg-black dark:text-white">
      <CustomCursor></CustomCursor>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default Root;
