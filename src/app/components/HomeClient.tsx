"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Contact from "./Contact";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import SkillsSection from "./SkillsSection";
import ProjectSection from "./ProjectSection";
import ServiceSection from "./ServiceSection";
import QuickSolutions from "./QuickSolutions";
import QuickFixFAB from "./QuickFixFAB";
import { allProjects } from "../data/projects";

const SECTION_IDS = [
  "home",
  "skills",
  "projects",
  "services",
  "quick-solutions",
  "contact",
];
const SECTION_LABELS = [
  "Home",
  "Skills",
  "Projects",
  "Services",
  "Solutions",
  "Contact",
];

export default function HomeClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const wheelLock = useRef(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      const clamped = Math.max(0, Math.min(index, SECTION_IDS.length - 1));
      if (clamped === current) return;
      setAnimating(true);
      setCurrent(clamped);
      setTimeout(() => setAnimating(false), 520);
    },
    [animating, current],
  );

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const idx = SECTION_IDS.indexOf(sectionId);
      if (idx !== -1) goTo(idx);
      setIsMenuOpen(false);
    },
    [goTo],
  );

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") goTo(current + 1);
      if (e.key === "ArrowUp") goTo(current - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  // Mouse wheel
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (wheelLock.current) return;
      wheelLock.current = true;
      setTimeout(() => {
        wheelLock.current = false;
      }, 600);
      if (e.deltaY > 0) goTo(current + 1);
      else goTo(current - 1);
    };
    window.addEventListener("wheel", handler, { passive: true });
    return () => window.removeEventListener("wheel", handler);
  }, [current, goTo]);

  const skills = [
    {
      name: "Next.js",
      level: 90,
      color: "#ffffff",
      bg: "#000000",
      lightBg: "#f0f0f0",
      lightColor: "#000000",
    },
    {
      name: "React",
      level: 95,
      color: "#61DAFB",
      bg: "#20232a",
      lightBg: "#e0f8fe",
      lightColor: "#0891b2",
    },
    {
      name: "Shopify",
      level: 85,
      color: "#96BF48",
      bg: "#1a1a1a",
      lightBg: "#eef6e0",
      lightColor: "#4a7a10",
    },
    {
      name: "Tailwind CSS",
      level: 95,
      color: "#38BDF8",
      bg: "#0f172a",
      lightBg: "#e0f4fe",
      lightColor: "#0284c7",
    },
    {
      name: "Python",
      level: 75,
      color: "#FFD343",
      bg: "#1e3a5f",
      lightBg: "#fef9e7",
      lightColor: "#b45309",
    },
    {
      name: "Node.js",
      level: 80,
      color: "#68A063",
      bg: "#1a1a1a",
      lightBg: "#edf5e8",
      lightColor: "#166534",
    },
  ];

  return (
    <div
      className={`transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollY={current * 100}
        scrollToSection={scrollToSection}
      />

      {/* ── Full-screen vertical slider ── */}
      <div
        className="fixed inset-0 overflow-hidden"
        style={{ zIndex: 1 }}
        onTouchStart={(e) => {
          touchStartY.current = e.touches[0].clientY;
        }}
        onTouchEnd={(e) => {
          if (touchStartY.current === null) return;
          const dy = e.changedTouches[0].clientY - touchStartY.current;
          if (Math.abs(dy) > 45) {
            if (dy < 0) goTo(current + 1);
            else goTo(current - 1);
          }
          touchStartY.current = null;
        }}
      >
        {/* Slide track — moves vertically */}
        <div
          className="transition-transform duration-500 ease-in-out will-change-transform"
          style={{ transform: `translateY(-${current * 100}vh)` }}
        >
          {/* Slide 0: Hero */}
          <div className="h-screen w-full overflow-hidden flex flex-col">
            <HeroSection
              isDarkMode={isDarkMode}
              scrollToSection={scrollToSection}
            />
          </div>

          {/* Slide 1: Skills */}
          <div className="h-screen w-full overflow-hidden flex flex-col">
            <SkillsSection isDarkMode={isDarkMode} skills={skills} />
          </div>

          {/* Slide 2: Projects */}
          <div className="h-screen w-full overflow-hidden flex flex-col">
            <ProjectSection isDarkMode={isDarkMode} projects={allProjects} />
          </div>

          {/* Slide 3: Services */}
          <div className="h-screen w-full overflow-hidden flex flex-col">
            <ServiceSection isDarkMode={isDarkMode} />
          </div>

          {/* Slide 4: Quick Solutions */}
          <div className="h-screen w-full overflow-hidden flex flex-col">
            <QuickSolutions
              isDarkMode={isDarkMode}
              scrollToSection={scrollToSection}
            />
          </div>

          {/* Slide 5: Contact */}
          <div className="h-screen w-full overflow-hidden flex flex-col">
            <Contact isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* ── Right side nav dots ── */}
        <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
          {SECTION_LABELS.map((label, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={label}
              className="group flex items-center justify-end gap-2"
            >
              {/* Label tooltip */}
              <span
                className={`text-xs font-medium tracking-wide transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-3 h-3 bg-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.9)]"
                    : "w-2 h-2 bg-gray-400/40 group-hover:bg-violet-400/60"
                }`}
              />
            </button>
          ))}
        </div>

        {/* ── Up / Down arrows ── */}
        {/* {current > 0 && (
          <button
            onClick={() => goTo(current - 1)}
            className={`fixed left-1/2 -translate-x-1/2 top-20 z-30 p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
              isDarkMode
                ? "bg-gray-800/80 text-white"
                : "bg-white/80 text-gray-700"
            }`}
          >
            ↑
          </button>
        )}
        {current < SECTION_IDS.length - 1 && (
          <button
            onClick={() => goTo(current + 1)}
            className={`fixed left-1/2 -translate-x-1/2 bottom-8 z-30 p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
              isDarkMode
                ? "bg-gray-800/80 text-white"
                : "bg-white/80 text-gray-700"
            }`}
          >
            ↓
          </button>
        )} */}

        {/* ── Section indicator ── */}
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
          style={{ marginLeft: "2rem" }}
        >
          <div
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase shadow backdrop-blur-sm ${
              isDarkMode
                ? "bg-gray-800/80 text-violet-400"
                : "bg-white/80 text-violet-600"
            }`}
          >
            {SECTION_LABELS[current]}
            <span className="ml-2 opacity-40">
              {current + 1} / {SECTION_IDS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Keep FAB on top of everything */}
      <div className="fixed z-40 bottom-4 right-4">
        <QuickFixFAB
          isDarkMode={isDarkMode}
          scrollToSection={scrollToSection}
        />
      </div>
    </div>
  );
}
