/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiCode,
  FiServer,
  FiBook,
  FiCloud,
  FiDatabase,
} from "react-icons/fi";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import {
  OrbitControls,
  useGLTF,
  Stars,
  Text,
  Cloud,
  Sparkles,
} from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";
import Banner from "./Banner/Banner";

function PostProcessing() {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();

  useEffect(() => {
    composer.current = new EffectComposer(gl);
    composer.current.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.5,
      0.5,
      0.85
    );
    composer.current.addPass(bloomPass);

    const bokehPass = new BokehPass(scene, camera, {
      focus: 0,
      aperture: 0.002,
      maxblur: 3,
    });
    composer.current.addPass(bokehPass);

    return () => {
      if (composer.current) {
        composer.current.dispose();
      }
    };
  }, [gl, scene, camera, size]);

  useFrame((_, delta) => {
    composer.current && composer.current.render(delta);
  }, 1);

  return null;
}

function Model({ setHovered }) {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const { scene, nodes } = useGLTF(
    "/3D_Effects/earth_globe_hologram_2mb_looping_animation.glb"
  );
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    if (scene && nodes) {
      setModelLoaded(true);
    }
  }, [scene, nodes]);

  useFrame(({ clock }) => {
    if (modelLoaded && earthRef.current && cloudsRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.55;
    }
  });

  if (!modelLoaded) return null;

  return (
    <group
      ref={earthRef}
      position={[0, 0, 0]}
      scale={1.5}
      rotation={[0.41, 0, 0]}
    >
      <primitive
        object={scene}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />

      {nodes?.clouds?.geometry && (
        <group ref={cloudsRef}>
          <mesh geometry={nodes.clouds.geometry}>
            <meshPhongMaterial
              color="#ffffff"
              opacity={0.95}
              transparent
              displacementScale={0.002}
            />
          </mesh>
        </group>
      )}

      <mesh scale={1.05}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#00aaff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function CameraOrbit() {
  const { camera } = useThree();
  const orbitRef = useRef({ angle: 0, distance: 5, height: 2 });
  const [target] = useState(() => new THREE.Vector3());

  useFrame(({ clock }) => {
    orbitRef.current.angle += 0.002;
    orbitRef.current.distance = 4 + Math.sin(clock.elapsedTime * 0.2) * 1;
    orbitRef.current.height = 1.5 + Math.sin(clock.elapsedTime * 0.5) * 0.5;

    camera.position.x =
      Math.sin(orbitRef.current.angle) * orbitRef.current.distance;
    camera.position.z =
      Math.cos(orbitRef.current.angle) * orbitRef.current.distance;
    camera.position.y = orbitRef.current.height;
    camera.lookAt(target);
  });

  return null;
}

function ThreeDModel() {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [gltfLoaded, setGltfLoaded] = useState(false);

  return (
    <Canvas
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
      camera={{ position: [5, 2, 0], fov: 50 }}
      onCreated={() => setLoaded(true)}
    >
      {!loaded && (
        <Text
          position={[0, 0, 0]}
          color="white"
          fontSize={0.2}
          anchorX="center"
          anchorY="middle"
        >
          Initializing Planetary System...
        </Text>
      )}

      <PostProcessing />

      <ambientLight intensity={0.6} color="#444466" />
      <directionalLight
        position={[-5, 5, 5]}
        intensity={1.5}
        color="#ffaa66"
        castShadow
      />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00aaff" />

      <Model setHovered={setHovered} />
      <Sparkles
        count={200}
        speed={0.18}
        size={2}
        color="#00aaff"
        opacity={0.5}
      />

      <CameraOrbit />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate={false}
      />

      <Stars
        radius={200}
        depth={80}
        count={8000}
        factor={6}
        saturation={0}
        fade
        speed={0.2}
      />

      {Array.from({ length: 20 }).map((_, i) => (
        <group
          key={i}
          position={[
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
          ]}
        >
          <Cloud opacity={0.15} speed={0.1} segments={40} />
        </group>
      ))}

      <mesh position={[0, 0, 0]} scale={hovered ? 1.1 : 1}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial
          color="#00aaff"
          transparent
          opacity={hovered ? 0.1 : 0}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Canvas>
  );
}

const Home = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const { ref: skillsRef, inView: skillsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: "Contest Hub",
      description:
        "Platform with integrated payment system for managing online contests",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#",
    },
    {
      title: "KU-Sports",
      description:
        "University sports management system with tournament tracking",
      tech: ["Django", "PostgreSQL", "React"],
      link: "#",
    },
    {
      title: "AI Resume Analyzer",
      description: "Smart resume evaluation tool with job recommendations",
      tech: ["Python", "NLP", "Flask", "AWS"],
      link: "#",
    },
    {
      title: "Registration Consultation Bot",
      description: "AI-powered course registration optimizer with OCR",
      tech: ["Python", "OCR", "ChatGPT API", "FastAPI"],
      link: "#",
    },
    {
      title: "Personal Chatbot Assistant",
      description:
        "AI assistant with face detection and conversational capabilities",
      tech: ["Python", "OpenCV", "TensorFlow", "Flask"],
      link: "#",
    },
    {
      title: "E-Commerce Analytics Dashboard",
      description:
        "Real-time business intelligence dashboard for online stores",
      tech: ["React", "Node.js", "MongoDB", "Chart.js"],
      link: "#",
    },
  ];

  const skills = [
    { name: "MERN Stack", icon: <FiCode />, level: 95 },
    { name: "Python", icon: <FiServer />, level: 90 },
    { name: "AWS", icon: <FiCloud />, level: 85 },
    { name: "SQL/NoSQL", icon: <FiDatabase />, level: 90 },
  ];

  const particlesInit = async (engine) => await loadFull(engine);

  return (
    <div className="bg-gradient-to-br from-navy-900 to-navy-800 relative overflow-hidden pt-10">
      {/* 3D Model Background */}
      {/* <ThreeDModel /> */}

      {/* <div className="absolute inset-0 z-0">
        <Particles
          init={particlesInit}
          options={{
            particles: {
              number: { value: 50 },
              color: { value: "#34d399" },
              move: {
                enable: true,
                speed: 1.5,
                out_mode: "bounce",
              },
              opacity: {
                value: 0.5,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.1,
                },
              },
              size: {
                value: 1,
                random: true,
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: "repulse",
                  },
                },
              },
            },
          }}
        />
      </div> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10 py-12 md:py-20">
        {/* Introduction Section */}
        <Banner></Banner>
      </div>

      {/* Global Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute block w-1 h-1 bg-emerald-400 rounded-full"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
