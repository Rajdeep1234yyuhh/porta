/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, GitBranch, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import { allProjects, Project } from "../data/projects";
import { LazyVideo } from "./LazyVideo";
import { getYoutubeVideoId } from "../lib/youtube";

// ─── Per-project room themes ──────────────────────────────────────────────────
const ROOM: Record<number, { dark: string; light: string; accent: string }> = {
  1: {
    dark: "linear-gradient(135deg,#13001f,#1a0040)",
    light: "linear-gradient(135deg,#f5f0ff,#ede8ff)",
    accent: "#8b5cf6",
  },
  2: {
    dark: "linear-gradient(135deg,#001a2c,#002a40)",
    light: "linear-gradient(135deg,#e0f7fa,#b2ebf2)",
    accent: "#06b6d4",
  },
  3: {
    dark: "linear-gradient(135deg,#001a0a,#002e14)",
    light: "linear-gradient(135deg,#e8f5e9,#c8e6c9)",
    accent: "#10b981",
  },
  4: {
    dark: "linear-gradient(135deg,#1a0010,#300020)",
    light: "linear-gradient(135deg,#fff0f3,#ffe0e6)",
    accent: "#f43f5e",
  },
  6: {
    dark: "linear-gradient(135deg,#0d0d14,#14141e)",
    light: "linear-gradient(135deg,#f8fafc,#f1f5f9)",
    accent: "#94a3b8",
  },
  7: {
    dark: "linear-gradient(135deg,#001233,#001a4d)",
    light: "linear-gradient(135deg,#e3f2fd,#bbdefb)",
    accent: "#3b82f6",
  },
  8: {
    dark: "linear-gradient(135deg,#1a0800,#2d1200)",
    light: "linear-gradient(135deg,#fff8e1,#ffecb3)",
    accent: "#f97316",
  },
  9: {
    dark: "linear-gradient(135deg,#1a0d00,#2d1a00)",
    light: "linear-gradient(135deg,#fffbeb,#fef3c7)",
    accent: "#f59e0b",
  },
  10: {
    dark: "linear-gradient(135deg,#1f0000,#330000)",
    light: "linear-gradient(135deg,#fff0f0,#ffe0e0)",
    accent: "#ef4444",
  },
  11: {
    dark: "linear-gradient(135deg,#1a1200,#2d1f00)",
    light: "linear-gradient(135deg,#fefce8,#fef9c3)",
    accent: "#fbbf24",
  },
  12: {
    dark: "linear-gradient(135deg,#1a0025,#2d003d)",
    light: "linear-gradient(135deg,#fdf4ff,#fae8ff)",
    accent: "#d946ef",
  },
  13: {
    dark: "linear-gradient(135deg,#001a0d,#002e18)",
    light: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
    accent: "#22c55e",
  },
  14: {
    dark: "linear-gradient(135deg,#1a001f,#2d0033)",
    light: "linear-gradient(135deg,#fdf4ff,#f5d0fe)",
    accent: "#c026d3",
  },
  15: {
    dark: "linear-gradient(135deg,#1a0a00,#2d1400)",
    light: "linear-gradient(135deg,#fff7ed,#fed7aa)",
    accent: "#ea580c",
  },
  16: {
    dark: "linear-gradient(135deg,#100c00,#1f1600)",
    light: "linear-gradient(135deg,#fefce8,#fef3c7)",
    accent: "#d97706",
  },
  18: {
    dark: "linear-gradient(135deg,#0d0025,#1a0040)",
    light: "linear-gradient(135deg,#f5f3ff,#ede9fe)",
    accent: "#7c3aed",
  },
  19: {
    dark: "linear-gradient(135deg,#1a0000,#2d0000)",
    light: "linear-gradient(135deg,#fff1f2,#ffe4e6)",
    accent: "#dc2626",
  },
  20: {
    dark: "linear-gradient(135deg,#1a0800,#2d1200)",
    light: "linear-gradient(135deg,#fffbeb,#fef3c7)",
    accent: "#f59e0b",
  },
  21: {
    dark: "linear-gradient(135deg,#001a08,#002e10)",
    light: "linear-gradient(135deg,#f0fdf4,#d1fae5)",
    accent: "#4ade80",
  },
  22: {
    dark: "linear-gradient(135deg,#1a0010,#2d001a)",
    light: "linear-gradient(135deg,#fff0f5,#ffe0eb)",
    accent: "#ec4899",
  },
  23: {
    dark: "linear-gradient(135deg,#000a2d,#001040)",
    light: "linear-gradient(135deg,#eef2ff,#e0e7ff)",
    accent: "#6366f1",
  },
  24: {
    dark: "linear-gradient(135deg,#1a0a00,#2d1500)",
    light: "linear-gradient(135deg,#fff7ed,#fde8cc)",
    accent: "#f97316",
  },
  25: {
    dark: "linear-gradient(135deg,#0a0a0a,#141414)",
    light: "linear-gradient(135deg,#f4f4f5,#e4e4e7)",
    accent: "#71717a",
  },
  26: {
    dark: "linear-gradient(135deg,#0a1200,#141e00)",
    light: "linear-gradient(135deg,#fefce8,#ecfdf5)",
    accent: "#ca8a04",
  },
  30: {
    dark: "linear-gradient(135deg,#0d0a00,#1a1405)",
    light: "linear-gradient(135deg,#fdfaf0,#f5ecd7)",
    accent: "#c9a227",
  },
  31: {
    dark: "linear-gradient(135deg,#1a0508,#2d0a10)",
    light: "linear-gradient(135deg,#fff5f5,#fde2e2)",
    accent: "#9f1d2b",
  },
};
const DEFAULT_ROOM = {
  dark: "linear-gradient(135deg,#0f172a,#1e293b)",
  light: "linear-gradient(135deg,#f8fafc,#f1f5f9)",
  accent: "#6366f1",
};

