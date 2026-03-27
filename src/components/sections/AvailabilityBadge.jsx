import { motion } from "framer-motion";
import { useAvailabilityStatus } from "../../hooks";
import { STATUS_OPTIONS } from "../../constants";

const COLOR_MAP = {
  green: {
    dot: "bg-green-500",
    text: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20  border-green-200 dark:border-green-800/40",
  },
  blue: {
    dot: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20    border-blue-200 dark:border-blue-800/40",
  },
  yellow: {
    dot: "bg-yellow-500",
    text: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/40",
  },
  red: {
    dot: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20      border-red-200 dark:border-red-800/40",
  },
};

const AvailabilityBadge = () => {
  const { status, isLoading } = useAvailabilityStatus();

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-7 w-36 bg-gray-100 dark:bg-zinc-800 rounded-full animate-pulse"
      />
    );
  }

  const option =
    STATUS_OPTIONS.find((o) => o.value === status) || STATUS_OPTIONS[0];
  const colors = COLOR_MAP[option.color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      }}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold cursor-default ${colors.bg} ${colors.text}`}
    >
      {/* Animated pulsing dot */}
      <motion.span
        className="relative flex h-2 w-2"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {option.color === "green" && (
          <motion.span
            className={`absolute inline-flex h-full w-full rounded-full ${colors.dot} opacity-60`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        <motion.span
          className={`relative inline-flex rounded-full h-2 w-2 ${colors.dot}`}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.span>

      {/* Animated text */}
      <motion.span
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="relative"
      >
        {option.label}

        {/* Optional: Add subtle shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
          style={{ pointerEvents: "none" }}
        />
      </motion.span>
    </motion.div>
  );
};

export default AvailabilityBadge;
