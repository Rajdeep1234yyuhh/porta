"use client";

import React from "react";
import { ExternalLink, Mail, Phone, FileText, Braces } from "lucide-react";
import {
  SiNextdotjs, SiShopify, SiPython, SiTypescript, SiOpenai,
  SiReact, SiTailwindcss, SiNodedotjs, SiFirebase, SiMongodb, SiWordpress,
  SiJavascript, SiExpress, SiMui, SiHuggingface, SiHtml5, SiPhp, SiFigma,
} from "react-icons/si";
import { MdDesignServices, MdWeb } from "react-icons/md";

const PHONE = "8638752315";

interface HeroSectionProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MAIN_STACK: Array<{ name: string; Icon: any; color: string; bg: string; lightBg: string; lightColor: string }> = [
  { name: "Next.js",    Icon: SiNextdotjs,  color: "#ffffff", bg: "#000000", lightBg: "#f0f0f0", lightColor: "#111111" },
  { name: "TypeScript", Icon: SiTypescript, color: "#ffffff", bg: "#3178C6", lightBg: "#dbeafe", lightColor: "#1d4ed8" },
  { name: "AI / ML",   Icon: SiOpenai,     color: "#ffffff", bg: "#1a1a1a", lightBg: "#f0f0f0", lightColor: "#111111" },
  { name: "Python",     Icon: SiPython,     color: "#FFD343", bg: "#1e3a5f", lightBg: "#fef9e7", lightColor: "#b45309" },
  { name: "Shopify",    Icon: SiShopify,    color: "#96BF48", bg: "#1a2a0a", lightBg: "#eef6e0", lightColor: "#4a7a10" },
  { name: "Liquid",     Icon: Braces,       color: "#38BDF8", bg: "#0f172a", lightBg: "#e0f4fe", lightColor: "#0284c7" },
];

const MINOR_STACK = [
  { name: "React",           Icon: SiReact,          color: "#61DAFB", bg: "#20232a", lightBg: "#e0f8fe", lightColor: "#0891b2" },
  { name: "JavaScript",      Icon: SiJavascript,     color: "#F7DF1E", bg: "#1a1a00", lightBg: "#fefce8", lightColor: "#a16207" },
  { name: "Node.js",         Icon: SiNodedotjs,      color: "#68A063", bg: "#1a1a1a", lightBg: "#edf5e8", lightColor: "#166534" },
  { name: "Express",         Icon: SiExpress,        color: "#ffffff", bg: "#1a1a1a", lightBg: "#f1f1f1", lightColor: "#333333" },
  { name: "Tailwind CSS",    Icon: SiTailwindcss,    color: "#38BDF8", bg: "#0f172a", lightBg: "#e0f4fe", lightColor: "#0284c7" },
  { name: "Material UI",     Icon: SiMui,            color: "#007FFF", bg: "#0a1929", lightBg: "#e8f3ff", lightColor: "#0059b3" },
  { name: "Firebase",        Icon: SiFirebase,       color: "#FFCA28", bg: "#1a1200", lightBg: "#fffbea", lightColor: "#b45309" },
  { name: "MongoDB",         Icon: SiMongodb,        color: "#47A248", bg: "#0d1f0d", lightBg: "#edf7ed", lightColor: "#166534" },
  { name: "OpenAI API",      Icon: SiOpenai,         color: "#ffffff", bg: "#1a1a1a", lightBg: "#f1f1f1", lightColor: "#111111" },
  { name: "LLaMA 2",         Icon: SiHuggingface,    color: "#FFD21E", bg: "#1a1400", lightBg: "#fffbea", lightColor: "#92400e" },
  { name: "BERT",            Icon: SiHuggingface,    color: "#FFD21E", bg: "#1a1400", lightBg: "#fffbea", lightColor: "#92400e" },
  { name: "MuRIL",           Icon: SiHuggingface,    color: "#FFD21E", bg: "#1a1400", lightBg: "#fffbea", lightColor: "#92400e" },
  { name: "HTML5",           Icon: SiHtml5,          color: "#E34F26", bg: "#2a0e00", lightBg: "#fef0eb", lightColor: "#c2410c" },
  { name: "PHP",             Icon: SiPhp,            color: "#777BB4", bg: "#1a1a2e", lightBg: "#f0f0f9", lightColor: "#4f46e5" },
  { name: "WordPress",       Icon: SiWordpress,      color: "#21759B", bg: "#0d3349", lightBg: "#e8f4fb", lightColor: "#21759B" },
  { name: "Figma",           Icon: SiFigma,          color: "#F24E1E", bg: "#2a0a00", lightBg: "#fef0eb", lightColor: "#c2410c" },
  { name: "Web Design",      Icon: MdWeb,            color: "#34d399", bg: "#0d1f18", lightBg: "#ecfdf5", lightColor: "#059669" },
  { name: "Software Design", Icon: MdDesignServices, color: "#a78bfa", bg: "#1e1030", lightBg: "#f5f0ff", lightColor: "#7c3aed" },
];

