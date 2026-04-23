import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaRocket,
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";
import ProjectCard from "../ProjectCard";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects data from JSON file
  useEffect(() => {
    fetch("/Data/Projects.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.slice(0, 3)); // Only show top 3 featured projects
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section
      id="projects"
      className="relative py-16 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, #94a3b815 1px, transparent 1px),
              linear-gradient(to bottom, #94a3b815 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(96, 165, 250, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(96, 165, 250, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, rgba(96, 165, 250, 0.15) 1.5px, transparent 1.5px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-40 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-300 border border-primary/20 dark:border-primary/30 backdrop-blur-sm">
              🚀 Featured Work
            </span>
          </motion.div>

          {/* Title */}
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          {/* Description */}
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            A glimpse into my most exciting & impactful creations ✨💡
          </p>

          {/* Stats/Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{projects.length} Featured Projects</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaRocket className="text-primary" />
              <span>MERN Stack</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaGithub className="text-gray-700 dark:text-gray-300" />
              <span>Open Source</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="rounded-3xl bg-gray-200 dark:bg-gray-800 h-96" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1  gap-8 lg:gap-10"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="relative mt-20 text-center"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-full blur-3xl opacity-50" />

          {/* Button */}
          <Link
            to="/projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
          >
            <span className="text-lg">View All Projects</span>
            <FaArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" />

            {/* Button Shine Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </Link>

          {/* Decorative Elements */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-full blur-sm" />
        </motion.div>

        {/* Achievement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-primary/10 dark:bg-primary/20">
                <FaRocket className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  Have a project in mind?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Let's collaborate and bring your ideas to life
                </p>
              </div>
            </div>
            <Link
              to="/Discuss"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProjects;
