import type { Project } from "../data/projects";
import { getYoutubeVideoId, youtubeThumbnail } from "./youtube";

export type ProjectMedia =
  | { kind: "youtube"; id: string; poster: string }
  | { kind: "file"; src: string; preview: string; poster?: string }
  | { kind: "image"; src: string };

/** What fills a project's media slot: its YouTube video, self-hosted video or screenshot. */
export function projectMedia(project: Project): ProjectMedia | null {
  if (project.video) {
    const id = getYoutubeVideoId(project.video);
    if (id) return { kind: "youtube", id, poster: project.poster ?? youtubeThumbnail(id) };
    return {
      kind: "file",
      src: project.video,
      preview: project.preview ?? project.video,
      poster: project.poster ?? project.image,
    };
  }
  return project.image ? { kind: "image", src: project.image } : null;
}

/** A still for the project: its poster, YouTube thumbnail or screenshot. */
export function projectStill(project: Project): string | undefined {
  const media = projectMedia(project);
  if (!media) return undefined;
  return media.kind === "image" ? media.src : media.poster;
}
