/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useContact } from "../context/ContactContext";
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
import { allProjects } from "../data/projects";
import { allServices } from "../data/services";

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
  new THREE.Euler(0, -Math.PI / 2, 0),
  new THREE.Euler(0, Math.PI, 0),
  new THREE.Euler(0, Math.PI / 2, 0),
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

const SKILLS_DATA = [
  { name: "React",      level: 0.95, color: "#61DAFB" },
  { name: "Next.js",    level: 0.90, color: "#e2e8f0" },
  { name: "Tailwind",   level: 0.95, color: "#38BDF8" },
  { name: "Node.js",    level: 0.80, color: "#68A063" },
  { name: "Shopify",    level: 0.85, color: "#96BF48" },
  { name: "Python",     level: 0.75, color: "#FFD343" },
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
  // The contact cards come from the saved contact details (see InfoPanel)
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

// Preload into useTexture cache so texture survives face switches
useTexture.preload("/DP.jpg");
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

function HomeFaceInner() {
  const photoTexture = useTexture("/DP.jpg");

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
      <group position={[0.75, -0.97, 0.006]}>
        {/* 3D body — raised slab */}
        <RoundedBox args={[1.14, 0.27, 0.055]} radius={0.055} smoothness={4}>
          <meshStandardMaterial
            color="#1a0a30"
            metalness={0.7}
            roughness={0.25}
            emissive="#7c3aed"
            emissiveIntensity={0.18}
          />
        </RoundedBox>
        {/* Top face colour overlay */}
        <mesh position={[0, 0, 0.029]}>
          <planeGeometry args={[1.1, 0.23]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.22} />
        </mesh>
        {/* Top edge highlight */}
        <mesh position={[0, 0.105, 0.029]}>
          <planeGeometry args={[1.1, 0.006]} />
          <meshBasicMaterial color="#c4b5fd" transparent opacity={0.55} />
        </mesh>
        <Text
          position={[0, 0, 0.036]}
          fontSize={0.082}
          color="#ffffff"
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

// ── Shared face header ────────────────────────────────────────────────────────

function FaceHeader({ label, title, color }: { label: string; title: string; color: string }) {
  return (
    <>
      <Text position={[0, 1.21, 0.004]} fontSize={0.068} color={color} anchorX="center" anchorY="middle" letterSpacing={0.18}>
        {label}
      </Text>
      <Text position={[0, 1.03, 0.004]} fontSize={0.165} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.02}>
        {title}
      </Text>
    </>
  );
}

// ── About face ────────────────────────────────────────────────────────────────

function AboutFaceActive() {
  const s = SECTIONS[1];
  const stack = [
    { name: "Next.js",    color: "#e2e8f0" },
    { name: "React",      color: "#61DAFB" },
    { name: "Shopify",    color: "#96BF48" },
    { name: "Node.js",    color: "#68A063" },
    { name: "Python",     color: "#FFD343" },
    { name: "TypeScript", color: "#3178C6" },
  ];
  return (
    <>
      <FaceHeader label="ABOUT" title="Who I Am" color={s.color} />
      <Text position={[0, 0.67, 0.004]} fontSize={0.095} color="#a78bfa" anchorX="center" anchorY="middle" maxWidth={2.6} textAlign="center">
        Full Stack Developer · AI/ML Engineer
      </Text>
      <Text position={[0, 0.42, 0.004]} fontSize={0.082} color="#94a3b8" anchorX="center" anchorY="middle" maxWidth={2.6} lineHeight={1.8} textAlign="center">
        {"Building web apps with Next.js,\nReact & Shopify — plus AI/ML\nintegrations. Based in India."}
      </Text>
      {/* Stats */}
      {([ ["2+", "Yrs Exp"], ["25+", "Projects"], ["18+", "Stores"] ] as [string, string][]).map(([v, l], i) => (
        <group key={l} position={[-0.87 + i * 0.87, -0.15, 0.004]}>
          <mesh position={[0, 0, -0.002]}>
            <planeGeometry args={[0.78, 0.58]} />
            <meshBasicMaterial color={s.color} transparent opacity={0.07} />
          </mesh>
          <Text position={[0, 0.1, 0.005]} fontSize={0.17} color="#ffffff" anchorX="center" anchorY="middle">{v}</Text>
          <Text position={[0, -0.12, 0.005]} fontSize={0.058} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.05}>
            {l.toUpperCase()}
          </Text>
        </group>
      ))}
      <Text position={[0, -0.58, 0.004]} fontSize={0.072} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.04}>
        India · B.Tech CS · Open to work
      </Text>
      <mesh position={[0, -0.74, 0.004]}>
        <planeGeometry args={[2.5, 0.003]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
      </mesh>
      <Text position={[0, -0.88, 0.004]} fontSize={0.062} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.14}>
        CORE STACK
      </Text>
      {stack.slice(0, 3).map((sk, i) => (
        <group key={sk.name} position={[-0.87 + i * 0.87, -1.06, 0.004]}>
          <mesh position={[0, 0, -0.002]}>
            <planeGeometry args={[0.8, 0.22]} />
            <meshBasicMaterial color={sk.color} transparent opacity={0.1} />
          </mesh>
          <Text position={[0, 0, 0.005]} fontSize={0.073} color={sk.color} anchorX="center" anchorY="middle">{sk.name}</Text>
        </group>
      ))}
      {stack.slice(3).map((sk, i) => (
        <group key={sk.name} position={[-0.87 + i * 0.87, -1.27, 0.004]}>
          <mesh position={[0, 0, -0.002]}>
            <planeGeometry args={[0.8, 0.22]} />
            <meshBasicMaterial color={sk.color} transparent opacity={0.1} />
          </mesh>
          <Text position={[0, 0, 0.005]} fontSize={0.073} color={sk.color} anchorX="center" anchorY="middle">{sk.name}</Text>
        </group>
      ))}
    </>
  );
}

