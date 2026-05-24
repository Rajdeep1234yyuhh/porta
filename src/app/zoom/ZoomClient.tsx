"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { allProjects } from "../data/projects";
import { testimonials } from "../data/testimonials";

const FRAME_COUNT   = 8;
const FRAME_SPACING = 1800;
const PERSPECTIVE   = 1200;
const DOOR_ZONE     = 0.65;
const PHONE         = "918638752315";

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// Deterministic stars — no Math.random to avoid hydration mismatch
const STARS = Array.from({ length: 180 }, (_, i) => ({
  x: (i * 13.739 + 5.321) % 100,
  y: (i * 7.431 + 11.123) % 100,
  size: (i % 3) + 1,
  opacity: ((i % 5) + 2) / 10,
}));

function StarField() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {STARS.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, opacity: s.opacity }}
        />
      ))}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3 h-3 ${i < rating ? "text-[#FBBC05]" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

type DoorRef = (el: HTMLDivElement | null) => void;

interface FrameProps {
  doorLeftRef?: DoorRef;
  doorRightRef?: DoorRef;
}

// Gradient border frame wrapper with door overlay panels
function GradientFrame({
  children,
  doorLeftRef,
  doorRightRef,
  style,
}: FrameProps & { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        width: "82vw",
        height: "88vh",
        left: "9vw",
        top: "6vh",
        background: "linear-gradient(135deg, rgba(139,92,246,0.55) 0%, rgba(59,130,246,0.4) 100%)",
        borderRadius: 20,
        padding: "1.5px",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Content */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 19,
          background: "rgba(10,10,18,0.93)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(16px, 3vw, 40px)",
        }}
      >
        {children}
      </div>

      {/* Left door panel */}
      <div
        ref={doorLeftRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          background: "linear-gradient(to right, #07070e 65%, rgba(139,92,246,0.35) 100%)",
          boxShadow: "inset -2px 0 16px rgba(139,92,246,0.2)",
          transform: "translateX(0%)",
          willChange: "transform",
        }}
      />

      {/* Right door panel */}
      <div
        ref={doorRightRef}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: "linear-gradient(to left, #07070e 65%, rgba(59,130,246,0.35) 100%)",
          boxShadow: "inset 2px 0 16px rgba(59,130,246,0.2)",
          transform: "translateX(0%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}

// ── Frame 0: Enter ──────────────────────────────────────────────────────────
function FrameEnter({ doorLeftRef, doorRightRef }: FrameProps) {
  return (
    <GradientFrame doorLeftRef={doorLeftRef} doorRightRef={doorRightRef}>
      <div className="text-center flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs text-violet-300 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Available for work
        </div>
        <h1
          className="font-bold text-white leading-none"
          style={{ fontSize: "clamp(28px, 6vw, 80px)", letterSpacing: "-0.02em" }}
        >
          RAJDEEP
          <br />
          <span style={{ background: "linear-gradient(90deg, #a78bfa, #818cf8, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            KOTOKY
          </span>
        </h1>
        <p className="text-white/50 text-sm sm:text-base">Full-Stack Developer & AI/ML Engineer</p>
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {["Next.js", "React", "TypeScript", "Shopify", "Python", "AI/ML"].map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-white/60">{t}</span>
          ))}
        </div>
        <p className="text-white/30 text-xs mt-4 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          scroll to explore
        </p>
      </div>
    </GradientFrame>
  );
}

