"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Contact from "./Contact";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";
import ServiceSection from "./ServiceSection";
import QuickSolutions from "./QuickSolutions";
import QuickFixFAB from "./QuickFixFAB";
import { allProjects } from "../data/projects";

const SECTION_IDS = [
  "home",
  "projects",
  "services",
  "quick-solutions",
  "contact",
];

export default function HomeClient() {
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
      setTimeout(() => setAnimating(false), 750);
    },
    [animating, current],
  );

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const idx = SECTION_IDS.indexOf(sectionId);
      if (idx !== -1) goTo(idx);
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

  const slides = [
    <HeroSection key="hero" isDarkMode={isDarkMode} scrollToSection={scrollToSection} />,
    <ProjectSection key="projects" isDarkMode={isDarkMode} projects={allProjects} />,
    <ServiceSection key="services" isDarkMode={isDarkMode} />,
    <QuickSolutions key="quick" isDarkMode={isDarkMode} scrollToSection={scrollToSection} />,
    <Contact key="contact" isDarkMode={isDarkMode} />,
  ];

  // Navbar height — slides rest below this, but travel past it when animating
  const NAV_H = 84;

  return (
    <div
      className="fixed inset-0"
      style={{ background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }}
      onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; }}
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
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
        activeSection={SECTION_IDS[current]}
      />

      {/* Slides rest below the navbar. When animating they travel a full 100vh
          so they visually pass behind the navbar before disappearing off-screen.
          Entering slide is delayed so the exit finishes first. */}
      {slides.map((slide, i) => {
        const isEntering = i === current;
        return (
          <div
            key={i}
            className="fixed overflow-hidden rounded-2xl will-change-transform shadow-2xl"
            style={{
              top: NAV_H + 8,
              left: 32,
              right: 32,
              bottom: 20,
              zIndex: isEntering ? 11 : 10,
              transform: `translateY(calc(${i - current} * 100vh))`,
              transition: "transform 650ms cubic-bezier(0.87, 0, 0.13, 1)",
              transitionDelay: isEntering ? "200ms" : "0ms",
            }}
          >
            {slide}
          </div>
        );
      })}

      {/* Keep FAB on top of everything */}
      <div className="fixed z-40 bottom-5 right-5">
        <QuickFixFAB isDarkMode={isDarkMode} scrollToSection={scrollToSection} />
      </div>
    </div>
  );
}
