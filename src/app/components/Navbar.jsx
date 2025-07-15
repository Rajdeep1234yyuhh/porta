"use client";

import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = ({
  isDarkMode,
  toggleTheme,
  isMenuOpen,
  setIsMenuOpen,
  scrollY,
  scrollToSection,
}) => {
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
        <div className="flex justify-between items-center py-4">
          {/* Professional Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold text-lg transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-slate-900"
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
          </div>

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
              )
            )}

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
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
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
                )
              )}
              <div
                className={`px-6 pt-4 border-t mt-4 ${
                  isDarkMode ? "border-gray-700" : "border-slate-200"
                }`}
              >
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
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
