import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaStar } from "react-icons/fa";
import leetcode from "../../../../assets/Home/CodingProfile/LeetCode.png";
import codeforces from "../../../../assets/Home/CodingProfile/Codeforces.svg";
import codechef from "../../../../assets/Home/CodingProfile/CodeChef.png";
import { motion } from "framer-motion";

const problemSolvingPlatforms = [
  {
    id: 1,
    title: "Codeforces",
    img: codeforces,
    alt: "Codeforces",
    rating: {
      html: (
        <>
          <p className="text-green-700 font-semibold mt-2">
            1241{" "}
            <span className="font-light text-black dark:text-white">(MAX.</span>{" "}
            pupil, 1290
            <span className="font-light text-black dark:text-white">)</span>
          </p>
        </>
      ),
    },
    problemsSolved: 670,
    profileUrl: "https://codeforces.com/profile/Schr0Smi1ey",
  },
  {
    id: 2,
    title: "LeetCode",
    img: leetcode,
    alt: "LeetCode",
    rating: {
      html: (
        <>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Rating: <span className="text-primary font-semibold">1645</span>
          </p>
        </>
      ),
    },
    problemsSolved: 258,
    profileUrl: "https://leetcode.com/u/Schr0Smi1ey/",
  },
  {
    id: 3,
    title: "CodeChef",
    img: codechef,
    alt: "CodeChef",
    rating: {
      html: (
        <>
          <p className="flex items-center justify-center text-gray-600 dark:text-gray-300 mt-2">
            3{" "}
            <span>
              <FaStar className="text-primary mx-1" />
            </span>
            {" ("}MAX-{" "}
            <span className="text-primary font-semibold"> {"  1615"} </span>
            {")"}
          </p>
        </>
      ),
    },
    problemsSolved: 207,
    profileUrl: "https://www.codechef.com/users/schrosmiley",
  },
];
const CodingProfile = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <section className="p-4 py-6 md:p-8 my-10 md:my-14 shadow-lg dark:text-white">
      <div className="container mx-auto px-2 md:px-6 text-center">
        <h2 className="text-4xl font-bold" data-aos="fade-up">
          🚀 Coding Profile
        </h2>
        <p
          className="text-lg text-gray-600 dark:text-gray-300 mt-3"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Passionate Problem Solver | Competitive Programmer
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 justify-center items-center">
          {problemSolvingPlatforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                bounce: 0.25,
              }}
              className="relative p-4 py-6 rounded-xl shadow-xl dark:border-[1px] dark:border-white/40 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>
              <img
                src={platform.img}
                alt={platform.alt}
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {platform.title}
              </h3>
              {platform.rating.html}

              <p className="mt-4 text-gray-500 dark:text-gray-300 text-sm">
                Problems Solved:{" "}
                <span className="font-semibold text-primary">
                  {platform.problemsSolved}
                </span>
              </p>
              <a
                href={platform.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-6 py-2 text-sm font-medium bg-primary text-white rounded-full shadow-md hover:bg-primary transition"
              >
                View Profile
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CodingProfile;
