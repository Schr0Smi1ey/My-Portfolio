import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaStar, FaCode, FaTrophy, FaMedal } from "react-icons/fa";
import { SiCodeforces, SiLeetcode, SiCodechef } from "react-icons/si";
import { motion } from "framer-motion";
import leetcode from "../../assets/Home/CodingProfile/LeetCode.png";
import codeforces from "../../assets/Home/CodingProfile/Codeforces.svg";
import codechef from "../../assets/Home/CodingProfile/CodeChef.png";

const problemSolvingPlatforms = [
  {
    id: 1,
    title: "Codeforces",
    img: codeforces,
    icon: <SiCodeforces className="w-8 h-8" />,
    alt: "Codeforces",
    handle: "Schr0Smi1ey",
    rating: 1241,
    maxRating: 1290,
    rank: "Pupil",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    problemsSolved: 670,
    profileUrl: "https://codeforces.com/profile/Schr0Smi1ey",
  },
  {
    id: 2,
    title: "LeetCode",
    img: leetcode,
    icon: <SiLeetcode className="w-8 h-8" />,
    alt: "LeetCode",
    handle: "Schr0Smi1ey",
    rating: 1645,
    maxRating: 1645,
    rank: "Knight",
    color: "from-yellow-500 to-amber-600",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    problemsSolved: 258,
    profileUrl: "https://leetcode.com/u/Schr0Smi1ey/",
  },
  {
    id: 3,
    title: "CodeChef",
    img: codechef,
    icon: <SiCodechef className="w-8 h-8" />,
    alt: "CodeChef",
    handle: "schrosmiley",
    rating: 1615,
    maxRating: 1615,
    stars: 3,
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    problemsSolved: 207,
    profileUrl: "https://www.codechef.com/users/schrosmiley",
  },
];

const CodingProfile = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const totalProblems = problemSolvingPlatforms.reduce((acc, curr) => acc + curr.problemsSolved, 0);
  const averageRating = Math.round(problemSolvingPlatforms.reduce((acc, curr) => acc + curr.rating, 0) / problemSolvingPlatforms.length);

  return (
    <section id="coding-profile" className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, #94a3b815 1px, transparent 1px),
              linear-gradient(to bottom, #94a3b815 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <div 
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(96, 165, 250, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(96, 165, 250, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, rgba(96, 165, 250, 0.15) 1.5px, transparent 1.5px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      </div>

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
              ⚡ Competitive Programming
            </span>
          </motion.div>

          {/* Title */}
          <h2
            data-aos="fade-up"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Coding Profile
            </span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Passionate problem solver with {totalProblems}+ problems solved across platforms
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {totalProblems}+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Problems</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              {averageRating}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Avg. Rating</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              3
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active Platforms</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              Pupil
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Highest Rank</div>
          </div>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {problemSolvingPlatforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card Background with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-transparent dark:from-white/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
              
              {/* Main Card */}
              <div className="relative p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 dark:hover:border-primary-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 dark:hover:shadow-primary/10">
                
                {/* Platform Icon & Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-2xl ${platform.bgColor} border ${platform.borderColor}`}>
                    <div className="text-3xl">
                        <img 
                          src={platform.img}
                          alt={`${platform.name} icon`}
                          className={`w-10 h-10 object-contain ${platform.filter || 'brightness-0 saturate-100'}`}
                          style={platform.color ? { filter: `hue-rotate(${platform.hue || 0}deg) saturate(300%)` } : {}}
                        />
                      </div>
                  </div>
                  
                  {/* Rating Badge - Different for CodeChef */}
                  <div className={`px-3 py-1.5 rounded-full ${platform.bgColor} border ${platform.borderColor}`}>
                    {platform.stars ? (
                      <div className="flex items-center gap-0.5">
                        {[...Array(platform.stars)].map((_, i) => (
                          <FaStar key={i} className="w-3.5 h-3.5 text-yellow-400" />
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {platform.rank}
                      </span>
                    )}
                  </div>
                </div>

                {/* Platform Info */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {platform.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{platform.handle}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="space-y-4 mb-8">
                  {/* Rating */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Rating</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        {platform.rating}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        / {platform.maxRating}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative h-2 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(platform.rating / platform.maxRating) * 100}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className={`absolute h-full rounded-full bg-gradient-to-r ${platform.color}`}
                    />
                  </div>

                  {/* Problems Solved */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Problems Solved</span>
                    <div className="flex items-center gap-1">
                      <FaCode className="w-4 h-4 text-primary" />
                      <span className="font-bold text-gray-900 dark:text-white">
                        {platform.problemsSolved}+
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <a
                  href={platform.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3.5 rounded-xl font-medium text-center transition-all duration-300
                      bg-gradient-to-r ${platform.color} text-white shadow-lg hover:shadow-xl
                      hover:shadow-${platform.color.split(' ')[1]}/30`}
                  >
                    View Profile
                  </motion.div>
                </a>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl -z-10" />
              </div>

              {/* Glow Effect on Hover */}
              <div className={`absolute inset-0 -z-10 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-700 rounded-3xl`} />
            </motion.div>
          ))}
        </div>

        {/* Achievement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-primary/10 dark:bg-primary/20">
                <FaTrophy className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Consistent Performer</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Regularly participating in contests and improving problem-solving skills
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-sm font-medium">
                100+ Contests
              </span>
              <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                Top 20%
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />
    </section>
  );
};

export default CodingProfile;