"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { AdditiveBlending, type Group } from "three";

/**
 * Hero3D — a "digital core": two nested, counter-rotating particle spheres
 * (lime shell, violet core) with mouse parallax. Procedural — no model files.
 * Desktop-only, lazy-loaded, reduced-motion aware.
 */

/** Evenly distribute `count` points on a sphere (Fibonacci lattice). */
function spherePoints(count: number, radius: number, jitter = 0) {
  const pts = new Float32Array(count * 3);
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const j = jitter ? 1 + (Math.random() - 0.5) * jitter : 1;
    pts[i * 3] = Math.cos(theta) * r * radius * j;
    pts[i * 3 + 1] = y * radius * j;
    pts[i * 3 + 2] = Math.sin(theta) * r * radius * j;
  }
  return pts;
}

function ParticleCore({ animate }: { animate: boolean }) {
  const outer = useRef<Group>(null);
  const inner = useRef<Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const shell = useMemo(() => spherePoints(2600, 1.55, 0.04), []);
  const core = useMemo(() => spherePoints(900, 0.85, 0.35), []);

  useEffect(() => {
    if (!animate) return;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [animate]);

  useFrame((_, delta) => {
    if (!animate) return;
    const o = outer.current;
    const c = inner.current;
    if (!o || !c) return;
    o.rotation.y += delta * 0.12;
    c.rotation.y -= delta * 0.2;
    // parallax: whole scene leans toward the pointer
    o.rotation.x += (mouse.current.y * 0.3 - o.rotation.x) * 0.04;
    o.rotation.z += (mouse.current.x * 0.2 - o.rotation.z) * 0.04;
    c.rotation.x = o.rotation.x * 1.4;
  });

  return (
    <>
      <group ref={outer}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[shell, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.022}
            color="#c8f751"
            transparent
            opacity={0.85}
            sizeAttenuation
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </points>
      </group>
      <group ref={inner}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[core, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.03}
            color="#8b7cff"
            transparent
            opacity={0.7}
            sizeAttenuation
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </points>
      </group>
    </>
  );
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(true);

  // Mount only on large screens with fine pointers — a display:none canvas
  // would still burn GPU on phones, so we gate mounting in JS.
  useEffect(() => {
    const large = window.matchMedia("(min-width: 1024px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (large) {
      setMounted(true);
      setAnimate(!reduce);
    }
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Float
        enabled={animate}
        speed={1.4}
        rotationIntensity={0.15}
        floatIntensity={0.7}
      >
        <ParticleCore animate={animate} />
      </Float>
    </Canvas>
  );
}
