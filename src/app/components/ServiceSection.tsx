"use client";

import Link from "next/link";
import { Globe, Database, Code, ArrowRight } from "lucide-react";
import { allServices } from "../data/services";

interface ServiceSectionProps {
  isDarkMode: boolean;
}

const ICON_MAP = { globe: Globe, database: Database, code: Code };

const configs = [
  {
    gradient: "from-blue-500 to-cyan-500",
    border: "group-hover:border-blue-500/40 group-hover:shadow-blue-500/15",
    accent: "from-blue-500/10 to-cyan-500/10",
    hoverTitle: (isDark: boolean) => isDark ? "group-hover:text-blue-300" : "group-hover:text-blue-700",
    hoverLink: (isDark: boolean) => isDark ? "group-hover:text-blue-400" : "group-hover:text-blue-600",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    border: "group-hover:border-purple-500/40 group-hover:shadow-purple-500/15",
    accent: "from-purple-500/10 to-pink-500/10",
    hoverTitle: (isDark: boolean) => isDark ? "group-hover:text-purple-300" : "group-hover:text-purple-700",
    hoverLink: (isDark: boolean) => isDark ? "group-hover:text-purple-400" : "group-hover:text-purple-600",
  },
  {
    gradient: "from-orange-500 to-red-500",
    border: "group-hover:border-orange-500/40 group-hover:shadow-orange-500/15",
    accent: "from-orange-500/10 to-red-500/10",
    hoverTitle: (isDark: boolean) => isDark ? "group-hover:text-orange-300" : "group-hover:text-orange-700",
    hoverLink: (isDark: boolean) => isDark ? "group-hover:text-orange-400" : "group-hover:text-orange-600",
  },
];

const ServiceSection: React.FC<ServiceSectionProps> = ({ isDarkMode }) => {
  return (
    <section
      id="services"
      className={`h-full flex flex-col justify-center overflow-hidden relative ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 right-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-blue-500" : "bg-blue-300"}`} />
        <div className={`absolute bottom-10 -left-20 w-72 h-72 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-purple-500" : "bg-purple-300"}`} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-5">
        {/* Header */}
        <div className="text-center mb-6">
          <span className={`inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-2 ${isDarkMode ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-400/30" : "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-300"}`}>
            What I Offer
          </span>
          <h2 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Services</span>
          </h2>
        </div>

        {/* Horizontal cards */}
        <div className="flex flex-col gap-3">
          {allServices.map((service, index) => {
            const Icon = ICON_MAP[service.icon];
            const cfg = configs[index];
            return (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className={`group flex items-center gap-5 p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.015] ${isDarkMode ? `bg-gradient-to-r from-gray-800 to-gray-850 border-gray-700/50 ${cfg.border}` : `bg-gradient-to-r from-white to-slate-50 border-slate-200 ${cfg.border}`}`}
              >
                {/* Icon block */}
                <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br ${cfg.gradient} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="text-white w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className={`text-base font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-slate-900"} ${cfg.hoverTitle(isDarkMode)}`}>
                      {service.title}
                    </h3>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold shrink-0 transition-all duration-300 ${isDarkMode ? `text-gray-500 ${cfg.hoverLink(isDarkMode)}` : `text-slate-400 ${cfg.hoverLink(isDarkMode)}`}`}>
                      Learn more
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                    {service.shortDescription}
                  </p>
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {service.technologies.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${isDarkMode ? "bg-white/5 border-white/10 text-gray-400" : "bg-slate-100 border-slate-200 text-slate-500"}`}
                      >
                        {t}
                      </span>
                    ))}
                    {service.technologies.length > 4 && (
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${isDarkMode ? "bg-white/5 border-white/10 text-gray-500" : "bg-slate-100 border-slate-200 text-slate-400"}`}>
                        +{service.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Accent corner */}
                <div className={`absolute top-0 right-0 w-20 h-full bg-gradient-to-l ${cfg.accent} rounded-r-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
