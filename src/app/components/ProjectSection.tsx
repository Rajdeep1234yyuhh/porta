"use client";

import { ExternalLink, Github, ArrowRight, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
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

const ProjectSection: React.FC<ProjectSectionProps> = ({ isDarkMode, projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [expandedDesc, setExpandedDesc] = useState<Set<number>>(new Set());
  const [expandedTech, setExpandedTech] = useState<Set<number>>(new Set());

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, projects.length - itemsPerView);

  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = useCallback(() => setCurrentIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrentIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  const toggleDesc = (i: number) => setExpandedDesc((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const toggleTech = (i: number) => setExpandedTech((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });

  const cardWidth = 100 / itemsPerView;

  return (
    <section
      id="projects"
      className={`h-full flex flex-col overflow-hidden relative ${isDarkMode ? "bg-gray-900" : "bg-slate-50"}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${isDarkMode ? "bg-purple-500" : "bg-purple-200"}`} />
        <div className={`absolute -bottom-10 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${isDarkMode ? "bg-blue-500" : "bg-blue-200"}`} />
      </div>

      <div className="flex flex-col flex-1 min-h-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-4">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-3 shrink-0">
          <div>
            <div className="inline-block mb-1.5">
              <span className={`text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full ${isDarkMode ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-purple-100 text-purple-600 border border-purple-200"}`}>
                Portfolio
              </span>
            </div>
            <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
              {projects.length} projects · web development &amp; AI integration
            </p>
          </div>
          <Link href="/projects" className="shrink-0">
            <button className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md transition-all duration-200">
              View All <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Carousel area — fills remaining height */}
        <div className="flex-1 min-h-0 relative">
          {/* Left arrow */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className={`absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ${
              currentIndex === 0
                ? "opacity-25 cursor-not-allowed"
                : "hover:scale-110 cursor-pointer"
            } bg-gradient-to-br from-blue-600 to-purple-600 text-white`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Track */}
          <div className="overflow-hidden h-full mx-3 sm:mx-5">
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * cardWidth}%)` }}
            >
              {projects.map((project, index) => {
                const isDescExpanded = expandedDesc.has(index);
                const isTechExpanded = expandedTech.has(index);
                const displayTech = isTechExpanded ? project.tech : project.tech.slice(0, 3);
                const desc = project.description;
                const shortDesc = desc.slice(0, 90);
                const needsMore = desc.length > 90;
                const ytId = project.mediaType === "video" && project.video ? getYoutubeVideoId(project.video) : null;

                return (
                  <div
                    key={index}
                    className="shrink-0 px-2 h-full"
                    style={{ width: `${cardWidth}%` }}
                  >
                    <div
                      className={`h-full flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.015] ${
                        isDarkMode
                          ? "bg-gray-800/60 border-gray-700/50 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/15"
                          : "bg-white border-slate-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10"
                      }`}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = isDarkMode
                          ? "0 20px 60px -10px rgba(168,85,247,0.25)"
                          : "0 20px 60px -10px rgba(168,85,247,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "";
                      }}
                    >
                      {/* Media */}
                      {((project.mediaType === "video" && project.video) || project.image) && (
                        <div className="shrink-0 w-full overflow-hidden" style={{ height: "38%" }}>
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
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          )}
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-h-0 flex flex-col gap-1.5 p-3 overflow-hidden">
                        <h3 className={`text-sm font-bold leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                          {project.title}
                        </h3>

                        <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                          {isDescExpanded ? desc : (needsMore ? shortDesc : desc)}
                          {needsMore && (
                            <button
                              onClick={() => toggleDesc(index)}
                              className={`ml-1 font-medium inline-flex items-center ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
                            >
                              {isDescExpanded ? " less" : <MoreHorizontal className="w-3.5 h-3.5 inline" />}
                            </button>
                          )}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1">
                          {displayTech.map((tech) => (
                            <span key={tech} className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${isDarkMode ? "bg-blue-500/15 text-blue-400 border-blue-500/25" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <button
                              onClick={() => toggleTech(index)}
                              className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                                isTechExpanded
                                  ? isDarkMode ? "bg-red-500/15 text-red-400 border-red-500/25" : "bg-red-50 text-red-700 border-red-200"
                                  : isDarkMode ? "bg-gray-700 text-gray-400 border-gray-600" : "bg-gray-100 text-gray-600 border-gray-200"
                              }`}
                            >
                              {isTechExpanded ? "less" : `+${project.tech.length - 3}`}
                            </button>
                          )}
                        </div>

                        {/* Links */}
                        <div className={`flex gap-3 pt-1.5 mt-auto border-t ${isDarkMode ? "border-gray-700/40" : "border-slate-100"}`}>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer"
                            className={`flex items-center gap-1 text-[11px] font-medium ${isDarkMode ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
                            <ExternalLink className="w-3 h-3" /> Live Demo
                          </a>
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className={`flex items-center gap-1 text-[11px] font-medium ${isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-500 hover:text-slate-800"}`}>
                            <Github className="w-3 h-3" /> Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className={`absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ${
              currentIndex >= maxIndex
                ? "opacity-25 cursor-not-allowed"
                : "hover:scale-110 cursor-pointer"
            } bg-gradient-to-br from-blue-600 to-purple-600 text-white`}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-2 shrink-0">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-5 h-2 bg-gradient-to-r from-blue-600 to-purple-600"
                    : `w-2 h-2 ${isDarkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-slate-300 hover:bg-slate-400"}`
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
