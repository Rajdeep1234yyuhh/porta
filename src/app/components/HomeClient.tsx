"use client";

import React, { useState, useEffect } from "react";
import Contact from "./Contact";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import SkillsSection from "./SkillsSection";
import ProjectSection from "./ProjectSection";
import ServiceSection from "./ServiceSection";
import QuickSolutions from "./QuickSolutions";
import QuickFixFAB from "./QuickFixFAB";
import { allProjects } from "../data/projects";

export default function HomeClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const skills = [
    { name: "Next.js",     level: 90, color: "#ffffff", bg: "#000000", lightBg: "#f0f0f0", lightColor: "#000000" },
    { name: "React",       level: 95, color: "#61DAFB", bg: "#20232a", lightBg: "#e0f8fe", lightColor: "#0891b2" },
    { name: "Shopify",     level: 85, color: "#96BF48", bg: "#1a1a1a", lightBg: "#eef6e0", lightColor: "#4a7a10" },
    { name: "Tailwind CSS",level: 95, color: "#38BDF8", bg: "#0f172a", lightBg: "#e0f4fe", lightColor: "#0284c7" },
    { name: "Python",      level: 75, color: "#FFD343", bg: "#1e3a5f", lightBg: "#fef9e7", lightColor: "#b45309" },
    { name: "Node.js",     level: 80, color: "#68A063", bg: "#1a1a1a", lightBg: "#edf5e8", lightColor: "#166534" },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollY={scrollY}
        scrollToSection={scrollToSection}
      />
      <HeroSection isDarkMode={isDarkMode} scrollToSection={scrollToSection} />
      <SkillsSection isDarkMode={isDarkMode} skills={skills} />
      <ProjectSection isDarkMode={isDarkMode} projects={allProjects} />
      <ServiceSection isDarkMode={isDarkMode} />
      <QuickSolutions isDarkMode={isDarkMode} scrollToSection={scrollToSection} />
      <Contact isDarkMode={isDarkMode} />
      <QuickFixFAB isDarkMode={isDarkMode} scrollToSection={scrollToSection} />
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 left-4 p-3 rounded-full shadow-lg transition-opacity duration-300 ${
          scrollY > 300 ? "opacity-100" : "opacity-0"
        } ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
      >
        ↑
      </button>
      <footer className="py-8 bg-gray-950 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 Rajdeep. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
