import { useContext, useEffect, useState } from "react";
import { FaHome, FaProjectDiagram, FaBlog } from "react-icons/fa";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { GiDiscussion } from "react-icons/gi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";

const adminMenuItems = [
  { name: "Messages", icon: <FaMessage /> },
  { name: "Add Project", icon: <FaProjectDiagram /> },
];
const generalMenuItems = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
  { name: "Blogs", path: "/blogs", icon: <FaBlog /> },
  {
    name: "Discuss Projects",
    path: "/discuss-projects",
    icon: <GiDiscussion />,
  },
];
const Dashboard = () => {
  const { signOutUser, Toast, loading, theme, toggleTheme } =
    useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  const showSignOutModal = (event) => {
    event.preventDefault();
    document.getElementById("signout-modal").showModal();
  };
  const hideSignOutModal = () => {
    document.getElementById("signout-modal").close();
  };
  const handleSignOut = () => {
    signOutUser()
      .then((res) => {
        Toast("Logged Out Successfully", "warning");
        navigate("/");
      })
      .catch((error) => {
        Toast(error.message, "error");
      });

    hideSignOutModal();
  };

  const handleToggleTheme = () => {
    toggleTheme();
    setIsOpen(false);
  };
  const getLinkPath = (item) => {
    if (item === "Dashboard") return "/dashboard";
    return `/dashboard/${item.toLowerCase().replace(" ", "-")}`;
  };

  return (
    <div className="flex min-h-screen dark:bg-black dark:text-white">
      <Helmet>
        <title>Schr0Smi1ey | Dashboard</title>
      </Helmet>

      <dialog
        id="signout-modal"
        className="modal flex justify-center items-center bg-black bg-opacity-50 z-50"
      >
        <div className="modal-box w-full max-w-sm bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-3xl text-center font-semibold text-gray-800 mb-4">
            Sign Out
          </h3>
          <p className="text-gray-600 mb-6 text-center">
            Are you sure you want to sign out? You can always come back later!
          </p>
          <div className="modal-action justify-between flex mx-auto items-center">
            <button
              onClick={hideSignOutModal}
              className="px-4 py-2 bg-green-500 font-semibold text-base rounded-lg hover:bg-green-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 font-semibold text-base bg-red-500 rounded-lg hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      </dialog>

      {/* Sidebar */}
      <div
        className={`bg-black dark:border-r-[1px] dark:border-gray-600 w-64 min-h-screen p-6 fixed lg:static transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <button
          data-aos="fade-right"
          data-aos-delay="100"
          key={isOpen}
          className="lg:hidden mt-5 md:ml-4 text-white text-2xl"
          onClick={() => setIsOpen(false)}
        >
          <AiOutlineMenuFold className="flex md:w-12 md:h-12" />
        </button>

        <ul
          data-aos="fade-right"
          data-aos-delay="150"
          className="text-white font-semibold pt-5 md:ml-4"
        >
          <div className="text-base md:text-lg lg:text-xl space-y-4">
            <motion.div className="flex flex-col items-center w-fit space-y-2">
              {adminMenuItems.map(({ name, icon }) => (
                <motion.div
                  key={name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  onClick={() => setIsOpen(false)}
                  className="py-2 w-full text-center rounded-md"
                >
                  <NavLink
                    to={getLinkPath(name)}
                    className="flex items-center gap-3 w-fit hover:text-primary transition-colors duration-300 relative group"
                  >
                    {icon}
                    <span className="capitalize lg:text-sm xl:text-base">
                      {name}
                    </span>
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-white transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          </div>
          {/* General Links */}
          <div className="border-t border-white my-4 mt-6"></div>
          <div className="text-base md:text-lg lg:text-xl space-y-4 mt-4">
            <motion.div className="flex flex-col items-center space-y-2">
              {generalMenuItems.map(({ name, path, icon }) => (
                <motion.div
                  key={name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="py-2 w-full text-center rounded-md"
                >
                  <NavLink
                    to={path}
                    className="flex items-center gap-3 w-fit hover:text-primary transition-colors duration-300 relative group"
                  >
                    {icon}
                    <span className="capitalize">{name}</span>
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-white transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              key={"LogOut"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="py-2 w-full text-center rounded-md"
            >
              <button
                onClick={showSignOutModal}
                className="flex items-center gap-3 w-fit hover:text-red-600 transition-colors duration-300 relative group text-red-500"
              >
                <IoLogOut className="text-white text-2xl"></IoLogOut> log out
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-white transition-all duration-300 group-hover:w-full"></span>
              </button>
            </motion.div>
            <li>
              <button
                onClick={handleToggleTheme}
                className="relative w-16 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300"
              >
                <div
                  className={`absolute left-1 w-6 h-6 bg-white dark:bg-yellow-400 rounded-full shadow-md transform transition-transform duration-300 ${
                    theme === "dark" ? "translate-x-8" : "translate-x-0"
                  }`}
                ></div>
                <Sun className="absolute left-2 w-4 h-4 text-yellow-500 dark:hidden" />
                <Moon className="absolute right-2 w-4 h-4 text-gray-900 hidden dark:block" />
              </button>
            </li>
          </div>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-4 pt-10 lg:ml-5">
        <button
          className="lg:hidden text-primary-500 text-3xl ml-5 md:ml-10 mb-4"
          onClick={() => setIsOpen(true)}
        >
          <AiOutlineMenuUnfold className="md:w-12 md:h-12" />
        </button>

        <div className="container mx-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center min-h-screen">
              <PuffLoader color="#198068" size={40} />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
