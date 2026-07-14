"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Points as ThreePoints, Group } from "three";

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
}

function stableNoise(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function ParticleField({ reducedMotion }: { reducedMotion: boolean }) {
  const pointsRef = useRef<ThreePoints>(null);
  const particles = useMemo(() => {
    const positions = new Float32Array(140 * 3);

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (stableNoise(i + 1) - 0.5) * 18;
      positions[i + 1] = (stableNoise(i + 2) - 0.5) * 12;
      positions[i + 2] = (stableNoise(i + 3) - 0.5) * 8;
    }

    return positions;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current || reducedMotion) return;

    const scroll = window.scrollY * 0.00035;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.025 + pointer.x * 0.08 + scroll;
    pointsRef.current.rotation.x = pointer.y * 0.05 - scroll * 0.4;
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled>
      <PointMaterial transparent color="#29F3C3" size={0.025} sizeAttenuation depthWrite={false} opacity={0.55} />
    </Points>
  );
}

function ParallaxObjects({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current || reducedMotion) return;

    const scroll = window.scrollY * 0.0008;
    groupRef.current.rotation.y = pointer.x * 0.18 + scroll;
    groupRef.current.rotation.x = pointer.y * 0.12;
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.35) * 0.08 - scroll * 0.8;
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.8} rotationIntensity={0.22} floatIntensity={0.25}>
        <mesh position={[-3.6, -1.1, -2.8]} rotation={[0.4, 0.7, 0.1]}>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.12} />
        </mesh>
      </Float>
      <Line
        points={[
          [-4.2, 2.4, -3.4],
          [-1.3, 1.6, -3.4],
          [1.5, 2.2, -3.4],
          [4.1, 1.2, -3.4],
        ]}
        color="#29F3C3"
        transparent
        opacity={0.18}
        lineWidth={1}
      />
    </group>
  );
}

export default function SceneCanvas() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden opacity-80 md:block" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ParticleField reducedMotion={reducedMotion} />
        <ParallaxObjects reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
