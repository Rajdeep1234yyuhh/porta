"use client";

import Link from "next/link";
import { Globe, Database, Code, ArrowRight } from "lucide-react";
import { allServices } from "../data/services";

interface ServiceSectionProps {
  isDarkMode: boolean;
}

const ICON_MAP = { globe: Globe, database: Database, code: Code };

const configs = [
  { gradient: "from-blue-500 to-cyan-500", border: "group-hover:border-blue-500/40", title: (d: boolean) => d ? "group-hover:text-blue-300" : "group-hover:text-blue-700" },
  { gradient: "from-purple-500 to-pink-500", border: "group-hover:border-purple-500/40", title: (d: boolean) => d ? "group-hover:text-purple-300" : "group-hover:text-purple-700" },
  { gradient: "from-orange-500 to-red-500", border: "group-hover:border-orange-500/40", title: (d: boolean) => d ? "group-hover:text-orange-300" : "group-hover:text-orange-700" },
];

const ServiceSection: React.FC<ServiceSectionProps> = ({ isDarkMode }) => {
  return (
    <section
      id="services"
      className={`h-full flex flex-col justify-center overflow-hidden relative ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 right-10 w-64 h-64 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-blue-500" : "bg-blue-300"}`} />
        <div className={`absolute bottom-10 -left-20 w-64 h-64 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-purple-500" : "bg-purple-300"}`} />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full relative z-10 py-3">
        {/* Header — minimal */}
        <div className="mb-4">
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Click any service to learn more</p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-2">
          {allServices.map((service, index) => {
            const Icon = ICON_MAP[service.icon];
            const cfg = configs[index];
            return (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className={`group flex items-center gap-4 px-4 py-3 rounded-xl border transition-all duration-200 hover:shadow-lg hover:scale-[1.012] ${isDarkMode ? `bg-gray-800/60 border-gray-700/50 ${cfg.border}` : `bg-white border-slate-200 ${cfg.border}`}`}
              >
                {/* Icon */}
                <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br ${cfg.gradient} group-hover:scale-110 group-hover:rotate-3 transition-all duration-200`}>
                  <Icon className="text-white w-5 h-5" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-bold leading-tight ${isDarkMode ? "text-white" : "text-slate-900"} ${cfg.title(isDarkMode)}`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs mt-0.5 leading-snug line-clamp-1 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                    {service.shortDescription}
                  </p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {service.technologies.slice(0, 3).map((t) => (
                      <span key={t} className={`text-[10px] px-1.5 py-0.5 rounded-full border ${isDarkMode ? "bg-white/5 border-white/10 text-gray-400" : "bg-slate-100 border-slate-200 text-slate-500"}`}>{t}</span>
                    ))}
                    {service.technologies.length > 3 && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${isDarkMode ? "bg-white/5 border-white/10 text-gray-500" : "bg-slate-100 border-slate-200 text-slate-400"}`}>+{service.technologies.length - 3}</span>
                    )}
                  </div>
                </div>

                <ArrowRight className={`w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform ${isDarkMode ? "text-gray-500 group-hover:text-white" : "text-slate-300 group-hover:text-slate-700"}`} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
