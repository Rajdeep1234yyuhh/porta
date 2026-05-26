"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { allProjects } from "../data/projects";
import { testimonials } from "../data/testimonials";

const PERSPECTIVE = 1400;
const PHONE       = "918638752315";
const ANIM_MS     = 2200;
const ARRIVE_DIST = 140;

// Room box geometry (px)
const ROOM_W = 2200;   // width
const ROOM_H = 1400;   // height
const ROOM_D = 1400;   // depth (back wall distance from entrance)

// Slow start → fast end
const easeIn = (t: number) => t * t * t;

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
};

type RoomId = keyof typeof ROOM_POS;

const ROOMS: { id: RoomId; label: string; icon: string; color: string }[] = [
  { id: "projects",     label: "Projects",   icon: "🗂️",  color: "#a78bfa" },
  { id: "testimonials", label: "Reviews",    icon: "⭐",  color: "#fbbf24" },
  { id: "about",        label: "About Me",   icon: "👤",  color: "#34d399" },
  { id: "skills",       label: "Skills",     icon: "⚡",  color: "#60a5fa" },
  { id: "services",     label: "Quick Fix",  icon: "🐛",  color: "#f472b6" },
  { id: "contact",      label: "Contact",    icon: "📬",  color: "#818cf8" },
];

// Door portal positions in world space (visible from hall)
const DOORS: { id: RoomId; x: number; z: number; ry: number }[] = [
  { id: "projects",     x:    0, z:  -700, ry:   0 },
  { id: "testimonials", x: -400, z:  -520, ry:  30 },
  { id: "about",        x:  400, z:  -520, ry: -30 },
  { id: "skills",       x: -380, z:  -870, ry:  20 },
  { id: "services",     x:  380, z:  -870, ry: -20 },
  { id: "contact",      x:    0, z: -1150, ry:   0 },
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

// ── Vignette ───────────────────────────────────────────────────────────────────
const VignetteOverlay = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} style={{
    position: "fixed", inset: 0, zIndex: 10, pointerEvents: "none",
    background: "radial-gradient(ellipse 55% 55% at 50% 50%, transparent 0%, rgba(0,0,0,0.95) 100%)",
    opacity: 0, willChange: "opacity",
  }} />
));
VignetteOverlay.displayName = "VignetteOverlay";

// ── Hall hero (lives at world origin) ─────────────────────────────────────────
function HallHero() {
  return (
    <div style={{
      position: "absolute", left: "50%", top: "50%",
      width: "min(90vw, 640px)",
      transform: "translate(-50%, -50%) translate3d(0, -60px, 0)",
      textAlign: "center", pointerEvents: "none",
    }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "5px 14px", borderRadius: 999,
        border: "1px solid rgba(167,139,250,0.3)",
        background: "rgba(167,139,250,0.08)",
        fontSize: 11, color: "rgba(167,139,250,0.9)", fontWeight: 700,
        letterSpacing: "0.08em", marginBottom: 24,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
        AVAILABLE FOR WORK
      </div>
      <h1 style={{
        fontSize: "clamp(46px, 8vw, 96px)", fontWeight: 900,
        color: "white", lineHeight: 1, letterSpacing: "-0.03em", margin: 0,
      }}>
        RAJDEEP<br />
        <span style={{
          background: "linear-gradient(90deg, #a78bfa 0%, #818cf8 50%, #60a5fa 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>KOTOKY</span>
      </h1>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 16, letterSpacing: "0.12em", fontWeight: 600 }}>
        FULL-STACK DEVELOPER · AI/ML ENGINEER
      </p>
      <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 11, marginTop: 28, letterSpacing: "0.15em" }}>
        ↓ ENTER A ROOM BELOW
      </p>
    </div>
  );
}

