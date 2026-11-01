"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // The home page is a fixed, slide-based layout that never scrolls the
  // window, so smooth scrolling there only costs a per-frame loop. Lenis
  // itself is only downloaded on pages that use it.
  const enabled = usePathname() !== "/";

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let rafId = 0;
    let destroy = () => {};

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      destroy = () => lenis.destroy();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      destroy();
    };
  }, [enabled]);

  return <>{children}</>;
}
