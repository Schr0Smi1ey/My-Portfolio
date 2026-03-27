// components/Background.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ── Animated gradient orb ─────────────────────────────────────────────────────
const GradientOrb = ({ className, gradient, delay = 0, size = "normal" }) => {
  const sizeClasses = {
    small: "w-48 h-48",
    normal: "w-96 h-96",
    large: "w-[600px] h-[600px]",
    xlarge: "w-[800px] h-[800px]",
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${sizeClasses[size]} ${className}`}
      style={{ background: `radial-gradient(circle, ${gradient})` }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
};

// ── Main Background Component ─────────────────────────────────────────────────
const Background = ({
  children,
  className = "py-20",
  showGrid = true,
  showGridPattern = true,
  showNoise = true,
  showBottomFade = true,
  showOrbs = true,
  mouseGlow = true,
  orbColors = {
    primary: "rgba(139, 92, 246, 0.4), transparent",
    secondary: "rgba(59, 130, 246, 0.4), transparent",
    tertiary: "rgba(16, 185, 129, 0.3), transparent",
  },
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mouseGlow) return;

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseGlow]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        {showOrbs && (
          <>
            <GradientOrb
              className="-top-48 -left-48"
              gradient={orbColors.primary}
              delay={0}
              size="normal"
            />
            <GradientOrb
              className="-bottom-64 -right-64"
              gradient={orbColors.secondary}
              delay={2}
              size="large"
            />
            <GradientOrb
              className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              gradient={orbColors.tertiary}
              delay={4}
              size="small"
            />
          </>
        )}

        {/* Elegant grid pattern (original from AboutMe) */}
        {showGrid && (
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="elegant-grid"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 60 0 L 0 0 0 60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-gray-900 dark:text-white"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#elegant-grid)" />
            </svg>
          </div>
        )}

        {/* Grid pattern from CodingProfile (new) */}
        {showGridPattern && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Light mode grid */}
            <div
              className="absolute inset-0 dark:hidden"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #94a3b815 1px, transparent 1px),
                  linear-gradient(to bottom, #94a3b815 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Dark mode grid with dots */}
            <div
              className="absolute inset-0 hidden dark:block"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(96, 165, 250, 0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(96, 165, 250, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 20px 20px, rgba(96, 165, 250, 0.15) 1.5px, transparent 1.5px)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
          </div>
        )}

        {/* Noise texture for premium feel */}
        {showNoise && (
          <div
            className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        )}
      </div>

      {/* Mouse-following glow effect */}
      {mouseGlow && (
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      )}

      {/* Bottom fade gradient */}
      {showBottomFade && (
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />
      )}

      {/* Children content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Background;
