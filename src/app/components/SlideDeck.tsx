"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { MediaGate } from "./MediaGate";

// The leaving slide moves out first; the entering one follows after a short gap
const MOVE_MS = 650;
const ENTER_DELAY_MS = 200;
const TRANSITION_MS = ENTER_DELAY_MS + MOVE_MS;
const EASE = "cubic-bezier(0.87, 0, 0.13, 1)";

// Trackpads and free-spinning wheels send a stream of wheel events per swipe,
// followed by up to ~1.5s of inertia. One stream moves one slide; a new one
// starts after a pause, or when the deltas jump back up (a fresh swipe during
// the last one's inertia).
const WHEEL_PAUSE_MS = 200;
const WHEEL_TRIGGER_PX = 30;
const SWIPE_MIN_PX = 50;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type Gesture = { last: number; total: number; spent: boolean; recent: number[] };

/** Whether a wheel/key/swipe moving content by `dy` would scroll something between `from` and `root` instead. */
function scrollsInside(from: EventTarget | null, root: Element, dy: number) {
  for (let el = from instanceof Element ? from : null; el && el !== root; el = el.parentElement) {
    if (el.scrollHeight <= el.clientHeight + 1) continue;
    const { overflowY } = getComputedStyle(el);
    if (overflowY !== "auto" && overflowY !== "scroll") continue;
    if (dy > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0) return true;
  }
  return false;
}

const isEditable = (el: Element) =>
  el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement || (el as HTMLElement).isContentEditable;

/**
 * State and input handling for a full-screen slide deck: wheel, touch and
 * keyboard move one slide at a time, explicit jumps (navbar, links) queue
 * behind a running transition, and the URL hash follows the current slide.
 */
export function useSlideDeck(ids: readonly string[]) {
  const count = ids.length;
  const [state, setState] = useState({ current: 0, from: -1, settled: true });
  // Slides whose media may load: visited ones and, once the page has loaded, their neighbours
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(() => new Set([0]));
  const [warm, setWarm] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentRef = useRef(0);
  const animating = useRef(false);
  const pending = useRef<number | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const markLoaded = useCallback(
    (index: number, withNeighbours: boolean) =>
      setLoaded((prev) => {
        const wanted = withNeighbours ? [index - 1, index, index + 1] : [index];
        if (wanted.every((i) => i < 0 || i >= count || prev.has(i))) return prev;
        const next = new Set(prev);
        for (const i of wanted) if (i >= 0 && i < count) next.add(i);
        return next;
      }),
    [count],
  );

  const goTo = useCallback(
    (target: number, { instant = false, queue = true } = {}) => {
      const index = Math.max(0, Math.min(count - 1, target));
      if (animating.current) {
        if (queue) pending.current = index;
        return;
      }
      const from = currentRef.current;
      if (index === from) return;
      currentRef.current = index;
      markLoaded(index, warm);

      // Don't leave focus stranded in a slide that's about to become inert
      if (slideRefs.current[from]?.contains(document.activeElement)) {
        slideRefs.current[index]?.focus({ preventScroll: true });
      }

      const url = index === 0 ? window.location.pathname + window.location.search : `#${ids[index]}`;
      window.history.replaceState(null, "", url);

      if (instant || window.matchMedia(REDUCED_MOTION).matches) {
        setState({ current: index, from: -1, settled: true });
        return;
      }
      animating.current = true;
      setState({ current: index, from, settled: false });
      settleTimer.current = setTimeout(() => {
        animating.current = false;
        setState((s) => ({ ...s, from: -1, settled: true }));
        const next = pending.current;
        pending.current = null;
        if (next !== null) goToRef.current(next);
      }, TRANSITION_MS);
    },
    [count, ids, markLoaded, warm],
  );
  const goToRef = useRef(goTo);
  goToRef.current = goTo;

  /** Navigates to a slide by its section id. Stable across renders. */
  const goToId = useCallback((id: string) => {
    const index = ids.indexOf(id);
    if (index !== -1) goToRef.current(index);
  }, [ids]);

  // Neighbours of the current slide start loading once the page itself has
  useEffect(() => {
    const warmUp = () => {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 300));
      idle(() => setWarm(true));
    };
    if (document.readyState === "complete") warmUp();
    else window.addEventListener("load", warmUp, { once: true });
    return () => window.removeEventListener("load", warmUp);
  }, []);
  useEffect(() => {
    if (warm) markLoaded(currentRef.current, true);
  }, [warm, markLoaded]);

  // Deep links (/#contact from other pages) and hash changes
  useEffect(() => {
    const fromHash = (instant: boolean) => {
      const index = ids.indexOf(decodeURIComponent(window.location.hash.slice(1)));
      if (index > 0) goToRef.current(index, { instant });
      else if (!window.location.hash && !instant) goToRef.current(0);
    };
    fromHash(true);
    const onHashChange = () => fromHash(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [ids]);

  useEffect(() => () => clearTimeout(settleTimer.current), []);

  // Wheel, touch and keys. Gestures are dropped (not queued) mid-transition.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const step = (dir: number) => goToRef.current(currentRef.current + dir, { queue: false });
    // An open overlay (e.g. a service's details) holds its slide in place
    const locked = () => Boolean(slideRefs.current[currentRef.current]?.querySelector("[data-slide-lock]"));

    const gesture: Gesture = { last: -Infinity, total: 0, spent: false, recent: [] };
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // trackpad pinch-zoom
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      const dy = e.deltaY * unit;
      const size = Math.abs(dy);
      const average = gesture.recent.reduce((sum, d) => sum + d, 0) / (gesture.recent.length || 1);
      if (e.timeStamp - gesture.last > WHEEL_PAUSE_MS || (gesture.recent.length >= 3 && size > Math.max(average * 2, 20))) {
        gesture.total = 0;
        gesture.spent = false;
        gesture.recent = [];
      }
      gesture.last = e.timeStamp;
      gesture.recent.push(size);
      if (gesture.recent.length > 5) gesture.recent.shift();

      if (gesture.spent || Math.abs(e.deltaX * unit) > size) return; // horizontal swipes are for carousels
      if (animating.current || locked() || scrollsInside(e.target, root, dy)) {
        gesture.spent = true;
        return;
      }
      gesture.total += dy;
      if (Math.abs(gesture.total) < WHEEL_TRIGGER_PX) return;
      gesture.spent = true;
      step(Math.sign(gesture.total));
    };

    // Whether, when the touch began, something under it could still scroll each way
    let touch: { x: number; y: number; canScrollDown: boolean; canScrollUp: boolean } | null = null;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        touch = null;
        return;
      }
      const { clientX, clientY } = e.touches[0];
      touch = {
        x: clientX,
        y: clientY,
        canScrollDown: scrollsInside(e.target, root, 1),
        canScrollUp: scrollsInside(e.target, root, -1),
      };
    };
    const onTouchEnd = (e: TouchEvent) => {
      const start = touch;
      touch = null;
      if (!start || e.touches.length) return;
      const { clientX, clientY } = e.changedTouches[0];
      const dx = clientX - start.x;
      const dy = clientY - start.y;
      // Short or mostly-sideways swipes belong to carousels and taps
      if (Math.abs(dy) < SWIPE_MIN_PX || Math.abs(dy) < Math.abs(dx) * 1.3) return;
      const dir = dy < 0 ? 1 : -1;
      if (locked() || (dir > 0 ? start.canScrollDown : start.canScrollUp)) return;
      step(dir);
    };
    const onTouchCancel = () => {
      touch = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target instanceof Element ? e.target : document.body;
      // Only keys aimed at the page or the deck (not the chat widget), and never while typing
      if ((target !== document.body && !root.contains(target)) || isEditable(target)) return;
      let dir = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown") dir = 1;
      else if (e.key === "ArrowUp" || e.key === "PageUp") dir = -1;
      else if (e.key === " " && !target.closest("a, button, summary, [role='button']")) dir = e.shiftKey ? -1 : 1;
      else if (e.key === "Home" || e.key === "End") {
        if (locked()) return;
        e.preventDefault();
        goToRef.current(e.key === "Home" ? 0 : count - 1, { queue: false });
        return;
      } else return;
      if (locked() || scrollsInside(target, root, dir)) return;
      e.preventDefault();
      step(dir);
    };

    root.addEventListener("wheel", onWheel, { passive: true });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchend", onTouchEnd, { passive: true });
    root.addEventListener("touchcancel", onTouchCancel, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchend", onTouchEnd);
      root.removeEventListener("touchcancel", onTouchCancel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [count]);

  return { ...state, count, loaded, rootRef, slideRefs, goTo, goToId, currentId: ids[state.current] };
}

