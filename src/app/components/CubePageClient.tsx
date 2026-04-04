/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

const SECTIONS = [
  { label: "Home", id: "home", icon: "⌂", color: "#7c3aed" },
  { label: "About", id: "about", icon: "◎", color: "#2563eb" },
  { label: "Projects", id: "projects", icon: "◈", color: "#059669" },
  { label: "Services", id: "services", icon: "◇", color: "#d97706" },
  { label: "Skills", id: "skills", icon: "▲", color: "#db2777" },
  { label: "Contact", id: "contact", icon: "✉", color: "#0891b2" },
];

const FACE_POSITIONS: [number, number, number][] = [
  [0, 0, 1.51],
  [1.51, 0, 0],
  [0, 0, -1.51],
  [-1.51, 0, 0],
  [0, 1.51, 0],
  [0, -1.51, 0],
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
const TARGETS = [
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, Math.PI / 2, 0),
  new THREE.Euler(0, Math.PI, 0),
  new THREE.Euler(0, -Math.PI / 2, 0),
  new THREE.Euler(Math.PI / 2, 0, 0),
  new THREE.Euler(-Math.PI / 2, 0, 0),
];

function Cube({
  active,
  dragDelta,
}: {
  active: number;
  dragDelta: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const targetQ = useRef(new THREE.Quaternion());
  const dragQ = useRef(new THREE.Quaternion());
  const t = useRef(0);
  const hovered = null;

  useEffect(() => {
    targetQ.current.setFromEuler(TARGETS[active]);
    dragQ.current.identity(); // reset manual rotation on each face change
  }, [active]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    t.current += delta;

    // Apply drag delta to dragQ
    if (dragDelta.current.x !== 0 || dragDelta.current.y !== 0) {
      const qX = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        dragDelta.current.x,
      );
      const qY = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        dragDelta.current.y,
      );
      dragQ.current.multiplyQuaternions(qX, dragQ.current);
      dragQ.current.multiplyQuaternions(dragQ.current, qY);
      dragDelta.current = { x: 0, y: 0 };
    }

    // Snap to exact target — no wobble, holds face until next input
    const goal = targetQ.current.clone().multiply(dragQ.current);
    groupRef.current.quaternion.slerp(goal, delta * 4);
  });

  return (
    <group ref={groupRef}>
      <RoundedBox
        ref={meshRef}
        args={[3, 3, 3]}
        radius={0.1}
        smoothness={5}
        castShadow
      >
        <meshStandardMaterial color="#0a0a14" metalness={0.9} roughness={0.1} />
      </RoundedBox>

      {SECTIONS.map((s, i) => (
        <group key={i}>
          <mesh position={FACE_POSITIONS[i]} rotation={FACE_ROTATIONS[i]}>
            <planeGeometry args={[2.7, 2.7]} />
            <meshStandardMaterial
              color={hovered === i ? "#ffffff" : s.color}
              transparent
              opacity={hovered === i ? 0.3 : 0.12}
            />
          </mesh>
          <Text
            position={[
              FACE_POSITIONS[i][0] * 1.01,
              FACE_POSITIONS[i][1] * 1.01 + 0.3,
              FACE_POSITIONS[i][2] * 1.01,
            ]}
            rotation={FACE_ROTATIONS[i]}
            fontSize={0.6}
            color={hovered === i ? "#ffffff" : s.color}
            anchorX="center"
            anchorY="middle"
          >
            {s.icon}
          </Text>
          <Text
            position={[
              FACE_POSITIONS[i][0] * 1.01,
              FACE_POSITIONS[i][1] * 1.01 - 0.38,
              FACE_POSITIONS[i][2] * 1.01,
            ]}
            rotation={FACE_ROTATIONS[i]}
            fontSize={0.28}
            color={hovered === i ? "#ffffff" : "rgba(255,255,255,0.6)"}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
          >
            {s.label.toUpperCase()}
          </Text>
        </group>
      ))}

      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3.02, 3.02, 3.02)]} />
        <lineBasicMaterial color="#7c3aed" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

