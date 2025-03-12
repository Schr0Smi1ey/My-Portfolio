import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  ScrollControls,
  Stats,
  useScroll,
} from "@react-three/drei";

function Model() {
  const modelRef = useRef();
  const { scene } = useGLTF(
    "/3D_Effects/earth_globe_hologram_2mb_looping_animation.glb"
  );

  useFrame(({ clock }) => {
    modelRef.current.rotation.y = clock.getElapsedTime() * 0.5;
  });

  return (
    <group ref={modelRef} position={[0, -1, 0]} scale={0.5}>
      <primitive object={scene} />
    </group>
  );
}

function OrbitalRotation() {
  const { camera } = useThree();
  const scroll = useScroll();

  useFrame(({ clock }) => {
    const angle = clock.getElapsedTime() * 0.15;
    const distance = 5 + scroll.offset * 10;

    camera.position.x = Math.sin(angle) * distance;
    camera.position.z = Math.cos(angle) * distance;
    camera.position.y = -scroll.offset * 5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Simple3DModelPage() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#1a1a1a" }}>
      <ScrollControls pages={3}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <directionalLight position={[-5, 5, 5]} intensity={0.8} />

          <Model />
          <OrbitalRotation />
          <axesHelper args={[5]} />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={15}
            enableDamping
            dampingFactor={0.05}
          />

          <Stats />
        </Canvas>
      </ScrollControls>
    </div>
  );
}
