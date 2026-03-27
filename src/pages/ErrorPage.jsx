import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FiArrowLeft } from "react-icons/fi";

const ErrorPage = () => (
  <div className="min-h-screen background dark:bg-black dark:bg-none flex items-center justify-center px-4">
    <Helmet>
      <title>404 — Page Not Found</title>
    </Helmet>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center space-y-5"
    >
      <p className="text-8xl font-black text-primary/20 select-none">404</p>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Page not found</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
      >
        <FiArrowLeft className="w-4 h-4" /> Go home
      </Link>
    </motion.div>
  </div>
);

export default ErrorPage;
