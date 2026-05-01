import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FiArrowDown,
  FiArrowRight,
  FiArrowUp,
  FiExternalLink,
  FiGithub,
} from "react-icons/fi";
import { DiNodejsSmall, DiReact } from "react-icons/di";
import {
  SiAppwrite,
  SiChartdotjs,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const randomRotateY = () => Math.floor(Math.random() * 17) - 8;

const calculateGap = (width) => {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 44;
  const maxGap = 76;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return maxGap;
  return (
    minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
  );
};

const ImageContainer = ({
  src,
  alt,
  outerRounding,
  innerRounding,
  outlineColor,
  hoverOutlineColor,
}) => (
  <div
    className="project-showcase-image-container relative h-full w-full"
    style={{
      borderRadius: outerRounding,
      padding: "1px",
      backgroundColor: outlineColor,
      transition: "background-color 0.3s ease-in-out",
      "--hover-outline": hoverOutlineColor,
    }}
  >
    <div
      className="relative h-full w-full overflow-hidden bg-zinc-950/10 dark:bg-black/30"
      style={{ borderRadius: innerRounding }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading="lazy"
        className="h-full w-full object-cover object-top"
      />
    </div>
  </div>
);

const quickLinkIcon = {
  "Case Study": FiArrowRight,
  Live: FiExternalLink,
  Frontend: FiGithub,
  Backend: FiGithub,
};

const getTechIcon = (label) => {
  const key = label.toLowerCase();
  if (key.includes("react")) return <DiReact className="text-sky-400" />;
  if (key.includes("typescript"))
    return <SiTypescript className="text-blue-500" />;
  if (key.includes("next"))
    return <SiNextdotjs className="text-zinc-900 dark:text-white/80" />;
  if (key.includes("tailwind"))
    return <SiTailwindcss className="text-cyan-400" />;
  if (key.includes("node")) return <DiNodejsSmall className="text-green-500" />;
  if (key.includes("express"))
    return <SiExpress className="text-zinc-700 dark:text-zinc-400" />;
  if (key.includes("mongo")) return <SiMongodb className="text-green-500" />;
  if (key.includes("firebase"))
    return <SiFirebase className="text-amber-500" />;
  if (key.includes("vercel"))
    return <SiVercel className="text-zinc-900 dark:text-white/80" />;
  if (key.includes("appwrite")) return <SiAppwrite className="text-pink-500" />;
  if (key.includes("chart")) return <SiChartdotjs className="text-rose-500" />;
  return null;
};

export const ProjectShowCase = ({
  testimonials,
  autoplay = false,
  colors = {
    name: "rgb(var(--color-primary-rgb))",
    position: "rgb(113 113 122)",
    testimony: "rgb(82 82 91)",
  },
  fontSizes = {
    name: "clamp(2rem, 5vw, 4rem)",
    position: "0.72rem",
    testimony: "1rem",
  },
  spacing = {
    top: "0",
    bottom: "0",
    lineHeight: "1.5",
    nameTop: "0",
    nameBottom: "0.35em",
    positionTop: "0",
    positionBottom: "1.2em",
    testimonyTop: "1em",
    testimonyBottom: "1.25em",
  },
  desktopVersionBottomThreshold = 900,
  mobile = {},
  imageAspectRatio = 1.37,
  outerRounding = "1.65rem",
  innerRounding = "1.45rem",
  outlineColor = "rgba(255,255,255,0.1)",
  hoverOutlineColor = "rgba(var(--color-primary-rgb),0.55)",
}) => {
  const [active, setActive] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [componentWidth, setComponentWidth] = useState(0);
  const componentRef = useRef(null);

  const currentFontSizes =
    isMobileView && mobile.fontSizes ? mobile.fontSizes : fontSizes;
  const currentSpacing = {
    ...spacing,
    ...(isMobileView && mobile.spacing ? mobile.spacing : {}),
  };

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return undefined;
    const interval = window.setInterval(handleNext, 5000);
    return () => window.clearInterval(interval);
  }, [autoplay, handleNext, testimonials.length]);

  const handleResize = useCallback(() => {
    if (!componentRef.current) return;
    setComponentWidth(componentRef.current.offsetWidth);
    setIsMobileView(
      componentRef.current.offsetWidth < desktopVersionBottomThreshold,
    );
  }, [desktopVersionBottomThreshold]);

  useEffect(() => {
    const node = componentRef.current;
    const resizeObserver = new ResizeObserver(handleResize);
    if (node) resizeObserver.observe(node);
    handleResize();
    return () => {
      if (node) resizeObserver.unobserve(node);
    };
  }, [handleResize]);

  if (!testimonials.length) return null;

  const activeItem = testimonials[active];

  return (
    <div
      ref={componentRef}
      className="w-full antialiased"
      style={{
        lineHeight: currentSpacing.lineHeight,
        paddingTop: `${currentSpacing.top}rem`,
        paddingBottom: `${currentSpacing.bottom}rem`,
      }}
    >
      <div
        className="relative grid pt-8 pb-16 max-w-7xl"
        style={{
          gridTemplateColumns: isMobileView ? "1fr" : "1.28fr 0.82fr",
          gap: `${isMobileView ? 36 : calculateGap(componentWidth)}px`,
        }}
      >
        <div className="w-full">
          <div
            className="relative"
            style={{ paddingTop: `${(1 / imageAspectRatio) * 100}%` }}
          >
            <AnimatePresence>
              {testimonials.map((testimonial, index) => {
                const activeCard = index === active;
                return (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.92,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: activeCard ? 1 : 0.44,
                      scale: activeCard ? 1 : 0.94,
                      z: activeCard ? 0 : -100,
                      rotate: activeCard ? 0 : randomRotateY(),
                      zIndex: activeCard ? 20 : testimonials.length - index,
                      y: activeCard ? [0, -34, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.92,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{ duration: 0.42, ease: "easeInOut" }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <ImageContainer
                      src={testimonial.src}
                      alt={testimonial.name}
                      outerRounding={outerRounding}
                      innerRounding={innerRounding}
                      outlineColor={outlineColor}
                      hoverOutlineColor={hoverOutlineColor}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex w-full flex-col justify-between py-2 md:py-4">
          <motion.div
            key={active}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeInOut" }}
          >
            <p className="mb-4 font-mono text-[0.6rem] font-bold uppercase tracking-[0.22em] text-primary">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </p>
            <h3
              className="font-display font-bold leading-[0.9] tracking-tight"
              style={{
                fontSize: currentFontSizes.name,
                color: colors.name,
                marginTop: currentSpacing.nameTop,
                marginBottom: currentSpacing.nameBottom,
              }}
            >
              {activeItem.name}
            </h3>
            <p
              className="font-mono font-bold uppercase tracking-[0.18em]"
              style={{
                fontSize: currentFontSizes.position,
                color: colors.position,
                marginTop: currentSpacing.positionTop,
                marginBottom: currentSpacing.positionBottom,
              }}
            >
              {activeItem.designation}
            </p>
            <motion.p
              className="max-w-xl"
              style={{
                fontSize: currentFontSizes.testimony,
                color: colors.testimony,
                marginTop: currentSpacing.testimonyTop,
                marginBottom: currentSpacing.testimonyBottom,
              }}
            >
              {activeItem.quote.split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.018 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>

            {(activeItem.techStack?.length > 0 ||
              activeItem.quickLinks?.length > 0) && (
              <div className="mt-7 grid gap-5">
                {activeItem.techStack?.length > 0 && (
                  <div>
                    <p className="mb-3 font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeItem.techStack.map((tech, index) => {
                        const Icon = getTechIcon(tech);
                        return (
                          <motion.span
                            key={tech}
                            initial={{ filter: "blur(10px)", opacity: 0, y: 6 }}
                            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.22,
                              ease: "easeInOut",
                              delay: 0.035 * index,
                            }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300/70 bg-white/70 px-2.5 py-1 font-mono text-[0.52rem] font-bold uppercase tracking-[0.12em] text-zinc-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-400"
                          >
                            {Icon && (
                              <span className="inline-grid place-items-center text-[1.5rem]">
                                {Icon}
                              </span>
                            )}
                            {tech}
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeItem.quickLinks?.length > 0 && (
                  <div>
                    <p className="mb-3 font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
                      Quick Links
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeItem.quickLinks.map((link) => {
                        const Icon =
                          quickLinkIcon[link.label] || FiExternalLink;
                        return (
                          <a
                            key={`${link.label}-${link.href}`}
                            href={link.href}
                            target={
                              link.type === "external" ? "_blank" : undefined
                            }
                            rel={
                              link.type === "external"
                                ? "noreferrer"
                                : undefined
                            }
                            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300/70 bg-white/65 px-3.5 py-2 font-mono text-[0.54rem] font-bold uppercase tracking-[0.12em] text-zinc-600 transition hover:border-primary/35 hover:text-primary dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400"
                          >
                            {link.label}
                            <Icon className="h-3 w-3" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <div className="pt-8" />
        </div>

        {testimonials.length > 1 && (
          <div className="absolute -right-8 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-4 lg:-right-12">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="grid h-12 w-12 my-10 place-items-center rounded-full border border-zinc-300/70 bg-white/80 text-zinc-800 shadow-[0_14px_38px_rgba(0,0,0,0.14)] backdrop-blur-xl transition hover:border-primary/40 hover:bg-primary hover:text-white dark:border-white/[0.1] dark:bg-white/[0.07] dark:text-white"
            >
              <FiArrowUp className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="grid h-12 w-12 my-10 place-items-center rounded-full border border-zinc-300/70 bg-white/80 text-zinc-800 shadow-[0_14px_38px_rgba(0,0,0,0.14)] backdrop-blur-xl transition hover:border-primary/40 hover:bg-primary hover:text-white dark:border-white/[0.1] dark:bg-white/[0.07] dark:text-white"
            >
              <FiArrowDown className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
