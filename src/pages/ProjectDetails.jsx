import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  FiExternalLink,
  FiGithub,
  FiArrowLeft,
  FiZap,
  FiTool,
  FiCompass,
  FiLayers,
} from "react-icons/fi";
import { DiReact, DiNodejsSmall } from "react-icons/di";
import { SiFirebase, SiTailwindcss, SiMongodb, SiVercel } from "react-icons/si";
import { useProject } from "../hooks";
import { Spinner } from "../components/ui";
import { PageWrapper } from "../components/ui";

const TECH_ICONS = {
  frontend: <DiReact className="text-sky-400 text-xl" />,
  backend: <DiNodejsSmall className="text-green-500 text-xl" />,
  authentication: <SiFirebase className="text-amber-500 text-xl" />,
  deployment: <SiVercel className="text-zinc-900 dark:text-zinc-300 text-xl" />,
  styling: <SiTailwindcss className="text-cyan-400 text-xl" />,
  database: <SiMongodb className="text-green-500 text-xl" />,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

const TechChip = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-300/70 bg-white/70 px-2.5 py-1 font-mono text-[0.52rem] font-bold uppercase tracking-[0.12em] text-zinc-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-400">
    {label}
  </span>
);

const StackCard = ({ category, stack }) => (
  <div className="rounded-2xl border border-zinc-300/70 bg-white/65 p-5 transition hover:border-primary/20 hover:bg-white/85 dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:bg-white/[0.05]">
    <div className="mb-4 flex items-center gap-2.5">
      {TECH_ICONS[category.toLowerCase()] ?? (
        <FiLayers className="text-primary text-base" />
      )}
      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
        {category}
      </span>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {stack.map((tech) => (
        <TechChip key={tech} label={tech} />
      ))}
    </div>
  </div>
);

const Section = ({ icon, title, items, accent = false }) => (
  <div className="rounded-2xl border border-zinc-300/70 bg-white/65 p-6 transition hover:border-primary/20 dark:border-white/[0.07] dark:bg-white/[0.03]">
    <div className="mb-6 flex items-center gap-3">
      <span
        className={`grid h-8 w-8 place-items-center rounded-lg border text-sm ${
          accent
            ? "border-primary/30 bg-primary/10 text-primary"
            : "border-zinc-300/70 bg-white/70 text-zinc-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-400"
        }`}
      >
        {icon}
      </span>
      <h2 className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.22em] text-zinc-600 dark:text-zinc-400">
        {title}
      </h2>
    </div>
    <ul className="space-y-5">
      {items.map((item, i) => (
        <li key={i} className="border-l-2 border-primary/25 pl-4 space-y-1">
          <h3 className="text-sm font-bold text-zinc-950 dark:text-white leading-snug">
            {item.title}
          </h3>
          <p className="text-[0.82rem] leading-relaxed text-zinc-600 dark:text-zinc-500">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  </div>
);

const ActionBtn = ({ href, icon, label, primary = false }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em] transition ${
      primary
        ? "border border-primary/40 bg-primary/15 text-primary hover:border-primary/65 hover:bg-primary/20"
        : "border border-zinc-300/70 bg-white/65 text-zinc-600 hover:border-primary/30 hover:text-primary dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400"
    }`}
  >
    {icon}
    {label}
  </a>
);

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { project, isLoading } = useProject(id);

  if (isLoading) {
    return (
      <PageWrapper>
        <section className="bg-white py-32 dark:bg-[#05050a]">
          <Spinner />
        </section>
      </PageWrapper>
    );
  }

  if (!project) {
    return (
      <PageWrapper className="!mb-0 !pt-0 !pb-0">
        <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-white dark:bg-[#05050a]">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-zinc-600">
            Project not found
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-primary hover:border-primary/55"
          >
            <FiArrowLeft className="h-3.5 w-3.5" />
            Back to projects
          </Link>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="!pb-0">
      <Helmet>
        <title>{project.name} — Sarafat Karim</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <section className="about-cosmic-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 pb-12 pt-20 text-zinc-950 dark:text-white md:px-8">
        <div className="about-cosmic-starfield" aria-hidden="true" />
        <div className="cosmic-noise" aria-hidden="true" />
        <motion.div
          className="cosmic-orb cosmic-orb-right"
          aria-hidden="true"
          animate={{ y: [0, 16, 0], x: [0, -8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.div {...fadeUp(0)} className="mb-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-primary transition hover:border-primary/50"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
              All Projects
            </Link>
          </motion.div>

          <motion.header {...fadeUp(0.05)} className="mb-12">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgb(var(--color-primary-rgb)/0.8)]" />
              <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.22em] text-primary/70">
                {project.status}
              </span>
            </div>

            <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl">
              {project.name}
            </h1>

            <p className="mt-5 max-w-2xl text-[0.9rem] leading-7 text-zinc-600 dark:text-zinc-500">
              {project.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.liveLink && (
                <ActionBtn
                  href={project.liveLink}
                  icon={<FiExternalLink className="h-3.5 w-3.5" />}
                  label="Live Demo"
                  primary
                />
              )}
              {project.frontendCode && (
                <ActionBtn
                  href={project.frontendCode}
                  icon={<FiGithub className="h-3.5 w-3.5" />}
                  label="Frontend"
                />
              )}
              {project.backendCode && (
                <ActionBtn
                  href={project.backendCode}
                  icon={<FiGithub className="h-3.5 w-3.5" />}
                  label="Backend"
                />
              )}
            </div>
          </motion.header>

          <motion.div
            {...fadeUp(0.1)}
            className="mb-14 overflow-hidden rounded-3xl border border-zinc-300/70 bg-white/70 p-1.5 shadow-[0_0_60px_rgb(var(--color-primary-rgb)/0.07)] dark:border-white/[0.07] dark:bg-white/[0.03]"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full rounded-2xl object-cover"
            />
          </motion.div>

          <motion.div {...fadeUp(0.12)} className="mb-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-6 bg-primary/60" />
              <h2 className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-500">
                Tech Stack
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(project.techStack).map(([category, stack]) => (
                <StackCard key={category} category={category} stack={stack} />
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.14)}
            className="grid grid-cols-1 gap-4 lg:grid-cols-3"
          >
            <Section
              icon={<FiZap />}
              title="Key Features"
              items={project.features}
              accent
            />
            <Section
              icon={<FiTool />}
              title="Challenges"
              items={project.challenges}
            />
            <Section
              icon={<FiCompass />}
              title="Future Plans"
              items={project.futurePlans}
            />
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default ProjectDetailsPage;
