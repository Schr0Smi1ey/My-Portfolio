import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaStar } from "react-icons/fa";
import leetcode from "../../../../assets/Home/CodingProfile/LeetCode.png";
import codeforces from "../../../../assets/Home/CodingProfile/Codeforces.svg";
import codechef from "../../../../assets/Home/CodingProfile/CodeChef.png";

const CodingProfile = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const problemsSolved = {
    codeforces: 250,
    leetcode: 400,
    codechef: 150,
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primaryto-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2
          className="text-4xl font-bold text-gray-900 dark:text-white"
          data-aos="fade-up"
        >
          🚀 Coding Profile
        </h2>
        <p
          className="text-lg text-gray-600 dark:text-gray-300 mt-3"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Passionate Problem Solver | Competitive Programmer
        </p>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Codeforces */}
          <div
            data-aos="fade-up"
            className="bg-white dark:bg-gray-800 p-4 py-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
          >
            <img
              src={codeforces}
              alt="Codeforces"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Codeforces
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Pupil (Max 1290)
            </p>
            <p className="mt-4 text-gray-500 text-sm">
              Problems Solved:{" "}
              <span className="font-semibold text-primary">
                {problemsSolved.codeforces}
              </span>
            </p>
            <a
              href="https://codeforces.com/profile/Schr0Smi1ey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-2 text-sm font-medium bg-primary text-white rounded-full shadow-md hover:bg-primary transition"
            >
              View Profile
            </a>
          </div>

          {/* LeetCode */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-white dark:bg-gray-800 p-4 py-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
          >
            <img
              src={leetcode}
              alt="LeetCode"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              LeetCode
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Rating: 1645
            </p>
            <p className="mt-4 text-gray-500 text-sm">
              Problems Solved:{" "}
              <span className="font-semibold text-primary dark:text-primary">
                {problemsSolved.leetcode}
              </span>
            </p>
            <a
              href="https://leetcode.com/u/Schr0Smi1ey/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-2 text-sm font-medium bg-primary text-white rounded-full shadow-md hover:bg-primary transition"
            >
              View Profile
            </a>
          </div>

          {/* CodeChef */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="bg-white dark:bg-gray-800 p-4 py-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
          >
            <img
              src={codechef}
              alt="CodeChef"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              CodeChef
            </h3>
            <p className="flex items-center justify-center text-gray-600 dark:text-gray-300 mt-2">
              3{" "}
              <span>
                <FaStar className="text-primary mx-1" />
              </span>{" "}
              (Max 1615)
            </p>
            <p className="mt-4 text-gray-500 text-sm">
              Problems Solved:{" "}
              <span className="font-semibold text-primary dark:text-primary">
                {problemsSolved.codechef}
              </span>
            </p>
            <a
              href="https://www.codechef.com/users/schrosmiley"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-2 text-sm font-medium bg-primary text-white rounded-full shadow-md hover:bg-primary transition"
            >
              View Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingProfile;
