import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Import elegant fonts
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/900.css";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";

// Elegant custom icons with smooth animations
const CodeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const CricketIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const AboutMe = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });

    // Track mouse for subtle parallax effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    {
      label: "Projects",
      value: "20+",
      description: "Completed",
      color: "from-violet-600 to-purple-600",
    },
    {
      label: "Problems",
      value: "500+",
      description: "Solved",
      color: "from-blue-600 to-cyan-600",
    },
    {
      label: "Technologies",
      value: "15+",
      description: "Mastered",
      color: "from-emerald-600 to-teal-600",
    },
    {
      label: "Commits",
      value: "1k+",
      description: "Pushed",
      color: "from-orange-600 to-pink-600",
    },
  ];

  const interests = [
    {
      icon: <CodeIcon />,
      label: "Competitive Programming",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: <CricketIcon />,
      label: "Cricket & Football",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <SparklesIcon />,
      label: "Tech Exploration",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  // Animated gradient orb
  const GradientOrb = ({ className, gradient, delay = 0 }) => (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      style={{
        background: `radial-gradient(circle, ${gradient})`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Sophisticated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <GradientOrb
          className="w-96 h-96 -top-48 -left-48"
          gradient="rgba(139, 92, 246, 0.4), transparent"
          delay={0}
        />
        <GradientOrb
          className="w-[600px] h-[600px] -bottom-64 -right-64"
          gradient="rgba(59, 130, 246, 0.4), transparent"
          delay={2}
        />
        <GradientOrb
          className="w-80 h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          gradient="rgba(16, 185, 129, 0.3), transparent"
          delay={4}
        />

        {/* Elegant grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="elegant-grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-gray-900 dark:text-white"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#elegant-grid)" />
          </svg>
        </div>

        {/* Noise texture for premium feel */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left Column - Content */}
          <div className="space-y-10">
            {/* Section badge with elegant styling */}
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

            {/* Main title with editorial typography */}
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

              {/* Elegant separator */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="h-[2px] w-24 bg-gradient-to-r from-violet-600 via-purple-600 to-transparent origin-left"
              />
            </div>

            {/* Description with refined cards */}
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-900/5 dark:shadow-black/20 hover:border-violet-200 dark:hover:border-violet-900/50 transition-all duration-500">
                  <p
                    className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    A passionate{" "}
                    <span className="relative inline-block group/highlight">
                      <span className="relative z-10 font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Junior Full-Stack Developer
                      </span>
                      <motion.span
                        className="absolute bottom-0 left-0 h-3 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-blue-500/20 rounded-full -z-0"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                      />
                    </span>{" "}
                    with an innate talent for problem-solving and crafting
                    exceptional web experiences. Currently pursuing my B.Sc. in
                    Computer Science and Engineering at{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Khulna University
                    </span>
                    .
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-emerald-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-900/5 dark:shadow-black/20 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-500">
                  <p
                    className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    I specialize in architecting{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      responsive and interactive web applications
                    </span>{" "}
                    using the MERN Stack. Beyond development, I immerse myself in
                    competitive programming, tackling intricate algorithmic
                    challenges, and perpetually expanding my technical repertoire.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/70 dark:from-gray-800/70 dark:via-gray-800/60 dark:to-gray-800/70 backdrop-blur-2xl border border-emerald-200/50 dark:border-emerald-900/30 shadow-xl shadow-gray-900/5 dark:shadow-black/20">
                  <p
                    className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    When I'm not immersed in code, you'll find me{" "}
                    <span className="font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      playing cricket
                    </span>
                    , my cherished pastime. I also enjoy football, competitive
                    gaming, and exploring emerging technological trends.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Interests with sophisticated styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-lg">
                    <div className={`w-full h-full bg-gradient-to-r ${interest.gradient}`} />
                  </div>
                  <div
                    className="relative flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 shadow-lg shadow-gray-900/5 dark:shadow-black/20"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    <span className={`bg-gradient-to-r ${interest.gradient} bg-clip-text text-transparent`}>
                      {interest.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {interest.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Stats & Visual Elements */}
          <div className="relative">
            {/* Parallax decorative element */}
            <motion.div
              className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-3xl -z-10"
              style={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />

            {/* Stats grid with luxury cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-2 gap-5 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Gradient glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl">
                    <div className={`w-full h-full bg-gradient-to-r ${stat.color}`} />
                  </div>

                  {/* Card */}
                  <div className="relative p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/30 overflow-hidden">
                    {/* Animated background gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        backgroundSize: "200% 200%",
                      }}
                    />

                    <div className="relative space-y-2">
                      <motion.div
                        className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                        style={{ fontFamily: '"Playfair Display", serif' }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      >
                        {stat.value}
                      </motion.div>
                      <div
                        className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                      >
                        {stat.label}
                      </div>
                      <div
                        className="text-xs text-gray-600 dark:text-gray-400"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                      >
                        {stat.description}
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Inspirational quote with elegant design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/90 via-white/80 to-white/90 dark:from-gray-800/90 dark:via-gray-800/80 dark:to-gray-800/90 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/30">
                {/* Quote marks decoration */}
                <div className="absolute top-4 left-4 text-6xl font-serif text-violet-200 dark:text-violet-900/30 leading-none">
                  "
                </div>

                <blockquote
                  className="relative text-lg md:text-xl italic text-gray-700 dark:text-gray-300 text-center leading-relaxed pt-8"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  Transforming complex challenges into elegant, intuitive
                  solutions through the art of code
                </blockquote>

                <div className="absolute bottom-4 right-4 text-6xl font-serif text-violet-200 dark:text-violet-900/30 leading-none rotate-180">
                  "
                </div>

                {/* Decorative accent */}
                <div className="flex justify-center mt-6">
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl -z-10"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>

      {/* Elegant bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />
    </section>
  );
};

export default AboutMe;