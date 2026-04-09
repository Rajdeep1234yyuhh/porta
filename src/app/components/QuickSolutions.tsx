"use client";

import { useState } from "react";
import {
  Zap,
  CheckCircle,
  DollarSign,
  MessageCircle,
  Phone,
  ChevronDown,
} from "lucide-react";

const PHONE = "919999999999"; // replace with your number (country code + number, no +)

interface QuickSolutionsProps {
  isDarkMode: boolean;
  scrollToSection: (id: string) => void;
}

const solutions = [
  {
    title: "Bug Fix",
    description:
      "Got a broken UI, a crashing function, or a weird error? I'll diagnose and fix it fast.",
    examples: ["Runtime errors", "Layout breaks", "API failures", "Logic bugs"],
    price: "Free",
    tag: "free",
  },
  {
    title: "Code Review",
    description:
      "Send me your code and I'll review it for issues, bad patterns, and improvements.",
    examples: [
      "React components",
      "API routes",
      "DB queries",
      "Performance hints",
    ],
    price: "Free",
    tag: "free",
  },
  {
    title: "Small Feature",
    description:
      "Need a specific small feature added to your existing project? I'll build it.",
    examples: ["Auth flow", "Form validation", "Filters & search", "Dark mode"],
    price: "Negligible Fee",
    tag: "paid",
  },
  {
    title: "UI Polish",
    description:
      "Make your existing UI look cleaner and more professional with targeted tweaks.",
    examples: [
      "Responsive fixes",
      "Animation tweaks",
      "Component styling",
      "Spacing & layout",
    ],
    price: "Free",
    tag: "free",
  },
  {
    title: "API Integration",
    description:
      "Help connecting your frontend to a third-party API or setting up your own endpoints.",
    examples: ["REST APIs", "Firebase", "Stripe", "AI/LLM integrations"],
    price: "Negligible Fee",
    tag: "paid",
  },
  {
    title: "Performance Audit",
    description:
      "I'll identify what's slowing your app down and give you actionable fixes.",
    examples: [
      "Load time",
      "Bundle size",
      "Re-render issues",
      "DB query tuning",
    ],
    price: "Negligible Fee",
    tag: "paid",
  },
];

const QuickSolutions: React.FC<QuickSolutionsProps> = ({
  isDarkMode,
  scrollToSection,
}) => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section
      id="quick-solutions"
      className={`h-full py-8 relative overflow-y-auto ${
        isDarkMode ? "bg-gray-900" : "bg-emerald-50"
      }`}
    >
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px ${
            isDarkMode
              ? "bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
              : "bg-gradient-to-r from-transparent via-purple-300/60 to-transparent"
          }`}
        />
        <div
          className={`absolute -top-32 right-0 w-72 h-72 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-green-400" : "bg-green-300"
          }`}
        />
        <div
          className={`absolute bottom-0 -left-20 w-72 h-72 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-200"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-5">
          <div
            className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full border text-xs font-semibold
            bg-gradient-to-r from-green-500/10 to-emerald-500/10
            border-green-500/30 text-green-500"
          >
            <Zap className="w-3.5 h-3.5" />
            Quick Tech Help
          </div>
          <h2
            className={`text-2xl md:text-3xl font-bold mb-1 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Got a Problem?{" "}
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              Let&apos;s Solve It Fast.
            </span>
          </h2>
          <p
            className={`text-xs max-w-xl mx-auto ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}
          >
            Quick, focused help — bugs, reviews, small features &amp; more. Most
            are <span className="font-semibold text-green-500">free</span>, the
            rest cost almost nothing.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          {solutions.map((s) => (
            <div
              key={s.title}
              className={`group relative rounded-xl p-4 border transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode
                  ? "bg-gray-800/60 border-gray-700/50 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10"
                  : "bg-slate-50 border-slate-200 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-500/10"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <h3
                  className={`font-bold text-sm ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {s.title}
                </h3>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                    s.tag === "free"
                      ? "bg-green-500/15 text-green-500 border border-green-500/30"
                      : isDarkMode
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        : "bg-amber-50 text-amber-600 border border-amber-300"
                  }`}
                >
                  {s.tag === "free" ? "Free" : "~ Small Fee"}
                </span>
              </div>

              <p
                className={`text-xs leading-relaxed mb-2 ${
                  isDarkMode ? "text-gray-400" : "text-slate-600"
                }`}
              >
                {s.description}
              </p>

              <ul className="flex flex-wrap gap-x-3 gap-y-1">
                {s.examples.map((ex) => (
                  <li
                    key={ex}
                    className={`flex items-center gap-1 text-xs ${
                      isDarkMode ? "text-gray-400" : "text-slate-500"
                    }`}
                  >
                    <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legend + CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
              <span className={isDarkMode ? "text-gray-400" : "text-slate-500"}>
                Free — no payment needed
              </span>
            </span>
            <span className="flex items-center gap-2">
              <DollarSign
                className={`w-4 h-4 ${
                  isDarkMode ? "text-amber-400" : "text-amber-500"
                }`}
              />
              <span className={isDarkMode ? "text-gray-400" : "text-slate-500"}>
                Small fee — discussed upfront
              </span>
            </span>
          </div>
          <div className="flex flex-col items-end gap-3">
            {/* Single trigger button */}
            <button
              onClick={() => setContactOpen((o) => !o)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm bg-green-600 hover:bg-green-500 active:translate-y-[3px] transition-all duration-100"
              style={{ boxShadow: "0 4px 0 0 #166534" }}
            >
              <Zap className="w-4 h-4" />
              Get Help Now
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  contactOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Expanding options — each pops out of the button with stagger */}
            {contactOpen && (
              <div className="flex flex-wrap gap-3 justify-end">
                <a
                  href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20tech%20help%20with%3A%20`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    animation:
                      "popFromButton 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
                    animationDelay: "0ms",
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm
                    bg-[#25D366] hover:bg-[#1ebe5d]
                    shadow-md hover:shadow-[#25D366]/30 transition-colors duration-200 hover:scale-105"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`tel:+${PHONE}`}
                  style={{
                    animation:
                      "popFromButton 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
                    animationDelay: "90ms",
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  <Phone className="w-4 h-4" />
                  Call Me
                </a>
                <button
                  onClick={() => {
                    scrollToSection("contact");
                    setContactOpen(false);
                  }}
                  style={{
                    animation:
                      "popFromButton 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
                    animationDelay: "180ms",
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm
                    bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700
                    shadow-md hover:shadow-purple-500/30 transition-colors duration-200 hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickSolutions;
