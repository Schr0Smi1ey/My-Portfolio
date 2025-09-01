import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ProjectCard from "../../Card/ProjectCard";
import { Helmet } from "react-helmet";
import { PuffLoader } from "react-spinners";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/Data/Projects.json")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 500 });
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen py-32 px-6 md:px-8 background overflow-hidden dark:bg-black dark:bg-none dark:text-white">
      <Helmet>
        <title>Schr0Smi1ey | Projects</title>
      </Helmet>
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center text-gray-900 dark:text-white mb-12">
          <h1 data-aos="fade-right" className="text-4xl font-bold mb-4">
            My Projects
          </h1>
          <p
            data-aos="fade-left"
            className="text-lg text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto"
          >
            A collection of my best work, showcasing my skills in full-stack
            development, problem-solving, and user experience.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen">
            <PuffLoader color="#198068" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 max-w-7xl mx-auto gap-6">
            {projects.map((project, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 100}
                key={project.id}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
