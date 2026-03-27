import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaRegPaperPlane,
  FaClock,
} from "react-icons/fa";
import AvailabilityBadge from "./AvailabilityBadge";

const contactDetails = [
  {
    id: 1,
    title: "Email",
    value: "Sarafatkarim555@gmail.com",
    href: "mailto:Sarafatkarim555@gmail.com",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: <FaEnvelope className="text-2xl text-black w-6 h-6" />,
    action: "Send an email",
    responseTime: "Within 24 hours",
  },
  {
    id: 2,
    title: "Phone",
    value: "+880 1719-430433",
    href: "tel:01719430433",
    gradient: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    icon: <FaPhone className="text-2xl text-black w-6 h-6" />,
    action: "Give a call",
    responseTime: "9 AM - 6 PM",
  },
  {
    id: 3,
    title: "WhatsApp",
    value: "+880 1719-430433",
    href: "https://wa.me/8801719430433",
    gradient: "from-green-600 to-teal-600",
    bgColor: "bg-green-600/10",
    borderColor: "border-green-600/30",
    icon: <FaWhatsapp className="text-2xl text-black w-6 h-6" />,
    action: "Chat on WhatsApp",
    responseTime: "Instant reply",
  },
];

const ContactInfo = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, #94a3b815 1px, transparent 1px),
              linear-gradient(to bottom, #94a3b815 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(96, 165, 250, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(96, 165, 250, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, rgba(96, 165, 250, 0.15) 1.5px, transparent 1.5px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-40 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-300 border border-primary/20 dark:border-primary/30 backdrop-blur-sm">
              🤝 Let's Connect
            </span>
          </motion.div>

          {/* Title */}
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Let's build something amazing together! Drop me a message 📩💡
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {contactDetails.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card Background Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${contact.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700 rounded-3xl`}
              />

              {/* Main Card */}
              <div className="relative p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 dark:hover:border-primary-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 dark:hover:shadow-primary/10 h-full flex flex-col">
                {/* Icon Container */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`p-4 rounded-2xl ${contact.bgColor} border ${contact.borderColor}`}
                  >
                    <div
                      className={`text-2xl bg-gradient-to-r ${contact.gradient} bg-clip-text text-transparent`}
                    >
                      {contact.icon}
                    </div>
                  </div>

                  {/* Response Time Badge */}
                  <div className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-1.5">
                      <FaClock className="text-xs text-gray-500 dark:text-gray-400" />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {contact.responseTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {contact.title}
                  </h3>

                  <a
                    href={contact.href}
                    target={contact.title === "WhatsApp" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="inline-block text-lg text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400 transition-colors duration-300 mb-4 break-all"
                  >
                    {contact.value}
                  </a>

                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {contact.action}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                  <a
                    href={contact.href}
                    target={contact.title === "WhatsApp" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-between w-full"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/btn:text-primary transition-colors duration-300">
                      Contact via {contact.title}
                    </span>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 group-hover/btn:bg-primary/10 transition-colors duration-300"
                    >
                      <FaRegPaperPlane className="text-primary text-sm rotate-12" />
                    </motion.span>
                  </a>
                </div>

                {/* Decorative Corner Accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${contact.gradient} opacity-5 rounded-bl-full -z-10`}
                />
                <div
                  className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr ${contact.gradient} opacity-5 rounded-tr-full -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-primary/10 dark:bg-primary/20">
                <FaMapMarkerAlt className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  Khulna, Bangladesh
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Based in Khulna University Campus
                </p>
              </div>
            </div>

            {/* Social Links Placeholder */}
            <div className="flex gap-3">
              <a
                href="mailto:Sarafatkarim555@gmail.com"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <FaPaperPlane />
                <span>Send Message</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Availability Badge - Replaces the old availability status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <AvailabilityBadge />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />
    </section>
  );
};

export default ContactInfo;
