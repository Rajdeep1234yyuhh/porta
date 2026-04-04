/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

// ── Constants ─────────────────────────────────────────────────────────────────

const SECTIONS = [
  { label: "Home", id: "home", icon: "⌂" },
  { label: "About", id: "about", icon: "◎" },
  { label: "Projects", id: "projects", icon: "◈" },
  { label: "Services", id: "services", icon: "◇" },
  { label: "Skills", id: "skills", icon: "▲" },
  { label: "Contact", id: "contact", icon: "✉" },
];

const FACE_COLORS = [
  "#7c3aed",
  "#2563eb",
  "#059669",
  "#d97706",
  "#db2777",
  "#0891b2",
];

const FACE_POSITIONS: [number, number, number][] = [
  [0, 0, 1.01],
  [1.01, 0, 0],
  [0, 0, -1.01],
  [-1.01, 0, 0],
  [0, 1.01, 0],
  [0, -1.01, 0],
];

const FACE_ROTATIONS: [number, number, number][] = [
  [0, 0, 0],
  [0, Math.PI / 2, 0],
  [0, Math.PI, 0],
  [0, -Math.PI / 2, 0],
  [-Math.PI / 2, 0, 0],
  [Math.PI / 2, 0, 0],
];

const FACE_NORMALS = [
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0, 0, -1),
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, -1, 0),
];

// Target cube rotation to bring each face forward
const SECTION_TARGETS = [
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, Math.PI / 2, 0),
  new THREE.Euler(0, Math.PI, 0),
  new THREE.Euler(0, -Math.PI / 2, 0),
  new THREE.Euler(Math.PI / 2, 0, 0),
  new THREE.Euler(-Math.PI / 2, 0, 0),
];

// ── Background particles ──────────────────────────────────────────────────────

function Background() {
  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });
  return (
    <>
      <Stars
        ref={ref}
        radius={12}
        depth={8}
        count={600}
        factor={1.2}
        saturation={0.6}
        fade
        speed={0.6}
      />
      {/* Floating orbs */}
      <Float speed={1.2} rotationIntensity={0} floatIntensity={1.5}>
        <mesh position={[-3.5, 1.5, -4]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={0} floatIntensity={1.2}>
        <mesh position={[3.2, -1.2, -3]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#2563eb"
            emissive="#2563eb"
            emissiveIntensity={2}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0} floatIntensity={2}>
        <mesh position={[2.5, 2, -5]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#db2777"
            emissive="#db2777"
            emissiveIntensity={2}
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>
    </>
  );
}

// ── Cube ─────────────────────────────────────────────────────────────────────

function NavCube({
  activeSection,
  onNavigate,
  setIsHovered,
}: {
  activeSection: number;
  onNavigate: (id: string) => void;
  setIsHovered: (v: boolean) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const currentQuat = useRef(new THREE.Quaternion());
  const targetQuat = useRef(new THREE.Quaternion());
  const idleTime = useRef(0);
  const isHovRef = useRef(false);
  const [hoveredFace, setHoveredFace] = useState<number | null>(null);

  useEffect(() => {
    targetQuat.current.setFromEuler(SECTION_TARGETS[activeSection]);
  }, [activeSection]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    idleTime.current += delta;

    if (!isHovRef.current) {
      // Gentle idle wobble on top of target
      const wobble = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          Math.sin(idleTime.current * 0.18) * 0.06,
          idleTime.current * 0.22,
          Math.sin(idleTime.current * 0.13) * 0.04,
        ),
      );
      const goal = targetQuat.current.clone().multiply(wobble);
      // Very smooth slerp — lower factor = smoother
      groupRef.current.quaternion.slerp(goal, delta * 1.4);
    } else {
      // Smooth snap to face when hovered
      groupRef.current.quaternion.slerp(targetQuat.current, delta * 4.5);
    }
  });

  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    if (!meshRef.current || !e.face?.normal) return;
    const worldNormal = e.face.normal
      .clone()
      .transformDirection(meshRef.current.matrixWorld);
    let closest = 0,
      maxDot = -Infinity;
    FACE_NORMALS.forEach((fn, i) => {
      const d = fn.dot(worldNormal);
      if (d > maxDot) {
        maxDot = d;
        closest = i;
      }
    });
    setHoveredFace(closest);
  };

  return (
    <group ref={groupRef}>
      {/* Dark metallic body */}
      <RoundedBox
        ref={meshRef}
        args={[1.7, 1.7, 1.7]}
        radius={0.06}
        smoothness={5}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoveredFace(null)}
        onClick={(e) => {
          e.stopPropagation();
          if (hoveredFace !== null) onNavigate(SECTIONS[hoveredFace].id);
        }}
        onPointerEnter={() => {
          isHovRef.current = true;
          setIsHovered(true);
        }}
        onPointerOut={() => {
          isHovRef.current = false;
          setIsHovered(false);
        }}
        castShadow
      >
        <meshStandardMaterial color="#0d0d18" metalness={0.9} roughness={0.1} />
      </RoundedBox>

      {/* Face overlays + labels */}
      {FACE_COLORS.map((color, i) => {
        const hov = hoveredFace === i;
        return (
          <group key={i}>
            <mesh position={FACE_POSITIONS[i]} rotation={FACE_ROTATIONS[i]}>
              <planeGeometry args={[1.55, 1.55]} />
              <meshStandardMaterial
                color={hov ? "#ffffff" : color}
                transparent
                opacity={hov ? 0.28 : 0.14}
                metalness={0.2}
                roughness={0.5}
              />
            </mesh>
            <Text
              position={[
                FACE_POSITIONS[i][0] * 1.02,
                FACE_POSITIONS[i][1] * 1.02 + 0.15,
                FACE_POSITIONS[i][2] * 1.02,
              ]}
              rotation={FACE_ROTATIONS[i]}
              fontSize={0.32}
              color={hov ? "#ffffff" : color}
              anchorX="center"
              anchorY="middle"
            >
              {SECTIONS[i].icon}
            </Text>
            <Text
              position={[
                FACE_POSITIONS[i][0] * 1.02,
                FACE_POSITIONS[i][1] * 1.02 - 0.19,
                FACE_POSITIONS[i][2] * 1.02,
              ]}
              rotation={FACE_ROTATIONS[i]}
              fontSize={0.14}
              color={hov ? "#ffffff" : "rgba(255,255,255,0.55)"}
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.06}
            >
              {SECTIONS[i].label.toUpperCase()}
            </Text>
          </group>
        );
      })}

      {/* Edge glow */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.72, 1.72, 1.72)]} />
        <lineBasicMaterial color="#7c3aed" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