function Scene({
  active,
  dragDelta,
}: {
  active: number;
  dragDelta: React.MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
      <pointLight position={[4, 4, 4]} intensity={0.8} color="#a78bfa" />
      <pointLight position={[-4, -3, 2]} intensity={0.3} color="#60a5fa" />
      <Stars
        radius={20}
        depth={10}
        count={800}
        factor={1.5}
        saturation={0.5}
        fade
        speed={0.5}
      />
      <Float speed={1.2} floatIntensity={2}>
        <mesh position={[-6, 2, -6]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={2}
          />
        </mesh>
      </Float>
      <Float speed={0.8} floatIntensity={1.5}>
        <mesh position={[6, -2, -5]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial
            color="#2563eb"
            emissive="#2563eb"
            emissiveIntensity={2}
          />
        </mesh>
      </Float>
      <Cube active={active} dragDelta={dragDelta} />
    </>
  );
}

export default function CubePageClient() {
  const [active, setActive] = useState(0);
  const dragDelta = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const lastPinchDist = useRef<number | null>(null);

  // Scroll to rotate
  useEffect(() => {
    let last = 0;
    const handler = (e: WheelEvent) => {
      const now = Date.now();
      if (now - last < 500) return;
      last = now;
      setActive((p) => (e.deltaY > 0 ? (p + 1) % 6 : (p - 1 + 6) % 6));
    };
    window.addEventListener("wheel", handler, { passive: true });
    return () => window.removeEventListener("wheel", handler);
  }, []);

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = (e.clientX - lastPointer.current.x) * 0.008;
    const dy = (e.clientY - lastPointer.current.y) * 0.008;
    dragDelta.current = { x: dx, y: dy };
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => {
    isDragging.current = false;
  };

  // Touch drag + pinch rotate
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      lastPointer.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinchDist.current = Math.sqrt(dx * dx + dy * dy);
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging.current) {
      const dx = (e.touches[0].clientX - lastPointer.current.x) * 0.01;
      const dy = (e.touches[0].clientY - lastPointer.current.y) * 0.01;
      dragDelta.current = { x: dx, y: dy };
      lastPointer.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    } else if (e.touches.length === 2 && lastPinchDist.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Use pinch angle change as rotation
      const angle = Math.atan2(dy, dx);
      const prevAngle = Math.atan2(
        e.touches[0].clientY - e.touches[1].clientY,
        e.touches[0].clientX - e.touches[1].clientX,
      );
      dragDelta.current = { x: (dist - lastPinchDist.current) * 0.005, y: 0 };
      lastPinchDist.current = dist;
    }
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    lastPinchDist.current = null;
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#060608",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: "0 0 6px",
          }}
        >
          Portfolio Navigation
        </p>
        <h1
          style={{
            color: "white",
            fontSize: "1.3rem",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Rajdeep Kotoky
        </h1>
      </div>

      {/* Active label */}
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            color: SECTIONS[active].color,
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {SECTIONS[active].label}
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            margin: "4px 0 0",
            textTransform: "uppercase",
          }}
        >
          scroll to rotate · click to visit
        </p>
      </div>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          right: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 10,
        }}
      >
        {SECTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              border: `1.5px solid ${active === i ? s.color : "rgba(255,255,255,0.25)"}`,
              background: active === i ? s.color : "transparent",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>

      {/* Back */}
      <a
        href="/"
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.3)",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          textDecoration: "none",
          textTransform: "uppercase",
          zIndex: 10,
        }}
      >
        ← Back to Portfolio
      </a>

      {/* Canvas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          cursor: isDragging.current ? "grabbing" : "grab",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Canvas
          camera={{ position: [0, 0, 7], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ position: "absolute", inset: 0 }}
          shadows
        >
          <Scene active={active} dragDelta={dragDelta} />
        </Canvas>
      </div>
    </div>
  );
}
