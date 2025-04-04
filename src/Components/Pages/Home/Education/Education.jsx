import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import varsity from "../../../../assets/Home/edu/khulna-university.jpg";
import college from "../../../../assets/Home/edu/ibn-taimiya-school-college.jpg";

const educationData = [
  {
    img: varsity,
    institution: "Khulna University",
    degree: "Bachelor’s in Computer Science & Engineering",
    years: "2023 - Present",
    gpa: "3.945 / 4.0",
    progress: (3.945 / 4) * 100,
  },
  {
    img: college,
    institution: "Comilla Ibn Taimiya High School & College",
    degree: "Higher Secondary Certificate (HSC)",
    years: "2019 - 2021",
    gpa: "5.00 / 5.00",
    progress: 100,
  },
];

const Education = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <section
      id="education"
      className="p-3 py-6 lg:p-6 my-10 md:my-14 shadow-lg"
    >
      <div className="container mx-auto lg:px-14">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16"
        >
          🎓 Educational Qualification
        </h2>

        <div className="relative pl-8 space-y-12">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1 }}
            className="absolute left-0  top-0 w-2 bg-gradient-to-b from-primary to-black dark:to-white/70"
          />
          {educationData.map((edu, index) => (
            <div key={index} data-aos-delay={index * 200} className="relative">
              <div className="absolute w-4 h-4 md:w-6 md:h-6 bg-primary rounded-full -left-3.5 top-2 flex items-center justify-center" />
              <div className="p-2 pl-5 md:p-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 md:gap-5">
                <div className="md:w-[50%]">
                  <img
                    src={edu.img}
                    alt={edu.institution}
                    className="flex rounded-xl"
                  />
                </div>
                <div className="w-full dark:bg-black px-2 md:px-4 py-2 dark:text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3
                    data-aos="fade-up"
                    className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    {edu.institution}
                  </h3>
                  <p
                    data-aos="fade-up"
                    className="text-base md:text-lg text-gray-600 dark:text-gray-200 mb-2"
                  >
                    {edu.degree}
                  </p>
                  <p
                    data-aos="fade-up"
                    className="text-sm text-gray-500 dark:text-gray-300 mb-4"
                  >
                    {edu.years}
                  </p>
                  <div data-aos="fade-up" className="space-y-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      GPA: {edu.gpa}
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${edu.progress}%` }}
                        transition={{ duration: 1 }}
                        className="h-2.5 rounded-full bg-gradient-to-r from-primary to-black dark:to-white/70"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
