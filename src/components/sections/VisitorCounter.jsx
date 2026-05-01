import { motion } from "framer-motion";
import { FiEye } from "react-icons/fi";
import { useVisitorCount } from "../../hooks";
import AnimatedNumber from "../ui/AnimatedNumber";

const VisitorCounter = ({ compact = false }) => {
  const { count, isLoading } = useVisitorCount();

  if (isLoading) {
    return <div className="h-5 w-24 bg-gray-100 dark:bg-zinc-800 rounded animate-pulse" />;
  }

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
        <FiEye className="w-3.5 h-3.5" />
        <AnimatedNumber value={count} /> visits
      </span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-white/8 rounded-full"
    >
      <FiEye className="w-3.5 h-3.5 text-gray-400" />
      <span className="text-xs text-gray-500 dark:text-gray-400">
        <span className="font-semibold text-gray-700 dark:text-gray-200">
          <AnimatedNumber value={count} />
        </span>{" "}
        profile views
      </span>
    </motion.div>
  );
};

export default VisitorCounter;
