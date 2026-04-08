/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import {
  useRef,
  useState,
  useEffect,
  Suspense,
  Component,
  ReactNode,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text, Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ── Constants ─────────────────────────────────────────────────────────────────

const SECTIONS = [
  { label: "Home", icon: "⌂", color: "#7c3aed" },
  { label: "About", icon: "◎", color: "#2563eb" },
  { label: "Projects", icon: "◈", color: "#059669" },
  { label: "Services", icon: "◇", color: "#d97706" },
  { label: "Skills", icon: "▲", color: "#db2777" },
  { label: "Contact", icon: "✉", color: "#0891b2" },
];

const FACE_POSITIONS: [number, number, number][] = [
  [0, 0, 1.52],
  [1.52, 0, 0],
  [0, 0, -1.52],
  [-1.52, 0, 0],
  [0, 1.52, 0],
  [0, -1.52, 0],
];
const FACE_ROTATIONS: [number, number, number][] = [
  [0, 0, 0],
  [0, Math.PI / 2, 0],
  [0, Math.PI, 0],
  [0, -Math.PI / 2, 0],
  [-Math.PI / 2, 0, 0],
  [Math.PI / 2, 0, 0],
];
const TARGETS = [
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, Math.PI / 2, 0),
  new THREE.Euler(0, Math.PI, 0),
  new THREE.Euler(0, -Math.PI / 2, 0),
  new THREE.Euler(Math.PI / 2, 0, 0),
  new THREE.Euler(-Math.PI / 2, 0, 0),
];
const REST_TILT = new THREE.Quaternion().setFromEuler(
  new THREE.Euler(0.06, 0.1, 0),
);

const SKILL_SYMS = ["▲", "⚛", "⬡", "◈", "⬟", "⬢"];
const SKILL_COLORS = [
  "#e2e8f0",
  "#61DAFB",
  "#96BF48",
  "#38BDF8",
  "#FFD343",
  "#68A063",
];
const FACE_DESC = [
  "",
  "Developer · AI Engineer",
  "Web & AI Projects",
  "Professional Services",
  "Tech Stack",
  "Get In Touch",
];

type CardItem = { title: string; lines: string[] };
const SECTION_CARDS: CardItem[][] = [
  [
    { title: "About", lines: ["Full Stack Dev", "AI / ML Engineer"] },
    { title: "Skills", lines: ["Next.js · React", "Shopify · Python"] },
    { title: "Stats", lines: ["25+ Projects", "2+ Yrs Exp"] },
  ],
  [
    { title: "Experience", lines: ["2+ yrs production", "web & AI apps"] },
    { title: "Education", lines: ["B.Tech", "Computer Science"] },
    { title: "Available", lines: ["Freelance & Full-time"] },
  ],
  [
    {
      title: "E-commerce",
      lines: ["Next.js · Shopify", "Headless storefront"],
    },
    { title: "AI Dashboard", lines: ["React · Python", "ML analytics"] },
    { title: "API Gateway", lines: ["Node.js · MongoDB", "REST + Auth"] },
  ],
  [
    { title: "Web Dev", lines: ["Next.js · React", "Performance first"] },
    { title: "Shopify", lines: ["Headless stores", "Custom themes"] },
    { title: "AI / ML", lines: ["Integrations", "Pipelines"] },
  ],
  [
    { title: "Frontend", lines: ["Next.js 90%", "React 95%"] },
    { title: "Backend", lines: ["Node.js 80%", "Python 75%"] },
    { title: "AI / ML", lines: ["TF 65%", "LangChain 70%"] },
  ],
  [
    { title: "Email", lines: ["rajdeepkotoky@gmail.com"] },
    { title: "GitHub", lines: ["Rajdeep1234yyuhh"] },
    { title: "LinkedIn", lines: ["linkedin.com/in/rajdeep"] },
  ],
];

// ── Error boundary for texture loading ───────────────────────────────────────

class TextureErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? this.props.fallback : this.props.children;
  }
}

// ── Skill badge — colored ring with logo (when available) or initial ──────────

const SKILL_LOGOS = [
  "/logos/nextjs.png",
  "/logos/reactjs.png",
  "/logos/shopify.png",
  "/logos/tailwind.png",
  "/logos/python.png",
  "/logos/nodejs.png",
];
const SKILL_INITIALS = ["N", "R", "S", "T", "P", "N"];
// Key changes whenever logo paths change — forces error boundary reset in dev
const LOGOS_KEY = SKILL_LOGOS.join("|");

