/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import profile from "../../assets/Home/Profile/profile-bw.png";
import {
  FaDownload,
  FaMousePointer,
  FaCode,
  FaBrain,
  FaLaptopCode,
  FaReact,
  FaNode,
} from "react-icons/fa";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaXTwitter, FaFacebookF, FaTerminal } from "react-icons/fa6";
import {
  SiExpress,
  SiNextdotjs,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";
import AvailabilityBadge from "./AvailabilityBadge";

// ── Circular SVG text path ─────────────────────────────────────────────────────
const CircularText = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    className="w-28 h-28 absolute -top-6 -right-6 z-20 pointer-events-none"
  >
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <path
          id="circlePath"
          d="M 60,60 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
        />
      </defs>
      <text
        className="fill-gray-800 dark:fill-gray-200"
        fontSize="11.5"
        fontWeight="600"
        letterSpacing="2.5"
        fontFamily="inherit"
      >
        <textPath href="#circlePath">COME ON • LET'S TALK • </textPath>
      </text>
      {/* Center dot */}
      <circle cx="60" cy="60" r="5" className="fill-primary" />
    </svg>
  </motion.div>
);

// ── Hand-drawn squiggle SVG ───────────────────────────────────────────────────
const Squiggle = () => (
  <motion.div
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] pointer-events-none z-20"
  >
    <svg
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <motion.path
        d="M 20 80 C 60 20, 120 120, 180 60 C 240 0, 300 100, 360 50 C 390 30, 395 60, 390 80"
        stroke="#198068"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 2.2, delay: 1, ease: "easeInOut" }}
      />
      <motion.path
        d="M 30 90 C 80 140, 160 40, 220 90 C 280 140, 340 60, 380 95"
        stroke="#198068"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 2.5, delay: 1.4, ease: "easeInOut" }}
      />
    </svg>
  </motion.div>
);

// ── Tech stack cycling display ─────────────────────────────────────────────────
const techStack = [
  {
    name: "React",
    icon: <FaReact className="text-blue-400" />,
    dotColor: "#61DAFB",
    color: "text-blue-400",
  },
  {
    name: "Node.js",
    icon: <FaNode className="text-green-500 dark:text-green-400" />,
    dotColor: "#339933",
    color: "text-green-500 dark:text-green-400",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-600 dark:text-green-500" />,
    dotColor: "#47A248",
    color: "text-green-600 dark:text-green-500",
  },
  {
    name: "Tailwind",
    icon: <SiTailwindcss className="text-cyan-500 dark:text-cyan-400" />,
    dotColor: "#38BDF8",
    color: "text-cyan-500 dark:text-cyan-400",
  },
  {
    name: "Express",
    icon: <SiExpress className="text-gray-800 dark:text-gray-300" />,
    dotColor: "#555",
    color: "text-gray-800 dark:text-gray-300",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-gray-900 dark:text-gray-200" />,
    dotColor: "#000",
    color: "text-gray-900 dark:text-gray-200",
  },
];

