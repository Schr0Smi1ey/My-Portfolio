import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  FiExternalLink, FiGithub, FiArrowLeft,
  FiZap, FiTool, FiCompass, FiLayers,
} from "react-icons/fi";
import { DiReact, DiNodejsSmall } from "react-icons/di";
import { SiFirebase, SiTailwindcss, SiMongodb, SiVercel } from "react-icons/si";
import { useProject } from "../hooks";
import { Spinner, TechBadge, Card } from "../components/ui";

// ── Tech icon map ─────────────────────────────────────────────────────────────
const TECH_ICONS = {
  frontend: <DiReact className="text-blue-400 text-xl" />,
  backend: <DiNodejsSmall className="text-green-500 text-xl" />,
  authentication: <SiFirebase className="text-orange-400 text-xl" />,
  deployment: <SiVercel className="text-gray-700 dark:text-gray-200 text-xl" />,
  styling: <SiTailwindcss className="text-cyan-400 text-xl" />,
  database: <SiMongodb className="text-green-600 text-xl" />,
};

// ── Fade-up variant ───────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: "easeOut" },
});

// ── Section block ─────────────────────────────────────────────────────────────
const Section = ({ icon, title, items }) => (
  <Card className="p-7">
    <div className="flex items-center gap-2 mb-6">
      <span className="text-primary">{icon}</span>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
    </div>
    <ul className="space-y-5">
      {items.map((item, i) => (
        <li key={i} className="pl-4 border-l-2 border-primary/30 space-y-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
        </li>
      ))}
    </ul>
  </Card>
);

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { project, isLoading } = useProject(id);

  if (isLoading) return <Spinner fullPage />;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Project not found.</p>
        <Link to="/projects" className="text-primary text-sm hover:underline">← Back to projects</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen background dark:bg-black dark:bg-none dark:text-white pt-24 pb-20">
      <Helmet>
        <title>{project.name} — Sarafat Karim</title>
      </Helmet>

      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        {/* Back */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div {...fadeUp(0.05)} className="mb-10 space-y-3">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/70">
            {project.status}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            {project.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl leading-relaxed">
            {project.description}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FiExternalLink className="w-4 h-4" /> Live demo
            </a>
            <a
              href={project.frontendCode}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-lg hover:border-primary/40 hover:text-primary transition-all"
            >
              <FiGithub className="w-4 h-4" /> Frontend
            </a>
            {project.backendCode && (
              <a
                href={project.backendCode}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 text-sm font-semibold rounded-lg hover:border-primary/40 hover:text-primary transition-all"
              >
                <FiGithub className="w-4 h-4" /> Backend
              </a>
            )}
          </div>
        </motion.div>

        {/* Hero image */}
        <motion.div {...fadeUp(0.1)} className="mb-12 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/8 shadow-sm">
          <img
            src={project.image}
            alt={project.name}
            className="w-full object-cover"
          />
        </motion.div>

        {/* Tech stack */}
        <motion.div {...fadeUp(0.12)} className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <FiLayers className="text-primary w-4 h-4" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Tech stack</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(project.techStack).map(([category, stack]) => (
              <Card key={category} className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  {TECH_ICONS[category.toLowerCase()] ?? <FiLayers className="text-primary" />}
                  <span className="text-sm font-semibold capitalize text-gray-700 dark:text-gray-200">
                    {category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stack.map((tech) => (
                    <TechBadge key={tech} label={tech} />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Three sections */}
        <motion.div {...fadeUp(0.14)} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Section icon={<FiZap className="w-4 h-4" />} title="Key features" items={project.features} />
          <Section icon={<FiTool className="w-4 h-4" />} title="Challenges" items={project.challenges} />
          <Section icon={<FiCompass className="w-4 h-4" />} title="Future plans" items={project.futurePlans} />
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