export type SlideDeckState = ReturnType<typeof useSlideDeck>;

// Animations in slides that aren't showing (marquees, floating badges) stop,
// so the page goes idle instead of drawing frames nobody sees
const PAUSE_CSS = `[data-slide-paused] * { animation-play-state: paused !important; }`;

/**
 * Renders each slide in a positioned frame. Only the slide being left and the
 * one being entered animate; the rest jump straight to their side, so a jump
 * across several slides never flashes the ones in between. Hidden slides are
 * inert, and each slide's videos only play once it has settled into view.
 */
export function SlideDeck({ deck, className, style, children }: {
  deck: SlideDeckState;
  className: string;
  style?: CSSProperties;
  children: ReactNode[];
}) {
  const { current, from, settled, count, loaded, slideRefs } = deck;
  return (
    <>
      <style>{PAUSE_CSS}</style>
      {children.map((slide, i) => {
        const isCurrent = i === current;
        const moving = !settled && (isCurrent || i === from);
        // Only slides that are showing, moving or one step away keep a GPU
        // layer and get painted; the rest would each hold a full-screen layer
        // for nothing. A far jump has the enter delay to paint its target.
        const active = isCurrent || i === from || Math.abs(i - current) === 1;
        return (
          <div
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            tabIndex={-1}
            inert={!isCurrent}
            data-slide-paused={isCurrent && settled ? undefined : ""}
            className={className}
            style={{
              ...style,
              outline: "none",
              zIndex: isCurrent ? 11 : 10,
              transform: isCurrent ? "translateY(0)" : `translateY(${i < current ? "-100vh" : "100vh"})`,
              transition: moving ? `transform ${MOVE_MS}ms ${EASE} ${isCurrent ? ENTER_DELAY_MS : 0}ms` : "none",
              willChange: active ? "transform" : "auto",
              visibility: active ? "visible" : "hidden",
            }}
          >
            <MediaGate load={loaded.has(i)} play={isCurrent && settled}>
              {slide}
            </MediaGate>
          </div>
        );
      })}
    </>
  );
}