// ── Projects face ─────────────────────────────────────────────────────────────

// ── 3-D project card ─────────────────────────────────────────────────────────

function ProjectCard3D({
  project,
  yPos,
  index,
}: {
  project: (typeof allProjects)[number];
  yPos: number;
  index: number;
}) {
  const cardRef  = useRef<THREE.Group>(null);
  const glowRef  = useRef<THREE.Mesh>(null);
  const liftZ    = useRef(0);
  const glowO    = useRef(0);
  const [hovered, setHovered] = useState(false);

  const isShopify   = project.categories.includes("Shopify");
  const accent      = isShopify ? "#10b981" : "#8b5cf6";
  const accentDark  = isShopify ? "#059669" : "#7c3aed";
  const num         = String(index + 1).padStart(2, "0");
  const shortTitle  = project.title.length > 32 ? project.title.slice(0, 30) + "…" : project.title;

  useFrame((_, delta) => {
    liftZ.current  = THREE.MathUtils.lerp(liftZ.current,  hovered ? 0.03  : 0,    delta * 12);
    glowO.current  = THREE.MathUtils.lerp(glowO.current,  hovered ? 0.28  : 0.05, delta * 12);
    if (cardRef.current)  cardRef.current.position.z  = 0.004 + liftZ.current;
    if (glowRef.current)  (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowO.current;
  });

  return (
    <group ref={cardRef} position={[0, yPos, 0.004]}>
      {/* Glow border — brightens on hover */}
      <mesh ref={glowRef} position={[0, 0, -0.004]}>
        <planeGeometry args={[2.58, 0.48]} />
        <meshBasicMaterial color={accentDark} transparent opacity={0.05} />
      </mesh>

      {/* Card body */}
      <RoundedBox
        args={[2.54, 0.44, 0.05]}
        radius={0.04}
        smoothness={4}
        onClick={(e) => {
          e.stopPropagation();
          if (typeof window !== "undefined") window.open(project.demo, "_blank");
        }}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); }}
      >
        <meshStandardMaterial color="#0d0d22" metalness={0.2} roughness={0.7} />
      </RoundedBox>

      {/* Ghost index number */}
      <Text
        position={[-1.0, 0, 0.029]}
        fontSize={0.13}
        color={accentDark}
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.22}
      >
        {num}
      </Text>

      {/* Title */}
      <Text
        position={[-0.6, 0.1, 0.029]}
        fontSize={0.094}
        color="#f8fafc"
        anchorX="left"
        anchorY="middle"
        maxWidth={1.75}
        letterSpacing={-0.01}
      >
        {shortTitle}
      </Text>

      {/* Tech row */}
      <Text
        position={[-0.6, -0.1, 0.029]}
        fontSize={0.06}
        color="rgba(148,163,184,0.72)"
        anchorX="left"
        anchorY="middle"
        maxWidth={1.6}
        letterSpacing={0.01}
      >
        {project.tech.slice(0, 4).join("  ·  ")}
      </Text>

      {/* Arrow circle */}
      <mesh position={[1.13, 0, 0.029]}>
        <circleGeometry args={[0.145, 48]} />
        <meshBasicMaterial color={accentDark} transparent opacity={hovered ? 0.85 : 0.14} />
      </mesh>
      <Text
        position={[1.13, 0, 0.033]}
        fontSize={0.1}
        color={hovered ? "#ffffff" : accent}
        anchorX="center"
        anchorY="middle"
      >
        →
      </Text>
    </group>
  );
}

