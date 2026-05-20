"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSound } from "../context/SoundContext";
import {
  Globe, Database, Code, Layers, ShoppingBag, Package,
  Bot, Cpu, Monitor, X, CheckCircle, ArrowRight, ExternalLink,
} from "lucide-react";
import { allServices } from "../data/services";

interface ServiceSectionProps {
  isDarkMode: boolean;
}

const ICON_MAP = {
  globe: Globe, database: Database, code: Code,
  layers: Layers, shoppingBag: ShoppingBag, package: Package,
  bot: Bot, cpu: Cpu, monitor: Monitor,
};

const configs = [
  { gradient: "from-violet-500 to-purple-600", glow: "rgba(124,58,237,0.25)",  border: "hover:border-violet-500/40" },
  { gradient: "from-green-500 to-emerald-600",  glow: "rgba(16,185,129,0.25)",  border: "hover:border-green-500/40"  },
  { gradient: "from-blue-500 to-cyan-500",       glow: "rgba(59,130,246,0.25)",  border: "hover:border-blue-500/40"   },
  { gradient: "from-indigo-500 to-blue-600",     glow: "rgba(99,102,241,0.25)",  border: "hover:border-indigo-500/40" },
  { gradient: "from-orange-500 to-amber-500",    glow: "rgba(245,158,11,0.25)",  border: "hover:border-orange-500/40" },
  { gradient: "from-teal-500 to-cyan-600",       glow: "rgba(20,184,166,0.25)",  border: "hover:border-teal-500/40"   },
];

const ANIM_MS = 900;

