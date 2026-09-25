"use client";

import { CONTACT } from "../data/site";
import React, { useEffect, useRef, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Text, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { allProjects } from "../data/projects";
import { testimonials } from "../data/testimonials";

const PERSPECTIVE = 1400;
const ANIM_MS     = 2200;

// Room box geometry (px)
const ROOM_W = 2200;   // width
const ROOM_H = 1400;   // height
const ROOM_D = 1400;   // depth (back wall distance from entrance)

// Slow start → fast end
// ── World layout ───────────────────────────────────────────────────────────────
// [x, z] camera positions for each room (y = 0)
const ROOM_POS: Record<string, [number, number]> = {
  hall:         [     0,     0],
  projects:     [     0, -2800],
  testimonials: [-2200, -1600],
  about:        [ 2200, -1600],
  skills:       [-2200, -3100],
  services:     [ 2200, -3100],
  contact:      [     0, -5000],
  allprojects:  [     0, -5600], // deeper corridor behind the About Me room
};

type RoomId = keyof typeof ROOM_POS;

const ROOMS: { id: RoomId; label: string; icon: string; color: string }[] = [
  { id: "projects",    label: "About Me",      icon: "🏠",  color: "#a78bfa" },
  { id: "testimonials",label: "Reviews",       icon: "⭐",  color: "#fbbf24" },
  { id: "about",       label: "About Me",      icon: "👤",  color: "#34d399" },
  { id: "contact",     label: "Contact",       icon: "✉️",  color: "#818cf8" },
  { id: "allprojects", label: "All Projects",  icon: "🗂️",  color: "#818cf8" },
];

// Door portal positions in world space (visible from hall)
const DOORS: { id: RoomId; x: number; z: number; ry: number }[] = [
  { id: "projects",     x:    0, z:  -700, ry:   0 },
  { id: "testimonials", x: -400, z:  -520, ry:  30 },
  { id: "contact",      x:  400, z:  -520, ry: -30 },
];

// ── Stars ──────────────────────────────────────────────────────────────────────
const STARS = Array.from({ length: 220 }, (_, i) => ({
  tx: (i % 2 === 0 ? 1 : -1) * ((i * 73.431 + 11.21) % 600 + 80),
  ty: ((i * 43.711 + 31.513) % 700) - 350,
  tz: -(((i * 137.31 + 23.11) % 6500)),
  size: (i % 3) + 1,
  op: ((i % 7) + 2) / 14,
}));

function StarField() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", transformStyle: "preserve-3d" }}>
      {STARS.map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: "50%", top: "50%",
          width: s.size, height: s.size,
          marginLeft: -s.size / 2, marginTop: -s.size / 2,
          borderRadius: "50%", background: "white", opacity: s.op,
          transform: `translateX(${s.tx}px) translateY(${s.ty}px) translateZ(${s.tz}px)`,
        }} />
      ))}
    </div>
  );
}

// ── Floor grid ─────────────────────────────────────────────────────────────────
function FloorGrid() {
  return (
    <div style={{
      position: "absolute", left: "50%", top: "50%",
      width: 6000, height: 8000,
      transform: "translate(-50%, 0) translate3d(0, 300px, -4000px) rotateX(90deg)",
      backgroundImage: `
        linear-gradient(rgba(139,92,246,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(139,92,246,0.1) 1px, transparent 1px)
      `,
      backgroundSize: "280px 280px",
      pointerEvents: "none",
    }} />
  );
}

// ── 3-D letter mesh (one per character, animated in useFrame) ─────────────────
const STEP = 0.70; // world-units between letter centres

const LETTER_DATA: { ch: string; x: number; y: number; color: string }[] = [
  ...("RAJDEEP".split("").map((ch, i, a) => ({
    ch, color: "#ffffff",
    x: -((a.length - 1) * STEP) / 2 + i * STEP,
    y: 0.44,
  }))),
  ...("KOTOKY".split("").map((ch, i, a) => {
    const t  = i / (a.length - 1);
    const rc = Math.round(0xa7 + (0x60 - 0xa7) * t).toString(16).padStart(2, "0");
    const gc = Math.round(0x8b + (0xa5 - 0x8b) * t).toString(16).padStart(2, "0");
    return {
      ch, color: `#${rc}${gc}fa`,
      x: -((a.length - 1) * STEP) / 2 + i * STEP,
      y: -0.44,
    };
  })),
];

function LetterMesh({ ch, x, y, color }: { ch: string; x: number; y: number; color: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const { pointer } = state;

    // Project current world pos → NDC to measure distance from mouse
    const wp = new THREE.Vector3(g.position.x, g.position.y, g.position.z).project(state.camera);
    const dx = pointer.x - wp.x;
    const dy = pointer.y - wp.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const R = 0.38;

    let tpx = x, tpy = y, tpz = 0, trx = 0, try_ = 0;
    if (dist < R && dist > 0.001) {
      const t  = (1 - dist / R) ** 1.4;
      const nx = dx / dist, ny = dy / dist;
      tpx  = x - nx * t * 0.4;
      tpy  = y - ny * t * 0.28;
      tpz  = t * 1.2;           // surge toward camera
      try_ = -nx * t * 1.4;     // flip on Y axis (most dramatic 3-D cue)
      trx  =  ny * t * 0.9;
    }

    const f = 0.13;
    g.position.x += (tpx - g.position.x) * f;
    g.position.y += (tpy - g.position.y) * f;
    g.position.z += (tpz - g.position.z) * f;
    g.rotation.x += (trx - g.rotation.x) * f;
    g.rotation.y += (try_ - g.rotation.y) * f;
  });

  return (
    <group ref={ref} position={[x, y, 0]}>
      <Center>
        <Text3D
          font="/helvetiker_bold.typeface.json"
          size={0.82}
          height={0.28}
          curveSegments={8}
          bevelEnabled
          bevelThickness={0.018}
          bevelSize={0.014}
          bevelSegments={5}
        >
          {ch}
          <meshStandardMaterial color={color} metalness={0.55} roughness={0.2} />
        </Text3D>
      </Center>
    </group>
  );
}

