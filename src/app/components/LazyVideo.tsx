"use client";

import { useEffect, useRef } from "react";

// Reports when an element enters/leaves the viewport. Slides sit off-screen
// via transforms and carousel cards are clipped, so both count as not visible.
export const useInView = (ref: React.RefObject<Element | null>, onChange: (visible: boolean) => void) => {
  const cb = useRef(onChange);
  cb.current = onChange;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => cb.current(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
};

// Muted looping preview that only downloads/plays while it is on screen
export const LazyVideo = ({ src, poster, className }: { src: string; poster?: string; className: string }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useInView(ref, (visible) => {
    const el = ref.current;
    if (!el) return;
    if (visible) {
      el.muted = true;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  });

  return (
    <video ref={ref} className={className} muted loop playsInline preload="metadata" poster={poster}>
      <source src={src} type="video/mp4" />
    </video>
  );
};
