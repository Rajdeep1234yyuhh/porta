"use client";

import React from "react";
import { ExternalLink, Mail, Phone } from "lucide-react";

const PHONE = "8638752315";

interface HeroSectionProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ isDarkMode, scrollToSection }: HeroSectionProps) => {
  const [projectCount, setProjectCount] = React.useState(0);
  const [yearsCount, setYearsCount] = React.useState(0);
  const [satisfactionCount, setSatisfactionCount] = React.useState(0);
  const [contactOpen, setContactOpen] = React.useState(false);
  const contactRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

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
        className={`pt-20 pb-8 relative overflow-hidden ${
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
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
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

                <div className="relative" ref={contactRef}>
                  {/* Pop-out options */}
                  {contactOpen && (
                    <div className="absolute bottom-full mb-3 left-0 flex flex-col gap-2">
                      <a
                        href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20would%20like%20to%20get%20in%20touch%21`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ animation: "popUpFromButton 0.32s cubic-bezier(0.34,1.56,0.64,1) both", animationDelay: "60ms" }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm text-white bg-[#25D366] hover:bg-[#1ebe5d] shadow-md transition-colors duration-200 whitespace-nowrap"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </a>
                      <a
                        href={`tel:+91${PHONE}`}
                        style={{ animation: "popUpFromButton 0.32s cubic-bezier(0.34,1.56,0.64,1) both", animationDelay: "0ms" }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm shadow-md transition-colors duration-200 whitespace-nowrap ${
                          isDarkMode
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : "bg-white text-slate-800 hover:bg-slate-50 border border-slate-200"
                        }`}
                      >
                        <Phone className="w-4 h-4 text-blue-500" />
                        Call Me
                      </a>
                    </div>
                  )}
                  <button
                    onClick={() => setContactOpen((o) => !o)}
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
            </div>

            {/* Right Content - Professional Photo + Floating Tech Cards */}
            <div className="flex justify-center items-center order-first md:order-none pt-8 pb-4 px-10 sm:px-12 md:p-0">
              <div className="relative">
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
                      className="w-52 h-60 sm:w-64 sm:h-72 md:w-72 md:h-80 object-cover rounded-2xl"
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
