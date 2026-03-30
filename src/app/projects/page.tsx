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
import Navbar from "../components/Navbar";
import { featuredProjects as homeFeaturedProjects } from "../data/projects";

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

const featuredList = [
  {
    id: 1,
    title: homeFeaturedProjects[0].title,
    description: homeFeaturedProjects[0].description,
    image: homeFeaturedProjects[0].image,
    video: homeFeaturedProjects[0].video,
    videoStartTime: homeFeaturedProjects[0].videoStartTime,
    mediaType: homeFeaturedProjects[0].mediaType,
    tech: homeFeaturedProjects[0].tech,
    categories: ["AI/ML", "Web Development"],
    demo: homeFeaturedProjects[0].demo,
    github: homeFeaturedProjects[0].github,
    date: "2025",
  },
  {
    id: 2,
    title: homeFeaturedProjects[1].title,
    description: homeFeaturedProjects[1].description,
    image: homeFeaturedProjects[1].image,
    video: homeFeaturedProjects[1].video,
    videoStartTime: homeFeaturedProjects[1].videoStartTime,
    mediaType: homeFeaturedProjects[1].mediaType,
    tech: homeFeaturedProjects[1].tech,
    categories: ["AI/ML", "Web Development"],
    demo: homeFeaturedProjects[1].demo,
    github: homeFeaturedProjects[1].github,
    date: "2025",
  },
  {
    id: 3,
    title: homeFeaturedProjects[2].title,
    description: homeFeaturedProjects[2].description,
    image: homeFeaturedProjects[2].image,
    video: homeFeaturedProjects[2].video,
    videoStartTime: homeFeaturedProjects[2].videoStartTime,
    mediaType: homeFeaturedProjects[2].mediaType,
    tech: homeFeaturedProjects[2].tech,
    categories: ["Shopify"],
    demo: homeFeaturedProjects[2].demo,
    github: homeFeaturedProjects[2].github,
    date: "2024",
  },
];