function ProjectsFaceActive() {
  const s = SECTIONS[2];
  const [tab,  setTab]  = useState<"tech" | "shopify">("tech");
  const [page, setPage] = useState(0);

  const indicatorRef = useRef<THREE.Mesh>(null);
  const indicatorX   = useRef(-0.65);

  const techProjects    = allProjects.filter((p) => !p.categories.includes("Shopify"));
  const shopifyProjects = allProjects.filter((p) =>  p.categories.includes("Shopify"));
  const projects    = tab === "tech" ? techProjects : shopifyProjects;
  const perPage     = 3;
  const totalPages  = Math.ceil(projects.length / perPage);
  const current     = projects.slice(page * perPage, (page + 1) * perPage);
  const accent      = tab === "tech" ? "#7c3aed" : "#059669";

  const cardYPositions = [0.27, -0.23, -0.73];

  // Slide the tab underline indicator smoothly
  useFrame((_, delta) => {
    const targetX = tab === "tech" ? -0.65 : 0.65;
    indicatorX.current = THREE.MathUtils.lerp(indicatorX.current, targetX, delta * 14);
    if (indicatorRef.current) indicatorRef.current.position.x = indicatorX.current;
  });

  return (
    <>
      <FaceHeader label="PROJECTS" title="Featured Work" color={s.color} />


      {/* ── Tech tab hitbox + label ── */}
      <group position={[-0.65, 0.648, 0.004]}>
        <mesh onClick={(e) => { e.stopPropagation(); setTab("tech"); setPage(0); }}>
          <planeGeometry args={[1.2, 0.19]} />
          <meshBasicMaterial transparent opacity={0.001} />
        </mesh>
        <Text position={[0, 0, 0.003]} fontSize={0.076}
          color={tab === "tech" ? "#ffffff" : "rgba(255,255,255,0.25)"}
          anchorX="center" anchorY="middle" letterSpacing={0.02}>
          {`Tech  ·  ${techProjects.length}`}
        </Text>
      </group>

      {/* ── Shopify tab hitbox + label ── */}
      <group position={[0.65, 0.648, 0.004]}>
        <mesh onClick={(e) => { e.stopPropagation(); setTab("shopify"); setPage(0); }}>
          <planeGeometry args={[1.2, 0.19]} />
          <meshBasicMaterial transparent opacity={0.001} />
        </mesh>
        <Text position={[0, 0, 0.003]} fontSize={0.076}
          color={tab === "shopify" ? "#ffffff" : "rgba(255,255,255,0.25)"}
          anchorX="center" anchorY="middle" letterSpacing={0.02}>
          {`Shopify  ·  ${shopifyProjects.length}`}
        </Text>
      </group>

      {/* ── Animated underline indicator ── */}
      <mesh ref={indicatorRef} position={[-0.65, 0.548, 0.006]}>
        <planeGeometry args={[0.95, 0.018]} />
        <meshBasicMaterial color={accent} />
      </mesh>

      {/* ── Project rows ── */}
      {current.map((p, i) => (
        <ProjectCard3D key={p.id} project={p} yPos={cardYPositions[i]} index={page * perPage + i} />
      ))}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <>
          {/* Prev arrow */}
          <group position={[-1.05, -1.2, 0.004]}
            onClick={(e) => { e.stopPropagation(); setPage((v) => Math.max(0, v - 1)); }}>
            <mesh>
              <planeGeometry args={[0.18, 0.18]} />
              <meshBasicMaterial transparent opacity={0.001} />
            </mesh>
            <Text position={[0, 0, 0.003]} fontSize={0.1}
              color={page > 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.15)"}
              anchorX="center" anchorY="middle">
              ←
            </Text>
          </group>

          {/* Page counter */}
          <Text position={[0, -1.2, 0.004]} fontSize={0.07}
            color="rgba(255,255,255,0.35)" anchorX="center" anchorY="middle" letterSpacing={0.1}>
            {`${page + 1}  of  ${totalPages}`}
          </Text>

          {/* Next arrow */}
          <group position={[1.05, -1.2, 0.004]}
            onClick={(e) => { e.stopPropagation(); setPage((v) => Math.min(totalPages - 1, v + 1)); }}>
            <mesh>
              <planeGeometry args={[0.18, 0.18]} />
              <meshBasicMaterial transparent opacity={0.001} />
            </mesh>
            <Text position={[0, 0, 0.003]} fontSize={0.1}
              color={page < totalPages - 1 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.15)"}
              anchorX="center" anchorY="middle">
              →
            </Text>
          </group>
        </>
      )}
    </>
  );
}

// ── Services face ─────────────────────────────────────────────────────────────

const SVC_COLORS = ["#7c3aed", "#10b981", "#3b82f6", "#6366f1", "#f59e0b", "#14b8a6"];
const SVC_SYMBOLS: Record<string, string> = {
  layers: "⬡", monitor: "◫", shoppingBag: "◈", globe: "◎", bot: "⚙", cpu: "△",
};

