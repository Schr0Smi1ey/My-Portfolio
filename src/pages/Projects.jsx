import { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FiArrowRight,
  FiExternalLink,
  FiGithub,
  FiSearch,
  FiX,
  FiLayers,
} from "react-icons/fi";
import { DiNodejsSmall, DiReact } from "react-icons/di";
import {
  SiAppwrite,
  SiChartdotjs,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

import { PageWrapper, Spinner, EmptyState } from "../components/ui";
import AnimatedNumber from "../components/ui/AnimatedNumber";
import { useProjects } from "../hooks";
import { TECH_FILTERS } from "../constants";

const getTechIcon = (label) => {
  const key = label.toLowerCase();
  if (key.includes("react")) return <DiReact className="text-sky-400" />;
  if (key.includes("typescript"))
    return <SiTypescript className="text-blue-500" />;
  if (key.includes("next")) return <SiNextdotjs className="text-zinc-900 dark:text-white/80" />;
  if (key.includes("tailwind"))
    return <SiTailwindcss className="text-cyan-400" />;
  if (key.includes("node")) return <DiNodejsSmall className="text-green-500" />;
  if (key.includes("express")) return <SiExpress className="text-zinc-700 dark:text-zinc-400" />;
  if (key.includes("mongo")) return <SiMongodb className="text-green-500" />;
  if (key.includes("firebase"))
    return <SiFirebase className="text-amber-500" />;
  if (key.includes("vercel")) return <SiVercel className="text-zinc-900 dark:text-white/80" />;
  if (key.includes("framer")) return <SiFramer className="text-yellow-400" />;
  if (key.includes("appwrite")) return <SiAppwrite className="text-pink-500" />;
  if (key.includes("chart")) return <SiChartdotjs className="text-rose-500" />;
  return null;
};

const TechChip = ({ label }) => {
  const icon = getTechIcon(label);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300/70 bg-white/70 px-2.5 py-1 font-mono text-[0.52rem] font-bold uppercase tracking-[0.12em] text-zinc-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-400">
      {icon && (
        <span className="inline-grid place-items-center text-[0.72rem]">
          {icon}
        </span>
      )}
      {label}
    </span>
  );
};

const StatusBadge = ({ status }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.08] px-2.5 py-0.5 font-mono text-[0.5rem] font-bold uppercase tracking-[0.16em] text-primary">
    <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgb(var(--color-primary-rgb)/0.9)]" />
    {status}
  </span>
);

const ProjectActionLink = ({ href, children, icon: Icon }) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300/70 bg-white/65 px-4 py-2 font-mono text-[0.56rem] font-bold uppercase tracking-[0.14em] text-zinc-600 transition hover:border-primary/30 hover:text-primary dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400"
    >
      {children}
      <Icon className="h-3 w-3" />
    </a>
  );
};

