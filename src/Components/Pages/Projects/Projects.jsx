import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ProjectCard from "../../Card/ProjectCard";

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
    <section className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            data-aos="fade-right"
            className="text-4xl font-bold text-gray-900 dark:text-white"
          >
            My Projects
          </h1>
          <p
            data-aos="fade-left"
            className="text-lg text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto"
          >
            A collection of my best work, showcasing my skills in full-stack
            development, problem-solving, and user experience.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <p
            data-aos="fade-up"
            className="text-center text-lg text-gray-600 dark:text-gray-300"
          >
            Loading projects...
          </p>
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