// Load portrait once at module level — never disposed by R3F lifecycle
const photoTexture = new THREE.TextureLoader().load("/DP.jpg");
photoTexture.colorSpace = THREE.SRGBColorSpace;

// Preload logos into useTexture cache
SKILL_LOGOS.forEach((p) => useTexture.preload(p));

function SkillBadge({
  x,
  y,
  z,
  color,
  initial,
}: {
  x: number;
  y: number;
  z: number;
  color: string;
  initial: string;
}) {
  return (
    <group position={[x, y, z]}>
      <mesh>
        <circleGeometry args={[0.175, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
      <mesh position={[0, 0, 0.003]}>
        <circleGeometry args={[0.138, 48]} />
        <meshBasicMaterial color="#0a0a14" />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.115}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {initial}
      </Text>
    </group>
  );
}

function SkillBadgesWithLogos({
  y1,
  y2,
  z,
  xOffset = -0.75 - 0.38,
}: {
  y1: number;
  y2: number;
  z: number;
  xOffset?: number;
}) {
  const logos = useTexture(SKILL_LOGOS);
  return (
    <>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[xOffset + i * 0.42, y1, z]}>
          <mesh>
            <circleGeometry args={[0.175, 48]} />
            <meshBasicMaterial
              color={SKILL_COLORS[i]}
              transparent
              opacity={0.15}
            />
          </mesh>
          <mesh position={[0, 0, 0.003]}>
            <circleGeometry args={[0.138, 48]} />
            <meshBasicMaterial color="#0a0a14" />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[0.19, 0.19]} />
            <meshBasicMaterial map={logos[i]} toneMapped={false} transparent />
          </mesh>
        </group>
      ))}
      {[3, 4, 5].map((i) => (
        <group key={i} position={[xOffset + (i - 3) * 0.42, y2, z]}>
          <mesh>
            <circleGeometry args={[0.175, 48]} />
            <meshBasicMaterial
              color={SKILL_COLORS[i]}
              transparent
              opacity={0.15}
            />
          </mesh>
          <mesh position={[0, 0, 0.003]}>
            <circleGeometry args={[0.138, 48]} />
            <meshBasicMaterial color="#0a0a14" />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[0.19, 0.19]} />
            <meshBasicMaterial map={logos[i]} toneMapped={false} transparent />
          </mesh>
        </group>
      ))}
    </>
  );
}

// ── Home face ─────────────────────────────────────────────────────────────────

