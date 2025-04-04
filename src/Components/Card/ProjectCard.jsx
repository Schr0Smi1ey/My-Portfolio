import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <div
      data-aos="flip-right"
      className="flex flex-col lg:flex-row justify-between items-center gap-6 dark:border-[1px] dark:border-white/40 shadow-xl transition-all rounded-lg overflow-hidden p-3 py-5 md:p-6"
    >
      {/* Project Image */}
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        className="w-full lg:w-[40%]"
      >
        <img
          src={project.image}
          alt={project.name}
          className="w-full object-cover rounded-md shadow-md hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Project Info */}
      <div
        data-aos="fade-left"
        data-aos-delay="400"
        className="w-full lg:w-2/3"
      >
        <h2 className="text-xl md:text-2xl font-semibold">{project.name}</h2>
        <p className="text-gray-600 text-sm md:text-base dark:text-gray-400 mt-2 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.values(project.techStack)
            .flat()
            .map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-primary/20 text-primary rounded-full"
              >
                {tech}
              </span>
            ))}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          {/* View Details Button */}
          <button
            onClick={() => navigate(`/project-details/${project.id}`)}
            className="px-4 py-1 md:py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 hover:scale-105 transition-transform duration-300"
          >
            View Details
          </button>

          {/* Live Demo Button */}
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-primary hover:underline hover:scale-105 transition-transform duration-300"
          >
            <FaExternalLinkAlt />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
