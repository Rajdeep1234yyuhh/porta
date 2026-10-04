import Image from "next/image";
import { Bot, Code, Cpu, Database, Globe, Layers, Monitor, Package, ShoppingBag } from "lucide-react";
import type { Project } from "../../data/projects";
import type { ServiceData } from "../../data/services";
import { LazyVideo } from "../../components/LazyVideo";
import { getYoutubeVideoId } from "../../lib/youtube";
import { projectHost, projectName } from "../catalog";

export const SERVICE_ICONS = {
  globe: Globe,
  database: Database,
  code: Code,
  layers: Layers,
  shoppingBag: ShoppingBag,
  package: Package,
  bot: Bot,
  cpu: Cpu,
  monitor: Monitor,
};

// Projects without a screenshot get a "box art" tile in one of these
const TILE_GRADIENTS = [
  "from-violet-600 to-indigo-700",
  "from-rose-500 to-pink-700",
  "from-emerald-500 to-teal-700",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-blue-700",
  "from-fuchsia-500 to-purple-700",
];

const PRODUCT_GRADIENTS: Record<string, string> = {
  "custom-saas": "from-indigo-500 via-violet-600 to-purple-700",
  "web-applications": "from-sky-500 via-blue-600 to-indigo-700",
  "ecommerce-solutions": "from-emerald-500 via-teal-600 to-cyan-700",
  websites: "from-amber-400 via-orange-500 to-rose-600",
  "ai-ml-solutions": "from-fuchsia-500 via-purple-600 to-indigo-700",
  "technical-solutions": "from-slate-600 via-slate-700 to-slate-900",
};

/** A project's picture: its screenshot, video or YouTube thumbnail, else a name tile. Fills its parent. */
export function ProjectVisual({
  project,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority,
}: {
  project: Project;
  sizes?: string;
  /** Set on the page's main (above-the-fold) image */
  priority?: boolean;
}) {
  const youtubeId = project.video ? getYoutubeVideoId(project.video) : null;
  const src = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : project.image;
  if (src) {
    return <Image src={src} alt="" fill sizes={sizes} priority={priority} className="object-cover" unoptimized={Boolean(youtubeId)} />;
  }
  if (project.mediaType === "video" && project.video) {
    return <LazyVideo src={project.video} className="absolute inset-0 h-full w-full object-cover" />;
  }

  const { name } = projectName(project);
  const host = projectHost(project);
  return (
    <div className={`@container absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br p-4 text-center text-white ${TILE_GRADIENTS[project.id % TILE_GRADIENTS.length]}`}>
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_45%),radial-gradient(circle_at_80%_90%,white_0,transparent_35%)]" />
      <span className="relative text-[clamp(1rem,7cqw,2.75rem)] font-black leading-tight tracking-tight [text-wrap:balance]">{name}</span>
      {host && <span className="relative mt-1.5 text-[11px] font-medium tracking-wide text-white/80">{host}</span>}
    </div>
  );
}

/** A product's picture: its service icon on a gradient. Fills its parent. */
export function ProductVisual({ service, large }: { service: ServiceData; large?: boolean }) {
  const Icon = SERVICE_ICONS[service.icon];
  return (
    <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${PRODUCT_GRADIENTS[service.slug] ?? TILE_GRADIENTS[0]}`}>
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_25%_15%,white_0,transparent_40%)]" />
      <div className={`relative flex items-center justify-center rounded-3xl bg-white/15 ring-1 ring-white/30 backdrop-blur-sm ${large ? "h-32 w-32" : "h-20 w-20"}`}>
        <Icon className={`text-white ${large ? "h-16 w-16" : "h-10 w-10"}`} strokeWidth={1.6} />
      </div>
    </div>
  );
}
