"use client";

import Link from "next/link";
import { PORTFOLIO_VIEWS } from "../data/views";
import { VIEW_ICONS } from "./ViewsMenu";
import { useSound } from "../context/SoundContext";

// Every other version of the portfolio (this pill lives on the classic one)
const VIEWS = PORTFOLIO_VIEWS.filter((view) => view.id !== "classic");

function ViewButtons({ isDarkMode, btnSize, liftClass, tipClass, divClass }) {
  const { playClick, playHover } = useSound();
  const dividerClass = isDarkMode ? "bg-white/10" : "bg-gray-200";
  const tooltipClass = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-slate-800 border border-slate-200";

  return (
    <>
      {VIEWS.map((view, i) => {
        const Icon = VIEW_ICONS[view.id];
        return (
          <div key={view.href} className="contents">
            {i > 0 && <div className={`w-px ${dividerClass} ${divClass}`} />}
            <Link
              href={view.href}
              // Prefetching the 3D views would download three.js on every page with this pill
              prefetch={view.heavy ? false : undefined}
              onClick={playClick}
              onMouseEnter={playHover}
              aria-label={view.label}
              style={{ "--view-color": view.color }}
              className={`group relative flex flex-col items-center justify-center ${btnSize} rounded-xl transition-all duration-200 ${
                isDarkMode
                  ? "text-gray-400 hover:text-(--view-color) hover:bg-white/10"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform duration-200 ${liftClass}`} />
              <span className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 ${tipClass} font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none rounded-md shadow ${tooltipClass}`}>
                {view.label}
              </span>
            </Link>
          </div>
        );
      })}
    </>
  );
}

/* Desktop: standalone fixed pill on the left, ringed in neon so the other
   views get noticed */
export function ViewSwitcherDesktop({ isDarkMode }) {
  return (
    <div className="fixed top-5 left-8 z-50 hidden lg:block">
      <span
        aria-hidden="true"
        className={`neon-halo rounded-2xl ${isDarkMode ? "" : "[--neon-opacity:0.3]"}`}
      />
      <nav
        aria-label="Other views of this portfolio"
        className={`neon-ring relative flex items-center gap-1 px-2 py-2 rounded-2xl shadow-2xl border transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#141414]/95 border-white/[0.08]"
            : "bg-white/95 border-gray-200/80 shadow-gray-200/60"
        }`}
      >
        {/* Label and dividers only fit beside the navbar dock from xl up */}
        <span
          className={`hidden xl:inline pl-1.5 pr-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Views
        </span>
        <ViewButtons
          isDarkMode={isDarkMode}
          btnSize="w-10 h-10"
          liftClass="group-hover:-translate-y-2"
          tipClass="text-[11px] px-2 py-0.5"
          divClass="hidden xl:block h-6 mx-1"
        />
      </nav>
    </div>
  );
}

/* Mobile: inline buttons for use inside the navbar dock */
export function ViewSwitcherMobile({ isDarkMode }) {
  return (
    <ViewButtons
      isDarkMode={isDarkMode}
      btnSize="w-9 h-9"
      liftClass="group-hover:-translate-y-1.5"
      tipClass="text-[10px] px-1.5 py-0.5"
      divClass="h-5 mx-0.5"
    />
  );
}
