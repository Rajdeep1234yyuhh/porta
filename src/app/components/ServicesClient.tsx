"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Globe, Database, Code, CheckCircle } from "lucide-react";
import { allServices } from "../data/services";
import Navbar from "./Navbar";

const ICON_MAP = {
  globe: Globe,
  database: Database,
  code: Code,
};

const gradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
];

const borderHover = [
  "hover:border-blue-500/50 hover:shadow-blue-500/20",
  "hover:border-purple-500/50 hover:shadow-purple-500/20",
  "hover:border-orange-500/50 hover:shadow-orange-500/20",
];

const tagColors = [
  "bg-blue-500/10 text-blue-500 border-blue-500/30",
  "bg-purple-500/10 text-purple-500 border-purple-500/30",
  "bg-orange-500/10 text-orange-500 border-orange-500/30",
];

export default function ServicesClient() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setIsDarkMode(saved === "dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-slate-50"}`}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollY={scrollY}
        scrollToSection={scrollToSection}
      />

      <div className={`relative overflow-hidden pt-28 pb-14 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-blue-500" : "bg-blue-300"}`} />
          <div className={`absolute bottom-0 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-purple-500" : "bg-purple-300"}`} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className={`inline-block text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full mb-4 ${isDarkMode ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-2 border-blue-400/30" : "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-2 border-blue-300"}`}>
            What I Offer
          </span>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <div className="w-24 h-1 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <p className={`text-base max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
            Detailed breakdown of how I can help bring your digital vision to life
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {allServices.map((service, index) => {
          const Icon = ICON_MAP[service.icon];
          return (
            <div
              id={service.slug}
              key={service.slug}
              className={`group relative rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-2xl scroll-mt-24 ${
                isDarkMode
                  ? `bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 ${borderHover[index]}`
                  : `bg-white border-slate-200 ${borderHover[index]}`
              }`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradients[index]} opacity-10 rounded-bl-full rounded-tr-2xl pointer-events-none group-hover:opacity-20 transition-opacity duration-300`} />

              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <div className="flex flex-col items-center md:items-start gap-4 md:w-56 shrink-0">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-xl bg-gradient-to-br ${gradients[index]} group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="text-white w-9 h-9" />
                  </div>
                  <div>
                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-2 ${tagColors[index]}`}>
                      Service
                    </span>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      {service.title}
                    </h2>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <p className={`text-base leading-relaxed ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                    {service.fullDescription}
                  </p>

                  <div>
                    <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                      What&apos;s included
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {service.features.map((f) => (
                        <li key={f} className={`flex items-center gap-2 text-sm ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((t) => (
                        <span
                          key={t}
                          className={`text-xs font-medium px-3 py-1 rounded-full border ${
                            isDarkMode
                              ? "bg-gray-700/60 border-gray-600 text-gray-300"
                              : "bg-slate-100 border-slate-200 text-slate-700"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`py-12 text-center ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <p className={`text-base mb-4 ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
          Interested in working together?
        </p>
        <Link
          href="/#contact"
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 ${isDarkMode ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-800"}`}
        >
          Get In Touch
        </Link>
      </div>
    </div>
  );
}
