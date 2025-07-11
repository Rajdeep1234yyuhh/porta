"use client";

import React, { useState, useEffect } from "react";
import {
  Code,
  Database,
  Globe,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const skills = [
    { name: "Next.js", level: 90, icon: "⚡" },
    { name: "React", level: 95, icon: "⚛️" },
    { name: "Shopify/Liquid", level: 85, icon: "🛍️" },
    { name: "WordPress", level: 80, icon: "📝" },
    { name: "Python", level: 75, icon: "🐍" },
    { name: "AI/ML", level: 60, icon: "🤖" },
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution built with Next.js and Shopify integration. Features include real-time inventory, payment processing, and admin dashboard.",
      tech: ["Next.js", "Shopify", "Stripe", "Tailwind CSS"],
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      demo: "#",
      github: "#",
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description:
        "Modern analytics dashboard with machine learning insights. Provides predictive analytics and data visualization for business intelligence.",
      tech: ["React", "Python", "TensorFlow", "Chart.js"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      demo: "#",
      github: "#",
    },
    {
      title: "Custom CMS & Blog Platform",
      description:
        "Headless CMS built with Next.js and WordPress backend. Features include SEO optimization, content scheduling, and multi-author support.",
      tech: ["Next.js", "WordPress", "GraphQL", "MySQL"],
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
      demo: "#",
      github: "#",
    },
  ];

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Development",
      description:
        "Custom websites and web applications using modern frameworks like Next.js and React.",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "E-commerce Solutions",
      description:
        "Shopify stores, custom e-commerce platforms, and payment gateway integrations.",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "AI/ML Integration",
      description:
        "Machine learning solutions and AI-powered features for web applications.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-blue-600">YourName</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["About", "Skills", "Projects", "Services", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 py-4">
              {["About", "Skills", "Projects", "Services", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="about"
        className="min-h-screen flex items-center bg-white relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-blue-700 font-medium text-sm">
                  Available for new projects
                </span>
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-slate-900">Web</span>{" "}
                  <span className="text-slate-900">Developer</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    & AI Engineer
                  </span>
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                  I craft exceptional digital experiences using modern
                  technologies. Specializing in Next.js, React, and AI-powered
                  web solutions that drive results.
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">50+</div>
                  <div className="text-sm text-slate-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">3+</div>
                  <div className="text-sm text-slate-600">Years Exp</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">100%</div>
                  <div className="text-sm text-slate-600">Satisfaction</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="group bg-slate-900 text-white px-8 py-4 rounded-xl hover:bg-slate-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  View My Work
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="group border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300 font-semibold flex items-center justify-center"
                >
                  Get In Touch
                  <Mail className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>

            {/* Right Content - Professional Photo + Code Editor */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative space-y-8">
                {/* Professional Photo Section */}
                <div className="relative mx-auto">
                  <div className="relative bg-white rounded-3xl p-3 shadow-2xl">
                    <img
                      src="DP.jpg"
                      alt="Your Professional Photo"
                      className="w-72 h-80 object-cover rounded-2xl"
                    />

                    {/* Status Badge */}
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      Available
                    </div>
                  </div>

                  {/* Mini Code Editor */}
                  <div className="absolute -bottom-4 -right-8 bg-slate-900 rounded-xl shadow-xl overflow-hidden w-48 h-32 border-4 border-white">
                    {/* Mini Editor Header */}
                    <div className="bg-slate-800 px-3 py-2 flex items-center space-x-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 text-center">
                        <span className="text-slate-400 text-xs font-mono">
                          skills.ts
                        </span>
                      </div>
                    </div>

                    {/* Mini Code Content */}
                    <div className="p-3 font-mono text-xs space-y-1">
                      <div className="text-purple-400">
                        const <span className="text-yellow-400">skills</span> ={" "}
                        {"{"}
                      </div>
                      <div className="ml-2 text-blue-400">
                        nextjs:{" "}
                        <span className="text-green-400">
                          &apos;expert&apos;
                        </span>
                        ,
                      </div>
                      <div className="ml-2 text-blue-400">
                        react:{" "}
                        <span className="text-green-400">
                          &apos;advanced&apos;
                        </span>
                        ,
                      </div>
                      <div className="ml-2 text-blue-400">
                        ai:{" "}
                        <span className="text-green-400">
                          &apos;growing&apos;
                        </span>
                      </div>
                      <div className="text-purple-400">{"};"}</div>
                    </div>
                  </div>
                </div>

                {/* Floating Tech Stack Cards */}
                <div className="absolute -top-6 -left-6 bg-white rounded-xl p-3 shadow-lg border border-slate-100 transform -rotate-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">⚡</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        Next.js
                      </div>
                      <div className="text-xs text-slate-500">
                        React Framework
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-12 -right-8 bg-white rounded-xl p-3 shadow-lg border border-slate-100 transform rotate-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">TS</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        TypeScript
                      </div>
                      <div className="text-xs text-slate-500">Type Safety</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 -left-8 bg-white rounded-xl p-3 shadow-lg border border-slate-100 transform -rotate-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        AI/ML
                      </div>
                      <div className="text-xs text-slate-500">
                        Python & TensorFlow
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Geometric Elements */}
                <div className="absolute -top-8 -right-16 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-10 rotate-12"></div>
                <div className="absolute -bottom-8 -left-16 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section
        id="skills"
        className="min-h-screen flex items-center bg-white py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Technologies & Expertise
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Modern tools and frameworks I use to build exceptional digital
              solutions
            </p>
          </div>

          {/* Main Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="group bg-gradient-to-br from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-200"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <span className="text-2xl">{skill.icon}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <div className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                      Expert
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Tech Stack */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Additional Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                "JavaScript",
                "HTML5",
                "CSS3",
                "Tailwind CSS",
                "Node.js",
                "MongoDB",
                "PostgreSQL",
                "Git",
                "Docker",
                "AWS",
                "Vercel",
                "Figma",
              ].map((tech) => (
                <div
                  key={tech}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-default"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A showcase of my recent work in web development and AI integration
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.demo}
                      className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      className="flex items-center text-gray-600 hover:text-gray-800 font-medium"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How I can help bring your digital vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to start your next project? I&apos;m here to help bring your
              ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <a
                  href="mailto:your@email.com"
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-6 h-6 mr-3" />
                  your@email.com
                </a>
                <div className="flex space-x-4 mt-8">
                  <a
                    href="#"
                    className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-800 p-8 rounded-xl">
                <h4 className="text-xl font-semibold mb-6">
                  Ready to start a project?
                </h4>
                <p className="text-gray-300 mb-6">
                  I&apos;m currently available for freelance work and new
                  opportunities. Let&apos;s discuss how I can help bring your
                  vision to life.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Quick turnaround time</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Modern, responsive designs</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Ongoing support & maintenance</span>
                  </div>
                </div>
                <a
                  href="mailto:your@email.com"
                  className="inline-block mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                >
                  Start a Conversation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
