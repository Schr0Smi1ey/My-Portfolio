import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// ── Components ─────────────────────────────────────────────────────────────────
import Background from "../../components/Background";
import StatCard from "../ui/StatCard";

// ── Icons ─────────────────────────────────────────────────────────────────────
import {
  CodeIcon,
  CricketIcon,
  SparklesIcon,
  FilmIcon,
  GameIcon,
} from "../../assets/Home/AboutMe/icons";

// ── Fonts ─────────────────────────────────────────────────────────────────────
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/900.css";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";

// ── Icons for stats ──────────────────────────────────────────────────────────
import { FaCode, FaChartLine, FaLaptopCode, FaGitAlt } from "react-icons/fa";
import { FiCode, FiTrendingUp } from "react-icons/fi";

// ── Hook ──────────────────────────────────────────────────────────────────────
import { useTotalCommits } from "../../hooks/index";

// ── Commit value skeleton ─────────────────────────────────────────────────────
const CommitValue = ({ formatted, isLoading, isError }) => {
  if (isLoading) {
    return (
      <span className="inline-block w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
    );
  }
  if (isError || formatted == null) {
    return <span>—</span>;
  }
  return <span>{formatted}</span>;
};

// ── Component ─────────────────────────────────────────────────────────────────
const AboutMe = () => {
  // ── Live commit count ──────────────────────────────────────────────────────
  const {
    formatted: commitFormatted,
    isLoading: commitLoading,
    isError: commitError,
  } = useTotalCommits();

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-cubic" });
  }, []);

  // ── Stats data ─────────────────────────────────────────────────────────────
  const stats = [
    {
      label: "Projects",
      value: "8+",
      description: "Completed",
      color: "from-violet-600 to-purple-600",
      isLive: false,
    },
    {
      label: "Problems",
      value: "1135+",
      description: "Solved",
      color: "from-blue-600 to-cyan-600",
      isLive: false,
    },
    {
      label: "Technologies",
      value: "20+",
      description: "Mastered",
      color: "from-emerald-600 to-teal-600",
      isLive: false,
    },
    {
      label: "Commits",
      value: null,
      description: "Pushed",
      color: "from-orange-600 to-pink-600",
      isLive: true,
    },
  ];

  const interests = [
    {
      icon: CricketIcon,
      label: "Cricket & Football",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: SparklesIcon,
      label: "Tech Exploration",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: FilmIcon,
      label: "Movies & Series",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      icon: GameIcon,
      label: "Online Games",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: CodeIcon,
      label: "Competitive Programming",
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <section id="about" className="relative py-24 md:py-28 lg:py-32">
      <Background
        mouseGlow={true}
        showGrid={true}
        showGridPattern={true}
        showBottomFade={true}
        showNoise={true}
        showOrbs={true}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* ── Left column ── */}
            <div className="space-y-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block"
              >
                <div className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-gray-900/5 dark:shadow-black/20">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span
                    className="relative text-sm font-medium bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    👋 Welcome to my world
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <h2
                    className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    <span className="block bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                      About Me
                    </span>
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <h3
                    className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    Sarafat Karim
                  </h3>
                  <motion.span
                    className="text-4xl"
                    animate={{
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    ⚡
                  </motion.span>
                </motion.div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="h-[2px] w-24 bg-gradient-to-r from-violet-600 via-purple-600 to-transparent origin-left"
                />
              </div>

              {/* Description cards */}
              <div className="space-y-5">
                {[
                  {
                    delay: 0.5,
                    hoverGrad:
                      "from-violet-500/5 via-purple-500/5 to-blue-500/5",
                    borderHover:
                      "hover:border-violet-200 dark:hover:border-violet-900/50",
                    content: (
                      <p
                        className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                        style={{ fontFamily: '"Cormorant Garamond", serif' }}
                      >
                        A passionate{" "}
                        <span className="relative inline-block group/highlight">
                          <span className="relative z-10 font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                            MERN Stack Developer
                          </span>
                          <motion.span
                            className="absolute bottom-0 left-0 h-3 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-blue-500/20 rounded-full -z-0"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                          />
                        </span>{" "}
                        and competitive programmer who transforms complex
                        problems into elegant solutions. Currently pursuing
                        B.Sc. in Computer Science at{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Khulna University
                        </span>
                        , where I blend academic excellence with practical
                        innovation.
                      </p>
                    ),
                  },
                  {
                    delay: 0.6,
                    hoverGrad:
                      "from-blue-500/5 via-cyan-500/5 to-emerald-500/5",
                    borderHover:
                      "hover:border-blue-200 dark:hover:border-blue-900/50",
                    content: (
                      <p
                        className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                        style={{ fontFamily: '"Cormorant Garamond", serif' }}
                      >
                        With expertise in the{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                          MERN stack (MongoDB, Express.js, React, Node.js)
                        </span>
                        , I architect responsive, scalable web applications that
                        deliver exceptional user experiences. My competitive
                        programming journey has sharpened my algorithmic
                        thinking, enabling me to write efficient, optimized code
                        that scales. Alongside my technical pursuits, I have
                        consistently demonstrated strong academic excellence,
                        reflecting my dedication, discipline, and ability to
                        grasp complex concepts effectively.
                      </p>
                    ),
                  },
                  {
                    delay: 0.7,
                    hoverGrad:
                      "from-emerald-500/5 via-teal-500/5 to-cyan-500/5",
                    borderHover:
                      "hover:border-emerald-200 dark:hover:border-emerald-900/50",
                    content: (
                      <p
                        className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                        style={{ fontFamily: '"Cormorant Garamond", serif' }}
                      >
                        Beyond the screen, I'm an{" "}
                        <span className="font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          avid cricketer and football enthusiast
                        </span>
                        , finding joy in both team sports and strategic gaming.
                        I love immersing myself in movies and series, and diving
                        into online games for fun and relaxation. At the same
                        time, I'm constantly exploring AI/ML, cloud
                        architecture, and emerging technologies to stay ahead in
                        the ever-evolving tech landscape.
                      </p>
                    ),
                  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: card.delay, duration: 0.6 }}
                    className="group relative"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${card.hoverGrad} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div
                      className={`relative p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-900/5 dark:shadow-black/20 ${card.borderHover} transition-all duration-500`}
                    >
                      {card.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Right column ── */}
            <div className="relative">
              {/* Stats grid with StatCard */}
              <div className="grid grid-cols-2 gap-5 mb-8">
                {stats.map((stat, index) =>
                  stat.isLive ? (
                    <StatCard
                      key={index}
                      label={stat.label}
                      value={
                        <CommitValue
                          formatted={commitFormatted}
                          isLoading={commitLoading}
                          isError={commitError}
                        />
                      }
                      description={stat.description}
                      color={stat.color}
                      delay={index}
                    />
                  ) : (
                    <StatCard
                      key={index}
                      label={stat.label}
                      value={stat.value}
                      description={stat.description}
                      color={stat.color}
                      delay={index}
                    />
                  ),
                )}
              </div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="group relative mb-8"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl" />

                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/90 via-white/80 to-white/90 dark:from-gray-800/90 dark:via-gray-800/80 dark:to-gray-800/90 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/30">
                  <div className="absolute top-4 left-4 text-6xl font-serif text-violet-200 dark:text-violet-900/30 leading-none">
                    "
                  </div>

                  <blockquote
                    className="relative text-lg md:text-xl italic text-black dark:text-gray-300 text-center leading-relaxed pt-8"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    Debugging is like being the detective in a crime movie where
                    you are also the murderer.
                  </blockquote>

                  <div className="absolute bottom-4 right-4 text-6xl font-serif text-violet-200 dark:text-violet-900/30 leading-none">
                    "
                  </div>

                  <div className="flex justify-center mt-6">
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent rounded-full" />
                  </div>
                </div>
              </motion.div>

              {/* Interests Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
                  <h4
                    className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    Beyond Code
                  </h4>
                  <div className="flex-1 h-px bg-gradient-to-l from-gray-200 dark:from-gray-700 to-transparent" />
                </div>

                <div className="flex gap-3 flex-wrap">
                  {interests.map((interest, index) => {
                    const Icon = interest.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 1 + index * 0.1,
                          duration: 0.4,
                        }}
                        whileHover={{ x: 5 }}
                        className="group relative"
                      >
                        <div className="relative flex items-center gap-4 p-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-300">
                          <div
                            className={`p-2 rounded-xl bg-gradient-to-br ${interest.gradient} bg-opacity-10 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300`}
                          >
                            <Icon />
                          </div>
                          <div className="flex-1">
                            <h5
                              className="text-sm font-semibold text-gray-900 dark:text-white"
                              style={{ fontFamily: '"DM Sans", sans-serif' }}
                            >
                              {interest.label}
                            </h5>
                          </div>
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Background>
    </section>
  );
};

export default AboutMe;
