"use client";

import Link from "next/link";
import { Globe, Database, Code, ArrowRight, Layers, ShoppingBag, Package, Bot, Cpu, Monitor } from "lucide-react";
import { allServices } from "../data/services";

interface ServiceSectionProps {
  isDarkMode: boolean;
}

const ICON_MAP = {
  globe: Globe,
  database: Database,
  code: Code,
  layers: Layers,
  shoppingBag: ShoppingBag,
  package: Package,
  bot: Bot,
  cpu: Cpu,
  monitor: Monitor,
};

const configs = [
  { gradient: "from-violet-500 to-purple-600", border: "group-hover:border-violet-500/40", title: (d: boolean) => d ? "group-hover:text-violet-300" : "group-hover:text-violet-700", text: (d: boolean) => d ? "text-violet-400/70" : "text-violet-600/60" },
  { gradient: "from-green-500 to-emerald-600", border: "group-hover:border-green-500/40", title: (d: boolean) => d ? "group-hover:text-green-300" : "group-hover:text-green-700", text: (d: boolean) => d ? "text-green-400/70" : "text-green-600/60" },
  { gradient: "from-blue-500 to-cyan-500", border: "group-hover:border-blue-500/40", title: (d: boolean) => d ? "group-hover:text-blue-300" : "group-hover:text-blue-700", text: (d: boolean) => d ? "text-blue-400/70" : "text-blue-600/60" },
  { gradient: "from-indigo-500 to-blue-600", border: "group-hover:border-indigo-500/40", title: (d: boolean) => d ? "group-hover:text-indigo-300" : "group-hover:text-indigo-700", text: (d: boolean) => d ? "text-indigo-400/70" : "text-indigo-600/60" },
  { gradient: "from-orange-500 to-amber-500", border: "group-hover:border-orange-500/40", title: (d: boolean) => d ? "group-hover:text-orange-300" : "group-hover:text-orange-700", text: (d: boolean) => d ? "text-orange-400/70" : "text-orange-600/60" },
  { gradient: "from-teal-500 to-cyan-600", border: "group-hover:border-teal-500/40", title: (d: boolean) => d ? "group-hover:text-teal-300" : "group-hover:text-teal-700", text: (d: boolean) => d ? "text-teal-400/70" : "text-teal-600/60" },
];

const ServiceSection: React.FC<ServiceSectionProps> = ({ isDarkMode }) => {
  return (
    <section
      id="services"
      className={`h-full flex flex-col justify-center overflow-hidden relative ${isDarkMode ? "bg-[#141414]" : "bg-white"}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 right-10 w-64 h-64 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-transparent" : "bg-blue-300"}`} />
        <div className={`absolute bottom-10 -left-20 w-64 h-64 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-transparent" : "bg-purple-300"}`} />
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 w-full relative z-10 py-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Services</span>
          </h2>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {allServices.map((service, index) => {
            const Icon = ICON_MAP[service.icon];
            const cfg = configs[index];
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`group flex flex-col gap-3 px-4 py-4 rounded-xl border transition-all duration-200 hover:shadow-lg hover:scale-[1.012] ${isDarkMode ? `bg-[#1c1c1e] border-[#2a2a2a] ${cfg.border}` : `bg-white border-slate-200 ${cfg.border}`}`}
              >
                {/* Icon + title row */}
                <div className="flex items-center gap-3">
                  <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center shadow-md bg-gradient-to-br ${cfg.gradient} group-hover:scale-110 group-hover:rotate-3 transition-all duration-200`}>
                    <Icon className="text-white w-4 h-4" />
                  </div>
                  <h3 className={`text-sm font-bold leading-tight ${isDarkMode ? "text-white" : "text-slate-900"} ${cfg.title(isDarkMode)}`}>
                    {service.title}
                  </h3>
                  <ArrowRight className={`w-3.5 h-3.5 ml-auto shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 ${isDarkMode ? "text-gray-400" : "text-slate-400"}`} />
                </div>

                {/* Description */}
                <p className={`text-xs leading-relaxed ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                  {service.fullDescription}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
