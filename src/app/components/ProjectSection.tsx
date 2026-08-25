/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import {
  ExternalLink, GitBranch, ArrowRight, MoreHorizontal,
  ChevronLeft, ChevronRight, X, Calendar, Play, Pause, BookOpen, FlaskConical,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSound } from "../context/SoundContext";
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

const YouTubeEmbed = ({ videoId, startTime }: { videoId: string; startTime?: number }) => {
  const { playClick } = useSound();
  const [playing, setPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    const func = playing ? "pauseVideo" : "playVideo";
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }), "*"
    );
    setPlaying(!playing);
  };

  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1&disablekb=1${startTime ? `&start=${startTime}` : ""}`;

  return (
    <>
      <iframe
        ref={iframeRef}
        className="absolute inset-0 w-full h-full"
        src={src}
        allow="autoplay; encrypted-media"
        style={{ border: "none", pointerEvents: "none" }}
        title="project video"
      />
      <button
        onClick={toggle}
        className="absolute inset-0 flex items-center justify-center group"
        style={{ background: "transparent" }}
      >
        <div className={`w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${playing ? "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100" : "opacity-100 scale-100"}`}>
          {playing
            ? <Pause className="w-4 h-4 text-white" />
            : <Play  className="w-4 h-4 text-white ml-0.5" />}
        </div>
      </button>
    </>
  );
};

type AccentStyle = "tech" | "shopify";

interface CarouselProps {
  isDarkMode: boolean;
  projects: Project[];
  desktopPerView: number;
  accent: AccentStyle;
  label: string;
  showHeader?: boolean;
  onCardClick?: (project: Project, el: HTMLElement) => void;
  onCaseStudy?: (project: Project) => void;
}

const PROJ_ANIM_MS = 900;

const ProjectCarousel: React.FC<CarouselProps> = ({
  isDarkMode, projects, desktopPerView, accent, label,
  showHeader = true, onCardClick, onCaseStudy,
}) => {
  const { playClick, playHover } = useSound();
  const [perView, setPerView]           = useState(desktopPerView);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedDesc, setExpandedDesc] = useState<Set<number>>(new Set());
  const [expandedTech, setExpandedTech] = useState<Set<number>>(new Set());

  useEffect(() => {
    const update = () => setPerView(window.innerWidth >= 768 ? desktopPerView : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [desktopPerView]);

  const maxIndex = Math.max(0, projects.length - perView);
  useEffect(() => { setCurrentIndex((i) => Math.min(i, maxIndex)); }, [maxIndex]);

  const prev = useCallback(() => setCurrentIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrentIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) dx > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const toggleDesc = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDesc((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };
  const toggleTech = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedTech((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };

  const cardWidth  = 100 / perView;
  const isTech     = accent === "tech";
  const panelBg    = isDarkMode ? "bg-[#1a1a1a]"       : "bg-white";
  const panelBorder= isDarkMode ? "border-white/[0.08]" : "border-slate-200";
  const headerBorder=isDarkMode ? "border-white/[0.06]" : "border-slate-100";
  const accentDot  = isTech    ? "bg-purple-500"        : "bg-emerald-500";
  const countBadge = isTech
    ? isDarkMode ? "bg-purple-500/10 text-purple-400 border-purple-500/20"    : "bg-purple-100 text-purple-600 border-purple-200"
    : isDarkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-100 text-emerald-700 border-emerald-200";
  const arrowGrad  = isTech ? "from-blue-600 to-purple-600"  : "from-emerald-500 to-teal-600";
  const dotActive  = isTech ? "from-blue-600 to-purple-600"  : "from-emerald-500 to-teal-600";
  const tagCls     = isTech
    ? isDarkMode ? "bg-blue-500/15 text-blue-400 border-blue-500/25"          : "bg-blue-50 text-blue-700 border-blue-200"
    : isDarkMode ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" : "bg-emerald-50 text-emerald-700 border-emerald-200";
  const demoCls    = isTech
    ? isDarkMode ? "text-purple-400 hover:text-purple-300"   : "text-purple-600 hover:text-purple-700"
    : isDarkMode ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-700";
  const cardBorder = isTech
    ? isDarkMode ? "hover:border-purple-500/40" : "hover:border-purple-300"
    : isDarkMode ? "hover:border-emerald-500/40": "hover:border-emerald-300";
  const shadowColor= isTech
    ? isDarkMode ? "rgba(168,85,247,0.22)" : "rgba(168,85,247,0.12)"
    : isDarkMode ? "rgba(16,185,129,0.22)" : "rgba(16,185,129,0.12)";

  return (
    <div className={`flex flex-col rounded-2xl border overflow-hidden ${panelBg} ${panelBorder}`}>
      {showHeader && (
        <div className={`flex items-center justify-between px-4 py-3 border-b ${headerBorder}`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full shrink-0 ${accentDot}`} />
            <span className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>{label}</span>
          </div>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${countBadge}`}>
            {projects.length} projects
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2 p-3">
        <div className="relative">
          <button
            onClick={() => { playClick(); prev(); }} disabled={currentIndex === 0}
            onMouseEnter={playHover}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 bg-gradient-to-br ${arrowGrad} text-white ${currentIndex === 0 ? "opacity-25 cursor-not-allowed" : "hover:scale-110 cursor-pointer"}`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="overflow-hidden mx-2 sm:mx-5 lg:mx-8" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * cardWidth}%)` }}>
              {projects.map((project, index) => {
                const isDescExpanded = expandedDesc.has(index);
                const isTechExpanded = expandedTech.has(index);
                const displayTech    = isTechExpanded ? project.tech : project.tech.slice(0, 4);
                const desc           = project.description;
                const shortDesc      = desc.slice(0, 110);
                const needsMore      = desc.length > 110;
                const ytId           = project.mediaType === "video" && project.video ? getYoutubeVideoId(project.video) : null;

                return (
                  <div key={project.id} className="shrink-0 px-1 sm:px-1.5" style={{ width: `${cardWidth}%` }}>
                    <div
                      className={`flex flex-col rounded-xl border overflow-hidden transition-colors duration-200 cursor-pointer ${isDarkMode ? `bg-[#222] border-[#2e2e2e] ${cardBorder}` : `bg-slate-50 border-slate-200 ${cardBorder}`}`}
                      onClick={onCardClick ? (e) => { playClick(); onCardClick(project, e.currentTarget as HTMLElement); } : undefined}
                      onMouseEnter={(e) => { playHover(); (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px -4px ${shadowColor}`; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
                    >
                      {((project.mediaType === "video" && project.video) || project.image) && (
                        <div className="relative w-full h-48 overflow-hidden shrink-0">
                          {ytId ? (
                            <YouTubeEmbed videoId={ytId} startTime={project.videoStartTime} />
                          ) : project.mediaType === "video" && project.video ? (
                            <video className="w-full h-full object-cover" muted loop autoPlay playsInline poster={project.image}>
                              <source src={project.video} type="video/mp4" />
                              <source src={project.video} type="video/webm" />
                            </video>
                          ) : (
                            <Image src={project.image!} alt={project.title} fill className="object-cover" />
                          )}
                        </div>
                      )}

                      <div className="flex flex-col p-3 sm:p-3.5 lg:p-4 gap-2.5 lg:gap-3">
                        <h3 className={`text-[13px] sm:text-sm lg:text-base font-bold leading-snug ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                          {project.title}
                        </h3>
                        <p className={`text-[11px] sm:text-xs lg:text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                          {isDescExpanded ? desc : needsMore ? shortDesc + "..." : desc}
                          {needsMore && (
                            <button onClick={(e) => { playClick(); toggleDesc(index, e); }} className={`ml-1 font-medium ${demoCls}`}>
                              {isDescExpanded ? " less" : <MoreHorizontal className="w-3 h-3 inline" />}
                            </button>
                          )}
                        </p>
                        <div className={`flex flex-wrap gap-1 pt-1.5 border-t ${isDarkMode ? "border-white/[0.05]" : "border-slate-100"}`}>
                          {displayTech.map((tech) => (
                            <span key={tech} className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${tagCls}`}>{tech}</span>
                          ))}
                          {project.tech.length > 4 && (
                            <button
                              onClick={(e) => { playClick(); toggleTech(index, e); }}
                              className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${isTechExpanded ? isDarkMode ? "bg-red-500/15 text-red-400 border-red-500/25" : "bg-red-50 text-red-700 border-red-200" : isDarkMode ? "bg-[#2a2a2a] text-gray-400 border-[#333]" : "bg-gray-100 text-gray-600 border-gray-200"}`}
                            >
                              {isTechExpanded ? "less" : `+${project.tech.length - 4}`}
                            </button>
                          )}
                        </div>
                        <div className={`flex gap-2.5 pt-1.5 border-t ${isDarkMode ? "border-white/[0.05]" : "border-slate-100"}`}>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => { playClick(); e.stopPropagation(); }} className={`flex items-center gap-1 text-[10px] font-medium ${demoCls}`}>
                            <ExternalLink className="w-2.5 h-2.5" /> Live Demo
                          </a>
                          <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => { playClick(); e.stopPropagation(); }} className={`flex items-center gap-1 text-[10px] font-medium ${isDarkMode ? "text-gray-500 hover:text-white" : "text-slate-400 hover:text-slate-800"}`}>
                            <GitBranch className="w-2.5 h-2.5" /> Code
                          </a>
                          {project.caseStudy && onCaseStudy && (
                            <button onClick={(e) => { playClick(); e.stopPropagation(); onCaseStudy(project); }} className={`flex items-center gap-1 text-[10px] font-medium ${isDarkMode ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"}`}>
                              <BookOpen className="w-2.5 h-2.5" /> Case Study
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => { playClick(); next(); }} disabled={currentIndex >= maxIndex}
            onMouseEnter={playHover}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 bg-gradient-to-br ${arrowGrad} text-white ${currentIndex >= maxIndex ? "opacity-25 cursor-not-allowed" : "hover:scale-110 cursor-pointer"}`}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {maxIndex > 0 && (
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i} onClick={() => { playClick(); setCurrentIndex(i); }}
                className={`rounded-full transition-all duration-300 ${i === currentIndex ? `w-4 h-1.5 bg-gradient-to-r ${dotActive}` : `w-1.5 h-1.5 ${isDarkMode ? "bg-[#333] hover:bg-[#444]" : "bg-slate-300 hover:bg-slate-400"}`}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectSection: React.FC<ProjectSectionProps> = ({ isDarkMode, projects }) => {
  const { playClick } = useSound();
  const router = useRouter();
  const [activeTab,      setActiveTab]      = useState<"tech" | "shopify">("tech");
  const [showAll,        setShowAll]        = useState(false);
  const [allFilter,      setAllFilter]      = useState<"tech" | "shopify" | "research">("tech");
  const [activeProject,  setActiveProject]  = useState<Project | null>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [isClosing,      setIsClosing]      = useState(false);

  const goToCaseStudy = useCallback((project: Project) => {
    router.push(`/casestudies?project=${project.id}`);
  }, [router]);

  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const originRef  = useRef({ tx: 0, ty: 0, sx: 1, sy: 1 });
  const timers     = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  /* driven by chat agent navigation */
  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent<"tech" | "shopify">).detail;
      setActiveTab(tab);
      setAllFilter(tab);
      setShowAll(true);
    };
    window.addEventListener("set-project-tab", handler);
    return () => window.removeEventListener("set-project-tab", handler);
  }, []);

  const openProject = useCallback((project: Project, cardEl: HTMLElement) => {
    if (activeProject !== null || isClosing) return;
    playClick();
    const sec = sectionRef.current;
    if (!sec) return;
    const sR = sec.getBoundingClientRect();
    const cR = cardEl.getBoundingClientRect();
    originRef.current = {
      tx: cR.left + cR.width  / 2 - (sR.left + sR.width  / 2),
      ty: cR.top  + cR.height / 2 - (sR.top  + sR.height / 2),
      sx: cR.width  / sR.width,
      sy: cR.height / sR.height,
    };
    setContentVisible(false);
    setIsClosing(false);
    setActiveProject(project);
  }, [activeProject, isClosing]);

  useEffect(() => {
    if (!activeProject || !overlayRef.current) return;
    clearTimers();
    const el = overlayRef.current;
    const { tx, ty, sx, sy } = originRef.current;
    el.style.setProperty("--tx", `${tx}px`);
    el.style.setProperty("--ty", `${ty}px`);
    el.style.setProperty("--sx", `${sx}`);
    el.style.setProperty("--sy", `${sy}`);
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = `proj-open ${PROJ_ANIM_MS}ms linear forwards`;
    timers.current.push(setTimeout(() => setContentVisible(true), PROJ_ANIM_MS * 0.37));
  }, [activeProject]);

  const closeProject = () => {
    if (isClosing || !overlayRef.current) return;
    playClick();
    clearTimers();
    setIsClosing(true);
    setContentVisible(false);
    const el = overlayRef.current;
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = `proj-close ${PROJ_ANIM_MS}ms linear forwards`;
    timers.current.push(setTimeout(() => { setActiveProject(null); setIsClosing(false); }, PROJ_ANIM_MS));
  };

  const aiProjects       = projects.filter((p) => !p.categories.includes("Shopify"));
  const shopifyProjects  = projects.filter((p) =>  p.categories.includes("Shopify"));
  const researchProjects = projects.filter((p) =>  p.categories.includes("Research"));
  const filteredAll      = allFilter === "tech" ? aiProjects : allFilter === "shopify" ? shopifyProjects : researchProjects;

  const tabBase     = `flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200`;
  const tabActive   = isDarkMode ? "bg-[#2a2a2a] text-white shadow-md"       : "bg-white text-slate-900 shadow-md";
  const tabInactive = isDarkMode ? "text-gray-500 hover:text-gray-300"        : "text-slate-400 hover:text-slate-700";
  const countActive = (accent: AccentStyle) => accent === "tech"
    ? isDarkMode ? "bg-purple-500/10 text-purple-400 border-purple-500/20"    : "bg-purple-100 text-purple-600 border-purple-200"
    : isDarkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-100 text-emerald-700 border-emerald-200";

  const proj        = activeProject;
  const projYtId    = proj?.video ? getYoutubeVideoId(proj.video) : null;
  const isShopifyP  = proj?.categories.includes("Shopify") ?? false;

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ perspective: "1400px" }}
      className={`h-full overflow-hidden relative ${isDarkMode ? "bg-[#141414]" : "bg-slate-50"}`}
    >
      {/* CSS */}
      <style>{`
        @keyframes proj-open {
          0% {
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            transform: translate(var(--tx), var(--ty)) scaleX(var(--sx)) scaleY(var(--sy)) rotateY(-90deg);
            border-radius: 12px;
          }
          36% {
            animation-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
            transform: translate(var(--tx), var(--ty)) scaleX(var(--sx)) scaleY(var(--sy)) rotateY(0deg);
            border-radius: 12px;
          }
          100% {
            transform: translate(0px, 0px) scaleX(1) scaleY(1) rotateY(0deg);
            border-radius: 0px;
          }
        }
        @keyframes proj-close {
          0% {
            animation-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
            transform: translate(0px, 0px) scaleX(1) scaleY(1) rotateY(0deg);
            border-radius: 0px;
            opacity: 1;
          }
          52% {
            animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
            transform: translate(var(--tx), var(--ty)) scaleX(var(--sx)) scaleY(var(--sy)) rotateY(0deg);
            border-radius: 12px;
            opacity: 1;
          }
          82% {
            animation-timing-function: cubic-bezier(0, 0, 0.5, 1);
            transform: translate(var(--tx), var(--ty)) scaleX(var(--sx)) scaleY(var(--sy)) rotateY(-90deg);
            border-radius: 12px;
            opacity: 0.6;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scaleX(var(--sx)) scaleY(var(--sy)) rotateY(0deg);
            border-radius: 12px;
            opacity: 0;
          }
        }
        @keyframes proj-content-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .proj-content-in { animation: proj-content-in 0.22s ease-out forwards; }
      `}</style>

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${isDarkMode ? "bg-purple-500" : "bg-purple-200"}`} />
        <div className={`absolute -bottom-10 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${isDarkMode ? "bg-emerald-500" : "bg-emerald-200"}`} />
      </div>

      {/* Sliding wrapper — matches vertical slide timing */}
      <div
        className="flex h-full"
        style={{
          transform: showAll ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 650ms cubic-bezier(0.87, 0, 0.13, 1) 200ms",
        }}
      >
        {/* ── Panel 1: Featured ── */}
        <div className="min-w-full h-full flex flex-col min-h-0 relative z-10 px-2 sm:px-5 pt-5 pb-4 gap-4">
          <div className="flex items-end justify-between shrink-0">
            <div>
              <span className={`text-[10px] font-semibold tracking-widest uppercase ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>Portfolio</span>
              <h2 className={`text-lg font-bold leading-tight mt-0.5 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Featured{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { playClick(); setAllFilter("research"); setShowAll(true); }}
                className="group hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs text-white shadow-lg shadow-amber-500/30 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 hover:scale-105 transition-all duration-200"
              >
                <FlaskConical className="w-3.5 h-3.5" /> Research Projects
              </button>
              <button
                onClick={() => { playClick(); setShowAll(true); }}
                className={`group hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 ${isDarkMode ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-slate-900 text-white hover:bg-slate-700"}`}
              >
                View All <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Mobile tabs */}
          <div className="flex flex-col gap-3 lg:hidden">
            <div className={`flex gap-1.5 p-1.5 rounded-2xl border ${isDarkMode ? "bg-white/[0.04] border-white/[0.07]" : "bg-slate-100 border-slate-200"}`}>
              <button onClick={() => { playClick(); setActiveTab("tech"); }} className={`${tabBase} ${activeTab === "tech" ? tabActive : tabInactive}`}>
                <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                AI / ML &amp; Software
                <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full border ${activeTab === "tech" ? countActive("tech") : isDarkMode ? "border-white/10 text-gray-500" : "border-slate-200 text-slate-400"}`}>{aiProjects.length}</span>
              </button>
              <button onClick={() => { playClick(); setActiveTab("shopify"); }} className={`${tabBase} ${activeTab === "shopify" ? tabActive : tabInactive}`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                Shopify Stores
                <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full border ${activeTab === "shopify" ? countActive("shopify") : isDarkMode ? "border-white/10 text-gray-500" : "border-slate-200 text-slate-400"}`}>{shopifyProjects.length}</span>
              </button>
            </div>
            {activeTab === "tech"
              ? <ProjectCarousel key="mobile-tech-carousel" isDarkMode={isDarkMode} projects={aiProjects} desktopPerView={1} accent="tech" label="AI / ML & Software" showHeader={false} onCardClick={openProject} onCaseStudy={goToCaseStudy} />
              : <ProjectCarousel key="mobile-shopify-carousel" isDarkMode={isDarkMode} projects={shopifyProjects} desktopPerView={1} accent="shopify" label="Shopify Stores" showHeader={false} onCardClick={openProject} onCaseStudy={goToCaseStudy} />
            }
          </div>

          {/* Desktop two panels */}
          <div className="hidden lg:flex flex-row gap-4 items-start">
            <div className="flex-[2] min-w-0">
              <ProjectCarousel isDarkMode={isDarkMode} projects={aiProjects} desktopPerView={2} accent="tech" label="AI / ML & Software" onCardClick={openProject} onCaseStudy={goToCaseStudy} />
            </div>
            <div className="flex-[1] min-w-0">
              <ProjectCarousel isDarkMode={isDarkMode} projects={shopifyProjects} desktopPerView={1} accent="shopify" label="Shopify Stores" onCardClick={openProject} onCaseStudy={goToCaseStudy} />
            </div>
          </div>
        </div>

        {/* ── Panel 2: All Projects ── */}
        <div className={`min-w-full h-full flex flex-col relative z-10 ${isDarkMode ? "bg-[#141414]" : "bg-slate-50"}`}>
          {/* Header */}
          <div className={`flex items-center justify-between px-4 sm:px-6 py-3.5 shrink-0 border-b ${isDarkMode ? "border-white/[0.06]" : "border-slate-200"}`}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { playClick(); setShowAll(false); }}
                className={`group flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${isDarkMode ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-slate-900 text-white hover:bg-slate-700"}`}
              >
                <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back
              </button>
              <h2 className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>All Projects</h2>
            </div>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${isDarkMode ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-purple-100 text-purple-600 border-purple-200"}`}>
              {filteredAll.length} projects
            </span>
          </div>

          {/* Filter tabs */}
          <div className={`flex gap-1 px-4 sm:px-6 py-2.5 shrink-0 border-b ${isDarkMode ? "border-white/[0.04]" : "border-slate-100"}`}>
            {(["tech", "shopify", "research"] as const).map((f) => {
              const count  = f === "tech" ? aiProjects.length : f === "shopify" ? shopifyProjects.length : researchProjects.length;
              const active = allFilter === f;
              const label  = f === "tech" ? "AI / ML & Software" : f === "shopify" ? "Shopify" : "Research";
              return (
                <button key={f} onClick={() => { playClick(); setAllFilter(f); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200 ${active ? isDarkMode ? "bg-white/[0.08] text-white" : "bg-white text-slate-900 shadow-sm border border-slate-200" : isDarkMode ? "text-gray-500 hover:text-gray-300" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {label}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${active ? isDarkMode ? "bg-white/10 text-gray-400" : "bg-slate-100 text-slate-500" : ""}`}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Scrollable horizontal-card grid */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredAll.map((project) => {
                const isProjShopify = project.categories.includes("Shopify");
                const pYtId         = project.mediaType === "video" && project.video ? getYoutubeVideoId(project.video) : null;
                const pTagCls       = isProjShopify
                  ? isDarkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : isDarkMode ? "bg-blue-500/10 text-blue-400 border-blue-500/20"          : "bg-blue-50 text-blue-700 border-blue-200";
                const hasMedia = pYtId || project.image || (project.mediaType === "video" && project.video);
                return (
                  <div
                    key={project.id}
                    className={`flex rounded-xl border overflow-hidden cursor-pointer transition-all duration-200 ${isDarkMode ? "bg-[#1a1a1a] border-[#2a2a2a] hover:border-purple-500/30" : "bg-white border-slate-200 hover:border-purple-300 hover:shadow-sm"}`}
                    onClick={(e) => { playClick(); openProject(project, e.currentTarget as HTMLElement); }}
                  >
                    {/* Left: Media — tech projects only */}
                    {hasMedia && !isProjShopify && (
                      <div className="relative w-28 sm:w-32 shrink-0 overflow-hidden">
                        {pYtId ? (
                          <YouTubeEmbed videoId={pYtId} startTime={project.videoStartTime} />
                        ) : project.mediaType === "video" && project.video ? (
                          <video className="absolute inset-0 w-full h-full object-cover" muted loop autoPlay playsInline poster={project.image}>
                            <source src={project.video} type="video/mp4" />
                          </video>
                        ) : project.image ? (
                          <Image src={project.image} alt={project.title} fill className="object-cover" />
                        ) : null}
                      </div>
                    )}

                    {/* Right: Info */}
                    <div className={`flex flex-col flex-1 min-w-0 ${isProjShopify ? "gap-1.5 p-2" : "gap-2 p-3"}`}>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`text-xs font-bold leading-snug ${isDarkMode ? "text-white" : "text-slate-900"}`}>{project.title}</h3>
                        <span className={`shrink-0 text-[8px] px-1.5 py-0.5 rounded-full font-semibold ${isProjShopify ? isDarkMode ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-100 text-emerald-700" : isDarkMode ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-600"}`}>
                          {isProjShopify ? "Shopify" : "Tech"}
                        </span>
                      </div>
                      {!isProjShopify && (
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((t) => (
                            <span key={t} className={`text-[8px] font-medium px-1.5 py-0.5 rounded border ${pTagCls}`}>{t}</span>
                          ))}
                        </div>
                      )}
                      <div className={`flex gap-2.5 mt-auto pt-1.5 border-t ${isDarkMode ? "border-white/[0.05]" : "border-slate-100"}`}>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => { playClick(); e.stopPropagation(); }} className={`flex items-center gap-1 text-[9px] font-medium ${isDarkMode ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
                          <ExternalLink className="w-2.5 h-2.5" /> Demo
                        </a>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => { playClick(); e.stopPropagation(); }} className={`flex items-center gap-1 text-[9px] font-medium ${isDarkMode ? "text-gray-500 hover:text-white" : "text-slate-400 hover:text-slate-700"}`}>
                          <GitBranch className="w-2.5 h-2.5" /> Code
                        </a>
                        {project.caseStudy && (
                          <button onClick={(e) => { playClick(); e.stopPropagation(); goToCaseStudy(project); }} className={`flex items-center gap-1 text-[9px] font-medium ${isDarkMode ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"}`}>
                            <BookOpen className="w-2.5 h-2.5" /> Case Study
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Project detail overlay ── */}
      {activeProject !== null && (
        <div
          ref={overlayRef}
          className="absolute inset-0 z-30 overflow-hidden"
          style={{ background: isDarkMode ? "#1a1a1a" : "#ffffff", willChange: "transform" }}
        >
          {contentVisible && proj && (
            <div className="proj-content-in h-full flex flex-col">
              {/* Header */}
              <div className={`flex items-center justify-between px-4 sm:px-5 py-3 shrink-0 border-b ${isDarkMode ? "border-white/[0.06]" : "border-slate-100"}`}>
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`shrink-0 text-[10px] px-2.5 py-1 rounded-full font-semibold border ${isShopifyP ? isDarkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-100 text-emerald-700 border-emerald-200" : isDarkMode ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-purple-100 text-purple-600 border-purple-200"}`}>
                    {isShopifyP ? "Shopify" : "Tech"}
                  </span>
                  <h2 className={`text-sm sm:text-base font-bold truncate ${isDarkMode ? "text-white" : "text-slate-900"}`}>{proj.title}</h2>
                  {proj.date && (
                    <span className={`shrink-0 hidden sm:flex items-center gap-1 text-[10px] ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>
                      <Calendar className="w-3 h-3" /> {proj.date}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => { playClick(); closeProject(); }}
                  className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95 ${isDarkMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600"}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body: media left, info right */}
              <div className="flex-1 overflow-hidden flex flex-col sm:flex-row">
                {/* Left: Media */}
                {(projYtId || proj.image || (proj.mediaType === "video" && proj.video)) && (
                  <div className={`sm:w-1/2 shrink-0 relative overflow-hidden ${isDarkMode ? "bg-black" : "bg-slate-900"}`}>
                    {projYtId ? (
                      <YouTubeEmbed videoId={projYtId} startTime={proj.videoStartTime} />
                    ) : proj.mediaType === "video" && proj.video ? (
                      <video className="absolute inset-0 w-full h-full object-contain" controls muted loop autoPlay playsInline poster={proj.image}>
                        <source src={proj.video} type="video/mp4" />
                      </video>
                    ) : proj.image ? (
                      <Image src={proj.image} alt={proj.title} fill className="object-contain" />
                    ) : null}
                  </div>
                )}

                {/* Right: Info */}
                <div className={`flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-5 ${isDarkMode ? "bg-[#1a1a1a]" : "bg-white"}`}>
                  <div>
                    <p className={`text-[10px] font-semibold uppercase tracking-widest mb-2 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>Overview</p>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>{proj.description}</p>
                  </div>

                  <div>
                    <p className={`text-[10px] font-semibold uppercase tracking-widest mb-2 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>Tech Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.map((t) => (
                        <span key={t} className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${isShopifyP ? isDarkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-700 border-emerald-200" : isDarkMode ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`mt-auto flex flex-wrap gap-3 pt-4 border-t ${isDarkMode ? "border-white/[0.06]" : "border-slate-100"}`}>
                    <a href={proj.demo} target="_blank" rel="noopener noreferrer"
                      onClick={playClick}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 hover:scale-[1.03] ${isDarkMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-slate-900 hover:bg-slate-700 text-white"}`}>
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                    <a href={proj.github} target="_blank" rel="noopener noreferrer"
                      onClick={playClick}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 hover:scale-[1.03] border ${isDarkMode ? "border-white/[0.1] hover:border-white/[0.2] text-gray-300 hover:text-white" : "border-slate-200 hover:border-slate-300 text-slate-600"}`}>
                      <GitBranch className="w-3.5 h-3.5" /> Source Code
                    </a>
                    {proj.caseStudy && (
                      <button
                        onClick={() => { playClick(); goToCaseStudy(proj); }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 hover:scale-[1.03] border ${isDarkMode ? "border-amber-500/30 text-amber-400 hover:bg-amber-500/10" : "border-amber-300 text-amber-700 hover:bg-amber-50"}`}>
                        <BookOpen className="w-3.5 h-3.5" /> Case Study
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ProjectSection;