// ── Hall hero ─────────────────────────────────────────────────────────────────
function HallHero() {
  return (
    <div style={{
      position: "absolute", left: "50%", top: "50%",
      width: "min(90vw, 700px)",
      transform: "translate(-50%, -50%) translate3d(0, -150px, 0)",
      textAlign: "center", pointerEvents: "none",
    }}>
      {/* Badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "5px 14px", borderRadius: 999,
        border: "1px solid rgba(167,139,250,0.3)",
        background: "rgba(167,139,250,0.08)",
        fontSize: 11, color: "rgba(167,139,250,0.9)", fontWeight: 700,
        letterSpacing: "0.08em", marginBottom: 16,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
        AVAILABLE FOR WORK
      </div>

      {/* Real 3-D extruded letters via React Three Fiber */}
      <div style={{ width: "100%", height: 210, pointerEvents: "auto" }}>
        <Canvas
          orthographic
          camera={{ zoom: 100, position: [0, 0, 5], near: 0.1, far: 100 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[2, 4, 5]} intensity={1.4} castShadow={false} />
          <pointLight position={[-4, -2, 3]} color="#a78bfa" intensity={5} />
          <pointLight position={[4,  3, 3]} color="#60a5fa" intensity={3} />
          <Suspense fallback={null}>
            {LETTER_DATA.map((l, i) => <LetterMesh key={i} {...l} />)}
          </Suspense>
        </Canvas>
      </div>

      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 4, letterSpacing: "0.12em", fontWeight: 600 }}>
        FULL-STACK DEVELOPER · AI/ML ENGINEER
      </p>
    </div>
  );
}

// ── Door portal — purely visual, no pointer events (hotspots handle input) ────
function DoorPortal({
  x, z, ry, room, hov, tilt, glare, domRef,
}: {
  x: number; z: number; ry: number;
  room: typeof ROOMS[0];
  hov: boolean;
  tilt: { rx: number; ry: number };
  glare: { x: number; y: number };
  domRef?: (el: HTMLDivElement | null) => void;
}) {
  const base = `translate(-50%,-50%) translate3d(${x}px,130px,${z}px) rotateY(${ry}deg)`;
  const hover = `${base} rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(280px) scale(1.06)`;

  return (
    <div ref={domRef} style={{
      position: "absolute", left: "50%", top: "50%",
      width: 190, height: 270,
      pointerEvents: "none",
      transform: hov ? hover : base,
      transition: hov ? "transform 0.08s ease-out" : "transform 0.55s cubic-bezier(0.23,1,0.32,1)",
    }}>
      {/* glow */}
      <div style={{
        position: "absolute", inset: hov ? -20 : -8, borderRadius: 22,
        background: `radial-gradient(ellipse at 50% 100%, ${room.color}${hov ? "55" : "28"} 0%, transparent 70%)`,
        filter: `blur(${hov ? 12 : 4}px)`,
        transition: "all 0.3s ease",
      }} />
      <div style={{
        width: "100%", height: "100%", borderRadius: 10,
        border: `1.5px solid ${room.color}${hov ? "90" : "35"}`,
        background: hov
          ? `linear-gradient(165deg,${room.color}28 0%,rgba(10,10,22,.95) 60%)`
          : `linear-gradient(165deg,${room.color}18 0%,rgba(5,5,12,.92) 55%)`,
        boxShadow: hov
          ? `0 50px 90px rgba(0,0,0,.75),0 0 70px ${room.color}45,inset 0 1px 0 rgba(255,255,255,.12)`
          : `0 8px 32px rgba(0,0,0,.45),0 0 28px ${room.color}16`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 12,
        transition: "all 0.3s ease",
        backdropFilter: "blur(8px)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg,transparent,${room.color}${hov ? "90" : "55"},transparent)`,
        }} />
        {/* cursor glare */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 10,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%,rgba(255,255,255,.18) 0%,transparent 58%)`,
          opacity: hov ? 1 : 0, transition: hov ? "opacity .1s" : "opacity .35s",
          mixBlendMode: "screen" as const,
        }} />
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: `${room.color}${hov ? "22" : "14"}`,
          border: `1.5px solid ${room.color}${hov ? "65" : "40"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26,
          transform: hov ? "scale(1.18)" : "scale(1)",
          transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1)",
          position: "relative", zIndex: 1,
        }}>
          {room.icon}
        </div>
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <p style={{ color: "white", fontWeight: 700, fontSize: 13, margin: 0, letterSpacing: "0.02em" }}>
            {room.label}
          </p>
          <p style={{ color: room.color, fontSize: 9, margin: "4px 0 0", opacity: hov ? 1 : 0.7, fontWeight: 700, letterSpacing: "0.1em", transition: "opacity 0.2s" }}>
            {hov ? "CLICK TO ENTER" : "· ROOM ·"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Room box (true 3D: back wall + 4 side faces) ──────────────────────────────
// IMPORTANT: no opacity on the preserve-3d parent — opacity creates a stacking
// context that flattens all child 3D transforms. Visibility is handled by React
// conditional rendering instead (only the target room box is ever mounted).
function RoomBox({ id, color, contentReady, active, children }: { id: RoomId; color: string; contentReady: boolean; active: boolean; children: React.ReactNode }) {
  const [wx, wz] = ROOM_POS[id];
  const boxZ = wz - ROOM_D / 2;

  const face = (
    transform: string,
    w: number,
    h: number,
    bg: string,
    extra?: React.CSSProperties
  ) => (
    <div style={{
      position: "absolute",
      width: w, height: h,
      left: -w / 2, top: -h / 2,
      transform,
      background: bg,
      backfaceVisibility: "hidden",
      ...extra,
    }} />
  );

  return (
    <div style={{
      position: "absolute", left: "50%", top: "50%",
      width: 0, height: 0,
      transform: `translate(-50%,-50%) translate3d(${wx}px,0px,${boxZ}px)`,
      transformStyle: "preserve-3d",
      pointerEvents: active ? "auto" : "none",
    }}>
      {/* ── back wall (content lives here) ── */}
      <div style={{
        position: "absolute",
        width: ROOM_W, height: ROOM_H,
        left: -ROOM_W / 2, top: -ROOM_H / 2,
        transform: `translateZ(${-ROOM_D / 2}px)`,
        background: "rgba(4,4,11,0.98)",
        backfaceVisibility: "hidden",
        overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* color top edge */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg,transparent,${color}90,transparent)`,
        }} />
        {/* ambient glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 70% 45% at 50% 0%,${color}14 0%,transparent 70%)`,
        }} />
        <div style={{
          position: "relative", zIndex: 1, width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          opacity: contentReady ? 1 : 0,
          transform: contentReady ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
          WebkitFontSmoothing: "antialiased" as const,
        }}>
          {children}
        </div>
      </div>

      {/* ── left wall: rotateY(+90) → normal +Z rotates to +X (faces interior) ── */}
      {face(
        `translateX(${-ROOM_W / 2}px) rotateY(90deg)`,
        ROOM_D, ROOM_H,
        `linear-gradient(to right, rgba(4,4,11,0.96), ${color}10)`,
        { borderRight: `1px solid ${color}20` }
      )}

      {/* ── right wall: rotateY(-90) → normal +Z rotates to -X (faces interior) ── */}
      {face(
        `translateX(${ROOM_W / 2}px) rotateY(-90deg)`,
        ROOM_D, ROOM_H,
        `linear-gradient(to left, rgba(4,4,11,0.96), ${color}10)`,
        { borderLeft: `1px solid ${color}20` }
      )}

      {/* ── floor ── */}
      {face(
        `translateY(${ROOM_H / 2}px) rotateX(90deg)`,
        ROOM_W, ROOM_D,
        `rgba(4,4,11,0.92)`,
        {
          backgroundImage: `linear-gradient(${color}18 1px,transparent 1px),linear-gradient(90deg,${color}18 1px,transparent 1px)`,
          backgroundSize: "140px 140px",
        }
      )}

      {/* ── ceiling ── */}
      {face(
        `translateY(${-ROOM_H / 2}px) rotateX(-90deg)`,
        ROOM_W, ROOM_D,
        `rgba(4,4,11,0.88)`
      )}
    </div>
  );
}

