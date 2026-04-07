/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text, Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

// ── Constants ─────────────────────────────────────────────────────────────────

const SECTIONS = [
  { label: "Home",     icon: "⌂", color: "#7c3aed" },
  { label: "About",    icon: "◎", color: "#2563eb" },
  { label: "Projects", icon: "◈", color: "#059669" },
  { label: "Services", icon: "◇", color: "#d97706" },
  { label: "Skills",   icon: "▲", color: "#db2777" },
  { label: "Contact",  icon: "✉", color: "#0891b2" },
];

const FACE_POSITIONS: [number, number, number][] = [
  [0,0,1.52],[1.52,0,0],[0,0,-1.52],[-1.52,0,0],[0,1.52,0],[0,-1.52,0],
];
const FACE_ROTATIONS: [number, number, number][] = [
  [0,0,0],[0,Math.PI/2,0],[0,Math.PI,0],[0,-Math.PI/2,0],[-Math.PI/2,0,0],[Math.PI/2,0,0],
];
const TARGETS = [
  new THREE.Euler(0,0,0),
  new THREE.Euler(0,Math.PI/2,0),
  new THREE.Euler(0,Math.PI,0),
  new THREE.Euler(0,-Math.PI/2,0),
  new THREE.Euler(Math.PI/2,0,0),
  new THREE.Euler(-Math.PI/2,0,0),
];
const REST_TILT = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.13, 0.2, 0));

const SKILL_SYMS   = ["▲","⚛","⬡","◈","⬟","⬢"];
const SKILL_COLORS = ["#e2e8f0","#61DAFB","#96BF48","#38BDF8","#FFD343","#68A063"];
const FACE_DESC    = ["","Developer · AI Engineer","Web & AI Projects","Professional Services","Tech Stack","Get In Touch"];

type CardItem = { title: string; lines: string[] };
const SECTION_CARDS: CardItem[][] = [
  [{ title:"About",    lines:["Full Stack Dev","AI / ML Engineer"] },
   { title:"Skills",   lines:["Next.js · React","Shopify · Python"] },
   { title:"Stats",    lines:["25+ Projects","2+ Yrs Exp"] }],
  [{ title:"Experience", lines:["2+ yrs production","web & AI apps"] },
   { title:"Education",  lines:["B.Tech","Computer Science"] },
   { title:"Available",  lines:["Freelance & Full-time"] }],
  [{ title:"E-commerce",   lines:["Next.js · Shopify","Headless storefront"] },
   { title:"AI Dashboard", lines:["React · Python","ML analytics"] },
   { title:"API Gateway",  lines:["Node.js · MongoDB","REST + Auth"] }],
  [{ title:"Web Dev",  lines:["Next.js · React","Performance first"] },
   { title:"Shopify",  lines:["Headless stores","Custom themes"] },
   { title:"AI / ML",  lines:["Integrations","Pipelines"] }],
  [{ title:"Frontend", lines:["Next.js 90%","React 95%"] },
   { title:"Backend",  lines:["Node.js 80%","Python 75%"] },
   { title:"AI / ML",  lines:["TF 65%","LangChain 70%"] }],
  [{ title:"Email",    lines:["rajdeepkotoky@gmail.com"] },
   { title:"GitHub",   lines:["Rajdeep1234yyuhh"] },
   { title:"LinkedIn", lines:["linkedin.com/in/rajdeep"] }],
];
const CARD_POS: [number,number,number][] = [[-2.1,0.3,3.5],[0,0.9,3.9],[2.1,0.3,3.5]];

// ── Door half — spring-hinged panel ──────────────────────────────────────────

