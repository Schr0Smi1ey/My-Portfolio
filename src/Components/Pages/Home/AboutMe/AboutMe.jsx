import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center">
        <div data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Hey there! I’m{" "}
            <span className="text-primary font-semibold">Sarafat Karim</span>, a
            passionate Junior Full-Stack Developer with a knack for
            problem-solving and web development. Currently pursuing my B.Sc. in
            Computer Science and Engineering at Khulna University.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            I specialize in creating responsive and interactive web applications
            using the MERN Stack. Beyond coding, I love engaging in competitive
            programming, tackling challenging coding problems, and continuously
            expanding my skill set.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            When I’m not coding, you’ll probably find me playing cricket, my
            favorite sport! I also enjoy football, online games, and exploring
            new tech trends.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
