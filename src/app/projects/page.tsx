/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef } from "react";

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
import {
  ExternalLink,
  Github,
  Search,
  Calendar,
  Star,
  Code2,
  Play,
} from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const ProjectShowcase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  // NEW: Track expanded tech stacks by project ID
  const [expandedTechStacks, setExpandedTechStacks] = useState<Set<number>>(
    new Set()
  );

  // Initialize dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Simple scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    setIsMenuOpen(false);
    if (sectionId === "projects") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  // NEW: Toggle function for tech stack expansion
  const toggleTechStack = (projectId: number) => {
    setExpandedTechStacks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const allProjects = [
    {
      id: 1,
      title: "Career Assessment Tool",
      description:
        "AI-powered career assessment solution built with Next.js and intelligent backend integration. Features include dynamic skill evaluation, personalized career recommendations, real-time analytics dashboard, and secure user profile management.",
      thumbnail: "mks.png",
      video: "mks.mp4",
      tech: [
        "Next.js",
        "Firebase",
        "API Integration",
        "Tailwind CSS",
        "Node.js",
        "Python",
        "AI",
        "ML",
      ],
      categories: ["AI/ML", "Web Development", "Mobile App"],
      demo: "https://dhiti.ai/",
      github: "https://github.com/Rajdeep1234yyuhh/mks",
      date: "2025",
      featured: true,
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      description:
        "Real-time analytics dashboard built with React and Node.js. Features include interactive data visualizations using Chart.js, secure Firebase authentication. Designed for tracking user behavior, performance metrics, and business KPIs in a sleek, responsive UI.",
      thumbnail: "dashb.png",
      video: "dashb.mp4",
      tech: ["React", "Tailwind CSS", "Node.js", "Firebase", "Chart.js"],
      categories: ["Web Development"],
      demo: "#",
      github: "https://github.com/Rajdeep1234yyuhh/Dashboard",
      date: "2025",
      featured: true,
    },
    {
      id: 3,
      title: "Aekay E-commerce Website",
      description:
        "Custom e-commerce storefront developed using Shopify and Liquid. Features include responsive design, optimized product listings, seamless cart and checkout flow, and personalized UI enhancements crafted with CSS for an elegant shopping experience.",
      thumbnail: "aekay.png",
      video: "aekay-ecom.mp4",
      tech: ["Shopify", "Liquid", "CSS"],
      categories: ["Web Development", "CMS"],
      demo: "https://aekay.in/",
      github: "#",
      date: "2024",
      featured: true,
    },
    {
      id: 4,
      title: "Real Estate Management System",
      description:
        "Complete property management solution with virtual tours, client portal, and automated workflows for real estate agencies.",
      thumbnail: "realestate-thumbnail.jpg",
      video: "mks.mp4",
      tech: ["Vue.js", "Node.js", "MongoDB", "Socket.io", "AWS"],
      categories: ["Web Development", "Real Estate"],
      demo: "#",
      github: "#",
      date: "2023",
      featured: false,
    },
    {
      id: 5,
      title: "Cryptocurrency Trading Bot",
      description:
        "Automated trading bot with machine learning algorithms for cryptocurrency markets. Features risk management and portfolio optimization.",
      thumbnail: "crypto-thumbnail.jpg",
      video: "dashb.mp4",
      tech: ["Python", "TensorFlow", "Redis", "API Integration", "Docker"],
      categories: ["AI/ML", "Fintech"],
      demo: "#",
      github: "#",
      date: "2023",
      featured: false,
    },
    {
      id: 6,
      title: "Restaurant Ordering System",
      description:
        "Multi-platform restaurant ordering system with QR code menus, payment integration, and kitchen management dashboard.",
      thumbnail: "restaurant-thumbnail.jpg",
      video: "aekay-ecom.mp4",
      tech: ["React Native", "Firebase", "Stripe", "Node.js", "Express"],
      categories: ["Mobile App", "E-commerce"],
      demo: "#",
      github: "#",
      date: "2023",
      featured: false,
    },
  ];

  const allUniqueCategories = Array.from(
    new Set(allProjects.flatMap((project) => project.categories))
  );
  const categories = ["All", ...allUniqueCategories];

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      project.categories.some((category) =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" ||
      project.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const featuredProjects = filteredProjects.filter(
    (project) => project.featured
  );
  const otherProjects = filteredProjects.filter((project) => !project.featured);

  // Project Card - Shows thumbnail, plays video on hover
  const ProjectCard = ({ project }: { project: any; isFeatured?: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Check if this project's tech stack is expanded
    const isExpanded = expandedTechStacks.has(project.id);

    const youtubeId = project.video ? getYoutubeVideoId(project.video) : null;

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (!youtubeId && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      if (!youtubeId && videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };

    const handleToggleTechStack = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleTechStack(project.id);
    };

    return (
      <div
        className={`group rounded-2xl overflow-hidden transition-all duration-300 border hover:scale-[1.02] ${
          isDarkMode
            ? "bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20"
            : "bg-white border-slate-200 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/10"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnail/Video Container */}
        <div
          className={`relative w-full overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 ${
            youtubeId ? "aspect-video" : "h-48"
          }`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}
          ></div>

          {/* Thumbnail Image - Always visible when not hovered */}
          <img
            src={project.thumbnail}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Video - Only visible on hover */}
          {youtubeId ? (
            isHovered && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0${project.videoStartTime ? `&start=${project.videoStartTime}` : ""}`}
                allow="autoplay; encrypted-media"
                style={{ border: "none" }}
              />
            )
          ) : (
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              muted
              loop
              playsInline
              preload="none"
            >
              <source src={project.video} type="video/mp4" />
            </video>
          )}

          {/* Play Icon Overlay - Hidden on hover */}
          {!isHovered && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div
                className={`p-4 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  isDarkMode ? "bg-gray-900/60" : "bg-white/60"
                }`}
              >
                <Play
                  className={`w-8 h-8 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                  fill="currentColor"
                />
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end z-20">
            {project.categories.slice(0, 2).map((category: string) => (
              <span
                key={category}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white backdrop-blur-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            className={`font-bold text-lg mb-2 line-clamp-1 transition-colors duration-300 ${
              isDarkMode
                ? "text-white group-hover:text-purple-300"
                : "text-slate-900 group-hover:text-purple-700"
            }`}
          >
            {project.title}
          </h3>

          <p
            className={`text-sm line-clamp-2 mb-3 leading-relaxed ${
              isDarkMode ? "text-gray-400" : "text-slate-600"
            }`}
          >
            {project.description}
          </p>

          {/* Tech Stack - Expandable (state persists during scroll) */}
          <div className="flex flex-wrap gap-2 mb-3">
            {(isExpanded ? project.tech : project.tech.slice(0, 3)).map(
              (tech: string) => (
                <span
                  key={tech}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    isDarkMode
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {tech}
                </span>
              )
            )}
            {project.tech.length > 3 && (
              <button
                onClick={handleToggleTechStack}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                }`}
              >
                {isExpanded ? "Show Less" : `+${project.tech.length - 3} more`}
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-700/30">
            <div
              className={`flex items-center gap-1 text-xs ${
                isDarkMode ? "text-gray-400" : "text-slate-600"
              }`}
            >
              <Calendar className="h-3 w-3" />
              <span>{project.date}</span>
            </div>
            <div className="flex gap-3">
              <Link
                href={project.demo}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                  isDarkMode
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-purple-600 hover:text-purple-700"
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Link>
              <Link
                href={project.github}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Github className="w-4 h-4" />
                Code
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-slate-50"
      }`}
    >
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`absolute top-40 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-200"
          }`}
        ></div>
        <div
          className={`absolute bottom-40 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-200"
          }`}
        ></div>
      </div>

      {/* Navbar */}
      <div className="relative z-50">
        <Navbar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          scrollY={scrollY}
          scrollToSection={scrollToSection}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-20 pb-12">
        {/* Hero Header */}
        <div className="text-center mb-8">
          <h1
            className={`text-3xl md:text-4xl font-bold mb-3 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p
            className={`text-sm md:text-base max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-slate-600"
            }`}
          >
            A showcase of my recent work in web development and AI integration
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isDarkMode ? "text-gray-400" : "text-slate-600"
              }`}
            />
            <input
              type="text"
              placeholder="Search projects..."
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm ${
                isDarkMode
                  ? "bg-gray-800/80 border-gray-700/50 text-white placeholder-gray-500"
                  : "bg-white border-slate-200 text-slate-900 placeholder-slate-500"
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`w-full sm:w-auto border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm ${
              isDarkMode
                ? "bg-gray-800/80 border-gray-700/50 text-white"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Projects Display */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div
              className={`text-lg mb-2 ${
                isDarkMode ? "text-gray-400" : "text-slate-600"
              }`}
            >
              No projects found
            </div>
            <p className={isDarkMode ? "text-gray-500" : "text-slate-500"}>
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Projects Section */}
            {featuredProjects.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Star
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <h2
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Featured Projects
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isFeatured={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Other Projects Section */}
            {otherProjects.length > 0 && (
              <div id="more-projects">
                <div className="flex items-center gap-2 mb-4">
                  <Code2
                    className={`w-5 h-5 ${
                      isDarkMode ? "text-purple-400" : "text-purple-600"
                    }`}
                  />
                  <h2
                    className={`text-xl font-bold ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    More Projects
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isFeatured={false}
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
};

export default ProjectShowcase;