function ServiceCard3D({
  svc, color, symbol, x, y, onClick,
}: {
  svc: (typeof allServices)[number]; color: string; symbol: string;
  x: number; y: number; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const W = 1.24, H = 0.46;
  return (
    <group
      position={[x, y, 0.004]}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={(e) => { e.stopPropagation(); setHov(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHov(false); }}
    >
      <mesh>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial color="#111827" transparent opacity={hov ? 0.88 : 0.65} />
      </mesh>
      <mesh position={[-(W / 2 - 0.003), 0, 0.001]}>
        <planeGeometry args={[0.006, H]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Text position={[-0.44, 0.04, 0.003]} fontSize={0.19} color={color} anchorX="center" anchorY="middle">
        {symbol}
      </Text>
      <Text position={[-0.24, 0.11, 0.003]} fontSize={0.080} color="#f3f4f6" anchorX="left" anchorY="middle" maxWidth={0.9}>
        {svc.title}
      </Text>
      <Text position={[-0.24, -0.08, 0.003]} fontSize={0.057} color="#64748b" anchorX="left" anchorY="middle" maxWidth={0.84} lineHeight={1.3}>
        {svc.shortDescription.length > 55 ? svc.shortDescription.slice(0, 53) + "…" : svc.shortDescription}
      </Text>
      <Text position={[0.54, 0.04, 0.003]} fontSize={0.13} color={color} anchorX="right" anchorY="middle">
        {hov ? "→" : "›"}
      </Text>
    </group>
  );
}

// Detail panel uses renderOrder to guarantee it always paints over the face.
// Cards are NOT rendered while this is mounted, so there is nothing to fight.
function ServiceDetailPanel({
  svc, color, symbol, onBack,
}: {
  svc: (typeof allServices)[number]; color: string; symbol: string; onBack: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const sc = useRef(0.001);
  const vsc = useRef(0);

  // Scale spring from near-zero to 1
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.05);
    vsc.current += (18 * (1 - sc.current) - 9 * vsc.current) * dt;
    sc.current = Math.min(1, sc.current + vsc.current * dt);
    groupRef.current.scale.setScalar(sc.current);
  });

  // Walk all Three.js objects in this group and force renderOrder=1000 +
  // depthTest=false so they always paint over everything in the scene.
  // Runs for the first 30 frames to catch lazily-created Text meshes.
  const framesRef = useRef(0);
  useFrame(() => {
    if (framesRef.current >= 30 || !groupRef.current) return;
    framesRef.current++;
    groupRef.current.traverse((obj) => {
      obj.renderOrder = 1000;
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => { (m as THREE.Material).depthTest = false; });
      }
    });
  });

  const desc = svc.fullDescription.length > 155
    ? svc.fullDescription.slice(0, 153) + "…"
    : svc.fullDescription;
  const features = svc.features.slice(0, 4);
  const techs = svc.technologies.slice(0, 5);
  const tw = 0.44, tgap = 0.06;
  const techStartX = -((techs.length - 1) * (tw + tgap)) / 2;

  return (
    <group ref={groupRef} scale={0.001}>
      {/* Back button */}
      <group position={[-1.15, 1.20, 0.004]}>
        <mesh position={[0.18, 0, 0]}>
          <planeGeometry args={[0.56, 0.24]} />
          <meshBasicMaterial color="#1e1b4b" />
        </mesh>
        <mesh position={[0.18, 0, 0.001]} onClick={(e) => { e.stopPropagation(); onBack(); }}>
          <planeGeometry args={[0.56, 0.24]} />
          <meshBasicMaterial transparent opacity={0.001} />
        </mesh>
        <Text position={[0.18, 0, 0.002]} fontSize={0.080} color="#a5b4fc" anchorX="center" anchorY="middle">
          ← Back
        </Text>
      </group>

      {/* Icon + Title + Short desc */}
      <Text position={[-1.05, 0.91, 0.004]} fontSize={0.26} color={color} anchorX="center" anchorY="middle">
        {symbol}
      </Text>
      <Text position={[-0.65, 0.97, 0.004]} fontSize={0.110} color="#ffffff" anchorX="left" anchorY="middle" maxWidth={1.7}>
        {svc.title}
      </Text>
      <Text position={[-0.65, 0.79, 0.004]} fontSize={0.064} color="#94a3b8" anchorX="left" anchorY="middle" maxWidth={1.7}>
        {svc.shortDescription.length > 65 ? svc.shortDescription.slice(0, 63) + "…" : svc.shortDescription}
      </Text>

      {/* Divider */}
      <mesh position={[0, 0.63, 0.004]}>
        <planeGeometry args={[2.7, 0.004]} />
        <meshBasicMaterial color="#334155" />
      </mesh>

      {/* Overview */}
      <Text position={[-1.30, 0.51, 0.004]} fontSize={0.060} color={color} anchorX="left" anchorY="middle" letterSpacing={0.1}>
        OVERVIEW
      </Text>
      <Text position={[-1.30, 0.30, 0.004]} fontSize={0.068} color="#cbd5e1" anchorX="left" anchorY="top" maxWidth={2.65} lineHeight={1.4}>
        {desc}
      </Text>

      {/* Included */}
      <Text position={[-1.30, -0.14, 0.004]} fontSize={0.060} color={color} anchorX="left" anchorY="middle" letterSpacing={0.1}>
        INCLUDED
      </Text>
      {features.map((f, i) => (
        <group key={f} position={[-1.30, -0.31 - i * 0.185, 0.004]}>
          <Text position={[0, 0, 0]} fontSize={0.075} color="#22c55e" anchorX="left" anchorY="middle">✓</Text>
          <Text position={[0.17, 0, 0]} fontSize={0.067} color="#e2e8f0" anchorX="left" anchorY="middle" maxWidth={2.35}>
            {f}
          </Text>
        </group>
      ))}

      {/* Bottom divider */}
      <mesh position={[0, -1.02, 0.004]}>
        <planeGeometry args={[2.7, 0.004]} />
        <meshBasicMaterial color="#334155" />
      </mesh>

      {/* Technologies */}
      {techs.map((t, i) => (
        <group key={t} position={[techStartX + i * (tw + tgap), -1.17, 0.004]}>
          <mesh>
            <planeGeometry args={[tw, 0.20]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
          <Text position={[0, 0, 0.002]} fontSize={0.058} color="#94a3b8" anchorX="center" anchorY="middle">
            {t}
          </Text>
        </group>
      ))}
    </group>
  );
}

