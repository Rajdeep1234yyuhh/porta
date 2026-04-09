"use client";

import { ExternalLink, Github, ArrowRight, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());
  const [, setPlayingVideo] = useState<number | null>(null);
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

  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = useCallback(() => setCurrentIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrentIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  const toggleProjectSkills = (index: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(index)) newExpanded.delete(index);
    else newExpanded.add(index);
    setExpandedProjects(newExpanded);
  };

  const toggleProjectDescription = (index: number) => {
    const newExpanded = new Set(expandedDescriptions);
    if (newExpanded.has(index)) newExpanded.delete(index);
    else newExpanded.add(index);
    setExpandedDescriptions(newExpanded);
  };

  const handleVideoPlay = (index: number) => setPlayingVideo(index);
  const handleVideoPause = () => setPlayingVideo(null);

  const truncateText = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim();
  };

  const cardWidth = 100 / itemsPerView;

  return (
    <section
      id="projects"
      className={`h-full py-8 relative overflow-y-auto ${
        isDarkMode ? "bg-gray-900" : "bg-slate-50"
      }`}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-40 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-purple-500" : "bg-purple-200"}`}></div>
        <div className={`absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-blue-500" : "bg-blue-200"}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-block mb-3">
              <span className={`text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full ${isDarkMode ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-purple-100 text-purple-600 border border-purple-200"}`}>
                Portfolio
              </span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className={`text-sm md:text-base max-w-2xl ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
              A showcase of my recent work in web development and AI integration
            </p>
          </div>
          <Link href="/projects" className="shrink-0">
            <button className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-purple-500/30 transition-all duration-200 hover:scale-105">
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className={`absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ${
              currentIndex === 0
                ? "opacity-25 cursor-not-allowed bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                : "bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:scale-110 hover:shadow-purple-500/50 cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * cardWidth}%)` }}
            >
              {projects.map((project, index) => {
                const isExpanded = expandedProjects.has(index);
                const isDescriptionExpanded = expandedDescriptions.has(index);
                const displayTech = isExpanded ? project.tech : project.tech.slice(0, 3);
                const hasMoreTech = project.tech.length > 3;
                const truncatedDescription = truncateText(project.description, 100);
                const shouldShowMoreButton = project.description.length > 100;

                return (
                  <div
                    key={index}
                    className="shrink-0 px-3"
                    style={{ width: `${cardWidth}%` }}
                  >
                    <div
                      className={`group rounded-2xl overflow-hidden transition-all duration-300 border hover:scale-[1.02] h-full ${
                        isDarkMode
                          ? "bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20"
                          : "bg-white border-slate-200 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/10"
                      }`}
                    >
                      {/* Project Image/Video — only rendered when media exists */}
                      {(project.mediaType === "video" && project.video) || project.image ? (
                        <div className="relative w-full aspect-video overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                          {project.mediaType === "video" && project.video ? (
                            <div className="relative w-full h-full">
                              {getYoutubeVideoId(project.video) ? (
                                <iframe
                                  className="w-full h-full"
                                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(project.video)}?autoplay=1&mute=1&loop=1&playlist=${getYoutubeVideoId(project.video)}&controls=0${project.videoStartTime ? `&start=${project.videoStartTime}` : ""}`}
                                  allow="autoplay; encrypted-media"
                                  style={{ border: "none" }}
                                />
                              ) : (
                                <video
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                  muted loop autoPlay playsInline
                                  onPlay={() => handleVideoPlay(index)}
                                  onPause={handleVideoPause}
                                  poster={project.image}
                                >
                                  <source src={project.video} type="video/mp4" />
                                  <source src={project.video} type="video/webm" />
                                </video>
                              )}
                            </div>
                          ) : (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          )}
                        </div>
                      ) : null}

                      {/* Project Content */}
                      <div className="p-5">
                        <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${isDarkMode ? "text-white group-hover:text-purple-300" : "text-slate-900 group-hover:text-purple-700"}`}>
                          {project.title}
                        </h3>

                        {/* Description */}
                        <div className={`mb-3 text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
                          {isDescriptionExpanded ? (
                            <div>
                              <p>{project.description}</p>
                              {shouldShowMoreButton && (
                                <button
                                  onClick={() => toggleProjectDescription(index)}
                                  className={`mt-2 text-sm font-medium transition-colors duration-200 ${isDarkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"}`}
                                >
                                  Show less
                                </button>
                              )}
                            </div>
                          ) : (
                            <p>
                              {shouldShowMoreButton ? truncatedDescription : project.description}
                              {shouldShowMoreButton && (
                                <button
                                  onClick={() => toggleProjectDescription(index)}
                                  className={`inline-flex items-center ml-1 font-medium transition-colors duration-200 ${isDarkMode ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              )}
                            </p>
                          )}
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {displayTech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${isDarkMode ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30" : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"}`}
                            >
                              {tech}
                            </span>
                          ))}
                          {hasMoreTech && (
                            <button
                              onClick={() => toggleProjectSkills(index)}
                              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 border ${
                                isExpanded
                                  ? isDarkMode ? "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30" : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                  : isDarkMode ? "bg-gray-700 text-gray-400 border-gray-600 hover:bg-gray-600" : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                              }`}
                            >
                              {isExpanded ? "Show Less" : `+${project.tech.length - 3} more`}
                            </button>
                          )}
                        </div>

                        {/* Action Links */}
                        <div className="flex gap-3 pt-3 border-t border-gray-700/30">
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${isDarkMode ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className={`absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ${
              currentIndex >= maxIndex
                ? "opacity-25 cursor-not-allowed bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                : "bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:scale-110 hover:shadow-purple-500/50 cursor-pointer"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dot indicators */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-6 h-2.5 bg-gradient-to-r from-blue-600 to-purple-600"
                    : `w-2.5 h-2.5 ${isDarkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-slate-300 hover:bg-slate-400"}`
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
