import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiMessageSquare, FiPlusSquare, FiLogOut, FiX, FiGrid, FiRadio, FiSettings } from "react-icons/fi";
import { FaProjectDiagram, FaBlog } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ADMIN_LINKS = [
  { label: "Messages",    path: "/dashboard/messages",     icon: <FiMessageSquare /> },
  { label: "Add project", path: "/dashboard/add-project",  icon: <FiPlusSquare /> },
  { label: "Status",      path: "/dashboard/status",       icon: <FiRadio /> },
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
      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        isActive
          ? "bg-primary/15 text-primary"
          : "text-gray-400 hover:text-white hover:bg-white/5"
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
    <div className="flex flex-col h-full py-6 px-4 gap-6">
      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-bold text-white tracking-wide">Dashboard</span>
        <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-white">
          <FiX className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest px-3 mb-2">Admin</p>
        {ADMIN_LINKS.map((item) => <SideLink key={item.path} item={item} onClick={onClose} />)}
      </div>

      <div className="h-px bg-white/8" />

      <div className="space-y-1">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest px-3 mb-2">Site</p>
        {SITE_LINKS.map((item) => <SideLink key={item.path} item={item} onClick={onClose} />)}
      </div>

      <div className="mt-auto space-y-3 px-1">
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-2">
          <span className="px-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
            Theme
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-gray-300 transition hover:border-primary/40 hover:text-primary"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 text-sm text-red-400 hover:text-red-300 transition-colors w-full"
        >
          <FiLogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-zinc-950 border-r border-white/5 min-h-screen sticky top-0">
        {content}
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={onClose} className="fixed inset-0 bg-black/60 z-40 lg:hidden" />
            <motion.aside key="drawer" initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-56 bg-zinc-950 border-r border-white/5 z-50 lg:hidden">
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;
