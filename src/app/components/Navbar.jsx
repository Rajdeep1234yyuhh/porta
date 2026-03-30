"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, Phone, ChevronDown } from "lucide-react";

const PHONE = "8638752315"; // same as QuickSolutions — update once here

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Navbar = ({
  isDarkMode,
  toggleTheme,
  isMenuOpen,
  setIsMenuOpen,
  scrollY,
  scrollToSection,
}) => {
  const [quickOpen, setQuickOpen] = useState(false);
  const quickRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (quickRef.current && !quickRef.current.contains(e.target)) {
        setQuickOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrollY > 50
          ? isDarkMode
            ? "bg-gray-900/95 backdrop-blur-xl shadow-xl border-b border-gray-700/60"
            : "bg-white/95 backdrop-blur-xl shadow-xl border-b border-slate-200/60"
          : isDarkMode
            ? "bg-gray-900/20 backdrop-blur-sm"
            : "bg-white/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Professional Brand */}
          <Link href="/" className="flex items-center space-x-3 group/brand">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover/brand:shadow-purple-500/30 transition-shadow duration-300">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold text-lg transition-colors duration-300 ${
                  isDarkMode
                    ? "text-white group-hover/brand:text-purple-300"
                    : "text-slate-900 group-hover/brand:text-purple-700"
                }`}
              >
                Rajdeep Kotoky
              </span>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-slate-500"
                }`}
              >
                Full Stack Developer & AI Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {["About", "Skills", "Projects", "Services", "Contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative font-semibold transition-all duration-300 hover:scale-105 group ${
                    isDarkMode
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ),
            )}

            {/* Quick Fix dropdown */}
            <div className="relative" ref={quickRef}>
              <button
                onClick={() => setQuickOpen((o) => !o)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm text-white
                  bg-gradient-to-r from-green-500 to-emerald-600
                  hover:from-green-600 hover:to-emerald-700
                  shadow-sm hover:shadow-green-500/30 transition-all duration-200 hover:scale-105"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Quick Fix
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${quickOpen ? "rotate-180" : ""}`}
                />
              </button>

              {quickOpen && (
                <div
                  style={{ animation: "dropIn 0.2s ease both" }}
                  className={`absolute top-full right-0 mt-2 w-44 rounded-xl shadow-xl border overflow-hidden z-50 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <a
                    href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20tech%20help%20with%3A%20`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setQuickOpen(false)}
                    className={`flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors ${
                      isDarkMode
                        ? "text-gray-200 hover:bg-gray-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:+${PHONE}`}
                    onClick={() => setQuickOpen(false)}
                    className={`flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors border-t ${
                      isDarkMode
                        ? "text-gray-200 hover:bg-gray-700 border-gray-700"
                        : "text-slate-700 hover:bg-slate-50 border-slate-100"
                    }`}
                  >
                    <Phone className="w-4 h-4 text-blue-500" />
                    Call Me
                  </a>
                  <button
                    onClick={() => {
                      scrollToSection("contact");
                      setQuickOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors border-t ${
                      isDarkMode
                        ? "text-gray-200 hover:bg-gray-700 border-gray-700"
                        : "text-slate-700 hover:bg-slate-50 border-slate-100"
                    }`}
                  >
                    <span className="w-4 h-4 flex items-center justify-center text-purple-500">
                      ✉
                    </span>
                    Message
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "text-gray-300 hover:text-yellow-400 hover:bg-gray-800"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-100"
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDarkMode
                  ? "text-gray-300 hover:text-yellow-400 hover:bg-gray-800"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-100"
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDarkMode
                  ? "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-100"
              }`}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden absolute top-full left-4 right-4 backdrop-blur-xl shadow-2xl rounded-2xl mt-2 py-6 border ${
              isDarkMode
                ? "bg-gray-800/95 border-gray-700/60"
                : "bg-white/95 border-slate-200/60"
            }`}
          >
            <div className="space-y-1">
              {["About", "Skills", "Projects", "Services", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`block w-full text-left px-6 py-3 transition-all duration-200 font-medium rounded-xl mx-2 ${
                      isDarkMode
                        ? "text-gray-300 hover:text-blue-400 hover:bg-gray-700/50"
                        : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/50"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
              <div
                className={`px-6 pt-4 border-t mt-4 space-y-3 ${
                  isDarkMode ? "border-gray-700" : "border-slate-200"
                }`}
              >
                <button
                  onClick={() => setQuickOpen((o) => !o)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Quick Fix
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${quickOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {quickOpen && (
                  <div
                    style={{ animation: "dropIn 0.2s ease both" }}
                    className={`rounded-xl border overflow-hidden ${
                      isDarkMode
                        ? "bg-gray-700/60 border-gray-600"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <a
                      href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20tech%20help%20with%3A%20`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        setQuickOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors ${
                        isDarkMode
                          ? "text-gray-200 hover:bg-gray-600"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <WhatsAppIcon />
                      WhatsApp
                    </a>
                    <a
                      href={`tel:+${PHONE}`}
                      onClick={() => {
                        setQuickOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors border-t ${
                        isDarkMode
                          ? "text-gray-200 hover:bg-gray-600 border-gray-600"
                          : "text-slate-700 hover:bg-slate-100 border-slate-200"
                      }`}
                    >
                      <Phone className="w-4 h-4 text-blue-500" />
                      Call Me
                    </a>
                    <button
                      onClick={() => {
                        scrollToSection("contact");
                        setQuickOpen(false);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors border-t ${
                        isDarkMode
                          ? "text-gray-200 hover:bg-gray-600 border-gray-600"
                          : "text-slate-700 hover:bg-slate-100 border-slate-200"
                      }`}
                    >
                      <span className="w-4 h-4 flex items-center justify-center text-purple-500">
                        ✉
                      </span>
                      Message
                    </button>
                  </div>
                )}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
