"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe, Database, Code, Layers, ShoppingBag, Package,
  Bot, Cpu, Monitor, CheckCircle, ArrowLeft, ExternalLink,
} from "lucide-react";
import type { ServiceData } from "../data/services";
import { allServices } from "../data/services";
import Navbar from "./Navbar";

const ICON_MAP = {
  globe: Globe, database: Database, code: Code,
  layers: Layers, shoppingBag: ShoppingBag, package: Package,
  bot: Bot, cpu: Cpu, monitor: Monitor,
};

const configs = [
  { gradient: "from-violet-500 to-purple-600", glow: "rgba(124,58,237,0.18)", accent: "#7c3aed", light: "bg-violet-500/10 text-violet-600 border-violet-500/30", dark: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  { gradient: "from-green-500 to-emerald-600",  glow: "rgba(16,185,129,0.18)", accent: "#10b981", light: "bg-green-500/10 text-green-600 border-green-500/30",   dark: "bg-green-500/10 text-green-400 border-green-500/20"   },
  { gradient: "from-blue-500 to-cyan-500",       glow: "rgba(59,130,246,0.18)", accent: "#3b82f6", light: "bg-blue-500/10 text-blue-600 border-blue-500/30",       dark: "bg-blue-500/10 text-blue-400 border-blue-500/20"       },
  { gradient: "from-indigo-500 to-blue-600",     glow: "rgba(99,102,241,0.18)", accent: "#6366f1", light: "bg-indigo-500/10 text-indigo-600 border-indigo-500/30", dark: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
  { gradient: "from-orange-500 to-amber-500",    glow: "rgba(245,158,11,0.18)", accent: "#f59e0b", light: "bg-orange-500/10 text-orange-600 border-orange-500/30", dark: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { gradient: "from-teal-500 to-cyan-600",       glow: "rgba(20,184,166,0.18)", accent: "#14b8a6", light: "bg-teal-500/10 text-teal-600 border-teal-500/30",       dark: "bg-teal-500/10 text-teal-400 border-teal-500/20"       },
];

interface Props {
  service: ServiceData;
  index: number;
}

export default function ServiceDetailClient({ service, index }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setIsDarkMode(saved === "dark");
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (id: string) => {
    window.location.href = `/#${id}`;
  };

  const cfg = configs[index] ?? configs[0];
  const Icon = ICON_MAP[service.icon];

  const others = allServices.filter((s) => s.slug !== service.slug);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-[#111113]" : "bg-slate-50"}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} scrollToSection={scrollToSection} />

      {/* Hero */}
      <div className={`relative overflow-hidden pt-32 pb-16 ${isDarkMode ? "bg-[#141414]" : "bg-white"}`}>
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${cfg.glow}, transparent)` }}
        />
        {/* Accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${cfg.gradient}`} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link
            href="/services"
            className={`inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors duration-150 ${
              isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>

          <div className="flex items-start gap-5">
            <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl bg-gradient-to-br ${cfg.gradient}`}>
              <Icon className="text-white w-7 h-7" />
            </div>
            <div>
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-3 ${isDarkMode ? cfg.dark : cfg.light}`}>
                Service
              </span>
              <h1 className={`text-3xl sm:text-4xl font-bold leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                {service.title}
              </h1>
              <p className={`mt-2 text-base leading-relaxed max-w-2xl ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                {service.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">

        {/* Overview */}
        <section>
          <h2 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>
            Overview
          </h2>
          <p className={`text-base leading-relaxed ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
            {service.fullDescription}
          </p>
        </section>

        <div className={`h-px ${isDarkMode ? "bg-white/[0.06]" : "bg-slate-100"}`} />

        {/* Features */}
        <section>
          <h2 className={`text-xs font-semibold uppercase tracking-widest mb-4 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>
            What&apos;s included
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {service.features.map((f) => (
              <li
                key={f}
                className={`flex items-start gap-3 p-3 rounded-xl border text-sm ${
                  isDarkMode
                    ? "bg-white/[0.03] border-white/[0.06] text-gray-300"
                    : "bg-white border-slate-100 text-slate-700"
                }`}
              >
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <div className={`h-px ${isDarkMode ? "bg-white/[0.06]" : "bg-slate-100"}`} />

        {/* Technologies */}
        <section>
          <h2 className={`text-xs font-semibold uppercase tracking-widest mb-4 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>
            Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((t) => (
              <span
                key={t}
                className={`text-sm font-medium px-4 py-1.5 rounded-full border ${
                  isDarkMode
                    ? "bg-white/[0.04] border-white/[0.08] text-gray-300"
                    : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <div className={`h-px ${isDarkMode ? "bg-white/[0.06]" : "bg-slate-100"}`} />

        {/* CTA */}
        <section className={`rounded-2xl border p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 ${
          isDarkMode ? "bg-white/[0.03] border-white/[0.06]" : "bg-white border-slate-100"
        }`}>
          <div className="flex-1">
            <h3 className={`text-base font-bold mb-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Interested in {service.title}?
            </h3>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
              Let&apos;s talk about your project and see how I can help.
            </p>
          </div>
          <Link
            href="/#contact"
            className={`shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] ${
              isDarkMode ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-slate-900 text-white hover:bg-slate-700"
            }`}
          >
            Get In Touch <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* Other Services */}
        <section>
          <h2 className={`text-xs font-semibold uppercase tracking-widest mb-4 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>
            Other Services
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {others.map((s, i) => {
              const OtherIcon = ICON_MAP[s.icon];
              const otherIdx = allServices.findIndex((a) => a.slug === s.slug);
              const ocfg = configs[otherIdx] ?? configs[0];
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 hover:scale-[1.01] ${
                    isDarkMode
                      ? "bg-white/[0.03] border-white/[0.06] hover:border-white/[0.12]"
                      : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm"
                  }`}
                >
                  <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${ocfg.gradient}`}>
                    <OtherIcon className="text-white w-4 h-4" />
                  </div>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>
                    {s.title}
                  </span>
                  <ArrowLeft className={`w-3.5 h-3.5 ml-auto rotate-180 ${isDarkMode ? "text-gray-600" : "text-slate-300"}`} />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