// ── Room content ───────────────────────────────────────────────────────────────
function ContentProjects({ onEnterRoom }: { onEnterRoom?: (id: RoomId) => void }) {
  const featured = allProjects.slice(0, 3);
  const skills = [
    { name: "Next.js",    color: "#ffffff" },
    { name: "React",      color: "#61DAFB" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Node.js",    color: "#68A063" },
    { name: "Python",     color: "#FFD43B" },
    { name: "Shopify",    color: "#96BF48" },
    { name: "Tailwind",   color: "#38BDF8" },
    { name: "Firebase",   color: "#FFCA28" },
    { name: "AI / ML",    color: "#a78bfa" },
    { name: "PostgreSQL", color: "#336791" },
  ];

  return (
    <div style={{ width: "100%" }}>

      {/* ── Hero bio row ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 48,
        padding: "36px 44px", borderRadius: 28, marginBottom: 44,
        border: "1.5px solid rgba(167,139,250,0.2)",
        background: "linear-gradient(120deg, rgba(167,139,250,0.09) 0%, rgba(96,165,250,0.05) 100%)",
      }}>
        {/* avatar */}
        <div style={{
          width: 160, height: 160, borderRadius: 28, overflow: "hidden",
          border: "3px solid rgba(167,139,250,0.4)", flexShrink: 0,
          boxShadow: "0 0 48px rgba(167,139,250,0.2)",
        }}>
          <Image src="/DP.jpg" alt="Rajdeep" width={160} height={160} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* name + bio */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
            <h2 style={{ color: "white", fontWeight: 900, fontSize: 46, margin: 0, letterSpacing: "-0.02em" }}>Rajdeep Kotoky</h2>
            <span style={{
              fontSize: 18, fontWeight: 700, letterSpacing: "0.07em",
              padding: "5px 16px", borderRadius: 999,
              background: "rgba(74,222,128,0.12)", border: "1.5px solid rgba(74,222,128,0.35)",
              color: "#4ade80",
            }}>AVAILABLE</span>
          </div>
          <p style={{ color: "#a78bfa", fontSize: 24, margin: "0 0 14px", fontWeight: 600 }}>
            Full-Stack Dev · AI/ML Engineer · Shopify Expert
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 22, margin: 0, lineHeight: 1.7 }}>
            Based in Assam, India — 5+ years building fast web apps, Shopify stores,
            and AI-powered products for 25+ clients worldwide.
          </p>
        </div>

        {/* stats */}
        <div style={{ display: "flex", gap: 32, flexShrink: 0 }}>
          {[["25+","Clients"],["18","Shopify"],["5+","Yrs exp"]].map(([v,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <p style={{
                fontWeight: 900, fontSize: 44, margin: 0, lineHeight: 1,
                background: "linear-gradient(135deg,#a78bfa,#60a5fa)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{v}</p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 18, margin: "6px 0 0", fontWeight: 600, letterSpacing: "0.06em" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Two-column: projects + skills ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 36 }}>

        {/* Featured projects */}
        <div>
          <p style={{ color: "rgba(167,139,250,0.6)", fontSize: 20, letterSpacing: "0.18em", fontWeight: 800, margin: "0 0 22px", textTransform: "uppercase" as const }}>
            Featured Projects
          </p>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 20 }}>
            {featured.map((p) => (
              <div key={p.id} style={{
                borderRadius: 20, border: "1.5px solid rgba(167,139,250,0.18)",
                background: "rgba(167,139,250,0.06)",
                padding: "24px 28px", display: "flex", flexDirection: "column" as const, gap: 12,
              }}>
                <p style={{ color: "white", fontWeight: 800, fontSize: 28, margin: 0, lineHeight: 1.25 }}>{p.title}</p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 20, margin: 0, lineHeight: 1.6 }}>
                  {p.description.slice(0, 100)}…
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                  <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
                    {p.tech.slice(0, 3).map((t) => (
                      <span key={t} style={{
                        fontSize: 17, padding: "4px 14px", borderRadius: 999,
                        background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.22)",
                        color: "#c4b5fd", fontWeight: 600,
                      }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 22 }}>
                    {p.demo !== "#" && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 20, color: "#a78bfa", textDecoration: "none", fontWeight: 700 }}>Demo →</a>
                    )}
                    {p.github !== "#" && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 20, color: "rgba(255,255,255,0.35)", textDecoration: "none", fontWeight: 600 }}>Code</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => onEnterRoom?.("allprojects")}
              style={{
                fontSize: 20, color: "rgba(167,139,250,0.7)", fontWeight: 700,
                letterSpacing: "0.06em", background: "none", border: "none",
                cursor: "pointer", textAlign: "center" as const, marginTop: 6,
                padding: "10px 0", width: "100%",
              }}
            >
              View all projects →
            </button>
          </div>
        </div>

        {/* Tech stack + CTA */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
          <p style={{ color: "rgba(96,165,250,0.6)", fontSize: 20, letterSpacing: "0.18em", fontWeight: 800, margin: "0 0 22px", textTransform: "uppercase" as const }}>
            Tech Stack
          </p>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 14 }}>
            {skills.map((s) => (
              <div key={s.name} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 20px", borderRadius: 14,
                border: `1.5px solid ${s.color}28`,
                background: `${s.color}0e`,
              }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.88)", fontSize: 20, fontWeight: 700 }}>{s.name}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ marginTop: 36, display: "flex", gap: 16 }}>
            <a href={`${CONTACT.whatsappHref}?text=Hi%20Rajdeep!`} target="_blank" rel="noopener noreferrer" style={{
              flex: 1, textAlign: "center" as const,
              padding: "18px 0", borderRadius: 16, fontSize: 22, fontWeight: 800,
              background: "rgba(37,211,102,0.12)", border: "1.5px solid rgba(37,211,102,0.3)",
              color: "#25D366", textDecoration: "none",
            }}>WhatsApp</a>
            <a href={CONTACT.mailtoHref} style={{
              flex: 1, textAlign: "center" as const,
              padding: "18px 0", borderRadius: 16, fontSize: 22, fontWeight: 800,
              background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.55)", textDecoration: "none",
            }}>Email</a>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Reviews — pure Three.js/WebGL (crisp at any CSS 3D scale, see About) ──────
// Same zoom=50 convention: x ∈ [-22,22], y ∈ [-14,14]
function TestimonialCard3D({ t, x, y, w, h }: { t: (typeof testimonials)[number]; x: number; y: number; w: number; h: number }) {
  const padX = -w / 2 + 0.75;
  const stars = "★★★★★".slice(0, t.rating);
  return (
    <group position={[x, y, 0]}>
      <mesh position={[0, 0, -0.07]}>
        <planeGeometry args={[w + 0.25, h + 0.25]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.18} />
      </mesh>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial color="#120d02" transparent opacity={0.94} />
      </mesh>

      {/* Avatar */}
      <mesh position={[padX + 0.65, h / 2 - 1.25, 0.05]}>
        <circleGeometry args={[0.65, 32]} />
        <meshBasicMaterial color={t.avatarColor} />
      </mesh>
      <Text position={[padX + 0.65, h / 2 - 1.25, 0.1]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
        {t.initial}
      </Text>

      {/* Name / role */}
      <Text position={[padX + 1.65, h / 2 - 1.0, 0.1]} fontSize={0.46} color="white" anchorX="left" anchorY="middle">
        {t.name}
      </Text>
      <Text position={[padX + 1.65, h / 2 - 1.6, 0.1]} fontSize={0.34} color="#8899aa" anchorX="left" anchorY="middle">
        {t.role}
      </Text>

      {/* Stars */}
      <Text position={[padX, h / 2 - 2.4, 0.1]} fontSize={0.44} color="#fbbf24" anchorX="left" anchorY="middle" letterSpacing={0.05}>
        {stars}
      </Text>

      {/* Quote */}
      {t.text && (
        <Text
          position={[padX, h / 2 - 3.05, 0.1]}
          fontSize={0.38} color="#c7ccd4"
          anchorX="left" anchorY="top"
          maxWidth={w - 1.5} lineHeight={1.5}
        >
          {`"${t.text}"`}
        </Text>
      )}
    </group>
  );
}

function CarouselArrow({ x, y, dir, onClick }: { x: number; y: number; dir: -1 | 1; onClick: () => void }) {
  return (
    <group
      // z=0.5 keeps the arrow drawn in front of whatever carousel card is
      // currently peeking underneath it at this x position while scrolling.
      position={[x, y, 0.5]}
      onClick={onClick}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "default"; }}
    >
      <mesh>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial color="#151109" opacity={1} />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <ringGeometry args={[1, 1.12, 32]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.55} />
      </mesh>
      <Text position={[0, 0.02, 0.05]} fontSize={0.8} color="#fbbf24" anchorX="center" anchorY="middle">
        {dir < 0 ? "‹" : "›"}
      </Text>
    </group>
  );
}

