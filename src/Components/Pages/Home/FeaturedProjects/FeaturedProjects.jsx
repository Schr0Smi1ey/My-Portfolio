import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import ProjectCard from "../../../Card/ProjectCard";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

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

  // Navigate to project details page
  const navigateToProjectDetails = (id) => {
    navigate(`/project-details/${id}`);
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
          data-aos="fade-up"
        >
          Projects
        </motion.h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project) => (
            // <motion.div
            //   key={project.id}
            //   initial={{ opacity: 0, y: 50 }}
            //   whileInView={{ opacity: 1, y: 0 }}
            //   transition={{ duration: 1 }}
            //   className="bg-white flex flex-col dark:bg-gray-800 p-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            //   data-aos="fade-up"
            // >
            //   {/* Project Image */}
            //   <img
            //     src={project.image}
            //     alt={project.name}
            //     className="w-full h-48 object-cover rounded-lg mb-4"
            //   />

            //   {/* Project Name */}
            //   <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            //     {project.name}
            //   </h3>

            //   {/* Project Description */}
            //   <p className="text-gray-600 flex-1 dark:text-gray-400 mb-4">
            //     {project.description}
            //   </p>

            //   {/* View More Button */}
            //   <button
            //     onClick={() => navigateToProjectDetails(project.id)}
            //     className="w-full bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition duration-300"
            //   >
            //     View More
            //   </button>
            // </motion.div>
            <ProjectCard key={project.id} project={project}></ProjectCard>
          ))}
        </div>
        <div className="w-fit mx-auto mt-10 hover:scale-105 transition-transform duration-300">
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
