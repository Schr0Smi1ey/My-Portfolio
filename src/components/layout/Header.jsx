import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Moon, Sun } from "lucide-react";
import {
  ThemeAnimationType,
  useModeAnimation,
} from "react-theme-switch-animation";
import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../hooks";
import { THEMES } from "../../constants";
import BubbleMenu from "../BubbleMenu/BubbleMenu";
import PillNav from "../PillNav/PillNav";

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
    className="group fixed left-5 top-5 z-[60] hidden items-center gap-3 text-zinc-950 dark:text-white md:left-6 lg:left-8 lg:flex"
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
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useAuth();
  const { isAdmin } = useAdmin();
  const isDark = theme === THEMES.DARK;
  const allNavItems = isAdmin
    ? [...navItems, { label: "Dashboard", path: "/dashboard" }]
    : navItems;
  const activeNavHref =
    allNavItems.find(
      (item) => item.path !== "/" && location.pathname.startsWith(item.path),
    )?.path ?? "/";
  const mobileMenuItems = [
    ...allNavItems.map((item, index) => ({
      label: item.label.toLowerCase(),
      href: item.path,
      ariaLabel: item.label,
      rotation: index % 2 === 0 ? -8 : 8,
      hoverStyles: {
        bgColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][
          index % 5
        ],
        textColor: "#ffffff",
      },
      onClick: (event) => {
        event.preventDefault();
        navigate(item.path);
      },
    })),
    {
      label: "contact",
      href: "/#contact",
      ariaLabel: "Contact",
      rotation: -8,
      hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
      onClick: (event) => {
        event.preventDefault();
        if (location.pathname !== "/") {
          navigate("/");
          window.setTimeout(() => {
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 80);
          return;
        }

        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    },
  ];

  return (
    <>
      <div className="site-header-backdrop" aria-hidden="true" />
      <Logo />

      <header className="fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 lg:block">
        <PillNav
          logo={<SKMark />}
          logoAlt="Sarafat Karim"
          items={allNavItems.map((item) => ({
            label: item.label,
            href: item.path,
            ariaLabel: item.label,
          }))}
          activeHref={activeNavHref}
          ease="power2.easeOut"
          baseColor="rgb(var(--color-primary-rgb))"
          hoveredPillTextColor="#ffffff"
          pillTextColor={isDark ? "#71717a" : "#52525b"}
          initialLoadAnimation={false}
          showLogo={false}
        />
      </header>

      <div className="lg:hidden">
        <BubbleMenu
          logo={
            <Link
              to="/"
              aria-label="Go to home"
              className="inline-flex items-center"
            >
              <SKMark className="text-zinc-950 dark:text-white" />
            </Link>
          }
          items={mobileMenuItems}
          menuAriaLabel="Toggle navigation"
          menuBg={
            isDark
              ? "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.025)), rgba(0,0,0,0.35)"
              : "linear-gradient(135deg, rgba(255,255,255,0.82), rgba(255,255,255,0.58)), rgba(255,255,255,0.64)"
          }
          menuContentColor={isDark ? "#ffffff" : "#111111"}
          useFixedPosition
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.1}
        />
        <div className="fixed right-[4.75rem] top-5 z-[61]">
          <ThemeToggleButton mobile />
        </div>
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
    </>
  );
};

export default Header;
