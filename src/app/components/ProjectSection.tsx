"use client";

import { ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

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

import { Project } from "../data/projects";

interface ProjectSectionProps {
  isDarkMode: boolean;
  projects: Project[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ isDarkMode, projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, projects.length - itemsPerView);
  useEffect(() => { setCurrentIndex((i) => Math.min(i, maxIndex)); }, [maxIndex]);

  const prev = useCallback(() => setCurrentIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrentIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  const cardWidth = 100 / itemsPerView;

  return (
    <section
      id="projects"
      className={`h-full flex flex-col overflow-hidden relative ${isDarkMode ? "bg-gray-900" : "bg-slate-50"}`}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-15 ${isDarkMode ? "bg-purple-500" : "bg-purple-200"}`} />
        <div className={`absolute -bottom-10 -right-20 w-72 h-72 rounded-full blur-3xl opacity-15 ${isDarkMode ? "bg-blue-500" : "bg-blue-200"}`} />
      </div>

      <div className="flex flex-col flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-5">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-4 shrink-0">
          <div>
            <span className={`inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-1.5 ${isDarkMode ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-purple-100 text-purple-600 border border-purple-200"}`}>
              Portfolio
            </span>
            <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
              A showcase of my recent work in web development and AI integration
            </p>
          </div>
          <Link href="/projects" className="shrink-0">
            <button className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md transition-all duration-200 hover:scale-105">
              View All
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Carousel — flex-1 so it fills remaining space */}
        <div className="relative flex-1 min-h-0">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className={`absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ${currentIndex === 0 ? "opacity-25 cursor-not-allowed" : "hover:scale-110 cursor-pointer"} bg-gradient-to-br from-blue-600 to-purple-600 text-white`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="overflow-hidden h-full">
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * cardWidth}%)` }}
            >
              {projects.map((project, index) => {
                const youtubeId = project.video ? getYoutubeVideoId(project.video) : null;
                return (
                  <div key={index} className="shrink-0 px-2 h-full" style={{ width: `${cardWidth}%` }}>
                    <div className={`group flex flex-col rounded-2xl overflow-hidden border h-full transition-all duration-300 hover:scale-[1.015] ${isDarkMode ? "bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/15" : "bg-white border-slate-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10"}`}>
                      {/* Media */}
                      {((project.mediaType === "video" && project.video) || project.image) && (
                        <div className="relative w-full shrink-0 overflow-hidden" style={{ height: "38%" }}>
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                          {project.mediaType === "video" && project.video ? (
                            youtubeId ? (
                              <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0${project.videoStartTime ? `&start=${project.videoStartTime}` : ""}`}
                                allow="autoplay; encrypted-media"
                                style={{ border: "none" }}
                              />
                            ) : (
                              <video className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" muted loop autoPlay playsInline poster={project.image}>
                                <source src={project.video} type="video/mp4" />
                              </video>
                            )
                          ) : (
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          )}
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-4 min-h-0">
                        <h3 className={`text-sm font-bold mb-1.5 transition-colors ${isDarkMode ? "text-white group-hover:text-purple-300" : "text-slate-900 group-hover:text-purple-700"}`}>
                          {project.title}
                        </h3>
                        <p className={`text-xs leading-relaxed mb-2 flex-1 overflow-hidden ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}
                          style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const }}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span key={tech} className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${isDarkMode ? "bg-blue-500/15 text-blue-400 border border-blue-500/25" : "bg-blue-50 text-blue-700 border border-blue-200"}`}>
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${isDarkMode ? "bg-gray-700 text-gray-400 border border-gray-600" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                        <div className={`flex gap-3 pt-2 border-t ${isDarkMode ? "border-gray-700/40" : "border-slate-100"}`}>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 text-xs font-medium transition-colors ${isDarkMode ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
                            <ExternalLink className="w-3 h-3" /> Live Demo
                          </a>
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 text-xs font-medium transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}>
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

          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ${currentIndex >= maxIndex ? "opacity-25 cursor-not-allowed" : "hover:scale-110 cursor-pointer"} bg-gradient-to-br from-blue-600 to-purple-600 text-white`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-1.5 mt-3 shrink-0">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-300 ${i === currentIndex ? "w-5 h-2 bg-gradient-to-r from-blue-600 to-purple-600" : `w-2 h-2 ${isDarkMode ? "bg-gray-600" : "bg-slate-300"}`}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