const otherList = [
  {
    id: 4,
    title: "Data Collector Application",
    description:
      "Collects data for model training. Collects data from users and stores them in a structured format.",
    tech: ["Next.js", "Firebase"],
    categories: ["Web Development", "AI/ML"],
    demo: "https://ass-eng-chatbot.vercel.app/",
    github: "https://github.com/Rajdeep1234yyuhh/ass-eng-chatbot",
    date: "2023",
  },
  {
    id: 5,
    title: "Website to Video",
    description: "Application that converts websites to a showcased video.",
    tech: ["React", "Node.js", "Express", "ffmpeg"],
    categories: ["Web Development"],
    demo: "#",
    github: "#",
    date: "2023",
  },
  {
    id: 6,
    title: "Travel Package Landing Page",
    description: "Landing page for a Travel agency.",
    tech: ["Next.js", "Tailwind CSS", "Firebase"],
    categories: ["Web Development"],
    demo: "https://anup-ebon.vercel.app/",
    github: "https://github.com/Rajdeep1234yyuhh/anup",
    date: "2023",
  },
  {
    id: 7,
    title: "Zanera – Imitation Jewellery E-commerce Platform",
    description:
      "An online jewellery platform offering stylish and affordable imitation jewellery, including ethnic, traditional, and modern designs crafted for everyday wear and special occasions.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://zanera.in/",
    github: "#",
    date: "2025",
  },
  {
    id: 8,
    title: "The Anvik – Ethnic Jewellery E-commerce Platform",
    description:
      "An online jewellery store offering handcrafted designer earrings, jhumkas, chandbalis, and traditional jewellery sets tailored for weddings, festive occasions, and everyday wear.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://www.theanvik.com/",
    github: "#",
    date: "2025",
  },
  {
    id: 9,
    title: "Heer House of Jewellery – Handcrafted Bridal Jewellery Platform",
    description:
      "An online jewellery platform specializing in handcrafted bridal and occasion-based jewellery, offering kundan sets, anklets, earrings, and bespoke accessories designed with traditional techniques and modern aesthetics.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://heerhouseofjewellery.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 10,
    title: "Fruitful – Fruit-Based Skincare E-commerce Platform",
    description:
      "A skincare e-commerce platform offering fruit-powered, vegan, and beginner-friendly skincare products designed to simplify daily routines with clean formulations and natural ingredients.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://shopfruitful.com/",
    github: "#",
    date: "2026",
  },
  {
    id: 11,
    title: "Giisha Beauty – Ayurvedic Haircare E-commerce Platform",
    description:
      "A haircare-focused e-commerce platform offering Ayurvedic-inspired treatments like hair oils, masks, and grooming tools, combining traditional Indian rituals with modern science for healthy, glossy hair.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://www.giishabeauty.com/",
    github: "#",
    date: "2025",
  },
  {
    id: 12,
    title: "Roslyn by Demi – Women’s Fashion E-commerce Platform",
    description:
      "A fashion e-commerce platform offering chic, modern women’s clothing including dresses, co-ord sets, tops, and accessories, designed to blend elegance, comfort, and contemporary style.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://roslynbydemi.com/",
    github: "#",
    date: "2026",
  },
  {
    id: 13,
    title: "Nishorama – Gen-Z Ethnic Fashion E-commerce Platform",
    description:
      "A direct-to-consumer fashion platform offering bold, handcrafted ethnic wear like block-printed kurtis, fusion outfits, and contemporary desi styles designed for modern Gen-Z audiences.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://www.nishorama.com/",
    github: "#",
    date: "2025",
  },
  {
    id: 14,
    title: "Vintage Loom – Handcrafted Cotton Ethnic Wear Platform",
    description:
      "A fashion e-commerce platform offering handcrafted cotton ethnic wear including suit sets, kurtas, and sarees, designed with handblock printing techniques and rooted in sustainable artisan craftsmanship.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://www.vintageloom.com/",
    github: "#",
    date: "2026",
  },
  {
    id: 15,
    title: "Bloomegg – Performance Marketing & E-commerce Growth Agency",
    description:
      "A digital marketing agency specializing in performance marketing, social media advertising, and e-commerce growth strategies, helping brands scale revenue through data-driven campaigns and creative execution.",
    tech: ["JavaScript", "HTML", "CSS", "Analytics Tools", "Ad Platforms (Google, Meta)"],
    categories: ["Web Development"],
    demo: "https://bloomegg.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 16,
    title: "Aekay – Fashion Accessories & Jewellery E-commerce Platform",
    description:
      "An online fashion accessories platform offering trendy, affordable jewellery including rings, earrings, necklaces, and bracelets, designed for everyday wear with a focus on durability, style, and accessibility.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Razorpay/Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://aekay.in/",
    github: "#",
    date: "2021",
  },
  {
    id: 17,
    title: "The House of Hoor – Handcrafted Ethnic Wear E-commerce Platform",
    description:
      "A premium fashion e-commerce platform offering handcrafted ethnic wear including suit sets, anarkalis, co-ord sets, and kurtas, rooted in handblock printing and designed with a blend of traditional craftsmanship and modern elegance.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://thehouseofhoor.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 18,
    title: "Gelato Vinto – Artisanal Gelato & Dessert E-commerce Platform",
    description:
      "An online dessert platform offering authentic Italian-style artisanal gelato, gelato cakes, sorbets, and sugar-free options, crafted with natural ingredients and designed to deliver a premium dessert experience.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://www.gelatovinto.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 19,
    title: "Homebagh – Online Plants & Home Decor E-commerce Platform",
    description:
      "An e-commerce platform offering indoor and outdoor plants, planters, and gardening accessories, focused on creating greener, aesthetically pleasing living spaces with easy-to-maintain plant solutions.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://homebagh.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 20,
    title: "The Mesh Store – Trendy Women’s Fashion & Accessories E-commerce Platform",
    description:
      "A fashion e-commerce platform offering trendy women’s clothing, bags, and accessories ranging from everyday basics to party and gala outfits, with a focus on cruelty-free materials and bold, modern styles.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://themeshstore.co/",
    github: "#",
    date: "2024",
  },
  {
    id: 21,
    title: "Kapda Shop – Online Fabric & Textile Marketplace",
    description:
      "An e-commerce platform offering a wide range of premium fabrics including cotton, silk, linen, velvet, and georgette, catering to designers, boutiques, and individuals for both retail and bulk sourcing.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://kapdashop.com/",
    github: "#",
    date: "2025",
  },
  {
    id: 22,
    title: "Bombay Blossom – Handcrafted Bags & Jewellery E-commerce Platform",
    description:
      "A handcrafted fashion e-commerce platform offering artisanal bags, jewellery, and accessories made from traditional Indian textiles, recycled fabrics, and handloom techniques, promoting sustainable fashion and supporting local artisans.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://www.bombayblossom.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 23,
    title: "Armor by Smugglerz – Men’s Innerwear & Loungewear E-commerce Platform",
    description:
      "A men’s fashion e-commerce platform offering premium innerwear, boxers, trunks, and loungewear with bold prints, performance fabrics, and comfort-focused designs tailored for everyday wear.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://armorbysmugglerz.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 24,
    title: "DIY by Tok – Kids DIY Kits & Educational Toys E-commerce Platform",
    description:
      "An e-commerce platform offering creative DIY kits and educational toys for children, designed to enhance hands-on learning, creativity, and engagement through fun, activity-based experiences.",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://diybytok.com/",
    github: "#",
    date: "2024",
  },
];

const allProjects = [
  ...featuredList.map((p) => ({ ...p, featured: true })),
  ...otherList.map((p) => ({ ...p, featured: false })),
];

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
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt={domain}
        width={24}
        height={24}
        onError={() => setFailed(true)}
        className="w-6 h-6 object-contain"
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
      {/* Media */}
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
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}
      </div>

      {/* Content */}
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

const ProjectShowcase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [expandedTechStacks, setExpandedTechStacks] = useState<Set<number>>(
    new Set(),
  );
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    let frameId = 0;
    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        const nextHasScrolled = window.scrollY > 50;
        setHasScrolled((prev) =>
          prev === nextHasScrolled ? prev : nextHasScrolled,
        );
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
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

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some((t) =>
        t.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      project.categories.some((c) =>
        c.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "All" ||
      project.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const filteredFeatured = filteredProjects.filter((p) => p.featured);
  const filteredOther = filteredProjects.filter((p) => !p.featured);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-slate-50"}`}
    >
      {/* Background Decorative Elements */}
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
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          scrollY={hasScrolled ? 100 : 0}
          scrollToSection={scrollToSection}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-20 pb-16">
        {/* Page Header */}
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

        {/* Search and Filter */}
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
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-sm"
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
            <p
              className={`text-lg mb-2 ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}
            >
              No projects found
            </p>
            <p className={isDarkMode ? "text-gray-500" : "text-slate-500"}>
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Projects */}
            {filteredFeatured.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Star
                    className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                  />
                  <h2
                    className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}
                  >
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

            {/* More Projects */}
            {filteredOther.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Code2
                    className={`w-5 h-5 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
                  />
                  <h2
                    className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}
                  >
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
};

export default ProjectShowcase;