// ── Frame 1: Reviews ────────────────────────────────────────────────────────
function FrameReviews({ doorLeftRef, doorRightRef }: FrameProps) {
  const top3 = testimonials.slice(0, 3);
  return (
    <GradientFrame doorLeftRef={doorLeftRef} doorRightRef={doorRightRef}>
      <div className="w-full flex flex-col gap-3">
        <div className="text-center mb-1">
          <p className="text-white/40 text-xs uppercase tracking-widest">What clients say</p>
          <h2 className="text-white font-bold text-xl sm:text-2xl">Real Reviews</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          {top3.map((t) => (
            <div key={t.id} className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: t.avatarColor }}>
                  {t.initial}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{t.name}</p>
                  <p className="text-white/40 text-[10px] truncate">{t.role}</p>
                </div>
              </div>
              <StarRating rating={t.rating} />
              {t.text && (
                <p className="text-white/60 text-[11px] leading-relaxed line-clamp-3">&ldquo;{t.text}&rdquo;</p>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-white/30 text-[10px] mt-1">All 5★ reviews on Google</p>
      </div>
    </GradientFrame>
  );
}

// ── Frame 2: About ──────────────────────────────────────────────────────────
function FrameAbout({ doorLeftRef, doorRightRef }: FrameProps) {
  return (
    <GradientFrame doorLeftRef={doorLeftRef} doorRightRef={doorRightRef}>
      <div className="w-full flex flex-col sm:flex-row items-center gap-5">
        <div className="shrink-0 flex flex-col items-center gap-2">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/10">
            <Image src="/DP.jpg" alt="Rajdeep" width={128} height={128} className="w-full h-full object-cover" />
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] font-semibold">● Available</span>
        </div>
        <div className="flex flex-col gap-3 min-w-0 flex-1 items-center sm:items-start text-center sm:text-left">
          <div>
            <h2 className="text-white font-bold text-xl sm:text-2xl">Rajdeep Kotoky</h2>
            <p className="text-violet-400 text-sm">Full-Stack Dev & AI/ML Engineer</p>
          </div>
          <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
            Based in Assam, India. I build fast, modern web apps and Shopify stores —
            from AI-powered tools to pixel-perfect storefronts. 5+ years, 25+ happy clients.
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:scale-105"
              style={{ background: "rgba(37,211,102,0.12)", borderColor: "rgba(37,211,102,0.3)", color: "#25D366" }}>
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a href="tel:+918638752315"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-blue-400/30 bg-blue-400/10 text-blue-300 transition-all hover:scale-105">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>
              Call
            </a>
            <a href="mailto:kotoky10@gmail.com"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/10 bg-white/5 text-white/60 transition-all hover:scale-105">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Email
            </a>
          </div>
        </div>
      </div>
    </GradientFrame>
  );
}

// ── Frame 3: Numbers ────────────────────────────────────────────────────────
function FrameNumbers({ doorLeftRef, doorRightRef }: FrameProps) {
  const stats = [
    { value: "4+", label: "Full-Stack Projects" },
    { value: "18", label: "Shopify Stores" },
    { value: "25+", label: "Happy Clients" },
    { value: "5+", label: "Years Experience" },
  ];
  return (
    <GradientFrame doorLeftRef={doorLeftRef} doorRightRef={doorRightRef}>
      <div className="w-full flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-white/40 text-xs uppercase tracking-widest">By the numbers</p>
          <h2 className="text-white font-bold text-xl sm:text-2xl">Track Record</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full max-w-lg">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 flex flex-col items-center gap-1">
              <span className="font-bold text-3xl sm:text-5xl" style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.value}
              </span>
              <span className="text-white/50 text-xs sm:text-sm text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </GradientFrame>
  );
}

// ── Frame 4: Skills ─────────────────────────────────────────────────────────
function FrameSkills({ doorLeftRef, doorRightRef }: FrameProps) {
  const skills = [
    { name: "Next.js",      color: "#ffffff" },
    { name: "React",        color: "#61DAFB" },
    { name: "TypeScript",   color: "#3178C6" },
    { name: "Tailwind CSS", color: "#38BDF8" },
    { name: "Node.js",      color: "#68A063" },
    { name: "Python",       color: "#FFD43B" },
    { name: "Shopify",      color: "#96BF48" },
    { name: "Firebase",     color: "#FFCA28" },
    { name: "AI / ML",      color: "#a78bfa" },
  ];
  return (
    <GradientFrame doorLeftRef={doorLeftRef} doorRightRef={doorRightRef}>
      <div className="w-full flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-white/40 text-xs uppercase tracking-widest">Tech stack</p>
          <h2 className="text-white font-bold text-xl sm:text-2xl">Skills</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-lg">
          {skills.map((s) => (
            <span key={s.name} className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border"
              style={{ color: s.color, borderColor: `${s.color}40`, background: `${s.color}12` }}>
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </GradientFrame>
  );
}

// ── Frame 5: Work ───────────────────────────────────────────────────────────
function FrameWork({ doorLeftRef, doorRightRef }: FrameProps) {
  const projects = allProjects.slice(0, 3);
  return (
    <GradientFrame doorLeftRef={doorLeftRef} doorRightRef={doorRightRef}>
      <div className="w-full flex flex-col gap-3">
        <div className="text-center mb-1">
          <p className="text-white/40 text-xs uppercase tracking-widest">Portfolio</p>
          <h2 className="text-white font-bold text-xl sm:text-2xl">Selected Work</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          {projects.map((p) => (
            <div key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col gap-2">
              <h3 className="text-white text-xs sm:text-sm font-semibold leading-tight">{p.title}</h3>
              <div className="flex flex-wrap gap-1">
                {p.tech.slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/20 text-violet-300">{t}</span>
                ))}
              </div>
              {p.demo && p.demo !== "#" && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer"
                  className="mt-auto text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                  View demo
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </GradientFrame>
  );
}

// ── Frame 6: Quick Fix ──────────────────────────────────────────────────────
function FrameQuickFix({ doorLeftRef, doorRightRef }: FrameProps) {
  const services = ["Bug Fix", "Code Review", "UI Polish", "API Integration"];
  return (
    <GradientFrame doorLeftRef={doorLeftRef} doorRightRef={doorRightRef}>
      <div className="w-full flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-white/40 text-xs uppercase tracking-widest">Fast help</p>
          <h2 className="text-white font-bold text-xl sm:text-2xl">
            Got a bug?{" "}
            <span style={{ background: "linear-gradient(90deg,#34d399,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Quick Fixes.
            </span>
          </h2>
          <p className="text-white/40 text-xs mt-1">Minor charge applies. Free in active deals.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-sm">
          {services.map((s) => (
            <div key={s} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-center">
              <span className="text-white/80 text-xs sm:text-sm font-semibold">{s}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-1">
          <a href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20help%20with%3A%20`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
            style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)", color: "#25D366" }}>
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <a href="tel:+918638752315"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-blue-400/30 bg-blue-400/10 text-blue-300 transition-all hover:scale-105">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>
            Call
          </a>
        </div>
      </div>
    </GradientFrame>
  );
}

// ── Frame 7: Connect ────────────────────────────────────────────────────────
function FrameConnect({ doorLeftRef, doorRightRef }: FrameProps) {
  return (
    <GradientFrame doorLeftRef={doorLeftRef} doorRightRef={doorRightRef}>
      <div className="w-full flex flex-col items-center gap-5 text-center">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Ready to start?</p>
          <h2 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(22px, 5vw, 56px)" }}>
            Let&apos;s build{" "}
            <span style={{ background: "linear-gradient(90deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              something.
            </span>
          </h2>
          <p className="text-white/40 text-sm mt-2">Got a project? I&apos;m available now.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20have%20a%20project%20for%20you!`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.35)", color: "#25D366" }}>
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp me
          </a>
          <a href="mailto:kotoky10@gmail.com"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/15 bg-white/8 text-white/70 transition-all hover:scale-105 hover:bg-white/12">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            kotoky10@gmail.com
          </a>
        </div>
        <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1.5 mt-2">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to portfolio
        </Link>
      </div>
    </GradientFrame>
  );
}

const FRAME_COMPONENTS = [
  FrameEnter,
  FrameReviews,
  FrameAbout,
  FrameNumbers,
  FrameSkills,
  FrameWork,
  FrameQuickFix,
  FrameConnect,
] as const;

// ── Luxury easing: cubic ease-in-out ────────────────────────────────────────
// Gentle start → fast middle → gentle arrival. Classic high-end website feel.
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const ANIM_MS = 950;   // transition duration in ms — long enough to feel luxurious
const COOL_MS = 480;   // min ms between frame advances (prevents skip-through)

// ── Main Component ──────────────────────────────────────────────────────────
export default function ZoomClient() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);

  // Animation state — all refs so rAF never triggers React re-renders
  const animFromZ   = useRef(0);          // Z we started from
  const animToZ     = useRef(0);          // Z we're heading to
  const animStart   = useRef(-ANIM_MS);   // timestamp; starts "done" so frame 0 opens
  const targetIdx   = useRef(0);          // current target frame index
  const lastAdv     = useRef(-COOL_MS);   // timestamp of last frame advance
  const touchY0     = useRef<number | null>(null);
  const rafId       = useRef<number>(0);

  const [activeFrame, setActiveFrame] = useState(0);

  // Stable door callback refs
  const doorLeftRefs  = useRef<(HTMLDivElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const doorRightRefs = useRef<(HTMLDivElement | null)[]>(Array(FRAME_COUNT).fill(null));

  const leftCbs = useRef(
    Array.from({ length: FRAME_COUNT }, (_, i): DoorRef =>
      (el) => { doorLeftRefs.current[i] = el; }
    )
  ).current;

  const rightCbs = useRef(
    Array.from({ length: FRAME_COUNT }, (_, i): DoorRef =>
      (el) => { doorRightRefs.current[i] = el; }
    )
  ).current;

  // Navigate to a frame index — can be called mid-animation for smooth redirect
  const goToFrame = (idx: number, now: number) => {
    if (idx === targetIdx.current && now - animStart.current < ANIM_MS) return;
    // Capture current visual Z so redirection starts from wherever we are
    const elapsed = now - animStart.current;
    const t = clamp(elapsed / ANIM_MS, 0, 1);
    animFromZ.current = animFromZ.current + (animToZ.current - animFromZ.current) * ease(t);
    animToZ.current  = idx * FRAME_SPACING;
    animStart.current = now;
    targetIdx.current = idx;
    lastAdv.current   = now;
    setActiveFrame(idx);
  };

  useEffect(() => {
    const outer  = outerRef.current;
    const tunnel = tunnelRef.current;
    if (!outer || !tunnel) return;

    // ── Wheel ──
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 40;
      if (e.deltaMode === 2) dy *= window.innerHeight;
      if (Math.abs(dy) < 5) return;

      const now = performance.now();
      // Allow immediate redirect if user spins same direction, but cooldown for opposite
      if (now - lastAdv.current < COOL_MS) return;

      const dir  = dy > 0 ? 1 : -1;
      const next = clamp(targetIdx.current + dir, 0, FRAME_COUNT - 1);
      goToFrame(next, now);
    };

    // ── Touch: trigger on lift, not drag (cleaner, intentional feel) ──
    const onTouchStart = (e: TouchEvent) => {
      touchY0.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchY0.current === null) return;
      const dy = touchY0.current - e.changedTouches[0].clientY;
      touchY0.current = null;
      if (Math.abs(dy) < 35) return; // too small — ignore
      const now = performance.now();
      if (now - lastAdv.current < COOL_MS) return;
      const dir  = dy > 0 ? 1 : -1;
      const next = clamp(targetIdx.current + dir, 0, FRAME_COUNT - 1);
      goToFrame(next, now);
    };

    // ── Arrow keys ──
    const onKeyDown = (e: KeyboardEvent) => {
      if (!["ArrowDown","ArrowRight","ArrowUp","ArrowLeft"].includes(e.key)) return;
      e.preventDefault();
      const now = performance.now();
      if (now - lastAdv.current < COOL_MS) return;
      const dir  = (e.key === "ArrowDown" || e.key === "ArrowRight") ? 1 : -1;
      const next = clamp(targetIdx.current + dir, 0, FRAME_COUNT - 1);
      goToFrame(next, now);
    };

    outer.addEventListener("wheel",       onWheel,      { passive: false });
    outer.addEventListener("touchstart",  onTouchStart, { passive: true  });
    outer.addEventListener("touchend",    onTouchEnd,   { passive: true  });
    window.addEventListener("keydown",    onKeyDown);

    // ── rAF loop: purely reads refs, sets DOM transforms ──
    const animate = (now: number) => {
      const elapsed = now - animStart.current;
      const t       = clamp(elapsed / ANIM_MS, 0, 1);
      const visualZ = animFromZ.current + (animToZ.current - animFromZ.current) * ease(t);

      tunnel.style.transform = `translateZ(${visualZ}px)`;

      for (let i = 0; i < FRAME_COUNT; i++) {
        const dist = visualZ - i * FRAME_SPACING;

        // Opacity (children[0] = StarField, frames start at [1])
        const frameEl = tunnel.children[i + 1] as HTMLElement | undefined;
        if (frameEl) {
          if (dist > 400) {
            frameEl.style.opacity = "0";
          } else if (dist < -FRAME_SPACING * 0.6) {
            frameEl.style.opacity = String(Math.max(0, 1 + dist / (FRAME_SPACING * 0.6)));
          } else {
            frameEl.style.opacity = "1";
          }
        }

        // Doors
        const leftDoor  = doorLeftRefs.current[i];
        const rightDoor = doorRightRefs.current[i];
        if (leftDoor && rightDoor) {
          const dp = clamp(1 - Math.abs(dist) / (FRAME_SPACING * DOOR_ZONE), 0, 1);
          const tx = dp * 100;
          leftDoor.style.transform  = `translateX(-${tx}%)`;
          rightDoor.style.transform = `translateX(${tx}%)`;
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      outer.removeEventListener("wheel",      onWheel);
      outer.removeEventListener("touchstart", onTouchStart);
      outer.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("keydown",   onKeyDown);
      cancelAnimationFrame(rafId.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jumpToFrame = (i: number) => goToFrame(i, performance.now());

  return (
    <div
      ref={outerRef}
      style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#05050a" }}
    >
      {/* 3D perspective container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: `${PERSPECTIVE}px`,
          perspectiveOrigin: "50% 50%",
          overflow: "hidden",
        }}
      >
        <div
          ref={tunnelRef}
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transform: "translateZ(0px)",
          }}
        >
          <StarField />

          {FRAME_COMPONENTS.map((FrameComp, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                transform: `translateZ(${-i * FRAME_SPACING}px)`,
                opacity: i === 0 ? 1 : 0.15,
              }}
            >
              <FrameComp
                doorLeftRef={leftCbs[i]}
                doorRightRef={rightCbs[i]}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Back button */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/10 bg-black/40 text-white/60 hover:text-white hover:bg-black/60 backdrop-blur-sm transition-all"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Portfolio
      </Link>

      {/* Progress dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {Array.from({ length: FRAME_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => jumpToFrame(i)}
            style={{
              width: activeFrame === i ? 8 : 6,
              height: activeFrame === i ? 8 : 6,
              borderRadius: "50%",
              background: activeFrame === i ? "#a78bfa" : "rgba(255,255,255,0.2)",
              border: activeFrame === i ? "2px solid rgba(167,139,250,0.5)" : "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            aria-label={`Go to frame ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
