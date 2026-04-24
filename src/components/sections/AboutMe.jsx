import { motion, useReducedMotion } from "framer-motion";
import {
  FaBug,
  FaCode,
  FaCodeBranch,
  FaCube,
  FaQuoteLeft,
} from "react-icons/fa";

import CopyEmail from "../ui/CopyEmail";
import {
  CodeIcon,
  CricketIcon,
  SparklesIcon,
  FilmIcon,
  GameIcon,
} from "../../assets/Home/AboutMe/icons";
import { useTotalCommits } from "../../hooks/index";

const email = "Sarafatkarim555@gmail.com";

const statCards = [
  {
    label: "Projects",
    value: "8+",
    detail: "Completed",
    icon: FaCube,
    tone: "text-primary",
  },
  {
    label: "Problems",
    value: "1135+",
    detail: "Solved",
    icon: FaBug,
    tone: "text-purple-400",
  },
  {
    label: "Technologies",
    value: "20+",
    detail: "Mastered",
    icon: FaCode,
    tone: "text-emerald-400",
  },
];

const interests = [
  { label: "Cricket & Football", icon: CricketIcon, tone: "text-primary" },
  { label: "Tech Exploration", icon: SparklesIcon, tone: "text-purple-400" },
  { label: "Movies & Series", icon: FilmIcon, tone: "text-emerald-400" },
  { label: "Online Games", icon: GameIcon, tone: "text-orange-400" },
  { label: "Competitive Programming", icon: CodeIcon, tone: "text-blue-400" },
];