export default function ServiceSection({ isDarkMode }: ServiceSectionProps) {
  const { playClick, playHover } = useSound();
  const [activeIdx, setActiveIdx]       = useState<number | null>(null);
  const [contentVisible, setContent]    = useState(false);
  const [isClosing, setIsClosing]       = useState(false);

  const sectionRef  = useRef<HTMLElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const originRef   = useRef({ tx: 0, ty: 0, sx: 1, sy: 1 });
  const timers      = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearT = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  /* ── open ── */
  const openCard = (idx: number) => {
    if (activeIdx !== null || isClosing) return;
    const sec  = sectionRef.current;
    const card = cardRefs.current[idx];
    if (!sec || !card) return;

    const sR = sec.getBoundingClientRect();
    const cR = card.getBoundingClientRect();
    originRef.current = {
      tx: cR.left + cR.width  / 2 - (sR.left + sR.width  / 2),
      ty: cR.top  + cR.height / 2 - (sR.top  + sR.height / 2),
      sx: cR.width  / sR.width,
      sy: cR.height / sR.height,
    };
    setContent(false);
    setIsClosing(false);
    setActiveIdx(idx);
  };

  /* set CSS vars + start animation after overlay mounts */
  useEffect(() => {
    if (activeIdx === null || !overlayRef.current) return;
    clearT();
    const el = overlayRef.current;
    const { tx, ty, sx, sy } = originRef.current;
    el.style.setProperty("--tx", `${tx}px`);
    el.style.setProperty("--ty", `${ty}px`);
    el.style.setProperty("--sx", `${sx}`);
    el.style.setProperty("--sy", `${sy}`);
    el.style.animation = "none";
    void el.offsetWidth; // force reflow
    el.style.animation = `svc-open ${ANIM_MS}ms linear forwards`;
    timers.current.push(setTimeout(() => setContent(true), ANIM_MS * 0.37));
  }, [activeIdx]);

  /* ── close ── */
  const closeCard = () => {
    if (isClosing || !overlayRef.current) return;
    clearT();
    setIsClosing(true);
    setContent(false);
    const el = overlayRef.current;
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = `svc-close ${ANIM_MS}ms linear forwards`;
    timers.current.push(setTimeout(() => {
      setActiveIdx(null);
      setIsClosing(false);
    }, ANIM_MS));
  };

  const service = activeIdx !== null ? allServices[activeIdx] : null;
  const cfg     = activeIdx !== null ? configs[activeIdx] : configs[0];
  const OIcon   = service ? ICON_MAP[service.icon] : Globe;

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ perspective: "1400px" }}
      className={`h-full flex flex-col justify-center overflow-hidden relative ${
        isDarkMode ? "bg-[#141414]" : "bg-white"
      }`}
    >
      {/* ── CSS ── */}
      <style>{`
        @keyframes svc-open {
          /* Phase 1 (0→36%): flip in at card size — starts edge-on, rotates to face */
          0% {
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
            transform: translate(var(--tx), var(--ty)) scaleX(var(--sx)) scaleY(var(--sy)) rotateY(-90deg);
            border-radius: 12px;
          }
          36% {
            /* face-on at card size — content now visible */
            animation-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
            transform: translate(var(--tx), var(--ty)) scaleX(var(--sx)) scaleY(var(--sy)) rotateY(0deg);
            border-radius: 12px;
          }
          /* Phase 2 (36→100%): expand card-size to full screen */
          100% {
            transform: translate(0px, 0px) scaleX(1) scaleY(1) rotateY(0deg);
            border-radius: 0px;
          }
        }
        @keyframes svc-close {
          /* Phase 1 (0→52%): shrink full panel back to card size */
          0% {
            animation-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
            transform: translate(0px, 0px) scaleX(1) scaleY(1) rotateY(0deg);
            border-radius: 0px;
            opacity: 1;
          }
          52% {
            animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
            transform: translate(var(--tx), var(--ty)) scaleX(var(--sx)) scaleY(var(--sy)) rotateY(0deg);
            border-radius: 12px;
            opacity: 1;
          }
          /* Phase 2 (52→82%): card flips to edge at card size */
          82% {
            animation-timing-function: cubic-bezier(0, 0, 0.5, 1);
            transform: translate(var(--tx), var(--ty)) scaleX(var(--sx)) scaleY(var(--sy)) rotateY(-90deg);
            border-radius: 12px;
            opacity: 0.6;
          }
          /* Phase 3 (82→100%): unflip to face while fading out */
          100% {
            transform: translate(var(--tx), var(--ty)) scaleX(var(--sx)) scaleY(var(--sy)) rotateY(0deg);
            border-radius: 12px;
            opacity: 0;
          }
        }
        @keyframes svc-content-in {
          from { opacity:0; transform: translateY(8px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .svc-content-in { animation: svc-content-in 0.22s ease-out forwards; }
      `}</style>

      {/* ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 right-10 w-64 h-64 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-transparent" : "bg-blue-300"}`} />
        <div className={`absolute bottom-10 -left-20 w-64 h-64 rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-transparent" : "bg-purple-300"}`} />
      </div>

      {/* ── grid ── */}
      <div className="max-w-4xl mx-auto px-2 sm:px-6 w-full relative z-10 py-2 sm:py-4">
        <div className="mb-2 sm:mb-4">
          <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {allServices.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon];
            const c    = configs[i];
            return (
              <div
                key={svc.slug}
                ref={(el) => { cardRefs.current[i] = el; }}
                onClick={() => { playClick(); openCard(i); }}
                onMouseEnter={playHover}
                className={`group flex flex-col gap-2 sm:gap-3 px-3 py-3 sm:px-4 sm:py-4 rounded-xl border cursor-pointer select-none
                  transition-all duration-200 hover:shadow-lg hover:scale-[1.012]
                  ${isDarkMode ? `bg-[#1c1c1e] border-[#2a2a2a] ${c.border}` : `bg-white border-slate-200 ${c.border}`}
                  ${activeIdx !== null ? "opacity-30 pointer-events-none" : "opacity-100"}`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shadow-md bg-gradient-to-br ${c.gradient} group-hover:scale-110 group-hover:rotate-3 transition-all duration-200`}>
                    <Icon className="text-white w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h3 className={`text-xs sm:text-sm font-bold leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {svc.title}
                  </h3>
                  <ArrowRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ml-auto shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 ${isDarkMode ? "text-gray-400" : "text-slate-400"}`} />
                </div>
                <p className={`text-[10px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                  {svc.fullDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── flip overlay ── */}
      {activeIdx !== null && (
        <div
          ref={overlayRef}
          className="absolute inset-0 z-20 overflow-hidden"
          style={{
            background: isDarkMode ? "#1c1c1e" : "#ffffff",
            boxShadow: `0 32px 80px ${cfg.glow}`,
            willChange: "transform",
          }}
        >
          {contentVisible && service && (
            <div className="svc-content-in h-full flex flex-col">

              {/* header */}
              <div className="flex items-start gap-4 p-5 pb-3 shrink-0">
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br ${cfg.gradient}`}>
                  <OIcon className="text-white w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className={`text-lg font-bold leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {service.title}
                  </h2>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
                    {service.shortDescription}
                  </p>
                </div>
                <button
                  onClick={() => { playClick(); closeCard(); }}
                  className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95 ${
                    isDarkMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className={`mx-5 h-px shrink-0 ${isDarkMode ? "bg-white/8" : "bg-slate-100"}`} />

              {/* body — scrollable */}
              <div className="flex-1 overflow-y-auto p-5 pt-4 grid sm:grid-cols-2 gap-5 content-start">
                {/* description */}
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>
                    Overview
                  </p>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                    {service.fullDescription}
                  </p>
                </div>

                {/* features */}
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>
                    What&apos;s included
                  </p>
                  <ul className="space-y-1.5">
                    {service.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 text-xs ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* footer */}
              <div className={`shrink-0 flex items-center justify-between gap-3 px-5 py-3 border-t ${isDarkMode ? "border-white/8" : "border-slate-100"}`}>
                <div className="flex gap-1.5 flex-wrap">
                  {service.technologies.slice(0, 4).map((t) => (
                    <span key={t} className={`text-[10px] px-2 py-0.5 rounded-full border ${isDarkMode ? "bg-white/5 border-white/10 text-gray-400" : "bg-slate-100 border-slate-200 text-slate-500"}`}>
                      {t}
                    </span>
                  ))}
                  {service.technologies.length > 4 && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${isDarkMode ? "bg-white/5 border-white/10 text-gray-500" : "bg-slate-100 border-slate-200 text-slate-400"}`}>
                      +{service.technologies.length - 4}
                    </span>
                  )}
                </div>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={playClick}
                  className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150 hover:scale-105 active:scale-95 ${
                    isDarkMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-slate-900 hover:bg-slate-700 text-white"
                  }`}
                >
                  Full Page <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
