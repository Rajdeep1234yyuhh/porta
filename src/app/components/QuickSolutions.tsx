"use client";

import { Zap, CheckCircle, DollarSign, MessageCircle } from "lucide-react";

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
    examples: [
      "REST APIs",
      "Firebase",
      "Stripe",
      "AI/LLM integrations",
    ],
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
  return (
    <section
      id="quick-solutions"
      className={`py-16 relative overflow-hidden ${
        isDarkMode ? "bg-gray-950" : "bg-white"
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border text-sm font-semibold
            bg-gradient-to-r from-green-500/10 to-emerald-500/10
            border-green-500/30 text-green-500">
            <Zap className="w-4 h-4" />
            Quick Tech Help
          </div>
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Got a Problem?{" "}
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              Let&apos;s Solve It Fast.
            </span>
          </h2>
          <p
            className={`text-sm md:text-base max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-slate-600"
            }`}
          >
            I offer quick, focused technical help — bugs, reviews, small
            features, and more. Most are{" "}
            <span className="font-semibold text-green-500">completely free</span>
            , and those that aren&apos;t cost almost nothing.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {solutions.map((s) => (
            <div
              key={s.title}
              className={`group relative rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode
                  ? "bg-gray-800/60 border-gray-700/50 hover:border-green-500/40 hover:shadow-xl hover:shadow-green-500/10"
                  : "bg-slate-50 border-slate-200 hover:border-green-400/60 hover:shadow-xl hover:shadow-green-500/10"
              }`}
            >
              {/* Price badge */}
              <div className="flex items-start justify-between mb-3">
                <h3
                  className={`font-bold text-lg ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {s.title}
                </h3>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ml-2 ${
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
                className={`text-sm leading-relaxed mb-4 ${
                  isDarkMode ? "text-gray-400" : "text-slate-600"
                }`}
              >
                {s.description}
              </p>

              {/* Examples */}
              <ul className="space-y-1.5">
                {s.examples.map((ex) => (
                  <li
                    key={ex}
                    className={`flex items-center gap-2 text-xs ${
                      isDarkMode ? "text-gray-400" : "text-slate-500"
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legend + CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-2">
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
          <button
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-green-500 to-emerald-600
              hover:from-green-600 hover:to-emerald-700
              shadow-md hover:shadow-green-500/30 transition-all duration-200 hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            Request Help
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuickSolutions;
