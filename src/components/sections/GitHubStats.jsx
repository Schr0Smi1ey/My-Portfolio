import { motion } from "framer-motion";
import {
  FiGithub,
  FiStar,
  FiUsers,
  FiGitBranch,
  FiBook,
} from "react-icons/fi";
import { useGitHubStats } from "../../hooks";
import { GITHUB_USERNAME, SOCIAL_LINKS } from "../../constants";

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

const StatCard = ({ icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="flex flex-col gap-1 p-5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/8 rounded-2xl"
  >
    <span className="text-primary">{icon}</span>
    <span className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
      {value}
    </span>
    <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
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
            style={{ backgroundColor: LANG_COLORS[lang] || "#198068" }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {topLanguages.map(({ lang, count }) => (
          <div key={lang} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: LANG_COLORS[lang] || "#198068" }}
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {lang}
              <span className="ml-1 text-gray-400 dark:text-gray-500">
                {((count / total) * 100).toFixed(0)}%
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContributionGraph = () => (
  <div className="w-full overflow-x-auto">
    <img
      src={`https://ghchart.rshah.org/198068/${GITHUB_USERNAME}`}
      alt="GitHub contribution graph"
      className="w-full min-w-[600px] rounded-xl dark:invert dark:opacity-80"
      loading="lazy"
    />
  </div>
);

const GitHubStats = () => {
  const { profile, topLanguages, totalStars, isLoading, error } =
    useGitHubStats();

  if (isLoading) {
    return (
      <section className="p-4 py-6 md:p-8 my-10 md:my-14">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg w-48" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 dark:bg-zinc-800 rounded-2xl"
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
    <section className="p-4 py-6 md:p-8 my-10 md:my-14 shadow-lg">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8 flex-wrap gap-3"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              🐙 GitHub Stats
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Live data from my GitHub profile
            </p>
            {error && (
              <p className="text-sm text-red-500 mt-2">{error}</p>
            )}
          </div>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:border-primary/40 hover:text-primary transition-all"
          >
            <FiGithub className="w-4 h-4" /> View profile
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
            className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/8 rounded-2xl p-6 mb-6"
          >
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
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
          className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/8 rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Contribution activity
          </h3>
          {profile ? (
            <ContributionGraph />
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Contribution data is currently unavailable.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
