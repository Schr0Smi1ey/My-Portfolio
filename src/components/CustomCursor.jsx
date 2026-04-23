import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(0, { stiffness: 220, damping: 28, mass: 0.45 });
  const y = useSpring(0, { stiffness: 220, damping: 28, mass: 0.45 });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reducedMotion || coarsePointer) return undefined;

    setEnabled(true);
    document.body.classList.add("has-cursor-follower");

    const handleMouseMove = (event) => {
      x.set(event.clientX - 18);
      y.set(event.clientY - 18);
      setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.classList.remove("has-cursor-follower");
    };
  }, [x, y]);

  if (!enabled || !visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999] h-9 w-9 rounded-full border border-red-200/35"
      style={{
        x,
        y,
        mixBlendMode: "screen",
        boxShadow:
          "0 0 22px rgba(239,68,68,0.35), inset 0 0 16px rgba(255,255,255,0.1)",
        background:
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0 8%, rgba(239,68,68,0.26) 10% 34%, rgba(249,115,22,0) 70%)",
      }}
    />
  );
};

export default CustomCursor;
