import React from "react";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";

const StatCard = ({ label, value, description, color, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + delay * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl">
        <div className={`w-full h-full bg-gradient-to-r ${color}`} />
      </div>

      {/* Main Card */}
      <div className="relative p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/30 overflow-hidden">
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% 200%" }}
        />

        <div className="relative space-y-3 text-center">
          {/* Icon (optional) */}
          {icon && (
            <div className="flex justify-center mb-2">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-10`}
              >
                <span className="text-2xl text-primary">{icon}</span>
              </div>
            </div>
          )}

          {/* Value */}
          <motion.div
            className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
            style={{ fontFamily: '"Playfair Display", serif' }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: delay * 0.2,
            }}
          >
            <AnimatedNumber value={value} delay={delay * 0.1} />
          </motion.div>

          {/* Label */}
          <div
            className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider"
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            {label}
          </div>

          {/* Description */}
          {description && (
            <div
              className="text-xs text-gray-600 dark:text-gray-400"
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {description}
            </div>
          )}
        </div>

        {/* Bottom accent bar */}
        <motion.div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{
            delay: 0.8 + delay * 0.1,
            duration: 0.8,
          }}
        />
      </div>
    </motion.div>
  );
};

export default StatCard;
