/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  GitBranch,
  Search,
  Star,
  Code2,
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Navbar from "./Navbar";
import { allProjects } from "../data/projects";

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

function getDomain(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

const SiteFavicon = ({ url, isDarkMode }: { url: string; isDarkMode: boolean }) => {
  const [failed, setFailed] = useState(false);
  const domain = getDomain(url);

  if (!domain || url === "#" || failed) {
    return (
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          isDarkMode ? "bg-gray-700" : "bg-slate-100"
        }`}
      >
        <ExternalLink className={`w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`} />
      </div>
    );
  }

  return (
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden ${
        isDarkMode ? "bg-gray-700" : "bg-slate-100"
      }`}
    >
      <Image
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt={domain}
        width={24}
        height={24}
        onError={() => setFailed(true)}
        className="w-6 h-6 object-contain"
        unoptimized
      />
    </div>
  );
};

function truncateText(text: string, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim();
}

interface SharedCardProps {
  isDarkMode: boolean;
  expandedTechStacks: Set<number>;
  expandedDescriptions: Set<number>;
  toggleTechStack: (id: number) => void;
  toggleDescription: (id: number) => void;
}

const FeaturedCard = ({
  project,
  isDarkMode,
  expandedTechStacks,
  expandedDescriptions,
  toggleTechStack,
  toggleDescription,
}: { project: any } & SharedCardProps) => {
  const isExpanded = expandedTechStacks.has(project.id);
  const isDescriptionExpanded = expandedDescriptions.has(project.id);
  const displayTech = isExpanded ? project.tech : project.tech.slice(0, 3);
  const hasMoreTech = project.tech.length > 3;
  const truncatedDescription = truncateText(project.description, 100);
  const shouldShowMore = project.description.length > 100;
  const youtubeId = project.video ? getYoutubeVideoId(project.video) : null;

  return (
    <div
      className={`group rounded-2xl overflow-hidden transition-all duration-300 border hover:scale-[1.02] ${
        isDarkMode
          ? "bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20"
          : "bg-white border-slate-200 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/10"
      }`}
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        {project.mediaType === "video" && project.video ? (
          youtubeId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0${project.videoStartTime ? `&start=${project.videoStartTime}` : ""}`}
              allow="autoplay; encrypted-media"
              style={{ border: "none" }}
            />
          ) : (
            <video
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              muted
              loop
              autoPlay
              playsInline
              poster={project.image}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          )
        ) : (
          <Image
            src={project.image!}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            unoptimized
          />
        )}
      </div>

      <div className="p-5">
        <h3
          className={`text-lg font-bold mb-2 transition-colors duration-300 ${
            isDarkMode
              ? "text-white group-hover:text-purple-300"
              : "text-slate-900 group-hover:text-purple-700"
          }`}
        >
          {project.title}
        </h3>

        <div
          className={`mb-3 text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}
        >
          {isDescriptionExpanded ? (
            <div>
              <p>{project.description}</p>
              {shouldShowMore && (
                <button
                  onClick={() => toggleDescription(project.id)}
                  className={`mt-2 text-sm font-medium transition-colors duration-200 ${
                    isDarkMode
                      ? "text-red-400 hover:text-red-300"
                      : "text-red-600 hover:text-red-700"
                  }`}
                >
                  Show less
                </button>
              )}
            </div>
          ) : (
            <p>
              {shouldShowMore ? truncatedDescription : project.description}
              {shouldShowMore && (
                <button
                  onClick={() => toggleDescription(project.id)}
                  className={`inline-flex items-center ml-1 font-medium transition-colors duration-200 ${
                    isDarkMode
                      ? "text-purple-400 hover:text-purple-300"
                      : "text-purple-600 hover:text-purple-700"
                  }`}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              )}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {displayTech.map((tech: string) => (
            <span
              key={tech}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${
                isDarkMode
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30"
                  : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
              }`}
            >
              {tech}
            </span>
          ))}
          {hasMoreTech && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTechStack(project.id);
              }}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 border ${
                isExpanded
                  ? isDarkMode
                    ? "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                    : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                  : isDarkMode
                    ? "bg-gray-700 text-gray-400 border-gray-600 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
              }`}
            >
              {isExpanded ? "Show Less" : `+${project.tech.length - 3} more`}
            </button>
          )}
        </div>

        <div
          className={`flex gap-3 pt-3 border-t ${isDarkMode ? "border-gray-700/30" : "border-slate-100"}`}
        >
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
              isDarkMode
                ? "text-purple-400 hover:text-purple-300"
                : "text-purple-600 hover:text-purple-700"
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
              isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <GitBranch className="w-4 h-4" />
            Code
          </a>
        </div>
      </div>
    </div>
  );
};

const OtherCard = ({
  project,
  isDarkMode,
  expandedTechStacks,
  toggleTechStack,
}: { project: any } & Omit<
  SharedCardProps,
  "expandedDescriptions" | "toggleDescription"
>) => {
  const isExpanded = expandedTechStacks.has(project.id);
  const displayTech = isExpanded ? project.tech : project.tech.slice(0, 4);
  const hasMoreTech = project.tech.length > 4;

  return (
    <a
      href={project.demo}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] ${
        isDarkMode
          ? "bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/15"
          : "bg-white border-slate-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10"
      }`}
    >
      <div className="flex items-start gap-3 mb-2">
        <SiteFavicon url={project.demo} isDarkMode={isDarkMode} />
        <h3
          className={`text-base font-bold leading-snug transition-colors duration-300 flex-1 ${
            isDarkMode
              ? "text-white group-hover:text-purple-300"
              : "text-slate-900 group-hover:text-purple-700"
          }`}
        >
          {project.title}
        </h3>
        <ArrowUpRight
          className={`w-4 h-4 shrink-0 mt-0.5 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            isDarkMode
              ? "text-gray-500 group-hover:text-purple-400"
              : "text-slate-400 group-hover:text-purple-600"
          }`}
        />
      </div>

      <p
        className={`text-sm leading-relaxed mb-4 flex-1 ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {displayTech.map((tech: string) => (
          <span
            key={tech}
            className={`text-xs font-medium px-2.5 py-1 rounded-md ${
              isDarkMode
                ? "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}
          >
            {tech}
          </span>
        ))}
        {hasMoreTech && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleTechStack(project.id);
            }}
            className={`text-xs font-medium px-2.5 py-1 rounded-md border transition-all duration-200 ${
              isExpanded
                ? isDarkMode
                  ? "bg-red-500/15 text-red-400 border-red-500/25"
                  : "bg-red-50 text-red-700 border-red-200"
                : isDarkMode
                  ? "bg-gray-700 text-gray-400 border-gray-600"
                  : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {isExpanded ? "less" : `+${project.tech.length - 4}`}
          </button>
        )}
      </div>

      <div
        className={`flex gap-3 pt-3 border-t ${isDarkMode ? "border-gray-700/30" : "border-slate-100"}`}
      >
        <span
          className={`flex items-center gap-1.5 text-xs font-medium ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Project
        </span>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 ${
            isDarkMode
              ? "text-gray-500 hover:text-white"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          Code
        </a>
        <span
          className={`ml-auto text-xs ${isDarkMode ? "text-gray-600" : "text-slate-400"}`}
        >
          {project.date}
        </span>
      </div>
    </a>
  );
};

export default function ProjectsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedTechStacks, setExpandedTechStacks] = useState<Set<number>>(new Set());
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "projects") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const toggleTechStack = (projectId: number) => {
    setExpandedTechStacks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) newSet.delete(projectId);
      else newSet.add(projectId);
      return newSet;
    });
  };

  const toggleDescription = (projectId: number) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) newSet.delete(projectId);
      else newSet.add(projectId);
      return newSet;
    });
  };

  const categories = ["All", "Web Development", "AI/ML", "Shopify"];
  const projectsWithFeatured = allProjects.map((p) => ({ ...p, featured: p.id <= 4 }));

  const filteredProjects = projectsWithFeatured.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.categories.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategory === "All" || project.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const filteredFeatured = filteredProjects.filter((p) => p.featured);
  const filteredOther = filteredProjects.filter((p) => !p.featured);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-slate-50"}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`absolute top-40 -left-20 w-80 h-80 rounded-full blur-2xl opacity-15 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-200"
          }`}
        />
        <div
          className={`absolute bottom-40 -right-20 w-80 h-80 rounded-full blur-2xl opacity-15 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-200"
          }`}
        />
      </div>

      <div className="relative z-50">
        <Navbar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          scrollToSection={scrollToSection}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-20 pb-16">
        <div className="text-center mb-10">
          <div className="inline-block mb-3">
            <span
              className={`text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-full ${
                isDarkMode
                  ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  : "bg-purple-100 text-purple-600 border border-purple-200"
              }`}
            >
              Portfolio
            </span>
          </div>
          <h1
            className={`text-3xl md:text-4xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            All{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p
            className={`text-sm md:text-base max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}
          >
            A showcase of my work in web development, AI integration, and more
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-2">
          <div className="relative w-48">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                isDarkMode ? "text-gray-400" : "text-slate-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-9 pr-3 py-1.5 border rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm ${
                isDarkMode
                  ? "bg-gray-800/80 border-gray-700/50 text-white placeholder-gray-500"
                  : "bg-white border-slate-200 text-slate-900 placeholder-slate-500"
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  active
                    ? isDarkMode ? "bg-white text-gray-900 border-transparent" : "bg-gray-900 text-white border-transparent"
                    : isDarkMode
                    ? "bg-gray-800/60 border-gray-700/50 text-gray-300 hover:border-purple-500/50 hover:text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:border-purple-300 hover:text-purple-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className={`text-lg mb-2 ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
              No projects found
            </p>
            <p className={isDarkMode ? "text-gray-500" : "text-slate-500"}>
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredFeatured.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Star className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                  <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    Featured Projects
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFeatured.map((project) => (
                    <FeaturedCard
                      key={project.id}
                      project={project}
                      isDarkMode={isDarkMode}
                      expandedTechStacks={expandedTechStacks}
                      expandedDescriptions={expandedDescriptions}
                      toggleTechStack={toggleTechStack}
                      toggleDescription={toggleDescription}
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredOther.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Code2 className={`w-5 h-5 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                  <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    More Projects
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredOther.map((project) => (
                    <OtherCard
                      key={project.id}
                      project={project}
                      isDarkMode={isDarkMode}
                      expandedTechStacks={expandedTechStacks}
                      toggleTechStack={toggleTechStack}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
