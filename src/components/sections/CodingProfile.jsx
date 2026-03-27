import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaStar, FaCode } from "react-icons/fa";
import { FiRefreshCw, FiExternalLink } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import leetcode from "../../assets/Home/CodingProfile/LeetCode.png";
import codeforces from "../../assets/Home/CodingProfile/Codeforces.svg";
import codechef from "../../assets/Home/CodingProfile/CodeChef.png";
import { useCodingStats } from "../../hooks/index";
import CodingProfileSkeleton from "../../components/CodingProfileSkeleton";
import Background from "../Background";
import StatCard from "../ui/StatCard";

// ── Refresh button — three states: idle / spinning / done ────────────────────
const RefreshButton = ({ onClick, lastUpdated }) => {
  const [state, setState] = useState("idle"); // idle | spinning | done

  const handleClick = async () => {
    if (state === "spinning") return;
    setState("spinning");
    await onClick();
    setState("done");
    setTimeout(() => setState("idle"), 2000);
  };

  const label = {
    idle: "Refresh",
    spinning: "Refreshing…",
    done: "Updated!",
  }[state];

  const iconColor = {
    idle: "text-gray-500 group-hover:text-primary",
    spinning: "text-primary",
    done: "text-green-500",
  }[state];

  return (
    <div className="flex items-center gap-3">
      {lastUpdated && (
        <span className="text-xs text-gray-400 dark:text-gray-500">
          Last updated{" "}
          {lastUpdated.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      )}

      <motion.button
        onClick={handleClick}
        disabled={state === "spinning"}
        whileHover={{ scale: state === "spinning" ? 1 : 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-300 overflow-hidden
          ${
            state === "done"
              ? "border-green-400/50 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
              : "border-gray-200 dark:border-white/10 bg-white/80 dark:bg-zinc-800/80 text-gray-600 dark:text-gray-300 hover:border-primary/40 hover:text-primary"
          }`}
      >
        {/* Shimmer sweep on hover */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        <motion.span
          animate={state === "spinning" ? { rotate: 360 } : { rotate: 0 }}
          transition={
            state === "spinning"
              ? { duration: 0.8, repeat: Infinity, ease: "linear" }
              : { duration: 0.3 }
          }
          className={`transition-colors duration-200 ${iconColor}`}
        >
          <FiRefreshCw className="w-3.5 h-3.5" />
        </motion.span>

        <AnimatePresence mode="wait">
          <motion.span
            key={state}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const CodingProfile = () => {
  const { stats, loading, error, refreshStats, lastUpdated } = useCodingStats();
  const [totalProblems, setTotalProblems] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    if (!loading && stats) {
      const total =
        (stats.codeforces?.problemsSolved || 0) +
        (stats.leetcode?.problemsSolved || 0) +
        (stats.codechef?.problemsSolved || 0);
      setTotalProblems(total);

      const avg = Math.round(
        ((stats.codeforces?.rating || 0) +
          (stats.leetcode?.rating || 0) +
          (stats.codechef?.rating || 0)) /
          3,
      );
      setAverageRating(avg);
    }
  }, [stats, loading]);

  const problemSolvingPlatforms = [
    {
      id: 1,
      title: "Codeforces",
      img: codeforces,
      handle: "Schr0Smi1ey",
      rating: stats.codeforces?.rating || 0,
      maxRating: stats.codeforces?.maxRating || 0,
      rank: stats.codeforces?.rank || "Pupil",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      problemsSolved: stats.codeforces?.problemsSolved || 0,
      contestsAttended: stats.codeforces?.contestsAttended || 0,
      profileUrl: "https://codeforces.com/profile/Schr0Smi1ey",
    },
    {
      id: 2,
      title: "LeetCode",
      img: leetcode,
      handle: "Schr0Smi1ey",
      rating: stats.leetcode?.rating || 0,
      maxRating: stats.leetcode?.maxRating || 0,
      rank: stats.leetcode?.rank || "Knight",
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      problemsSolved: stats.leetcode?.problemsSolved || 0,
      contestsAttended: stats.leetcode?.contestsAttended || 0,
      profileUrl: "https://leetcode.com/u/Schr0Smi1ey/",
    },
    {
      id: 3,
      title: "CodeChef",
      img: codechef,
      handle: "schrosmiley",
      rating: stats.codechef?.rating || 0,
      maxRating: stats.codechef?.maxRating || 0,
      stars: stats.codechef?.stars || 0,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      problemsSolved: stats.codechef?.problemsSolved || 0,
      contestsAttended: stats.codechef?.contestsAttended || 0,
      profileUrl: "https://www.codechef.com/users/schrosmiley",
    },
  ];

  const codingStats = [
    {
      label: "Total Problems",
      value: `${totalProblems}+`,
      color: "from-primary to-purple-600",
      description: "Solved across platforms",
    },
    {
      label: "Average Rating",
      value: averageRating,
      color: "from-blue-500 to-indigo-600",
      description: "Across all platforms",
    },
    {
      label: "Contests",
      value: `${(stats.codeforces?.contestsAttended || 0) + (stats.leetcode?.contestsAttended || 0) + (stats.codechef?.contestsAttended || 0)}+`,
      color: "from-green-500 to-emerald-600",
      description: "Total participated",
    },
    {
      label: "Highest Rank",
      value: "Pupil",
      color: "from-purple-500 to-pink-600",
      description: "On Codeforces",
    },
  ];

  if (loading) return <CodingProfileSkeleton />;

  return (
    <section
      id="coding-profile"
      className="relative py-16 md:py-24 lg:py-28 overflow-hidden"
    >
      <Background
        mouseGlow
        showGrid
        showGridPattern
        showBottomFade
        showNoise
        showOrbs
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20 backdrop-blur-sm">
                ⚡ Competitive Programming
              </span>
            </motion.div>

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
              Passionate problem solver with {totalProblems}+ problems solved
              across platforms
            </p>

            {/* ── Refresh button (redesigned) ── */}
            <div className="flex items-center justify-center mt-5">
              <RefreshButton onClick={refreshStats} lastUpdated={lastUpdated} />
            </div>

            {error && (
              <p className="text-sm text-red-500 mt-3 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                {error}
              </p>
            )}
          </motion.div>

          {/* ── Stats overview ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {codingStats.map((stat, index) => (
              <StatCard
                key={index}
                label={stat.label}
                value={stat.value}
                description={stat.description}
                color={stat.color}
                delay={index}
              />
            ))}
          </motion.div>

          {/* ── Platform cards (unchanged) ── */}
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
                <div className="relative p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`p-3 rounded-2xl ${platform.bgColor} border ${platform.borderColor}`}
                    >
                      <img
                        src={platform.img}
                        alt={platform.title}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div
                      className={`px-3 py-1.5 rounded-full ${platform.bgColor} border ${platform.borderColor}`}
                    >
                      {platform.stars ? (
                        <div className="flex items-center gap-0.5">
                          {[...Array(platform.stars)].map((_, i) => (
                            <FaStar
                              key={i}
                              className="w-3.5 h-3.5 text-yellow-400"
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {platform.rank}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {platform.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @{platform.handle}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Rating
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                          {platform.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          / {platform.maxRating}
                        </span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${(platform.rating / platform.maxRating) * 100}%`,
                        }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`absolute h-full rounded-full bg-gradient-to-r ${platform.color}`}
                      />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Problems Solved
                      </span>
                      <div className="flex items-center gap-1">
                        <FaCode className="w-4 h-4 text-primary" />
                        <span className="font-bold text-gray-900 dark:text-white">
                          {platform.problemsSolved}+
                        </span>
                      </div>
                    </div>
                    {platform.contestsAttended > 0 && (
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Contests
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {platform.contestsAttended}+
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <a
                    href={platform.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="relative block w-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3.5 rounded-xl font-medium text-center transition-all duration-300 bg-gradient-to-r ${platform.color} text-white shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
                    >
                      View Profile <FiExternalLink className="w-3.5 h-3.5" />
                    </motion.div>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Background>
    </section>
  );
};

export default CodingProfile;
