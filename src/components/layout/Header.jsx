import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import {
  ThemeAnimationType,
  useModeAnimation,
} from "react-theme-switch-animation";
import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../hooks";
import { THEMES } from "../../constants";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Blogs", path: "/blogs" },
  { label: "Discuss", path: "/discuss" },
];

const SKMark = ({ className = "" }) => (
  <span
    className={`sk-mark inline-flex items-baseline justify-center tracking-tight ${className}`}
  >
    <span>S</span>
    <span className="text-primary">K</span>
  </span>
);

const Logo = () => (
  <Link
    to="/"
    aria-label="Go to home"
    className="group fixed left-5 top-5 z-[60] flex items-center gap-3 text-zinc-950 dark:text-white md:left-6 lg:left-8"
  >
    <span className="relative grid h-11 w-11 place-items-center rounded-full border border-zinc-300/80 bg-transparent text-base font-black tracking-tight shadow-[0_0_30px_rgb(var(--color-primary-rgb)/0.12)] backdrop-blur-2xl dark:border-white/15">
      <span className="logo-orbit-dot" aria-hidden="true" />
      <SKMark />
    </span>
    <span className="hidden font-mono text-xs font-bold tracking-tight sm:block">
      Sarafat <span className="text-primary">Karim</span>
    </span>
  </Link>
);

const ThemeToggleButton = ({ mobile = false }) => {
  const { theme, setTheme } = useAuth();
  const isDark = theme === THEMES.DARK;
  const { ref, toggleSwitchTheme } = useModeAnimation({
    animationType: ThemeAnimationType.BLUR_CIRCLE,
    duration: 750,
    easing: "ease-in-out",
    isDarkMode: isDark,
    onDarkModeChange: (nextIsDark) => {
      setTheme(nextIsDark ? THEMES.DARK : THEMES.LIGHT);
    },
  });

  if (mobile) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={toggleSwitchTheme}
        aria-label="Toggle theme"
        className="grid h-10 w-10 place-items-center rounded-full border border-zinc-300/80 bg-transparent text-zinc-800 transition hover:border-primary/50 hover:text-primary dark:border-white/15 dark:text-zinc-200 dark:hover:text-white"
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggleSwitchTheme}
      aria-label="Toggle theme"
      className="grid h-9 w-9 place-items-center rounded-full border border-zinc-300/80 bg-transparent text-primary shadow-[0_0_32px_rgb(var(--color-primary-rgb)/0.12)] backdrop-blur-2xl transition hover:border-primary/50 dark:border-white/15 dark:hover:text-white"
    >
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAdmin();
  const allNavItems = isAdmin
    ? [...navItems, { label: "Dashboard", path: "/dashboard" }]
    : navItems;

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <Logo />

      <motion.header
        initial={{ x: "-50%", y: -28, opacity: 0 }}
        animate={{ x: "-50%", y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-1/2 top-5 z-50 hidden w-auto max-w-[500px] lg:block lg:w-auto lg:max-w-none"
      >
        <nav className="cosmic-nav rounded-full border border-white/12 bg-black/35 p-1 shadow-[0_0_54px_rgba(255,255,255,0.05)] backdrop-blur-2xl">
          <div className="hidden items-center gap-1 lg:flex">
            {allNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-5 py-2 font-mono text-[0.7rem] font-bold transition ${
                    isActive
                      ? "text-primary shadow-[inset_0_0_0_1px_rgb(var(--color-primary-rgb)/0.28),0_0_30px_rgb(var(--color-primary-rgb)/0.12)]"
                      : "text-zinc-600 hover:text-primary dark:text-zinc-500 dark:hover:text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="header-active-pill"
                        className="absolute inset-0 rounded-full bg-primary/10"
                        transition={{
                          type: "spring",
                          bounce: 0.18,
                          duration: 0.55,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      </motion.header>

      <div
        className={`fixed right-5 top-5 z-[60] flex items-center gap-3 transition-opacity duration-200 md:right-6 lg:hidden ${
          menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <ThemeToggleButton mobile />
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/25 text-zinc-200 shadow-[0_0_32px_rgb(var(--color-primary-rgb)/0.12)] backdrop-blur-2xl transition hover:border-primary/40 hover:text-white"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="fixed right-5 top-5 z-[60] hidden items-center gap-3.5 lg:flex">
        <a
          href="#contact"
          className="header-contact-button group inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/10 px-5 py-2.5 font-mono text-[0.72rem] font-bold text-primary shadow-[0_0_40px_rgb(var(--color-primary-rgb)/0.16)] backdrop-blur-2xl transition hover:border-primary/55 hover:bg-primary/10"
        >
          Contact Me
          <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" />
        </a>

        <ThemeToggleButton />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] lg:hidden"
            />

            <motion.aside
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 32 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="cosmic-mobile-menu fixed bottom-4 right-4 top-4 z-50 flex w-[min(22rem,calc(100vw-2rem))] flex-col rounded-[1.75rem] border border-white/10 bg-[#08080d]/95 p-4 text-white shadow-2xl shadow-black/70 backdrop-blur-2xl lg:hidden"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="w-10" />
                <div className="flex items-center gap-3">
                  <ThemeToggleButton mobile />
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-200 transition hover:border-primary/40 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid gap-2">
                {allNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3 font-mono text-xs font-bold transition ${
                        isActive
                          ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgb(var(--color-primary-rgb)/0.22)]"
                          : "text-zinc-300 hover:bg-white/[0.06] hover:text-primary"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-mono text-xs font-bold text-white"
                >
                  Contact Me
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
