"use client";

import Link from "next/link";
import { Box, ShoppingBag, Terminal } from "lucide-react";
import { useSound } from "../context/SoundContext";

const VIEWS = [
  {
    href: "/cube",
    label: "Cube",
    icon: Box,
    hoverClass: {
      dark: "hover:text-white hover:bg-white/10",
      light: "hover:text-gray-900 hover:bg-gray-100",
    },
  },
  {
    href: "/terminal",
    label: "Terminal",
    icon: Terminal,
    hoverClass: {
      dark: "hover:text-emerald-400 hover:bg-white/10",
      light: "hover:text-emerald-600 hover:bg-gray-100",
    },
  },
  {
    href: "/ecom",
    label: "Store",
    icon: ShoppingBag,
    hoverClass: {
      dark: "hover:text-violet-400 hover:bg-white/10",
      light: "hover:text-violet-600 hover:bg-gray-100",
    },
  },
];

function ViewButtons({ isDarkMode, btnSize, liftClass, tipClass, divClass }) {
  const { playClick, playHover } = useSound();
  const dividerClass = isDarkMode ? "bg-white/10" : "bg-gray-200";
  const tooltipClass = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-slate-800 border border-slate-200";

  return (
    <>
      {VIEWS.map((view, i) => (
        <div key={view.href} className="contents">
          {i > 0 && <div className={`w-px ${dividerClass} ${divClass}`} />}
          <Link
            href={view.href}
            onClick={playClick}
            onMouseEnter={playHover}
            className={`group relative flex flex-col items-center justify-center ${btnSize} rounded-xl transition-all duration-200 ${
              isDarkMode
                ? `text-gray-400 ${view.hoverClass.dark}`
                : `text-gray-500 ${view.hoverClass.light}`
            }`}
          >
            <view.icon className={`w-4 h-4 transition-transform duration-200 ${liftClass}`} />
            <span className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 ${tipClass} font-semibold tracking-wide whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none rounded-md shadow ${tooltipClass}`}>
              {view.label}
            </span>
          </Link>
        </div>
      ))}
    </>
  );
}

/* Desktop: standalone fixed pill on the left */
export function ViewSwitcherDesktop({ isDarkMode }) {
  return (
    <div
      className={`fixed top-5 left-8 z-50 hidden lg:flex items-center gap-1 px-2 py-2 rounded-2xl backdrop-blur-xl shadow-2xl border transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#141414]/95 border-white/[0.08]"
          : "bg-white/90 border-gray-200/80 shadow-gray-200/60"
      }`}
    >
      <ViewButtons
        isDarkMode={isDarkMode}
        btnSize="w-10 h-10"
        liftClass="group-hover:-translate-y-2"
        tipClass="text-[11px] px-2 py-0.5"
        divClass="h-6 mx-1"
      />
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
