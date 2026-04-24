import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowRight,
  FiExternalLink,
  FiGithub,
  FiMousePointer,
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

gsap.registerPlugin(ScrollTrigger);

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

const getTechIcon = (label) => {
  const key = label.toLowerCase();

  if (key.includes("react")) return <DiReact className="text-sky-400" />;
  if (key.includes("typescript"))
    return <SiTypescript className="text-blue-500" />;
  if (key.includes("next"))
    return <SiNextdotjs className="text-zinc-900 dark:text-white" />;
  if (key.includes("tailwind"))
    return <SiTailwindcss className="text-cyan-400" />;
  if (key.includes("node")) return <DiNodejsSmall className="text-green-500" />;
  if (key.includes("express"))
    return <SiExpress className="text-zinc-700 dark:text-zinc-300" />;
  if (key.includes("mongo")) return <SiMongodb className="text-green-600" />;
  if (key.includes("firebase"))
    return <SiFirebase className="text-amber-500" />;
  if (key.includes("vercel"))
    return <SiVercel className="text-zinc-900 dark:text-white" />;
  if (key.includes("framer")) return <SiFramer className="text-yellow-400" />;
  if (key.includes("lang")) return <span className="text-emerald-500">⌬</span>;
  if (key.includes("appwrite")) return <SiAppwrite className="text-pink-500" />;
  if (key.includes("chart")) return <SiChartdotjs className="text-rose-500" />;
  if (key.includes("rune")) return <span className="text-primary">⌁</span>;

  return null;
};

const TechChip = ({ label }) => {
  const icon = getTechIcon(label);

  return (
    <span className="rounded-full border border-zinc-300/80 bg-white/70 px-3 py-1.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em] text-zinc-700 dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-300">
      {icon && (
        <span className="mr-2 inline-grid translate-y-[1px] place-items-center text-sm">
          {icon}
        </span>
      )}
      {label}
    </span>
  );
};

