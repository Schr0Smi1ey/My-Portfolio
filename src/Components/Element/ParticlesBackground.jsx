import { useCallback, useContext } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const { theme } = useContext(AuthContext);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: {
              value: 20,
              density: {
                enable: true,
                value_area: 700,
              },
            },
            color: {
              value: theme === "dark" ? "#ffffff" : "#000000",
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: theme === "dark" ? "#ffffff" : "#000000",
              },
            },
            opacity: {
              value: 0.4,
              anim: {
                enable: false,
              },
            },
            size: {
              value: 3,
              random: true,
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: theme === "dark" ? "#ffffff" : "#000000",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 4,
              direction: "none",
              random: false,
              out_mode: "out",
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
            },
          },
          retina_detect: true,
        }}
      />
    </div>
  );
};

export default ParticlesBackground;