function ServicesFaceActive() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const cardPositions: [number, number][] = [
    [-0.67, 0.60], [0.67, 0.60],
    [-0.67, 0.05], [0.67, 0.05],
    [-0.67, -0.50], [0.67, -0.50],
  ];

  // ── Detail view ──────────────────────────────────────────────────────────────
  // Cards are NOT rendered while a service is selected — no overlap, no z-fight.
  // Background uses renderOrder=999 + depthTest=false so it unconditionally
  // paints over any face geometry that the GPU decides to draw on top.
  if (selectedIdx !== null) {
    return (
      <>
        {/* Solid background — renderOrder=999 renders last in the scene,
            depthTest=false means it ignores the depth buffer entirely.
            Together these guarantee it is always visible. */}
        <mesh renderOrder={999} onClick={(e) => e.stopPropagation()}>
          <planeGeometry args={[3.2, 3.2]} />
          <meshBasicMaterial color="#080814" depthTest={false} depthWrite={false} />
        </mesh>
        {/* Accent colour bar — sits on top of background (renderOrder=999 too,
            but slightly higher z so it is drawn after within same order) */}
        <mesh position={[0, 1.595, 0.001]} renderOrder={999}>
          <planeGeometry args={[3.2, 0.013]} />
          <meshBasicMaterial color={SVC_COLORS[selectedIdx]} depthTest={false} depthWrite={false} />
        </mesh>

        {/* Content springs in; its traverse loop stamps renderOrder=1000 */}
        <ServiceDetailPanel
          key={selectedIdx}
          svc={allServices[selectedIdx]}
          color={SVC_COLORS[selectedIdx]}
          symbol={SVC_SYMBOLS[allServices[selectedIdx].icon] ?? "◆"}
          onBack={() => setSelectedIdx(null)}
        />
      </>
    );
  }

  // ── Grid view ─────────────────────────────────────────────────────────────
  return (
    <>
      <FaceHeader label="SERVICES" title="What I Do" color={SECTIONS[3].color} />
      {allServices.map((svc, i) => (
        <ServiceCard3D
          key={svc.slug}
          svc={svc}
          color={SVC_COLORS[i]}
          symbol={SVC_SYMBOLS[svc.icon] ?? "◆"}
          x={cardPositions[i][0]}
          y={cardPositions[i][1]}
          onClick={() => setSelectedIdx(i)}
        />
      ))}
    </>
  );
}

// ── Skills face ───────────────────────────────────────────────────────────────

function SkillsFaceActive() {
  const s = SECTIONS[4];
  const W = 2.08;
  const barYs = [0.72, 0.36, 0.0, -0.36, -0.72, -1.08];

  return (
    <>
      <FaceHeader label="SKILLS" title="Tech Stack" color={s.color} />
      {SKILLS_DATA.map((skill, i) => {
        const y = barYs[i];
        const fillW = W * skill.level;
        const fillX = W * (skill.level - 1) / 2;
        return (
          <group key={skill.name} position={[0, y, 0.004]}>
            <Text position={[-1.1, 0.09, 0]} fontSize={0.087} color="#e5e7eb" anchorX="left" anchorY="middle">
              {skill.name}
            </Text>
            <Text position={[1.1, 0.09, 0]} fontSize={0.076} color={skill.color} anchorX="right" anchorY="middle" letterSpacing={0.02}>
              {Math.round(skill.level * 100)}%
            </Text>
            <mesh position={[0, -0.1, 0]}>
              <planeGeometry args={[W, 0.068]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.07} />
            </mesh>
            <mesh position={[fillX, -0.1, 0.002]}>
              <planeGeometry args={[fillW, 0.068]} />
              <meshBasicMaterial color={skill.color} />
            </mesh>
            <mesh position={[fillX, -0.1, 0.003]}>
              <planeGeometry args={[fillW, 0.068]} />
              <meshBasicMaterial color={skill.color} transparent opacity={0.28} />
            </mesh>
          </group>
        );
      })}
      <Text position={[0, -1.28, 0.004]} fontSize={0.065} color="#ffffff" anchorX="center" anchorY="middle" maxWidth={2.6} textAlign="center">
        Always learning · currently: LLM fine-tuning & edge AI
      </Text>
    </>
  );
}

// ── Contact face ──────────────────────────────────────────────────────────────

type ContactItem = { icon: string; label: string; value: string; color: string; href: string };