function DoorHalf({
  side, isOpen, isActive, color, children,
}: {
  side: "left" | "right";
  isOpen: boolean;
  isActive: boolean;
  color: string;
  children: React.ReactNode;
}) {
  const pivotRef = useRef<THREE.Group>(null);
  // Spring state: pos, velocity
  const spring   = useRef({ pos: 0, vel: 0 });
  const hingeX   = side === "left" ? -1.5 : 1.5;
  const offX     = side === "left" ?  0.75 : -0.75;
  const openRot  = side === "left" ?  Math.PI * 0.86 : -Math.PI * 0.86;

  useFrame((_, delta) => {
    if (!pivotRef.current) return;
    const target = isActive && isOpen ? 1 : 0;
    // Spring constants: stiffness / damping
    // Opening: low damping → door overshoots, bounces back like real hinge
    // Closing: high stiffness + damping → snaps shut cleanly
    const stiffness = isOpen ?  90 : 320;
    const damping   = isOpen ?   8 :  26;
    const s = spring.current;
    const force = stiffness * (target - s.pos) - damping * s.vel;
    s.vel += force * delta;
    s.pos += s.vel * delta;
    pivotRef.current.rotation.y = s.pos * openRot;
  });

  return (
    <group position={[hingeX, 0, 0]}>
      <group ref={pivotRef}>
        <RoundedBox args={[1.5, 3.0, 0.072]} radius={0.055} smoothness={4} position={[offX, 0, 0]}>
          <meshStandardMaterial color="#181828" metalness={0.85} roughness={0.18} side={THREE.DoubleSide} />
        </RoundedBox>
        {/* Inner face colour tint */}
        <mesh position={[offX, 0, 0.038]}>
          <planeGeometry args={[1.49, 2.99]} />
          <meshBasicMaterial color={color} transparent opacity={0.06} />
        </mesh>
        {/* Edge highlight on hinge side */}
        <mesh position={[offX, 0, -0.038]}>
          <planeGeometry args={[1.49, 2.99]} />
          <meshBasicMaterial color={color} transparent opacity={0.04} />
        </mesh>
        {children}
      </group>
    </group>
  );
}

// ── Home face: photo left / info right ───────────────────────────────────────

function HomeFaceInner({ isOpen, isActive, onOpen }: { isOpen: boolean; isActive: boolean; onOpen: () => void }) {
  const photo  = useTexture("/DP.jpg");
  const btnMat = useRef<THREE.MeshStandardMaterial>(null);
  const t      = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    if (btnMat.current) btnMat.current.emissiveIntensity = 0.3 + Math.sin(t.current * 1.8) * 0.15;
  });

  return (
    <>
      {/* ── Left door: portrait ── */}
      <DoorHalf side="left" isOpen={isOpen} isActive={isActive} color="#7c3aed">
        {/* Outer glow ring */}
        <mesh position={[0.75, 0.12, 0.04]}>
          <ringGeometry args={[0.6, 0.74, 80]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.15} />
        </mesh>
        {/* Accent ring */}
        <mesh position={[0.75, 0.12, 0.042]}>
          <ringGeometry args={[0.55, 0.61, 80]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.9} />
        </mesh>
        {/* Photo */}
        <mesh position={[0.75, 0.12, 0.046]}>
          <circleGeometry args={[0.54, 128]} />
          <meshBasicMaterial map={photo} toneMapped={false} />
        </mesh>
        {/* KEY SKILLS label */}
        <Text position={[0.75, -0.78, 0.04]} fontSize={0.07} color="rgba(255,255,255,0.22)" anchorX="center" anchorY="middle" letterSpacing={0.13}>
          KEY SKILLS
        </Text>
        {/* Skill symbols – left 3 */}
        {[0,1,2].map(i => (
          <Text key={i} position={[0.18 + i * 0.57, -1.06, 0.04]} fontSize={0.28} color={SKILL_COLORS[i]} anchorX="center" anchorY="middle">
            {SKILL_SYMS[i]}
          </Text>
        ))}
        {/* Skill symbols – right 3 on left door, bottom row */}
        {[3,4,5].map(i => (
          <Text key={i} position={[0.18 + (i-3) * 0.57, -1.34, 0.04]} fontSize={0.28} color={SKILL_COLORS[i]} anchorX="center" anchorY="middle">
            {SKILL_SYMS[i]}
          </Text>
        ))}
      </DoorHalf>

      {/* ── Right door: info + button ── */}
      <DoorHalf side="right" isOpen={isOpen} isActive={isActive} color="#7c3aed">
        {/* Name */}
        <Text position={[-0.75, 1.1, 0.04]} fontSize={0.175} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.035}>
          Rajdeep Kotoky
        </Text>
        {/* Divider */}
        <mesh position={[-0.75, 0.89, 0.04]}>
          <planeGeometry args={[1.2, 0.005]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.45} />
        </mesh>
        {/* Title */}
        <Text position={[-0.75, 0.67, 0.04]} fontSize={0.098} color="#a78bfa" anchorX="center" anchorY="middle" maxWidth={1.32} textAlign="center" letterSpacing={0.02}>
          Full Stack Dev · AI/ML Eng
        </Text>
        {/* Bio */}
        <Text position={[-0.75, 0.22, 0.04]} fontSize={0.086} color="#94a3b8" anchorX="center" anchorY="middle" maxWidth={1.32} lineHeight={1.7} textAlign="center">
          {"Building fast web apps with\nNext.js, React & Shopify.\nAI/ML integrations."}
        </Text>
        {/* Open button */}
        <group position={[-0.75, -0.85, 0.044]}>
          <RoundedBox args={[1.18, 0.28, 0.058]} radius={0.07} smoothness={3}
            onClick={(e) => { e.stopPropagation(); if (isActive) onOpen(); }}>
            <meshStandardMaterial ref={btnMat} color="#7c3aed" metalness={0.25} roughness={0.5}
              emissive="#7c3aed" emissiveIntensity={0.3} />
          </RoundedBox>
          <Text position={[0, 0, 0.033]} fontSize={0.092} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.1}>
            MORE INFO  ▶
          </Text>
        </group>
      </DoorHalf>
    </>
  );
}

