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
import { useSiteContent } from "../../hooks";

const Footer = () => {
  const { content: owner } = useSiteContent("owner");
  const links = owner.socialLinks || SOCIAL_LINKS;

  return (
  <footer className="about-cosmic-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-t border-primary/10 bg-[#05050a] px-4 pb-10 !pt-10 !mt-0 text-zinc-950 dark:text-white">
    <div className="about-cosmic-starfield" aria-hidden="true" />
    <div className="cosmic-noise" aria-hidden="true" />

    <div className="relative z-10 mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-3 md:self-start">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_18px_rgb(var(--color-primary-rgb)/0.7)]" />
            <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.26em] text-primary">
              Portfolio
            </p>
          </div>

          <h3 className="text-lg font-black text-zinc-950 dark:text-white">
            {owner.name || OWNER.name}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {owner.title || OWNER.title}
          </p>

          {owner.location && (
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <FiMapPin className="h-4 w-4 text-primary" />
              <span>{owner.location}</span>
            </div>
          )}
          {(owner.email || OWNER.email) && (
            <a
              href={`mailto:${owner.email || OWNER.email}`}
              className="flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-primary dark:text-zinc-400"
            >
              <FiMail className="h-4 w-4 text-primary" />
              <span>{owner.email || OWNER.email}</span>
            </a>
          )}
        </div>

        <div className="space-y-3 md:self-center md:justify-self-center">
          <h4 className="text-center font-mono text-[0.58rem] font-bold uppercase tracking-[0.24em] text-primary md:text-left">
            Navigation
          </h4>
          <ul className="space-y-2 text-center md:text-left">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm text-zinc-600 transition-colors hover:text-primary dark:text-zinc-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 md:justify-self-end">
          <div>
            <h4 className="text-center font-mono text-[0.58rem] font-bold uppercase tracking-[0.24em] text-primary md:text-left">
              Connect
            </h4>
            <div className="mt-3 flex flex-wrap justify-center gap-3 md:justify-start">
              {links.facebook && (
                <a
                  href={links.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300/70 bg-white/45 text-sm text-zinc-600 transition-all hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-400"
                >
                  <FaFacebook />
                </a>
              )}
              {links.linkedin && (
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300/70 bg-white/45 text-sm text-zinc-600 transition-all hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-400"
                >
                  <FiLinkedin />
                </a>
              )}
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300/70 bg-white/45 text-sm text-zinc-600 transition-all hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-400"
                >
                  <FiGithub />
                </a>
              )}
              {links.twitter && (
                <a
                  href={links.twitter}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300/70 bg-white/45 text-sm text-zinc-600 transition-all hover:border-primary hover:text-primary dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-400"
                >
                  <FaXTwitter />
                </a>
              )}
            </div>
          </div>

          <div className="flex justify-center md:justify-start">
            <VisitorCounter />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 border-t border-zinc-300/70 pt-6 dark:border-white/[0.07]">
        <p className="text-center text-xs text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} {owner.name || OWNER.name}. All rights reserved.
        </p>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ y: -4 }}
          animate={{ y: [0, -2, 0] }}
          transition={{
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            hover: { duration: 0.2 },
          }}
          className="my-2 grid h-10 w-10 place-items-center rounded-full border border-primary/25 bg-primary/10 text-primary transition-colors hover:border-primary/55 hover:bg-primary/15"
          aria-label="Back to top"
        >
          <FiArrowUp className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
