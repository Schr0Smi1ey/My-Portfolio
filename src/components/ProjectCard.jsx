import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";
import { TechBadge } from "./ui";

const ProjectCard = ({ project, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="group grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-zinc-300/70 bg-white/70 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 dark:border-white/[0.08] dark:bg-zinc-900 lg:grid-cols-2"
    >
      <div className="relative overflow-hidden bg-gray-50 dark:bg-zinc-800 aspect-[16/10] lg:aspect-auto">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
          {project.status}
        </span>
      </div>

      <div className="p-7 lg:p-8 flex flex-col justify-between gap-5">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
            {project.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {Object.values(project.techStack)
              .flat()
              .slice(0, 6)
              .map((tech) => (
                <TechBadge key={tech} label={tech} />
              ))}
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-zinc-300/70 pt-2 dark:border-white/[0.05]">
          <button
            onClick={() => navigate(`/projects/${project.id}`)}
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200"
          >
            View details <FiArrowRight className="w-4 h-4" />
          </button>

          <div className="ml-auto flex items-center gap-3">
            {project.frontendCode && (
              <a
                href={project.frontendCode}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Frontend code"
              >
                <FiGithub className="w-4 h-4" />
              </a>
            )}
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
            >
              <FiExternalLink className="w-3.5 h-3.5" /> Live demo
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
