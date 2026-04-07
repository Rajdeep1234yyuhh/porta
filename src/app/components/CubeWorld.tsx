"use client";

import { useEffect, useCallback, useState } from "react";
import { allProjects } from "../data/projects";
import { allServices } from "../data/services";

// ─── types ────────────────────────────────────────────────────────────────────

interface Rotation {
  x: number;
  y: number;
}

interface FaceConfig {
  label: string;
  rotation: Rotation;
}

// ─── constants ────────────────────────────────────────────────────────────────

const CUBE_SIZE = 480; // px
const HALF = CUBE_SIZE / 2; // 240

const FACES: FaceConfig[] = [
  { label: "Home",     rotation: { x: 0,   y: 0   } },
  { label: "About",    rotation: { x: 0,   y: -90 } },
  { label: "Projects", rotation: { x: 0,   y: -180} },
  { label: "Services", rotation: { x: 0,   y: 90  } },
  { label: "Skills",   rotation: { x: -90, y: 0   } },
  { label: "Contact",  rotation: { x: 90,  y: 0   } },
];

const FACE_TRANSFORMS: string[] = [
  `translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
  `rotateX(90deg) translateZ(${HALF}px)`,
  `rotateX(-90deg) translateZ(${HALF}px)`,
];

const SKILLS = [
  { name: "React",    level: 95 },
  { name: "Next.js",  level: 90 },
  { name: "Tailwind", level: 95 },
  { name: "Node.js",  level: 80 },
  { name: "Shopify",  level: 85 },
  { name: "Python",   level: 75 },
];

const FEATURED = allProjects.slice(0, 4);

// ─── helpers ──────────────────────────────────────────────────────────────────

function faceStyle(index: number, active: boolean): React.CSSProperties {
  return {
    position: "absolute",
    width: `${CUBE_SIZE}px`,
    height: `${CUBE_SIZE}px`,
    transform: FACE_TRANSFORMS[index],
    background: active
      ? "rgba(16, 14, 26, 0.97)"
      : "rgba(12, 11, 18, 0.92)",
    border: `1px solid ${active ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.07)"}`,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    overflowY: "auto",
    overflowX: "hidden",
    boxSizing: "border-box",
    padding: "2rem",
    boxShadow: active
      ? "inset 0 0 80px rgba(139,92,246,0.12), 0 0 40px rgba(139,92,246,0.15)"
      : "inset 0 0 30px rgba(0,0,0,0.5)",
    scrollbarWidth: "none",
    transition: "box-shadow 0.4s, border 0.4s",
  } as React.CSSProperties;
}

// ─── face content components ──────────────────────────────────────────────────

