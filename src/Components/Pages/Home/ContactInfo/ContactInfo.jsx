import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";

const ContactInfo = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <section id="contact" className="p-4 py-6 md:p-8 my-8 md:my-10 shadow-lg">
      <div className="container mx-auto  px-6 md:px-12 lg:px-24">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-12"
          data-aos="fade-up"
        >
          ✨ Get in Touch
        </motion.h2>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 group"
            data-aos="fade-up"
          >
            {/* Floating Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>

            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 bg-primary/90 text-white rounded-xl shadow-lg mx-auto mb-6">
              <FaEnvelope className="text-3xl" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Email
            </h3>

            {/* Email Link */}
            <a
              href="mailto:radiantremel444@gmail.com"
              className="block text-lg text-center text-gray-600 dark:text-gray-400 hover:text-primary font-medium transition duration-300"
            >
              radiantremel444@gmail.com
            </a>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 group"
            data-aos="fade-up"
          >
            {/* Floating Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>

            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-xl shadow-lg mx-auto mb-6">
              <FaPhone className="text-3xl" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Phone
            </h3>

            {/* Phone Number */}
            <a
              href="tel:01719430433"
              className="block text-lg text-center text-gray-600 dark:text-gray-400 hover:text-green-500 font-medium transition duration-300"
            >
              +880 1719-430433
            </a>
          </motion.div>

          {/* WhatsApp Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 group"
            data-aos="fade-up"
          >
            {/* Floating Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>

            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-xl shadow-lg mx-auto mb-6">
              <FaWhatsapp className="text-3xl" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              WhatsApp
            </h3>

            {/* WhatsApp Link */}
            <a
              href="https://wa.me/8801719430433"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg text-center text-gray-600 dark:text-gray-400 hover:text-blue-500 font-medium transition duration-300"
            >
              +880 1719-430433
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