const HeroSection = ({ isDarkMode, scrollToSection }: HeroSectionProps) => {
  const [projectCount, setProjectCount] = React.useState(0);
  const [yearsCount, setYearsCount] = React.useState(0);
  const [clientCount, setClientCount] = React.useState(0);
  const [contactOpen, setContactOpen] = React.useState(false);
  const contactRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) setContactOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  React.useEffect(() => {
    const pi = setInterval(() => setProjectCount((p) => { if (p >= 25) { clearInterval(pi); return 25; } return p + 1; }), 30);
    const yi = setInterval(() => setYearsCount((p) => { if (p >= 5) { clearInterval(yi); return 5; } return p + 1; }), 300);
    const ci = setInterval(() => setClientCount((p) => { if (p >= 30) { clearInterval(ci); return 30; } return p + 1; }), 40);
    return () => { clearInterval(pi); clearInterval(yi); clearInterval(ci); };
  }, []);

  /* ── Shared UI fragments ── */
  const techStack = (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className={`h-px flex-1 ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`} />
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? "text-gray-600" : "text-slate-400"}`}>Core Stack</span>
        <div className={`h-px flex-1 ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`} />
      </div>
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {MAIN_STACK.map((tech) => (
          <div key={tech.name}
            className="relative group w-10 h-10 rounded-xl flex items-center justify-center cursor-default transition-transform duration-150 hover:scale-110"
            style={{ background: isDarkMode ? tech.bg : tech.lightBg }}>
            <tech.Icon size={20} color={isDarkMode ? tech.color : tech.lightColor} />
            <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-900 text-white shadow opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
      <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
        <div className="flex animate-marquee w-max">
          {[...MAIN_STACK, ...MINOR_STACK, ...MAIN_STACK, ...MINOR_STACK].map((tech, i) => (
            <div key={i} className="flex items-center gap-1.5 mx-2.5 cursor-default shrink-0">
              <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ background: isDarkMode ? tech.bg : tech.lightBg }}>
                <tech.Icon size={11} color={isDarkMode ? tech.color : tech.lightColor} />
              </div>
              <span className={`text-[10px] font-medium whitespace-nowrap ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const contactDropdown = (
    <div className="relative" ref={contactRef}>
      {contactOpen && (
        <div className="absolute bottom-full mb-2 left-0 flex flex-col gap-1.5 z-50">
          <a href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20would%20like%20to%20get%20in%20touch%21`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-md font-medium text-xs text-white bg-[#25D366] hover:bg-[#1ebe5d] shadow-md whitespace-nowrap">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            WhatsApp
          </a>
          <a href={`tel:+91${PHONE}`}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md font-medium text-xs shadow-md whitespace-nowrap ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-slate-800 border border-slate-200"}`}>
            <Phone className="w-3.5 h-3.5 text-blue-500" /> Call Me
          </a>
        </div>
      )}
      <button onClick={() => setContactOpen((o) => !o)}
        className={`group px-3.5 py-1.5 rounded-md transition-all duration-200 font-medium border-2 flex items-center gap-1.5 text-sm ${isDarkMode ? "border-purple-500/50 text-purple-300 hover:bg-purple-500/10" : "border-purple-600/30 text-purple-700 hover:bg-purple-50"}`}>
        Get In Touch <Mail className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );

  return (
    <>
      <style jsx>{`
        @keyframes float { 0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-7px) rotate(-3deg)} }
        @keyframes float-reverse { 0%,100%{transform:translateY(0) rotate(2deg)}50%{transform:translateY(-9px) rotate(2deg)} }
        @keyframes float-slow { 0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-5px) rotate(-2deg)} }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }
        .shimmer-text {
          background: linear-gradient(90deg,#2563eb 0%,#7c3aed 30%,#a78bfa 50%,#7c3aed 70%,#2563eb 100%);
          background-size:200% auto; background-clip:text; -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation:shimmer 4s linear infinite;
        }
@keyframes popUpFromButton { from{opacity:0;transform:translateY(8px) scale(0.92)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>

      <section
        id="about"
        className={`h-full flex flex-col overflow-hidden relative ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
      >
        {/* Background */}
        <div className={`absolute inset-0 ${isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-slate-50 to-blue-50"}`} />
        <div className={`absolute top-10 right-10 w-56 h-56 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`} />
        <div className={`absolute bottom-20 left-10 w-56 h-56 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-purple-500/20" : "bg-purple-100"}`} />

        {/* ── MOBILE layout (md:hidden) — safe flex-col, no centering that clips ── */}
        <div className="md:hidden flex-1 flex flex-col justify-center px-5 py-4 relative z-10 gap-3">

          {/* Photo with floating cards — give horizontal room via mx-12 */}
          <div className="flex justify-center">
            <div className="relative mx-12">
              <div className={`rounded-2xl p-2 shadow-xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                <img src="/DP.jpg" alt="Rajdeep" className="w-28 h-36 object-cover rounded-xl" />
              </div>
              <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold shadow flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Available
              </div>
              <div className={`absolute -top-3 -left-10 rounded-lg p-1.5 shadow-md border animate-float ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-100"}`}>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 bg-black rounded flex items-center justify-center"><SiNextdotjs size={10} color="#fff" /></div>
                  <span className={`text-[10px] font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Next.js</span>
                </div>
              </div>
              <div className={`absolute top-8 -right-10 rounded-lg p-1.5 shadow-md border animate-float-reverse ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-100"}`}>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 bg-[#96BF48] rounded flex items-center justify-center"><SiShopify size={10} color="#fff" /></div>
                  <span className={`text-[10px] font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Shopify</span>
                </div>
              </div>
              <div className={`absolute bottom-4 -left-10 rounded-lg p-1.5 shadow-md border animate-float-slow ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-100"}`}>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 bg-[#1e3a5f] rounded flex items-center justify-center"><SiPython size={10} color="#FFD343" /></div>
                  <span className={`text-[10px] font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>AI / ML</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text — centered */}
          <div className="text-center space-y-1.5">
            <p className={`text-[11px] font-semibold uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>Rajdeep Kotoky</p>
            <h1 className="font-bold leading-tight">
              <span className="shimmer-text text-2xl block">Full-Stack Developer</span>
              <span className={`text-lg font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>&amp; AI Engineer</span>
            </h1>
            <p className={`text-xs leading-relaxed px-2 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
              I build web apps and AI solutions — from Shopify stores to LLM-powered products. Clean code, fast delivery.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-7">
            {[
              { val: `${projectCount}+`, label: "Projects Delivered" },
              { val: `${yearsCount}+`, label: "Years Exp" },
              { val: `${clientCount}+`, label: "Happy Clients" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{val}</div>
                <div className={`text-[10px] ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>{label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => scrollToSection("projects")}
              className={`px-3.5 py-1.5 rounded-md font-medium flex items-center gap-1.5 text-sm active:scale-95 ${isDarkMode ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
              View My Work <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              className={`px-3.5 py-1.5 rounded-md font-medium border-2 flex items-center gap-1.5 text-sm ${isDarkMode ? "border-emerald-500/50 text-emerald-300" : "border-emerald-600/30 text-emerald-700"}`}>
              Resume <FileText className="w-3.5 h-3.5" />
            </a>
            {contactDropdown}
          </div>

          {/* Tech stack */}
          {techStack}
        </div>

        {/* ── DESKTOP layout (hidden md:flex) — safe, content won't overflow ── */}
        <div className="hidden md:flex flex-1 items-center relative z-10 overflow-hidden">
          <div className="max-w-6xl mx-auto px-8 lg:px-12 w-full">
            <div className="grid grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Left */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className={`text-xs font-semibold uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>Rajdeep Kotoky</p>
                  <h1 className="font-bold leading-tight">
                    <span className="shimmer-text text-4xl lg:text-5xl block">Full-Stack Developer</span>
                    <span className={`text-2xl lg:text-3xl font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>&amp; AI Engineer</span>
                  </h1>
                  <p className={`text-sm leading-relaxed max-w-lg ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                    I build production-ready web apps and AI solutions — Shopify stores, SaaS platforms, ML models, and LLM integrations. 5+ years turning ideas into shipped products.
                  </p>
                </div>

                <div className="flex items-center gap-8">
                  {[
                    { val: `${projectCount}+`, label: "Projects Delivered" },
                    { val: `${yearsCount}+`, label: "Years Exp" },
                    { val: `${clientCount}+`, label: "Happy Clients" },
                  ].map(({ val, label }) => (
                    <div key={label} className="text-center">
                      <div className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{val}</div>
                      <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>{label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button onClick={() => scrollToSection("projects")}
                    className={`group px-4 py-2 rounded-md font-medium flex items-center gap-2 text-sm active:scale-95 ${isDarkMode ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-800"}`}>
                    View My Work <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                    className={`group px-4 py-2 rounded-md font-medium border-2 flex items-center gap-2 text-sm ${isDarkMode ? "border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10" : "border-emerald-600/30 text-emerald-700 hover:bg-emerald-50"}`}>
                    Resume <FileText className="w-3.5 h-3.5 group-hover:-translate-y-px transition-transform" />
                  </a>
                  {contactDropdown}
                </div>

                {techStack}
              </div>

              {/* Right — Photo with floating cards */}
              <div className="flex justify-center items-center">
                <div className="relative">
                  <div className={`rounded-2xl p-3 shadow-2xl transition-all duration-500 hover:scale-[1.02] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                    <img src="/DP.jpg" alt="Professional Photo" className="w-44 h-56 lg:w-52 lg:h-64 object-cover rounded-xl" />
                  </div>
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Available
                  </div>
                  <div className={`absolute -top-5 -left-6 rounded-xl p-2.5 shadow-lg border animate-float cursor-pointer hover:scale-105 transition-all duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-100"}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center"><SiNextdotjs size={14} color="#ffffff" /></div>
                      <div>
                        <div className={`text-xs font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Next.js</div>
                        <div className={`text-[10px] ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>React Framework</div>
                      </div>
                    </div>
                  </div>
                  <div className={`absolute top-10 -right-8 rounded-xl p-2.5 shadow-lg border animate-float-reverse cursor-pointer hover:scale-105 transition-all duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-100"}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-[#96BF48] rounded-lg flex items-center justify-center"><SiShopify size={14} color="#ffffff" /></div>
                      <div>
                        <div className={`text-xs font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Shopify</div>
                        <div className={`text-[10px] ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>E-commerce</div>
                      </div>
                    </div>
                  </div>
                  <div className={`absolute bottom-6 -left-8 rounded-xl p-2.5 shadow-lg border animate-float-slow cursor-pointer hover:scale-105 transition-all duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-100"}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-[#1e3a5f] rounded-lg flex items-center justify-center"><SiPython size={14} color="#FFD343" /></div>
                      <div>
                        <div className={`text-xs font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>AI / ML</div>
                        <div className={`text-[10px] ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Python & Models</div>
                      </div>
                    </div>
                  </div>
                  <div className={`absolute inset-0 rounded-2xl blur-2xl -z-10 scale-95 opacity-30 ${isDarkMode ? "bg-blue-500" : "bg-blue-200"}`} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HeroSection;