function ContactRow({ c, yPos }: { c: ContactItem; yPos: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = hovered ? 1.055 : 1.0;
    const cur = groupRef.current.scale.x;
    const next = THREE.MathUtils.lerp(cur, target, delta * 14);
    groupRef.current.scale.setScalar(next);
  });

  return (
    <group ref={groupRef} position={[0, yPos, 0.004]}>
      <mesh
        position={[0, 0, -0.003]}
        onClick={(e) => {
          e.stopPropagation();
          if (typeof window !== "undefined")
            window.open(c.href, c.href.startsWith("mailto") || c.href.startsWith("tel") ? "_self" : "_blank");
        }}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); }}
      >
        <planeGeometry args={[2.72, 0.34]} />
        <meshBasicMaterial color={c.color} transparent opacity={hovered ? 0.12 : 0.05} />
      </mesh>
      <mesh position={[-1.1, 0, 0.003]}>
        <circleGeometry args={[0.11, 32]} />
        <meshBasicMaterial color={c.color} transparent opacity={0.15} />
      </mesh>
      <Text position={[-1.1, 0, 0.007]} fontSize={0.095} color={c.color} anchorX="center" anchorY="middle">
        {c.icon}
      </Text>
      <Text position={[-0.9, 0.07, 0.006]} fontSize={0.054} color="#ffffff" anchorX="left" anchorY="middle" letterSpacing={0.08}>
        {c.label}
      </Text>
      <Text position={[-0.9, -0.09, 0.006]} fontSize={0.068} color="#e5e7eb" anchorX="left" anchorY="middle" maxWidth={1.85}>
        {c.value}
      </Text>
    </group>
  );
}

function ContactFaceActive() {
  const contact = useContact();
  const s = SECTIONS[5];
  const contacts: ContactItem[] = [
    { icon: "✉",  label: "EMAIL",     value: contact.email,                color: "#7c3aed", href: contact.mailtoHref },
    { icon: "☎",  label: "PHONE",     value: contact.phoneDisplay,         color: "#059669", href: contact.telHref },
    { icon: "⌥",  label: "GITHUB",    value: contact.githubUser,           color: "#e2e8f0", href: contact.github },
    { icon: "in", label: "LINKEDIN",  value: contact.linkedinUser,         color: "#0891b2", href: contact.linkedin },
    { icon: "ig", label: "INSTAGRAM", value: `@${contact.instagramUser}`,  color: "#db2777", href: contact.instagram },
    { icon: "wa", label: "WHATSAPP",  value: contact.whatsappDisplay,      color: "#25D366", href: contact.whatsappHref },
  ];
  const rowY = [0.65, 0.27, -0.11, -0.49, -0.87, -1.25];

  return (
    <>
      <FaceHeader label="CONTACT" title="Get In Touch" color={s.color} />
      {contacts.map((c, i) => (
        <ContactRow key={c.label} c={c} yPos={rowY[i]} />
      ))}
    </>
  );
}

// ── Face dispatcher ───────────────────────────────────────────────────────────

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

  if (index === 1) return <AboutFaceActive />;
  if (index === 2) return <ProjectsFaceActive />;
  if (index === 3) return <ServicesFaceActive />;
  if (index === 4) return <SkillsFaceActive />;
  if (index === 5) return <ContactFaceActive />;
  return null;
}

// ── Staggered info card ───────────────────────────────────────────────────────

function InfoCard({
  card,
  color,
  index,
  isOpen,
}: {
  card: CardItem;
  color: string;
  index: number;
  isOpen: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const prog = useRef({ val: 0, vel: 0 });
  const delay = index * 0.09;
  const timer = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (isOpen) {
      timer.current += delta;
      // Wait for panel to reach ~70% of its journey before cards appear
      if (timer.current < 0.18 + delay) {
        ref.current.scale.setScalar(0.001);
        return;
      }
      const force = 320 * (1 - prog.current.val) - 22 * prog.current.vel;
      prog.current.vel += force * delta;
      prog.current.val += prog.current.vel * delta;
    } else {
      timer.current = 0;
      prog.current.val = THREE.MathUtils.lerp(prog.current.val, 0, delta * 16);
      prog.current.vel = 0;
    }
    const p = Math.max(0.001, prog.current.val);
    ref.current.scale.setScalar(p);
    // subtle upward rise as they expand
    ref.current.position.y = THREE.MathUtils.lerp(-0.15, 0, Math.min(prog.current.val, 1));
  });

  const xPos = [-1.0, 0, 1.0][index] ?? 0;

  return (
    <group ref={ref} position={[xPos, 0.18, 0.07]}>
      {/* Card body */}
      <RoundedBox args={[0.88, 1.48, 0.07]} radius={0.07} smoothness={4}>
        <meshStandardMaterial color="#0f0f22" metalness={0.75} roughness={0.22} />
      </RoundedBox>
      {/* Glass tint overlay */}
      <mesh position={[0, 0, 0.037]}>
        <planeGeometry args={[0.88, 1.48]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} />
      </mesh>
      {/* Top accent bar */}
      <mesh position={[0, 0.71, 0.038]}>
        <planeGeometry args={[0.78, 0.045]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      {/* Left edge glow line */}
      <mesh position={[-0.42, 0, 0.038]}>
        <planeGeometry args={[0.006, 1.3]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      <Text position={[0, 0.47, 0.042]} fontSize={0.115} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.03} maxWidth={0.78} textAlign="center">
        {card.title}
      </Text>
      <mesh position={[0, 0.3, 0.042]}>
        <planeGeometry args={[0.65, 0.003]} />
        <meshBasicMaterial color="rgba(255,255,255,0.12)" />
      </mesh>
      {card.lines.map((line, j) => (
        <Text key={j} position={[0, 0.14 - j * 0.2, 0.042]} fontSize={0.082} color="#94a3b8" anchorX="center" anchorY="middle" maxWidth={0.78} textAlign="center" overflowWrap="break-word">
          {line}
        </Text>
      ))}
    </group>
  );
}

