"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ExternalLink,
  GitBranch,
  Search,
  BookOpen,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Navbar from "./Navbar";
import { allProjects, Project } from "../data/projects";
import CaseStudyModal from "./CaseStudyModal";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getYoutubeVideoId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

// ─── Per-project room themes ──────────────────────────────────────────────────
const ROOM: Record<number, { dark: string; light: string; accent: string }> = {
  1:  { dark: "linear-gradient(135deg,#13001f,#1a0040)", light: "linear-gradient(135deg,#f5f0ff,#ede8ff)", accent: "#8b5cf6" },
  2:  { dark: "linear-gradient(135deg,#001a2c,#002a40)", light: "linear-gradient(135deg,#e0f7fa,#b2ebf2)", accent: "#06b6d4" },
  3:  { dark: "linear-gradient(135deg,#001a0a,#002e14)", light: "linear-gradient(135deg,#e8f5e9,#c8e6c9)", accent: "#10b981" },
  4:  { dark: "linear-gradient(135deg,#1a0010,#300020)", light: "linear-gradient(135deg,#fff0f3,#ffe0e6)", accent: "#f43f5e" },
  6:  { dark: "linear-gradient(135deg,#0d0d14,#14141e)", light: "linear-gradient(135deg,#f8fafc,#f1f5f9)", accent: "#94a3b8" },
  7:  { dark: "linear-gradient(135deg,#001233,#001a4d)", light: "linear-gradient(135deg,#e3f2fd,#bbdefb)", accent: "#3b82f6" },
  8:  { dark: "linear-gradient(135deg,#1a0800,#2d1200)", light: "linear-gradient(135deg,#fff8e1,#ffecb3)", accent: "#f97316" },
  9:  { dark: "linear-gradient(135deg,#1a0d00,#2d1a00)", light: "linear-gradient(135deg,#fffbeb,#fef3c7)", accent: "#f59e0b" },
  10: { dark: "linear-gradient(135deg,#1f0000,#330000)", light: "linear-gradient(135deg,#fff0f0,#ffe0e0)", accent: "#ef4444" },
  11: { dark: "linear-gradient(135deg,#1a1200,#2d1f00)", light: "linear-gradient(135deg,#fefce8,#fef9c3)", accent: "#fbbf24" },
  12: { dark: "linear-gradient(135deg,#1a0025,#2d003d)", light: "linear-gradient(135deg,#fdf4ff,#fae8ff)", accent: "#d946ef" },
  13: { dark: "linear-gradient(135deg,#001a0d,#002e18)", light: "linear-gradient(135deg,#f0fdf4,#dcfce7)", accent: "#22c55e" },
  14: { dark: "linear-gradient(135deg,#1a001f,#2d0033)", light: "linear-gradient(135deg,#fdf4ff,#f5d0fe)", accent: "#c026d3" },
  15: { dark: "linear-gradient(135deg,#1a0a00,#2d1400)", light: "linear-gradient(135deg,#fff7ed,#fed7aa)", accent: "#ea580c" },
  16: { dark: "linear-gradient(135deg,#100c00,#1f1600)", light: "linear-gradient(135deg,#fefce8,#fef3c7)", accent: "#d97706" },
  18: { dark: "linear-gradient(135deg,#0d0025,#1a0040)", light: "linear-gradient(135deg,#f5f3ff,#ede9fe)", accent: "#7c3aed" },
  19: { dark: "linear-gradient(135deg,#1a0000,#2d0000)", light: "linear-gradient(135deg,#fff1f2,#ffe4e6)", accent: "#dc2626" },
  20: { dark: "linear-gradient(135deg,#1a0800,#2d1200)", light: "linear-gradient(135deg,#fffbeb,#fef3c7)", accent: "#f59e0b" },
  21: { dark: "linear-gradient(135deg,#001a08,#002e10)", light: "linear-gradient(135deg,#f0fdf4,#d1fae5)", accent: "#4ade80" },
  22: { dark: "linear-gradient(135deg,#1a0010,#2d001a)", light: "linear-gradient(135deg,#fff0f5,#ffe0eb)", accent: "#ec4899" },
  23: { dark: "linear-gradient(135deg,#000a2d,#001040)", light: "linear-gradient(135deg,#eef2ff,#e0e7ff)", accent: "#6366f1" },
  24: { dark: "linear-gradient(135deg,#1a0a00,#2d1500)", light: "linear-gradient(135deg,#fff7ed,#fde8cc)", accent: "#f97316" },
  25: { dark: "linear-gradient(135deg,#0a0a0a,#141414)", light: "linear-gradient(135deg,#f4f4f5,#e4e4e7)", accent: "#71717a" },
  26: { dark: "linear-gradient(135deg,#0a1200,#141e00)", light: "linear-gradient(135deg,#fefce8,#ecfdf5)", accent: "#ca8a04" },
};
const DEFAULT_ROOM = {
  dark: "linear-gradient(135deg,#0f172a,#1e293b)",
  light: "linear-gradient(135deg,#f8fafc,#f1f5f9)",
  accent: "#6366f1",
};

