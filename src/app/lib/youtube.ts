const YOUTUBE_ID_PATTERNS = [
  /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
  /youtu\.be\/([a-zA-Z0-9_-]+)/,
  /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
  /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
];

/** A thumbnail every video has: 480×360, letterboxed to 4:3 (the bars crop away in wide boxes). */
export const youtubeThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Extracts the video id from any common YouTube URL, or null. */
export function getYoutubeVideoId(url: string): string | null {
  for (const pattern of YOUTUBE_ID_PATTERNS) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}
