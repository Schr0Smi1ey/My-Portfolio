/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ["Home", "Development Stack", "Projects", "Contact Me"];
  const getLinkPath = (item) => {
    if (item === "Home") return "/";
    return `/${item.toLowerCase().replace(" ", "-")}`;
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
          <Link
            to={getLinkPath(item)}
            className="text-gray-300 hover:text-primary text-lg font-semibold transition-colors duration-300 relative group"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </motion.div>
      ))}
    </div>
  );

  const mobileNavOptions = (
    <div className="flex flex-col space-y-6 p-4 md:p-6">
      {navItems.map((item) => (
        <motion.div
          key={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(false)}
        >
          <Link
            to={getLinkPath(item)}
            className="text-gray-300 hover:text-primary text-lg md:text-xl"
          >
            {item}
          </Link>
        </motion.div>
      ))}
    </div>
  );

  const socialLinks = (
    <div className="flex space-x-4 md:space-x-6 items-center">
      <motion.a
        href="https://www.linkedin.com/in/sarafat-karim/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-300 hover:text-primary transition-colors"
      >
        <FaLinkedin className="w-7 h-7" />
      </motion.a>
      <motion.a
        href="https://github.com/Schr0Smi1ey"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-300 hover:text-primary transition-colors"
      >
        <FiGithub className="w-7 h-7" />
      </motion.a>
    </div>
  );

  return (
    <motion.header
      className="fixed w-full py-2 top-0 z-50 bg-black shadow-lg "
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent"
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
            <div className="flex justify-center pb-4">{socialLinks}</div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