function HomeFace({ goTo }: { goTo: (i: number) => void }) {
  return (
    <div className="flex flex-col justify-center items-center h-full text-white text-center gap-6">
      <div>
        <p style={{ color: "#7c3aed", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Portfolio
        </p>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "0.5rem" }}>
          Rajdeep Kotoky
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#9ca3af", marginBottom: "0.25rem" }}>
          Full Stack Developer &amp; AI/ML Engineer
        </p>
        <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
          Building intelligent web experiences
        </p>
      </div>

      <div style={{ width: "40px", height: "2px", background: "rgba(124,58,237,0.6)", borderRadius: "2px" }} />

      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => goTo(2)}
          style={{
            padding: "0.65rem 1.5rem",
            background: "#7c3aed",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#6d28d9")}
          onMouseLeave={e => (e.currentTarget.style.background = "#7c3aed")}
        >
          View Projects
        </button>
        <button
          onClick={() => goTo(5)}
          style={{
            padding: "0.65rem 1.5rem",
            background: "transparent",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "6px",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
        >
          Contact Me
        </button>
      </div>

      <p style={{ fontSize: "0.75rem", color: "#4b5563", marginTop: "1rem" }}>
        Use arrow keys or nav dots to explore
      </p>
    </div>
  );
}

function AboutFace() {
  const skills = ["Next.js", "React", "Shopify", "Tailwind", "Python", "Node.js"];
  return (
    <div className="flex flex-col h-full text-white" style={{ gap: "1.25rem" }}>
      <div>
        <p style={{ fontSize: "0.75rem", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.4rem" }}>About</p>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.75rem" }}>Who I Am</h2>
        <p style={{ fontSize: "0.9rem", color: "#9ca3af", lineHeight: 1.7 }}>
          I&apos;m Rajdeep Kotoky, a Full Stack Developer and AI/ML Engineer passionate about building fast,
          intelligent web experiences. I blend cutting-edge AI with clean, performant frontends.
        </p>
      </div>

      <div>
        <p style={{ fontSize: "0.9rem", color: "#9ca3af", lineHeight: 1.7 }}>
          With experience across the entire product lifecycle — from idea to deployment — I work with
          startups and businesses to deliver solutions that are both technically sound and visually polished.
        </p>
      </div>

      <div>
        <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.75rem", color: "#e5e7eb" }}>Core Stack</p>
        <div className="flex flex-wrap gap-2">
          {skills.map(s => (
            <span
              key={s}
              style={{
                padding: "0.3rem 0.75rem",
                background: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(124,58,237,0.3)",
                borderRadius: "20px",
                fontSize: "0.8rem",
                color: "#c4b5fd",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "auto", padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>Based in India &bull; Available for freelance &amp; full-time roles</p>
      </div>
    </div>
  );
}

function ProjectsFace() {
  return (
    <div className="flex flex-col h-full text-white" style={{ gap: "1rem" }}>
      <div>
        <p style={{ fontSize: "0.75rem", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.4rem" }}>Work</p>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Projects</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", flex: 1, minHeight: 0 }}>
        {FEATURED.map(p => (
          <div
            key={p.id}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "0.9rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              overflow: "hidden",
            }}
          >
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f3f4f6", lineHeight: 1.3 }}>{p.title}</p>
            <p style={{ fontSize: "0.75rem", color: "#9ca3af", lineHeight: 1.5, flex: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as React.CSSProperties["WebkitBoxOrient"] }}>
              {p.description}
            </p>
            <div className="flex flex-wrap gap-1" style={{ marginTop: "0.25rem" }}>
              {p.tech.slice(0, 3).map(t => (
                <span
                  key={t}
                  style={{
                    fontSize: "0.65rem",
                    padding: "0.15rem 0.45rem",
                    background: "rgba(124,58,237,0.12)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    borderRadius: "4px",
                    color: "#a78bfa",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            {p.demo && p.demo !== "#" && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: "0.7rem", color: "#7c3aed", marginTop: "0.25rem", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
              >
                View demo →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesFace() {
  const icons: Record<string, string> = {
    globe: "🌐",
    database: "🛒",
    code: "🤖",
  };
  return (
    <div className="flex flex-col h-full text-white" style={{ gap: "1rem" }}>
      <div>
        <p style={{ fontSize: "0.75rem", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.4rem" }}>Offerings</p>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Services</h2>
      </div>

      <div className="flex flex-col" style={{ gap: "0.85rem", flex: 1 }}>
        {allServices.map(s => (
          <div
            key={s.slug}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "1rem",
            }}
          >
            <div className="flex items-center gap-3" style={{ marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "1.2rem" }}>{icons[s.icon] ?? "⚙️"}</span>
              <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f3f4f6" }}>{s.title}</p>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#9ca3af", lineHeight: 1.6 }}>{s.shortDescription}</p>
            <div className="flex flex-wrap gap-1" style={{ marginTop: "0.6rem" }}>
              {s.technologies.slice(0, 4).map(t => (
                <span
                  key={t}
                  style={{
                    fontSize: "0.65rem",
                    padding: "0.15rem 0.45rem",
                    background: "rgba(124,58,237,0.12)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    borderRadius: "4px",
                    color: "#a78bfa",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsFace() {
  return (
    <div className="flex flex-col h-full text-white" style={{ gap: "1.25rem" }}>
      <div>
        <p style={{ fontSize: "0.75rem", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.4rem" }}>Expertise</p>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Skills</h2>
      </div>

      <div className="flex flex-col" style={{ gap: "1.1rem", flex: 1 }}>
        {SKILLS.map(skill => (
          <div key={skill.name}>
            <div className="flex justify-between items-center" style={{ marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#e5e7eb" }}>{skill.name}</span>
              <span style={{ fontSize: "0.8rem", color: "#7c3aed", fontWeight: 700 }}>{skill.level}%</span>
            </div>
            <div style={{ height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "99px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${skill.level}%`,
                  background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                  borderRadius: "99px",
                  transition: "width 1s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0.75rem", background: "rgba(124,58,237,0.06)", borderRadius: "8px", border: "1px solid rgba(124,58,237,0.15)" }}>
        <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Always learning — currently exploring LLM fine-tuning &amp; edge deployment.</p>
      </div>
    </div>
  );
}

function ContactFace() {
  const links = [
    {
      label: "Email",
      value: "rajdeepkotoky1234@gmail.com",
      href: "mailto:rajdeepkotoky1234@gmail.com",
      icon: "✉",
    },
    {
      label: "GitHub",
      value: "github.com/Rajdeep1234yyuhh",
      href: "https://github.com/Rajdeep1234yyuhh",
      icon: "⌥",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/rajdeep-kotoky",
      href: "https://linkedin.com/in/rajdeep-kotoky",
      icon: "in",
    },
    {
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      href: "https://wa.me/919101534781",
      icon: "☎",
    },
  ];

  return (
    <div className="flex flex-col h-full text-white" style={{ gap: "1.25rem" }}>
      <div>
        <p style={{ fontSize: "0.75rem", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.4rem" }}>Get in Touch</p>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Contact</h2>
        <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.5rem", lineHeight: 1.6 }}>
          Open to new projects, collaborations, and opportunities. Let&apos;s build something together.
        </p>
      </div>

      <div className="flex flex-col" style={{ gap: "0.75rem", flex: 1 }}>
        {links.map(l => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("mailto") ? "_self" : "_blank"}
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.9rem 1rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              textDecoration: "none",
              transition: "border-color 0.2s, background 0.2s",
              color: "#fff",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
              e.currentTarget.style.background = "rgba(124,58,237,0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <span style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "rgba(124,58,237,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "#a78bfa",
              flexShrink: 0,
            }}>
              {l.icon}
            </span>
            <div>
              <p style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.1rem" }}>{l.label}</p>
              <p style={{ fontSize: "0.85rem", color: "#e5e7eb" }}>{l.value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function CubeWorld() {
  const [currentFace, setCurrentFace] = useState(0);
  const [rotation, setRotation] = useState<Rotation>({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (index === currentFace || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentFace(index);
    setRotation(FACES[index].rotation);
    setTimeout(() => setIsTransitioning(false), 950);
  }, [currentFace, isTransitioning]);

  // Horizontal cycle: 0 (Front) → 1 (Right) → 2 (Back) → 3 (Left) → 0
  const horizontalFaces = [0, 1, 2, 3];

  const goLeft = useCallback(() => {
    const idx = horizontalFaces.indexOf(currentFace);
    if (idx !== -1) {
      const next = horizontalFaces[(idx - 1 + horizontalFaces.length) % horizontalFaces.length];
      goTo(next);
    } else {
      goTo(0);
    }
  }, [currentFace, goTo, horizontalFaces]);

  const goRight = useCallback(() => {
    const idx = horizontalFaces.indexOf(currentFace);
    if (idx !== -1) {
      const next = horizontalFaces[(idx + 1) % horizontalFaces.length];
      goTo(next);
    } else {
      goTo(0);
    }
  }, [currentFace, goTo, horizontalFaces]);

  const goUp = useCallback(() => goTo(4), [goTo]);
  const goDown = useCallback(() => goTo(5), [goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  { e.preventDefault(); goLeft(); }
      if (e.key === "ArrowRight") { e.preventDefault(); goRight(); }
      if (e.key === "ArrowUp")    { e.preventDefault(); goUp(); }
      if (e.key === "ArrowDown")  { e.preventDefault(); goDown(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goLeft, goRight, goUp, goDown]);

  // Slight ambient tilt so cube always looks 3D, even when "flat" on a face
  const cubeTransform = `rotateX(${rotation.x - 8}deg) rotateY(${rotation.y + 6}deg)`;

  return (
    <>
      {/* inject scrollbar-hiding style */}
      <style>{`
        .cube-face::-webkit-scrollbar { display: none; }
        * { box-sizing: border-box; }
      `}</style>

      {/* viewport wrapper */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#060608",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* grid background */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        {/* radial glow behind cube */}
        <div style={{ position: "absolute", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* ground shadow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, 180px)", width: `${CUBE_SIZE * 1.1}px`, height: "40px", background: "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* perspective wrapper — perspective must be on PARENT of preserve-3d element */}
        <div
          style={{
            perspective: "900px",
            perspectiveOrigin: "50% 50%",
            width: `${CUBE_SIZE}px`,
            height: `${CUBE_SIZE}px`,
          }}
        >
        {/* cube stage */}
        <div
          style={{
            width: `${CUBE_SIZE}px`,
            height: `${CUBE_SIZE}px`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* rotating inner cube */}
          <div
            style={{
              width: `${CUBE_SIZE}px`,
              height: `${CUBE_SIZE}px`,
              position: "relative",
              transformStyle: "preserve-3d",
              transform: cubeTransform,
              transition: "transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {/* Face 0 — Front — Home */}
            <div className="cube-face" style={faceStyle(0, currentFace === 0)}>
              <HomeFace goTo={goTo} />
            </div>

            {/* Face 1 — Right — About */}
            <div className="cube-face" style={faceStyle(1, currentFace === 1)}>
              <AboutFace />
            </div>

            {/* Face 2 — Back — Projects */}
            <div className="cube-face" style={faceStyle(2, currentFace === 2)}>
              <ProjectsFace />
            </div>

            {/* Face 3 — Left — Services */}
            <div className="cube-face" style={faceStyle(3, currentFace === 3)}>
              <ServicesFace />
            </div>

            {/* Face 4 — Top — Skills */}
            <div className="cube-face" style={faceStyle(4, currentFace === 4)}>
              <SkillsFace />
            </div>

            {/* Face 5 — Bottom — Contact */}
            <div className="cube-face" style={faceStyle(5, currentFace === 5)}>
              <ContactFace />
            </div>
          </div>
        </div>
        </div>{/* end perspective wrapper */}

        {/* ── Nav dots (right side) ─────────────────────────────── */}
        <div
          style={{
            position: "fixed",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "flex-end",
            zIndex: 100,
          }}
        >
          {FACES.map((face, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {currentFace === i && (
                <span style={{ fontSize: "0.7rem", color: "#9ca3af", letterSpacing: "0.08em", userSelect: "none" }}>
                  {face.label}
                </span>
              )}
              <button
                onClick={() => goTo(i)}
                aria-label={`Go to ${face.label}`}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  background: currentFace === i ? "#ffffff" : "transparent",
                  cursor: "pointer",
                  padding: 0,
                  transition: "background 0.2s, transform 0.2s",
                  transform: currentFace === i ? "scale(1.3)" : "scale(1)",
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Arrow buttons ─────────────────────────────────────── */}
        {/* Left */}
        <button
          onClick={goLeft}
          aria-label="Previous face"
          style={{
            position: "fixed",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 100,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,0.25)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
        >
          ←
        </button>

        {/* Right */}
        <button
          onClick={goRight}
          aria-label="Next face"
          style={{
            position: "fixed",
            right: "80px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 100,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,0.25)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
        >
          →
        </button>

        {/* Up */}
        <button
          onClick={goUp}
          aria-label="Go to Skills"
          style={{
            position: "fixed",
            left: "50%",
            top: "20px",
            transform: "translateX(-50%)",
            zIndex: 100,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,0.25)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
        >
          ↑
        </button>

        {/* Down */}
        <button
          onClick={goDown}
          aria-label="Go to Contact"
          style={{
            position: "fixed",
            left: "50%",
            bottom: "20px",
            transform: "translateX(-50%)",
            zIndex: 100,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,58,237,0.25)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
        >
          ↓
        </button>

        {/* ── Current face label (bottom center) ───────────────── */}
        <div
          style={{
            position: "fixed",
            bottom: "72px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            fontSize: "0.7rem",
            color: "#4b5563",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            userSelect: "none",
          }}
        >
          {FACES[currentFace].label}
        </div>
      </div>
    </>
  );
}