// ── Info panel — face expands toward camera ───────────────────────────────────

function InfoPanel({
  isOpen,
  active,
  onClose,
}: {
  isOpen: boolean;
  active: number;
  onClose: () => void;
}) {
  const contact = useContact();
  const ref = useRef<THREE.Group>(null);
  // Z: starts at cube face position (-0.7 = cube back z + face offset), ends at 2.2 (in front of camera)
  const posZ = useRef({ val: -0.7, vel: 0 });
  const scaleS = useRef({ val: 0.32, vel: 0 });
  const wasOpen = useRef(false);

  useFrame((_, delta) => {
    if (!ref.current) return;

    // Reset to start position when newly opened
    if (isOpen && !wasOpen.current) {
      posZ.current.val = -0.7;
      posZ.current.vel = 0;
      scaleS.current.val = 0.32;
      scaleS.current.vel = 0;
    }
    wasOpen.current = isOpen;

    // Spring Z — zooms from cube face toward camera
    const tZ = isOpen ? 2.2 : -0.7;
    const zForce = 240 * (tZ - posZ.current.val) - 22 * posZ.current.vel;
    posZ.current.vel += zForce * delta;
    posZ.current.val += posZ.current.vel * delta;

    // Spring scale — grows from face-sized (0.32) to full (1.0) with slight overshoot
    const tS = isOpen ? 1 : 0.32;
    const sForce = 260 * (tS - scaleS.current.val) - 20 * scaleS.current.vel;
    scaleS.current.vel += sForce * delta;
    scaleS.current.val += scaleS.current.vel * delta;

    ref.current.position.z = posZ.current.val;
    ref.current.scale.setScalar(Math.max(0.001, scaleS.current.val));
    ref.current.visible = isOpen || scaleS.current.val > 0.05;
  });

  const s = SECTIONS[active];
  const cards =
    active === 5
      ? [
          { title: "Email", lines: [contact.email] },
          { title: "GitHub", lines: [contact.githubUser] },
          { title: "LinkedIn", lines: [contact.linkedinUser] },
        ]
      : (SECTION_CARDS[active] ?? []);

  return (
    <group ref={ref} position={[0, 0, -0.7]}>
      {/* ── Backdrop — deep metallic slab ── */}
      <RoundedBox args={[3.15, 3.15, 0.1]} radius={0.1} smoothness={5} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#0c0c1e" metalness={0.9} roughness={0.15} />
      </RoundedBox>
      {/* Glass inner layer */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[3.08, 3.08]} />
        <meshBasicMaterial color={s.color} transparent opacity={0.04} />
      </mesh>
      {/* Top glow bar */}
      <mesh position={[0, 1.535, -0.04]}>
        <planeGeometry args={[3.15, 0.07]} />
        <meshBasicMaterial color={s.color} />
      </mesh>
      {/* Outer edge highlights — four thin lines */}
      {/* top */}
      <mesh position={[0, 1.57, -0.03]}><planeGeometry args={[3.15, 0.008]} /><meshBasicMaterial color="#c4b5fd" transparent opacity={0.6} /></mesh>
      {/* left */}
      <mesh position={[-1.572, 0, -0.03]}><planeGeometry args={[0.008, 3.15]} /><meshBasicMaterial color="#c4b5fd" transparent opacity={0.25} /></mesh>
      {/* right */}
      <mesh position={[1.572, 0, -0.03]}><planeGeometry args={[0.008, 3.15]} /><meshBasicMaterial color="#c4b5fd" transparent opacity={0.25} /></mesh>
      {/* bottom */}
      <mesh position={[0, -1.57, -0.03]}><planeGeometry args={[3.15, 0.008]} /><meshBasicMaterial color="#c4b5fd" transparent opacity={0.15} /></mesh>

      {/* Section label */}
      <Text position={[0, 1.25, 0.006]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.1}>
        {s.label.toUpperCase()}
      </Text>
      <mesh position={[0, 1.04, 0.006]}>
        <planeGeometry args={[2.7, 0.004]} />
        <meshBasicMaterial color={s.color} transparent opacity={0.5} />
      </mesh>

      {/* Staggered cards */}
      {cards.slice(0, 3).map((card, i) => (
        <InfoCard key={`${active}-${i}`} card={card} color={s.color} index={i} isOpen={isOpen} />
      ))}

      {/* Close button */}
      <group position={[0, -1.35, 0.006]} onClick={(e) => { e.stopPropagation(); onClose(); }}>
        <RoundedBox args={[1.18, 0.3, 0.055]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#16162a" metalness={0.8} roughness={0.2} emissive="#7c3aed" emissiveIntensity={0.1} />
        </RoundedBox>
        {/* top highlight */}
        <mesh position={[0, 0.14, 0.03]}>
          <planeGeometry args={[1.14, 0.005]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} />
        </mesh>
        <Text position={[0, 0, 0.034]} fontSize={0.09} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.14}>
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

// ── Mobile Nav — CSS 3D buttons ──────────────────────────────────────────────

function MobileNavButtons({
  active,
  setActive,
}: {
  active: number;
  setActive: (i: number) => void;
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 10,
      padding: "16px 14px 20px",
      perspective: "600px",
    }}>
      {SECTIONS.map((sec, i) => {
        const isActive = active === i;
        return (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              padding: "12px 6px 10px",
              borderRadius: 14,
              border: `1px solid ${isActive ? sec.color : "rgba(255,255,255,0.08)"}`,
              background: isActive
                ? `linear-gradient(160deg, ${sec.color}28 0%, ${sec.color}0a 100%)`
                : "linear-gradient(160deg, rgba(28,18,56,0.95) 0%, rgba(14,10,34,0.95) 100%)",
              boxShadow: isActive
                ? `0 0 20px ${sec.color}50, 0 6px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -2px 0 rgba(0,0,0,0.5)`
                : "0 6px 18px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -2px 0 rgba(0,0,0,0.45)",
              transform: isActive
                ? "translateY(1px) rotateX(1deg)"
                : "translateY(0) rotateX(4deg)",
              transformStyle: "preserve-3d",
              cursor: "pointer",
              transition: "all 0.18s cubic-bezier(0.34,1.56,0.64,1)",
              outline: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {/* top-edge highlight line */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "12%",
              right: "12%",
              height: 1,
              borderRadius: 1,
              background: isActive
                ? `linear-gradient(90deg, transparent, ${sec.color}cc, transparent)`
                : "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
            }} />
            {/* icon */}
            <span style={{
              fontSize: 22,
              lineHeight: 1,
              filter: isActive ? `drop-shadow(0 0 6px ${sec.color})` : "none",
              transition: "filter 0.18s ease",
            }}>
              {sec.icon}
            </span>
            {/* label */}
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.35)",
              transition: "color 0.18s ease",
            }}>
              {sec.label}
            </span>
            {/* active bottom glow bar */}
            {isActive && (
              <div style={{
                position: "absolute",
                bottom: 0,
                left: "20%",
                right: "20%",
                height: 2,
                borderRadius: 2,
                background: sec.color,
                boxShadow: `0 0 8px ${sec.color}`,
              }} />
            )}
          </button>
        );
      })}
    </div>
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

      {/* Face 0 – Home */}
      <group position={[0, 0, 1.52]}>
        <Suspense fallback={null}>
          <HomeFaceInner />
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
          .cube-menu { display: none !important; }
          .cube-label { display: none !important; }
          .mobile-nav-3d { display: block !important; }
        }
        .cube-nav-item {
          display: flex;
          align-items: center;
          width: 100%;
          background: none;
          border: none;
          border-left: 2px solid transparent;
          cursor: pointer;
          padding: 9px 16px;
          transition: border-color 0.2s, color 0.2s;
          text-align: left;
          font-family: var(--font-outfit), 'Inter', sans-serif;
        }
        .cube-nav-item:hover {
          border-left-color: rgba(255,255,255,0.22) !important;
        }
        .cube-back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.28);
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 9px 16px;
          font-family: var(--font-outfit), 'Inter', sans-serif;
          transition: color 0.2s;
        }
        .cube-back-link:hover { color: rgba(255,255,255,0.65); }
      `}</style>

      {/* Left-side nav */}
      <div
        className="cube-menu"
        style={{
          position: "fixed",
          left: 24,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {SECTIONS.map((sec, i) => (
          <button
            key={i}
            className="cube-nav-item"
            onClick={() => setActive(i)}
            style={{ borderLeftColor: active === i ? sec.color : "rgba(255,255,255,0.1)" }}
          >
            <span style={{
              fontSize: "0.65rem",
              fontWeight: active === i ? 700 : 400,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: active === i ? sec.color : "rgba(255,255,255,0.38)",
              textShadow: "0 1px 10px rgba(0,0,0,0.9)",
              transition: "color 0.2s",
            }}>
              {sec.label}
            </span>
          </button>
        ))}

        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "6px 16px" }} />

        <a href="/" className="cube-back-link">
          <span>←</span> Back
        </a>
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
          dpr={[1, 2]}
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
          background: "rgba(8, 4, 22, 0.85)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <MobileNavButtons active={active} setActive={setActive} />
      </div>
    </div>
  );
}
