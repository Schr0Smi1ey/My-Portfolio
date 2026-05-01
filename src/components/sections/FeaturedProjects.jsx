import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

import { useProjects } from "../../hooks";
import { ProjectShowCase } from "../nurui/project-showcase";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const getProjectStack = (project) =>
  Object.values(project.techStack || {})
    .flat()
    .slice(0, 4)
    .join(" / ");

const getProjectTechs = (project) =>
  Object.values(project.techStack || {})
    .flat()
    .slice(0, 7);

const getProjectLinks = (project) =>
  [
    { label: "Case Study", href: `/projects/${project.id}`, type: "internal" },
    { label: "Live", href: project.liveLink, type: "external" },
    { label: "Frontend", href: project.frontendCode, type: "external" },
    { label: "Backend", href: project.backendCode, type: "external" },
  ].filter((link) => link.href);

const FeaturedProjects = () => {
  const shouldReduceMotion = useReducedMotion();
  const { projects, isLoading } = useProjects();
  const featuredProjects = projects.slice(0, 3);

  const showcaseItems = featuredProjects.map((project) => ({
    name: project.name,
    quote: project.description,
    designation: project.status || getProjectStack(project),
    src: project.image,
    techStack: getProjectTechs(project),
    quickLinks: getProjectLinks(project),
  }));

  return (
    <section
      id="projects"
      className="about-cosmic-section relative mb-20 w-screen overflow-hidden bg-[#05050a] px-4 py-20 text-zinc-950 dark:text-white md:px-8 md:py-24"
      style={{ marginLeft: "calc(50% - 50vw)" }}
    >
      <motion.div
        aria-hidden="true"
        className="about-transition-veil"
        animate={shouldReduceMotion ? {} : { opacity: [0.5, 0.72, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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
              : { opacity: [0.75, 1, 0.82], y: [0, -4, 0] }
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem]">
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
          className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center"
        >
          <motion.div variants={fadeUp}>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-4 w-4 rounded-full bg-primary shadow-[0_0_18px_rgb(var(--color-primary-rgb)/0.7)]" />
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.28em] text-zinc-600 dark:text-zinc-400">
                Selected Work
              </p>
            </div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl leading-[0.82] tracking-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl"
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h2>
          </motion.div>

          <motion.span
            variants={fadeUp}
            className="hidden h-16 w-px bg-primary/70 lg:block"
            aria-hidden="true"
          />

          <motion.p
            variants={fadeUp}
            className="max-w-md text-[0.82rem] leading-6 text-zinc-600 dark:text-zinc-400"
          >
            Case-study previews for full-stack projects, rebuilt as an interactive
            showcase without scroll pinning or progress rails.
          </motion.p>
        </motion.div>

        <div className="relative rounded-[2rem] border border-zinc-300/70 bg-white/55 p-4 shadow-[0_0_60px_rgb(var(--color-primary-rgb)/0.08)] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-white/[0.025] md:p-6 lg:p-8">
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_22%_12%,rgb(var(--color-primary-rgb)/0.12),transparent_34%)]" />
          <div className="relative">
            {isLoading ? (
              <div className="h-[30rem] animate-pulse rounded-[1.5rem] bg-zinc-200/70 dark:bg-white/[0.04]" />
            ) : (
              <ProjectShowCase
                testimonials={showcaseItems}
                colors={{
                  name: "rgb(var(--color-primary-rgb))",
                  position: "var(--project-showcase-position)",
                  testimony: "var(--project-showcase-copy)",
                }}
                fontSizes={{
                  name: "clamp(2.15rem, 4.25vw, 4rem)",
                  position: "0.68rem",
                  testimony: "0.98rem",
                }}
                mobile={{
                  fontSizes: {
                    name: "clamp(1.9rem, 10vw, 3rem)",
                    position: "0.64rem",
                    testimony: "0.9rem",
                  },
                }}
                spacing={{
                  nameTop: "0",
                  nameBottom: "0.28em",
                  positionTop: "0",
                  positionBottom: "1.2em",
                  testimonyTop: "1em",
                  testimonyBottom: "1.25em",
                  lineHeight: "1.65",
                }}
                desktopVersionBottomThreshold={900}
                imageAspectRatio={1.5}
                outerRounding="1.45rem"
                innerRounding="1.25rem"
                outlineColor="rgba(255,255,255,0.1)"
                hoverOutlineColor="rgba(var(--color-primary-rgb),0.6)"
              />
            )}
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-primary transition hover:border-primary/55 hover:bg-primary/15"
          >
            View All Projects
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
