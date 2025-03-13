import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import NotAvailable from "../../../assets/Blog/Not_Available.png";
import { Helmet } from "react-helmet";

const Blogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 500 });
  }, []);

  return (
    <div className="p-4 md:p-8 shadow-lg flex flex-col items-center justify-center background">
      <Helmet>
        <title>Schr0Smi1ey | Blogs</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 70 }}
        transition={{ duration: 0.8 }}
        className="text-center container py-32 mx-auto"
      >
        {/* Image with AOS animation */}
        <img
          src={NotAvailable}
          alt="No Blogs"
          className="mx-auto w-1/3 rounded-xl"
          data-aos="zoom-in"
        />

        {/* Title */}
        <h1
          className="text-2xl md:text-3xl font-semibold text-red-500 mt-6"
          data-aos="fade-up"
        >
          No Blogs Available
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg mt-2" data-aos="fade-up">
          We're working on adding new content. Stay tuned!
        </p>

        {/* Button */}
        <Link
          to="/"
          className="mt-6 inline-block bg-primary text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-primary/90 transition"
          data-aos="fade-up"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Blogs;
