import { useEffect, useState, useCallback, useContext } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { AuthContext } from "../context/AuthContext";

// ─── CustomCursor ─────────────────────────────────────────────────────────────
export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="hidden lg:block fixed w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
      style={{ left: pos.x, top: pos.y }}
    />
  );
};

export default CustomCursor;

// ─── ParticlesBackground ──────────────────────────────────────────────────────
const PARTICLE_OPTIONS_LIGHT = {
  particles: {
    number: { value: 18, density: { enable: true, value_area: 800 } },
    color: { value: "#000000" },
    shape: { type: "circle" },
    opacity: { value: 0.25 },
    size: { value: 2.5, random: true },
    line_linked: { enable: true, distance: 140, color: "#000000", opacity: 0.2, width: 0.8 },
    move: { enable: true, speed: 2.5, direction: "none", out_mode: "out" },
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
    },
  },
  retina_detect: true,
};

const PARTICLE_OPTIONS_DARK = {
  ...PARTICLE_OPTIONS_LIGHT,
  particles: {
    ...PARTICLE_OPTIONS_LIGHT.particles,
    color: { value: "#ffffff" },
    line_linked: { ...PARTICLE_OPTIONS_LIGHT.particles.line_linked, color: "#ffffff" },
  },
};

export const ParticlesBackground = () => {
  const { theme } = useContext(AuthContext);
  const init = useCallback(async (engine) => { await loadSlim(engine); }, []);
  const options = theme === "dark" ? PARTICLE_OPTIONS_DARK : PARTICLE_OPTIONS_LIGHT;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <Particles id="tsparticles" init={init} options={options} />
    </div>
  );
};
