import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutMe = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <section id="about" className="p-4 py-6 md:p-8 my-10 md:my-14 shadow-lg">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
        <div>
          <h2
            data-aos="fade-up"
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About Me
          </h2>
          <p
            data-aos="fade-up"
            className="text-lg text-gray-700 dark:text-gray-300 mb-4"
          >
            Hey there! I’m{" "}
            <span className="text-primary font-semibold">Sarafat Karim</span>, a
            passionate Junior Full-Stack Developer with a knack for
            problem-solving and web development. Currently pursuing my B.Sc. in
            Computer Science and Engineering at Khulna University.
          </p>
          <p
            data-aos="fade-up"
            className="text-lg text-gray-600 dark:text-gray-400 mb-4"
          >
            I specialize in creating responsive and interactive web applications
            using the MERN Stack. Beyond coding, I love engaging in competitive
            programming, tackling challenging coding problems, and continuously
            expanding my skill set.
          </p>
          <p
            data-aos="fade-up"
            className="text-lg text-gray-600 dark:text-gray-400 mb-4"
          >
            When I’m not coding, you’ll probably find me playing cricket, my
            favorite sport! I also enjoy football, online games, and exploring
            new tech trends.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
