import { useState } from "react";

export const HalomotButton = ({
  gradient = "linear-gradient(135deg, rgb(var(--color-primary-rgb)), rgba(255,255,255,0.22))",
  inscription,
  onClick,
  fillWidth = false,
  fixedWidth,
  href,
  backgroundColor = "rgba(255,255,255,0.04)",
  borderWidth = "1px",
  padding,
  outerBorderRadius = "999px",
  innerBorderRadius = "999px",
  textColor = "rgb(var(--color-primary-rgb))",
  hoverTextColor = "#fff",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle = fixedWidth
    ? { width: fixedWidth, display: "inline-block" }
    : {};

  const buttonStyle = {
    margin: fillWidth || fixedWidth ? "0" : "auto",
    padding: borderWidth,
    background: gradient,
    border: 0,
    borderRadius: outerBorderRadius,
    color: textColor,
    fontWeight: 800,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    userSelect: "none",
    whiteSpace: "nowrap",
    transition: "transform .25s ease, box-shadow .25s ease",
    width: fillWidth || fixedWidth ? "100%" : "fit-content",
    boxSizing: "border-box",
    transform: isHovered ? "translateY(-1px)" : "translateY(0)",
    boxShadow: isHovered
      ? "0 0 34px rgb(var(--color-primary-rgb) / 0.22)"
      : "0 0 18px rgb(var(--color-primary-rgb) / 0.08)",
  };

  const spanStyle = {
    background: isHovered ? "transparent" : backgroundColor,
    padding: padding ?? (fillWidth || fixedWidth ? "0.82rem 0" : "0.82rem 1.35rem"),
    border: 0,
    borderRadius: innerBorderRadius,
    width: "100%",
    height: "100%",
    transition: "color .25s ease, background .25s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: isHovered ? hoverTextColor : textColor,
    fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
    fontSize: "0.62rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    boxSizing: "border-box",
    cursor: "pointer",
  };

  const handleClick = (event) => {
    event.preventDefault();
    onClick?.();
  };

  const content = (
    <span
      style={spanStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {inscription}
    </span>
  );

  if (href) {
    return fixedWidth ? (
      <div style={containerStyle}>
        <a href={href} style={buttonStyle} onClick={handleClick}>
          {content}
        </a>
      </div>
    ) : (
      <a href={href} style={buttonStyle} onClick={handleClick}>
        {content}
      </a>
    );
  }

  return fixedWidth ? (
    <div style={containerStyle}>
      <button type="button" style={buttonStyle} onClick={handleClick}>
        {content}
      </button>
    </div>
  ) : (
    <button type="button" style={buttonStyle} onClick={handleClick}>
      {content}
    </button>
  );
};
