"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sun, Moon, Menu, X, Home, User, Code2, FolderOpen,
  Briefcase, Mail, Zap, Phone, Info, ChevronDown,
} from "lucide-react";

const PHONE = "8638752315";

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const DockItem = ({ icon: Icon, label, onClick, active, isDarkMode }) => (
  <button
    onClick={onClick}
    className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
      ${active
        ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
        : isDarkMode
          ? "text-gray-400 hover:text-white hover:bg-white/10"
          : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
      }`}
  >
    <Icon className="w-5 h-5" />
    <span className={`pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 border ${
      isDarkMode ? "bg-gray-900 text-white border-white/10" : "bg-gray-900 text-white border-gray-700"
    }`}>
      {label}
    </span>
  </button>
);

const Navbar = ({ isDarkMode, toggleTheme, isMenuOpen, setIsMenuOpen, scrollY, scrollToSection }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [quickOpen, setQuickOpen] = useState(false);
  const quickRef = useRef(null);

  const navItems = [
    { label: "Home",     icon: Home,       section: "home" },
    { label: "About",    icon: User,       section: "about" },
    { label: "Skills",   icon: Code2,      section: "skills" },
    { label: "Projects", icon: FolderOpen, section: "projects" },
    { label: "Services", icon: Briefcase,  section: "services" },
    { label: "Contact",  icon: Mail,       section: "contact" },
  ];

  // Track active section on scroll
  useEffect(() => {
    const handler = () => {
      const sections = ["about", "skills", "projects", "services", "contact"];
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (quickRef.current && !quickRef.current.contains(e.target)) setQuickOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleNav = (section) => {
    if (section === "home") {
      if (window.location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
      else window.location.href = "/";
    } else {
      scrollToSection(section);
    }
    setIsMenuOpen(false);
  };

  const handleQuickDetails = () => {
    if (window.location.pathname === "/") scrollToSection("quick-solutions");
    else window.location.href = "/#quick-solutions";
    setQuickOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* ── Desktop: floating dock ── */}
      <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-1 px-3 py-2 rounded-2xl backdrop-blur-xl shadow-2xl border transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900/85 border-white/10"
          : "bg-white/90 border-gray-200/80 shadow-gray-200/60"
      }`}>

        {/* Nav icons */}
        {navItems.map(({ label, icon, section }) => (
          <DockItem
            key={section}
            icon={icon}
            label={label}
            active={activeSection === section}
            onClick={() => handleNav(section)}
            isDarkMode={isDarkMode}
          />
        ))}

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Quick Fix */}
        <div className="relative" ref={quickRef}>
          <button
            onClick={() => setQuickOpen((o) => !o)}
            className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}
          >
            <Zap className="w-5 h-5" />
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-0.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 border border-white/10">
              Quick Fix
            </span>
          </button>
          {quickOpen && (
            <div
              style={{ animation: "dropIn 0.18s ease both" }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 rounded-xl shadow-2xl border overflow-hidden z-50 bg-gray-900 border-white/10"
            >
              <a
                href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20tech%20help%20with%3A%20`}
                target="_blank" rel="noopener noreferrer"
                onClick={() => setQuickOpen(false)}
                className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-gray-200 hover:bg-white/10 transition-colors"
              >
                <WhatsAppIcon /> WhatsApp
              </a>
              <a
                href={`tel:+${PHONE}`}
                onClick={() => setQuickOpen(false)}
                className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-gray-200 hover:bg-white/10 border-t border-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400" /> Call Me
              </a>
              <button
                onClick={() => { scrollToSection("contact"); setQuickOpen(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-gray-200 hover:bg-white/10 border-t border-white/10 transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-400" /> Message
              </button>
              <button
                onClick={handleQuickDetails}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-gray-200 hover:bg-white/10 border-t border-white/10 transition-colors"
              >
                <Info className="w-4 h-4 text-emerald-400" /> Details
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-0.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 border border-white/10">
            {isDarkMode ? "Light" : "Dark"}
          </span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Hire Me */}
        <button
          onClick={() => scrollToSection("contact")}
          className={`px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${isDarkMode ? "border-white/20 text-white hover:bg-white hover:text-gray-900" : "border-gray-900/20 text-gray-900 hover:bg-gray-900 hover:text-white"}`}
        >
          Hire Me
        </button>
      </div>

      {/* ── Mobile: top bar ── */}
      <nav className="fixed w-full z-50 lg:hidden">
        <div className={`flex items-center justify-between px-4 py-3 transition-all duration-300 ${
          scrollY > 50 ? "bg-gray-900/95 backdrop-blur-xl shadow-xl border-b border-white/10" : "bg-transparent"
        }`}>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Rajdeep Kotoky
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            style={{ animation: "dropIn 0.18s ease both" }}
            className="mx-3 mt-1 rounded-2xl border border-white/10 bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {navItems.map(({ label, icon: Icon, section }) => (
              <button
                key={section}
                onClick={() => handleNav(section)}
                className="flex items-center gap-3 w-full px-5 py-3.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
            <div className="border-t border-white/10 p-4 flex flex-col gap-3">
              <button
                onClick={() => setQuickOpen((o) => !o)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/15 transition-colors"
              >
                <Zap className="w-4 h-4" />
                Quick Fix
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${quickOpen ? "rotate-180" : ""}`} />
              </button>
              {quickOpen && (
                <div className="rounded-xl border border-white/10 overflow-hidden">
                  <a
                    href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20tech%20help%20with%3A%20`}
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => { setQuickOpen(false); setIsMenuOpen(false); }}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-gray-200 hover:bg-white/10 transition-colors"
                  >
                    <WhatsAppIcon /> WhatsApp
                  </a>
                  <a
                    href={`tel:+${PHONE}`}
                    onClick={() => { setQuickOpen(false); setIsMenuOpen(false); }}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-gray-200 hover:bg-white/10 border-t border-white/10 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-blue-400" /> Call Me
                  </a>
                  <button
                    onClick={() => { scrollToSection("contact"); setQuickOpen(false); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-gray-200 hover:bg-white/10 border-t border-white/10 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-purple-400" /> Message
                  </button>
                  <button
                    onClick={handleQuickDetails}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium text-gray-200 hover:bg-white/10 border-t border-white/10 transition-colors"
                  >
                    <Info className="w-4 h-4 text-emerald-400" /> Details
                  </button>
                </div>
              )}
              <button
                onClick={() => { scrollToSection("contact"); setIsMenuOpen(false); }}
                className="w-full px-4 py-2.5 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                Hire Me
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