// ── Lights ────────────────────────────────────────────────────────────────────

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.4}
        color="#ffffff"
        castShadow
      />
      <directionalLight
        position={[-3, -2, -3]}
        intensity={0.25}
        color="#7c3aed"
      />
      <pointLight position={[2.5, 2.5, 2.5]} intensity={0.7} color="#a78bfa" />
      <pointLight position={[-2.5, -2, 1.5]} intensity={0.3} color="#60a5fa" />
    </>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────

export default function CubeNav({
  scrollToSection,
  standalone = false,
}: {
  scrollToSection: (id: string) => void;
  standalone?: boolean;
}) {
  const [activeSection, setActiveSection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      const ids = ["about", "skills", "projects", "services", "contact"];
      let current = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = i + 1;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Scroll wheel rotates through faces
  useEffect(() => {
    let lastTime = 0;
    const handler = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastTime < 400) return; // debounce
      lastTime = now;
      setActiveSection((prev) => {
        if (e.deltaY > 0) return (prev + 1) % SECTIONS.length;
        return (prev - 1 + SECTIONS.length) % SECTIONS.length;
      });
    };
    window.addEventListener("wheel", handler, { passive: true });
    return () => window.removeEventListener("wheel", handler);
  }, []);

  const handleNavigate = (id: string) => {
    if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
    else scrollToSection(id);
  };

  return (
    <>
      {/* Full-screen 3D background — pointer-events none so page stays interactive */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          display: standalone ? "none" : "block",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent", width: "100%", height: "100%" }}
        >
          <Background />
        </Canvas>
      </div>

      {/* Cube widget */}
      <div
        ref={containerRef}
        style={{
          position: standalone ? "relative" : "fixed",
          bottom: standalone ? undefined : "20px",
          left: standalone ? undefined : "50%",
          transform: standalone ? undefined : "translateX(-50%)",
          width: standalone ? "100%" : "120px",
          height: standalone ? "100%" : "120px",
          zIndex: 50,
          cursor: isHovered ? "pointer" : "default",
          filter: "drop-shadow(0 6px 28px rgba(124,58,237,0.55))",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 36 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent", width: "100%", height: "100%" }}
          shadows
        >
          <Lights />
          {standalone && <Background />}
          <NavCube
            activeSection={activeSection}
            onNavigate={handleNavigate}
            setIsHovered={setIsHovered}
          />
        </Canvas>
        <div
          style={{
            position: "absolute",
            bottom: "-18px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.55rem",
            color: "rgba(255,255,255,0.3)",
            whiteSpace: "nowrap",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          scroll to rotate · click to navigate
        </div>
      </div>
    </>
  );
}
