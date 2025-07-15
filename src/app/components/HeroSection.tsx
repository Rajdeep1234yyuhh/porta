"use client";

import { ExternalLink, Mail } from "lucide-react";

interface HeroSectionProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ isDarkMode, scrollToSection }: HeroSectionProps) => {
  return (
    <section
      id="about"
      className={`min-h-screen flex items-center relative overflow-hidden ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Background Elements */}
      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800"
            : "bg-gradient-to-br from-slate-50 to-blue-50"
        }`}
      ></div>
      <div
        className={`absolute top-20 right-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse ${
          isDarkMode ? "bg-blue-500/20" : "bg-blue-100"
        }`}
      ></div>
      <div
        className={`absolute bottom-20 left-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700 ${
          isDarkMode ? "bg-purple-500/20" : "bg-purple-100"
        }`}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className={isDarkMode ? "text-white" : "text-slate-900"}>
                  Web
                </span>{" "}
                <span className={isDarkMode ? "text-white" : "text-slate-900"}>
                  Developer
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  & AI Engineer
                </span>
              </h1>

              <p
                className={`text-xl leading-relaxed max-w-xl ${
                  isDarkMode ? "text-gray-300" : "text-slate-600"
                }`}
              >
                I craft exceptional digital experiences using modern
                technologies. Specializing in Next.js, React, and AI-powered web
                solutions that drive results.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  50+
                </div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-slate-600"
                  }`}
                >
                  Projects
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  3+
                </div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-slate-600"
                  }`}
                >
                  Years Exp
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  100%
                </div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-slate-600"
                  }`}
                >
                  Satisfaction
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={() => scrollToSection("projects")}
                className={`group px-8 py-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center ${
                  isDarkMode
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                View My Work
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`group border-2 px-8 py-4 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center ${
                  isDarkMode
                    ? "border-white text-white hover:bg-white hover:text-gray-900"
                    : "border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                }`}
              >
                Get In Touch
                <Mail className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Right Content - Professional Photo + Code Editor */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative space-y-8">
              {/* Professional Photo Section */}
              <div className="relative mx-auto">
                <div
                  className={`relative rounded-3xl p-3 shadow-2xl ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <img
                    src="DP.jpg"
                    alt="Your Professional Photo"
                    className="w-72 h-80 object-cover rounded-2xl"
                  />

                  {/* Status Badge */}
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    Available
                  </div>
                </div>

                {/* Mini Code Editor */}
                <div
                  className={`absolute -bottom-4 -right-8 rounded-xl shadow-xl overflow-hidden w-48 h-32 border-4 ${
                    isDarkMode
                      ? "bg-gray-900 border-gray-700"
                      : "bg-slate-900 border-white"
                  }`}
                >
                  {/* Mini Editor Header */}
                  <div
                    className={`px-3 py-2 flex items-center space-x-1 ${
                      isDarkMode ? "bg-gray-800" : "bg-slate-800"
                    }`}
                  >
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-slate-400 text-xs font-mono">
                        skills.ts
                      </span>
                    </div>
                  </div>

                  {/* Mini Code Content */}
                  <div className="p-3 font-mono text-xs space-y-1">
                    <div className="text-purple-400">
                      const <span className="text-yellow-400">skills</span> ={" "}
                      {"{"}
                    </div>
                    <div className="ml-2 text-blue-400">
                      nextjs:{" "}
                      <span className="text-green-400">&apos;expert&apos;</span>
                      ,
                    </div>
                    <div className="ml-2 text-blue-400">
                      react:{" "}
                      <span className="text-green-400">
                        &apos;advanced&apos;
                      </span>
                      ,
                    </div>
                    <div className="ml-2 text-blue-400">
                      ai:{" "}
                      <span className="text-green-400">
                        &apos;growing&apos;
                      </span>
                    </div>
                    <div className="text-purple-400">{"};"}</div>
                  </div>
                </div>
              </div>

              {/* Floating Tech Stack Cards */}
              <div
                className={`absolute -top-6 -left-6 rounded-xl p-3 shadow-lg border transform -rotate-3 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-slate-100"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">⚡</span>
                  </div>
                  <div>
                    <div
                      className={`text-xs font-semibold ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Next.js
                    </div>
                    <div
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      React Framework
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`absolute top-12 -right-8 rounded-xl p-3 shadow-lg border transform rotate-2 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-slate-100"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">TS</span>
                  </div>
                  <div>
                    <div
                      className={`text-xs font-semibold ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      TypeScript
                    </div>
                    <div
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      Type Safety
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`absolute bottom-8 -left-8 rounded-xl p-3 shadow-lg border transform -rotate-2 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-slate-100"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div>
                    <div
                      className={`text-xs font-semibold ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      AI/ML
                    </div>
                    <div
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      Python & TensorFlow
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Geometric Elements */}
              <div className="absolute -top-8 -right-16 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-10 rotate-12"></div>
              <div className="absolute -bottom-8 -left-16 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
