import { PuffLoader } from "react-spinners";
import { motion } from "framer-motion";

// ─── Spinner ──────────────────────────────────────────────────────────────────
export const Spinner = ({ size = 40, fullPage = false }) => {
  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PuffLoader color="#198068" size={size} />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-20">
      <PuffLoader color="#198068" size={size} />
    </div>
  );
};

// ─── TechBadge ────────────────────────────────────────────────────────────────
export const TechBadge = ({ label }) => (
  <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full tracking-wide">
    {label}
  </span>
);

// ─── SectionHeader ────────────────────────────────────────────────────────────
export const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <div className="text-center mb-14 space-y-3">
    {eyebrow && (
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary/70">
        {eyebrow}
      </span>
    )}
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
      {title}
    </h1>
    {subtitle && (
      <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

// ─── PageWrapper ──────────────────────────────────────────────────────────────
export const PageWrapper = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={`min-h-screen pt-28 pb-20 px-4 md:px-8 background dark:bg-black dark:bg-none dark:text-white overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

// ─── PrimaryButton ────────────────────────────────────────────────────────────
export const PrimaryButton = ({ children, className = "", ...props }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`px-6 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-sm hover:bg-primary/90 transition-colors ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

// ─── OutlineButton ────────────────────────────────────────────────────────────
export const OutlineButton = ({ children, className = "", ...props }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`px-6 py-2.5 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

// ─── Card ─────────────────────────────────────────────────────────────────────
export const Card = ({ children, className = "", hover = true }) => (
  <div
    className={`bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 rounded-2xl shadow-sm ${
      hover ? "hover:shadow-md transition-shadow duration-300" : ""
    } ${className}`}
  >
    {children}
  </div>
);

// ─── EmptyState ───────────────────────────────────────────────────────────────
export const EmptyState = ({ message = "Nothing here yet." }) => (
  <div className="text-center py-20 text-gray-400 dark:text-gray-600">
    <p className="text-lg">{message}</p>
  </div>
);

// ─── Divider ─────────────────────────────────────────────────────────────────
export const Divider = ({ label }) =>
  label ? (
    <div className="flex items-center gap-4 my-4">
      <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
      <span className="text-xs text-gray-400 uppercase tracking-widest">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
    </div>
  ) : (
    <div className="h-px bg-gray-200 dark:bg-white/10 my-4" />
  );

// ─── GoogleIcon ───────────────────────────────────────────────────────────────
export const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.67 0 6.57 1.5 8.52 3.05l6.32-6.33C34.25 2.57 29.68.5 24 .5 14.91.5 7.27 6.74 4.13 15.13l7.66 5.94C13.8 14.38 18.52 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M47.65 24.5c0-1.49-.12-2.96-.35-4.39H24v8.79h13.55c-.58 3.03-2.27 5.4-4.87 7.07l7.67 5.96C43.58 37.33 47.65 31.49 47.65 24.5z"
    />
    <path
      fill="#FBBC05"
      d="M11.77 27.02c-.57-1.67-.9-3.47-.9-5.32 0-1.85.33-3.65.9-5.32L4.13 15.13C1.48 20.03 0 24 0 24c0 2.59.65 5.03 1.8 7.24L11.77 27.02z"
    />
    <path
      fill="#34A853"
      d="M24 47.5c5.68 0 10.58-1.88 14.11-5.1l-7.67-5.96c-2.13 1.43-4.91 2.36-7.96 2.36-5.47 0-10.19-4.88-11.94-11.37l-7.66 5.94C7.27 41.26 14.91 47.5 24 47.5z"
    />
  </svg>
);

// ─── ProjectFilter ────────────────────────────────────────────────────────────
export const ProjectFilter = ({
  filters,
  active,
  onSelect,
  searchValue,
  onSearch,
}) => (
  <div className="flex flex-col sm:flex-row gap-3 mb-8">
    {/* Search */}
    <div className="relative flex-1 max-w-sm">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search projects…"
        className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
      />
    </div>

    {/* Tech filters */}
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onSelect(f)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
            active === f
              ? "bg-primary text-white border-primary"
              : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-primary/40 hover:text-primary"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  </div>
);
