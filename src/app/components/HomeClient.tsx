"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import dynamic from "next/dynamic";
import ContactBase from "./Contact";
import Navbar from "./Navbar";
import { ViewSwitcherDesktop } from "./ViewSwitcher";
import HeroSectionBase from "./HeroSection";
import ProjectSectionBase from "./ProjectSection";
import ServiceSectionBase from "./ServiceSection";
import QuickSolutionsBase from "./QuickSolutions";
import TestimonialSectionBase from "./TestimonialSection";
import { allProjects } from "../data/projects";

// ← flip to true to mount the quick-fix FAB (it pulls in PrimeReact, so it is
// loaded lazily and only when enabled). Its wrapper is currently `hidden`.
const SHOW_QUICK_FIX_FAB = false;
const QuickFixFAB = dynamic(() => import("./QuickFixFAB"), { ssr: false });

// Slides only re-render when their own props change (e.g. theme), not on every
// slide change.
const HeroSection = memo(HeroSectionBase);
const TestimonialSection = memo(TestimonialSectionBase);
const ProjectSection = memo(ProjectSectionBase);
const ServiceSection = memo(ServiceSectionBase);
const QuickSolutions = memo(QuickSolutionsBase);
const Contact = memo(ContactBase);

const SECTION_IDS = [
  "home",
  "testimonials",
  "projects",
  "services",
  "quick-solutions",
  "contact",
];

export default function HomeClient() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [current, setCurrent] = useState(0);
  // Refs (not state) so goTo/scrollToSection stay stable and the memoized
  // slides don't re-render on every navigation.
  const currentRef = useRef(0);
  const animatingRef = useRef(false);
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

  const goTo = useCallback((index: number) => {
    if (animatingRef.current) return;
    const clamped = Math.max(0, Math.min(index, SECTION_IDS.length - 1));
    if (clamped === currentRef.current) return;
    animatingRef.current = true;
    currentRef.current = clamped;
    setCurrent(clamped);
    setTimeout(() => {
      animatingRef.current = false;
    }, 750);
  }, []);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const idx = SECTION_IDS.indexOf(sectionId);
      if (idx !== -1) goTo(idx);
    },
    [goTo],
  );

  // Chat agent navigation
  useEffect(() => {
    const handler = (e: Event) => {
      scrollToSection((e as CustomEvent<string>).detail);
    };
    window.addEventListener("navigate-to-section", handler);
    return () => window.removeEventListener("navigate-to-section", handler);
  }, [scrollToSection]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") goTo(currentRef.current + 1);
      if (e.key === "ArrowUp") goTo(currentRef.current - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goTo]);

  // Mouse wheel
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (wheelLock.current) return;
      wheelLock.current = true;
      setTimeout(() => {
        wheelLock.current = false;
      }, 600);
      if (e.deltaY > 0) goTo(currentRef.current + 1);
      else goTo(currentRef.current - 1);
    };
    window.addEventListener("wheel", handler, { passive: true });
    return () => window.removeEventListener("wheel", handler);
  }, [goTo]);

  const slides = [
    <HeroSection key="hero" isDarkMode={isDarkMode} scrollToSection={scrollToSection} />,
    <TestimonialSection key="testimonials" isDarkMode={isDarkMode} />,
    <ProjectSection key="projects" isDarkMode={isDarkMode} projects={allProjects} />,
    <ServiceSection key="services" isDarkMode={isDarkMode} />,
    <QuickSolutions key="quick" isDarkMode={isDarkMode} scrollToSection={scrollToSection} />,
    <Contact key="contact" isDarkMode={isDarkMode} />,
  ];

  // Navbar height - slides rest below this, but travel past it when animating
  const NAV_H = 84;

  return (
    <div
      className="fixed inset-0"
      style={{ background: isDarkMode ? "#0a0a0a" : "#e8edf5" }}
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
      {/* Root typography the PrimeReact theme used to apply on this page. Kept so
          the page renders identically now that PrimeReact isn't loaded here. */}
      <style>{`
        :root {
          font-family: "Inter var", sans-serif;
          font-feature-settings: "cv02", "cv03", "cv04", "cv11";
          font-variation-settings: normal;
          color-scheme: light;
        }
      `}</style>
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
        activeSection={SECTION_IDS[current]}
      />
      <ViewSwitcherDesktop isDarkMode={isDarkMode} />

      {/* Slides rest below the navbar. When animating they travel a full 100vh
          so they visually pass behind the navbar before disappearing off-screen.
          Entering slide is delayed so the exit finishes first. */}
      {slides.map((slide, i) => {
        const isEntering = i === current;
        return (
          <div
            key={i}
            className="fixed left-3 right-3 md:left-8 md:right-8 overflow-hidden rounded-2xl will-change-transform shadow-2xl"
            style={{
              top: NAV_H + 8,
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
      {SHOW_QUICK_FIX_FAB && (
        <div className="fixed z-40 bottom-5 right-5">
          <QuickFixFAB isDarkMode={isDarkMode} scrollToSection={scrollToSection} />
        </div>
      )}
    </div>
  );
}