function HomeFaceInner({
  isActive,
  onOpen,
}: {
  isActive: boolean;
  onOpen: () => void;
}) {

  // Active face — left half: photo + badges. Right half: name/info/button.
  // Left half center x = -0.75, right half center x = +0.75
  const BX = -0.75; // badge column center
  const fallback = (
    <>
      {[0, 1, 2].map((i) => (
        <SkillBadge
          key={i}
          x={BX - 0.38 + i * 0.38}
          y={-0.72}
          z={0.006}
          color={SKILL_COLORS[i]}
          initial={SKILL_INITIALS[i]}
        />
      ))}
      {[3, 4, 5].map((i) => (
        <SkillBadge
          key={i}
          x={BX - 0.38 + (i - 3) * 0.38}
          y={-0.98}
          z={0.006}
          color={SKILL_COLORS[i]}
          initial={SKILL_INITIALS[i]}
        />
      ))}
    </>
  );

  return (
    <>
      {/* ── Left half ── */}
      {/* Purple border frame */}
      <mesh position={[-0.75, 0.42, 0.002]}>
        <planeGeometry args={[1.28, 1.66]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.18} />
      </mesh>
      {/* Portrait photo */}
      <mesh position={[-0.75, 0.42, 0.004]}>
        <planeGeometry args={[1.2, 1.58]} />
        <meshBasicMaterial map={photoTexture} toneMapped={false} />
      </mesh>
      {/* Skill badges — centered under photo, x offset from left-half center */}
      <TextureErrorBoundary key={LOGOS_KEY} fallback={fallback}>
        <Suspense fallback={fallback}>
          <SkillBadgesWithLogos
            y1={-0.72}
            y2={-1.18}
            z={0.006}
            xOffset={BX - 0.38}
          />
        </Suspense>
      </TextureErrorBoundary>

      {/* Vertical divider */}
      <mesh position={[0, 0, 0.003]}>
        <planeGeometry args={[0.004, 2.9]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.35} />
      </mesh>

      {/* ── Right half ── */}
      <Text
        position={[0.75, 1.13, 0.006]}
        fontSize={0.155}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
        maxWidth={1.3}
      >
        Rajdeep Kotoky
      </Text>
      <mesh position={[0.75, 0.89, 0.006]}>
        <planeGeometry args={[1.1, 0.003]} />
        <meshBasicMaterial color="rgba(255,255,255,0.15)" />
      </mesh>
      <Text
        position={[0.75, 0.71, 0.006]}
        fontSize={0.086}
        color="rgba(255,255,255,0.5)"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.03}
      >
        Full Stack Developer
      </Text>
      <Text
        position={[0.75, 0.57, 0.006]}
        fontSize={0.086}
        color="rgba(255,255,255,0.5)"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.03}
      >
        AI / ML Engineer
      </Text>
      <mesh position={[0.75, 0.41, 0.006]}>
        <planeGeometry args={[1.1, 0.003]} />
        <meshBasicMaterial color="rgba(255,255,255,0.08)" />
      </mesh>
      <Text
        position={[0.75, 0.17, 0.006]}
        fontSize={0.076}
        color="rgba(255,255,255,0.35)"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.28}
        lineHeight={1.8}
        textAlign="center"
      >
        {
          "Building web apps with Next.js,\nReact & Shopify.\nAI/ML integrations."
        }
      </Text>
      {(
        [
          ["25+", "Projects"],
          ["2+", "Years"],
          ["100%", "Quality"],
        ] as [string, string][]
      ).map(([v, l], i) => (
        <group key={l} position={[0.29 + i * 0.495, -0.33, 0.006]}>
          <Text
            position={[0, 0.09, 0]}
            fontSize={0.128}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {v}
          </Text>
          <Text
            position={[0, -0.09, 0]}
            fontSize={0.056}
            color="rgba(255,255,255,0.28)"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.05}
          >
            {l.toUpperCase()}
          </Text>
        </group>
      ))}
      <Text
        position={[0.75, -0.67, 0.006]}
        fontSize={0.068}
        color="rgba(255,255,255,0.2)"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        India · Open to work
      </Text>
      <group
        position={[0.75, -0.97, 0.006]}
        onClick={(e) => {
          e.stopPropagation();
          if (isActive) onOpen();
        }}
      >
        <RoundedBox args={[1.14, 0.27, 0.02]} radius={0.06} smoothness={3}>
          <meshBasicMaterial color="rgba(255,255,255,0.12)" />
        </RoundedBox>
        <Text
          position={[0, 0, 0.014]}
          fontSize={0.082}
          color="rgba(255,255,255,0.75)"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.14}
        >
          MORE INFO
        </Text>
      </group>
    </>
  );
}

// ── Other faces: icon left / label right ─────────────────────────────────────

function OtherFaceContent({
  index,
  isActive,
  onOpen,
}: {
  index: number;
  isActive: boolean;
  onOpen: () => void;
}) {
  const s = SECTIONS[index];
  const btnMat = useRef<THREE.MeshStandardMaterial>(null);
  const t = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    t.current += delta;
    if (btnMat.current && isActive)
      btnMat.current.emissiveIntensity =
        0.28 + Math.sin(t.current * 1.8) * 0.14;
  });

  // Non-active: flat face — just icon + label, no protruding door panels
  if (!isActive) {
    return (
      <>
        <Text
          position={[0, 0.22, 0.002]}
          fontSize={0.85}
          color={s.color}
          anchorX="center"
          anchorY="middle"
        >
          {s.icon}
        </Text>
        <Text
          position={[0, -0.72, 0.002]}
          fontSize={0.145}
          color="rgba(255,255,255,0.45)"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          {s.label.toUpperCase()}
        </Text>
      </>
    );
  }

  // Active face — flat, with MORE INFO button
  return (
    <>
      <Text
        position={[0, 0.28, 0.004]}
        fontSize={0.88}
        color={s.color}
        anchorX="center"
        anchorY="middle"
      >
        {s.icon}
      </Text>
      <Text
        position={[0, -0.62, 0.004]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {s.label.toUpperCase()}
      </Text>
      <mesh position={[0, -0.88, 0.004]}>
        <planeGeometry args={[1.6, 0.003]} />
        <meshBasicMaterial color={s.color} transparent opacity={0.5} />
      </mesh>
      <Text
        position={[0, -1.06, 0.004]}
        fontSize={0.09}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.6}
        textAlign="center"
      >
        {FACE_DESC[index]}
      </Text>
      <group
        position={[0, -1.28, 0.004]}
        onClick={(e) => {
          e.stopPropagation();
          if (isActive) onOpen();
        }}
      >
        <RoundedBox args={[1.1, 0.26, 0.018]} radius={0.06} smoothness={3}>
          <meshBasicMaterial color="rgba(255,255,255,0.1)" />
        </RoundedBox>
        <Text
          position={[0, 0, 0.012]}
          fontSize={0.082}
          color="rgba(255,255,255,0.7)"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
        >
          MORE INFO
        </Text>
      </group>
    </>
  );
}

