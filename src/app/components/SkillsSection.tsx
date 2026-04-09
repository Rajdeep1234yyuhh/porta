"use client";

import {
  SiNextdotjs, SiReact, SiShopify, SiTailwindcss, SiPython, SiNodedotjs,
  SiWordpress, SiJavascript, SiExpress, SiMui, SiFirebase, SiMongodb,
  SiOpenai, SiHtml5, SiHuggingface, SiPhp, SiFigma,
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

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
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

const EXTRA_TECH = [
  { name: "WordPress", Icon: SiWordpress, color: "#21759B", bg: "#0d3349", lightBg: "#e8f4fb", lightColor: "#21759B" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", bg: "#1a1a00", lightBg: "#fefce8", lightColor: "#a16207" },
  { name: "Express", Icon: SiExpress, color: "#ffffff", bg: "#1a1a1a", lightBg: "#f1f1f1", lightColor: "#333333" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#68A063", bg: "#1a1a1a", lightBg: "#edf5e8", lightColor: "#166534" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8", bg: "#0f172a", lightBg: "#e0f4fe", lightColor: "#0284c7" },
  { name: "Material UI", Icon: SiMui, color: "#007FFF", bg: "#0a1929", lightBg: "#e8f3ff", lightColor: "#0059b3" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28", bg: "#1a1200", lightBg: "#fffbea", lightColor: "#b45309" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248", bg: "#0d1f0d", lightBg: "#edf7ed", lightColor: "#166534" },
  { name: "OpenAI API", Icon: SiOpenai, color: "#ffffff", bg: "#1a1a1a", lightBg: "#f1f1f1", lightColor: "#111111" },
  { name: "LLaMA 2", Icon: SiHuggingface, color: "#FFD21E", bg: "#1a1400", lightBg: "#fffbea", lightColor: "#92400e" },
  { name: "BERT", Icon: SiHuggingface, color: "#FFD21E", bg: "#1a1400", lightBg: "#fffbea", lightColor: "#92400e" },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26", bg: "#2a0e00", lightBg: "#fef0eb", lightColor: "#c2410c" },
  { name: "Liquid", Icon: SiShopify, color: "#96BF48", bg: "#1a2a0d", lightBg: "#eef6e0", lightColor: "#4a7a10" },
  { name: "PHP", Icon: SiPhp, color: "#777BB4", bg: "#1a1a2e", lightBg: "#f0f0f9", lightColor: "#4f46e5" },
  { name: "React", Icon: SiReact, color: "#61DAFB", bg: "#20232a", lightBg: "#e0f8fe", lightColor: "#0891b2" },
  { name: "Software Design", Icon: MdDesignServices, color: "#a78bfa", bg: "#1e1030", lightBg: "#f5f0ff", lightColor: "#7c3aed" },
  { name: "Web Design", Icon: MdWeb, color: "#34d399", bg: "#0d1f18", lightBg: "#ecfdf5", lightColor: "#059669" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E", bg: "#2a0a00", lightBg: "#fef0eb", lightColor: "#c2410c" },
];
// duplicate for seamless marquee loop
const MARQUEE_ITEMS = [...EXTRA_TECH, ...EXTRA_TECH];

const SkillsSection: React.FC<SkillsSectionProps> = ({ isDarkMode, skills }) => {
  return (
    <section
      id="skills"
      className={`h-full flex flex-col overflow-hidden relative ${isDarkMode ? "bg-gray-900" : "bg-slate-50"}`}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 -right-20 w-72 h-72 rounded-full blur-3xl opacity-15 ${isDarkMode ? "bg-blue-500" : "bg-blue-200"}`} />
        <div className={`absolute -bottom-10 -left-20 w-72 h-72 rounded-full blur-3xl opacity-15 ${isDarkMode ? "bg-purple-500" : "bg-purple-200"}`} />
      </div>

      <div className="flex flex-col flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-5">
        {/* Header */}
        <div className="text-center mb-4 shrink-0">
          <span className={`inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-2 ${isDarkMode ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-blue-100 text-blue-600 border border-blue-200"}`}>
            Tech Stack
          </span>
          <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            Technologies &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
          </h2>
        </div>

        {/* Main Skills Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4 shrink-0">
          {skills.map((skill) => {
            const Icon = ICON_MAP[skill.name];
            return (
              <div
                key={skill.name}
                className={`group relative p-3 rounded-xl cursor-pointer border overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1 ${isDarkMode ? "bg-gray-800/50 backdrop-blur-sm border-gray-700/50" : "bg-white border-slate-200"}`}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px -8px ${skill.color}55`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${skill.color}66`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" style={{ background: skill.color }} />
                <div className="relative flex flex-col items-center text-center gap-2">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: isDarkMode ? skill.bg : (skill.lightBg ?? skill.bg) }}
                  >
                    {Icon && <Icon size={22} color={isDarkMode ? skill.color : (skill.lightColor ?? skill.color)} />}
                  </div>
                  <h3 className={`text-xs font-bold ${isDarkMode ? "text-gray-200 group-hover:text-white" : "text-slate-700 group-hover:text-slate-900"}`}>
                    {skill.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Marquee */}
        <div className="shrink-0">
          <h3 className={`text-xs font-semibold uppercase tracking-wider text-center mb-2 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>
            Also familiar with
          </h3>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            <div className="flex animate-marquee w-max">
              {MARQUEE_ITEMS.map((tech, i) => (
                <div key={i} className="flex flex-col items-center gap-1 mx-3 group cursor-default">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
                    style={{
                      background: isDarkMode ? tech.bg : tech.lightBg,
                      boxShadow: `0 0 0 1px ${isDarkMode ? tech.color : tech.lightColor}22`,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px -3px ${isDarkMode ? tech.color : tech.lightColor}66`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${isDarkMode ? tech.color : tech.lightColor}22`; }}
                  >
                    <tech.Icon size={20} color={isDarkMode ? tech.color : tech.lightColor} />
                  </div>
                  <span className={`text-[9px] font-medium whitespace-nowrap ${isDarkMode ? "text-gray-500 group-hover:text-gray-300" : "text-slate-400 group-hover:text-slate-600"}`}>
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