const aboutParagraph = (
  <>
    I&apos;m a passionate{" "}
    <span className="text-primary">MERN Stack Developer</span> and competitive
    programmer, currently pursuing B.Sc. in Computer Science at{" "}
    <span className="text-primary">Khulna University</span>. I build responsive,
    scalable applications with MongoDB, Express.js, React, and Node.js, sharpen
    my problem-solving through competitive programming, and keep exploring
    AI/ML, cloud architecture, movies, sports, and games to stay curious beyond
    code.
  </>
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const SKMark = ({ className = "" }) => (
  <span
    className={`sk-mark inline-flex items-baseline justify-center tracking-tight ${className}`}
  >
    <span>S</span>
    <span className="text-primary">K</span>
  </span>
);

const AboutMe = () => {
  const shouldReduceMotion = useReducedMotion();

  const {
    formatted: commitFormatted,
    isLoading: commitLoading,
    isError: commitError,
  } = useTotalCommits();

  const allStats = [
    ...statCards,
    {
      label: "Commits",
      value: commitLoading || commitError ? "1k+" : commitFormatted,
      detail: "Pushed",
      icon: FaCodeBranch,
      tone: "text-orange-400",
    },
  ];

  const rowVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
      scale: shouldReduceMotion ? 1 : 0.985,
    },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: shouldReduceMotion ? 0 : i * 0.06,
        duration: shouldReduceMotion ? 0.01 : 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const floatingIcon = shouldReduceMotion
    ? {}
    : {
        animate: {
          y: [0, -4, 0],
          transition: {
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
      };

  const BentoCard = ({ children, className = "" }) => (
    <motion.div
      initial={
        shouldReduceMotion ? false : { opacity: 0, y: 20, filter: "blur(8px)" }
      }
      whileInView={
        shouldReduceMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`about-bento-card group relative overflow-hidden transition-[border-color,box-shadow,background-color] duration-300 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgb(var(--color-primary-rgb) / 0.14), transparent 45%)",
        }}
      />
      {children}
    </motion.div>
  );

  const InterestRow = ({ interest, index }) => {
    const Icon = interest.icon;

    return (
      <motion.div
        custom={index}
        variants={rowVariants}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                y: -4,
                scale: 1.02,
                transition: { duration: 0.22 },
              }
        }
        className="group flex items-center gap-4 rounded-[1.65rem] border border-white/[0.08] bg-white/[0.035] px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.055]"
      >
        <motion.div
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-current/35 bg-current/10 ${interest.tone}`}
          whileHover={shouldReduceMotion ? {} : { rotate: 6, scale: 1.08 }}
          transition={{ duration: 0.22 }}
        >
          <Icon />
        </motion.div>

        <span className="text-sm font-semibold text-zinc-100 transition-colors duration-300 group-hover:text-white">
          {interest.label}
        </span>
      </motion.div>
    );
  };

  const StatTallItem = ({ stat, index }) => {
    const Icon = stat.icon;

    return (
      <motion.div
        custom={index}
        variants={rowVariants}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                y: -4,
                scale: 1.015,
                transition: { duration: 0.22 },
              }
        }
        className="group flex items-center gap-4 rounded-[1.65rem] border border-white/[0.08] bg-white/[0.035] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.055]"
      >
        <motion.div
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-current/35 bg-current/10 ${stat.tone}`}
          whileHover={shouldReduceMotion ? {} : { scale: 1.08, rotate: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Icon className="h-4 w-4" />
        </motion.div>

        <div className="flex min-w-0 items-center gap-8">
          <div>
            <motion.div
              className={`font-serif text-3xl leading-none ${stat.tone}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 + index * 0.05 }}
            >
              {stat.value}
            </motion.div>
            <div className="mt-1.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-zinc-200">
              {stat.label}
            </div>
          </div>
          <div className="mt-1 text-xs text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
            {stat.detail}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="about"
      className="about-cosmic-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] mb-20 px-4 py-24 text-zinc-950 dark:text-white md:px-8 md:py-28"
    >
      <motion.div
        aria-hidden="true"
        className="about-transition-veil"
        animate={
          shouldReduceMotion
            ? {}
            : {
                opacity: [0.5, 0.72, 0.5],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="about-cosmic-starfield" aria-hidden="true" />
      <div className="cosmic-noise" aria-hidden="true" />

      <motion.div
        className="cosmic-orb cosmic-orb-left"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, -16, 0], x: [0, 8, 0], scale: [1, 1.04, 1] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="cosmic-orb cosmic-orb-right"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, 18, 0], x: [0, -8, 0], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="pointer-events-none absolute inset-x-[-2rem] bottom-[-7rem] h-64 overflow-hidden">
        <motion.div
          className="about-cosmic-surface"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  opacity: [0.75, 1, 0.82],
                  y: [0, -4, 0],
                }
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-4 xl:grid-cols-[1.08fr_0.96fr_1.18fr]">
        <BentoCard className="xl:col-span-2 p-5 lg:p-7">
          <div className="flex h-full flex-col gap-10">
            <div className="flex flex-col gap-8">
              <motion.div
                className="inline-flex w-fit items-center gap-4 pt-2"
                {...floatingIcon}
              >
                <span className="h-4 w-4 rounded-full bg-primary shadow-[0_0_18px_rgb(var(--color-primary-rgb)/0.55)]" />
                <motion.h2
                  variants={fadeUp}
                  className="font-display text-3xl leading-[0.82] tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl"
                >
                  About{" "}
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                    Me
                  </span>
                </motion.h2>
              </motion.div>
            </div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="leading-[2.2rem] text-zinc-300 sm:text-sm lg:text-lg"
            >
              <p>{aboutParagraph}</p>
            </motion.div>
          </div>
        </BentoCard>

        <BentoCard className="xl:row-span-2 p-5 lg:p-7">
          <div className="mb-5 flex items-center gap-4">
            <motion.span
              className="h-4 w-4 rounded-full bg-primary shadow-[0_0_18px_rgb(var(--color-primary-rgb)/0.55)]"
              {...floatingIcon}
            />
            <h3 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-white lg:text-4xl">
              Stats
            </h3>
          </div>

          <p className="max-w-lg text-[0.95rem] leading-7 text-zinc-400">
            A quick snapshot of output, problem-solving volume, tools, and code
            pushed.
          </p>

          <div className="mt-7 space-y-5">
            {allStats.map((stat, index) => (
              <StatTallItem key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </BentoCard>

        <BentoCard className="p-5 lg:p-7">
          <div className="flex h-full flex-col justify-center text-center">
            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scale: 0.7, rotate: -12 }
              }
              whileInView={
                shouldReduceMotion ? {} : { opacity: 1, scale: 1, rotate: 0 }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <FaQuoteLeft className="mb-7 h-8 w-8 text-primary" />
            </motion.div>

            <motion.blockquote
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mx-auto max-w-xl text-xl italic leading-[1.65] text-zinc-100"
            >
              Debugging is like being the detective in a crime movie where you
              are also the murderer.
            </motion.blockquote>

            <motion.p
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, letterSpacing: "0.5em" }
              }
              whileInView={
                shouldReduceMotion
                  ? {}
                  : { opacity: 1, letterSpacing: "0.34em" }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-7 text-xs font-mono uppercase tracking-[0.34em] text-zinc-500"
            >
              Personal Note
            </motion.p>
          </div>
        </BentoCard>

        <BentoCard className="p-5 lg:p-7">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <motion.div
              initial={
                shouldReduceMotion ? false : { opacity: 0, scale: 0.8, y: 10 }
              }
              whileInView={
                shouldReduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl text-white"
            >
              <SKMark />
            </motion.div>

            <motion.h3
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-5 text-xl font-bold text-zinc-950 dark:text-white"
            >
              Let&apos;s innovate together
            </motion.h3>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="mt-2 text-base text-zinc-500"
            >
              Ready to bring your vision to life?
            </motion.p>

            <motion.div
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.96 }
              }
              whileInView={
                shouldReduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="mt-5 flex justify-center"
            >
              <CopyEmail email={email} />
            </motion.div>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="mt-3 text-sm text-zinc-600"
            >
              Get in touch via email
            </motion.p>
          </div>
        </BentoCard>

        <BentoCard className="xl:col-span-3 p-4 lg:p-6">
          <div className="mb-5 flex items-center gap-4">
            <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_16px_rgb(var(--color-primary-rgb)/0.5)]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">
              Beyond Code
            </h3>
            <motion.span
              initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
              whileInView={shouldReduceMotion ? {} : { scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="h-px flex-1 origin-left bg-white/[0.08]"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
            {interests.map((interest, index) => (
              <InterestRow
                key={interest.label}
                interest={interest}
                index={index}
              />
            ))}
          </div>
        </BentoCard>
      </div>
    </section>
  );
};

export default AboutMe;
