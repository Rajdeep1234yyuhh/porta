/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import {
  ExternalLink,
  GitBranch,
  ArrowRight,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Project } from "../data/projects";

interface ProjectSectionProps {
  isDarkMode: boolean;
  projects: Project[];
}

const getYoutubeVideoId = (url: string): string | null => {
  const regexes = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
  ];
  for (const regex of regexes) {
    const match = url.match(regex);
    if (match) return match[1];
  }
  return null;
};

type AccentStyle = "tech" | "shopify";

interface CarouselProps {
  isDarkMode: boolean;
  projects: Project[];
  desktopPerView: number;
  accent: AccentStyle;
  label: string;
  showHeader?: boolean;
}

const ProjectCarousel: React.FC<CarouselProps> = ({
  isDarkMode,
  projects,
  desktopPerView,
  accent,
  label,
  showHeader = true,
}) => {
  const [perView, setPerView] = useState(desktopPerView);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedDesc, setExpandedDesc] = useState<Set<number>>(new Set());
  const [expandedTech, setExpandedTech] = useState<Set<number>>(new Set());

  useEffect(() => {
    const update = () =>
      setPerView(window.innerWidth >= 768 ? desktopPerView : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [desktopPerView]);

  const maxIndex = Math.max(0, projects.length - perView);

  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = useCallback(() => setCurrentIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setCurrentIndex((i) => Math.min(maxIndex, i + 1)),
    [maxIndex],
  );

  const toggleDesc = (i: number) =>
    setExpandedDesc((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  const toggleTech = (i: number) =>
    setExpandedTech((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });

  const cardWidth = 100 / perView;
  const isTech = accent === "tech";

  // Panel chrome
  const panelBg    = isDarkMode ? "bg-[#1a1a1a]"           : "bg-white";
  const panelBorder= isDarkMode ? "border-white/[0.08]"     : "border-slate-200";
  const headerBorder=isDarkMode ? "border-white/[0.06]"     : "border-slate-100";
  const accentDot  = isTech     ? "bg-purple-500"           : "bg-emerald-500";
  const countBadge = isTech
    ? isDarkMode ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                 : "bg-purple-100 text-purple-600 border-purple-200"
    : isDarkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                 : "bg-emerald-100 text-emerald-700 border-emerald-200";

  // Card chrome
  const arrowGrad  = isTech ? "from-blue-600 to-purple-600" : "from-emerald-500 to-teal-600";
  const dotActive  = isTech ? "from-blue-600 to-purple-600" : "from-emerald-500 to-teal-600";
  const tagCls     = isTech
    ? isDarkMode ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
                 : "bg-blue-50 text-blue-700 border-blue-200"
    : isDarkMode ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                 : "bg-emerald-50 text-emerald-700 border-emerald-200";
  const demoCls    = isTech
    ? isDarkMode ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"
    : isDarkMode ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-700";
  const cardBorder = isTech
    ? isDarkMode ? "hover:border-purple-500/40" : "hover:border-purple-300"
    : isDarkMode ? "hover:border-emerald-500/40" : "hover:border-emerald-300";
  const shadowColor= isTech
    ? isDarkMode ? "rgba(168,85,247,0.22)" : "rgba(168,85,247,0.12)"
    : isDarkMode ? "rgba(16,185,129,0.22)" : "rgba(16,185,129,0.12)";

  return (
    <div className={`flex flex-col rounded-2xl border overflow-hidden ${panelBg} ${panelBorder}`}>

      {/* ── Panel header ── */}
      {showHeader && (
        <div className={`flex items-center justify-between px-4 py-3 border-b ${headerBorder}`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full shrink-0 ${accentDot}`} />
            <span className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              {label}
            </span>
          </div>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${countBadge}`}>
            {projects.length} projects
          </span>
        </div>
      )}

      {/* ── Carousel body ── */}
      <div className="flex flex-col gap-2 p-3">

        {/* Sliding track */}
        <div className="relative">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 bg-gradient-to-br ${arrowGrad} text-white ${
              currentIndex === 0 ? "opacity-25 cursor-not-allowed" : "hover:scale-110 cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="overflow-hidden mx-8">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * cardWidth}%)` }}
            >
              {projects.map((project, index) => {
                const isDescExpanded = expandedDesc.has(index);
                const isTechExpanded = expandedTech.has(index);
                const displayTech = isTechExpanded ? project.tech : project.tech.slice(0, 4);
                const desc = project.description;
                const shortDesc = desc.slice(0, 110);
                const needsMore = desc.length > 110;
                const ytId =
                  project.mediaType === "video" && project.video
                    ? getYoutubeVideoId(project.video)
                    : null;

                return (
                  <div
                    key={project.id}
                    className="shrink-0 px-1.5"
                    style={{ width: `${cardWidth}%` }}
                  >
                    <div
                      className={`flex flex-col rounded-xl border overflow-hidden transition-colors duration-200 ${
                        isDarkMode
                          ? `bg-[#222] border-[#2e2e2e] ${cardBorder}`
                          : `bg-slate-50 border-slate-200 ${cardBorder}`
                      }`}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          `0 8px 32px -4px ${shadowColor}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "";
                      }}
                    >
                      {/* Media */}
                      {((project.mediaType === "video" && project.video) || project.image) && (
                        <div className="relative w-full h-48 overflow-hidden shrink-0">
                          {ytId ? (
                            <iframe
                              className="w-full h-full"
                              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0${project.videoStartTime ? `&start=${project.videoStartTime}` : ""}`}
                              allow="autoplay; encrypted-media"
                              style={{ border: "none" }}
                            />
                          ) : project.mediaType === "video" && project.video ? (
                            <video
                              className="w-full h-full object-cover"
                              muted loop autoPlay playsInline
                              poster={project.image}
                            >
                              <source src={project.video} type="video/mp4" />
                              <source src={project.video} type="video/webm" />
                            </video>
                          ) : (
                            <Image
                              src={project.image!}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex flex-col p-2.5 gap-2">
                        {/* Title */}
                        <h3 className={`text-xs font-bold leading-snug ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className={`text-[10px] leading-relaxed ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                          {isDescExpanded ? desc : needsMore ? shortDesc + "…" : desc}
                          {needsMore && (
                            <button
                              onClick={() => toggleDesc(index)}
                              className={`ml-1 font-medium ${demoCls}`}
                            >
                              {isDescExpanded ? " less" : <MoreHorizontal className="w-3 h-3 inline" />}
                            </button>
                          )}
                        </p>

                        {/* Tech tags */}
                        <div className={`flex flex-wrap gap-1 pt-1.5 border-t ${isDarkMode ? "border-white/[0.05]" : "border-slate-100"}`}>
                          {displayTech.map((tech) => (
                            <span key={tech} className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${tagCls}`}>
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <button
                              onClick={() => toggleTech(index)}
                              className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${
                                isTechExpanded
                                  ? isDarkMode ? "bg-red-500/15 text-red-400 border-red-500/25" : "bg-red-50 text-red-700 border-red-200"
                                  : isDarkMode ? "bg-[#2a2a2a] text-gray-400 border-[#333]" : "bg-gray-100 text-gray-600 border-gray-200"
                              }`}
                            >
                              {isTechExpanded ? "less" : `+${project.tech.length - 4}`}
                            </button>
                          )}
                        </div>

                        {/* Links */}
                        <div className={`flex gap-2.5 pt-1.5 border-t ${isDarkMode ? "border-white/[0.05]" : "border-slate-100"}`}>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1 text-[10px] font-medium ${demoCls}`}
                          >
                            <ExternalLink className="w-2.5 h-2.5" /> Live Demo
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1 text-[10px] font-medium ${isDarkMode ? "text-gray-500 hover:text-white" : "text-slate-400 hover:text-slate-800"}`}
                          >
                            <GitBranch className="w-2.5 h-2.5" /> Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 bg-gradient-to-br ${arrowGrad} text-white ${
              currentIndex >= maxIndex ? "opacity-25 cursor-not-allowed" : "hover:scale-110 cursor-pointer"
            }`}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dots */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? `w-4 h-1.5 bg-gradient-to-r ${dotActive}`
                    : `w-1.5 h-1.5 ${isDarkMode ? "bg-[#333] hover:bg-[#444]" : "bg-slate-300 hover:bg-slate-400"}`
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectSection: React.FC<ProjectSectionProps> = ({ isDarkMode, projects }) => {
  const [activeTab, setActiveTab] = useState<"tech" | "shopify">("tech");

  const aiProjects      = projects.filter((p) => !p.categories.includes("Shopify"));
  const shopifyProjects = projects.filter((p) =>  p.categories.includes("Shopify"));

  const tabBase = `flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200`;
  const tabActive = isDarkMode
    ? "bg-[#2a2a2a] text-white shadow-md"
    : "bg-white text-slate-900 shadow-md";
  const tabInactive = isDarkMode
    ? "text-gray-500 hover:text-gray-300"
    : "text-slate-400 hover:text-slate-700";
  const countActive = (accent: AccentStyle) => accent === "tech"
    ? isDarkMode ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-purple-100 text-purple-600 border-purple-200"
    : isDarkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-100 text-emerald-700 border-emerald-200";

  return (
    <section
      id="projects"
      className={`h-full flex flex-col overflow-hidden relative ${isDarkMode ? "bg-[#141414]" : "bg-slate-50"}`}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${isDarkMode ? "bg-purple-500" : "bg-purple-200"}`} />
        <div className={`absolute -bottom-10 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${isDarkMode ? "bg-emerald-500" : "bg-emerald-200"}`} />
      </div>

      <div className="flex flex-col flex-1 min-h-0 w-full px-3 sm:px-5 relative z-10 pt-5 pb-4 gap-4">

        {/* Section header */}
        <div className="flex items-end justify-between shrink-0">
          <div>
            <span className={`text-[10px] font-semibold tracking-widest uppercase ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
              Portfolio
            </span>
            <h2 className={`text-lg font-bold leading-tight mt-0.5 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
          </div>
          <Link href="/projects">
            <button className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md transition-all duration-200">
              View All <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
        </div>

        {/* ── Mobile: tab switcher + single panel ── */}
        <div className="flex flex-col gap-3 lg:hidden">
          {/* Tabs */}
          <div className={`flex gap-1.5 p-1.5 rounded-2xl border ${isDarkMode ? "bg-white/[0.04] border-white/[0.07]" : "bg-slate-100 border-slate-200"}`}>
            <button
              onClick={() => setActiveTab("tech")}
              className={`${tabBase} ${activeTab === "tech" ? tabActive : tabInactive}`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
              AI / ML &amp; Software
              <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full border ${activeTab === "tech" ? countActive("tech") : isDarkMode ? "border-white/10 text-gray-500" : "border-slate-200 text-slate-400"}`}>
                {aiProjects.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("shopify")}
              className={`${tabBase} ${activeTab === "shopify" ? tabActive : tabInactive}`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              Shopify Stores
              <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full border ${activeTab === "shopify" ? countActive("shopify") : isDarkMode ? "border-white/10 text-gray-500" : "border-slate-200 text-slate-400"}`}>
                {shopifyProjects.length}
              </span>
            </button>
          </div>

          {/* Active panel */}
          {activeTab === "tech" ? (
            <ProjectCarousel
              isDarkMode={isDarkMode}
              projects={aiProjects}
              desktopPerView={1}
              accent="tech"
              label="AI / ML & Software"
              showHeader={false}
            />
          ) : (
            <ProjectCarousel
              isDarkMode={isDarkMode}
              projects={shopifyProjects}
              desktopPerView={1}
              accent="shopify"
              label="Shopify Stores"
              showHeader={false}
            />
          )}
        </div>

        {/* ── Desktop: two panels side by side ── */}
        <div className="hidden lg:flex flex-row gap-4 items-start">
          <div className="flex-[2] min-w-0">
            <ProjectCarousel
              isDarkMode={isDarkMode}
              projects={aiProjects}
              desktopPerView={2}
              accent="tech"
              label="AI / ML & Software"
            />
          </div>
          <div className="flex-[1] min-w-0">
            <ProjectCarousel
              isDarkMode={isDarkMode}
              projects={shopifyProjects}
              desktopPerView={1}
              accent="shopify"
              label="Shopify Stores"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectSection;
