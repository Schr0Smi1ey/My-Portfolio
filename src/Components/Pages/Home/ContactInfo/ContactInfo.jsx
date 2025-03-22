import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
const contactDetails = [
  {
    id: 1,
    title: "Email",
    value: "radiantremel444@gmail.com",
    href: "mailto:radiantremel444@gmail.com",
    bgColor: "bg-primary/90",
    textColor: "text-primary",
    icon: <FaEnvelope className="text-3xl" />,
  },
  {
    id: 2,
    title: "Phone",
    value: "+880 1719-430433",
    href: "tel:01719430433",
    bgColor: "bg-green-500",
    textColor: "text-green-500",
    icon: <FaPhone className="text-3xl" />,
  },
  {
    id: 3,
    title: "WhatsApp",
    value: "+880 1719-430433",
    href: "https://wa.me/8801719430433",
    bgColor: "bg-green-500",
    textColor: "text-blue-500",
    icon: <FaWhatsapp className="text-3xl" />,
  },
];

const ContactInfo = () => {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <section id="contact" className="p-4 py-6 md:p-8 mb-10 md:mb-14 shadow-lg">
      <div className="container mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-4"
          data-aos="fade-up"
        >
          ✨ Get in Touch 🚀
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12"
          data-aos="fade-up"
        >
          Let’s build something amazing together! Drop me a message 📩💡
        </motion.p>

        {/* Contact Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {contactDetails.map((contact, index) => (
            <motion.div
              key={contact.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                bounce: 0.25,
              }}
              className="relative p-4 py-6 rounded-xl shadow-xl dark:border-[1px] dark:border-white/40 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 w-72 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>

              <div
                className={`flex items-center justify-center w-16 h-16 ${contact.bgColor} text-white rounded-xl shadow-lg mx-auto mb-6`}
              >
                {contact.icon}
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center break-words">
                {contact.title}
              </h3>

              <a
                href={contact.href}
                target={contact.title === "WhatsApp" ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`block text-lg text-center text-gray-600 dark:text-gray-400 hover:${contact.textColor} font-medium transition duration-300`}
              >
                {contact.value}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