// ── Info panel — slides up from below into cube position when open ────────────

function InfoPanel({
  isOpen,
  active,
  onClose,
}: {
  isOpen: boolean;
  active: number;
  onClose: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const posY = useRef({ val: -6, vel: 0 });
  const opac = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const targetY = isOpen ? 0 : -6;
    const stiffness = 220,
      damping = 22;
    const force =
      stiffness * (targetY - posY.current.val) - damping * posY.current.vel;
    posY.current.vel += force * delta;
    posY.current.val += posY.current.vel * delta;
    opac.current = THREE.MathUtils.lerp(
      opac.current,
      isOpen ? 1 : 0,
      delta * (isOpen ? 5 : 12),
    );
    ref.current.position.y = posY.current.val;
    ref.current.visible = opac.current > 0.01;
  });

  const s = SECTIONS[active];
  const cards = SECTION_CARDS[active] ?? [];

  return (
    <group ref={ref} position={[0, -6, 0]}>
      {/* Panel background */}
      <RoundedBox
        args={[3.1, 3.1, 0.12]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, -0.08]}
      >
        <meshStandardMaterial color="#10101e" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      {/* Top color bar */}
      <mesh position={[0, 1.52, 0.02]}>
        <planeGeometry args={[3.1, 0.06]} />
        <meshBasicMaterial color={s.color} />
      </mesh>
      {/* Section title */}
      <Text
        position={[0, 1.22, 0.07]}
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {s.label.toUpperCase()}
      </Text>
      <mesh position={[0, 1.0, 0.07]}>
        <planeGeometry args={[2.6, 0.003]} />
        <meshBasicMaterial color={s.color} transparent opacity={0.4} />
      </mesh>
      {/* Cards — 3 in a row */}
      {cards.slice(0, 3).map((card, i) => (
        <group key={i} position={[-1.0 + i * 1.0, 0.24, 0.07]}>
          <RoundedBox args={[0.88, 1.52, 0.06]} radius={0.07} smoothness={3}>
            <meshStandardMaterial
              color="#1a1a30"
              metalness={0.6}
              roughness={0.3}
            />
          </RoundedBox>
          <mesh position={[0, 0.73, 0.034]}>
            <planeGeometry args={[0.88, 0.04]} />
            <meshBasicMaterial color={s.color} transparent opacity={0.8} />
          </mesh>
          <Text
            position={[0, 0.52, 0.038]}
            fontSize={0.115}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.02}
            maxWidth={0.82}
            textAlign="center"
          >
            {card.title}
          </Text>
          {card.lines.map((line, j) => (
            <Text
              key={j}
              position={[0, 0.28 - j * 0.2, 0.038]}
              fontSize={0.085}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.82}
              textAlign="center"
            >
              {line}
            </Text>
          ))}
        </group>
      ))}
      {/* Close button */}
      <group
        position={[0, -1.3, 0.07]}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <RoundedBox args={[1.1, 0.28, 0.04]} radius={0.07} smoothness={3}>
          <meshStandardMaterial
            color="#1e1e36"
            metalness={0.5}
            roughness={0.4}
            emissive="#ffffff"
            emissiveIntensity={0.04}
          />
        </RoundedBox>
        <Text
          position={[0, 0, 0.026]}
          fontSize={0.095}
          color="rgba(255,255,255,0.55)"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          CLOSE ✕
        </Text>
      </group>
    </group>
  );
}