// ── Other faces: icon left / label right ─────────────────────────────────────

function OtherFaceContent({ index, isOpen, isActive, onOpen }: {
  index: number; isOpen: boolean; isActive: boolean; onOpen: () => void;
}) {
  const s      = SECTIONS[index];
  const btnMat = useRef<THREE.MeshStandardMaterial>(null);
  const t      = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    t.current += delta;
    if (btnMat.current) btnMat.current.emissiveIntensity = 0.28 + Math.sin(t.current * 1.8) * 0.14;
  });

  return (
    <>
      {/* Left door: big icon */}
      <DoorHalf side="left" isOpen={isOpen} isActive={isActive} color={s.color}>
        <Text position={[0.75, 0.15, 0.04]} fontSize={0.92} color={s.color} anchorX="center" anchorY="middle">
          {s.icon}
        </Text>
      </DoorHalf>

      {/* Right door: label + desc + button */}
      <DoorHalf side="right" isOpen={isOpen} isActive={isActive} color={s.color}>
        <Text position={[-0.75, 0.78, 0.04]} fontSize={0.225} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.09}>
          {s.label.toUpperCase()}
        </Text>
        <mesh position={[-0.75, 0.55, 0.04]}>
          <planeGeometry args={[0.85, 0.005]} />
          <meshBasicMaterial color={s.color} transparent opacity={0.6} />
        </mesh>
        <Text position={[-0.75, 0.3, 0.04]} fontSize={0.096} color="#94a3b8" anchorX="center" anchorY="middle" maxWidth={1.3} textAlign="center">
          {FACE_DESC[index]}
        </Text>
        <group position={[-0.75, -0.85, 0.044]}>
          <RoundedBox args={[1.18, 0.28, 0.058]} radius={0.07} smoothness={3}
            onClick={(e) => { e.stopPropagation(); if (isActive) onOpen(); }}>
            <meshStandardMaterial ref={btnMat} color={s.color} metalness={0.25} roughness={0.5}
              emissive={s.color} emissiveIntensity={0.28} />
          </RoundedBox>
          <Text position={[0, 0, 0.033]} fontSize={0.092} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.1}>
            MORE INFO  ▶
          </Text>
        </group>
      </DoorHalf>
    </>
  );
}

