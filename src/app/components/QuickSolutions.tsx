"use client";

import { useState } from "react";
import { Zap, CheckCircle, MessageCircle, Phone, ChevronDown, Gift, Wallet } from "lucide-react";

const PHONE = "919999999999";

interface QuickSolutionsProps {
  isDarkMode: boolean;
  scrollToSection: (id: string) => void;
}

const solutions = [
  { title: "Bug Fix",           examples: ["Runtime errors", "Layout breaks", "API failures", "Logic bugs"],          deal: true },
  { title: "Code Review",       examples: ["React components", "API routes", "DB queries", "Performance"],            deal: true },
  { title: "Small Feature",     examples: ["Auth flow", "Form validation", "Filters & search", "Dark mode"],          deal: false },
  { title: "UI Polish",         examples: ["Responsive fixes", "Animations", "Component styling", "Layout"],          deal: false },
  { title: "API Integration",   examples: ["REST APIs", "Firebase", "Stripe", "AI/LLM"],                             deal: false },
  { title: "Performance Audit", examples: ["Load time", "Bundle size", "Re-renders", "DB tuning"],                   deal: false },
];

const QuickSolutions: React.FC<QuickSolutionsProps> = ({ isDarkMode, scrollToSection }) => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section
      id="quick-solutions"
      className={`h-full flex flex-col justify-start sm:justify-center overflow-y-auto sm:overflow-hidden relative ${isDarkMode ? "bg-[#141414]" : "bg-emerald-50"}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 right-0 w-56 h-56 rounded-full blur-3xl opacity-10 ${isDarkMode ? "bg-transparent" : "bg-green-300"}`} />
        <div className={`absolute bottom-0 -left-16 w-56 h-56 rounded-full blur-3xl opacity-10 ${isDarkMode ? "bg-transparent" : "bg-blue-200"}`} />
      </div>

      <div className="max-w-5xl mx-auto px-2 sm:px-6 w-full relative z-10 py-3 sm:py-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2.5 sm:mb-5">
          <div className="min-w-0">
            <h2 className={`text-lg sm:text-2xl font-bold leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Got a Problem?{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Quick Fixes.</span>
            </h2>
            <p className={`text-[11px] sm:text-sm mt-0.5 leading-snug ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
              Fast help for small issues. Every quick fix has a minor charge, while some fixes can be free when they are part of an active deal.
            </p>
          </div>
          <div className="relative shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setContactOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-white text-xs sm:text-sm bg-green-600 hover:bg-green-500 transition-all duration-100"
              style={{ boxShadow: "0 3px 0 0 #166834" }}
            >
              <Zap className="w-4 h-4" />
              Get Help
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${contactOpen ? "rotate-180" : ""}`} />
            </button>
            {contactOpen && (
              <div className={`absolute right-0 top-full mt-2 flex flex-col gap-1 z-20 p-1.5 rounded-xl shadow-xl border min-w-[150px] ${isDarkMode ? "bg-[#1c1c1e] border-white/10" : "bg-white border-slate-200"}`}>
                <a href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20tech%20help%20with%3A%20`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-white bg-[#25D366] hover:bg-[#1ebe5d]">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  WhatsApp
                </a>
                <a href={`tel:+${PHONE}`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700">
                  <Phone className="w-3.5 h-3.5" /> Call Me
                </a>
                <button onClick={() => { scrollToSection("contact"); setContactOpen(false); }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${isDarkMode ? "text-gray-200 hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"}`}>
                  <MessageCircle className="w-3.5 h-3.5 text-purple-500" /> Message
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
          <div className={`flex items-center gap-1.5 sm:gap-2 rounded-xl border px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium ${isDarkMode ? "bg-white/[0.04] border-white/10 text-gray-300" : "bg-white border-emerald-200 text-slate-700"}`}>
            <Wallet className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
            Minor charges apply to quick fixes.
          </div>
          <div className={`flex items-center gap-1.5 sm:gap-2 rounded-xl border px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium ${isDarkMode ? "bg-white/[0.04] border-white/10 text-gray-300" : "bg-white border-emerald-200 text-slate-700"}`}>
            <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 shrink-0" />
            Can be free in active deals.
          </div>
        </div>

        {/* Cards - 3x2 grid, larger on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {solutions.map((s) => (
            <div
              key={s.title}
              className={`rounded-xl px-2.5 py-2.5 sm:px-5 sm:py-4 border transition-all duration-200 hover:scale-[1.02] ${isDarkMode ? "bg-[#1c1c1e] border-[#2a2a2a] hover:border-green-500/40" : "bg-white border-slate-200 hover:border-green-400/60"}`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2.5">
                <h3 className={`min-w-0 font-bold text-[12px] sm:text-base leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>{s.title}</h3>
                <span
                  aria-label={s.deal ? "Can be free in active deals" : "Minor charge applies"}
                  title={s.deal ? "Can be free in active deals" : "Minor charge applies"}
                  className={`inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full shrink-0 ${s.deal ? "bg-green-500/15 text-green-500 border border-green-500/30" : isDarkMode ? "bg-amber-500/15 text-amber-400 border border-amber-500/30" : "bg-amber-50 text-amber-600 border border-amber-300"}`}
                >
                  {s.deal ? <Gift className="w-3.5 h-3.5" /> : <Wallet className="w-3.5 h-3.5" />}
                </span>
              </div>
              <ul className="flex flex-col gap-0.5 sm:gap-1.5">
                {s.examples.map((ex, i) => (
                  <li key={ex} className={`${i > 2 ? "hidden sm:flex" : "flex"} items-center gap-1 sm:gap-1.5 text-[10px] sm:text-sm leading-snug ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                    <CheckCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-green-500 shrink-0" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickSolutions;