const ProjectGallery = ({ project }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCursor({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    });
  };

  return (
    <motion.div
      className="group/gallery relative block overflow-hidden rounded-2xl"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "tween",
      }}
    >
      <a
        href={project.liveLink}
        target="_blank"
        rel="noreferrer"
        onMouseMove={handleMove}
        onMouseEnter={() => setCursor((v) => ({ ...v, active: true }))}
        onMouseLeave={() => setCursor((v) => ({ ...v, active: false }))}
        className="relative block"
        aria-label={`Open live demo for ${project.name}`}
      >
        <div className="grid gap-4 lg:grid-cols-[0.78fr_1.72fr]">
          <div className="grid gap-4">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="relative overflow-hidden rounded-2xl border border-zinc-300/70 bg-primary/10 p-3 dark:border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-white/30 dark:to-white/5" />
                <motion.img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className="relative mx-auto aspect-[9/12] h-44 rounded-xl border border-black/10 object-cover object-top shadow-2xl shadow-black/20 transition duration-500 group-hover/gallery:scale-[1.02] dark:border-white/10 sm:h-52 lg:h-48"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-zinc-300/70 bg-primary/10 p-4 dark:border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-primary/12 to-white/30 dark:to-white/5" />
            <motion.img
              src={project.image}
              alt={`${project.name} preview`}
              loading="lazy"
              className="relative aspect-[16/10] h-full min-h-[17rem] w-full rounded-xl border border-black/10 object-cover object-top shadow-2xl shadow-black/25 transition duration-500 group-hover/gallery:scale-[1.015] dark:border-white/10"
              whileHover={{ scale: 1.03, rotateY: 3 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.span
          className={`pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-primary/40 bg-black/75 px-3 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em] text-primary shadow-[0_0_32px_rgb(var(--color-primary-rgb)/0.22)] backdrop-blur-xl transition-opacity duration-150 lg:inline-flex ${
            cursor.active ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: cursor.x, top: cursor.y }}
          animate={{ scale: cursor.active ? 1 : 0.8 }}
        >
          <FiMousePointer className="h-3.5 w-3.5" />
          Live
        </motion.span>
      </a>
    </motion.div>
  );
};

const ProjectDetails = ({ project, index }) => {
  const techStack = Object.values(project.techStack || {})
    .flat()
    .slice(0, 8);
  const features = project.features?.slice(0, 3) || [];

  return (
    <div className="relative max-w-xl">
      <div className="mb-4 flex items-center gap-4">
        <span className="h-1 w-8 rounded-full bg-primary shadow-[0_0_18px_rgb(var(--color-primary-rgb)/0.55)]" />
        <h3 className="text-3xl font-black leading-tight tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
          {project.name}
        </h3>
      </div>

      <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.22em] text-primary">
        Project {String(index + 1).padStart(2, "0")}
      </p>

      <p className="mt-4 line-clamp-6 text-[0.95rem] leading-7 text-zinc-600 dark:text-zinc-300">
        {project.description}
      </p>

      {/* {features.length > 0 && (
        <div className="mt-7 space-y-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-primary shadow-[0_0_16px_rgb(var(--color-primary-rgb)/0.55)]" />
              <p className="text-[0.84rem] font-semibold leading-5 text-zinc-700 dark:text-zinc-300">
                {feature.title}
              </p>
            </div>
          ))}
        </div>
      )} */}

      <div className="mt-8 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <TechChip key={tech} label={tech} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-primary transition hover:border-primary/55 hover:bg-primary/15"
        >
          Details
          <FiArrowRight className="h-3.5 w-3.5" />
        </Link>

        {project.frontendCode && (
          <a
            href={project.frontendCode}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300/80 bg-white/65 px-4 py-2.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-zinc-700 transition hover:border-primary/45 hover:text-primary dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-300 dark:hover:text-primary"
          >
            Frontend
            <FiGithub className="h-3.5 w-3.5" />
          </a>
        )}

        {project.backendCode && (
          <a
            href={project.backendCode}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300/80 bg-white/65 px-4 py-2.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-zinc-700 transition hover:border-primary/45 hover:text-primary dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-300 dark:hover:text-primary"
          >
            Backend
            <FiGithub className="h-3.5 w-3.5" />
          </a>
        )}

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300/80 bg-white/65 px-4 py-2.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-zinc-700 transition hover:border-primary/45 hover:text-primary dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-300 dark:hover:text-primary"
          >
            Live
            <FiExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  const shouldReduceMotion = useReducedMotion();

  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const pointerRef = useRef(null);
  const activeIndexRef = useRef(0);

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("/Data/Projects.json")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.slice(0, 3));
        setActiveIndex(0);
      })
      .catch(() => setProjects([]))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (
      isLoading ||
      shouldReduceMotion ||
      projects.length === 0 ||
      !sectionRef.current
    ) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(progressRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      const scrollDistance =
        window.innerHeight * Math.max(projects.length - 1, 1);

      // Create the pin animation
      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: `+=${scrollDistance}`,
        pinSpacing: true,
        scrub: 0.25,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          let nextIndex = Math.round(
            self.progress * Math.max(projects.length - 1, 0),
          );
          nextIndex = Math.min(projects.length - 1, Math.max(0, nextIndex));
          const activeProjectProgress =
            projects.length <= 1 ? 1 : nextIndex / (projects.length - 1);
          const visualProgress =
            nextIndex === projects.length - 1
              ? 1
              : Math.max(self.progress, activeProjectProgress);

          if (nextIndex !== activeIndexRef.current) {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }

          // Update progress bar
          gsap.to(progressRef.current, {
            scaleY: visualProgress,
            duration: 0.28,
            ease: "power2.out",
            overwrite: true,
          });

          // Move pointer along with progress
          if (pointerRef.current && progressRef.current?.parentElement) {
            const maxHeight = progressRef.current.parentElement.clientHeight;
            const pointerPosition = visualProgress * maxHeight;
            gsap.to(pointerRef.current, {
              y: pointerPosition,
              duration: 0.28,
              ease: "power2.out",
              overwrite: true,
            });
          }
        },
      });

      return () => {
        pinTrigger.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, projects.length, shouldReduceMotion]);

  // Refresh ScrollTrigger on resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeProject = projects[activeIndex];

  return (
    <section
      className="about-cosmic-section relative mb-20 w-screen overflow-hidden bg-[#05050a] !pt-0 text-white"
      style={{ marginLeft: "calc(50% - 50vw)" }}
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

      {/* Section header */}
      <div className="relative z-10 overflow-hidden px-4 text-zinc-950 dark:text-white md:px-8 md:pt-24">
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
          className="mx-auto max-w-6xl"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <motion.div variants={fadeUp} className="p-2 lg:p-1">
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

            <motion.div variants={fadeUp} className="p-2 lg:p-1">
              <p className="max-w-md text-[0.82rem] leading-6 text-zinc-600 dark:text-zinc-400">
                Case-study previews for full-stack projects, with product flow,
                core features, stack decisions, and live interfaces.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Pinned section */}
      <section
        id="projects"
        ref={sectionRef}
        className="relative z-10 w-full px-4 text-zinc-950 dark:text-white md:px-8"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <div className="mx-auto flex h-full w-full max-w-6xl items-center">
          {isLoading || !activeProject ? (
            <div className="w-full animate-pulse" style={{ height: "28rem" }} />
          ) : (
            <div className="grid w-full gap-6 lg:grid-cols-[0.86fr_4rem_1.28fr] lg:items-center">
              {/* Left: project details - NO ANIMATION, smooth change */}
              <div className="transition-all duration-300">
                <ProjectDetails
                  key={activeProject.id}
                  project={activeProject}
                  index={activeIndex}
                />
              </div>

              {/* Middle: progress track */}
              <div className="relative hidden h-[50vh] justify-center lg:flex">
                {/* Progress bar container */}
                <div className="absolute inset-y-0 w-2 overflow-hidden rounded-[999px] bg-zinc-300/80 dark:bg-zinc-700/30">
                  <div
                    ref={progressRef}
                    className="project-progress-fill absolute inset-x-0 top-0 block h-full w-full origin-top rounded-[999px]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgb(var(--color-primary-rgb) / 0.72), var(--color-primary) 45%, rgb(var(--color-primary-rgb) / 0.9))",
                      boxShadow:
                        "0 0 24px rgb(var(--color-primary-rgb) / 0.55)",
                    }}
                  />
                </div>

                {/* Moving pointer */}
                <div
                  ref={pointerRef}
                  className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: 0 }}
                >
                  <motion.div
                    className="grid h-9 w-9 place-items-center rounded-full border border-primary/50 bg-white text-[0.8rem] text-zinc-950 shadow-[0_0_32px_rgb(var(--color-primary-rgb)/0.4)] dark:bg-zinc-950 dark:text-white"
                    animate={{
                      scale: [1, 1.08, 1],
                      boxShadow: [
                        "0 0 0 0 rgb(var(--color-primary-rgb) / 0.35)",
                        "0 0 0 10px rgb(var(--color-primary-rgb) / 0)",
                        "0 0 0 0 rgb(var(--color-primary-rgb) / 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <SKMark />
                  </motion.div>
                </div>
              </div>

              {/* Right: gallery with slide animation - current leaves RIGHT, next enters from LEFT */}
              <AnimatePresence mode="wait">
                <ProjectGallery
                  key={activeProject.id}
                  project={activeProject}
                />
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* View all section */}
      <div className="relative z-10 px-4 pb-20 text-zinc-950 dark:text-white md:px-8 md:pb-24">
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
