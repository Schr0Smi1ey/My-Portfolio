import { motion, useReducedMotion } from "framer-motion";
import { FiGithub, FiStar, FiUsers, FiGitBranch, FiBook } from "react-icons/fi";
import { useGitHubStats } from "../../hooks";
import { GITHUB_USERNAME, SOCIAL_LINKS } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import AnimatedNumber from "../ui/AnimatedNumber";

const LANG_COLORS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3776ab",
  "C++": "#00599c",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Go: "#00add8",
  Rust: "#dea584",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const StatCard = ({ icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="about-bento-card flex flex-col gap-1 p-5"
  >
    <span className="text-primary">{icon}</span>
    <span className="mt-1 text-2xl font-bold text-zinc-950 dark:text-white">
      <AnimatedNumber value={value} delay={delay} />
    </span>
    <span className="text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
  </motion.div>
);

const LanguageBar = ({ topLanguages }) => {
  const total = topLanguages.reduce((sum, language) => sum + language.count, 0);

  return (
    <div className="space-y-3">
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
        {topLanguages.map(({ lang, count }) => (
          <motion.div
            key={lang}
            initial={{ width: 0 }}
            whileInView={{ width: `${(count / total) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              backgroundColor: LANG_COLORS[lang] || "var(--color-primary)",
            }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {topLanguages.map(({ lang, count }) => (
          <div key={lang} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{
                backgroundColor: LANG_COLORS[lang] || "var(--color-primary)",
              }}
            />
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              {lang}
              <span className="ml-1 text-zinc-400 dark:text-zinc-500">
                <AnimatedNumber
                  value={`${((count / total) * 100).toFixed(0)}%`}
                  separator=""
                />
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContributionGraph = ({ color }) => (
  <div className="w-full overflow-x-auto">
    <img
      src={`https://ghchart.rshah.org/${color}/${GITHUB_USERNAME}`}
      alt="GitHub contribution graph"
      className="w-full min-w-[600px] rounded-xl opacity-90"
      loading="lazy"
    />
  </div>
);

const GitHubStats = () => {
  const shouldReduceMotion = useReducedMotion();
  const { preferences } = useAuth();
  const { profile, topLanguages, totalStars, isLoading, error } =
    useGitHubStats();
  const contributionColor = (preferences?.primaryColor || "#ef4444").replace(
    "#",
    "",
  );

  if (isLoading) {
    return (
      <section
        className="about-cosmic-section relative left-1/2 mb-20 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 py-20 text-white md:px-8 md:py-24"
        id="github-stats"
      >
        <div className="about-cosmic-starfield" aria-hidden="true" />
        <div className="cosmic-noise" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl animate-pulse space-y-4">
          <div className="h-8 w-48 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-2xl bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const stats = [
    {
      icon: <FiBook className="w-4 h-4" />,
      label: "Public repos",
      value: profile?.public_repos ?? "—",
      delay: 0,
    },
    {
      icon: <FiStar className="w-4 h-4" />,
      label: "Total stars",
      value: totalStars ?? "—",
      delay: 0.06,
    },
    {
      icon: <FiUsers className="w-4 h-4" />,
      label: "Followers",
      value: profile?.followers ?? "—",
      delay: 0.12,
    },
    {
      icon: <FiGitBranch className="w-4 h-4" />,
      label: "Following",
      value: profile?.following ?? "—",
      delay: 0.18,
    },
  ];

  return (
    <section
      id="github-stats"
      className="about-cosmic-section relative left-1/2 mb-20 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 py-20 text-white md:px-8 md:py-24"
    >
      <div className="about-cosmic-starfield" aria-hidden="true" />
      <div className="cosmic-noise" aria-hidden="true" />
      <motion.div
        className="cosmic-orb cosmic-orb-left"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, -12, 0], x: [0, 8, 0], scale: [1, 1.04, 1] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="cosmic-orb cosmic-orb-right"
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, 14, 0], x: [0, -8, 0], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center"
        >
          <div className="p-2 lg:p-1">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-4 w-4 rounded-full bg-primary shadow-[0_0_18px_rgb(var(--color-primary-rgb)/0.7)]" />
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.28em] text-zinc-600 dark:text-zinc-400">
                Repository Signals
              </p>
            </div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl leading-[0.82] tracking-tight text-zinc-950 dark:text-white sm:text-4xl lg:text-5xl"
            >
              GitHub{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Stats
              </span>
            </motion.h2>
            {error && <p className="mt-4 text-sm text-primary">{error}</p>}
          </div>

          <span
            className="hidden h-16 w-px bg-primary/70 lg:block"
            aria-hidden="true"
          />

          <div className="p-2 lg:p-1">
            <p className="max-w-md text-[0.82rem] leading-6 text-zinc-600 dark:text-zinc-400">
              Live repository signals from my GitHub profile, including public
              repos, stars, language usage, and contribution activity.
            </p>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-primary transition hover:border-primary/55 hover:bg-primary/15"
            >
              <FiGithub className="h-4 w-4" /> View profile
            </a>
          </div>
        </motion.div>

        <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {topLanguages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="about-bento-card mb-4 p-6"
          >
            <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Top languages
            </h3>
            <LanguageBar topLanguages={topLanguages} />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="about-bento-card p-6"
        >
          <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Contribution activity
          </h3>
          {profile ? (
            <ContributionGraph color={contributionColor} />
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Contribution data is currently unavailable.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
