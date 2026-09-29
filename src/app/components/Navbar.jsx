"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sun,
  Moon,
  Home,
  FolderOpen,
  Briefcase,
  Mail,
  Star,
  Zap,
  Phone,
  Info,
  Share2,
  MessageSquare,
  Volume2,
  VolumeX,
  Box,
  Terminal,
} from "lucide-react";
import { useContact } from "../context/ContactContext";
import { useSoundEffects } from "../hooks/useSoundEffects";


const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const DockItem = ({ icon: Icon, label, onClick, active, isDarkMode, onHover }) => (
  <button
    onClick={onClick}
    onMouseEnter={onHover}
    className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
      ${
        active
          ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
          : isDarkMode
            ? "text-gray-400 hover:text-white hover:bg-white/10"
            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
      }`}
  >
    <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-2" />
    <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none px-2 py-0.5 rounded-md bg-gray-900 text-white shadow">
      {label}
    </span>
  </button>
);

const Navbar = ({
  isDarkMode,
  toggleTheme,
  scrollToSection,
  activeSection = "home",
}) => {
  const contact = useContact();
  const [quickOpen, setQuickOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const quickRefDesktop = useRef(null);
  const quickRefMobile = useRef(null);
  const socialRef = useRef(null);
  const { playClick, playHover, muted, toggleMute } = useSoundEffects();

  const navItems = [
    { label: "Home", icon: Home, section: "home" },
    { label: "Reviews", icon: Star, section: "testimonials" },
    { label: "Projects", icon: FolderOpen, section: "projects" },
    { label: "Services", icon: Briefcase, section: "services" },
    { label: "Contact", icon: Mail, section: "contact" },
  ];
  const mobileButtonClass = isDarkMode
    ? "text-gray-400 hover:text-white hover:bg-white/10"
    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100";
  const mobileDividerClass = isDarkMode ? "bg-white/10" : "bg-gray-200";
  const mobileTooltipClass = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-slate-800 border border-slate-200";

  useEffect(() => {
    const handleOutside = (e) => {
      const insideQuick =
        (quickRefDesktop.current && quickRefDesktop.current.contains(e.target)) ||
        (quickRefMobile.current && quickRefMobile.current.contains(e.target));
      if (!insideQuick) setQuickOpen(false);
      if (socialRef.current && !socialRef.current.contains(e.target))
        setSocialOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleNav = (section) => {
    scrollToSection(section);
  };

  const handleQuickDetails = () => {
    scrollToSection("quick-solutions");
    setQuickOpen(false);
  };

  return (
    <>
      {/* ── Desktop: floating dock ── */}
      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-0.5 px-2 py-2 rounded-2xl backdrop-blur-xl shadow-2xl border transition-colors duration-300 overflow-visible ${
          isDarkMode
            ? "bg-[#141414]/95 border-white/[0.08]"
            : "bg-white/90 border-gray-200/80 shadow-gray-200/60"
        }`}
      >
        {/* Nav icons */}
        {navItems.map(({ label, icon, section }) => (
          <DockItem
            key={section}
            icon={icon}
            label={label}
            active={activeSection === section}
            onClick={() => { playClick(); handleNav(section); }}
            onHover={playHover}
            isDarkMode={isDarkMode}
          />
        ))}

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Quick Fix */}
        <div className="relative" ref={quickRefDesktop}>
          <button
            onClick={() => { playClick(); setQuickOpen((o) => !o); }}
            onMouseEnter={playHover}
            className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
              activeSection === "quick-solutions"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                : isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-white/10"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Zap className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-2" />
            <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none px-2 py-0.5 rounded-md bg-gray-900 text-white shadow">
              Quick Fix
            </span>
          </button>
          <div
            className={`absolute top-full right-0 z-50 mt-3 flex gap-2 floating-action-menu ${
              quickOpen ? "is-open" : "is-closed"
            }`}
            style={{
              "--floating-closed-y": "-8px",
              "--floating-origin": "top right",
            }}
          >
            <a
              href={`${contact.whatsappHref}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20tech%20help%20with%3A%20`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { playClick(); setQuickOpen(false); }}
              onMouseEnter={playHover}
              className="floating-action-option"
              style={{ color: "#25D366" }}
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <WhatsAppIcon />
              <span className="floating-action-label">WhatsApp</span>
            </a>
            <a
              href={contact.telHref}
              onClick={() => { playClick(); setQuickOpen(false); }}
              onMouseEnter={playHover}
              className="floating-action-option"
              style={{ color: "#60a5fa" }}
              aria-label="Call me"
              title="Call me"
            >
              <Phone className="w-4 h-4" />
              <span className="floating-action-label">Call</span>
            </a>
            <button
              type="button"
              onClick={() => { playClick(); scrollToSection("contact"); setQuickOpen(false); }}
              onMouseEnter={playHover}
              className="floating-action-option"
              style={{ color: "#c084fc" }}
              aria-label="Message"
              title="Message"
            >
              <Mail className="w-4 h-4" />
              <span className="floating-action-label">Message</span>
            </button>
            <button
              type="button"
              onClick={() => { playClick(); handleQuickDetails(); }}
              onMouseEnter={playHover}
              className="floating-action-option"
              style={{ color: "#34d399" }}
              aria-label="Quick fix details"
              title="Quick fix details"
            >
              <Info className="w-4 h-4" />
              <span className="floating-action-label">Details</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Theme toggle */}
        <button
          onClick={() => { playClick(); toggleTheme(); }}
          onMouseEnter={playHover}
          className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-2" />
          ) : (
            <Moon className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-2" />
          )}
          <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none px-2 py-0.5 rounded-md bg-gray-900 text-white shadow">
            {isDarkMode ? "Light" : "Dark"}
          </span>
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Sound toggle */}
        <button
          onClick={toggleMute}
          onMouseEnter={playHover}
          className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}
        >
          {muted ? (
            <VolumeX className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-2" />
          ) : (
            <Volume2 className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-2" />
          )}
          <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none px-2 py-0.5 rounded-md bg-gray-900 text-white shadow">
            {muted ? "Unmute" : "Mute"}
          </span>
        </button>

      </div>

      {/* ── Desktop: right side — contact pill + social pill ── */}
      <div className="fixed top-5 right-8 z-50 hidden lg:flex items-center gap-3">

        {/* Contact pill */}
        <div className={`flex items-center gap-1 px-2 py-2 rounded-2xl backdrop-blur-xl shadow-2xl border transition-colors duration-300 overflow-visible ${isDarkMode ? "bg-[#141414]/95 border-white/[0.08]" : "bg-white/90 border-gray-200/80 shadow-gray-200/60"}`}>
          {/* WhatsApp */}
          <a href={`${contact.whatsappHref}?text=Hi%20Rajdeep%2C%20I%20would%20like%20to%20get%20in%20touch%21`} target="_blank" rel="noopener noreferrer"
            onClick={playClick} onMouseEnter={playHover}
            className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-[#25D366] hover:bg-white/10" : "text-gray-500 hover:text-[#25D366] hover:bg-gray-100"}`}>
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none px-2 py-0.5 rounded-md bg-gray-900 text-white shadow">WhatsApp</span>
          </a>

          <div className={`w-px h-5 ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`} />

          {/* SMS */}
          <a href={`sms:${contact.phoneE164}`}
            onClick={playClick} onMouseEnter={playHover}
            className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-blue-400 hover:bg-white/10" : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"}`}>
            <MessageSquare className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-2" />
            <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none px-2 py-0.5 rounded-md bg-gray-900 text-white shadow">Message</span>
          </a>

          <div className={`w-px h-5 ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`} />

          {/* Phone */}
          <a href={contact.telHref}
            onClick={playClick} onMouseEnter={playHover}
            className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-emerald-400 hover:bg-white/10" : "text-gray-500 hover:text-emerald-600 hover:bg-gray-100"}`}>
            <Phone className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-2" />
            <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none px-2 py-0.5 rounded-md bg-gray-900 text-white shadow">Call</span>
          </a>

          <div className={`w-px h-5 ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`} />

          {/* Email */}
          <a href={contact.mailtoHref}
            onClick={playClick} onMouseEnter={playHover}
            className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-violet-400 hover:bg-white/10" : "text-gray-500 hover:text-violet-600 hover:bg-gray-100"}`}>
            <Mail className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-2" />
            <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none px-2 py-0.5 rounded-md bg-gray-900 text-white shadow">Email</span>
          </a>
        </div>

        {/* Social pill */}
        <div className={`flex items-center gap-1 px-2 py-2 rounded-2xl backdrop-blur-xl shadow-2xl border transition-colors duration-300 overflow-visible ${isDarkMode ? "bg-[#141414]/95 border-white/[0.08]" : "bg-white/90 border-gray-200/80 shadow-gray-200/60"}`}>
          {/* GitHub */}
          <a href={contact.github} target="_blank" rel="noopener noreferrer"
            onClick={playClick} onMouseEnter={playHover}
            className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}>
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none px-2 py-0.5 rounded-md bg-gray-900 text-white shadow">GitHub</span>
          </a>

          <div className={`w-px h-5 ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`} />

          {/* LinkedIn */}
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"
            onClick={playClick} onMouseEnter={playHover}
            className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-[#0A66C2] hover:bg-white/10" : "text-gray-500 hover:text-[#0A66C2] hover:bg-gray-100"}`}>
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none px-2 py-0.5 rounded-md bg-gray-900 text-white shadow">LinkedIn</span>
          </a>

          <div className={`w-px h-5 ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`} />

          {/* Instagram */}
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer"
            onClick={playClick} onMouseEnter={playHover}
            className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${isDarkMode ? "text-gray-400 hover:text-[#E1306C] hover:bg-white/10" : "text-gray-500 hover:text-[#E1306C] hover:bg-gray-100"}`}>
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none px-2 py-0.5 rounded-md bg-gray-900 text-white shadow">Instagram</span>
          </a>
        </div>

      </div>

      {/* ── Mobile: floating dock (same style as desktop, top-center) ── */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex lg:hidden items-center gap-0.5 px-2 py-2 rounded-2xl backdrop-blur-xl shadow-2xl border transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#141414]/95 border-white/[0.08]"
            : "bg-white/90 border-gray-200/80 shadow-gray-200/60"
        }`}
      >
        {navItems.map(({ label, icon: Icon, section }) => {
          const isActive = activeSection === section;
          return (
            <button
              key={section}
              onClick={() => { playClick(); handleNav(section); }}
              onMouseEnter={playHover}
              className={`group relative flex flex-col items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                  : mobileButtonClass
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform duration-200 ${isActive ? "" : "group-hover:-translate-y-1.5"}`}
              />
              <span
                className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap pointer-events-none px-1.5 py-0.5 rounded-md shadow transition-all duration-200 ${mobileTooltipClass} ${
                  isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}

        <div className={`w-px h-5 ${mobileDividerClass} mx-0.5`} />

        {/* Quick Fix */}
        <div className="relative" ref={quickRefMobile}>
          <button
            onClick={() => { playClick(); setQuickOpen((o) => !o); }}
            onMouseEnter={playHover}
            className={`group relative flex flex-col items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 ${
              activeSection === "quick-solutions"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                : mobileButtonClass
            }`}
          >
            <Zap
              className={`w-4 h-4 transition-transform duration-200 ${activeSection === "quick-solutions" ? "" : "group-hover:-translate-y-1.5"}`}
            />
            <span
              className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap pointer-events-none px-1.5 py-0.5 rounded-md shadow transition-all duration-200 ${mobileTooltipClass} ${
                activeSection === "quick-solutions"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
              }`}
            >
              Quick Fix
            </span>
          </button>
          <div
            className={`absolute top-full right-0 z-50 mt-3 flex gap-2 floating-action-menu ${
              quickOpen ? "is-open" : "is-closed"
            }`}
            style={{
              "--floating-closed-y": "-8px",
              "--floating-origin": "top right",
            }}
          >
            <a
              href={`${contact.whatsappHref}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20tech%20help%20with%3A%20`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { playClick(); setQuickOpen(false); }}
              onMouseEnter={playHover}
              className="floating-action-option"
              style={{ color: "#25D366" }}
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <WhatsAppIcon />
              <span className="floating-action-label">WhatsApp</span>
            </a>
            <a
              href={contact.telHref}
              onClick={() => { playClick(); setQuickOpen(false); }}
              onMouseEnter={playHover}
              className="floating-action-option"
              style={{ color: "#60a5fa" }}
              aria-label="Call me"
              title="Call me"
            >
              <Phone className="w-4 h-4" />
              <span className="floating-action-label">Call</span>
            </a>
            <button
              type="button"
              onClick={() => { playClick(); scrollToSection("contact"); setQuickOpen(false); }}
              onMouseEnter={playHover}
              className="floating-action-option"
              style={{ color: "#c084fc" }}
              aria-label="Message"
              title="Message"
            >
              <Mail className="w-4 h-4" />
              <span className="floating-action-label">Message</span>
            </button>
            <button
              type="button"
              onClick={() => { playClick(); handleQuickDetails(); }}
              onMouseEnter={playHover}
              className="floating-action-option"
              style={{ color: "#34d399" }}
              aria-label="Quick fix details"
              title="Quick fix details"
            >
              <Info className="w-4 h-4" />
              <span className="floating-action-label">Details</span>
            </button>
          </div>
        </div>

        <div className={`w-px h-5 ${mobileDividerClass} mx-0.5`} />

        {/* Theme */}
        <button
          onClick={() => { playClick(); toggleTheme(); }}
          onMouseEnter={playHover}
          className={`group relative flex flex-col items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 ${mobileButtonClass}`}
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-1.5" />
          ) : (
            <Moon className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-1.5" />
          )}
          <span className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none px-1.5 py-0.5 rounded-md shadow ${mobileTooltipClass}`}>
            {isDarkMode ? "Light" : "Dark"}
          </span>
        </button>

        <div className={`w-px h-5 ${mobileDividerClass} mx-0.5`} />

        {/* Sound toggle */}
        <button
          onClick={toggleMute}
          onMouseEnter={playHover}
          className={`group relative flex flex-col items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 ${mobileButtonClass}`}
        >
          {muted ? (
            <VolumeX className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-1.5" />
          ) : (
            <Volume2 className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-1.5" />
          )}
          <span className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none px-1.5 py-0.5 rounded-md shadow ${mobileTooltipClass}`}>
            {muted ? "Unmute" : "Mute"}
          </span>
        </button>

        <div className={`w-px h-5 ${mobileDividerClass} mx-0.5`} />

        {/* Social */}
        <div className="relative" ref={socialRef}>
          <button
            onClick={() => setSocialOpen((o) => !o)}
            className={`group relative flex flex-col items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 ${mobileButtonClass}`}
          >
            <Share2 className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-1.5" />
            <span className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none px-1.5 py-0.5 rounded-md shadow ${mobileTooltipClass}`}>
              Social
            </span>
          </button>
          <div
            className={`absolute top-full right-0 z-50 mt-3 flex gap-2 floating-action-menu ${
              socialOpen ? "is-open" : "is-closed"
            }`}
            style={{
              "--floating-closed-y": "-8px",
              "--floating-origin": "top right",
            }}
          >
            <Link
              href="/cube"
              onClick={() => { playClick(); setSocialOpen(false); }}
              className="floating-action-option"
              style={{ color: "#a78bfa" }}
              aria-label="Cube View"
              title="Cube View"
            >
              <Box className="w-4 h-4" />
              <span className="floating-action-label">Cube</span>
            </Link>
            <Link
              href="/terminal"
              onClick={() => { playClick(); setSocialOpen(false); }}
              className="floating-action-option"
              style={{ color: "#34d399" }}
              aria-label="Terminal View"
              title="Terminal View"
            >
              <Terminal className="w-4 h-4" />
              <span className="floating-action-label">Terminal</span>
            </Link>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { playClick(); setSocialOpen(false); }}
              className="floating-action-option"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span className="floating-action-label">GitHub</span>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { playClick(); setSocialOpen(false); }}
              className="floating-action-option"
              style={{ color: "#60a5fa" }}
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="floating-action-label">LinkedIn</span>
            </a>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { playClick(); setSocialOpen(false); }}
              className="floating-action-option"
              style={{ color: "#fb7185" }}
              aria-label="Instagram"
              title="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span className="floating-action-label">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
