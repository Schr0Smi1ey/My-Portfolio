import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import ProjectCard from "../../../Card/ProjectCard";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);

  // Fetch projects data from JSON file
  useEffect(() => {
    fetch("/Data/Projects.json")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <section id="projects" className="p-4 py-6 md:p-8 my-10 md:my-14 shadow-xl">
      <div className="container mx-auto px-3 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center"
          data-aos="fade-up"
        >
          🌟 Featured Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12"
          data-aos="fade-up"
        >
          A glimpse into my most exciting & impactful creations ✨💡
        </motion.p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project}></ProjectCard>
          ))}
        </div>
        <div className="w-fit mx-auto mt-14 hover:scale-105 transition-transform duration-300">
          <Link
            to={"/projects"}
            className="bg-primary text-white px-6 py-3 font-semibold rounded-lg shadow-lg"
          >
            View More Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
