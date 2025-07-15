"use client";

import { ExternalLink, Github, ArrowRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  image?: string;
  video?: string;
  mediaType: "image" | "video";
  tech: string[];
  demo: string;
  github: string;
}

interface ProjectSectionProps {
  isDarkMode: boolean;
  projects: Project[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  isDarkMode,
  projects,
}) => {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(
    new Set()
  );
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(
    new Set()
  );
  const [, setPlayingVideo] = useState<number | null>(null);

  const toggleProjectSkills = (index: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedProjects(newExpanded);
  };

  const toggleProjectDescription = (index: number) => {
    const newExpanded = new Set(expandedDescriptions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedDescriptions(newExpanded);
  };

  const handleVideoPlay = (index: number) => {
    setPlayingVideo(index);
  };

  const handleVideoPause = () => {
    setPlayingVideo(null);
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim();
  };

  return (
    <section
      id="projects"
      className={`py-8 min-h-screen flex items-center ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8">
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Featured Projects
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            A showcase of my recent work in web development and AI integration
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {projects.slice(0, 3).map((project, index) => {
            const isExpanded = expandedProjects.has(index);
            const isDescriptionExpanded = expandedDescriptions.has(index);
            const displayTech = isExpanded
              ? project.tech
              : project.tech.slice(0, 3);
            const hasMoreTech = project.tech.length > 3;

            const truncatedDescription = truncateText(project.description, 100);
            const shouldShowMoreButton = project.description.length > 100;

            return (
              <div
                key={index}
                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="relative w-full h-40 overflow-hidden">
                  {project.mediaType === "video" && project.video ? (
                    <div className="relative w-full h-full">
                      <video
                        className="w-full h-full object-contain"
                        muted
                        loop
                        autoPlay
                        playsInline
                        onPlay={() => handleVideoPlay(index)}
                        onPause={handleVideoPause}
                        poster={project.image}
                      >
                        <source src={project.video} type="video/mp4" />
                        <source src={project.video} type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>

                <div className="p-5">
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <div
                    className={`mb-3 text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {isDescriptionExpanded ? (
                      <div>
                        <p>{project.description}</p>
                        {shouldShowMoreButton && (
                          <button
                            onClick={() => toggleProjectDescription(index)}
                            className={`mt-2 text-sm font-medium transition-colors duration-200 ${
                              isDarkMode
                                ? "text-red-400 hover:text-red-300"
                                : "text-red-600 hover:text-red-800"
                            }`}
                          >
                            Show less
                          </button>
                        )}
                      </div>
                    ) : (
                      <p>
                        {shouldShowMoreButton
                          ? truncatedDescription
                          : project.description}
                        {shouldShowMoreButton && (
                          <button
                            onClick={() => toggleProjectDescription(index)}
                            className={`inline-flex items-center ml-1 font-medium transition-colors duration-200 ${
                              isDarkMode
                                ? "text-blue-400 hover:text-blue-300"
                                : "text-blue-600 hover:text-blue-800"
                            }`}
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        )}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {displayTech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {hasMoreTech && (
                      <button
                        onClick={() => toggleProjectSkills(index)}
                        className={`text-xs px-2 py-1 rounded-full font-medium transition-colors duration-200 ${
                          isExpanded
                            ? "bg-red-100 text-red-800 hover:bg-red-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {isExpanded
                          ? "Show Less"
                          : `+${project.tech.length - 3} more`}
                      </button>
                    )}
                  </div>

                  <div className="flex gap-3 text-sm">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center font-medium ${
                        isDarkMode
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-blue-600 hover:text-blue-800"
                      }`}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center font-medium ${
                        isDarkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/projects">
            <button
              className={`group inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              } shadow-lg hover:shadow-xl`}
            >
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
