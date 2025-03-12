import React from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";

const ContactInfo = () => {
  // Initialize AOS
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
          data-aos="fade-up"
        >
          Contact Information
        </motion.h2>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-6">
              <FaEnvelope className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Email
            </h3>
            <a
              href="mailto:radiantremel444@gmail.com"
              className="text-gray-600 dark:text-gray-400 text-lg text-center block hover:text-primary transition duration-300"
            >
              radiantremel444@gmail.com
            </a>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-6">
              <FaPhone className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Phone
            </h3>
            <a
              href="tel:01719430433"
              className="text-gray-600 dark:text-gray-400 text-lg text-center block hover:text-primary transition duration-300"
            >
              +880 1719-430433
            </a>
          </motion.div>

          {/* WhatsApp Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-6">
              <FaWhatsapp className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              WhatsApp
            </h3>
            <a
              href="https://wa.me/8801719430433"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 text-lg text-center block hover:text-primary transition duration-300"
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
