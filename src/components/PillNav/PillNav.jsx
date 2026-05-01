import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

import "./PillNav.css";

const isExternalLink = (href) =>
  href?.startsWith("http://") ||
  href?.startsWith("https://") ||
  href?.startsWith("//") ||
  href?.startsWith("mailto:") ||
  href?.startsWith("tel:") ||
  href?.startsWith("#");

const isRouterLink = (href) => href && !isExternalLink(href);

const PillNav = ({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "rgb(var(--color-primary-rgb))",
  hoveredPillTextColor = "#ffffff",
  pillTextColor = "#71717a",
  initialLoadAnimation = true,
  showLogo = true,
}) => {
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoRef = useRef(null);
  const logoTweenRef = useRef(null);
  const navItemsRef = useRef(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const { width, height } = pill.getBoundingClientRect();
        const radius = ((width * width) / 4 + height * height) / (2 * height);
        const diameter = Math.ceil(2 * radius) + 2;
        const delta =
          Math.ceil(radius - Math.sqrt(Math.max(0, radius * radius - (width * width) / 4))) + 1;
        const originY = diameter - delta;

        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label");
        const hoverLabel = pill.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: height + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const timeline = gsap.timeline({ paused: true });

        timeline.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" },
          0,
        );

        if (label) {
          timeline.to(label, { y: -(height + 8), duration: 2, ease, overwrite: "auto" }, 0);
        }

        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(height + 100), opacity: 0 });
          timeline.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = timeline;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready?.then(layout).catch(() => {});

    if (initialLoadAnimation && navItemsRef.current) {
      gsap.fromTo(
        navItemsRef.current,
        { width: 0, overflow: "hidden" },
        { width: "auto", duration: 0.6, ease },
      );
    }

    return () => window.removeEventListener("resize", layout);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (index) => {
    const timeline = tlRefs.current[index];
    if (!timeline) return;
    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = timeline.tweenTo(timeline.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (index) => {
    const timeline = tlRefs.current[index];
    if (!timeline) return;
    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = timeline.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoEnter = () => {
    const logoElement = logoRef.current;
    if (!logoElement) return;
    logoTweenRef.current?.kill();
    gsap.set(logoElement, { rotate: 0 });
    logoTweenRef.current = gsap.to(logoElement, {
      rotate: 360,
      duration: 0.24,
      ease,
      overwrite: "auto",
    });
  };

  const cssVars = {
    "--base": baseColor,
    "--hover-text": hoveredPillTextColor,
    "--pill-text": pillTextColor,
  };

  const LogoContent =
    typeof logo === "string" ? (
      <img src={logo} alt={logoAlt} />
    ) : (
      <span className="pill-logo-content" ref={logoRef}>
        {logo}
      </span>
    );

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        {showLogo && (
          <Link
            className="pill-logo"
            to={items?.[0]?.href || "/"}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
          >
            {LogoContent}
          </Link>
        )}

        <div className="pill-nav-items" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, index) => {
              const active = activeHref === item.href;
              const className = `pill${active ? " is-active" : ""}`;
              const content = (
                <>
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={(element) => {
                      circleRefs.current[index] = element;
                    }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={item.href || `item-${index}`} role="none">
                  {isRouterLink(item.href) ? (
                    <Link
                      role="menuitem"
                      to={item.href}
                      className={className}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(index)}
                      onMouseLeave={() => handleLeave(index)}
                    >
                      {content}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={className}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(index)}
                      onMouseLeave={() => handleLeave(index)}
                    >
                      {content}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default PillNav;
