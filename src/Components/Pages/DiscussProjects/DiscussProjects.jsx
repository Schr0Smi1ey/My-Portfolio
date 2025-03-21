import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoMail } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { Helmet } from "react-helmet";
import UseCustomAxios from "../../../Hooks/UseCustomAxios";

const DiscussProjects = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
    window.scrollTo(0, 0);
  }, []);
  const CustomAxios = UseCustomAxios();
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const form = document.forms[0];
    const formData = {
      name: form.name.value,
      email: form.email.value,
      projectDetails: form.projectDetails.value,
      date: new Date().toISOString(),
    };
    const res = await CustomAxios.post("/messages", formData);
    if (res.status === 200) {
      form.reset();
      alert("Message sent successfully");
    } else {
      alert("Message not sent. Please try again later.");
    }
  };
  return (
    <div className="overflow-hidden min-h-screen flex items-center justify-center background px-6 lg:px-24 py-20">
      <section className="container mx-auto">
        <Helmet>
          <title>Schr0Smi1ey | Discuss Projects</title>
        </Helmet>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 70 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white"
            data-aos="fade-up"
          >
            Let's Discuss Your Next Project!
          </h1>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 mt-4"
            data-aos="fade-up"
          >
            Have an idea? Need a developer? Let’s collaborate and bring your
            vision to life.
          </p>

          {/* Contact Options */}
          <div className="mt-8 flex flex-row items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:radiantremel444@gmail.com"
              className="px-3 py-1 flex items-center bg-primary text-white text-lg font-medium rounded-lg shadow-md hover:bg-primary/90 transition"
              data-aos="fade-up"
            >
              <IoMail className="inline-block text-xl mr-2" />
              Email Me
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/sarafat-karim"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 flex items-center border-2 border-primary text-primary text-lg font-medium rounded-lg shadow-md hover:bg-primary hover:text-white transition"
              data-aos="fade-up"
            >
              <FaLinkedin className="inline-block text-xl mr-2"></FaLinkedin>
              LinkedIn
            </motion.a>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 sm:p-10 md:p-12 rounded-lg shadow-lg my-12 text-left max-w-4xl mx-auto"
          >
            <form className="space-y-6" onSubmit={handleSendMessage}>
              {/* Name Input */}
              <div data-aos="fade-right">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Email Input */}
              <div data-aos="fade-left">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Project Details Textarea */}
              <div data-aos="fade-up">
                <label
                  htmlFor="projectDetails"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Details
                </label>
                <textarea
                  name="projectDetails"
                  rows="4"
                  placeholder="Tell me about your project..."
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  data-aos="fade-up"
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default DiscussProjects;
