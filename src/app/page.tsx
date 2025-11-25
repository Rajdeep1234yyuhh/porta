"use client";

import React, { useState, useEffect } from "react";
import { Code, Database, Globe } from "lucide-react";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import ProjectSection from "./components/ProjectSection";
import ServiceSection from "./components/ServiceSection";

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
    { name: "Next.js", level: 90, icon: "⚡" },
    { name: "React", level: 95, icon: "⚛️" },
    { name: "Shopify/Liquid", level: 85, icon: "🛍️" },
    { name: "Tailwind CSS", level: 95, icon: "🎨" },
    { name: "AI/ML", level: 60, icon: "🤖" },
    { name: "Python", level: 75, icon: "🐍" },
  ];

  const projects = [
    {
      title: "Career Assessment Tool",
      description:
        "AI-powered career assessment solution built with Next.js and intelligent backend integration. Features include dynamic skill evaluation, personalized career recommendations, real-time analytics dashboard, and secure user profile management.",
      mediaType: "video" as const,
      video: "mks.mp4",
      image: "/images/ecommerce-thumbnail.jpg", // Fallback poster
      tech: [
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "firebase",
        "python",
        "AI",
        "ML",
      ],
      demo: "#",
      github: "https://github.com/Rajdeep1234yyuhh/mks",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Real-time analytics dashboard built with React and Node.js. Features include interactive data visualizations using Chart.js, secure Firebase authentication.Designed for tracking user behavior, performance metrics, and business KPIs in a sleek, responsive UI.",
      mediaType: "video" as const,
      video: "dashb.mp4",
      image: "/images/analytics-dashboard-thumbnail.jpg", // Fallback poster
      tech: ["React", "Tailwind CSS", "Node.js", "Firebase", "Chart.js"],
      demo: "#",
      github: "https://github.com/Rajdeep1234yyuhh/Dashboard",
    },
    {
      title: "Aekay E-commerce Website",
      description:
        "Custom e-commerce storefront developed using Shopify and Liquid. Features include responsive design, optimized product listings, seamless cart and checkout flow, and personalized UI enhancements crafted with CSS for an elegant shopping experience.",
      mediaType: "video" as const,
      video: "aekay-ecom.mp4",
      image: "/images/aekay-thumbnail.jpg", // Fallback poster
      tech: ["Shopify", "Liquid", "CSS"],
      demo: "https://aekay.in/",
      github: "#",
    },
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
      <ProjectSection isDarkMode={isDarkMode} projects={projects} />

      {/* Services Section */}
      <ServiceSection isDarkMode={isDarkMode} services={services} />

      {/* Contact Section */}
      <Contact isDarkMode={isDarkMode} />

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg transition-opacity duration-300 ${
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
          <p>&copy; 2025 Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
