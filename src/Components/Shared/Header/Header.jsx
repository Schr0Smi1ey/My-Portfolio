/* eslint-disable no-unused-vars */
import { Link, NavLink } from "react-router-dom";
import { FiGithub, FiMenu, FiX } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import useAdmin from "../../../Hooks/UseAdmin";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { Moon, Sun } from "lucide-react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin] = useAdmin();
  const { theme, toggleTheme } = useContext(AuthContext);
  const navItems = ["Home", "Projects", "Blogs", "Discuss Projects"];
  const getLinkPath = (item) => {
    if (item === "Home") return "/";
    return `/${item.toLowerCase().replace(" ", "-")}`;
  };
  const handleToggleTheme = () => {
    toggleTheme();
    setIsMenuOpen(false);
  };
  const navOptions = (
    <div className="hidden lg:flex space-x-4 xl:space-x-8 items-center ">
      {navItems.map((item) => (
        <motion.div
          key={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <NavLink
            to={getLinkPath(item)}
            className="text-gray-300 hover:text-primary text-sm font-semibold transition-colors duration-300 relative group"
          >
            {item}
            <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-gradient-to-r from-primary to-white transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </motion.div>
      ))}
      {isAdmin && (
        <motion.div
          key={"Dashboard"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <NavLink
            to={getLinkPath("Dashboard")}
            className="text-gray-300 hover:text-primary text-sm font-semibold transition-colors duration-300 relative group"
          >
            Dashboard
            <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-gradient-to-r from-primary to-white transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </motion.div>
      )}
    </div>
  );

  const mobileNavOptions = (
    <div className="flex items-center justify-center flex-wrap gap-5 px-2 py-4">
      {navItems.map((item) => (
        <motion.div
          key={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(false)}
        >
          <NavLink
            to={getLinkPath(item)}
            className="text-gray-300 hover:text-primary text-lg md:text-xl"
          >
            {item}
          </NavLink>
        </motion.div>
      ))}
      {isAdmin && (
        <motion.div
          key={"Dashboard"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <NavLink
            to={getLinkPath("Dashboard")}
            className="text-gray-300 hover:text-primary text-lg md:text-xl"
          >
            Dashboard
          </NavLink>
        </motion.div>
      )}
    </div>
  );

  const socialLinks = (
    <div className="flex space-x-8 md:space-x-6 items-center">
      <motion.a
        href="https://www.linkedin.com/in/sarafat-karim/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-300 hover:text-primary transition-colors"
      >
        <FaLinkedin className="w-5 h-5" />
      </motion.a>
      <motion.a
        href="https://github.com/Schr0Smi1ey"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-300 hover:text-primary transition-colors"
      >
        <FiGithub className="w-5 h-5" />
      </motion.a>
      {/* <button
        onClick={handleToggleTheme}
        className="relative w-16 h-7 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300"
      >
        <div
          className={`absolute left-1 w-6 h-6 bg-white dark:bg-yellow-400 rounded-full shadow-md transform transition-transform duration-300 ${
            theme === "dark" ? "translate-x-8" : "translate-x-0"
          }`}
        ></div>
        <Sun className="absolute left-2 w-4 h-3 text-yellow-500 dark:hidden" />
        <Moon className="absolute right-2 w-4 h-3 text-gray-900 hidden dark:block" />
      </button> */}
    </div>
  );

  return (
    <motion.header
      className="fixed w-full py-1 top-0 z-50 bg-black shadow-lg "
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <nav className="container mx-auto px-4 lg:px-14 py-1">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center md:space-x-2"
          >
            <Link
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent"
            >
              Sarafat Karim
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center mx-4">
            {navOptions}
          </div>

          {/* Social Links */}
          <div className="hidden lg:flex">{socialLinks}</div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-primary transition-colors p-2"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6 md:w-7 md:h-7" />
              ) : (
                <FiMenu className="w-6 h-6 md:w-7 md:h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-2 md:mt-4 border-t border-slate-700"
          >
            {mobileNavOptions}
            <div className="border-t mb-4 border-slate-700"></div>
            <div className="flex justify-center pb-4">{socialLinks}</div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
