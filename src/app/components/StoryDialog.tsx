"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight, Download, Mail, X } from "lucide-react";
import { useSound } from "../context/SoundContext";
import { PROFILE, STORY } from "../data/profile";

interface StoryDialogProps {
  open: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  /** Closes the story and moves to a home-page section */
  onNavigate: (sectionId: string) => void;
}

/**
 * "My story": the timeline behind the hero's short teaser. A native <dialog>,
 * so Escape, focus trapping and handing focus back to the opening button come
 * built in. While open it carries data-slide-lock, which pauses the slide
 * deck's wheel/swipe/arrow navigation so scrolling the story doesn't change slides.
 */
export default function StoryDialog({ open, onClose, isDarkMode, onNavigate }: StoryDialogProps) {
  const { playClick } = useSound();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => {
    playClick();
    onClose();
  };
  const go = (sectionId: string) => {
    playClick();
    onNavigate(sectionId);
  };

  const muted = isDarkMode ? "text-gray-400" : "text-slate-600";
  const accent = isDarkMode ? "text-teal-400" : "text-teal-600";
  const line = isDarkMode ? "border-white/[0.08]" : "border-slate-200";
  const outlineBtn = `inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border text-xs font-semibold transition-colors duration-200 ${
    isDarkMode ? "border-white/15 text-gray-300 hover:text-white hover:border-white/30" : "border-slate-200 text-slate-700 hover:border-slate-400"
  }`;
  const last = STORY.chapters.length - 1;

  return (
    <dialog
      ref={ref}
      aria-labelledby="story-title"
      data-slide-lock={open ? "" : undefined}
      // Escape closes the dialog natively; keep the parent's state in step
      onClose={onClose}
      // A click on the dialog box itself (not its content) is a click on the backdrop
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      className={`m-auto w-[min(640px,calc(100%-2rem))] max-h-[min(85dvh,760px)] overflow-hidden rounded-2xl border p-0 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm transition-[opacity,translate] duration-200 ease-out starting:opacity-0 starting:translate-y-3 motion-reduce:transition-none ${
        isDarkMode ? "bg-[#141414] border-white/[0.08] text-white" : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      <div className="flex max-h-[inherit] flex-col">
        <header className={`flex shrink-0 items-center gap-3 border-b px-5 py-4 sm:px-6 ${line}`}>
          <Image
            src={PROFILE.photo}
            alt=""
            width={80}
            height={80}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className={`text-[10px] font-semibold uppercase tracking-widest ${accent}`}>My story</p>
            <h2 id="story-title" className="text-base font-bold leading-tight sm:text-lg">
              From client websites to AI products
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close my story"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-150 ${
              isDarkMode ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
          <p className={`text-sm leading-relaxed ${muted}`}>{STORY.intro}</p>

          <ol className="mt-6">
            {STORY.chapters.map((chapter, i) => (
              <li key={chapter.year} className="flex gap-3">
                <span className={`w-11 shrink-0 pt-px text-right font-mono text-xs font-semibold ${accent}`}>
                  {chapter.year}
                </span>
                {/* Dot, and the line down to the next chapter */}
                <span className="relative flex w-3 shrink-0 justify-center" aria-hidden="true">
                  <span className={`mt-1 h-2.5 w-2.5 rounded-full ring-4 ${isDarkMode ? "bg-teal-400 ring-teal-400/15" : "bg-teal-500 ring-teal-500/15"}`} />
                  {i < last && (
                    <span className={`absolute top-5 -bottom-1 w-px ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`} />
                  )}
                </span>
                <div className={`min-w-0 flex-1 ${i < last ? "pb-6" : ""}`}>
                  <h3 className="text-sm font-semibold leading-snug">{chapter.title}</h3>
                  <p className={`mt-1 text-[13px] leading-relaxed ${muted}`}>{chapter.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <footer className={`flex shrink-0 flex-wrap items-center gap-2 border-t px-5 py-4 sm:px-6 ${line}`}>
          <button
            type="button"
            onClick={() => go("projects")}
            className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-xs font-semibold transition-colors duration-200 ${
              isDarkMode ? "bg-teal-400/15 text-teal-300 hover:bg-teal-400/25" : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
          >
            See my work <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go("contact")} className={outlineBtn}>
            <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Get in touch
          </button>
          {/* Phones keep the footer to one row; the hero's own Resume button is right behind the dialog */}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={playClick} className={`${outlineBtn} max-sm:hidden`}>
            Resume <Download className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </footer>
      </div>
    </dialog>
  );
}
