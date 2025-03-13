import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NotAvailable from "../../../assets/Blog/Not_Available.png";

const Blogs = () => {
  return (
    <div className="p-4 md:p-8 py-32 shadow-lg flex flex-col items-center justify-center min-h-screen background">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center container mx-auto"
      >
        <img
          src={NotAvailable}
          alt="No Blogs"
          className="mx-auto w-1/2 rounded-xl"
        />

        <h1 className="text-2xl md:text-3xl font-semibold text-red-500 mt-6">
          No Blogs Available
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          We're working on adding new content. Stay tuned!
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-primary/90 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Blogs;
