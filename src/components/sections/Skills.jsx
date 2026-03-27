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
  FaCode,
  FaWrench,
  FaServer,
  FaPaintBrush,
} from "react-icons/fa";
import { 
  SiTailwindcss, 
  SiExpress, 
  SiFirebase, 
  SiMongodb, 
  SiMysql,
  SiCplusplus,
  SiC,
  SiPython 
} from "react-icons/si";
import c from "../../assets/Home/Skills/C.png";
import cpp from "../../assets/Home/Skills/C++.png";
import python from "../../assets/Home/Skills/python.png";

const Skills = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <FaPaintBrush className="w-6 h-6 text-black"/>,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      skills: [
        {
          name: "HTML5",
          level: 95,
          icon: <FaHtml5 className="text-orange-500 text-2xl" />,
        },
        {
          name: "CSS3",
          level: 90,
          icon: <FaCss3Alt className="text-blue-500 text-2xl" />,
        },
        {
          name: "Tailwind CSS",
          level: 85,
          icon: <SiTailwindcss className="text-cyan-500 text-2xl" />,
        },
        {
          name: "JavaScript",
          level: 85,
          icon: <FaJs className="text-yellow-500 text-2xl" />,
        },
        {
          name: "React.js",
          level: 80,
          icon: <FaReact className="text-blue-400 text-2xl" />,
        },
      ],
    },
    {
      title: "Backend & Databases",
      icon: <FaServer className="w-6 h-6 text-black"/>,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      skills: [
        {
          name: "Node.js",
          level: 75,
          icon: <FaNodeJs className="text-green-500 text-2xl" />,
        },
        {
          name: "MongoDB",
          level: 70,
          icon: <SiMongodb className="text-green-700 text-2xl" />,
        },
        {
          name: "MySQL",
          level: 70,
          icon: <SiMysql className="text-blue-700 text-2xl" />,
        },
        {
          name: "Express.js",
          level: 75,
          icon: <SiExpress className="text-gray-600 dark:text-gray-400 text-2xl" />,
        },
        {
          name: "Firebase",
          level: 70,
          icon: <SiFirebase className="text-yellow-600 text-2xl" />,
        },
      ],
    },
    {
      title: "Languages",
      icon: <FaCode className="w-6 h-6 text-black"/>,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      skills: [
        {
          name: "C",
          level: 90,
          icon: <img src={c} className="w-6 h-6" alt="C" />,
        },
        {
          name: "C++",
          level: 85,
          icon: <img src={cpp} className="w-6 h-6" alt="C++" />,
        },
        {
          name: "Python",
          level: 80,
          icon: <img src={python} className="w-6 h-6" alt="Python" />,
        },
      ],
    },
    {
      title: "Tools & Version Control",
      icon: <FaWrench className="w-6 h-6 text-black"/>,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      skills: [
        {
          name: "Git",
          level: 85,
          icon: <FaGitAlt className="text-orange-600 text-2xl" />,
        },
        {
          name: "GitHub",
          level: 90,
          icon: <FaGithub className="text-gray-900 dark:text-white text-2xl" />,
        },
        {
          name: "Terminal",
          level: 80,
          icon: <FaTerminal className="text-gray-500 dark:text-gray-400 text-2xl" />,
        },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, #94a3b815 1px, transparent 1px),
              linear-gradient(to bottom, #94a3b815 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div 
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(96, 165, 250, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(96, 165, 250, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, rgba(96, 165, 250, 0.15) 1.5px, transparent 1.5px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      </div>

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
              🚀 Technical Arsenal
            </span>
          </motion.div>

          {/* Title */}
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Turning ideas into reality, one line of code at a time 💻✨
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              {/* Card Background with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-transparent dark:from-white/5 rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-500" />
              
              {/* Main Card */}
              <div className="relative p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 dark:hover:border-primary-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 dark:hover:shadow-primary/10">
                
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  {/* Icon Container */}
                  <div className={`p-4 rounded-2xl ${category.bgColor} border ${category.borderColor}`}>
                    <div className={`text-2xl bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                      {category.icon}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {category.skills.length} technologies
                    </p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="group/skill"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {/* Skill Icon */}
                          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                            {skill.icon}
                          </div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Progress Bar Container */}
                      <div className="relative h-2.5 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden">
                        {/* Background Pattern */}
                        <div 
                          className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0,0,0,0.1) 6px, rgba(0,0,0,0.1) 12px)`,
                          }}
                        />
                        
                        {/* Animated Progress Bar */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                          className={`relative h-full rounded-full bg-gradient-to-r ${category.color}`}
                        >
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-10" />
                
                {/* Stats Footer */}
                <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Average Proficiency
                    </span>
                    <span className="font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      {Math.round(category.skills.reduce((acc, curr) => acc + curr.level, 0) / category.skills.length)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Glow Effect on Hover */}
              <div className={`absolute inset-0 -z-10 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-700 rounded-3xl`} />
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-primary/10 dark:bg-primary/20">
                <FaCode className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  Continuous Learning
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Always exploring new technologies and best practices
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                TypeScript
              </span>
              <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-sm font-medium">
                Next.js
              </span>
              <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-sm font-medium">
                Docker
              </span>
              <span className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-sm font-medium">
                AWS
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />

      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          50%, 100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;