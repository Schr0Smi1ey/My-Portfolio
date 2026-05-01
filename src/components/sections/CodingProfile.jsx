import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import {
  FiActivity,
  FiAward,
  FiCode,
  FiExternalLink,
  FiRefreshCw,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import leetcode from "../../assets/Home/CodingProfile/LeetCode.png";
import codeforces from "../../assets/Home/CodingProfile/Codeforces.svg";
import codechef from "../../assets/Home/CodingProfile/CodeChef.png";
import { useCodingStats } from "../../hooks/index";
import CodingProfileSkeleton from "../../components/CodingProfileSkeleton";
import AnimatedNumber from "../ui/AnimatedNumber";

const RefreshButton = ({ onClick, lastUpdated }) => {
  const [state, setState] = useState("idle");

  const handleClick = async () => {
    if (state === "spinning") return;
    setState("spinning");
    await onClick();
    setState("done");
    setTimeout(() => setState("idle"), 1600);
  };

  const label = {
    idle: "Refresh",
    spinning: "Syncing",
    done: "Updated",
  }[state];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={state === "spinning"}
        whileHover={{ y: state === "spinning" ? 0 : -2 }}
        whileTap={{ scale: 0.97 }}
        className="group inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary transition hover:border-primary/50 hover:bg-primary/15"
      >
        <motion.span
          animate={state === "spinning" ? { rotate: 360 } : { rotate: 0 }}
          transition={
            state === "spinning"
              ? { duration: 0.8, repeat: Infinity, ease: "linear" }
              : { duration: 0.25 }
          }
        >
          <FiRefreshCw className="h-3.5 w-3.5" />
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

      {lastUpdated && (
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-zinc-600 dark:text-zinc-500">
          {lastUpdated.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      )}
    </div>
  );
};

const buildPlatform = ({
  id,
  title,
  img,
  handle,
  profileUrl,
  platform,
  rankOverride,
  starsOverride,
}) => {
  const available = platform?.status === "success";

  return {
    id,
    title,
    img,
    handle,
    displayHandle: handle,
    profileUrl,
    available,
    error: available ? null : platform?.error || "Stats unavailable",
    rating: available ? (platform.rating ?? 0) : null,
    maxRating: available ? (platform.maxRating ?? 0) : null,
    rank: rankOverride || (available ? platform.rank || "-" : "Offline"),
    stars: starsOverride ?? (available ? (platform.stars ?? null) : null),
    problemsSolved: available ? (platform.problemsSolved ?? 0) : null,
    contestsAttended: available ? (platform.contestsAttended ?? 0) : null,
  };
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const SignalCard = ({ label, value, detail, icon: Icon }) => (
  <motion.div
    variants={fadeUp}
    className="about-bento-card flex min-h-[9.5rem] flex-col justify-between p-4"
  >
    <span className="grid h-10 w-10 mb-2 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
      <Icon className="h-4 w-4" />
    </span>
    <div className="font-display text-4xl leading-none text-zinc-950 dark:text-white">
      <AnimatedNumber value={value} />
    </div>
    <div className="mt-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-primary">
      {label}
    </div>
    <p className="mt-1 text-[0.68rem] leading-4 text-zinc-500">{detail}</p>
  </motion.div>
);

const MetricBlock = ({ label, value, detail, valueClassName = "" }) => (
  <div className="rounded-xl border border-zinc-300/70 bg-white/65 p-3 dark:border-white/[0.06] dark:bg-white/[0.025]">
    <p className="font-mono text-[0.54rem] font-bold uppercase tracking-[0.16em] text-zinc-500">
      {label}
    </p>
    <div
      className={`mt-2 min-h-7 font-display text-2xl leading-none text-white ${valueClassName}`}
    >
      <AnimatedNumber value={value} />
    </div>
    {detail && <p className="mt-1 text-[0.68rem] text-zinc-500">{detail}</p>}
  </div>
);

const TraitStrip = () => {
  const traits = [
    {
      title: "Consistent Performer",
      detail: "Weekly contest practice",
      icon: FiZap,
    },
    {
      title: "Problem Solver",
      detail: "Strong DSA foundation",
      icon: FiTarget,
    },
    {
      title: "Algorithmic Thinking",
      detail: "Efficient and optimized",
      icon: FiCode,
    },
  ];

  return (
    <motion.div
      variants={fadeUp}
      className="about-bento-card grid flex-1 gap-4 p-4 md:grid-cols-3 lg:content-center"
    >
      {traits.map((trait, index) => {
        const Icon = trait.icon;

        return (
          <div
            key={trait.title}
            className={`flex items-center gap-3 ${
              index
                ? "md:border-l md:border-zinc-300/70 md:pl-4 dark:md:border-white/10"
                : ""
            }`}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[0.82rem] font-bold text-zinc-950 dark:text-white">
                {trait.title}
              </p>
              <p className="mt-1 text-[0.7rem] text-zinc-500">{trait.detail}</p>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

const PlatformRow = ({ platform, index }) => {
  const progress =
    platform.available && platform.maxRating > 0
      ? Math.min((platform.rating / platform.maxRating) * 100, 100)
      : 0;

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -3 }}
      className="about-bento-card group overflow-hidden p-4 sm:p-5"
    >
      <div className="grid gap-4 xl:grid-cols-[12rem_minmax(0,1fr)_8.5rem] xl:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-zinc-300/70 bg-white/70 dark:border-white/10 dark:bg-white/[0.04]">
            <img
              src={platform.img}
              alt={platform.title}
              className="h-12 w-12 p-[4px] object-contain"
            />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
              {platform.title}
            </h3>
            <p className="truncate font-mono text-[0.62rem] font-bold tracking-[0.12em] text-zinc-500">
              @{platform.displayHandle}
            </p>
            <span className="mt-3 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[0.54rem] font-bold uppercase tracking-[0.16em] text-primary">
              {platform.rank}
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[0.75fr_0.75fr_0.75fr_0.75fr_1fr] xl:pr-4">
          <MetricBlock
            label="Rating"
            value={platform.available ? platform.rating : "-"}
            valueClassName="text-primary"
          />
          <MetricBlock
            label="Max"
            value={platform.available ? platform.maxRating : "-"}
            detail="Peak rating"
          />
          <MetricBlock
            label="Solved"
            value={platform.available ? `${platform.problemsSolved}+` : "-"}
            detail="Problems"
          />
          <MetricBlock
            label="Contests"
            value={
              platform.available && platform.contestsAttended
                ? `${platform.contestsAttended}+`
                : "-"
            }
            detail="Rounds"
          />
          <MetricBlock
            label="Rank"
            value={
              platform.available && platform.stars ? (
                <span className="flex min-h-8 items-center gap-1.5">
                  {[...Array(platform.stars)].map((_, i) => (
                    <FaStar key={i} className="h-3.5 w-3.5 text-primary" />
                  ))}
                </span>
              ) : (
                platform.rank
              )
            }
            detail="Best rank"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-300/80 dark:bg-white/[0.08]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-primary shadow-[0_0_20px_rgb(var(--color-primary-rgb)/0.5)]"
            />
          </div>
          <a
            href={platform.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-2.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] text-primary transition hover:border-primary/55 hover:bg-primary/15"
          >
            Profile
            <FiExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {!platform.available && (
        <p className="mt-4 border-t border-zinc-300/70 pt-3 text-[0.7rem] text-zinc-500 dark:border-white/[0.06]">
          {platform.error}
        </p>
      )}
    </motion.article>
  );
};

const CodingProfile = () => {
  const shouldReduceMotion = useReducedMotion();
  const { stats, loading, error, refreshStats, lastUpdated } = useCodingStats();

  const problemSolvingPlatforms = useMemo(
    () => [
      buildPlatform({
        id: 1,
        title: "Codeforces",
        img: codeforces,
        handle: "Schr0Smi1ey",
        profileUrl: "https://codeforces.com/profile/Schr0Smi1ey",
        platform: stats.codeforces,
      }),
      buildPlatform({
        id: 2,
        title: "LeetCode",
        img: leetcode,
        handle: "Schr0Smi1ey",
        profileUrl: "https://leetcode.com/u/Schr0Smi1ey/",
        platform: stats.leetcode,
      }),
      buildPlatform({
        id: 3,
        title: "CodeChef",
        img: codechef,
        handle: "schrosmiley",
        profileUrl: "https://www.codechef.com/users/schrosmiley",
        platform: stats.codechef,
        rankOverride: "3*",
        starsOverride: 3,
      }),
    ],
    [stats],
  );

  const availablePlatforms = problemSolvingPlatforms.filter(
    (platform) => platform.available,
  );

  const totalProblems = availablePlatforms.reduce(
    (sum, platform) => sum + (platform.problemsSolved || 0),
    0,
  );
  const totalContests = availablePlatforms.reduce(
    (sum, platform) => sum + (platform.contestsAttended || 0),
    0,
  );
  const averageRating =
    availablePlatforms.length > 0
      ? Math.round(
          availablePlatforms.reduce(
            (sum, platform) => sum + (platform.rating || 0),
            0,
          ) / availablePlatforms.length,
        )
      : "-";
  const maxRating =
    availablePlatforms.length > 0
      ? Math.max(
          ...availablePlatforms.map((platform) => platform.maxRating || 0),
        )
      : "-";

  if (loading) return <CodingProfileSkeleton />;

  return (
    <section
      id="coding-profile"
      className="about-cosmic-section relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 mb-20 py-20 text-zinc-950 dark:text-white md:px-8 md:py-24"
    >
      <div className="about-cosmic-starfield" aria-hidden="true" />
      <div className="cosmic-noise" aria-hidden="true" />
      <motion.div
        className="cosmic-orb cosmic-orb-left"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, -14, 0], x: [0, 8, 0], scale: [1, 1.04, 1] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="cosmic-orb cosmic-orb-right"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, 16, 0], x: [0, -8, 0], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.08 },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-stretch"
      >
        <div className="flex">
          <motion.div
            variants={fadeUp}
            className="p-2 lg:flex lg:flex-col lg:justify-center lg:p-1"
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="h-4 w-4 rounded-full bg-primary shadow-[0_0_18px_rgb(var(--color-primary-rgb)/0.7)]" />
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.28em] text-zinc-600 dark:text-zinc-400">
                Competitive Programming
              </p>
            </div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl leading-[0.82] tracking-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl"
            >
              Coding{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Profile
              </span>
            </motion.h2>
            <p className="max-w-[330px] mt-5 text-[0.82rem] leading-6 text-zinc-600 dark:text-zinc-400">
              Live problem-solving signals from the platforms where I practice
              algorithms, contest thinking, and consistency.
            </p>
            <div className="mt-6">
              <RefreshButton onClick={refreshStats} lastUpdated={lastUpdated} />
            </div>
            {error && (
              <p className="mt-4 flex items-center gap-2 text-[0.7rem] text-zinc-600 dark:text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {error}
              </p>
            )}
          </motion.div>
        </div>

        <div className="flex flex-col gap-3">
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="grid grid-cols-2 gap-3 lg:grid-cols-4"
          >
            <SignalCard
              label="Problems"
              value={availablePlatforms.length > 0 ? `${totalProblems}+` : "-"}
              detail="Solved across synced platforms"
              icon={FiCode}
            />
            <SignalCard
              label="Avg Rating"
              value={averageRating}
              detail="Mean available platform rating"
              icon={FiTrendingUp}
            />
            <SignalCard
              label="Max Rating"
              value={maxRating}
              detail="Best recorded platform peak"
              icon={FiActivity}
            />
            <SignalCard
              label="Contests"
              value={availablePlatforms.length > 0 ? `${totalContests}+` : "-"}
              detail="Total participated rounds"
              icon={FiAward}
            />
          </motion.div>
          <TraitStrip />
        </div>

        <div className="space-y-3 lg:col-span-2">
          {problemSolvingPlatforms.map((platform, index) => (
            <PlatformRow key={platform.id} platform={platform} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CodingProfile;
