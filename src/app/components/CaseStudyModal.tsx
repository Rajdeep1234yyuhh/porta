"use client";

import { useEffect } from "react";
import {
  X,
  ExternalLink,
  GitBranch,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Project } from "../data/projects";

interface Props {
  project: Project | null;
  isDark: boolean;
  onClose: () => void;
}

export default function CaseStudyModal({ project, isDark, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  if (!project) return null;
  const cs = project.caseStudy;
  if (!cs) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* panel */}
      <div
        className={`relative w-full sm:max-w-2xl max-h-[90dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl animate-slide-up ${
          isDark
            ? "bg-[#18181b] border border-white/10"
            : "bg-white border border-slate-200"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isDark
              ? "bg-white/10 hover:bg-white/20 text-gray-300"
              : "bg-slate-100 hover:bg-slate-200 text-slate-600"
          }`}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* header */}
          <div className="pr-10 mb-5">
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  isDark
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "bg-purple-100 text-purple-700 border border-purple-200"
                }`}
              >
                Case Study
              </span>
              <span
                className={`text-xs flex items-center gap-1 ${
                  isDark ? "text-gray-500" : "text-slate-400"
                }`}
              >
                <Calendar className="w-3 h-3" />
                {project.date}
              </span>
            </div>
            <h2
              className={`text-xl sm:text-2xl font-bold leading-snug ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {project.title}
            </h2>
          </div>

          {/* tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className={`text-xs font-medium px-2.5 py-1 rounded-md border ${
                  isDark
                    ? "bg-blue-500/15 text-blue-300 border-blue-500/25"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          {/* sections */}
          <div className="space-y-5">
            <Section
              title="Overview"
              icon="📌"
              content={cs.overview}
              isDark={isDark}
            />
            <Divider isDark={isDark} />
            <Section
              title="The Challenge"
              icon="🎯"
              content={cs.challenge}
              isDark={isDark}
            />
            <Divider isDark={isDark} />
            <Section
              title="The Solution"
              icon="⚡"
              content={cs.solution}
              isDark={isDark}
            />
            <Divider isDark={isDark} />

            {/* results */}
            <div>
              <h3
                className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                  isDark ? "text-gray-300" : "text-slate-700"
                }`}
              >
                <span>✅</span> Key Results
              </h3>
              <ul className="space-y-2">
                {cs.results.map((r, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                      isDark ? "text-gray-300" : "text-slate-600"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        isDark ? "text-green-400" : "text-green-600"
                      }`}
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* action buttons */}
          <div
            className={`flex flex-wrap gap-3 mt-7 pt-6 border-t ${
              isDark ? "border-white/10" : "border-slate-100"
            }`}
          >
            {project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${
                  isDark
                    ? "border-white/15 text-gray-300 hover:bg-white/8"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <GitBranch className="w-4 h-4" />
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  content,
  isDark,
}: {
  title: string;
  icon: string;
  content: string;
  isDark: boolean;
}) {
  return (
    <div>
      <h3
        className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${
          isDark ? "text-gray-300" : "text-slate-700"
        }`}
      >
        <span>{icon}</span> {title}
      </h3>
      <p
        className={`text-sm leading-relaxed ${
          isDark ? "text-gray-400" : "text-slate-600"
        }`}
      >
        {content}
      </p>
    </div>
  );
}

function Divider({ isDark }: { isDark: boolean }) {
  return (
    <div className={`h-px ${isDark ? "bg-white/8" : "bg-slate-100"}`} />
  );
}
