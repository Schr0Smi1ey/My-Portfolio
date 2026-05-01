import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiMessageSquare, FiPlusSquare, FiLogOut, FiX, FiGrid, FiSettings } from "react-icons/fi";
import { FaProjectDiagram, FaBlog } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ADMIN_LINKS = [
  { label: "Messages",    path: "/dashboard/messages",     icon: <FiMessageSquare /> },
  { label: "Projects",    path: "/dashboard/projects",     icon: <FaProjectDiagram /> },
  { label: "Add project", path: "/dashboard/add-project",  icon: <FiPlusSquare /> },
  { label: "Site content", path: "/dashboard/site-content", icon: <FiGrid /> },
  { label: "About content", path: "/dashboard/about-content", icon: <FiGrid /> },
  { label: "GitHub fallback", path: "/dashboard/github-fallbacks", icon: <FiGrid /> },
  { label: "Coding fallback", path: "/dashboard/coding-fallbacks", icon: <FiGrid /> },
  { label: "Preferences", path: "/dashboard/preferences",  icon: <FiSettings /> },
];

const SITE_LINKS = [
  { label: "Home",     path: "/",         icon: <FiHome /> },
  { label: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
  { label: "Blogs",    path: "/blogs",    icon: <FaBlog /> },
  { label: "Discuss",  path: "/discuss",  icon: <FiGrid /> },
];

const SideLink = ({ item, onClick }) => (
  <NavLink
    to={item.path}
    end={item.path === "/"}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
        isActive
          ? "border border-primary/25 bg-primary/10 text-primary shadow-[0_0_30px_rgb(var(--color-primary-rgb)/0.08)]"
          : "border border-transparent text-zinc-600 hover:border-zinc-300/70 hover:bg-white/45 hover:text-primary dark:text-zinc-400 dark:hover:border-white/10 dark:hover:bg-white/[0.04]"
      }`
    }
  >
    <span className="text-base">{item.icon}</span>
    {item.label}
  </NavLink>
);

const DashboardSidebar = ({ open, onClose }) => {
  const { signOutUser, Toast, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      Toast("Signed out successfully.", "success");
      navigate("/");
    } catch {
      Toast("Failed to sign out.", "error");
    }
  };

  const content = (
    <div className="flex h-full flex-col gap-6 px-4 py-6">
      <div className="flex items-center justify-between px-1">
        <div>
          <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.26em] text-primary">Admin</p>
          <span className="mt-1 block text-lg font-black tracking-tight text-zinc-950 dark:text-white">Dashboard</span>
        </div>
        <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-300/70 text-zinc-500 hover:text-primary dark:border-white/10 dark:text-zinc-400 lg:hidden">
          <FiX className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-1">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-600">Controls</p>
        {ADMIN_LINKS.map((item) => <SideLink key={item.path} item={item} onClick={onClose} />)}
      </div>

      <div className="h-px bg-zinc-300/70 dark:bg-white/[0.07]" />

      <div className="space-y-1">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-600">Site</p>
        {SITE_LINKS.map((item) => <SideLink key={item.path} item={item} onClick={onClose} />)}
      </div>

      <div className="mt-auto space-y-3 px-1">
        <div className="flex items-center justify-between rounded-xl border border-zinc-300/70 bg-white/45 p-2 dark:border-white/10 dark:bg-white/[0.03]">
          <span className="px-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-600">
            Theme
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-300/70 bg-white/50 text-zinc-600 transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-sm font-semibold text-red-500 transition-colors hover:border-red-500/20 hover:bg-red-500/10"
        >
          <FiLogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="relative z-20 hidden h-screen w-64 shrink-0 border-r border-zinc-300/60 bg-white/55 backdrop-blur-xl dark:border-white/[0.07] dark:bg-black/35 lg:flex lg:flex-col">
        {content}
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={onClose} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" />
            <motion.aside key="drawer" initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 top-0 z-50 w-64 border-r border-zinc-300/70 bg-white/90 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#05050a]/95 lg:hidden">
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;
