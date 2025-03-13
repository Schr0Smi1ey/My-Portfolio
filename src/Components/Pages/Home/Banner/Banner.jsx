/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import profile from "../../../../assets/Home/Profile/profile.jpg";
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Banner = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-8 p-4 py-8 md:py-14 mb-5 mb-10 md:mb-14 transition-all duration-500">
      <div className="text-center md:text-left space-y-6">
        <motion.h1
          data-aos="fade-right"
          className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
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
        <div className="mt-6 flex justify-center md:justify-start space-x-4">
          <a
            href="https://www.facebook.com/share/19zK3X1Ro6/"
            target="_blank"
            rel="noopener noreferrer"
            data-aos="zoom-in"
          >
            <FaFacebook className="text-3xl hover:text-primary transition-all" />
          </a>
          <a
            href="https://www.linkedin.com/in/sarafat-karim"
            target="_blank"
            rel="noopener noreferrer"
            data-aos="zoom-in"
          >
            <FaLinkedin className="text-3xl hover:text-primary transition-all" />
          </a>
          <a
            href="https://github.com/Schr0Smi1ey"
            target="_blank"
            rel="noopener noreferrer"
            data-aos="zoom-in"
          >
            <FaGithub className="text-3xl hover:text-primary transition" />
          </a>
          <a
            href="https://twitter.com/sarafat_karim"
            target="_blank"
            rel="noopener noreferrer"
            data-aos="zoom-in"
          >
            <FaXTwitter className="text-3xl hover:text-primary transition" />
          </a>
        </div>
        <motion.div
          data-aos="fade-up"
          data-aos-delay="600"
          className="flex justify-center md:justify-start space-x-4"
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
            className="w-[80%] mx-auto object-cover rounded-full border-4 border-white shadow-2xl transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
