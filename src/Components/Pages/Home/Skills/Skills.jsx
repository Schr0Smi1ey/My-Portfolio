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
import c from "../../../../assets/Home/Skills/C.png";
import cpp from "../../../../assets/Home/Skills/C++.png";
import python from "../../../../assets/Home/Skills/python.png";

const Skills = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const skillCategories = [
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
        {
          name: "Firebase",
          level: 70,
          icon: (
            <img
              src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg"
              alt="Firebase"
              className="w-8 h-8"
            />
          ),
        },
      ],
    },
    {
      title: "Languages",
      skills: [
        {
          name: "C",
          level: 90,
          icon: <img src={c} className="w-7 h-7" alt="C" />,
        },
        {
          name: "C++",
          level: 85,
          icon: <img src={cpp} className="w-7 h-7" alt="C++" />,
        },
        {
          name: "Python",
          level: 80,
          icon: <img src={python} className="w-7 h-7" alt="Python" />,
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
    <section
      id="skills"
      className="p-4 py-6 md:p-8 my-10 md:my-14 shadow-lg dark:text-white"
    >
      <div className="container mx-auto md:px-3 lg:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white text-center"
          data-aos="fade-up"
        >
          🛠️ Skills & Expertise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12"
          data-aos="fade-up"
        >
          Turning ideas into reality, one line of code at a time 💻✨
        </motion.p>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3
                data-aos="fade-up"
                className="text-2xl font-semibold text-primary mb-6"
              >
                {category.title}
              </h3>
              <div className="space-y-6 dark:border-[1px] dark:border-white/40 rounded-xl">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="space-y-2 shadow-md p-4 rounded-lg"
                  >
                    <div data-aos="fade-up" className="flex items-center gap-4">
                      {skill.icon && skill.icon}
                      <span className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                        {skill.name}
                      </span>
                    </div>
                    <div
                      data-aos="fade-up"
                      className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1 }}
                        className="h-2.5 rounded-full bg-gradient-to-r from-primary to-black dark:to-white/70"
                      />
                    </div>
                    <p
                      data-aos="fade-up"
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
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
