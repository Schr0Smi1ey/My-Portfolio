import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaTerminal,
} from "react-icons/fa";
import { img } from "framer-motion/m";

const Skills = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "C", level: 90, color: "text-blue-600" },
        { name: "C++", level: 85, color: "text-blue-700" },
        { name: "Python", level: 80, color: "text-yellow-600" },
      ],
    },
    {
      title: "Frontend Development",
      skills: [
        {
          name: "HTML5",
          level: 95,
          icon: <FaHtml5 className="text-orange-500 text-3xl" />,
        },
        {
          name: "CSS3",
          level: 90,
          icon: <FaCss3Alt className="text-blue-500 text-3xl" />,
        },
        {
          name: "Tailwind CSS",
          level: 85,
          icon: (
            <img
              src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
              alt="Tailwind CSS"
              className="w-8 h-8"
            />
          ),
        },
        {
          name: "JavaScript",
          level: 85,
          icon: <FaJs className="text-yellow-500 text-3xl" />,
        },
        {
          name: "React.js",
          level: 80,
          icon: <FaReact className="text-blue-400 text-3xl" />,
        },
      ],
    },
    {
      title: "Backend & Databases",
      skills: [
        {
          name: "Node.js",
          level: 75,
          icon: <FaNodeJs className="text-green-500 text-3xl" />,
        },
        {
          name: "MongoDB",
          level: 70,
          icon: <FaDatabase className="text-green-700 text-3xl" />,
        },
        {
          name: "MySQL",
          level: 70,
          icon: <FaDatabase className="text-blue-700 text-3xl" />,
        },
        {
          name: "Express.js",
          level: 75,
          icon: (
            <img
              src="https://ajeetchaulagain.com/static/7cb4af597964b0911fe71cb2f8148d64/87351/express-js.png"
              className="w-9 h-9"
            ></img>
          ),
        },
      ],
    },
    {
      title: "Tools & Version Control",
      skills: [
        {
          name: "Git",
          level: 85,
          icon: <FaGitAlt className="text-orange-600 text-3xl" />,
        },
        {
          name: "GitHub",
          level: 90,
          icon: <FaGithub className="text-black text-3xl" />,
        },
        {
          name: "Terminal",
          level: 80,
          icon: <FaTerminal className="text-gray-500 text-3xl" />,
        },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
          data-aos="fade-up"
        >
          Skills
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              data-aos="fade-up"
            >
              <h3 className="text-2xl font-semibold text-primary mb-6">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex items-center gap-4">
                      {skill.icon && skill.icon}
                      <span className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                        {skill.name}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1 }}
                        className="h-2.5 rounded-full bg-gradient-to-r from-primary to-black"
                      />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Proficiency: {skill.level}%
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
