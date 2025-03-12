/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { FiExternalLink, FiGithub, FiArrowUpRight } from "react-icons/fi";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import KUSport from "../../../../assets/ProjectPhoto/KUSport.png";
import contest1 from "../../../../assets/ProjectPhoto/contest1.png";
import AI_image from "../../../../assets/ProjectPhoto/AI_image.jpg";
import SynergyX from "../../../../assets/ProjectPhoto/SynergyX.jpg";
import FoodResturant from "../../../../assets/ProjectPhoto/FoodResturant.jpg";
import Havenhue from "../../../../assets/ProjectPhoto/Havenhue.jpeg";
import Tourism from "../../../../assets/ProjectPhoto/TypingGame.jpg";
import { motion } from "framer-motion";

// 3D Model Component
function GryffindorRoom() {
  const { scene } = useGLTF("/3D_Effects/gryffindor_common_room.glb");
  const modelRef = useRef();

  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = clock.getElapsedTime() * 0.35;
      modelRef.current.position.y = Math.sin(clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[200, 200, 200]}
      position={[0, -2, 0]}
    />
  );
}

// Project Card Component
const ProjectCard = ({ project, direction }) => (
  <motion.div
    className="group relative bg-navy-800/80 backdrop-blur-sm rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300"
    initial={{ x: direction === "left" ? -30 : 30, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 100, damping: 20 }}
  >
    <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8">
      {/* Image Section */}
      <div className="lg:w-1/2 xl:w-1/3 relative overflow-hidden rounded-lg lg:rounded-xl">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-lg lg:rounded-xl group-hover:scale-105 transition-transform duration-500"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="lg:w-1/2 xl:w-2/3 space-y-3 md:space-y-4">
        {/* ... (keep existing ProjectCard content unchanged) ... */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <h3 className="text-xl md:text-2xl font-bold text-emerald-400">
            {project.title}
          </h3>
          <span className="px-2 md:px-3 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-xs md:text-sm">
            {project.status}
          </span>
        </div>

        <p className="text-gray-300 text-sm md:text-base">
          {project.description}
        </p>

        {/* Features */}
        {project.features && (
          <div className="space-y-1 md:space-y-2">
            <h4 className="text-emerald-400 font-semibold text-sm md:text-base">
              Key Features
            </h4>
            <ul className="grid grid-cols-1 gap-1 md:gap-2">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-400 text-sm md:text-base"
                >
                  <FiArrowUpRight className="text-emerald-400 min-w-4" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 md:gap-2">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="px-2 md:px-3 py-1 bg-navy-700 rounded-full text-xs md:text-sm text-emerald-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-2 md:mt-3">
          {project.links.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1 md:py-2 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 rounded-md lg:rounded-lg transition-colors text-sm md:text-base"
              whileHover={{ y: -2 }}
            >
              {link.type === "github" ? (
                <FiGithub className="shrink-0" />
              ) : (
                <FiExternalLink className="shrink-0" />
              )}
              <span className="truncate">{link.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// Main Projects Component
const Projects = () => {
  const projects = [
    {
      title: "KU-Sport Management System",
      image: KUSport,
      status: "Active Development",
      description:
        "Comprehensive platform for managing Khulna University's annual sports events across 29 disciplines.",
      features: [
        "Team management for 29 university disciplines",
        "Event scheduling for football, cricket, and volleyball",
        "Real-time results tracking and updates",
        "Admin dashboard with advanced controls",
        "Referee and organizer assignment system",
      ],
      tech: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Firebase",
        "Tailwind CSS",
      ],
      links: [
        {
          type: "external",
          label: "Live Demo",
          url: "https://synergyx2024.cseku.ac.bd/",
        },
        { type: "github", label: "Client Code", url: "#" },
      ],
    },
    {
      title: "Contest Hub",
      image: contest1,
      status: "Production Ready",
      description:
        "Full-featured contest management platform with payment integration and role-based access control.",
      features: [
        "Stripe payment integration",
        "Role-based access (User, Creator, Admin)",
        "Contest approval workflow",
        "User participation tracking",
        "Real-time contest updates",
      ],
      tech: [
        "React",
        "Node.js",
        "MongoDB",
        "Stripe",
        "Firebase",
        "TanStack Query",
      ],
      links: [
        {
          type: "github",
          label: "Client Code",
          url: "https://github.com/farid22022/contest-hub-client",
        },
        {
          type: "github",
          label: "Server Code",
          url: "https://github.com/farid22022/contest-hub-server",
        },
        {
          type: "external",
          label: "Live Demo",
          url: "https://contest-hub-2af37.web.app",
        },
      ],
    },
    {
      title: "AI-Powered Image Suite (Crack AI)",
      image: AI_image,
      status: "Under Development",
      description:
        "Advanced image processing platform leveraging AI for generation, editing, and enhancement.",
      features: [
        "Text-to-image generation",
        "Background removal",
        "Image upscaling",
        "Text extraction",
        "AI-powered editing tools",
      ],
      tech: [
        "React",
        "ClipDrop API",
        "Gemini AI",
        "Firebase",
        "Axios",
        "Tailwind",
      ],
      links: [
        {
          type: "github",
          label: "Client Code",
          url: "https://github.com/farid22022/ai-crack",
        },
        {
          type: "github",
          label: "Server Code",
          url: "https://github.com/farid22022/crack-ai-server",
        },
        {
          type: "external",
          label: "Live Demo",
          url: "https://ai-crack.web.app",
        },
      ],
    },
    {
      title: "SynergyX Sponsorship System",
      image: SynergyX,
      status: "Production Ready",
      description:
        "Sponsorship management platform for university events with automated approval workflows.",
      features: [
        "Company sponsorship requests",
        "Email verification system",
        "Dynamic sponsor display",
        "Admin approval dashboard",
        "Secure communication channels",
      ],
      tech: ["MERN Stack", "Nodemailer", "Firebase", "JWT", "Tailwind CSS"],
      links: [
        {
          type: "github",
          label: "Client Code",
          url: "https://github.com/farid22022/synergyx-client",
        },
        {
          type: "github",
          label: "Server Code",
          url: "https://github.com/farid22022/synergyx-server",
        },
        {
          type: "external",
          label: "Live Demo",
          url: "https://synergyx-2024.web.app/",
        },
      ],
    },
    {
      title: "Bistro Buz Food Ordering",
      image: FoodResturant,
      status: "Completed",
      description:
        "Modern restaurant management system with online ordering and payment capabilities.",
      features: [
        "Menu management system",
        "Stripe payment integration",
        "Order tracking system",
        "Admin dashboard",
        "User role management",
      ],
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Recharts", "Firebase"],
      links: [
        {
          type: "github",
          label: "Client Code",
          url: "https://github.com/farid22022/Bistro-Boss-Client",
        },
        {
          type: "github",
          label: "Server Code",
          url: "https://github.com/farid22022/Bistro-Boss-Server",
        },
        {
          type: "external",
          label: "Live Demo",
          url: "https://bistro-boss-2e70f.web.app/",
        },
      ],
    },
    {
      title: "Haven Hue Property Management",
      image: Havenhue,
      status: "Completed",
      description:
        "Comprehensive property rental platform with booking management and user dashboards.",
      features: [
        "Property listing management",
        "Booking system",
        "User dashboard",
        "Search and filtering",
        "Admin controls",
      ],
      tech: ["React", "Firebase", "Tailwind CSS", "React Query", "MongoDB"],
      links: [
        {
          type: "github",
          label: "Client Code",
          url: "https://github.com/farid22022/Home_management",
        },
        {
          type: "external",
          label: "Live Demo",
          url: "https://havenhues-3cb1f.web.app/",
        },
      ],
    },
    {
      title: "Tourism Management System",
      image: Tourism, // Update with actual image path
      status: "Under Development",
      description:
        "Platform for managing tourist spots and travel experiences with booking capabilities.",
      features: [
        "Tourist spot management",
        "Booking system",
        "User reviews and ratings",
        "Admin dashboard",
        "Search functionality",
      ],
      tech: ["MERN Stack", "JWT", "Firebase", "Tailwind CSS", "React Query"],
      links: [
        {
          type: "github",
          label: "Client Code",
          url: "https://github.com/farid22022/tourism-management-client",
        },
        {
          type: "github",
          label: "Server Code",
          url: "https://github.com/farid22022/tourism-management-server",
        },
        {
          type: "external",
          label: "Live Demo",
          url: "https://tourism-management-syste-e300e.web.app",
        },
      ],
    },
  ];

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <section className="min-h-screen p-8 lg:p-16 pt-32 relative overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Suspense
          fallback={
            <div className="text-emerald-400 loading-text">
              Loading Magical Environment...
            </div>
          }
        >
          <Canvas camera={{ position: [12, 6, 12], fov: 45 }}>
            <ambientLight intensity={0.75} color="#ffd700" />
            <pointLight
              position={[10, 10, 10]}
              intensity={1.5}
              color="#ffd700"
            />
            <pointLight
              position={[-10, 5, -10]}
              intensity={0.5}
              color="#ae0001"
            />

            <Sparkles
              count={200}
              size={2}
              speed={0.1}
              color="#ffd700"
              opacity={0.3}
              scale={[30, 30, 30]}
            />

            <GryffindorRoom />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
              maxPolarAngle={Math.PI / 2}
              minDistance={10}
              maxDistance={20}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 bg-gradient-to-b from-navy-900/90 to-navy-900/50 backdrop-blur-sm">
        {/* Particle Effects */}
        <div className="absolute inset-0">
          <Particles
            init={particlesInit}
            options={{
              particles: {
                number: { value: 30 },
                color: { value: "#34d399" },
                opacity: { value: 0.3 },
                size: { value: 2, random: true },
                move: { enable: true, speed: 1 },
                interactivity: {
                  events: { onhover: { enable: true, mode: "repulse" } },
                },
              },
            }}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              <Typewriter
                options={{
                  strings: ["Magical Creations"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore enchanted projects crafted with modern wizardry
              (technology)
            </p>
          </motion.div>

          <div className="space-y-12">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                direction={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .loading-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          color: #34d399;
        }

        @keyframes floating {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .particle-float {
          animation: floating 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Projects;
