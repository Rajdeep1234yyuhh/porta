"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { useSound } from "../context/SoundContext";
import { useMediaGate } from "./MediaGate";

// Reports when an element enters/leaves the viewport. Slides sit off-screen
// via transforms and carousel cards are clipped, so both count as not visible.
export const useInView = (
  ref: React.RefObject<Element | null>,
  onChange: (visible: boolean) => void,
  threshold = 0,
) => {
  const cb = useRef(onChange);
  cb.current = onChange;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => cb.current(entry.isIntersecting && entry.intersectionRatio >= threshold),
      { threshold: threshold > 0 ? [0, threshold] : 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
};

const subscribeVisibility = (onChange: () => void) => {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/**
 * Drives a muted preview: it plays while at least a quarter of it is on screen,
 * its MediaGate allows it and the tab is visible. It doesn't autoplay for
 * people who ask for reduced motion, and the viewer's own play/pause wins.
 */
export function usePreviewPlayback(ref: React.RefObject<Element | null>) {
  const gate = useMediaGate();
  const [onScreen, setOnScreen] = useState(false);
  useInView(ref, setOnScreen, 0.25);
  const pageVisible = useSyncExternalStore(subscribeVisibility, () => !document.hidden, () => true);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
  const [choice, setChoice] = useState<boolean | null>(null);
  const wanted = choice ?? !reducedMotion;
  return {
    shouldPlay: gate.play && onScreen && pageVisible && wanted,
    canLoad: gate.load,
    wanted,
    setWanted: setChoice,
  };
}

/** Round play/pause button centred over a preview; shows on hover while playing. */
export function PlaybackToggle({ playing, onToggle, label }: { playing: boolean; onToggle: () => void; label: string }) {
  const { playClick } = useSound();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        playClick();
        onToggle();
      }}
      aria-label={`${playing ? "Pause" : "Play"} ${label}`}
      className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${
        playing
          ? "opacity-0 scale-90 group-hover/media:opacity-100 group-hover/media:scale-100 focus-visible:opacity-100"
          : "opacity-100 scale-100"
      }`}
    >
      {playing ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
    </button>
  );
}

type LazyVideoProps = {
  src: string;
  poster?: string;
  className: string;
  /** Shows a play/pause button over the video; names the video for screen readers. */
  toggleLabel?: string;
  /** Native controls instead of the toggle (still muted and looping). */
  controls?: boolean;
};

// Muted looping preview. Nothing downloads until it first needs to play: until
// then it's an empty element showing its poster.
export const LazyVideo = ({ src, poster, className, toggleLabel, controls }: LazyVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const { shouldPlay, canLoad, wanted, setWanted } = usePreviewPlayback(ref);
  const [attached, setAttached] = useState(false);
  if (shouldPlay && !attached) setAttached(true);

  // Native controls can play/pause too; read the latest wish in their events
  const shouldPlayRef = useRef(shouldPlay);
  shouldPlayRef.current = shouldPlay;

  useEffect(() => {
    const video = ref.current;
    if (!video || !attached) return;
    if (shouldPlay) {
      video.muted = true;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shouldPlay, attached]);

  return (
    <>
      <video
        ref={ref}
        className={className}
        src={attached ? src : undefined}
        poster={canLoad ? poster : undefined}
        muted
        loop
        playsInline
        preload="none"
        controls={controls}
        disablePictureInPicture={!controls}
        disableRemotePlayback
        aria-hidden={controls ? undefined : true}
        onPlay={() => { if (!shouldPlayRef.current) setWanted(true); }}
        onPause={(e) => { if (shouldPlayRef.current && !e.currentTarget.ended) setWanted(false); }}
      />
      {toggleLabel && !controls && (
        <PlaybackToggle playing={wanted} onToggle={() => setWanted(!wanted)} label={toggleLabel} />
      )}
    </>
  );
};
