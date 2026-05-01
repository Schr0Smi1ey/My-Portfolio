import CountUp from "../CountUp";

const parseNumericValue = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return { number: value, suffix: "" };
  }

  if (typeof value !== "string") return null;

  const match = value.trim().match(/^(-?\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const number = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(number)) return null;

  return { number, suffix: match[2] || "" };
};

const AnimatedNumber = ({
  value,
  className = "",
  duration = 1,
  delay = 0,
  separator = ",",
}) => {
  const parsed = parseNumericValue(value);

  if (!parsed) return value;

  return (
    <>
      <CountUp
        from={0}
        to={parsed.number}
        separator={separator}
        direction="up"
        duration={duration}
        delay={delay}
        className={className}
      />
      {parsed.suffix}
    </>
  );
};

export default AnimatedNumber;
