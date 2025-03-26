import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      className="bg-primary hidden lg:flex"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
        transition: "transform 0.1s linear",
      }}
    />
  );
};

export default CustomCursor;