// ── Card that flies out of the opening ───────────────────────────────────────

function FlyCard({ card, color, target, isOpen, delay }: {
  card: CardItem; color: string;
  target: [number,number,number];
  isOpen: boolean; delay: number;
}) {
  const ref   = useRef<THREE.Group>(null);
  const prog  = useRef(0);
  const timer = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (isOpen) {
      timer.current += delta;
      if (timer.current < delay) {
        ref.current.scale.setScalar(0.001);
        ref.current.position.set(target[0] * 0.1, target[1] * 0.1, -0.9); // start at face gap
        return;
      }
      prog.current = THREE.MathUtils.lerp(prog.current, 1, delta * 4.2);
    } else {
      timer.current = 0;
      prog.current = THREE.MathUtils.lerp(prog.current, 0, delta * 10);
    }
    const p = prog.current;
    const [tx, ty, tz] = target;
    // Emerge from the face opening (z=-0.9 because cube slid to -2.4, face is near -0.9)
    ref.current.position.set(
      tx * p,
      ty * p,
      THREE.MathUtils.lerp(-0.9, tz, p),
    );
    ref.current.scale.setScalar(Math.max(0.001, p));
    ref.current.rotation.y = (1 - p) * (tx > 0 ? 0.6 : tx < 0 ? -0.6 : 0);
  });

  return (
    <group ref={ref}>
      <RoundedBox args={[1.55, 1.1, 0.09]} radius={0.09} smoothness={4}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.65} roughness={0.28} />
      </RoundedBox>
      {/* Top color stripe */}
      <mesh position={[0, 0.51, 0.047]}>
        <planeGeometry args={[1.55, 0.05]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Tint */}
      <mesh position={[0, 0, 0.047]}>
        <planeGeometry args={[1.55, 1.1]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </mesh>
      <Text position={[0, 0.27, 0.052]} fontSize={0.155} color="#fff" anchorX="center" anchorY="middle" letterSpacing={0.03}>
        {card.title}
      </Text>
      {card.lines.map((line, i) => (
        <Text key={i} position={[0, 0.01 - i * 0.2, 0.052]} fontSize={0.098} color="#94a3b8"
          anchorX="center" anchorY="middle" maxWidth={1.46} textAlign="center">
          {line}
        </Text>
      ))}
    </group>
  );
}

// ── CLOSE button that rises below cards ──────────────────────────────────────

function CloseBtn({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const ref   = useRef<THREE.Group>(null);
  const prog  = useRef(0);
  const timer = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (isOpen) {
      timer.current += delta;
      if (timer.current < 0.35) { ref.current.scale.setScalar(0.001); return; }
      prog.current = THREE.MathUtils.lerp(prog.current, 1, delta * 3.8);
    } else {
      timer.current = 0;
      prog.current = THREE.MathUtils.lerp(prog.current, 0, delta * 10);
    }
    const p = prog.current;
    ref.current.position.set(0, THREE.MathUtils.lerp(-0.9, -1.55, p), THREE.MathUtils.lerp(-0.9, 3.2, p));
    ref.current.scale.setScalar(Math.max(0.001, p));
  });

  return (
    <group ref={ref} onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <RoundedBox args={[1.05, 0.28, 0.06]} radius={0.07} smoothness={3}>
        <meshStandardMaterial color="#13131f" metalness={0.5} roughness={0.35}
          emissive="#ffffff" emissiveIntensity={0.04} />
      </RoundedBox>
      <Text position={[0, 0, 0.034]} fontSize={0.095} color="rgba(255,255,255,0.5)"
        anchorX="center" anchorY="middle" letterSpacing={0.12}>
        CLOSE  ✕
      </Text>
    </group>
  );
}

// ── Interior glow that pulses when open ──────────────────────────────────────

