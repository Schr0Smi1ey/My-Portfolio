import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import varsity from "../../assets/Home/edu/khulna-university.jpg";
import college from "../../assets/Home/edu/ibn-taimiya-school-college.jpg";

// Icons
const GraduationCap = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 14l9-5-9-5-9 5 9 5z" strokeWidth={2} />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" strokeWidth={2} />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const educationData = [
  {
    img: varsity,
    institution: "Khulna University",
    degree: "Bachelor's in Computer Science & Engineering",
    years: "2023 - Present",
    gpa: "3.945",
    scale: "4.0",
    progress: (3.945 / 4) * 100,
    achievements: ["Dean's List", "Merit Scholarship"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    img: college,
    institution: "Comilla Ibn Taimiya High School & College",
    degree: "Higher Secondary Certificate (HSC)",
    years: "2019 - 2021",
    gpa: "5.00",
    scale: "5.00",
    progress: 100,
    achievements: ["GPA 5.00", "Science Group"],
    color: "from-purple-500 to-pink-600",
  },
];

const Education = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <section id="education" className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light mode grid */}
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
        
        {/* Dark mode grid */}
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
              📚 Academic Journey
            </span>
          </motion.div>

          {/* Title */}
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            A strong academic foundation that shapes my problem-solving approach
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line - Vertical */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "calc(100% - 100px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-20 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-blue-500 dark:from-primary-400 dark:via-purple-400 dark:to-blue-400"
            style={{ opacity: 0.6 }}
          />

          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } mb-16 md:mb-24 last:mb-0`}
            >
              {/* Timeline Dot with Pulse Effect */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white dark:bg-gray-900 rounded-full border-4 border-primary dark:border-primary-400 shadow-lg flex items-center justify-center">
                    <div className={`w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r ${edu.color} rounded-full`} />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-primary/20 dark:bg-primary-400/20 animate-ping-slow" />
                </div>
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-[calc(50%-40px)] ${
                index % 2 === 0 ? "md:pr-12" : "md:pl-12"
              } pl-16 md:pl-0`}>
                <div className="group relative">
                  {/* Glassmorphism Card */}
                  <div className="relative p-6 md:p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 dark:hover:border-primary-400/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10">
                    
                    {/* Card Header with Image */}
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                      {/* Institution Image */}
                      <div className="md:w-1/3">
                        <div className="relative overflow-hidden rounded-xl aspect-video md:aspect-square">
                          <img
                            src={edu.img}
                            alt={edu.institution}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>

                      {/* Institution Info */}
                      <div className="md:w-2/3 space-y-3">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                          {edu.institution}
                        </h3>
                        <div className="flex items-center gap-2 text-primary dark:text-primary-400">
                          <GraduationCap />
                          <span className="text-lg font-medium">{edu.degree}</span>
                        </div>
                        
                        {/* Year & GPA */}
                        <div className="flex flex-wrap gap-4 pt-2">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <CalendarIcon />
                            <span>{edu.years}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <TrophyIcon />
                            <span>GPA: {edu.gpa} / {edu.scale}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((achievement, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 text-primary dark:text-primary-300 border border-primary/20 dark:border-primary/30"
                          >
                            🏆 {achievement}
                          </span>
                        ))}
                      </div>

                      {/* Progress Bar with Label */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Academic Performance</span>
                          <span className="font-semibold text-primary dark:text-primary-400">
                            {edu.progress.toFixed(1)}%
                          </span>
                        </div>
                        <div className="relative h-3 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${edu.progress}%` }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                            className={`absolute h-full rounded-full bg-gradient-to-r ${edu.color}`}
                          >
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Gradient Border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-purple-500/0 group-hover:from-primary/10 group-hover:via-transparent group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Empty column for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>

        {/* Additional Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                3.94
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Current CGPA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                2
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Degrees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                5+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                2023
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Started University</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />

      <style>{`
        @keyframes ping-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          50%, 100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default Education;