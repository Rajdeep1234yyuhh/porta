"use client";

import React, { useState, useEffect } from "react";
import { Code, Database, Globe } from "lucide-react";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import ProjectSection from "./components/ProjectSection";
import ServiceSection from "./components/ServiceSection";
import QuickSolutions from "./components/QuickSolutions";
import QuickFixFAB from "./components/QuickFixFAB";
import { allProjects } from "./data/projects";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
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
    { name: "Next.js", level: 90, color: "#ffffff", bg: "#000000" },
    { name: "React", level: 95, color: "#61DAFB", bg: "#20232a" },
    { name: "Shopify", level: 85, color: "#96BF48", bg: "#1a1a1a" },
    { name: "Tailwind CSS", level: 95, color: "#38BDF8", bg: "#0f172a" },
    { name: "Python", level: 75, color: "#FFD343", bg: "#1e3a5f" },
    { name: "Node.js", level: 80, color: "#68A063", bg: "#1a1a1a" },
  ];

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Development",
      description:
        "Custom websites and web applications using modern frameworks like Next.js and React.",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "E-commerce Solutions",
      description:
        "Shopify stores, custom e-commerce platforms, and payment gateway integrations.",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "AI/ML Integration",
      description:
        "Machine learning solutions and AI-powered features for web applications.",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Navigation */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollY={scrollY}
        scrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <HeroSection isDarkMode={isDarkMode} scrollToSection={scrollToSection} />

      {/* Skills Section */}
      <SkillsSection isDarkMode={isDarkMode} skills={skills} />

      {/* Projects Section */}
      <ProjectSection isDarkMode={isDarkMode} projects={allProjects} />

      {/* Services Section */}
      <ServiceSection isDarkMode={isDarkMode} services={services} />

      {/* Quick Solutions Section */}
      <QuickSolutions
        isDarkMode={isDarkMode}
        scrollToSection={scrollToSection}
      />

      {/* Contact Section */}
      <Contact isDarkMode={isDarkMode} />

      {/* Mobile Quick Fix FAB */}
      <QuickFixFAB isDarkMode={isDarkMode} scrollToSection={scrollToSection} />

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 left-4 p-3 rounded-full shadow-lg transition-opacity duration-300 ${
          scrollY > 300 ? "opacity-100" : "opacity-0"
        } ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
      >
        ↑
      </button>
      {/* Footer */}
      <footer
        className={`py-8 ${
          isDarkMode ? "bg-gray-950 text-gray-400" : "bg-gray-950 text-gray-400"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Rajdeep. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