function InteriorGlow({ isOpen }: { isOpen: boolean }) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const prog   = useRef(0);
  const t      = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    prog.current = THREE.MathUtils.lerp(prog.current, isOpen ? 1 : 0, delta * (isOpen ? 2.2 : 8));
    if (matRef.current) {
      matRef.current.opacity = prog.current * (0.4 + Math.sin(t.current * 1.8) * 0.15);
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial ref={matRef} color="#7c3aed" transparent opacity={0} />
    </mesh>
  );
}

// ── 3D Background ─────────────────────────────────────────────────────────────

function Background3D() {
  const ringRef  = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ringRef.current)  ringRef.current.rotation.z  += delta * 0.18;
    if (ringRef.current)  ringRef.current.rotation.x  += delta * 0.07;
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
          <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.25} />
        </mesh>
      </group>

      {/* Floating orbs */}
      <Float speed={1.1} floatIntensity={2.2} rotationIntensity={0}>
        <mesh position={[-7, 3, -8]}>
          <sphereGeometry args={[0.32, 16, 16]} />
          <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={2.5} transparent opacity={0.85} />
        </mesh>
      </Float>
      <Float speed={0.75} floatIntensity={1.8} rotationIntensity={0}>
        <mesh position={[7, -2.5, -7]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#2563eb" emissive="#2563eb" emissiveIntensity={2.5} transparent opacity={0.8} />
        </mesh>
      </Float>
      <Float speed={1.4} floatIntensity={1.5} rotationIntensity={0}>
        <mesh position={[5, 4, -11]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#db2777" emissive="#db2777" emissiveIntensity={3} transparent opacity={0.7} />
        </mesh>
      </Float>

      {/* Background scene lights */}
      <pointLight position={[-8, 6, -6]}  intensity={1.4} color="#7c3aed" distance={30} />
      <pointLight position={[ 8, -4, -6]} intensity={0.9} color="#2563eb" distance={24} />
      <pointLight position={[ 0,  8, -10]} intensity={0.7} color="#c4b5fd" distance={28} />
    </>
  );
}

// ── Cube ─────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Cube({ active, dragDelta, isOpen, onOpen, onClose }: {
  active: number;
  dragDelta: React.RefObject<{ x: number; y: number }>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const groupRef   = useRef<THREE.Group>(null);
  const targetQ    = useRef(new THREE.Quaternion());
  const dragQ      = useRef(new THREE.Quaternion());
  // Spring state for position
  const posZ       = useRef({ val: 0, vel: 0 });
  const posY       = useRef({ val: 0, vel: 0 });
  // Scale punch on open
  const scaleSpring = useRef({ val: 1, vel: 0 });
  const wasOpen     = useRef(false);

  useEffect(() => {
    targetQ.current.setFromEuler(TARGETS[active]);
    dragQ.current.identity();
  }, [active]);

  useFrame((_, delta) => {
    if (!groupRef.current || !dragDelta.current) return;

    if (!isOpen) {
      if (dragDelta.current.x !== 0 || dragDelta.current.y !== 0) {
        const qHoriz = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), dragDelta.current.x);
        const qVert  = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), dragDelta.current.y);
        // Both left-multiplied (world space) → consistent on every face
        dragQ.current.premultiply(qHoriz.multiply(qVert));
        dragDelta.current.x = 0; dragDelta.current.y = 0;
      }
    }

    const dragLen = 1 - Math.abs(dragQ.current.w);
    const tiltS   = isOpen ? 0 : Math.max(0, 1 - dragLen * 6);
    const blended = new THREE.Quaternion().slerp(REST_TILT, tiltS);
    // When opening, snap straight-on so the door effect is clean
    const goal = isOpen
      ? targetQ.current.clone()
      : targetQ.current.clone().multiply(blended).multiply(dragQ.current);
    groupRef.current.quaternion.slerp(goal, delta * (isOpen ? 8 : 4));

    // Scale punch when transitioning open → kick it small then spring back to 1
    if (isOpen && !wasOpen.current) {
      scaleSpring.current.val = 0.88;
      scaleSpring.current.vel = 0;
    }
    wasOpen.current = isOpen;
    const scaleForce = 260 * (1 - scaleSpring.current.val) - 18 * scaleSpring.current.vel;
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
      <RoundedBox args={[3,3,3]} radius={0.1} smoothness={5} castShadow>
        <meshStandardMaterial color="#1c1c2e" metalness={0.85} roughness={0.15} />
      </RoundedBox>
      {/* Single subtle edge */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3.02,3.02,3.02)]} />
        <lineBasicMaterial color="#7c3aed" transparent opacity={0.35} />
      </lineSegments>

      {/* Interior glow */}
      <InteriorGlow isOpen={isOpen} />

      {/* Door frame — visible as an inner box when doors swing open */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2.96, 2.96, 2.94)]} />
        <lineBasicMaterial color="#7c3aed" transparent opacity={isOpen ? 0.35 : 0.0} />
      </lineSegments>

      {/* Face 0 – Home */}
      <group position={[0,0,1.52]}>
        <Suspense fallback={null}>
          <HomeFaceInner isOpen={isOpen} isActive={active === 0} onOpen={onOpen} />
        </Suspense>
      </group>

      {/* Faces 1–5 */}
      {[1,2,3,4,5].map(i => (
        <group key={i} position={FACE_POSITIONS[i]} rotation={FACE_ROTATIONS[i]}>
          <OtherFaceContent index={i} isOpen={isOpen} isActive={active === i} onOpen={onOpen} />
        </group>
      ))}
    </group>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────