// ─── Room card ────────────────────────────────────────────────────────────────
function RoomCard({
  project,
  index,
  total,
  isDark,
  onOpenCaseStudy,
}: {
  project: Project;
  index: number;
  total: number;
  isDark: boolean;
  onOpenCaseStudy: (p: Project) => void;
}) {
  const theme = ROOM[project.id] ?? DEFAULT_ROOM;
  const bg = isDark ? theme.dark : theme.light;
  const accent = theme.accent;

  const youtubeId = project.video ? getYoutubeVideoId(project.video) : null;
  const visualSrc = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : project.image ?? null;

  const num = String(index + 1).padStart(2, "0");
  const tot = String(total).padStart(2, "0");

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", background: bg, scrollSnapAlign: "start" }}
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

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16 px-6 sm:px-12 lg:px-20 pt-36 pb-14">

        {/* Visual panel — desktop only, only when there's a thumbnail */}
        {visualSrc && (
          <div className="hidden lg:flex w-[42%] flex-shrink-0 h-full items-center">
            <div
              className="relative w-full rounded-3xl overflow-hidden"
              style={{
                aspectRatio: "16 / 10",
                maxHeight: "55vh",
                boxShadow: `0 40px 80px ${accent}35, 0 0 0 1px ${accent}25`,
              }}
            >
              <Image
                src={visualSrc}
                alt={project.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 55%)" }}
              />
            </div>
          </div>
        )}

        {/* Info */}
        <div
          className={`flex flex-col justify-center w-full ${
            visualSrc ? "lg:flex-1" : "lg:max-w-2xl lg:mx-auto"
          }`}
        >
          {/* Category + counter */}
          <div className="flex items-center gap-3 mb-5">
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
              style={{ color: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)" }}
            >
              {num} / {tot}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-black leading-[1.08] mb-4"
            style={{
              fontSize: visualSrc
                ? "clamp(1.6rem, 3.5vw, 3.2rem)"
                : "clamp(1.8rem, 5vw, 4.5rem)",
              color: isDark ? "#fff" : "#0d0d0d",
            }}
          >
            {project.title}
          </h2>

          {/* Description */}
          <p
            className="text-sm lg:text-base leading-relaxed mb-6 line-clamp-3"
            style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.55)" }}
          >
            {project.description}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2 mb-8">
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
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                }}
              >
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            {project.caseStudy && (
              <button
                onClick={() => onOpenCaseStudy(project)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent}bb)`,
                  boxShadow: `0 8px 24px ${accent}45`,
                }}
              >
                <BookOpen className="w-4 h-4" />
                Case Study
              </button>
            )}

            {project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                style={{
                  border: isDark ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(0,0,0,0.12)",
                  color: isDark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.7)",
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}

            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                style={{
                  border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                  color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
                }}
              >
                <GitBranch className="w-4 h-4" />
                Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      {index < total - 1 && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ color: accent, opacity: 0.35 }}
        >
          <ChevronDown className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsClient() {
  const [searchTerm, setSearchTerm]           = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDarkMode, setIsDarkMode]           = useState(false);
  const [currentRoom, setCurrentRoom]         = useState(0);
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* sync dark mode */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark  = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && dark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  /* prevent body scroll while this page is mounted */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
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

  /* filter */
  const categories = ["All", "Web Development", "AI/ML", "Shopify"];

  const filteredProjects = allProjects.filter((p) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q)) ||
      p.categories.some((c) => c.toLowerCase().includes(q));
    const matchCat =
      selectedCategory === "All" || p.categories.includes(selectedCategory);
    return matchSearch && matchCat;
  });

  /* reset to room 0 on filter change */
  useEffect(() => {
    setCurrentRoom(0);
    if (containerRef.current)
      containerRef.current.scrollTop = 0;
  }, [searchTerm, selectedCategory]);

  /* track current room via IntersectionObserver */
  useEffect(() => {
    const container = containerRef.current;
    if (!container || filteredProjects.length === 0) return;
    const rooms = Array.from(container.children) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.5) {
            const i = rooms.indexOf(e.target);
            if (i !== -1) setCurrentRoom(i);
          }
        });
      },
      { threshold: 0.5, root: container }
    );
    rooms.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, [filteredProjects]);

  /* programmatic navigation */
  const goToRoom = useCallback((idx: number) => {
    const c = containerRef.current;
    if (!c) return;
    c.scrollTo({ top: idx * c.clientHeight, behavior: "smooth" });
    setCurrentRoom(idx);
  }, []);

  return (
    <>
      {/* Navbar (its internals are fixed — wrapper has no height) */}
      <div className="relative z-[100]">
        <Navbar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          scrollToSection={scrollToSection}
          activeSection="projects"
        />
      </div>

      {/* Floating filter bar — centred below the floating dock */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-[80] flex items-center gap-1.5 px-2.5 py-2 rounded-2xl backdrop-blur-xl shadow-2xl border transition-colors"
        style={{
          top: "78px",
          background: isDarkMode ? "rgba(20,20,20,0.88)" : "rgba(255,255,255,0.88)",
          border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)",
        }}
      >
        {/* search */}
        <div className="relative">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
            style={{ color: isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
          />
          <input
            type="text"
            placeholder="Search…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-xl text-xs outline-none w-28 sm:w-36 transition-all"
            style={{
              background: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
              border: isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
              color: isDarkMode ? "#fff" : "#111",
            }}
          />
        </div>

        <div
          className="w-px h-5 mx-0.5"
          style={{ background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
        />

        {categories.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: active
                  ? isDarkMode ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)"
                  : "transparent",
                color: active
                  ? isDarkMode ? "#111" : "#fff"
                  : isDarkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Rooms scroll container — fixed, covers full viewport */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-[10]"
        style={{ overflowY: "scroll", scrollSnapType: "y mandatory" }}
      >
        {filteredProjects.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-4"
            style={{
              height: "100dvh",
              background: isDarkMode ? "#0d0d14" : "#f8fafc",
            }}
          >
            <p style={{ color: isDarkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", fontSize: 14 }}>
              No projects match your search.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
              className="text-xs px-4 py-2 rounded-xl transition-all hover:scale-105"
              style={{
                background: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
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
              total={filteredProjects.length}
              isDark={isDarkMode}
              onOpenCaseStudy={setCaseStudyProject}
            />
          ))
        )}
      </div>

      {/* Room navigation counter */}
      <div
        className="fixed bottom-5 right-5 z-[80] flex items-center gap-2 px-3 py-2 rounded-2xl backdrop-blur-md border"
        style={{
          background: isDarkMode ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.82)",
          border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
          color: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
        }}
      >
        <button
          onClick={() => goToRoom(currentRoom - 1)}
          disabled={currentRoom === 0}
          className="w-6 h-6 flex items-center justify-center rounded-lg transition-all hover:scale-110 disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>

        <span className="text-xs font-mono font-bold tabular-nums">
          {String(currentRoom + 1).padStart(2, "0")}
          <span className="opacity-40 mx-0.5">/</span>
          {String(filteredProjects.length).padStart(2, "0")}
        </span>

        <button
          onClick={() => goToRoom(currentRoom + 1)}
          disabled={currentRoom >= filteredProjects.length - 1}
          className="w-6 h-6 flex items-center justify-center rounded-lg transition-all hover:scale-110 disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Case study modal */}
      <CaseStudyModal
        project={caseStudyProject}
        isDark={isDarkMode}
        onClose={() => setCaseStudyProject(null)}
      />
    </>
  );
}
