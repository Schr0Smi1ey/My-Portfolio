/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from "react-icons/fa";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

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

  useEffect(() => {
    AOS.init({ duration: 500});
  }, []);

  if (!project) {
    return (
      <div className="text-center py-20 text-2xl text-gray-600">Loading...</div>
    );
  }

  return (
    <section className="min-h-screen py-16 px-6 md:px-12 lg:px-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 mb-6 text-primary hover:underline"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {project.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3">
            {project.description}
          </p>
        </motion.div>

        {/* Project Image */}
        <motion.div data-aos="zoom-in" className="flex justify-center mb-12">
          <img
            src={project.image}
            alt={project.name}
            className="w-full md:w-3/4 lg:w-2/3 rounded-lg shadow-xl border-4 border-primary"
          />
        </motion.div>

        {/* Tech Stack */}
        <motion.div data-aos="fade-up" className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(project.techStack).map(([category, stack]) => (
              <div
                key={category}
                className="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
              >
                <h3 className="text-xl font-semibold text-primary">
                  {category}
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 mt-2">
                  {stack.map((tech, index) => (
                    <li key={index} className="text-sm">
                      • {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div data-aos="fade-up" className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            {project.features.map((feature, index) => (
              <li
                key={index}
                className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg"
              >
                <h3 className="text-xl font-semibold text-primary">
                  {feature.title}
                </h3>
                <p className="text-md">{feature.description}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Challenges */}
        <motion.div data-aos="fade-up" className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Challenges
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            {project.challenges.map((challenge, index) => (
              <li
                key={index}
                className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg"
              >
                <h3 className="text-xl font-semibold text-primary">
                  {challenge.title}
                </h3>
                <p className="text-md">{challenge.description}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Future Plans */}
        <motion.div data-aos="fade-up" className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Future Plans
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            {project.futurePlans.map((plan, index) => (
              <li
                key={index}
                className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg"
              >
                <h3 className="text-xl font-semibold text-primary">
                  {plan.title}
                </h3>
                <p className="text-md">{plan.description}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Links */}
        <motion.div
          data-aos="fade-up"
          className="flex flex-wrap justify-center gap-6"
        >
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-primary/90 transition"
          >
            <FaExternalLinkAlt />
            <span>Live Project</span>
          </a>
          <a
            href={project.frontendCode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg transition"
          >
            <FaGithub />
            <span>Frontend Code</span>
          </a>
          <a
            href={project.backendCode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg transition"
          >
            <FaGithub />
            <span>Backend Code</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetails;