const TechStackDisplay = ({ currentTech }) => {
  const t = techStack[currentTech];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex items-center gap-3 px-3 py-2 rounded-2xl backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 shadow-lg w-fit"
    >
      <motion.div
        key={`dot-${currentTech}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-2 h-2 rounded-full animate-pulse shrink-0"
        style={{ backgroundColor: t.dotColor }}
      />
      <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
        Tech
      </span>
      <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
      <motion.div
        key={`icon-${currentTech}`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-lg"
      >
        {t.icon}
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentTech}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`font-bold text-sm md:text-base ${t.color}`}
        >
          {t.name}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};

// ── Role cycling display ───────────────────────────────────────────────────────
const roles = [
  {
    title: "Full Stack Developer",
    icon: <FaCode />,
    description: "Building web applications",
    bg: "rgba(37,99,235,0.1)",
    border: "rgba(37,99,235,0.2)",
    iconCls: "text-primary",
  },
  {
    title: "Competitive Programmer",
    icon: <FaLaptopCode />,
    description: "Solving algorithmic challenges",
    bg: "rgba(168,85,247,0.1)",
    border: "rgba(168,85,247,0.2)",
    iconCls: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "AI/ML Enthusiast",
    icon: <FaBrain />,
    description: "Exploring intelligent systems",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.2)",
    iconCls: "text-green-600 dark:text-green-400",
  },
];

const RoleDisplay = ({ currentRole }) => {
  const r = roles[currentRole];
  return (
    <motion.div
      key={currentRole}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 px-3 py-2 rounded-2xl backdrop-blur-lg border shadow-lg w-fit"
      style={{ background: r.bg, borderColor: r.border }}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={r.iconCls}
      >
        {r.icon}
      </motion.div>
      <div>
        <div className="font-bold text-gray-800 dark:text-white text-sm md:text-base">
          {r.title}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
          {r.description}
        </div>
      </div>
    </motion.div>
  );
};

// ── Social links ───────────────────────────────────────────────────────────────
const socialLinks = [
  {
    icon: <FaFacebookF />,
    url: "https://www.facebook.com/share/19zK3X1Ro6/",
    label: "Facebook",
  },
  {
    icon: <FiLinkedin />,
    url: "https://www.linkedin.com/in/sarafat-karim-0a91b7182/",
    label: "LinkedIn",
  },
  {
    icon: <FiGithub />,
    url: "https://github.com/Schr0Smi1ey",
    label: "GitHub",
  },
  {
    icon: <FaXTwitter />,
    url: "https://twitter.com/sarafat_karim",
    label: "Twitter",
  },
];

// ── Main Banner ────────────────────────────────────────────────────────────────
const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentTech, setCurrentTech] = useState(0);
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
    const ti = setInterval(
      () => setCurrentTech((p) => (p + 1) % techStack.length),
      2500,
    );
    const ri = setInterval(
      () => setCurrentRole((p) => (p + 1) % roles.length),
      2500,
    );
    return () => {
      clearInterval(ti);
      clearInterval(ri);
    };
  }, []);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Grain texture overlay ────────────────────────────────────────────── */}
      <div className="grain-overlay" />

      {/* ── Pastel gradient blobs ────────────────────────────────────────────── */}
      <div className="blob blob-pink-tr" aria-hidden="true" />
      <div className="blob blob-lavender-br" aria-hidden="true" />
      <div className="blob blob-green-bl" aria-hidden="true" />

      {/* ── Corner decorations ───────────────────────────────────────────────── */}
      {/* Top-right corner circles */}
      <div
        className="absolute top-4 right-4 z-0 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <circle
            cx="70"
            cy="20"
            r="18"
            stroke="#d1d5db"
            strokeWidth="1"
            className="dark:stroke-gray-700"
            fill="none"
          />
          <circle
            cx="70"
            cy="20"
            r="8"
            stroke="#d1d5db"
            strokeWidth="1"
            className="dark:stroke-gray-700"
            fill="none"
          />
        </svg>
      </div>
      {/* Bottom-left corner circles */}
      <div
        className="absolute bottom-8 left-4 z-0 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <circle
            cx="20"
            cy="50"
            r="18"
            stroke="#d1d5db"
            strokeWidth="1"
            className="dark:stroke-gray-700"
            fill="none"
          />
        </svg>
      </div>

      {/* ── Main grid ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 xl:px-24 py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── LEFT: text content ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-7 order-2 lg:order-1"
          >
            {/* Terminal badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <FaTerminal className="text-primary" />
              <span className="font-mono text-sm text-gray-800 dark:text-gray-200">
                $ whoami
              </span>
            </motion.div>

            {/* Name — massive editorial type */}
            <div className="space-y-3">
              <motion.h1
                data-aos="fade-up"
                className="text-5xl lg:text-7xl font-black leading-none tracking-tight text-gray-900 dark:text-white"
              >
                SARAFAT KARIM
              </motion.h1>
            </div>

            {/* Role + tech cycling */}
            <div className="flex gap-3 items-stretch">
              <AnimatePresence mode="wait">
                <RoleDisplay currentRole={currentRole} />
              </AnimatePresence>
              <TechStackDisplay currentTech={currentTech} />
            </div>

            {/* Description */}
            <motion.p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-lg"
            >
              Full-stack developer specializing in the MERN stack with React,
              Node.js, and MongoDB. Competitive programmer who turns complex
              algorithms into elegant solutions, now exploring the frontiers of
              AI/ML to build intelligent, scalable applications.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              data-aos="fade-up"
              data-aos-delay="800"
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4"
            >
              <motion.a
                download
                href="/Data/Sarafat-Resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-xl px-6 py-4 bg-gradient-to-r from-primary to-black dark:from-primary dark:to-gray-900 text-white font-semibold shadow-xl text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <div className="relative flex items-center justify-center gap-3">
                  <FaDownload className="text-lg" />
                  <span>Download Resume</span>
                </div>
              </motion.a>

              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-xl px-6 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold shadow-xl border border-gray-300 dark:border-gray-600 hover:border-primary transition-all text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <div className="relative flex items-center justify-center gap-3">
                  <FaMousePointer className="text-lg text-primary" />
                  <span>Contact Me</span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: editorial photo with social rail and availability badge ─── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Outer wrapper — constrains all absolute children */}
            <div className="relative w-96 h-96 sm:w-[28rem] sm:h-[28rem] md:w-[32rem] md:h-[32rem]">
              {/* Availability Badge - Top left corner of image with animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -top-0 -left-4 z-30"
              >
                <AvailabilityBadge />
              </motion.div>

              {/* ── Soft green circle behind photo (arch bg) ─────────────── */}
              <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-[40%_60%_60%_40%/50%_50%_50%_50%] bg-primary/15 dark:bg-primary/10 blur-sm"
              />

              {/* ── Subtle glow ring ─────────────────────────────────────── */}
              <motion.div
                animate={{
                  boxShadow: isHovered
                    ? "0 0 60px 20px rgba(25,128,104,0.18)"
                    : "0 0 40px 10px rgba(25,128,104,0.10)",
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-4 rounded-[40%_60%_60%_40%/50%_50%_50%_50%]"
              />

              {/* ── B&W photo ────────────────────────────────────────────── */}
              <motion.img
                src={profile}
                alt="Sarafat Karim"
                animate={{ scale: isHovered ? 1.04 : 1 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-full h-full object-cover object-center rounded-[40%_60%_60%_40%/50%_50%_50%_50%]"
              />

              {/* ── Squiggle over lower portion ──────────────────────────── */}
              <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
                <Squiggle />
              </div>

              {/* ── Circular "COME ON LET'S TALK" text ───────────────────── */}
              <CircularText />
            </div>

            {/* Vertical social rail (right side of image) - from top to bottom */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -right-16 top-1/3 -translate-y-1/2 flex flex-col items-center gap-4 z-30"
            >
              {/* Top line */}
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary to-transparent" />

              {socialLinks.map(({ icon, url, label }, index) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.1, x: 4 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-primary hover:border-primary transition-all shadow-lg"
                >
                  <span className="text-xl">{icon}</span>
                </motion.a>
              ))}

              {/* Bottom line */}
              <div className="w-px h-12 bg-gradient-to-t from-transparent via-primary to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