function Scene({ active, dragDelta, isOpen, onOpen, onClose }: {
  active: number;
  dragDelta: React.RefObject<{ x: number; y: number }>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const cards = SECTION_CARDS[active] ?? [];
  const color = SECTIONS[active].color;

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5,8,5]} intensity={1.8} castShadow />
      <directionalLight position={[0,0,8]} intensity={1.4} />
      <directionalLight position={[-5,4,3]} intensity={0.6} color="#c4b5fd" />
      <pointLight position={[4,4,4]} intensity={0.8} color="#a78bfa" />
      <pointLight position={[-4,-3,2]} intensity={0.3} color="#60a5fa" />
      {/* Interior light — illuminates the gap as doors swing open */}
      <pointLight position={[0,0,-1.2]} intensity={isOpen ? 7 : 0} color={color} distance={8} />
      <pointLight position={[0,0, 1.5]} intensity={isOpen ? 3 : 0} color={color} distance={5} />

      <Background3D />

      <Cube active={active} dragDelta={dragDelta} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      {/* Flying cards – world space so they stay in front of camera */}
      {cards.slice(0,3).map((card, i) => (
        <FlyCard key={`${active}-${i}`} card={card} color={color}
          target={CARD_POS[i]} isOpen={isOpen} delay={i * 0.11} />
      ))}
      <CloseBtn isOpen={isOpen} onClose={onClose} />
    </>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────