const TESTIMONIALS_STEP = 9;
const TESTIMONIALS_CARDS_PER_VIEW = 3;

function TestimonialsCarousel({ rest }: { rest: typeof testimonials }) {
  // Looping carousel: `step` is unbounded (not clamped/modulo'd) so prev/next
  // never disables. Three copies of the list are rendered back-to-back —
  // stepping past either end always has a card already in place, so the
  // slide never has to jump back to the start.
  const count = rest.length;
  const [step, setStep] = useState(0);
  const baseOffset = -((TESTIMONIALS_CARDS_PER_VIEW - 1) * TESTIMONIALS_STEP) / 2;
  const targetX = useRef(baseOffset);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    targetX.current = baseOffset - step * TESTIMONIALS_STEP;
  }, [step, baseOffset]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x += (targetX.current - groupRef.current.position.x) * 0.15;
    }
  });

  const loop = [...rest, ...rest, ...rest];

  return (
    <group position={[0, -6, 0]}>
      <group ref={groupRef}>
        {loop.map((t, i) => (
          <TestimonialCard3D key={`${t.id}-${i}`} t={t} x={(i - count) * TESTIMONIALS_STEP} y={0} w={8.2} h={7.4} />
        ))}
      </group>
      <CarouselArrow x={-19.5} y={0} dir={-1} onClick={() => setStep((v) => v - 1)} />
      <CarouselArrow x={19.5} y={0} dir={1} onClick={() => setStep((v) => v + 1)} />
    </group>
  );
}

function TestimonialsScene() {
  const featured = testimonials.slice(0, 3);
  const rest = testimonials.slice(3);

  return (
    <>
      <Text position={[0, 12.2, 0]} fontSize={0.5} color="rgba(251,191,36,0.75)" anchorX="center" anchorY="middle" letterSpacing={0.15}>
        CLIENT FEEDBACK
      </Text>
      <Text position={[0, 10.6, 0]} fontSize={1.9} color="white" anchorX="center" anchorY="middle">
        Real Reviews
      </Text>

      {featured.map((t, i) => (
        <TestimonialCard3D key={t.id} t={t} x={(i - 1) * 11} y={3.2} w={10.2} h={8.2} />
      ))}

      {rest.length > 0 && <TestimonialsCarousel rest={rest} />}
    </>
  );
}