const ProjectCard = ({ project, index }) => {
  const techStack = Object.values(project.techStack || {})
    .flat()
    .slice(0, 6);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-300/70 bg-white/65 transition-all duration-300 hover:border-primary/25 hover:bg-white/85 hover:shadow-[0_0_45px_rgb(var(--color-primary-rgb)/0.07)] dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
    >
      <div className="grid md:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="relative overflow-hidden bg-zinc-200/70 dark:bg-zinc-900/60 md:min-h-[16rem]">
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            className="h-full min-h-[12rem] w-full object-cover object-top"
          />

          <div className="absolute top-3 left-3">
            <StatusBadge status={project.status} />
          </div>
        </div>

        <div className="relative flex flex-col justify-between gap-6 p-5 md:p-7">
          <div>
            <div className="mb-1 flex items-baseline gap-3">
              <span className="font-mono text-[0.52rem] font-bold tracking-[0.2em] text-primary/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-2xl font-black leading-tight tracking-tight text-zinc-950 transition-colors duration-200 group-hover:text-primary dark:text-white md:text-3xl">
                {project.name}
              </h2>
            </div>

            <p className="mt-3 line-clamp-3 text-[0.85rem] leading-relaxed text-zinc-600 dark:text-zinc-500">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-zinc-300/70 pt-2 dark:border-white/[0.05]">
            <ProjectActionLink href={project.liveLink} icon={FiExternalLink}>
              Live
            </ProjectActionLink>
            <ProjectActionLink href={project.frontendCode} icon={FiGithub}>
              Frontend
            </ProjectActionLink>
            <ProjectActionLink href={project.backendCode} icon={FiGithub}>
              Backend
            </ProjectActionLink>
            <Link
              to={`/projects/${project.id}`}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-[0.56rem] font-bold uppercase tracking-[0.14em] text-primary transition hover:border-primary/55 hover:bg-primary/15"
            >
              Details
              <FiArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectsPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const { projects, isLoading } = useProjects();
  const [activeTech, setActiveTech] = useState("All");
  const [search, setSearch] = useState("");
  const filters = useMemo(() => Array.from(new Set(TECH_FILTERS)), []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const allTechs = Object.values(p.techStack || {})
        .flat()
        .map((t) => t.toLowerCase());
      const matchesTech =
        activeTech === "All" || allTechs.includes(activeTech.toLowerCase());
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchesTech && matchesSearch;
    });
  }, [projects, activeTech, search]);

  const hasFilter = search || activeTech !== "All";

  return (
    <PageWrapper className="!px-0 !pt-0 !pb-0">
      <Helmet>
        <title>Projects — Sarafat Karim</title>
        <meta
          name="description"
          content="Full-stack projects built with React, Node.js, MongoDB and more."
        />
      </Helmet>

      <section className="about-cosmic-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 !mt-0 !pt-28 !pb-20 text-zinc-950 dark:text-white md:px-8 md:!pt-32 md:!pb-24">
        <div className="about-cosmic-starfield" aria-hidden="true" />
        <div className="cosmic-noise" aria-hidden="true" />

        <motion.div
          className="cosmic-orb cosmic-orb-left"
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? {}
              : { y: [0, -14, 0], x: [0, 8, 0], scale: [1, 1.04, 1] }
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

        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <FiLayers className="h-4 w-4" />
              </span>
              <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.28em] text-zinc-500">
                Portfolio / Work
              </p>
            </div>

            <h1 className="font-display text-5xl font-black leading-[0.9] tracking-tight text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl">
              All{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-[0.88rem] leading-7 text-zinc-600 dark:text-zinc-500">
              Full-stack applications built with the MERN stack, focused on
              real-world problems and clean user experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 space-y-5"
          >
            <div className="relative max-w-sm">
              <FiSearch className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500 dark:text-zinc-600" />
              <input
                type="text"
                placeholder="Search projects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-zinc-300/70 bg-white/65 py-2.5 pl-9 pr-9 font-mono text-[0.75rem] text-zinc-800 placeholder-zinc-500 outline-none transition focus:border-primary/35 focus:bg-white/85 focus:ring-0 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-300 dark:placeholder-zinc-600 dark:focus:bg-white/[0.05]"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-600 dark:hover:text-zinc-300"
                  aria-label="Clear search"
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter by technology"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveTech(filter)}
                  className={`rounded-full border px-3.5 py-1.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.16em] transition-all duration-200 ${
                    activeTech === filter
                      ? "border-primary/50 bg-primary/15 text-primary shadow-[0_0_20px_rgb(var(--color-primary-rgb)/0.15)]"
                      : "border-zinc-300/70 bg-white/65 text-zinc-600 hover:border-primary/30 hover:text-primary dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-500 dark:hover:border-white/20 dark:hover:text-zinc-300"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {hasFilter && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-600"
                >
                  <AnimatedNumber value={filtered.length} /> result
                  {filtered.length !== 1 ? "s" : ""}
                  {activeTech !== "All" && (
                    <>
                      {" "}
                      · <span className="text-primary">{activeTech}</span>
                    </>
                  )}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {isLoading ? (
            <div className="py-24">
              <Spinner />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <EmptyState
                    message={`No projects match "${search || activeTech}".`}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={`${activeTech}-${search}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {filtered.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>
    </PageWrapper>
  );
};

export default ProjectsPage;
