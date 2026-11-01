"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";
import { PlaybackToggle, usePreviewPlayback } from "./LazyVideo";

const EMBED_ORIGIN = "https://www.youtube-nocookie.com";
const ENDED = 0;
const PLAYING = 1;
const BUFFERING = 3;

type PlayerMessage = { event?: string; info?: unknown };

// Reads the player state from the embed's postMessage events: onStateChange
// carries the state itself, the info deliveries an object holding it
function playerState({ event, info }: PlayerMessage): number | undefined {
  if (event === "onStateChange" && typeof info === "number") return info;
  if ((event === "infoDelivery" || event === "initialDelivery") && info && typeof info === "object") {
    const state = (info as { playerState?: unknown }).playerState;
    return typeof state === "number" ? state : undefined;
  }
  return undefined;
}

type YouTubePreviewProps = {
  videoId: string;
  startTime?: number;
  title: string;
  /** Shown until the video is actually playing */
  poster: string;
  /** `sizes` for the poster image */
  sizes: string;
  toggle?: boolean;
};

/**
 * Muted, looping YouTube video that fills its (positioned) parent like
 * object-fit: cover. The poster covers it until it plays, and while paused.
 * For the first ~4.5s of each start YouTube's title bar sits on the video;
 * holding the poster until it faded made the preview look like it wasn't playing.
 */
export function YouTubePreview({ videoId, startTime, title, poster, sizes, toggle }: YouTubePreviewProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const { shouldPlay, canLoad, wanted, setWanted } = usePreviewPlayback(boxRef);
  const [src, setSrc] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Opens the connection to YouTube ahead of time, so the player loads faster
  // once the preview may play
  if (canLoad) preconnect(EMBED_ORIGIN);

  // YouTube picks the stream quality from the player's size, so a card-sized
  // player gets a blurry 240p. Render it at about 2 device pixels per CSS
  // pixel and scale it back down.
  useEffect(() => {
    if (src || !shouldPlay) return;
    // Only load the ~1 MB player once the preview has stayed on screen a moment,
    // not for cards and slides that are just passing by
    const timer = setTimeout(() => {
      // No loop=1: it needs playlist=<id>, which adds playlist buttons and
      // video suggestions. The ENDED handler below loops instead.
      const params = new URLSearchParams({
        autoplay: "1",
        mute: "1",
        controls: "0",
        disablekb: "1",
        playsinline: "1",
        rel: "0",
        iv_load_policy: "3",
        enablejsapi: "1",
        origin: window.location.origin,
      });
      if (startTime) params.set("start", String(startTime));
      setScale(Math.max(1, Math.round(2 / (window.devicePixelRatio || 1))));
      setSrc(`${EMBED_ORIGIN}/embed/${videoId}?${params}`);
    }, 250);
    return () => clearTimeout(timer);
  }, [src, shouldPlay, videoId, startTime]);

  const send = useCallback((message: object) => {
    frameRef.current?.contentWindow?.postMessage(JSON.stringify({ ...message, id: 1, channel: "widget" }), EMBED_ORIGIN);
  }, []);

  const command = useCallback((func: string, args: unknown[] = []) => send({ event: "command", func, args }), [send]);

  // The player only talks once it's told someone is listening; repeat that
  // until it answers (it ignores messages sent before it has loaded)
  useEffect(() => {
    if (!src) return;
    let answered = false;
    let playing = false;
    const hide = () => setRevealed(false);
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frameRef.current?.contentWindow) return;
      let data: PlayerMessage;
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      answered = true;
      if (data.event === "onReady" || data.event === "initialDelivery") setReady(true);
      const state = playerState(data);
      if (state === PLAYING && !playing) {
        playing = true;
        // Muted embeds turn captions on, and every resume turns them back on
        command("unloadModule", ["captions"]);
        setRevealed(true);
      } else if (state === ENDED) {
        playing = false;
        hide();
        command("seekTo", [startTime ?? 0, true]);
        command("playVideo");
      } else if (state !== undefined && state !== PLAYING && state !== BUFFERING) {
        // Paused, cued or unstarted (buffering mid-play keeps the video up)
        playing = false;
        hide();
      }
    };
    window.addEventListener("message", onMessage);
    const hello = setInterval(() => (answered ? clearInterval(hello) : send({ event: "listening" })), 250);
    return () => {
      window.removeEventListener("message", onMessage);
      clearInterval(hello);
    };
  }, [src, send, command, startTime]);

  // Commands only work once the player is ready; until then the wish waits here.
  // Pausing shows the poster straight away rather than waiting for the report.
  useEffect(() => {
    if (!ready) return;
    command(shouldPlay ? "playVideo" : "pauseVideo");
    if (!shouldPlay) setRevealed(false);
  }, [ready, shouldPlay, command]);

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden [container-type:size]">
      {canLoad && <Image src={poster} alt="" fill sizes={sizes} className="object-cover" />}
      {src && (
        <iframe
          ref={frameRef}
          src={src}
          title={`${title} demo video`}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 border-0 transition-opacity duration-500"
          style={{
            // 16:9 box covering the container, at `scale` times the size
            width: `calc(max(100cqw, 177.78cqh) * ${scale})`,
            height: `calc(max(100cqh, 56.25cqw) * ${scale})`,
            transform: `translate(-50%, -50%) scale(${1 / scale})`,
            opacity: revealed ? 1 : 0,
          }}
        />
      )}
      {toggle && <PlaybackToggle playing={wanted} onToggle={() => setWanted(!wanted)} label={`${title} demo video`} />}
    </div>
  );
}