function ContentTestimonials() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        orthographic
        camera={{ zoom: 50, position: [0, 0, 10], near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        // getBoundingClientRect() (react-use-measure's default) reports the
        // *projected* size of this container after the room's CSS 3D
        // perspective transform, not its real 2200×1400 layout box — offsetSize
        // switches measurement to offsetWidth/offsetHeight, which ignore transforms.
        resize={{ scroll: false, debounce: 0, offsetSize: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <TestimonialsScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

// ── About Me — pure Three.js/WebGL (crisp at any CSS 3D scale) ────────────────
// WebGL renders at device DPR → no blurriness regardless of CSS perspective.
// zoom=50: 1 world unit = 50 CSS px. Canvas is ROOM_W×ROOM_H = 2200×1400 px
// → world space: x ∈ [-22,22], y ∈ [-14,14]

const ABOUT_STATS = [
  { v: "25+", l: "CLIENTS",  x: -15 },
  { v: "18",  l: "SHOPIFY",  x:  -5 },
  { v: "5+",  l: "YRS EXP",  x:   5 },
  { v: "4+",  l: "PROJECTS", x:  15 },
];

const ABOUT_CHIPS = [
  { n: "Next.js",    c: "#ffffff", x: -16.5 },
  { n: "React",      c: "#61DAFB", x: -10.5 },
  { n: "TypeScript", c: "#3178C6", x:  -3.5 },
  { n: "Shopify",    c: "#96BF48", x:   3.5 },
  { n: "AI / ML",    c: "#a78bfa", x:   10  },
];

// Animated floating name
function AboutName() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = 10.2 + Math.sin(clock.elapsedTime * 0.55) * 0.14;
  });
  return (
    <group ref={ref}>
      <Center>
        <Text3D
          font="/helvetiker_bold.typeface.json"
          size={1.55} height={0.30}
          curveSegments={8}
          bevelEnabled bevelThickness={0.024} bevelSize={0.016} bevelSegments={5}
        >
          RAJDEEP KOTOKY
          <meshStandardMaterial color="white" metalness={0.45} roughness={0.2} />
        </Text3D>
      </Center>
    </group>
  );
}

// Avatar circle + green ring + available dot
function AboutAvatar() {
  const texture = useTexture("/DP.jpg");
  const glowRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (glowRef.current) {
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.12 + Math.sin(clock.elapsedTime * 1.8) * 0.08;
    }
  });
  return (
    <group position={[-16, 4.5, 0]}>
      {/* Outer animated glow */}
      <mesh ref={glowRef} position={[0, 0, -0.15]}>
        <ringGeometry args={[4.2, 5.6, 64]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.15} />
      </mesh>
      {/* Green border */}
      <mesh position={[0, 0, -0.08]}>
        <ringGeometry args={[3.85, 4.2, 64]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.7} />
      </mesh>
      {/* Photo */}
      <mesh>
        <circleGeometry args={[3.85, 64]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      {/* Available dot */}
      <mesh position={[2.9, -2.9, 0.1]}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color="#4ade80" />
      </mesh>
      <mesh position={[2.9, -2.9, 0.05]}>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial color="#4ade80" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function AboutScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 12, 8]} intensity={1.1} />
      <pointLight position={[-12, 6, 8]}  color="#34d399" intensity={10} />
      <pointLight position={[ 14, -4, 8]} color="#10b981" intensity={5}  />

      {/* Avatar */}
      <AboutAvatar />

      {/* Available badge */}
      <Text
        position={[-16, -1.2, 0]}
        fontSize={0.5} color="#4ade80"
        anchorX="center" anchorY="middle"
        letterSpacing={0.12}
      >
        ● AVAILABLE FOR WORK
      </Text>

      {/* Name (animated, extruded 3-D) */}
      <AboutName />

      {/* Role */}
      <Text
        position={[2, 7.5, 0]}
        fontSize={0.70} color="#34d399"
        anchorX="center" anchorY="middle"
        letterSpacing={0.03}
      >
        Full-Stack Dev  ·  AI/ML Engineer  ·  Shopify Expert
      </Text>

      {/* Bio */}
      <Text
        position={[-5.5, 5.8, 0]}
        fontSize={0.60} color="#8899aa"
        anchorX="left" anchorY="top"
        maxWidth={23} lineHeight={1.75}
      >
        {`Based in Assam, India — 5+ years building fast\nweb apps, Shopify stores, and AI-powered\nproducts for 25+ clients worldwide.`}
      </Text>

      {/* Stats */}
      {ABOUT_STATS.map(s => (
        <group key={s.l} position={[s.x, -3.8, 0]}>
          {/* Border frame */}
          <mesh position={[0, 0, -0.07]}>
            <planeGeometry args={[9.6, 5.8]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.22} />
          </mesh>
          {/* Card */}
          <mesh>
            <planeGeometry args={[9.2, 5.4]} />
            <meshBasicMaterial color="#030d08" transparent opacity={0.92} />
          </mesh>
          {/* Value */}
          <Text position={[0, 0.95, 0.1]} fontSize={1.72} color="#34d399" anchorX="center" anchorY="middle">
            {s.v}
          </Text>
          {/* Label */}
          <Text position={[0, -1.05, 0.1]} fontSize={0.50} color="#556677" anchorX="center" anchorY="middle" letterSpacing={0.1}>
            {s.l}
          </Text>
        </group>
      ))}

      {/* Stack chips */}
      {ABOUT_CHIPS.map(s => (
        <group key={s.n} position={[s.x, -9.6, 0]}>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[5.6, 2.2]} />
            <meshBasicMaterial color={s.c} transparent opacity={0.16} />
          </mesh>
          <mesh>
            <planeGeometry args={[5.2, 1.8]} />
            <meshBasicMaterial color="#0a0a14" transparent opacity={0.85} />
          </mesh>
          <Text position={[0, 0, 0.1]} fontSize={0.54} color={s.c} anchorX="center" anchorY="middle">
            {s.n}
          </Text>
        </group>
      ))}

      {/* WhatsApp CTA */}
      <group position={[18.5, -9.3, 0]}>
        <mesh position={[0, 0, -0.06]}>
          <planeGeometry args={[7.6, 2.8]} />
          <meshBasicMaterial color="#25D366" transparent opacity={0.28} />
        </mesh>
        <mesh
          onClick={() => window.open(CONTACT.whatsappHref, "_blank")}
          onPointerOver={() => { document.body.style.cursor = "pointer"; }}
          onPointerOut={() => { document.body.style.cursor = "default"; }}
        >
          <planeGeometry args={[7.2, 2.4]} />
          <meshBasicMaterial color="#0d2016" transparent opacity={0.95} />
        </mesh>
        <Text position={[0, 0, 0.1]} fontSize={0.72} color="#25D366" anchorX="center" anchorY="middle">
          WhatsApp
        </Text>
      </group>

      {/* Email CTA */}
      <group position={[18.5, -12.2, 0]}>
        <mesh position={[0, 0, -0.06]}>
          <planeGeometry args={[7.6, 2.8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>
        <mesh
          onClick={() => window.open(CONTACT.mailtoHref)}
          onPointerOver={() => { document.body.style.cursor = "pointer"; }}
          onPointerOut={() => { document.body.style.cursor = "default"; }}
        >
          <planeGeometry args={[7.2, 2.4]} />
          <meshBasicMaterial color="#0e0e1a" transparent opacity={0.95} />
        </mesh>
        <Text position={[0, 0, 0.1]} fontSize={0.72} color="#aaaacc" anchorX="center" anchorY="middle">
          Email
        </Text>
      </group>
    </>
  );
}

