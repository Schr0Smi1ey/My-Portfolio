import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiArrowUp,
  FiMapPin,
  FiMail,
} from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { NAV_ITEMS, SOCIAL_LINKS, OWNER } from "../../constants";
import VisitorCounter from "../sections/VisitorCounter";

const Footer = () => (
  <footer className="background dark:bg-black dark:bg-none border-t border-gray-100 dark:border-white/5 py-12 px-4">
    <div className="container max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Brand & Info - Align to start */}
        <div className="space-y-3 md:self-start">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg">
            {OWNER.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {OWNER.title}
          </p>

          {/* Optional: Add location/email if available */}
          {OWNER.location && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FiMapPin className="w-4 h-4" />
              <span>{OWNER.location}</span>
            </div>
          )}
          {OWNER.email && (
            <a
              href={`mailto:${OWNER.email}`}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
            >
              <FiMail className="w-4 h-4" />
              <span>{OWNER.email}</span>
            </a>
          )}
        </div>

        {/* Quick links - Align to center */}
        <div className="space-y-3 md:self-center md:justify-self-center">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center md:text-left">
            Navigation
          </h4>
          <ul className="space-y-2 text-center md:text-left">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social - Align to end with Visitor Counter */}
        <div className="space-y-4 md:justify-self-end">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-right md:text-left">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-3">
              {SOCIAL_LINKS.facebook && (
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-primary hover:border-primary transition-all text-sm"
                >
                  <FaFacebook />
                </a>
              )}
              {SOCIAL_LINKS.linkedin && (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-primary hover:border-primary transition-all text-sm"
                >
                  <FiLinkedin />
                </a>
              )}
              {SOCIAL_LINKS.github && (
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-primary hover:border-primary transition-all text-sm"
                >
                  <FiGithub />
                </a>
              )}
              {SOCIAL_LINKS.twitter && (
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-primary hover:border-primary transition-all text-sm"
                >
                  <FaXTwitter />
                </a>
              )}
            </div>
          </div>

          {/* Visitor Counter - Below social links */}
          <div className="flex justify-center md:justify-start">
            <VisitorCounter />
          </div>
        </div>
      </div>

      {/* Bottom Bar with Centered Elements */}
      <div className="flex flex-col items-center gap-4 pt-6 border-t border-gray-100 dark:border-white/5">
        {/* Copyright - Centered */}
        <p className="text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} {OWNER.name}. All rights reserved.
        </p>

        {/* Back to top - Animated icon only, centered below copyright */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ y: -4 }}
          animate={{ y: [0, -2, 0] }}
          transition={{
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            hover: { duration: 0.2 },
          }}
          className="flex my-5 items-center justify-center text-gray-400 hover:text-primary transition-colors"
          aria-label="Back to top"
        >
          <FiArrowUp className="w-5 h-5 md:w-10 md:h-10" />
        </motion.button>
      </div>
    </div>
  </footer>
);

export default Footer;
