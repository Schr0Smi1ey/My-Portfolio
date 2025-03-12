/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import profile from "../../../../assets/Home/Profile/profile.jpg";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 transition-all duration-500">
      <div className="w-full md:w-1/2 text-left space-y-6">
        <motion.h1
          data-aos="fade-right"
          className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
        >
          Hi, I'm <span className="text-primary">Sarafat Karim</span>
        </motion.h1>

        <motion.p
          data-aos="fade-right"
          data-aos-delay="200"
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300"
        >
          Junior Full-Stack Developer
        </motion.p>

        <motion.div
          data-aos="fade-up"
          data-aos-delay="600"
          className="flex space-x-4"
        >
          <a
            download
            className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 hover:bg-primary/90 hover:scale-105"
          >
            Download Resume
          </a>
          <a className="border-2 border-primary text-primary px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 hover:bg-primary hover:text-white hover:scale-105">
            Contact Me
          </a>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <img
            src={profile}
            alt="Sarafat Karim"
            className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-full border-4 border-white shadow-2xl transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
