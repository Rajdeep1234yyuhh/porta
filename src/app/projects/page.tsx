/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  Github,
  Filter,
  Search,
  Calendar,
  //Eye,
} from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const ProjectShowcase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll position tracking
  const [scrollY, setScrollY] = useState(0);

  // Initialize dark mode from localStorage on component mount
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

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme function
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

  // Scroll to section function (adapted for this page)
  const scrollToSection = (sectionId: string) => {
    // Close mobile menu if open
    setIsMenuOpen(false);

    // For this projects page, you might want to scroll to different sections
    // or navigate to your main portfolio page
    if (sectionId === "projects") {
      // Already on projects page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to main portfolio page with section
      // Replace '/portfolio' with your actual main page route
      window.location.href = `/#${sectionId}`;
    }
  };

  const allProjects = [
    {
      id: 1,
      title: "Career Assessment Tool",
      description:
        "AI-powered career assessment solution built with Next.js and intelligent backend integration. Features include dynamic skill evaluation, personalized career recommendations, real-time analytics dashboard, and secure user profile management.",
      //fullDescription: "",
      image: "mks.png",
      video: "mks.mp4", // Optional video
      tech: [
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "firebase",
        "python",
        "AI",
        "ML",
      ],
      categories: ["AI/ML", "Web Development", "Mobile App"], // Multiple categories
      demo: "#",
      github: "https://github.com/Rajdeep1234yyuhh/mks",
      date: "2025",
      featured: true,
      //views: "2.5k",
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      description:
        "Real-time analytics dashboard built with React and Node.js. Features include interactive data visualizations using Chart.js, secure Firebase authentication.Designed for tracking user behavior, performance metrics, and business KPIs in a sleek, responsive UI.",
      fullDescription:
        "Advanced analytics platform that uses AI to provide business insights, trend analysis, and predictive modeling for data-driven decision making.",
      //image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      video: "dashb.mp4",
      tech: ["React", "Tailwind CSS", "Node.js", "Firebase", "Chart.js"],
      categories: ["Web Development"],
      demo: "#",
      github: "https://github.com/Rajdeep1234yyuhh/Dashboard",
      date: "2025",
      featured: true,
      //views: "1.8k",
    },
    {
      id: 3,
      title: "Aekay E-commerce Website",
      description:
        "Custom e-commerce storefront developed using Shopify and Liquid. Features include responsive design, optimized product listings, seamless cart and checkout flow, and personalized UI enhancements crafted with CSS for an elegant shopping experience.",
      fullDescription:
        "A modern content management system that decouples the frontend and backend for maximum flexibility and performance.",
      //image:"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
      video: "aekay-ecom.mp4",
      tech: ["Shopify", "Liquid", "CSS"],
      categories: ["Web Development", "CMS"],
      demo: "https://aekay.in/",
      github: "#",
      date: "2024",
      featured: true,
      //views: "3.2k",
    },
    {
      id: 4,
      title: "Real Estate Management System",
      description:
        "Complete property management solution with virtual tours, client portal, and automated workflows for real estate agencies.",
      fullDescription:
        "Comprehensive real estate platform featuring property listings, virtual tours, client management, and automated marketing workflows.",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop",
      video: "https://example.com/realestate-demo.mp4",
      tech: ["Vue.js", "Node.js", "MongoDB", "Socket.io", "AWS"],
      categories: ["Web Development", "Real Estate"],
      demo: "#",
      github: "#",
      date: "2023",
      featured: false,
      views: "1.4k",
    },
    {
      id: 5,
      title: "Cryptocurrency Trading Bot",
      description:
        "Automated trading bot with machine learning algorithms for cryptocurrency markets. Features risk management and portfolio optimization.",
      fullDescription:
        "Advanced trading bot that uses machine learning to analyze market trends and execute trades automatically with built-in risk management.",
      image:
        "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=500&h=300&fit=crop",
      tech: ["Python", "TensorFlow", "Redis", "API Integration", "Docker"],
      categories: ["AI/ML", "Fintech"],
      demo: "#",
      github: "#",
      date: "2023",
      featured: false,
      views: "2.1k",
    },
    {
      id: 6,
      title: "Restaurant Ordering System",
      description:
        "Multi-platform restaurant ordering system with QR code menus, payment integration, and kitchen management dashboard.",
      fullDescription:
        "Complete restaurant solution featuring QR code menus, online ordering, payment processing, and kitchen management tools.",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
      video: "https://example.com/restaurant-demo.mp4",
      tech: ["React Native", "Firebase", "Stripe", "Node.js", "Express"],
      categories: ["Mobile App", "E-commerce"],
      demo: "#",
      github: "#",
      date: "2023",
      featured: false,
      views: "1.7k",
    },
    {
      id: 7,
      title: "Healthcare Appointment System",
      description:
        "Digital health platform connecting patients with healthcare providers. Features appointment scheduling, telemedicine, and health records.",
      fullDescription:
        "Comprehensive healthcare platform that streamlines patient care with appointment scheduling, telemedicine capabilities, and secure health records management.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop",
      tech: ["Next.js", "PostgreSQL", "WebRTC", "AWS", "HIPAA Compliant"],
      categories: ["Web Development", "Healthcare"],
      demo: "#",
      github: "#",
      date: "2023",
      featured: false,
      views: "2.8k",
    },
    {
      id: 8,
      title: "Social Media Analytics Tool",
      description:
        "AI-powered social media analytics platform that provides insights, content suggestions, and performance tracking across platforms.",
      fullDescription:
        "Advanced social media analytics tool that uses AI to analyze content performance, suggest optimal posting times, and track engagement across multiple platforms.",
      image:
        "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=500&h=300&fit=crop",
      tech: ["React", "Python", "FastAPI", "PostgreSQL", "Redis"],
      categories: ["AI/ML", "Social Media"],
      demo: "#",
      github: "#",
      date: "2022",
      featured: false,
      views: "1.9k",
    },
  ];

  // Extract all unique categories from projects
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

  const ProjectCard = ({ project }: { project: any }) => (
    <div
      className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 border ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 hover:border-gray-600"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="relative overflow-hidden">
        {project.video ? (
          <div className="relative">
            <video
              className="w-full h-48 object-cover"
              poster={project.image}
              autoPlay
              muted
              loop
            >
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
        )}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-1 mb-2">
          {project.categories.map((category: string, index: number) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full ${
                isDarkMode
                  ? "bg-blue-900 text-blue-200"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        <h3
          className={`text-xl font-bold mb-2 transition-colors ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mb-4 text-sm leading-relaxed ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.tech.map((tech: string, index: number) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div
            className={`flex items-center space-x-1 text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>{project.date}</span>
          </div>
          <div className="flex space-x-2">
            <Link
              href={project.demo}
              className="inline-flex items-center space-x-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Demo</span>
            </Link>
            <Link
              href={project.github}
              className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors text-sm ${
                isDarkMode
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              <Github className="h-3 w-3" />
              <span>Code</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Header */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollY={scrollY}
        scrollToSection={scrollToSection}
      />

      {/* Search and Filter */}
      <div
        style={{ paddingTop: 100 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <input
              type="text"
              placeholder="Search projects, technologies, or categories..."
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                isDarkMode
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-600"
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3">
            <Filter
              className={`h-5 w-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`border-2 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                isDarkMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className={
                    isDarkMode
                      ? "text-white bg-gray-800"
                      : "text-gray-900 bg-white"
                  }
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
            Showing {filteredProjects.length} of {allProjects.length} projects
          </p>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div
              className={`text-lg mb-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No projects found
            </div>
            <p className={isDarkMode ? "text-gray-500" : "text-gray-500"}>
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <div>
                <h2
                  className={`text-3xl font-bold mb-8 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Featured Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {/* Other Projects */}
            {otherProjects.length > 0 && (
              <div>
                <h2
                  className={`text-3xl font-bold mb-8 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  All Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
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