function ContentAbout() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        orthographic
        camera={{ zoom: 50, position: [0, 0, 10], near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        // see ContentTestimonials — avoids getBoundingClientRect() picking up
        // the room's CSS 3D perspective-projected (scaled) size instead of
        // the real layout box.
        resize={{ scroll: false, debounce: 0, offsetSize: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <AboutScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

function ContentSkills() {
  const skills = [
    { name: "Next.js",    color: "#ffffff", desc: "App Router, SSR, ISR" },
    { name: "React",      color: "#61DAFB", desc: "Hooks, context, state" },
    { name: "TypeScript", color: "#3178C6", desc: "Type-safe code" },
    { name: "Tailwind",   color: "#38BDF8", desc: "Utility-first CSS" },
    { name: "Node.js",    color: "#68A063", desc: "REST APIs, websockets" },
    { name: "Python",     color: "#FFD43B", desc: "Scripts, ML pipelines" },
    { name: "Shopify",    color: "#96BF48", desc: "Liquid, Hydrogen, CLI" },
    { name: "Firebase",   color: "#FFCA28", desc: "Auth, Firestore, fns" },
    { name: "AI / ML",    color: "#a78bfa", desc: "LLMs, embeddings, agents" },
  ];
  return (
    <div style={{ width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <p style={{ color: "rgba(96,165,250,0.6)", fontSize: 10, letterSpacing: "0.15em", fontWeight: 700, marginBottom: 8 }}>TECH STACK</p>
        <h2 style={{ color: "white", fontWeight: 900, fontSize: "clamp(26px,4vw,44px)", margin: 0, letterSpacing: "-0.02em" }}>Skills</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {skills.map((s) => (
          <div key={s.name} style={{
            borderRadius: 12, border: `1px solid ${s.color}22`,
            background: `${s.color}0c`,
            padding: "12px 14px", display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
            <div>
              <p style={{ color: "white", fontSize: 13, fontWeight: 700, margin: 0 }}>{s.name}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentServices() {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <p style={{ color: "rgba(244,114,182,0.6)", fontSize: 10, letterSpacing: "0.15em", fontWeight: 700, marginBottom: 8 }}>FAST HELP</p>
      <h2 style={{ color: "white", fontWeight: 900, fontSize: "clamp(26px,5vw,52px)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
        Got a bug?{" "}
        <span style={{ background: "linear-gradient(90deg,#f472b6,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Quick Fix.
        </span>
      </h2>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: 28 }}>Minor charge. Free within active engagements.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Bug Fix",         icon: "🐛" },
          { label: "Code Review",     icon: "🔍" },
          { label: "UI Polish",       icon: "✨" },
          { label: "API Integration", icon: "🔌" },
        ].map((s) => (
          <div key={s.label} style={{
            borderRadius: 14, border: "1px solid rgba(244,114,182,0.18)",
            background: "rgba(244,114,182,0.06)",
            padding: "16px 12px", display: "flex", flexDirection: "column" as const,
            alignItems: "center", gap: 8,
          }}>
            <span style={{ fontSize: 28 }}>{s.icon}</span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600, textAlign: "center" }}>{s.label}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <a href={`${CONTACT.whatsappHref}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20help!`}
          target="_blank" rel="noopener noreferrer" style={{
            padding: "11px 22px", borderRadius: 12, fontSize: 13, fontWeight: 700,
            background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)",
            color: "#25D366", textDecoration: "none",
          }}>WhatsApp</a>
        <a href={CONTACT.telHref} style={{
          padding: "11px 22px", borderRadius: 12, fontSize: 13, fontWeight: 700,
          background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.25)",
          color: "#93c5fd", textDecoration: "none",
        }}>Call now</a>
      </div>
    </div>
  );
}

function ContentContact() {
  return (
    <div style={{ width: "100%", maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
      <p style={{ color: "rgba(129,140,248,0.6)", fontSize: 10, letterSpacing: "0.15em", fontWeight: 700, marginBottom: 8 }}>READY TO START?</p>
      <h2 style={{ color: "white", fontWeight: 900, fontSize: "clamp(32px,5.5vw,68px)", margin: "0 0 12px", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
        Let&apos;s build{" "}
        <span style={{ background: "linear-gradient(90deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          something.
        </span>
      </h2>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 32 }}>Got a project idea? I&apos;m available now.</p>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, maxWidth: 360, margin: "0 auto" }}>
        <a href={`${CONTACT.whatsappHref}?text=Hi%20Rajdeep%2C%20I%20have%20a%20project!`}
          target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "14px 24px", borderRadius: 14, fontSize: 14, fontWeight: 700,
            background: "rgba(37,211,102,0.14)", border: "1px solid rgba(37,211,102,0.35)",
            color: "#25D366", textDecoration: "none",
          }}>WhatsApp me</a>
        <a href={CONTACT.mailtoHref} style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "14px 24px", borderRadius: 14, fontSize: 14, fontWeight: 700,
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.6)", textDecoration: "none",
        }}>Send email</a>
      </div>
    </div>
  );
}

function ContentAllProjects() {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{ color: "rgba(129,140,248,0.6)", fontSize: 20, letterSpacing: "0.18em", fontWeight: 800, margin: "0 0 12px", textTransform: "uppercase" as const }}>Portfolio</p>
        <h2 style={{ color: "white", fontWeight: 900, fontSize: 56, margin: 0, letterSpacing: "-0.02em", lineHeight: 1 }}>
          All{" "}
          <span style={{ background: "linear-gradient(90deg,#818cf8,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Projects
          </span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxHeight: 780, overflowY: "auto", paddingRight: 8 }}>
        {allProjects.map((p) => (
          <div key={p.id} style={{
            borderRadius: 20, border: "1.5px solid rgba(129,140,248,0.18)",
            background: "rgba(129,140,248,0.06)",
            padding: "26px 28px", display: "flex", flexDirection: "column" as const, gap: 14,
          }}>
            <p style={{ color: "white", fontWeight: 800, fontSize: 26, margin: 0, lineHeight: 1.25 }}>{p.title}</p>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 18, margin: 0, lineHeight: 1.65, flex: 1 }}>
              {p.description.slice(0, 110)}…
            </p>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
              {p.tech.slice(0, 3).map((t) => (
                <span key={t} style={{
                  fontSize: 15, padding: "4px 12px", borderRadius: 999,
                  background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.22)",
                  color: "#a5b4fc", fontWeight: 600,
                }}>{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 22, marginTop: 4 }}>
              {p.demo !== "#" && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 18, color: "#818cf8", textDecoration: "none", fontWeight: 700 }}>Demo →</a>
              )}
              {p.github !== "#" && (
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 18, color: "rgba(255,255,255,0.32)", textDecoration: "none", fontWeight: 600 }}>Code</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoomContent({ id, onEnterRoom }: { id: RoomId; onEnterRoom?: (id: RoomId) => void }) {
  switch (id) {
    case "projects":     return <ContentProjects onEnterRoom={onEnterRoom} />;
    case "testimonials": return <ContentTestimonials />;
    case "about":        return <ContentAbout />;
    case "allprojects":  return <ContentAllProjects />;
    case "skills":       return <ContentSkills />;
    case "services":     return <ContentServices />;
    case "contact":      return <ContentContact />;
    default:             return null;
  }
}

// ── ZoomClient ─────────────────────────────────────────────────────────────────
export default function ZoomClient() {
  // React state: drives which room box is mounted + UI labels
  const [activeRoom,    setActiveRoom]    = useState<RoomId>("hall");
  // tgtRoomState = which RoomBox to render (null = none = we're in / going to hall)
  const [tgtRoomState,  setTgtRoomState]  = useState<RoomId | null>(null);
  const [camera,        setCamera]        = useState({ x: 0, z: 0 });
  const [isTraveling,   setIsTraveling]   = useState(false);
  const [contentReady,  setContentReady]  = useState(false);
  const [hoveredDoor,   setHoveredDoor]   = useState<RoomId | null>(null);
  const [doorTilt,      setDoorTilt]      = useState({ rx: 0, ry: 0 });
  const [doorGlare,     setDoorGlare]     = useState({ x: 50, y: 50 });
  const doorRefs = useRef<Partial<Record<RoomId, HTMLDivElement | null>>>({});
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  // Keep a ref so closures always see the latest activeRoom without re-creating callbacks
  const activeRoomRef = useRef<RoomId>("hall");
  activeRoomRef.current = activeRoom;

  const enterRoom = (id: RoomId) => {
    clearTimers();
    setContentReady(false);
    setIsTraveling(true);

    const doEnter = () => {
      const [x, z] = ROOM_POS[id];
      setActiveRoom(id);
      setTgtRoomState(id);
      requestAnimationFrame(() => setCamera({ x, z }));
      timers.current.push(setTimeout(() => {
        setIsTraveling(false);
        setContentReady(true);
      }, ANIM_MS));
    };

    if (activeRoomRef.current === "hall") {
      // Already in hall — enter directly
      doEnter();
    } else {
      // In a room — fly back to hall keeping room walls visible, then enter target
      setActiveRoom("hall");
      setCamera({ x: 0, z: 0 });          // start flying back; room box stays mounted
      timers.current.push(setTimeout(() => {
        setTgtRoomState(null);             // unmount old room only after camera arrives
        // one RAF so React flushes the unmount before starting the next transition
        requestAnimationFrame(() => {
          timers.current.push(setTimeout(doEnter, 180));
        });
      }, ANIM_MS));
    }
  };

  const goToHall = () => {
    clearTimers();
    setContentReady(false);
    setIsTraveling(true);
    setActiveRoom("hall");
    setCamera({ x: 0, z: 0 });
    timers.current.push(setTimeout(() => {
      setTgtRoomState(null);
      setIsTraveling(false);
    }, ANIM_MS));
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  // Once hover starts, track the door card's real (post-transform, enlarged)
  // screen rect so the hover effect only ends when the cursor truly leaves
  // the card as rendered — not the smaller resting-size hotspot that started it.
  useEffect(() => {
    if (!hoveredDoor) return;

    const handleMove = (e: MouseEvent) => {
      const el = doorRefs.current[hoveredDoor];
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right
        && e.clientY >= r.top && e.clientY <= r.bottom;

      if (!inside) {
        setHoveredDoor(null);
        setDoorTilt({ rx: 0, ry: 0 });
        setDoorGlare({ x: 50, y: 50 });
        return;
      }

      const cx = (e.clientX - r.left) / r.width;
      const cy = (e.clientY - r.top) / r.height;
      setDoorTilt({ rx: (cy - 0.5) * -22, ry: (cx - 0.5) * 22 });
      setDoorGlare({ x: cx * 100, y: cy * 100 });
    };

    const clearHover = () => {
      setHoveredDoor(null);
      setDoorTilt({ rx: 0, ry: 0 });
      setDoorGlare({ x: 50, y: 50 });
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", clearHover);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", clearHover);
    };
  }, [hoveredDoor]);

  /*
  useEffect(() => {
    const animate = (now: number) => {
      // Time-based ease-in: slow start → fast finish
      const elapsed = now - animStart.current;
      const t       = Math.min(1, elapsed / ANIM_MS);
      const easedT  = easeInOut(t);

      camX.current = fromX.current + (tgtX.current - fromX.current) * easedT;
      camZ.current = fromZ.current + (tgtZ.current - fromZ.current) * easedT;

      if (sceneRef.current) {
        sceneRef.current.style.transform =
          `translate3d(${-camX.current}px, 0px, ${-camZ.current}px)`;
      }

      const dx = tgtX.current - camX.current;
      const dz = tgtZ.current - camZ.current;
      const travelDist = Math.sqrt(dx * dx + dz * dz);

      if (travelDist < ARRIVE_DIST && activeRoomRef.current !== tgtRoom.current) {
        activeRoomRef.current = tgtRoom.current;
        setActiveRoom(tgtRoom.current);
      }

      // Vignette fades in while traveling, out when arrived
      if (vigRef.current) {
        vigRef.current.style.opacity = String(Math.min(1, travelDist / 900) * 0.62);
      }

      // Hide hall via display:none (safe with preserve-3d; opacity is not)
      // Show it only when camera is heading to hall and getting close
      const hallDist = Math.sqrt(camX.current ** 2 + camZ.current ** 2);
      if (hallGroupRef.current) {
        // Show hall when physically near origin — not gated on tgtRoom, so the
        // hall stays visible for the first part of every room-entry animation
        const showHall = hallDist < 1400;
        hallGroupRef.current.style.display = showHall ? "" : "none";
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame((ts) => animate(ts));
    return () => {
      cancelAnimationFrame(rafId.current);
      if (hallTimeoutRef.current) clearTimeout(hallTimeoutRef.current);
    };
  }, []);

  */

  const inHall = activeRoom === "hall";
  const activeRoomMeta = ROOMS.find((r) => r.id === activeRoom);

  return (
    <div
      data-lenis-prevent=""
      style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#04040c" }}
    >
      {/* ── 3D scene ── */}
      <div style={{
        position: "absolute", inset: 0,
        perspective: `${PERSPECTIVE}px`,
        perspectiveOrigin: "50% 50%",
        zIndex: 1,
      }}>
        <div style={{
          position: "absolute", inset: 0,
          transformStyle: "preserve-3d",
          transform: `translate3d(${-camera.x}px, 0px, ${-camera.z}px)`,
          transition: `transform ${ANIM_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
          willChange: "transform",
        }}>
          <StarField />

          {/* Hall group */}
          <div style={{
            position: "absolute", inset: 0,
            transformStyle: "preserve-3d",
            pointerEvents: "none",
          }}>
            <FloorGrid />
            <HallHero />
            {DOORS.map((door) => {
              const room = ROOMS.find((r) => r.id === door.id)!;
              const hov = hoveredDoor === door.id;
              return (
                <DoorPortal
                  key={door.id}
                  x={door.x} z={door.z} ry={door.ry}
                  room={room}
                  hov={hov}
                  tilt={hov ? doorTilt : { rx: 0, ry: 0 }}
                  glare={hov ? doorGlare : { x: 50, y: 50 }}
                  domRef={(el) => { doorRefs.current[door.id] = el; }}
                />
              );
            })}
          </div>

          {/* Room boxes — walls + content (zoom:2 wrapper keeps text crisp at 0.5× perspective) */}
          {ROOMS.map((room) => (
            <RoomBox key={room.id} id={room.id} color={room.color} contentReady={tgtRoomState === room.id && contentReady} active={tgtRoomState === room.id}>
              {tgtRoomState === room.id ? <RoomContent id={room.id} onEnterRoom={enterRoom} /> : null}
            </RoomBox>
          ))}
        </div>
      </div>

      <div style={{
        position: "fixed", inset: 0, zIndex: 10, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 55% at 50% 50%, transparent 0%, rgba(0,0,0,0.95) 100%)",
        opacity: isTraveling ? 0.42 : 0,
        transition: `opacity ${Math.round(ANIM_MS * 0.45)}ms ease`,
      }} />

      {/* ── Card hotspots: 2D overlay that owns all click + hover input ── */}
      {inHall && !isTraveling && (
        <div style={{ position: "fixed", inset: 0, zIndex: 20, pointerEvents: "none" }}>
          {DOORS.map((door) => {
            // Perspective projection: scale = P/(P+|z|), screen offset = world * scale
            // cards at y=130 world-space; card size 190×270 world-space
            const sc = PERSPECTIVE / (PERSPECTIVE + Math.abs(door.z));
            const sx = door.x * sc;
            const sy = 130 * sc;
            // Rotated cards appear narrower — cos(ry) accounts for that
            const sw = 190 * Math.cos((door.ry * Math.PI) / 180) * sc;
            const sh = 270 * sc;
            return (
              <button
                key={door.id}
                type="button"
                aria-label={`Enter ${door.id}`}
                onClick={() => enterRoom(door.id)}
                onMouseEnter={(e) => {
                  // Starts the hover effect; once active, a window-level
                  // mousemove tracker (keyed off the real enlarged card rect)
                  // takes over tilt/glare updates and decides when it ends.
                  setHoveredDoor(door.id);
                  const r = e.currentTarget.getBoundingClientRect();
                  const cx = (e.clientX - r.left) / r.width;
                  const cy = (e.clientY - r.top) / r.height;
                  setDoorTilt({ rx: (cy - 0.5) * -22, ry: (cx - 0.5) * 22 });
                  setDoorGlare({ x: cx * 100, y: cy * 100 });
                }}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${sx}px)`,
                  top:  `calc(50% + ${sy}px)`,
                  width: sw, height: sh,
                  transform: "translate(-50%,-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  borderRadius: 14,
                }}
              />
            );
          })}
        </div>
      )}

      <button
        onClick={goToHall}
        style={{
          position: "fixed", top: 16, left: 16, zIndex: 50,
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 16px", borderRadius: 12,
          fontSize: 13, fontWeight: 600, cursor: "pointer",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(0,0,0,0.5)",
          color: inHall ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.65)",
          backdropFilter: "blur(10px)",
          transition: "color 0.2s, border-color 0.2s",
          pointerEvents: inHall ? "none" : "auto",
        }}
      >
        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {inHall ? "Hall" : "← Hall"}
      </button>

      {/* ── Portfolio link ── */}
      {inHall && (
        <Link href="/" style={{
          position: "fixed", bottom: 20, left: "50%", zIndex: 50,
          transform: "translateX(-50%)",
          fontSize: 11, color: "rgba(255,255,255,0.2)", fontWeight: 600,
          letterSpacing: "0.08em", textDecoration: "none",
        }}>
          ← BACK TO PORTFOLIO
        </Link>
      )}

      {/* ── Room name chip ── */}
      <div style={{
        position: "fixed", top: 16, right: 16, zIndex: 50,
        padding: "7px 16px", borderRadius: 12,
        fontSize: 12, fontWeight: 700, letterSpacing: "0.07em",
        border: `1px solid ${activeRoomMeta ? activeRoomMeta.color + "40" : "rgba(255,255,255,0.1)"}`,
        background: "rgba(0,0,0,0.5)",
        color: activeRoomMeta ? activeRoomMeta.color : "rgba(255,255,255,0.35)",
        backdropFilter: "blur(10px)",
        transition: "color 0.4s, border-color 0.4s",
      }}>
        {inHall ? "THE HALL" : activeRoomMeta?.label.toUpperCase()}
      </div>

      {/* ── Nav dots for rooms ── */}
      <div style={{
        position: "fixed", right: 16, top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50, display: "flex", flexDirection: "column", gap: 10,
      }}>
        <button
          onClick={goToHall}
          style={{
            width: activeRoom === "hall" ? 11 : 7,
            height: activeRoom === "hall" ? 11 : 7,
            borderRadius: "50%", padding: 0, cursor: "pointer", border: "none",
            background: activeRoom === "hall" ? "white" : "rgba(255,255,255,0.2)",
            transition: "all 0.25s",
          }}
          aria-label="Hall"
        />
        {ROOMS.map((r) => (
          <button
            key={r.id}
            onClick={() => enterRoom(r.id)}
            style={{
              width: activeRoom === r.id ? 11 : 7,
              height: activeRoom === r.id ? 11 : 7,
              borderRadius: "50%", padding: 0, cursor: "pointer", border: "none",
              background: activeRoom === r.id ? r.color : "rgba(255,255,255,0.2)",
              transition: "all 0.25s",
              boxShadow: activeRoom === r.id ? `0 0 8px ${r.color}` : "none",
            }}
            aria-label={`Go to ${r.label}`}
          />
        ))}
      </div>
    </div>
  );
}
