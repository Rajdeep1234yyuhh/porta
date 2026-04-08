"use client";

import {
  SiNextdotjs,
  SiReact,
  SiShopify,
  SiTailwindcss,
  SiPython,
  SiNodedotjs,
  SiWordpress,
  SiJavascript,
  SiExpress,
  SiMui,
  SiFirebase,
  SiMongodb,
  SiOpenai,
  SiHtml5,
  SiHuggingface,
  SiPhp,
  SiFigma,
} from "react-icons/si";
import { MdDesignServices, MdWeb } from "react-icons/md";

interface Skill {
  name: string;
  level: number;
  color: string;
  bg: string;
  lightBg?: string;
  lightColor?: string;
}

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; color?: string }>
> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  Shopify: SiShopify,
  "Tailwind CSS": SiTailwindcss,
  Python: SiPython,
  "Node.js": SiNodedotjs,
};

interface SkillsSectionProps {
  isDarkMode: boolean;
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  isDarkMode,
  skills,
}) => {
  return (
    <section
      id="skills"
      className={`h-full py-12 sm:py-16 relative overflow-y-auto ${
        isDarkMode ? "bg-gray-900" : "bg-slate-50"
      }`}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-200"
          }`}
        ></div>
        <div
          className={`absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-200"
          }`}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mt-10 mb-12">
          <div className="inline-block mb-4">
            <span
              className={`text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full ${
                isDarkMode
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "bg-blue-100 text-blue-600 border border-blue-200"
              }`}
            >
              Tech Stack
            </span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Technologies &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
        </div>

        {/* Main Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12">
          {skills.map((skill) => {
            const Icon = ICON_MAP[skill.name];
            return (
              <div
                key={skill.name}
                className={`group relative p-6 rounded-2xl cursor-pointer border overflow-hidden
                  transition-all duration-500 ease-out hover:-translate-y-2
                  ${
                    isDarkMode
                      ? "bg-gray-800/50 backdrop-blur-sm border-gray-700/50"
                      : "bg-white border-slate-200"
                  }`}
                style={{
                  ["--brand" as string]: skill.color,
                  transition:
                    "transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 20px 60px -10px ${skill.color}55`;
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${skill.color}66`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                }}
              >
                {/* Top brand color line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"
                  style={{ background: skill.color }}
                />

                {/* Shine sweep */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
                  }}
                />

                <div className="relative flex flex-col items-center text-center space-y-3">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: isDarkMode
                        ? skill.bg
                        : (skill.lightBg ?? skill.bg),
                    }}
                  >
                    {Icon && (
                      <Icon
                        size={32}
                        color={
                          isDarkMode
                            ? skill.color
                            : (skill.lightColor ?? skill.color)
                        }
                      />
                    )}
                  </div>

                  {/* Skill Name */}
                  <h3
                    className={`text-sm font-bold transition-all duration-300 group-hover:scale-105 ${
                      isDarkMode
                        ? "text-gray-200 group-hover:text-white"
                        : "text-slate-700 group-hover:text-slate-900"
                    }`}
                  >
                    {skill.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Tech Stack — Marquee */}
        <div>
          <h3
            className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            Additional Technologies
          </h3>

          {/* Fade edges */}
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <div className="flex animate-marquee w-max">
              {[
                {
                  name: "WordPress",
                  Icon: SiWordpress,
                  color: "#21759B",
                  bg: "#0d3349",
                  lightBg: "#e8f4fb",
                  lightColor: "#21759B",
                },
                {
                  name: "JavaScript",
                  Icon: SiJavascript,
                  color: "#F7DF1E",
                  bg: "#1a1a00",
                  lightBg: "#fefce8",
                  lightColor: "#a16207",
                },
                {
                  name: "Express",
                  Icon: SiExpress,
                  color: "#ffffff",
                  bg: "#1a1a1a",
                  lightBg: "#f1f1f1",
                  lightColor: "#333333",
                },
                {
                  name: "Node.js",
                  Icon: SiNodedotjs,
                  color: "#68A063",
                  bg: "#1a1a1a",
                  lightBg: "#edf5e8",
                  lightColor: "#166534",
                },
                {
                  name: "Tailwind",
                  Icon: SiTailwindcss,
                  color: "#38BDF8",
                  bg: "#0f172a",
                  lightBg: "#e0f4fe",
                  lightColor: "#0284c7",
                },
                {
                  name: "Material UI",
                  Icon: SiMui,
                  color: "#007FFF",
                  bg: "#0a1929",
                  lightBg: "#e8f3ff",
                  lightColor: "#0059b3",
                },
                {
                  name: "Firebase",
                  Icon: SiFirebase,
                  color: "#FFCA28",
                  bg: "#1a1200",
                  lightBg: "#fffbea",
                  lightColor: "#b45309",
                },
                {
                  name: "MongoDB",
                  Icon: SiMongodb,
                  color: "#47A248",
                  bg: "#0d1f0d",
                  lightBg: "#edf7ed",
                  lightColor: "#166534",
                },
                {
                  name: "OpenAI API",
                  Icon: SiOpenai,
                  color: "#ffffff",
                  bg: "#1a1a1a",
                  lightBg: "#f1f1f1",
                  lightColor: "#111111",
                },
                {
                  name: "LLaMA 2",
                  Icon: SiHuggingface,
                  color: "#FFD21E",
                  bg: "#1a1400",
                  lightBg: "#fffbea",
                  lightColor: "#92400e",
                },
                {
                  name: "BERT",
                  Icon: SiHuggingface,
                  color: "#FFD21E",
                  bg: "#1a1400",
                  lightBg: "#fffbea",
                  lightColor: "#92400e",
                },
                {
                  name: "MuRIL",
                  Icon: SiHuggingface,
                  color: "#FFD21E",
                  bg: "#1a1400",
                  lightBg: "#fffbea",
                  lightColor: "#92400e",
                },
                {
                  name: "HTML5",
                  Icon: SiHtml5,
                  color: "#E34F26",
                  bg: "#2a0e00",
                  lightBg: "#fef0eb",
                  lightColor: "#c2410c",
                },
                {
                  name: "Liquid",
                  Icon: SiShopify,
                  color: "#96BF48",
                  bg: "#1a2a0d",
                  lightBg: "#eef6e0",
                  lightColor: "#4a7a10",
                },
                {
                  name: "PHP",
                  Icon: SiPhp,
                  color: "#777BB4",
                  bg: "#1a1a2e",
                  lightBg: "#f0f0f9",
                  lightColor: "#4f46e5",
                },
                {
                  name: "React",
                  Icon: SiReact,
                  color: "#61DAFB",
                  bg: "#20232a",
                  lightBg: "#e0f8fe",
                  lightColor: "#0891b2",
                },
                {
                  name: "Software Design",
                  Icon: MdDesignServices,
                  color: "#a78bfa",
                  bg: "#1e1030",
                  lightBg: "#f5f0ff",
                  lightColor: "#7c3aed",
                },
                {
                  name: "Web Design",
                  Icon: MdWeb,
                  color: "#34d399",
                  bg: "#0d1f18",
                  lightBg: "#ecfdf5",
                  lightColor: "#059669",
                },
                {
                  name: "Figma",
                  Icon: SiFigma,
                  color: "#F24E1E",
                  bg: "#2a0a00",
                  lightBg: "#fef0eb",
                  lightColor: "#c2410c",
                },
                // duplicate for seamless loop
                {
                  name: "WordPress",
                  Icon: SiWordpress,
                  color: "#21759B",
                  bg: "#0d3349",
                  lightBg: "#e8f4fb",
                  lightColor: "#21759B",
                },
                {
                  name: "JavaScript",
                  Icon: SiJavascript,
                  color: "#F7DF1E",
                  bg: "#1a1a00",
                  lightBg: "#fefce8",
                  lightColor: "#a16207",
                },
                {
                  name: "Express",
                  Icon: SiExpress,
                  color: "#ffffff",
                  bg: "#1a1a1a",
                  lightBg: "#f1f1f1",
                  lightColor: "#333333",
                },
                {
                  name: "Node.js",
                  Icon: SiNodedotjs,
                  color: "#68A063",
                  bg: "#1a1a1a",
                  lightBg: "#edf5e8",
                  lightColor: "#166534",
                },
                {
                  name: "Tailwind",
                  Icon: SiTailwindcss,
                  color: "#38BDF8",
                  bg: "#0f172a",
                  lightBg: "#e0f4fe",
                  lightColor: "#0284c7",
                },
                {
                  name: "Material UI",
                  Icon: SiMui,
                  color: "#007FFF",
                  bg: "#0a1929",
                  lightBg: "#e8f3ff",
                  lightColor: "#0059b3",
                },
                {
                  name: "Firebase",
                  Icon: SiFirebase,
                  color: "#FFCA28",
                  bg: "#1a1200",
                  lightBg: "#fffbea",
                  lightColor: "#b45309",
                },
                {
                  name: "MongoDB",
                  Icon: SiMongodb,
                  color: "#47A248",
                  bg: "#0d1f0d",
                  lightBg: "#edf7ed",
                  lightColor: "#166534",
                },
                {
                  name: "OpenAI API",
                  Icon: SiOpenai,
                  color: "#ffffff",
                  bg: "#1a1a1a",
                  lightBg: "#f1f1f1",
                  lightColor: "#111111",
                },
                {
                  name: "LLaMA 2",
                  Icon: SiHuggingface,
                  color: "#FFD21E",
                  bg: "#1a1400",
                  lightBg: "#fffbea",
                  lightColor: "#92400e",
                },
                {
                  name: "BERT",
                  Icon: SiHuggingface,
                  color: "#FFD21E",
                  bg: "#1a1400",
                  lightBg: "#fffbea",
                  lightColor: "#92400e",
                },
                {
                  name: "MuRIL",
                  Icon: SiHuggingface,
                  color: "#FFD21E",
                  bg: "#1a1400",
                  lightBg: "#fffbea",
                  lightColor: "#92400e",
                },
                {
                  name: "HTML5",
                  Icon: SiHtml5,
                  color: "#E34F26",
                  bg: "#2a0e00",
                  lightBg: "#fef0eb",
                  lightColor: "#c2410c",
                },
                {
                  name: "Liquid",
                  Icon: SiShopify,
                  color: "#96BF48",
                  bg: "#1a2a0d",
                  lightBg: "#eef6e0",
                  lightColor: "#4a7a10",
                },
                {
                  name: "PHP",
                  Icon: SiPhp,
                  color: "#777BB4",
                  bg: "#1a1a2e",
                  lightBg: "#f0f0f9",
                  lightColor: "#4f46e5",
                },
                {
                  name: "React",
                  Icon: SiReact,
                  color: "#61DAFB",
                  bg: "#20232a",
                  lightBg: "#e0f8fe",
                  lightColor: "#0891b2",
                },
                {
                  name: "Software Design",
                  Icon: MdDesignServices,
                  color: "#a78bfa",
                  bg: "#1e1030",
                  lightBg: "#f5f0ff",
                  lightColor: "#7c3aed",
                },
                {
                  name: "Web Design",
                  Icon: MdWeb,
                  color: "#34d399",
                  bg: "#0d1f18",
                  lightBg: "#ecfdf5",
                  lightColor: "#059669",
                },
                {
                  name: "Figma",
                  Icon: SiFigma,
                  color: "#F24E1E",
                  bg: "#2a0a00",
                  lightBg: "#fef0eb",
                  lightColor: "#c2410c",
                },
              ].map((tech, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 mx-4 group cursor-default"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{
                      background: isDarkMode ? tech.bg : tech.lightBg,
                      boxShadow: `0 0 0 1px ${isDarkMode ? tech.color : tech.lightColor}22`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        `0 8px 25px -4px ${isDarkMode ? tech.color : tech.lightColor}66`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        `0 0 0 1px ${isDarkMode ? tech.color : tech.lightColor}22`;
                    }}
                  >
                    <tech.Icon
                      size={28}
                      color={isDarkMode ? tech.color : tech.lightColor}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                      isDarkMode
                        ? "text-gray-500 group-hover:text-gray-300"
                        : "text-slate-400 group-hover:text-slate-700"
                    }`}
                  >
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
