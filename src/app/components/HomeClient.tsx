"use client";

import React, { useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import ContactBase from "./Contact";
import Navbar from "./Navbar";
import { ViewSwitcherDesktop } from "./ViewSwitcher";
import { SlideDeck, useSlideDeck } from "./SlideDeck";
import HeroSectionBase from "./HeroSection";
import {
  LiveProjects as LiveProjectsBase,
  PersonalProjects as PersonalProjectsBase,
  ShopifyProjects as ShopifyProjectsBase,
  PROJECT_SLIDE_IDS,
} from "./ProjectSection";
import ServiceSectionBase from "./ServiceSection";
import QuickSolutionsBase from "./QuickSolutions";
import TestimonialSectionBase from "./TestimonialSection";

// ← flip to true to mount the quick-fix FAB (it pulls in PrimeReact, so it is
// loaded lazily and only when enabled). Its wrapper is currently `hidden`.
const SHOW_QUICK_FIX_FAB = false;
const QuickFixFAB = dynamic(() => import("./QuickFixFAB"), { ssr: false });

// Slides only re-render when their own props change (e.g. theme), not on every
// slide change.
const HeroSection = memo(HeroSectionBase);
const LiveProjects = memo(LiveProjectsBase);
const PersonalProjects = memo(PersonalProjectsBase);
const ShopifyProjects = memo(ShopifyProjectsBase);
const TestimonialSection = memo(TestimonialSectionBase);
const ServiceSection = memo(ServiceSectionBase);
const QuickSolutions = memo(QuickSolutionsBase);
const Contact = memo(ContactBase);

// In slide order. The project slides are "projects" (live client work),
// "personal-projects" and "shopify-projects".
const SECTION_IDS = [
  "home",
  ...PROJECT_SLIDE_IDS,
  "testimonials",
  "services",
  "quick-solutions",
  "contact",
];

// The navbar has one "Projects" item for all three project slides
const navSection = (id: string) => (PROJECT_SLIDE_IDS.includes(id) ? "projects" : id);

export default function HomeClient() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Wheel/touch/keyboard navigation and slide state. scrollToSection is stable,
  // so the memoized slides don't re-render on every navigation.
  const deck = useSlideDeck(SECTION_IDS);
  const scrollToSection = deck.goToId;

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

  // Chat agent navigation
  useEffect(() => {
    const handler = (e: Event) => {
      scrollToSection((e as CustomEvent<string>).detail);
    };
    window.addEventListener("navigate-to-section", handler);
    return () => window.removeEventListener("navigate-to-section", handler);
  }, [scrollToSection]);

  const slides = [
    <HeroSection key="hero" isDarkMode={isDarkMode} scrollToSection={scrollToSection} />,
    <LiveProjects key="projects" isDarkMode={isDarkMode} scrollToSection={scrollToSection} />,
    <PersonalProjects key="personal-projects" isDarkMode={isDarkMode} scrollToSection={scrollToSection} />,
    <ShopifyProjects key="shopify-projects" isDarkMode={isDarkMode} scrollToSection={scrollToSection} />,
    <TestimonialSection key="testimonials" isDarkMode={isDarkMode} />,
    <ServiceSection key="services" isDarkMode={isDarkMode} />,
    <QuickSolutions key="quick" isDarkMode={isDarkMode} scrollToSection={scrollToSection} />,
    <Contact key="contact" isDarkMode={isDarkMode} />,
  ];

  // Navbar height - slides rest below this, but travel past it when animating
  const NAV_H = 84;

  return (
    <div
      ref={deck.rootRef}
      className="fixed inset-0"
      style={{ background: isDarkMode ? "#0a0a0a" : "#e8edf5" }}
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
        activeSection={navSection(deck.currentId)}
      />
      <ViewSwitcherDesktop isDarkMode={isDarkMode} />

      {/* Slides rest below the navbar. When animating they travel a full 100vh
          so they visually pass behind the navbar before disappearing off-screen.
          Entering slide is delayed so the exit finishes first. */}
      <SlideDeck
        deck={deck}
        className="fixed left-3 right-3 md:left-8 md:right-8 overflow-hidden rounded-2xl shadow-2xl"
        style={{ top: NAV_H + 8, bottom: 20 }}
      >
        {slides}
      </SlideDeck>

      {/* Keep FAB on top of everything */}
      {SHOW_QUICK_FIX_FAB && (
        <div className="fixed z-40 bottom-5 right-5">
          <QuickFixFAB isDarkMode={isDarkMode} scrollToSection={scrollToSection} />
        </div>
      )}
    </div>
  );
}
