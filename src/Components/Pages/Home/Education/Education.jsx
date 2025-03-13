/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
const Education = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <section id="education" className="p-4 py-6 md:p-8 my-8 md:my-10 shadow-lg">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Title */}
        <h2
          data-aos="fade-up"
          className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16"
        >
          Educational Qualification
        </h2>

        {/* Education Timeline */}
        <div className="relative pl-8 space-y-12">
          {/* University */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5 }}
            className="absolute left-0 top-0 w-2 bg-gradient-to-b from-primary to-black"
          />

          <div data-aos="fade-up" className="relative">
            {/* Timeline Dot */}
            <div className="absolute w-6 h-6 bg-primary rounded-full -left-3.5 top-2 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Khulna University
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                Bachelor’s in Computer Science & Engineering
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                2023 - 2027
              </p>

              {/* Progress Bar */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Current CGPA: 3.945/4.0
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(3.945 / 4) * 100}%` }}
                    transition={{ duration: 1 }}
                    className="h-2.5 rounded-full bg-gradient-to-r from-primary to-black"
                  />
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay="500" className="relative">
            {/* Timeline Dot */}
            <div className="absolute w-6 h-6 bg-primary rounded-full -left-3.5 top-2 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Comilla Ibn Taimiya High School & College
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                Higher Secondary Certificate (HSC)
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                2019 - 2021
              </p>

              {/* Progress Bar */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  GPA: 5.00/5.00
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${100}%` }}
                    transition={{ duration: 1 }}
                    className="h-2.5 rounded-full bg-gradient-to-r from-primary to-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
