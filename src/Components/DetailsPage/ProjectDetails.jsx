/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaCode,
  FaPalette,
  FaTools,
  FaRocket,
} from "react-icons/fa";
import { DiReact, DiNodejsSmall } from "react-icons/di";
import { SiFirebase, SiTailwindcss } from "react-icons/si";
import { Helmet } from "react-helmet";

const ProjectDetails = () => {
  const { id } = useParams();
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
    AOS.init({ duration: 500 });
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="text-center py-32 text-2xl text-gray-600">Loading...</div>
    );
  }

  const categoryIcons = {
    frontend: <DiReact className="text-3xl mr-2 text-blue-500" />,
    backend: <DiNodejsSmall className="text-3xl mr-2 text-green-500" />,
    authentication: <SiFirebase className="text-3xl mr-2 text-orange-500" />,
    utilities: <FaTools className="text-3xl mr-2 text-purple-500" />,
    deployment: <FaRocket className="text-3xl mr-2 text-red-500" />,
    styling: <SiTailwindcss className="text-3xl mr-2 text-cyan-500" />,
  };

  return (
    <section className="min-h-screen background py-32 dark:bg-black dark:bg-none dark:text-white overflow-hidden">
      <Helmet>
        <title>Schr0Smi1ey | Project Details | {id}</title>
      </Helmet>
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <FaRocket className="text-5xl text-primary animate-bounce" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text">
            {project.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            {project.description}
          </p>
        </motion.div>

        {/* Project Image */}
        <motion.div data-aos="zoom-in" className="flex justify-center mb-16">
          <motion.img
            src={project.image}
            alt={project.name}
            className="w-full md:w-3/4 lg:w-1/2 rounded-2xl shadow-2xl border-2 border-primary dark:border-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        {/* Tech Stack */}
        <motion.div data-aos="fade-up" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center flex items-center justify-center">
            <FaCode className="mr-3 text-primary" />
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(project.techStack).map(([category, stack]) => (
              <motion.div
                key={category}
                whileHover={{ y: -5 }}
                className="p-4 md:p-6 bg-white dark:bg-black dark:border-[1px] dark:border-white/40 shadow-xl rounded-xl hover:shadow-2xl transition-all"
              >
                <div className="flex items-center mb-4">
                  {categoryIcons[category.toLowerCase()]}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                    {category}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {stack.map((tech, index) => (
                    <li
                      key={index}
                      className="flex items-center ml-4 text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Challenges & Future Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Features */}
          <motion.div
            data-aos="fade-right"
            className="bg-white dark:bg-black dark:border-[1px] dark:border-white/40 p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <FaPalette className="mr-3 text-primary" />
              Key Features
            </h2>
            <div className="space-y-6">
              {project.features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="pl-4 border-l-4 border-primary"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Challenges */}
          <motion.div
            data-aos="fade-right"
            className="bg-white dark:bg-black dark:border-[1px] dark:border-white/40 p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaTools className="mr-3 text-primary" />
              Challenges
            </h2>
            <div className="space-y-6">
              {project.challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="pl-4 border-l-4 border-primary"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {challenge.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Future Plans */}
          <motion.div
            data-aos="fade-left"
            className="bg-white dark:bg-black dark:border-[1px] dark:border-white/40 p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaRocket className="mr-3 text-primary" />
              Future Plans
            </h2>
            <div className="space-y-6">
              {project.futurePlans.map((plan, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="pl-4 border-l-4 border-primary"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {plan.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {plan.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          data-aos="zoom-in"
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <FaExternalLinkAlt />
            <span>Live Demo</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.frontendCode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <FaGithub className="flex items-center text-xl" />
            <span>Frontend Code</span>
          </motion.a>

          {project.backendCode && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.backendCode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <FaGithub className="flex items-center text-xl" />
              <span>Backend Code</span>
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetails;