export default function CubePageClient() {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dragDelta      = useRef({ x: 0, y: 0 });
  const isDragging     = useRef(false);
  const lastPointer    = useRef({ x: 0, y: 0 });
  const lastPinch      = useRef<number | null>(null);
  const lastMidpoint   = useRef<{ x: number; y: number } | null>(null);
  const canvasWrapRef  = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsOpen(false); }, [active]);

  // Prevent page scroll on touch — must be non-passive so preventDefault works
  useEffect(() => {
    const el = canvasWrapRef.current;
    if (!el) return;
    const block = (e: TouchEvent) => e.preventDefault();
    el.addEventListener("touchmove", block, { passive: false });
    el.addEventListener("touchstart", block, { passive: false });
    return () => {
      el.removeEventListener("touchmove", block);
      el.removeEventListener("touchstart", block);
    };
  }, []);

  useEffect(() => {
    let last = 0;
    const handler = (e: WheelEvent) => {
      const now = Date.now();
      if (now - last < 500) return;
      last = now;
      if (isOpen) { setIsOpen(false); return; }
      setActive(p => e.deltaY > 0 ? (p+1)%6 : (p-1+6)%6);
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
  const onMouseUp = () => { isDragging.current = false; };

  const onTouchStart = (e: React.TouchEvent) => {
    if (isOpen) return;
    if (e.touches.length === 1) {
      isDragging.current = true;
      lastPointer.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastMidpoint.current = null;
    } else if (e.touches.length === 2) {
      isDragging.current = false;
      const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      lastMidpoint.current = { x: mx, y: my };
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinch.current = Math.sqrt(dx*dx+dy*dy);
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (isOpen) return;
    if (e.touches.length === 1 && isDragging.current) {
      dragDelta.current = {
        x:  (e.touches[0].clientX - lastPointer.current.x) * 0.012,
        y:  (e.touches[0].clientY - lastPointer.current.y) * 0.012,
      };
      lastPointer.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2 && lastMidpoint.current !== null) {
      // Track midpoint movement → free rotation in any direction
      const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const my = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      dragDelta.current = {
        x:  (mx - lastMidpoint.current.x) * 0.012,
        y:  (my - lastMidpoint.current.y) * 0.012,
      };
      lastMidpoint.current = { x: mx, y: my };
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinch.current = Math.sqrt(dx*dx+dy*dy);
    }
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    lastPinch.current = null;
    lastMidpoint.current = null;
  };

  const s = SECTIONS[active];

  return (
    <div style={{ width:"100vw", height:"100vh", background:"radial-gradient(ellipse at 50% 50%, #2d1b6e 0%, #1a1040 35%, #0e0a2a 70%, #080618 100%)", position:"relative", overflow:"hidden" }}>

      <style>{`
        @media (max-width: 640px) {
          .cube-canvas-wrap {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 45% !important;
            height: 55% !important;
          }
          .cube-dots { top: auto !important; bottom: 42% !important; transform: none !important; flex-direction: row !important; right: 50% !important; transform: translateX(50%) !important; }
          .cube-label { bottom: 6px !important; }
          .cube-back { top: 14px !important; left: 14px !important; }
        }
      `}</style>

      {/* Nav dots */}
      <div className="cube-dots" style={{ position:"fixed", right:22, top:"50%", transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:10, zIndex:10 }}>
        {SECTIONS.map((sec, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            width:8, height:8, borderRadius:"50%", padding:0, cursor:"pointer", transition:"all 0.2s",
            border:`1.5px solid ${active===i ? sec.color : "rgba(255,255,255,0.2)"}`,
            background: active===i ? sec.color : "transparent",
          }} />
        ))}
      </div>

      {/* Section label */}
      <div className="cube-label" style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", textAlign:"center", zIndex:10, pointerEvents:"none" }}>
        <p style={{ color:s.color, fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", margin:0 }}>{s.label}</p>
        <p style={{ color:"rgba(255,255,255,0.18)", fontSize:"0.58rem", letterSpacing:"0.1em", margin:"4px 0 0", textTransform:"uppercase" }}>
          {isOpen ? "tap CLOSE · or scroll" : "scroll · drag · tap MORE INFO"}
        </p>
      </div>

      {/* Back */}
      <a className="cube-back" href="/" style={{ position:"fixed", top:22, left:22, color:"rgba(255,255,255,0.22)", fontSize:"0.65rem", letterSpacing:"0.12em", textDecoration:"none", textTransform:"uppercase", zIndex:10 }}>
        ← Portfolio
      </a>

      {/* Canvas */}
      <div
        ref={canvasWrapRef}
        className="cube-canvas-wrap"
        style={{ position:"absolute", inset:0, cursor: isOpen ? "default" : isDragging.current ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      >
        <Canvas
          camera={{ position:[0,0,7.2], fov:42 }}
          gl={{ antialias:true, alpha:true }}
          style={{ position:"absolute", inset:0, background:"transparent" }}
          shadows
        >
          <Scene active={active} dragDelta={dragDelta} isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)} />
        </Canvas>
      </div>
    </div>
  );
}
