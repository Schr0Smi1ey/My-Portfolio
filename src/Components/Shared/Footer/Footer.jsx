import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiArrowUp } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-black py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="container max-w-3xl text-white mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center"
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="flex items-center flex-wrap justify-between gap-4">
              {["/", "/projects", "/blogs", "/discuss-projects"].map(
                (path, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      to={path}
                      className="text-gray-300 hover:text-primary text-sm transition-colors duration-300 relative group"
                    >
                      <span>
                        {path === "/"
                          ? "Home"
                          : path === "/projects"
                          ? "Projects"
                          : path === "/blogs"
                          ? "Blogs"
                          : "Discuss Projects"}
                      </span>
                      <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-gradient-to-r from-primary to-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </motion.div>
                )
              )}
            </ul>
          </motion.div>

          <motion.div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
            <div className="flex gap-4">
              {[
                {
                  icon: <FaFacebook></FaFacebook>,
                  url: "https://www.facebook.com/share/19zK3X1Ro6/",
                },
                {
                  icon: <FiLinkedin />,
                  url: "https://www.linkedin.com/in/sarafat-karim-0a91b7182/",
                },
                { icon: <FiGithub />, url: "https://github.com/Schr0Smi1ey" },
                {
                  icon: <FaXTwitter />,
                  url: "https://twitter.com/sarafat_karim",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:scale-110 rounded-full bg-white/5 backdrop-blur-sm border border-primary/20 hover:text-primary"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="text-xl block">{social.icon}</span>
                  <span className="sr-only">{social.icon.type.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="flex justify-center mt-12"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-4 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 backdrop-blur-lg border border-primary/30 relative overflow-hidden"
          aria-label="Back to top"
          animate={{
            y: [0, -10, 0],
            boxShadow: [
              "0 4px 24px -4px rgba(16,185,129,0)",
              "0 8px 32px -4px rgba(16,185,129,0.2)",
              "0 4px 24px -4px rgba(16,185,129,0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FiArrowUp className="text-2xl text-primary" />
          <div className="absolute inset-0 rounded-full border border-primary/20 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-slate-400 text-sm mt-4"
      >
        <div className="inline-block px-6 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-primary/10">
          <p>
            Copyright {new Date().getFullYear()} - All rights reserved by{" "}
            <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent font-medium">
              Sarafat Karim
            </span>
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
