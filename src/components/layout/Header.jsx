import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../hooks";
import { NAV_ITEMS, OWNER } from "../../constants";

// ── Theme toggle ──────────────────────────────────────────────────────────────
const ThemeToggle = ({ theme, onToggle }) => (
  <button
    onClick={onToggle}
    aria-label="Toggle theme"
    className="relative w-14 h-7 flex items-center bg-gray-200 dark:bg-zinc-700 rounded-full px-1 transition-colors duration-300 shrink-0"
  >
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`w-5 h-5 rounded-full shadow-sm flex items-center justify-center ${
        theme === "dark"
          ? "bg-yellow-400 translate-x-7"
          : "bg-white translate-x-0"
      }`}
    >
      {theme === "dark" ? (
        <Moon className="w-3 h-3 text-zinc-800" />
      ) : (
        <Sun className="w-3 h-3 text-yellow-500" />
      )}
    </motion.div>
  </button>
);

// ── Circular S logo ───────────────────────────────────────────────────────────
const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5 shrink-0">
    <div className="w-9 h-9 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center shadow-sm">
      <span className="text-white dark:text-zinc-900 font-black text-lg leading-none select-none">
        S
      </span>
    </div>
    <span className="font-bold text-base text-zinc-900 dark:text-white tracking-tight hidden sm:block">
      {OWNER.name}
    </span>
  </Link>
);

// ── Nav link ──────────────────────────────────────────────────────────────────
const NavItem = ({ item, onClick }) => (
  <NavLink
    to={item.path}
    end={item.path === "/"}
    onClick={onClick}
    className={({ isActive }) =>
      `relative text-sm font-medium transition-colors duration-200 group pb-0.5 ${
        isActive
          ? "text-zinc-900 dark:text-white"
          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
      }`
    }
  >
    {({ isActive }) => (
      <>
        {item.label}
        <span
          className={`absolute -bottom-0.5 left-0 h-px bg-zinc-900 dark:bg-white transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </>
    )}
  </NavLink>
);

// ── Header ────────────────────────────────────────────────────────────────────
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useAuth();
  const { isAdmin } = useAdmin();

  const allNav = isAdmin
    ? [...NAV_ITEMS, { label: "Dashboard", path: "/dashboard" }]
    : NAV_ITEMS;

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.1 }}
        className="fixed top-0 inset-x-0 z-50 bg-[#f5f0eb]/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-black/5 dark:border-white/5"
      >
        <nav className="container mx-auto px-5 lg:px-10 h-16 flex items-center justify-between gap-6">
          {/* Left — logo */}
          <Logo />

          {/* Center — desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {allNav.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </div>

          {/* Right — theme toggle + mobile burger */}
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              className="lg:hidden p-1.5 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-64 bg-[#f5f0eb] dark:bg-zinc-950 border-l border-black/5 dark:border-white/5 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-black/5 dark:border-white/5">
                <Logo />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-4">
                {allNav.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