// ─── Inline case-study block ──────────────────────────────────────────────────
function CsRow({
  icon,
  label,
  content,
  isDark,
  accent,
}: {
  icon: string;
  label: string;
  content: string;
  isDark: boolean;
  accent: string;
}) {
  return (
    <div>
      <p
        className="text-[10px] font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5"
        style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)" }}
      >
        <span>{icon}</span>
        {label}
      </p>
      <p
        className="text-sm leading-relaxed"
        style={{
          color: isDark ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.65)",
        }}
      >
        {content}
      </p>
    </div>
  );
}

// ─── Room card ────────────────────────────────────────────────────────────────
function RoomCard({
  project,
  index,
  isDark,
}: {
  project: Project;
  index: number;
  isDark: boolean;
}) {
  const theme = ROOM[project.id] ?? DEFAULT_ROOM;
  const bg = isDark ? theme.dark : theme.light;
  const accent = theme.accent;
  const cs = project.caseStudy ?? null;

  const youtubeId = project.video ? getYoutubeVideoId(project.video) : null;
  const visualSrc = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : (project.image ?? null);
  // Self-hosted demo videos without a thumbnail preview the video itself.
  const localVideo =
    !youtubeId && project.mediaType === "video" && project.video ? project.video : null;
  const hasVisual = Boolean(visualSrc || localVideo);

  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      id={`project-${project.id}`}
      className="relative w-full"
      style={{ minHeight: "100dvh", background: bg }}
    >
      {/* Decorative oversized room number */}
      <div
        className="absolute bottom-0 right-0 select-none pointer-events-none font-black leading-none"
        style={{
          fontSize: "clamp(8rem, 25vw, 22rem)",
          color: accent,
          opacity: isDark ? 0.07 : 0.06,
          transform: "translate(5%, 10%)",
          lineHeight: 1,
        }}
      >
        {num}
      </div>

      {/* Radial accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 15% 50%, ${accent}12 0%, transparent 70%)`,
        }}
      />

      {/* Main layout: visual left (desktop) + info right */}
      <div
        className="relative z-10 flex flex-col lg:flex-row"
        style={{ paddingTop: "clamp(90px,12vh,130px)" }}
      >
        {/* Visual panel — desktop only */}
        {hasVisual && (
          <div className="hidden lg:flex w-[40%] flex-shrink-0 items-start justify-center px-10 pt-4">
            <div
              className="relative w-full rounded-3xl overflow-hidden"
              style={{
                aspectRatio: "16 / 10",
                boxShadow: `0 40px 80px ${accent}35, 0 0 0 1px ${accent}25`,
              }}
            >
              {visualSrc ? (
                <Image
                  src={visualSrc}
                  alt={project.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <LazyVideo src={localVideo!} className="absolute inset-0 w-full h-full object-cover" />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 55%)",
                }}
              />
            </div>
          </div>
        )}

        {/* Scrollable info + case study */}
        <div
          className={`flex-1 min-w-0 pb-16 px-6 sm:px-10 ${
            hasVisual ? "lg:pl-2 lg:pr-16" : "lg:max-w-2xl lg:mx-auto lg:px-10"
          }`}
        >
          {/* Category + counter */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{
                background: `${accent}20`,
                color: accent,
                border: `1px solid ${accent}45`,
              }}
            >
              {project.categories[0]}
            </span>
            <span
              className="text-xs font-mono"
              style={{
                color: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)",
              }}
            >
              {num}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-black leading-[1.08] mb-3"
            style={{
              fontSize: hasVisual
                ? "clamp(1.5rem, 3vw, 2.8rem)"
                : "clamp(1.7rem, 4vw, 3.8rem)",
              color: isDark ? "#fff" : "#0d0d0d",
            }}
          >
            {project.title}
          </h2>

          {/* Description */}
          <p
            className="text-sm lg:text-base leading-relaxed mb-5"
            style={{
              color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.55)",
            }}
          >
            {project.description}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="text-xs font-medium px-2.5 py-1 rounded-lg"
                style={{
                  background: `${accent}18`,
                  color: accent,
                  border: `1px solid ${accent}30`,
                }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span
                className="text-xs px-2.5 py-1 rounded-lg"
                style={{
                  color: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)",
                  background: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.04)",
                }}
              >
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: accent }}
            >
              Full case study <ArrowRight className="w-4 h-4" />
            </Link>
            {project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                style={{
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.14)"
                    : "1px solid rgba(0,0,0,0.12)",
                  color: isDark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.7)",
                  background: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                }}
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                style={{
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(0,0,0,0.08)",
                  color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
                }}
              >
                <GitBranch className="w-4 h-4" /> Code
              </a>
            )}
          </div>

          {/* ── Inline case study ── */}
          {cs && (
            <div
              className="rounded-2xl p-5 sm:p-6 space-y-5"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.03)",
                border: `1px solid ${accent}28`,
              }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-2 pb-3"
                style={{
                  borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                }}
              >
                <span
                  className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    background: `${accent}22`,
                    color: accent,
                    border: `1px solid ${accent}40`,
                  }}
                >
                  Case Study
                </span>
              </div>

              <CsRow
                icon="📌"
                label="Overview"
                content={cs.overview}
                isDark={isDark}
                accent={accent}
              />
              <CsRow
                icon="🎯"
                label="The Challenge"
                content={cs.challenge}
                isDark={isDark}
                accent={accent}
              />
              <CsRow
                icon="⚡"
                label="The Solution"
                content={cs.solution}
                isDark={isDark}
                accent={accent}
              />

              {/* Results */}
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5"
                  style={{
                    color: isDark
                      ? "rgba(255,255,255,0.45)"
                      : "rgba(0,0,0,0.4)",
                  }}
                >
                  <span>✅</span> Key Results
                </p>
                <ul className="space-y-2">
                  {cs.results.map((r, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm leading-relaxed"
                      style={{
                        color: isDark
                          ? "rgba(255,255,255,0.72)"
                          : "rgba(0,0,0,0.65)",
                      }}
                    >
                      <CheckCircle2
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: accent }}
                      />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false);

  /* sync dark mode */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && dark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const scrollToSection = (id: string) => {
    if (id === "projects") return;
    window.location.href = `/#${id}`;
  };

  const categories = ["All", "Web Development", "AI/ML", "Shopify"];

  const filteredProjects = allProjects.filter(
    (p) =>
      selectedCategory === "All" || p.categories.includes(selectedCategory),
  );

  /* scroll to specific project from URL param ?project=<id>. Read from
     window.location rather than useSearchParams, which would stop the page
     from being prerendered (search engines would get an empty page). */
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("project");
    if (!id) return;
    setTimeout(() => {
      document
        .getElementById(`project-${id}`)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }, []);

  return (
    <>
      <div className="relative z-[100]">
        <Navbar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          scrollToSection={scrollToSection}
          activeSection="projects"
        />
      </div>

      {/* ── Filter dock — same glass container + button style as main navbar ── */}
      {(() => {
        const FILTERS = [
          { short: "All", full: "All Projects", cat: "All" },
          { short: "Web", full: "Web Development", cat: "Web Development" },
          { short: "AI", full: "AI / ML", cat: "AI/ML" },
          { short: "Shop", full: "Shopify", cat: "Shopify" },
        ];
        const btn = (f: (typeof FILTERS)[0]) => (
          <button
            key={f.cat}
            onClick={() => setSelectedCategory(f.cat)}
            className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
              selectedCategory === f.cat
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                : isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-white/10"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span className="text-[11px] font-bold shrink-0 transition-transform duration-200 group-hover:-translate-y-2 leading-none">
              {f.short}
            </span>
            <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none px-2 py-0.5 rounded-md bg-gray-900 text-white shadow">
              {f.full}
            </span>
          </button>
        );

        return (
          <>
            {/* Desktop — floats at top-left, same level as navbar */}
            <div
              className={`fixed top-5 left-8 z-50 hidden lg:flex items-center gap-0.5 px-2 py-2 rounded-2xl backdrop-blur-xl shadow-2xl border transition-colors duration-300 overflow-visible ${
                isDarkMode
                  ? "bg-[#141414]/95 border-white/[0.08]"
                  : "bg-white/90 border-gray-200/80 shadow-gray-200/60"
              }`}
            >
              {FILTERS.map(btn)}
            </div>

            {/* Mobile — compact row just below the fixed navbar */}
            <div
              className={`lg:hidden fixed left-0 right-0 z-50 flex items-center justify-center gap-0.5 px-2 py-1.5 border-b overflow-visible ${
                isDarkMode
                  ? "bg-[#141414]/95 border-white/[0.08]"
                  : "bg-white/90 border-gray-200/80"
              }`}
              style={{ top: "76px" }}
            >
              {FILTERS.map(btn)}
            </div>
          </>
        );
      })()}

      {/* Project rooms — normal page flow */}
      {filteredProjects.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center gap-4"
          style={{
            minHeight: "60vh",
            background: isDarkMode ? "#0d0d14" : "#f8fafc",
          }}
        >
          <p
            style={{
              color: isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
              fontSize: 14,
            }}
          >
            No projects match your search.
          </p>
          <button
            onClick={() => setSelectedCategory("All")}
            className="text-xs px-4 py-2 rounded-xl transition-all hover:scale-105"
            style={{
              background: isDarkMode
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.06)",
              color: isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        filteredProjects.map((project, index) => (
          <RoomCard
            key={project.id}
            project={project}
            index={index}
            isDark={isDarkMode}
          />
        ))
      )}
    </>
  );
}
