"use client";

import { useRef } from "react";
import { testimonials, type Testimonial } from "../data/testimonials";

interface Props {
  isDarkMode: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-[#FBBC05]" : "text-slate-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function TestimonialCard({ t, isDarkMode }: { t: Testimonial; isDarkMode: boolean }) {
  return (
    <a
      href="https://share.google/kl4CoOLSq221n1mIl"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex-shrink-0 w-72 sm:w-80 rounded-2xl p-4 mx-2 flex flex-col gap-3 border transition-all cursor-pointer
        ${isDarkMode
          ? "bg-[#1c1c1e] border-white/8 hover:border-white/25 hover:bg-[#242424]"
          : "bg-white border-slate-200 hover:border-slate-400 shadow-sm hover:shadow-md"
        }`}
    >
      {/* Top row: avatar + name + Google icon */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ background: t.avatarColor }}
          >
            {t.initial}
          </div>
          <div className="min-w-0">
            <p className={`text-sm font-semibold leading-tight truncate ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              {t.name}
            </p>
            <p className={`text-[11px] truncate ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
              {t.role}
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-1 mt-0.5">
          <GoogleIcon />
        </div>
      </div>

      {/* Stars + date */}
      <div className="flex items-center gap-2">
        <StarRating rating={t.rating} />
        <span className={`text-[10px] ${isDarkMode ? "text-gray-500" : "text-slate-400"}`}>{t.date}</span>
      </div>

      {/* Review text */}
      {t.text ? (
        <p className={`text-xs leading-relaxed flex-1 ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
          &ldquo;{t.text}&rdquo;
        </p>
      ) : (
        <p className={`text-xs italic flex-1 ${isDarkMode ? "text-gray-600" : "text-slate-400"}`}>
          Left a 5-star rating
        </p>
      )}
    </a>
  );
}

function MarqueeRow({
  items,
  reverse,
  isDarkMode,
}: {
  items: Testimonial[];
  reverse: boolean;
  isDarkMode: boolean;
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex w-max"
        style={{
          animation: `${reverse ? "marquee-rev" : "marquee-fwd"} ${items.length * 6}s linear infinite`,
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} isDarkMode={isDarkMode} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialSection({ isDarkMode }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  const avgRating = (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <section
      ref={sectionRef}
      className={`h-full flex flex-col justify-center overflow-hidden relative select-none
        ${isDarkMode ? "bg-[#141414]" : "bg-white"}`}
    >
      <style>{`
        @keyframes marquee-fwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        /* Pause on hover */
        .marquee-row:hover div {
          animation-play-state: paused;
        }
      `}</style>

      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-10
          ${isDarkMode ? "bg-violet-600" : "bg-violet-300"}`} />
        <div className={`absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-10
          ${isDarkMode ? "bg-blue-600" : "bg-blue-200"}`} />
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 px-4 sm:px-8 mb-5 sm:mb-7 text-center">
        {/* Google Reviews badge */}
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full border
          border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm">
          <GoogleIcon />
          <span className={`text-xs font-semibold ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
            Google Reviews
          </span>
          <span className="flex items-center gap-0.5">
            <svg className="w-3 h-3 text-[#FBBC05]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              {avgRating}
            </span>
          </span>
        </div>

        <h2 className={`text-2xl sm:text-3xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          What Clients{" "}
          <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Say
          </span>
        </h2>
        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>
          Real reviews from real clients — no filters, no edits.
        </p>
      </div>

      {/* ── Marquee rows ── */}
      <div className="relative z-10 flex flex-col gap-3 marquee-row">
        <MarqueeRow items={row1} reverse={false} isDarkMode={isDarkMode} />
        <MarqueeRow items={row2} reverse={true}  isDarkMode={isDarkMode} />
      </div>

      {/* ── Footer ── */}
      <div className="relative z-10 text-center mt-5 sm:mt-7 px-4">
        <a
          href="https://share.google/kl4CoOLSq221n1mIl"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border
            transition-all duration-150 hover:scale-105 active:scale-95
            ${isDarkMode
              ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
        >
          <GoogleIcon />
          See all reviews on Google
          <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </section>
  );
}
