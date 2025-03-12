import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  // Fetch project details based on ID
  useEffect(() => {
    fetch("/Data/Projects.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedProject = data.find((proj) => proj.id === parseInt(id));
        setProject(selectedProject);
      })
      .catch((error) =>
        console.error("Error fetching project details:", error)
      );
  }, [id]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (!project) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          data-aos="fade-up"
        >
          {/* Project Image */}
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          {/* Project Name */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {project.name}
          </h1>

          {/* Project Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Challenges
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {project.challenges}
            </p>
          </div>

          {/* Future Plans */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Future Plans
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {project.futurePlans}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition duration-300"
            >
              Live Project
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
            >
              GitHub
            </a>
          </div>
        </motion.div>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Projects
        </button>
      </div>
    </section>
  );
};

export default ProjectDetails;
