"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { Box, Feather, House, Layers, Orbit, ShoppingBag, Terminal, type LucideIcon } from "lucide-react";
import { PORTFOLIO_VIEWS, type ViewId } from "../data/views";

export const VIEW_ICONS: Record<ViewId, LucideIcon> = {
  classic: House,
  cube: Box,
  zoom: Orbit,
  terminal: Terminal,
  store: ShoppingBag,
  minimal: Feather,
};

const TRIGGER_TONES = {
  dark: "border-white/10 bg-[#0d0d16]/85 text-white/80 backdrop-blur-md hover:text-white",
  light: "border-slate-200 bg-white text-slate-700 shadow-sm hover:text-slate-900",
};

type Props = {
  /** The view this page belongs to; it's listed but not linked */
  current: ViewId;
  /** Positions the menu, e.g. "fixed top-4 right-4 z-50" */
  className?: string;
  /** Icon-only trigger; otherwise the "Views" label shows from the sm breakpoint */
  compact?: boolean;
  /** Trigger colours for a light or dark page; the panel is always dark */
  tone?: "light" | "dark";
  /** The trigger edge the panel lines up with */
  align?: "left" | "right";
  /** Opens the panel above the trigger, for menus at the bottom of the screen */
  up?: boolean;
  /** Extra panel content below the views */
  footer?: ReactNode;
  onToggle?: () => void;
};

// A glowing "Views" button that opens a list of every version of the portfolio
export default function ViewsMenu({
  current,
  className = "",
  compact,
  tone = "dark",
  align = "right",
  up,
  footer,
  onToggle,
}: Props) {
  const [open, setOpen] = useState(false);
  // Horizontal nudge that keeps the open panel on screen
  const [shift, setShift] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Measured from layout sizes (offsetWidth), which the open/close scale
  // animation doesn't affect
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const root = rootRef.current;
      const panel = panelRef.current;
      if (!root || !panel) return;
      const box = root.getBoundingClientRect();
      const width = panel.offsetWidth;
      const left = align === "right" ? box.right - width : box.left;
      const margin = 8;
      const clamped = Math.max(margin, Math.min(left, window.innerWidth - margin - width));
      setShift(clamped - left);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open, align]);

  const panelStyle = {
    "--floating-origin": `${up ? "bottom" : "top"} ${align}`,
    "--floating-closed-y": up ? "8px" : "-8px",
    transform: shift ? `translateX(${shift}px)` : undefined,
  } as CSSProperties;

  return (
    <div className={className}>
      <div ref={rootRef} className="relative">
        <span
          aria-hidden="true"
          className={`neon-halo rounded-xl ${tone === "light" ? "[--neon-opacity:0.3]" : ""}`}
        />
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            setOpen((o) => !o);
            onToggle?.();
          }}
          aria-expanded={open}
          title="Other views of this portfolio"
          className={`neon-ring relative flex items-center justify-center gap-2 rounded-xl border text-[13px] font-semibold transition-colors ${
            compact ? "size-9" : "h-9 px-3"
          } ${TRIGGER_TONES[tone]}`}
        >
          <Layers className="size-4 shrink-0" aria-hidden="true" />
          <span className={compact ? "sr-only" : "sr-only sm:not-sr-only"}>Views</span>
        </button>

        <div
          ref={panelRef}
          className={`floating-action-menu absolute z-50 w-72 max-w-[calc(100vw-1rem)] ${
            up ? "bottom-full mb-2" : "top-full mt-2"
          } ${align === "right" ? "right-0" : "left-0"} ${open ? "is-open" : "is-closed"}`}
          style={panelStyle}
        >
          {/* Solid, not frosted: inside another backdrop-filter (the home navbar
              dock) a blurred panel lets the page show through */}
          <div className="rounded-2xl border border-white/10 bg-[#0b0b13] p-1.5 text-left shadow-2xl shadow-black/40">
            <p className="px-2.5 pt-1.5 pb-1 text-[10px] font-bold tracking-[0.18em] text-white/45 uppercase">
              Explore other views
            </p>
            <ul>
              {PORTFOLIO_VIEWS.map((view) => {
                const Icon = VIEW_ICONS[view.id];
                const here = view.id === current;
                const body = (
                  <>
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-lg"
                      style={{
                        color: view.color,
                        background: `${view.color}1f`,
                        boxShadow: `0 0 14px -4px ${view.color}`,
                      }}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-[13px] font-semibold text-white">
                        {view.label}
                        {here && (
                          <span className="rounded-full bg-white/10 px-1.5 py-px text-[9px] font-bold tracking-wider text-white/60 uppercase">
                            Here
                          </span>
                        )}
                      </span>
                      <span className="block truncate text-[11px] text-white/50">{view.blurb}</span>
                    </span>
                  </>
                );
                return (
                  <li key={view.id}>
                    {here ? (
                      <div aria-current="page" className="flex items-center gap-3 rounded-xl px-2.5 py-2 opacity-60">
                        {body}
                      </div>
                    ) : (
                      <Link
                        href={view.href}
                        prefetch={view.heavy ? false : undefined}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.06]"
                      >
                        {body}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            {footer && <div className="mt-1 border-t border-white/10 px-1 pt-1.5 pb-0.5">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