// ── Door portal ────────────────────────────────────────────────────────────────
function DoorPortal({
  id, x, z, ry, room, onEnter,
}: {
  id: RoomId; x: number; z: number; ry: number;
  room: typeof ROOMS[0];
  onEnter: (id: RoomId) => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={() => onEnter(id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "absolute", left: "50%", top: "50%",
        width: 190, height: 270,
        transform: `translate(-50%, -50%) translate3d(${x}px, 55px, ${z}px) rotateY(${ry}deg)`,
        cursor: "pointer",
      }}
    >
      {/* outer glow */}
      <div style={{
        position: "absolute", inset: -8,
        borderRadius: 18,
        background: `radial-gradient(ellipse at 50% 100%, ${room.color}30 0%, transparent 70%)`,
        opacity: hov ? 1 : 0.5,
        transition: "opacity 0.2s",
        pointerEvents: "none",
      }} />
      <div style={{
        width: "100%", height: "100%", borderRadius: 10,
        border: `1.5px solid ${room.color}${hov ? "60" : "35"}`,
        background: `linear-gradient(165deg, ${room.color}18 0%, rgba(5,5,12,0.92) 55%)`,
        boxShadow: hov
          ? `0 0 60px ${room.color}35, inset 0 0 40px ${room.color}12`
          : `0 0 30px ${room.color}18, inset 0 0 20px ${room.color}06`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 12,
        transition: "box-shadow 0.25s, border-color 0.25s",
        backdropFilter: "blur(6px)",
        position: "relative", overflow: "hidden",
      }}>
        {/* shimmer line at top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${room.color}60, transparent)`,
        }} />
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: `${room.color}14`,
          border: `1.5px solid ${room.color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26,
          transform: hov ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.2s",
        }}>
          {room.icon}
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "white", fontWeight: 700, fontSize: 13, margin: 0, letterSpacing: "0.02em" }}>
            {room.label}
          </p>
          <p style={{ color: room.color, fontSize: 9, margin: "4px 0 0", opacity: 0.85, fontWeight: 700, letterSpacing: "0.1em" }}>
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
function RoomBox({ id, color, children }: { id: RoomId; color: string; children: React.ReactNode }) {
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
        <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 40, boxSizing: "border-box", overflowY: "auto",
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

// ── Star rating ────────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" fill={i < rating ? "#FBBC05" : "rgba(255,255,255,0.12)"} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── Room content ───────────────────────────────────────────────────────────────
function ContentProjects() {
  const projects = allProjects.slice(0, 4);
  return (
    <div style={{ width: "min(92vw, 960px)", maxHeight: "82dvh", overflowY: "auto", padding: "0 4px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <p style={{ color: "rgba(167,139,250,0.6)", fontSize: 10, letterSpacing: "0.15em", fontWeight: 700, marginBottom: 8 }}>PORTFOLIO</p>
        <h2 style={{ color: "white", fontWeight: 900, fontSize: "clamp(26px,4vw,44px)", margin: 0, letterSpacing: "-0.02em" }}>
          Selected Work
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {projects.map((p) => (
          <div key={p.id} style={{
            borderRadius: 16, border: "1px solid rgba(167,139,250,0.2)",
            background: "rgba(167,139,250,0.06)",
            padding: 20, display: "flex", flexDirection: "column", gap: 10,
          }}>
            <h3 style={{ color: "white", fontWeight: 700, fontSize: 15, margin: 0, lineHeight: 1.3 }}>{p.title}</h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: 0, lineHeight: 1.6 }}>
              {p.description.slice(0, 100)}…
            </p>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
              {p.tech.slice(0, 3).map((t) => (
                <span key={t} style={{
                  fontSize: 10, padding: "2px 8px", borderRadius: 999,
                  background: "rgba(167,139,250,0.12)",
                  border: "1px solid rgba(167,139,250,0.2)",
                  color: "#c4b5fd", fontWeight: 600,
                }}>{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              {p.demo && p.demo !== "#" && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 11, color: "#a78bfa", textDecoration: "none", fontWeight: 600,
                }}>
                  Live demo →
                </a>
              )}
              {p.github && p.github !== "#" && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 11, color: "rgba(255,255,255,0.35)", textDecoration: "none",
                }}>
                  Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Link href="/projects" style={{
          fontSize: 12, color: "rgba(167,139,250,0.6)", fontWeight: 600, letterSpacing: "0.05em",
        }}>
          View all projects →
        </Link>
      </div>
    </div>
  );
}

function ContentTestimonials() {
  return (
    <div style={{ width: "min(92vw, 940px)", maxHeight: "82dvh", overflowY: "auto", padding: "0 4px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <p style={{ color: "rgba(251,191,36,0.6)", fontSize: 10, letterSpacing: "0.15em", fontWeight: 700, marginBottom: 8 }}>CLIENT FEEDBACK</p>
        <h2 style={{ color: "white", fontWeight: 900, fontSize: "clamp(26px,4vw,44px)", margin: 0, letterSpacing: "-0.02em" }}>
          Real Reviews
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        {testimonials.slice(0, 6).map((t) => (
          <div key={t.id} style={{
            borderRadius: 16, border: "1px solid rgba(251,191,36,0.15)",
            background: "rgba(251,191,36,0.04)",
            padding: 18, display: "flex", flexDirection: "column", gap: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: t.avatarColor, display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: 14, flexShrink: 0,
              }}>{t.initial}</div>
              <div>
                <p style={{ color: "white", fontSize: 13, fontWeight: 700, margin: 0 }}>{t.name}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0 }}>{t.role}</p>
              </div>
            </div>
            <StarRating rating={t.rating} />
            {t.text && (
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, margin: 0, lineHeight: 1.7 }}>
                &ldquo;{t.text}&rdquo;
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentAbout() {
  return (
    <div style={{ width: "min(92vw, 800px)", maxHeight: "82dvh", overflowY: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 16 }}>
          <div style={{
            width: 120, height: 120, borderRadius: 20,
            overflow: "hidden", border: "2px solid rgba(52,211,153,0.3)",
          }}>
            <Image src="/DP.jpg" alt="Rajdeep" width={120} height={120} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer" style={{
              padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
              background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)",
              color: "#25D366", textDecoration: "none",
            }}>WhatsApp</a>
            <a href="mailto:kotoky10@gmail.com" style={{
              padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)", textDecoration: "none",
            }}>Email</a>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
          <div>
            <h2 style={{ color: "white", fontWeight: 900, fontSize: "clamp(24px,3.5vw,40px)", margin: 0 }}>Rajdeep Kotoky</h2>
            <p style={{ color: "#34d399", fontSize: 13, margin: "4px 0 0", fontWeight: 600 }}>Full-Stack Dev & AI/ML Engineer</p>
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.8, margin: 0 }}>
            Based in Assam, India. I build fast, modern web apps and Shopify stores.
            5+ years of experience, 25+ happy clients worldwide. Specialized in
            Next.js, React, TypeScript, and AI/ML integrations.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {[
              { v: "4+",  l: "Projects" },
              { v: "18",  l: "Shopify" },
              { v: "25+", l: "Clients" },
              { v: "5+",  l: "Yrs Exp" },
            ].map((s) => (
              <div key={s.l} style={{
                borderRadius: 10, border: "1px solid rgba(52,211,153,0.15)",
                background: "rgba(52,211,153,0.05)", padding: "10px 8px", textAlign: "center",
              }}>
                <p style={{
                  fontWeight: 900, fontSize: 20, margin: 0,
                  background: "linear-gradient(135deg,#34d399,#10b981)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>{s.v}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, margin: "2px 0 0", fontWeight: 600 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
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
    <div style={{ width: "min(92vw, 780px)" }}>
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
    <div style={{ width: "min(92vw, 760px)", textAlign: "center" }}>
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
        <a href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20help!`}
          target="_blank" rel="noopener noreferrer" style={{
            padding: "11px 22px", borderRadius: 12, fontSize: 13, fontWeight: 700,
            background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)",
            color: "#25D366", textDecoration: "none",
          }}>WhatsApp</a>
        <a href="tel:+918638752315" style={{
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
    <div style={{ width: "min(92vw, 560px)", textAlign: "center" }}>
      <p style={{ color: "rgba(129,140,248,0.6)", fontSize: 10, letterSpacing: "0.15em", fontWeight: 700, marginBottom: 8 }}>READY TO START?</p>
      <h2 style={{ color: "white", fontWeight: 900, fontSize: "clamp(32px,5.5vw,68px)", margin: "0 0 12px", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
        Let&apos;s build{" "}
        <span style={{ background: "linear-gradient(90deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          something.
        </span>
      </h2>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 32 }}>Got a project idea? I&apos;m available now.</p>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, maxWidth: 360, margin: "0 auto" }}>
        <a href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20have%20a%20project!`}
          target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "14px 24px", borderRadius: 14, fontSize: 14, fontWeight: 700,
            background: "rgba(37,211,102,0.14)", border: "1px solid rgba(37,211,102,0.35)",
            color: "#25D366", textDecoration: "none",
          }}>WhatsApp me</a>
        <a href="mailto:kotoky10@gmail.com" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "14px 24px", borderRadius: 14, fontSize: 14, fontWeight: 700,
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.6)", textDecoration: "none",
        }}>Send email</a>
      </div>
    </div>
  );
}

function RoomContent({ id }: { id: RoomId }) {
  switch (id) {
    case "projects":     return <ContentProjects />;
    case "testimonials": return <ContentTestimonials />;
    case "about":        return <ContentAbout />;
    case "skills":       return <ContentSkills />;
    case "services":     return <ContentServices />;
    case "contact":      return <ContentContact />;
    default:             return null;
  }
}

// ── ZoomClient ─────────────────────────────────────────────────────────────────
export default function ZoomClient() {
  const sceneRef     = useRef<HTMLDivElement>(null);
  const vigRef       = useRef<HTMLDivElement>(null);
  const hallGroupRef = useRef<HTMLDivElement>(null);
  const rafId        = useRef<number>(0);
  const hallTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Camera state (refs for RAF loop)
  const camX      = useRef(0);
  const camZ      = useRef(0);
  const fromX     = useRef(0);
  const fromZ     = useRef(0);
  const tgtX      = useRef(0);
  const tgtZ      = useRef(0);
  const tgtRoom   = useRef<RoomId>("hall");
  const animStart = useRef(-ANIM_MS);

  // React state: drives which room box is mounted + UI labels
  const [activeRoom,   setActiveRoom]   = useState<RoomId>("hall");
  // tgtRoomState = which RoomBox to render (null = none = we're in / going to hall)
  const [tgtRoomState, setTgtRoomState] = useState<RoomId | null>(null);

  const enterRoom = (id: RoomId) => {
    if (hallTimeoutRef.current) clearTimeout(hallTimeoutRef.current);
    const [x, z] = ROOM_POS[id];
    fromX.current     = camX.current;
    fromZ.current     = camZ.current;
    tgtX.current      = x;
    tgtZ.current      = z;
    tgtRoom.current   = id;
    animStart.current = performance.now();
    setTgtRoomState(id);   // mount the room box immediately (appears small in distance)
  };

  const goToHall = () => {
    if (hallTimeoutRef.current) clearTimeout(hallTimeoutRef.current);
    fromX.current     = camX.current;
    fromZ.current     = camZ.current;
    tgtX.current      = 0;
    tgtZ.current      = 0;
    tgtRoom.current   = "hall";
    animStart.current = performance.now();
    // Unmount room box after 90 % of travel — long enough to keep it visible
    // during the fast-exit phase, hall appears (hallDist<1400) before this fires
    hallTimeoutRef.current = setTimeout(
      () => setTgtRoomState(null),
      ANIM_MS * 0.9
    );
  };

  useEffect(() => {
    const animate = (now: number) => {
      // Time-based ease-in: slow start → fast finish
      const elapsed = now - animStart.current;
      const t       = Math.min(1, elapsed / ANIM_MS);
      const easedT  = easeIn(t);

      camX.current = fromX.current + (tgtX.current - fromX.current) * easedT;
      camZ.current = fromZ.current + (tgtZ.current - fromZ.current) * easedT;

      if (sceneRef.current) {
        sceneRef.current.style.transform =
          `translate3d(${-camX.current}px, 0px, ${-camZ.current}px)`;
      }

      const dx = tgtX.current - camX.current;
      const dz = tgtZ.current - camZ.current;
      const travelDist = Math.sqrt(dx * dx + dz * dz);

      // Update active room label when settled
      setActiveRoom((prev) => {
        if (travelDist < ARRIVE_DIST && prev !== tgtRoom.current) return tgtRoom.current;
        return prev;
      });

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
    return () => cancelAnimationFrame(rafId.current);
  }, []);

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
        <div ref={sceneRef} style={{
          position: "absolute", inset: 0,
          transformStyle: "preserve-3d",
          transform: "translate3d(0,0,0)",
        }}>
          <StarField />

          {/* Hall group — display toggled by RAF; no opacity (preserve-3d safe) */}
          <div ref={hallGroupRef} style={{
            position: "absolute", inset: 0,
            transformStyle: "preserve-3d",
          }}>
            <FloorGrid />
            <HallHero />
            {DOORS.map((door) => {
              const room = ROOMS.find((r) => r.id === door.id)!;
              return (
                <DoorPortal key={door.id} {...door} room={room} onEnter={enterRoom} />
              );
            })}
          </div>

          {/* Only the target room box is ever mounted — no opacity needed */}
          {tgtRoomState && (
            <RoomBox id={tgtRoomState} color={ROOMS.find(r => r.id === tgtRoomState)!.color}>
              <RoomContent id={tgtRoomState} />
            </RoomBox>
          )}
        </div>
      </div>

      <VignetteOverlay ref={vigRef} />

      {/* ── Back to hall button ── */}
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
