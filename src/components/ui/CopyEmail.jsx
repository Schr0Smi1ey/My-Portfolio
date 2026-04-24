import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiCheck } from "react-icons/fi";

const CopyEmail = ({ email, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const el = document.createElement("textarea");
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.button
      onClick={handleCopy}
      title="Copy email"
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`group relative overflow-hidden rounded-full 
      inline-flex items-center justify-center gap-2
      px-6 py-2 text-sm font-semibold
      bg-white text-zinc-950
      shadow-[0_0_28px_rgba(255,255,255,0.12)]
      hover:shadow-[0_0_45px_rgb(var(--color-primary-rgb)/0.45)]
      transition-shadow duration-500
      ${className}`}
    >
      {/* spreading primary background */}
      <motion.span
        variants={{
          rest: {
            scale: 0,
            opacity: 1,
          },
          hover: {
            scale: 14,
          },
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1], // smoother than default
        }}
        className="
          absolute
          left-1/2 top-1/2
          h-6 w-6
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-primary
          z-0
        "
      />

      {/* text */}
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {email}
      </span>

      {/* icon only changes to tick after copy */}
      <span className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <FiCheck className="w-4 h-4 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <FiCopy className="w-4 h-4 transition-colors duration-300 group-hover:text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
};

export default CopyEmail;
