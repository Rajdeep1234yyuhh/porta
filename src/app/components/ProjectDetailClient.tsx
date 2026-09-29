"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  GitBranch,
  MessageCircle,
  Play,
} from "lucide-react";
import Navbar from "./Navbar";
import type { Project } from "../data/projects";
import { useContact } from "../context/ContactContext";

export type ProjectLink = { slug: string; title: string; category: string };

const ACCENTS = {
  shopify: {
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.18)",
    light: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    dark: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  web: {
    gradient: "from-blue-500 to-cyan-500",
    glow: "rgba(59,130,246,0.18)",
    light: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    dark: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  ai: {
    gradient: "from-violet-500 to-purple-600",
    glow: "rgba(124,58,237,0.18)",
    light: "bg-violet-500/10 text-violet-600 border-violet-500/30",
    dark: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
};

const accentFor = (category: string) =>
  category === "Shopify" ? ACCENTS.shopify : category === "Web Development" ? ACCENTS.web : ACCENTS.ai;

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

// Shows the thumbnail and only loads YouTube's player once it's clicked.
function YouTubeFacade({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={`${title} demo video`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        style={{ border: "none" }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0"
      aria-label={`Play ${title} demo video`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={`${title} demo video`}
        fill
        unoptimized
        className="object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
        <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl transition-transform group-hover:scale-105">
          <Play className="w-6 h-6 text-slate-900 ml-1" />
        </span>
      </span>
    </button>
  );
}

interface Props {
  project: Project;
  youtubeId: string | null;
  prev: ProjectLink;
  next: ProjectLink;
  related: ProjectLink[];
}

export default function ProjectDetailClient({ project, youtubeId, prev, next, related }: Props) {
  const contact = useContact();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(localStorage.getItem("theme") === "dark");
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  const scrollToSection = (id: string) => {
    window.location.href = `/#${id}`;
  };

  const accent = accentFor(project.categories[0]);
  const cs = project.caseStudy;
  const hasDemo = project.demo !== "#";
  const hasCode = project.github !== "#";
  const localVideo =
    !youtubeId && project.mediaType === "video" && project.video ? project.video : null;
  const hasMedia = Boolean(youtubeId || localVideo || project.image);
  const isShopify = project.categories.includes("Shopify");
  const whatsappHref = `${contact.whatsappHref}?text=${encodeURIComponent(
    `Hi Rajdeep, I saw your "${project.title}" project and would like to discuss something similar.`,
  )}`;

  const label = `text-xs font-semibold uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-slate-400"}`;
  const bodyText = `text-base leading-relaxed ${isDarkMode ? "text-gray-300" : "text-slate-600"}`;
  const card = isDarkMode ? "bg-white/[0.03] border-white/[0.06]" : "bg-white border-slate-100";
  const linkCard = `rounded-xl border transition-all duration-150 hover:scale-[1.01] ${
    isDarkMode
      ? "bg-white/[0.03] border-white/[0.06] hover:border-white/[0.12]"
      : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm"
  }`;
  const divider = <div className={`h-px ${isDarkMode ? "bg-white/[0.06]" : "bg-slate-100"}`} />;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-[#111113]" : "bg-slate-50"}`}
    >
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} scrollToSection={scrollToSection} />

      {/* Hero */}
      <div className={`relative overflow-hidden pt-32 pb-12 ${isDarkMode ? "bg-[#141414]" : "bg-white"}`}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${accent.glow}, transparent)` }}
        />
        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accent.gradient}`} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link
            href="/projects"
            className={`inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors duration-150 ${
              isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.categories.map((c) => (
              <span
                key={c}
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${isDarkMode ? accent.dark : accent.light}`}
              >
                {c}
              </span>
            ))}
            <span className={`text-xs font-medium ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>
              {project.date}
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl font-bold leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            {project.title}
          </h1>
          <p className={`mt-3 text-base leading-relaxed max-w-3xl ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
            {project.description}
          </p>

          {(hasDemo || hasCode) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {hasDemo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${accent.gradient} transition-all duration-150 hover:scale-[1.03] active:scale-[0.97]`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit {hostOf(project.demo)}
                </a>
              )}
              {hasCode && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] ${
                    isDarkMode
                      ? "border-white/10 text-gray-200 hover:bg-white/5"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <GitBranch className="w-4 h-4" />
                  Source code
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {/* Media */}
        {hasMedia && (
          <div
            className={`relative w-full aspect-video rounded-2xl overflow-hidden border shadow-xl ${
              isDarkMode ? "bg-black border-white/[0.06]" : "bg-slate-900 border-slate-100"
            }`}
          >
            {youtubeId ? (
              <YouTubeFacade id={youtubeId} title={project.title} />
            ) : localVideo ? (
              <video
                className="absolute inset-0 w-full h-full object-contain"
                controls
                muted
                playsInline
                preload="metadata"
                poster={project.image}
                aria-label={`${project.title} demo video`}
              >
                <source src={localVideo} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={project.image!}
                alt={`${project.title} screenshot`}
                fill
                priority
                sizes="(min-width: 896px) 896px, 100vw"
                className="object-cover"
              />
            )}
          </div>
        )}

        {/* Overview */}
        <section>
          <h2 className={`${label} mb-3`}>Overview</h2>
          <p className={bodyText}>{cs?.overview ?? project.description}</p>
        </section>

        {cs && (
          <>
            {divider}
            <div className="grid sm:grid-cols-2 gap-4">
              <section className={`rounded-2xl border p-5 ${card}`}>
                <h2 className={`${label} mb-3`}>The Challenge</h2>
                <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                  {cs.challenge}
                </p>
              </section>
              <section className={`rounded-2xl border p-5 ${card}`}>
                <h2 className={`${label} mb-3`}>The Solution</h2>
                <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                  {cs.solution}
                </p>
              </section>
            </div>

            {divider}
            <section>
              <h2 className={`${label} mb-4`}>Results</h2>
              <ul className="space-y-3">
                {cs.results.map((r) => (
                  <li
                    key={r}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-sm ${
                      isDarkMode
                        ? "bg-white/[0.03] border-white/[0.06] text-gray-300"
                        : "bg-white border-slate-100 text-slate-700"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {divider}

        {/* Tech stack */}
        <section>
          <h2 className={`${label} mb-4`}>Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className={`text-sm font-medium px-4 py-1.5 rounded-full border ${
                  isDarkMode ? "bg-white/[0.04] border-white/[0.08] text-gray-300" : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className={`rounded-2xl border p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 ${card}`}
        >
          <div className="flex-1">
            <h2 className={`text-base font-bold mb-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              {isShopify ? "Need a Shopify store like this?" : "Want to build something like this?"}
            </h2>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
              I&apos;m available for freelance projects. Tell me what you have in mind.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#25D366] text-white transition-all duration-150 hover:scale-[1.03] active:scale-[0.97]"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <Link
              href="/#contact"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] ${
                isDarkMode ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-slate-900 text-white hover:bg-slate-700"
              }`}
            >
              Get In Touch
            </Link>
          </div>
        </section>

        {/* Previous / next */}
        <nav aria-label="Previous and next project" className="grid sm:grid-cols-2 gap-3">
          <Link href={`/projects/${prev.slug}`} className={`flex items-center gap-3 px-4 py-3 ${linkCard}`}>
            <ArrowLeft className={`w-4 h-4 shrink-0 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`} />
            <span className="min-w-0">
              <span className={`block text-[11px] uppercase tracking-wider ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>
                Previous
              </span>
              <span className={`block text-sm font-medium truncate ${isDarkMode ? "text-gray-200" : "text-slate-700"}`}>
                {prev.title}
              </span>
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className={`flex items-center justify-end gap-3 px-4 py-3 text-right ${linkCard}`}
          >
            <span className="min-w-0">
              <span className={`block text-[11px] uppercase tracking-wider ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>
                Next
              </span>
              <span className={`block text-sm font-medium truncate ${isDarkMode ? "text-gray-200" : "text-slate-700"}`}>
                {next.title}
              </span>
            </span>
            <ArrowRight className={`w-4 h-4 shrink-0 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`} />
          </Link>
        </nav>

        {/* More projects */}
        {related.length > 0 && (
          <section>
            <h2 className={`${label} mb-4`}>More Projects</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map((p) => {
                const a = accentFor(p.category);
                return (
                  <Link key={p.slug} href={`/projects/${p.slug}`} className={`flex items-center gap-3 px-4 py-3 ${linkCard}`}>
                    <span className={`shrink-0 w-2 h-8 rounded-full bg-gradient-to-b ${a.gradient}`} />
                    <span className="min-w-0">
                      <span className={`block text-sm font-medium truncate ${isDarkMode ? "text-gray-200" : "text-slate-700"}`}>
                        {p.title}
                      </span>
                      <span className={`block text-xs ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>{p.category}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
