"use client";

import Image, { type ImageProps } from "next/image";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type Gate = {
  /** Media may start downloading (posters, video data). */
  load: boolean;
  /** Media may play. */
  play: boolean;
};

const MediaGateContext = createContext<Gate>({ load: true, play: true });

/**
 * Holds back the videos inside it. The home page's slide deck wraps each slide
 * so only the settled slide plays and only nearby slides load; a nested gate
 * can only narrow its parent's.
 */
export function MediaGate({ load = true, play = true, children }: Partial<Gate> & { children: ReactNode }) {
  const parent = useContext(MediaGateContext);
  const canLoad = parent.load && load;
  const canPlay = canLoad && parent.play && play;
  const value = useMemo(() => ({ load: canLoad, play: canPlay }), [canLoad, canPlay]);
  return <MediaGateContext.Provider value={value}>{children}</MediaGateContext.Provider>;
}

export const useMediaGate = () => useContext(MediaGateContext);

/** next/image that waits for its gate: off-screen slides sit within the browser's lazy-load distance. */
export function GatedImage(props: ImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text -- alt comes through props
  return useMediaGate().load ? <Image {...props} /> : null;
}
