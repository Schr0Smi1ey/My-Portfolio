import { motion, useReducedMotion } from "framer-motion";
import {
  FaCode,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaNodeJs,
  FaPaintBrush,
  FaServer,
  FaTerminal,
  FaWrench,
} from "react-icons/fa";
import {
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
} from "react-icons/si";
import c from "../../assets/Home/Skills/C.png";
import cpp from "../../assets/Home/Skills/C++.png";
import python from "../../assets/Home/Skills/python.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const skillRows = [
  {
    system: "Interface",
    use: "Build UI",
    icon: FaPaintBrush,
    skills: [
      { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
      { name: "CSS3", icon: <FaCode className="text-blue-500" /> },
      { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-500" /> },
      {
        name: "JavaScript",
        icon: <SiJavascript className="text-yellow-400" />,
      },
      { name: "React", icon: <FaCode className="text-sky-400" /> },
    ],
  },
  {
    system: "Backend",
    use: "Serve APIs",
    icon: FaServer,
    skills: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
      { name: "Express", icon: <SiExpress className="text-zinc-500" /> },
      { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
    ],
  },
  {
    system: "Database",
    use: "Model Data",
    icon: FaDatabase,
    skills: [
      { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
      { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
    ],
  },
  {
    system: "Languages",
    use: "Solve Logic",
    icon: FaCode,
    skills: [
      { name: "C", icon: <img src={c} alt="" className="h-4 w-4" /> },
      { name: "C++", icon: <img src={cpp} alt="" className="h-4 w-4" /> },
      { name: "Python", icon: <img src={python} alt="" className="h-4 w-4" /> },
      { name: "DSA", icon: <FaCode className="text-primary" /> },
      { name: "OOP", icon: <FaCode className="text-zinc-500" /> },
    ],
  },
  {
    system: "Tools",
    use: "Ship Work",
    icon: FaWrench,
    skills: [
      { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
      {
        name: "GitHub",
        icon: <FaGithub className="text-zinc-700 dark:text-zinc-200" />,
      },
      { name: "Terminal", icon: <FaTerminal className="text-zinc-500" /> },
      { name: "Postman", icon: <FaWrench className="text-orange-500" /> },
      { name: "VS Code", icon: <FaCode className="text-blue-500" /> },
    ],
  },
];

const SkillChip = ({ skill }) => (
  <span className="inline-flex min-w-0 items-center gap-2 rounded-full border border-zinc-300/80 bg-white/70 px-3 py-1.5 text-[0.7rem] font-semibold text-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-100 dark:shadow-none">
    <span className="grid h-6 w-6 shrink-0 place-items-center text-[18px]">
      {skill.icon}
    </span>
    <span className="truncate text-[14px] font-normal">{skill.name}</span>
  </span>
);

const SkillRow = ({ row, index }) => {
  const Icon = row.icon;

  return (
    <motion.div
      variants={fadeUp}
      className="grid gap-4 border-b border-zinc-300/70 px-4 py-5 last:border-b-0 dark:border-white/[0.07] md:grid-cols-[3rem_8rem_minmax(0,1fr)_7rem] md:items-center"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>

      <div>
        <p className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.18em] text-zinc-500">
          0{index + 1}
        </p>
        <h3 className="mt-1 text-xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
          {row.system}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {row.skills.map((skill) => (
          <SkillChip key={skill.name} skill={skill} />
        ))}
      </div>

      <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-primary md:text-right">
        {row.use}
      </p>
    </motion.div>
  );
};

const Skills = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="about-cosmic-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 py-20 mb-20 text-zinc-950 dark:text-white md:px-8 md:py-24"
    >
      <div className="about-cosmic-starfield" aria-hidden="true" />
      <div className="cosmic-noise" aria-hidden="true" />
      <motion.div
        className="cosmic-orb cosmic-orb-left"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, -12, 0], x: [0, 8, 0], scale: [1, 1.04, 1] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="cosmic-orb cosmic-orb-right"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, 14, 0], x: [0, -8, 0], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.07, delayChildren: 0.08 },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 mx-auto max-w-6xl"
      >
        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <motion.div variants={fadeUp} className="p-2 lg:p-1">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-4 w-4 rounded-full bg-primary shadow-[0_0_18px_rgb(var(--color-primary-rgb)/0.7)]" />
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.28em] text-zinc-600 dark:text-zinc-400">
                Technical Systems
              </p>
            </div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl leading-[0.82] tracking-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl"
            >
              Skills &{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Expertise
              </span>
            </motion.h2>
          </motion.div>

          <motion.span
            variants={fadeUp}
            className="hidden h-16 w-px bg-primary/70 lg:block"
            aria-hidden="true"
          />

          <motion.div variants={fadeUp} className="p-2 lg:p-1">
            <p className="max-w-md text-[0.82rem] leading-6 text-zinc-500">
              A compact operating table for the stack I use to build interfaces,
              connect services, model data, and solve implementation problems.
            </p>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="about-bento-card">
          <div className="hidden border-b border-zinc-300/70 px-4 py-3 font-mono text-[0.56rem] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:border-white/[0.07] md:grid md:grid-cols-[3rem_8rem_minmax(0,1fr)_7rem] md:gap-4">
            <span />
            <span>System</span>
            <span>Skills</span>
            <span className="text-right">Use</span>
          </div>

          {skillRows.map((row, index) => (
            <SkillRow key={row.system} row={row} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
