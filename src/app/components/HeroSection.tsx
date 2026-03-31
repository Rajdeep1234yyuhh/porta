"use client";

import React from "react";
import { ExternalLink, Mail } from "lucide-react";

interface HeroSectionProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ isDarkMode, scrollToSection }: HeroSectionProps) => {
  const [projectCount, setProjectCount] = React.useState(0);
  const [yearsCount, setYearsCount] = React.useState(0);
  const [satisfactionCount, setSatisfactionCount] = React.useState(0);

  React.useEffect(() => {
    // Animate Projects (0 to 50)
    const projectInterval = setInterval(() => {
      setProjectCount((prev) => {
        if (prev >= 50) {
          clearInterval(projectInterval);
          return 50;
        }
        return prev + 1;
      });
    }, 30);

    // Animate Years (0 to 5)
    const yearsInterval = setInterval(() => {
      setYearsCount((prev) => {
        if (prev >= 5) {
          clearInterval(yearsInterval);
          return 5;
        }
        return prev + 1;
      });
    }, 300);

    // Animate Satisfaction (0 to 100)
    const satisfactionInterval = setInterval(() => {
      setSatisfactionCount((prev) => {
        if (prev >= 100) {
          clearInterval(satisfactionInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => {
      clearInterval(projectInterval);
      clearInterval(yearsInterval);
      clearInterval(satisfactionInterval);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(-3deg);
          }
          50% {
            transform: translateY(-10px) rotate(-3deg);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px) rotate(2deg);
          }
          50% {
            transform: translateY(-12px) rotate(2deg);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-8px) rotate(-2deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>

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
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span
                    className={isDarkMode ? "text-white" : "text-slate-900"}
                  >
                    Web
                  </span>{" "}
                  <span
                    className={isDarkMode ? "text-white" : "text-slate-900"}
                  >
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
                  technologies. Specializing in Next.js, React, and AI-powered
                  web solutions that drive results.
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
                    {projectCount}+
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
                    {yearsCount}+
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
                    {satisfactionCount}%
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

              {/* CTA Buttons - Professional Design */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="group px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-md transition-all duration-200 font-medium flex items-center justify-center shadow-sm hover:shadow-md"
                >
                  View My Work
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection("contact")}
                  className={`group px-7 py-3.5 rounded-md transition-all duration-200 font-medium border-2 flex items-center justify-center ${
                    isDarkMode
                      ? "border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400/50"
                      : "border-purple-600/30 text-purple-700 hover:bg-purple-50 hover:border-purple-600/50"
                  }`}
                >
                  Get In Touch
                  <Mail className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Content - Professional Photo + Floating Tech Cards */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative space-y-8">
                {/* Professional Photo Section */}
                <div className="relative mx-auto">
                  <div
                    className={`relative rounded-3xl p-3 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] ${
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
                </div>

                {/* Floating Tech Stack Cards */}
                <div
                  className={`absolute -top-6 -left-6 rounded-xl p-3 shadow-lg border animate-float cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                      : "bg-white border-slate-100 hover:bg-slate-50"
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
                  className={`absolute top-12 -right-8 rounded-xl p-3 shadow-lg border animate-float-reverse cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                      : "bg-white border-slate-100 hover:bg-slate-50"
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
                  className={`absolute bottom-8 -left-8 rounded-xl p-3 shadow-lg border animate-float-slow cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                      : "bg-white border-slate-100 hover:bg-slate-50"
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
    </>
  );
};
export default HeroSection;