// ── 3D Background ─────────────────────────────────────────────────────────────

function Background3D() {
  const ringRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.18;
    if (ringRef.current) ringRef.current.rotation.x += delta * 0.07;
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06;
  });

  return (
    <>
      {/* Grid floor */}
      <gridHelper
        args={[60, 40, "#6d28d9", "#3b1f7a"]}
        position={[0, -5.5, 0]}
      />

      {/* Slow rotating outer ring */}
      <mesh ref={ringRef} position={[0, 0, -10]}>
        <torusGeometry args={[7.5, 0.045, 8, 120]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 0, -10]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[10, 0.03, 8, 120]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.35} />
      </mesh>

      {/* Wireframe icosahedron far back */}
      <group ref={groupRef} position={[0, 0, -14]}>
        <mesh>
          <icosahedronGeometry args={[4.5, 0]} />
          <meshBasicMaterial
            color="#a78bfa"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>

      {/* Floating orbs */}
      <Float speed={1.1} floatIntensity={2.2} rotationIntensity={0}>
        <mesh position={[-7, 3, -8]}>
          <sphereGeometry args={[0.32, 16, 16]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={2.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>
      <Float speed={0.75} floatIntensity={1.8} rotationIntensity={0}>
        <mesh position={[7, -2.5, -7]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial
            color="#2563eb"
            emissive="#2563eb"
            emissiveIntensity={2.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>
      <Float speed={1.4} floatIntensity={1.5} rotationIntensity={0}>
        <mesh position={[5, 4, -11]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial
            color="#db2777"
            emissive="#db2777"
            emissiveIntensity={3}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      {/* Background scene lights */}
      <pointLight
        position={[-8, 6, -6]}
        intensity={1.4}
        color="#7c3aed"
        distance={30}
      />
      <pointLight
        position={[8, -4, -6]}
        intensity={0.9}
        color="#2563eb"
        distance={24}
      />
      <pointLight
        position={[0, 8, -10]}
        intensity={0.7}
        color="#c4b5fd"
        distance={28}
      />
    </>
  );
}

// ── Mobile 3-D Navbar ────────────────────────────────────────────────────────

function MobileNavTile({
  section,
  index,
  isActive,
  onClick,
}: {
  section: { label: string; icon: string; color: string };
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const t = useRef(Math.random() * Math.PI * 2);

  const col = index % 3;
  const row = Math.floor(index / 3);
  const baseX = (col - 1) * 1.16;
  const baseY = row === 0 ? 0.42 : -0.42;

  useFrame((_, delta) => {
    t.current += delta;
    if (groupRef.current) {
      groupRef.current.position.x = baseX;
      groupRef.current.position.y =
        baseY + Math.sin(t.current * 0.65 + index * 0.9) * 0.022;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        isActive ? -0.14 : -0.04,
        delta * 6,
      );
    }
    if (matRef.current) {
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        isActive ? 0.32 + Math.sin(t.current * 1.6) * 0.1 : 0,
        delta * 6,
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <RoundedBox args={[1.02, 0.6, 0.11]} radius={0.07} smoothness={3}>
        <meshStandardMaterial
          ref={matRef}
          color={isActive ? section.color : "#14142a"}
          metalness={0.78}
          roughness={0.18}
          emissive={section.color}
          emissiveIntensity={0}
        />
      </RoundedBox>
      {/* top accent stripe */}
      <mesh position={[0, 0.3, 0.057]}>
        <planeGeometry args={[0.82, 0.022]} />
        <meshBasicMaterial
          color={section.color}
          transparent
          opacity={isActive ? 1 : 0.3}
        />
      </mesh>
      <Text
        position={[0, 0.09, 0.062]}
        fontSize={0.185}
        color={isActive ? "#ffffff" : section.color}
        anchorX="center"
        anchorY="middle"
      >
        {section.icon}
      </Text>
      <Text
        position={[0, -0.14, 0.062]}
        fontSize={0.082}
        color={isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)"}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {section.label.toUpperCase()}
      </Text>
    </group>
  );
}

function MobileNavScene({
  active,
  setActive,
}: {
  active: number;
  setActive: (i: number) => void;
}) {
  return (
    <>
      <ambientLight intensity={1.9} />
      <directionalLight position={[0, 5, 6]} intensity={1.3} />
      <pointLight position={[0, 1, 4]} intensity={0.7} color="#a78bfa" />
      <pointLight position={[0, -1, 3]} intensity={0.3} color="#60a5fa" />
      {SECTIONS.map((sec, i) => (
        <MobileNavTile
          key={i}
          section={sec}
          index={i}
          isActive={active === i}
          onClick={() => setActive(i)}
        />
      ))}
    </>
  );
}

// ── Cube ─────────────────────────────────────────────────────────────────────

function Cube({
  active,
  dragDelta,
  twistDelta,
  isOpen,
  onOpen,
  onClose,
}: {
  active: number;
  dragDelta: React.RefObject<{ x: number; y: number }>;
  twistDelta: React.RefObject<number>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const targetQ = useRef(new THREE.Quaternion());
  const dragQ = useRef(new THREE.Quaternion());
  // Spring state for position
  const posZ = useRef({ val: 0, vel: 0 });
  const posY = useRef({ val: 0, vel: 0 });
  // Scale punch on open
  const scaleSpring = useRef({ val: 1, vel: 0 });
  const wasOpen = useRef(false);

  useEffect(() => {
    targetQ.current.setFromEuler(TARGETS[active]);
    dragQ.current.identity();
  }, [active]);

  useFrame((_, delta) => {
    if (!groupRef.current || !dragDelta.current) return;

    if (!isOpen) {
      if (dragDelta.current.x !== 0 || dragDelta.current.y !== 0) {
        const qHoriz = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 1, 0),
          dragDelta.current.x,
        );
        const qVert = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(1, 0, 0),
          dragDelta.current.y,
        );
        dragQ.current.premultiply(qHoriz.multiply(qVert));
        dragDelta.current.x = 0;
        dragDelta.current.y = 0;
      }
      // Twist (Z rotation from two-finger rotate on mobile)
      if (twistDelta.current !== 0) {
        const qTwist = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 0, 1),
          twistDelta.current,
        );
        dragQ.current.premultiply(qTwist);
        twistDelta.current = 0;
      }
    }

    const dragLen = 1 - Math.abs(dragQ.current.w);
    const tiltS = isOpen ? 0 : Math.max(0, 1 - dragLen * 6);
    const blended = new THREE.Quaternion().slerp(REST_TILT, tiltS);
    // When opening, snap straight-on so the door effect is clean
    const goal = isOpen
      ? targetQ.current.clone()
      : targetQ.current.clone().multiply(blended).multiply(dragQ.current);
    groupRef.current.quaternion.slerp(goal, delta * (isOpen ? 8 : 2.5));

    // Scale punch when transitioning open → kick it small then spring back to 1
    if (isOpen && !wasOpen.current) {
      scaleSpring.current.val = 0.88;
      scaleSpring.current.vel = 0;
    }
    wasOpen.current = isOpen;
    const scaleForce =
      260 * (1 - scaleSpring.current.val) - 18 * scaleSpring.current.vel;
    scaleSpring.current.vel += scaleForce * delta;
    scaleSpring.current.val += scaleSpring.current.vel * delta;
    groupRef.current.scale.setScalar(scaleSpring.current.val);

    // Spring position — pushes cube back smoothly
    const tZ = isOpen ? -2.2 : 0;
    const tY = isOpen ? -0.18 : 0;
    const zForce = 180 * (tZ - posZ.current.val) - 20 * posZ.current.vel;
    const yForce = 180 * (tY - posY.current.val) - 20 * posY.current.vel;
    posZ.current.vel += zForce * delta;
    posZ.current.val += posZ.current.vel * delta;
    posY.current.vel += yForce * delta;
    posY.current.val += posY.current.vel * delta;
    groupRef.current.position.z = posZ.current.val;
    groupRef.current.position.y = posY.current.val;
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <RoundedBox args={[3, 3, 3]} radius={0.08} smoothness={6} castShadow>
        <meshStandardMaterial
          color="#22223a"
          metalness={1.0}
          roughness={0.04}
          envMapIntensity={1.2}
        />
      </RoundedBox>
      {/* Single subtle edge */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3.02, 3.02, 3.02)]} />
        <lineBasicMaterial color="#7c3aed" transparent opacity={0.35} />
      </lineSegments>

      {/* Face 0 – Home */}
      <group position={[0, 0, 1.52]}>
        <Suspense fallback={null}>
          <HomeFaceInner isActive={active === 0} onOpen={onOpen} />
        </Suspense>
      </group>

      {/* Faces 1–5 */}
      {[1, 2, 3, 4, 5].map((i) => (
        <group
          key={i}
          position={FACE_POSITIONS[i]}
          rotation={FACE_ROTATIONS[i]}
        >
          <OtherFaceContent index={i} isActive={active === i} onOpen={onOpen} />
        </group>
      ))}
    </group>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────

function Scene({
  active,
  dragDelta,
  twistDelta,
  isOpen,
  onOpen,
  onClose,
}: {
  active: number;
  dragDelta: React.RefObject<{ x: number; y: number }>;
  twistDelta: React.RefObject<number>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      {/* Key light — sharp highlight top-right */}
      <directionalLight
        position={[6, 9, 6]}
        intensity={3.5}
        castShadow
        color="#ffffff"
      />
      {/* Fill light — left side cool reflection */}
      <directionalLight position={[-6, 3, 4]} intensity={1.8} color="#c4b5fd" />
      {/* Back rim — separates cube from background */}
      <directionalLight
        position={[0, -5, -6]}
        intensity={1.2}
        color="#60a5fa"
      />
      {/* Front face fill */}
      <directionalLight position={[0, 0, 8]} intensity={1.0} color="#ffffff" />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#a78bfa" />
      <pointLight position={[-4, -3, 2]} intensity={0.6} color="#60a5fa" />
      <pointLight position={[0, 6, -4]} intensity={0.9} color="#ffffff" />
      <Background3D />

      <Cube
        active={active}
        dragDelta={dragDelta}
        twistDelta={twistDelta}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />

      <InfoPanel isOpen={isOpen} active={active} onClose={onClose} />
    </>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────

export default function CubePageClient() {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dragDelta = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const lastPinch = useRef<number | null>(null);
  const lastMidpoint = useRef<{ x: number; y: number } | null>(null);
  const lastAngle = useRef<number | null>(null);
  const twistDelta = useRef(0);
  // Track fingers by identifier so swapping indices doesn't corrupt deltas
  const fingerMap = useRef<Map<number, { x: number; y: number }>>(new Map());
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [active]);

  // Prevent page scroll on touch — must be non-passive so preventDefault works
  useEffect(() => {
    const el = canvasWrapRef.current;
    if (!el) return;
    const block = (e: TouchEvent) => e.preventDefault();
    el.addEventListener("touchmove", block, { passive: false });
    return () => {
      el.removeEventListener("touchmove", block);
    };
  }, []);

  useEffect(() => {
    let last = 0;
    const handler = (e: WheelEvent) => {
      const now = Date.now();
      if (now - last < 500) return;
      last = now;
      if (isOpen) {
        setIsOpen(false);
        return;
      }
      setActive((p) => (e.deltaY > 0 ? (p + 1) % 6 : (p - 1 + 6) % 6));
    };
    window.addEventListener("wheel", handler, { passive: true });
    return () => window.removeEventListener("wheel", handler);
  }, [isOpen]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return;
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    dragDelta.current = {
      x: (e.clientX - lastPointer.current.x) * 0.008,
      y: (e.clientY - lastPointer.current.y) * 0.008,
    };
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => {
    isDragging.current = false;
  };

  const isMobile = () => window.matchMedia("(max-width: 640px)").matches;

  const onTouchStart = (e: React.TouchEvent) => {
    if (isOpen) return;
    if (e.touches.length === 1) {
      isDragging.current = true;
      lastPointer.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      fingerMap.current.clear();
    } else if (e.touches.length === 2 && isMobile()) {
      isDragging.current = false;
      // Store by identifier so index swaps don't corrupt deltas
      fingerMap.current.set(e.touches[0].identifier, {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
      fingerMap.current.set(e.touches[1].identifier, {
        x: e.touches[1].clientX,
        y: e.touches[1].clientY,
      });
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastAngle.current = Math.atan2(dy, dx);
      lastPinch.current = Math.sqrt(dx * dx + dy * dy);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isOpen) return;
    if (e.touches.length === 1 && isDragging.current) {
      dragDelta.current = {
        x: (e.touches[0].clientX - lastPointer.current.x) * 0.012,
        y: (e.touches[0].clientY - lastPointer.current.y) * 0.012,
      };
      lastPointer.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    } else if (
      e.touches.length === 2 &&
      fingerMap.current.size === 2 &&
      isMobile()
    ) {
      let totalDx = 0,
        totalDy = 0,
        count = 0;
      // Each finger delta computed against its own last position (by identifier)
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i];
        const prev = fingerMap.current.get(t.identifier);
        if (prev) {
          totalDx += t.clientX - prev.x;
          totalDy += t.clientY - prev.y;
          count++;
        }
        // Update stored position for this finger
        fingerMap.current.set(t.identifier, { x: t.clientX, y: t.clientY });
      }
      if (count > 0) {
        dragDelta.current = {
          x: (totalDx / count) * 0.012,
          y: (totalDy / count) * 0.012,
        };
      }
      const adx = e.touches[0].clientX - e.touches[1].clientX;
      const ady = e.touches[0].clientY - e.touches[1].clientY;
      const angle = Math.atan2(ady, adx);
      if (lastAngle.current !== null) {
        let dAngle = angle - lastAngle.current;
        if (dAngle > Math.PI) dAngle -= Math.PI * 2;
        if (dAngle < -Math.PI) dAngle += Math.PI * 2;
        twistDelta.current -= dAngle * 0.7; // negated to match natural rotation
      }
      lastAngle.current = angle;
      lastPinch.current = Math.sqrt(adx * adx + ady * ady);
    }
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    lastPinch.current = null;
    lastMidpoint.current = null;
    lastAngle.current = null;
    fingerMap.current.clear();
  };

  const s = SECTIONS[active];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "radial-gradient(ellipse at 50% 50%, #2d1b6e 0%, #1a1040 35%, #0e0a2a 70%, #080618 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .cube-canvas-wrap {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 44% !important;
            height: 56% !important;
          }
          .cube-dots { display: none !important; }
          .cube-label { display: none !important; }
          .cube-back { top: 14px !important; left: 14px !important; }
          .mobile-nav-3d { display: block !important; }
        }
      `}</style>

      {/* Nav dots */}
      <div
        className="cube-dots"
        style={{
          position: "fixed",
          right: 22,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 10,
        }}
      >
        {SECTIONS.map((sec, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.2s",
              border: `1.5px solid ${active === i ? sec.color : "rgba(255,255,255,0.2)"}`,
              background: active === i ? sec.color : "transparent",
            }}
          />
        ))}
      </div>

      {/* Section label */}
      <div
        className="cube-label"
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            color: s.color,
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {s.label}
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.18)",
            fontSize: "0.58rem",
            letterSpacing: "0.1em",
            margin: "4px 0 0",
            textTransform: "uppercase",
          }}
        >
          {isOpen ? "tap CLOSE · or scroll" : "scroll · drag · tap MORE INFO"}
        </p>
      </div>

      {/* Back */}
      <a
        className="cube-back"
        href="/"
        style={{
          position: "fixed",
          top: 22,
          left: 22,
          color: "rgba(255,255,255,0.22)",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          textDecoration: "none",
          textTransform: "uppercase",
          zIndex: 10,
        }}
      >
        ← Portfolio
      </a>

      {/* Canvas */}
      <div
        ref={canvasWrapRef}
        className="cube-canvas-wrap"
        style={{
          position: "absolute",
          inset: 0,
          cursor: isOpen ? "default" : isDragging.current ? "grabbing" : "grab",
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
          camera={{ position: [0, 0, 7.2], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ position: "absolute", inset: 0, background: "transparent" }}
          shadows
        >
          <Scene
            active={active}
            dragDelta={dragDelta}
            twistDelta={twistDelta}
            isOpen={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
          />
        </Canvas>
      </div>

      {/* Mobile 3D Navbar — bottom 44%, desktop: hidden */}
      <div
        className="mobile-nav-3d"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "43%",
          display: "none",
          zIndex: 5,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(8,4,22,0.55) 18%, rgba(8,4,22,0.85) 100%)",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3.6], fov: 54 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent", width: "100%", height: "100%" }}
        >
          <MobileNavScene active={active} setActive={setActive} />
        </Canvas>
      </div>
    </div>
  );
}
