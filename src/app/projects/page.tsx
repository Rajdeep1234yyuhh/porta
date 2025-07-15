/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Filter,
  Search,
  Calendar,
  Eye,
} from "lucide-react";
import Link from "next/link";

const ProjectShowcase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allProjects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution built with Next.js and Shopify integration. Features include real-time inventory, payment processing, and admin dashboard.",
      fullDescription:
        "A comprehensive e-commerce platform that handles everything from product catalog management to order processing. Built with modern technologies for optimal performance and user experience.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      tech: ["Next.js", "Shopify", "Stripe", "Tailwind CSS", "TypeScript"],
      category: "E-commerce",
      demo: "#",
      github: "#",
      date: "2024",
      featured: true,
      views: "2.5k",
    },
    {
      id: 2,
      title: "AI-Powered Analytics Dashboard",
      description:
        "Modern analytics dashboard with machine learning insights. Provides predictive analytics and data visualization for business intelligence.",
      fullDescription:
        "Advanced analytics platform that uses AI to provide business insights, trend analysis, and predictive modeling for data-driven decision making.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      tech: ["React", "Python", "TensorFlow", "Chart.js", "Django"],
      category: "AI/ML",
      demo: "#",
      github: "#",
      date: "2024",
      featured: true,
      views: "1.8k",
    },
    {
      id: 3,
      title: "Custom CMS & Blog Platform",
      description:
        "Headless CMS built with Next.js and WordPress backend. Features include SEO optimization, content scheduling, and multi-author support.",
      fullDescription:
        "A modern content management system that decouples the frontend and backend for maximum flexibility and performance.",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
      tech: ["Next.js", "WordPress", "GraphQL", "MySQL", "Docker"],
      category: "Web Development",
      demo: "#",
      github: "#",
      date: "2024",
      featured: true,
      views: "3.2k",
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
      tech: ["Vue.js", "Node.js", "MongoDB", "Socket.io", "AWS"],
      category: "Web Development",
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
      category: "AI/ML",
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
      tech: ["React Native", "Firebase", "Stripe", "Node.js", "Express"],
      category: "Mobile App",
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
      category: "Web Development",
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
      category: "AI/ML",
      demo: "#",
      github: "#",
      date: "2022",
      featured: false,
      views: "1.9k",
    },
  ];

  const categories = [
    "All",
    "Web Development",
    "AI/ML",
    "E-commerce",
    "Mobile App",
  ];

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProjects = filteredProjects.filter(
    (project) => project.featured
  );
  const otherProjects = filteredProjects.filter((project) => !project.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </button>
              </Link>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">
                Project Showcase
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              {filteredProjects.length} Projects
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects or technologies..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Featured Projects
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              All Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  featured={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: any;
  featured: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {featured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 flex space-x-2">
          <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
            <Eye className="w-3 h-3 mr-1" />
            {project.views}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {project.date}
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              +{project.tech.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Live Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              <Github className="w-4 h-4 mr-1" />
              Code
            </a>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {project.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
