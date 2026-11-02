"use client";

import Link from "next/link";
import { Children, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  AppWindow, ArrowUpRight, BookOpen, Bot, Check, FlaskConical, Languages,
  ShoppingBag, Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useSound } from "../context/SoundContext";
import { allProjects, type Project } from "../data/projects";
import { projectMedia, projectStill } from "../lib/project-media";
import { LazyVideo } from "./LazyVideo";
import { GatedImage } from "./MediaGate";
import { YouTubePreview } from "./YouTubePreview";

/* The home page shows projects on three slides: live client work, personal
   (AI/ML) projects and Shopify stores. A project's `showcase` picks its slide. */

interface SlideProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
}

const liveProjects     = allProjects.filter((p) => p.showcase === "live");
const personalProjects = allProjects.filter((p) => p.showcase === "personal");
const shopifyProjects  = allProjects.filter((p) => p.showcase === "shopify");

const PROJECT_SLIDES = [
  { id: "projects",          label: "Live",     count: liveProjects.length },
  { id: "personal-projects", label: "Personal", count: personalProjects.length },
  { id: "shopify-projects",  label: "Shopify",  count: shopifyProjects.length },
];

/** Section ids of the project slides, in slide order. */
export const PROJECT_SLIDE_IDS = PROJECT_SLIDES.map((s) => s.id);

// Projects use "#" for a demo or repo that isn't public
const isLink = (url: string) => /^https?:\/\//.test(url);
const hostOf = (url: string) => (isLink(url) ? new URL(url).hostname.replace(/^www\./, "") : "");

// Stand-in artwork for projects without a screenshot or video
const MediaPlaceholder = ({ project, isDarkMode }: { project: Project; isDarkMode: boolean }) => {
  const Icon = project.categories.includes("NLP") ? Languages
    : project.categories.includes("AI/ML") ? Bot
    : AppWindow;
  return (
    <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${isDarkMode ? "from-violet-950 via-[#17151f] to-fuchsia-950" : "from-violet-100 via-white to-fuchsia-100"}`}>
      <div
        className={`absolute inset-0 ${isDarkMode ? "text-white/[0.06]" : "text-violet-900/[0.08]"}`}
        style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "14px 14px" }}
      />
      <span className="relative w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30">
        <Icon className="w-7 h-7 text-white" aria-hidden="true" />
      </span>
    </div>
  );
};

// Fills the card's positioned media box (which carries `group/media` for the play/pause toggle)
const CardMedia = ({ project, sizes, isDarkMode }: { project: Project; sizes: string; isDarkMode: boolean }) => {
  const name = project.name ?? project.title;
  const media = projectMedia(project);

  if (!media) return <MediaPlaceholder project={project} isDarkMode={isDarkMode} />;
  if (media.kind === "youtube") {
    return <YouTubePreview videoId={media.id} startTime={project.videoStartTime} title={name} poster={media.poster} sizes={sizes} toggle />;
  }
  if (media.kind === "file") {
    return <LazyVideo className="absolute inset-0 w-full h-full object-cover" src={media.preview} poster={media.poster} toggleLabel={`${name} preview`} />;
  }
  return (
    <GatedImage
      src={media.src}
      alt={`${name} screenshot`}
      fill
      sizes={sizes}
      className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]"
    />
  );
};

const LiveDot = () => (
  <span className="relative flex w-1.5 h-1.5 shrink-0">
    <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
  </span>
);

const MediaBadge = ({ children }: { children: ReactNode }) => (
  <span className="absolute top-2.5 left-2.5 z-10 max-w-[calc(100%-1.25rem)] inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/65 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wide pointer-events-none">
    {children}
  </span>
);

const Highlights = ({ items, iconCls, textCls }: { items: string[]; iconCls: string; textCls: string }) => (
  <ul className="space-y-1 tiny:hidden">
    {items.map((item, i) => (
      // Short screens keep the first two points so the cards still fit
      <li key={item} className={`flex items-start gap-1.5 text-[11px] sm:text-xs leading-snug ${textCls} ${i > 1 ? "short:hidden" : ""}`}>
        <Check className={`w-3 h-3 mt-0.5 shrink-0 ${iconCls}`} strokeWidth={3} aria-hidden="true" />
        {item}
      </li>
    ))}
  </ul>
);

// A single row of chips: any that would wrap onto a second row are clipped.
// `visibleCls` sets when the row shows (its display), e.g. "flex short:hidden".
const TechChips = ({ tech, chipCls, visibleCls }: { tech: string[]; chipCls: string; visibleCls: string }) => (
  <div className={`flex-wrap gap-1 h-[18px] overflow-hidden ${visibleCls}`}>
    {tech.map((t) => (
      <span key={t} className={`text-[10px] font-medium leading-4 px-1.5 rounded border ${chipCls}`}>{t}</span>
    ))}
  </div>
);

const ProjectLinks = ({ project, demoLabel, isDarkMode }: { project: Project; demoLabel: string; isDarkMode: boolean }) => {
  const { playClick } = useSound();
  const btn = "inline-flex items-center justify-center gap-1 sm:gap-1.5 h-8 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors duration-200";
  const pad = "px-2.5 sm:px-3";
  const outline = `border ${isDarkMode ? "border-white/15 text-gray-300 hover:text-white hover:border-white/30" : "border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400"}`;

  return (
    // Wraps only as a last resort, on the narrowest phones
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
      {isLink(project.demo) && (
        <a
          href={project.demo} target="_blank" rel="noopener noreferrer" onClick={playClick}
          className={`${btn} ${pad} ${isDarkMode ? "bg-white text-gray-900 hover:bg-gray-200" : "bg-slate-900 text-white hover:bg-slate-700"}`}
        >
          {demoLabel} <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      )}
      {project.caseStudy && (
        <Link href={`/projects/${project.slug}`} onClick={playClick} className={`${btn} ${pad} ${outline}`}>
          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" /> Case study
        </Link>
      )}
      {isLink(project.github) && (
        <a
          href={project.github} target="_blank" rel="noopener noreferrer" onClick={playClick}
          aria-label={`${project.name ?? project.title} source code on GitHub`} title="Source code"
          className={`${btn} ${outline} w-8`}
        >
          <FaGithub className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
    </div>
  );
};

/* Cards stack the media on top of the text. Live cards are only used below lg
   (desktop shows LiveShowcase instead), so their media keeps a video shape. */
const ProjectCard = ({ project, variant, isDarkMode }: { project: Project; variant: "live" | "personal"; isDarkMode: boolean }) => {
  const { playHover } = useSound();
  const live = variant === "live";
  const host = hostOf(project.demo);

  const kindCls = live
    ? isDarkMode ? "text-blue-400" : "text-blue-600"
    : isDarkMode ? "text-violet-400" : "text-violet-600";
  const hoverCls = live
    ? isDarkMode ? "hover:border-blue-500/40 hover:shadow-blue-500/10" : "hover:border-blue-300 hover:shadow-blue-500/10"
    : isDarkMode ? "hover:border-violet-500/40 hover:shadow-violet-500/10" : "hover:border-violet-300 hover:shadow-violet-500/10";
  const chipCls = live
    ? isDarkMode ? "bg-blue-500/10 text-blue-300 border-blue-500/20" : "bg-blue-50 text-blue-700 border-blue-200"
    : isDarkMode ? "bg-violet-500/10 text-violet-300 border-violet-500/20" : "bg-violet-50 text-violet-700 border-violet-200";

  const badge = live && host ? (
    <><LiveDot /> Live <span className="font-medium opacity-75 truncate">· {host}</span></>
  ) : host ? (
    <><LiveDot /> Live demo</>
  ) : project.categories.includes("Research") ? (
    <><FlaskConical className="w-3 h-3" aria-hidden="true" /> Research</>
  ) : null;

  return (
    <article
      onMouseEnter={playHover}
      className={`group h-full flex flex-col rounded-2xl border overflow-hidden transition-[border-color,box-shadow] duration-300 hover:shadow-xl ${isDarkMode ? "bg-[#1c1c1e] border-white/[0.08]" : "bg-white border-slate-200"} ${hoverCls}`}
    >
      <div className={`group/media relative shrink-0 overflow-hidden bg-slate-900 ${live ? "w-full aspect-video max-h-[28vh]" : "h-[clamp(84px,20vh,180px)] lg:h-auto lg:flex-1 lg:min-h-[72px]"}`}>
        <CardMedia project={project} isDarkMode={isDarkMode} sizes="(min-width: 1024px) 30vw, 90vw" />
        {badge && <MediaBadge>{badge}</MediaBadge>}
      </div>

      <div className={`flex flex-col gap-2 p-4 lg:px-5 short:gap-1.5 short:py-3 ${live ? "flex-1 min-w-0" : "shrink-0"}`}>
        <div>
          <p className={`text-[10px] font-semibold tracking-widest uppercase ${kindCls}`}>{project.kind}</p>
          <h3 className={`mt-0.5 text-base lg:text-lg font-bold leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            {project.name ?? project.title}
          </h3>
        </div>
        <p className={`text-xs lg:text-[13px] leading-relaxed line-clamp-3 short:leading-snug short:line-clamp-2 ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
          {project.summary ?? project.description}
        </p>
        {project.highlights && (
          <Highlights
            items={project.highlights}
            iconCls={live ? "text-emerald-500" : "text-violet-500"}
            textCls={isDarkMode ? "text-gray-300" : "text-slate-700"}
          />
        )}
        <TechChips tech={project.tech} chipCls={chipCls} visibleCls="flex short:hidden" />
        <ProjectLinks project={project} demoLabel={live ? "Visit site" : "Live demo"} isDarkMode={isDarkMode} />
      </div>
    </article>
  );
};

/* Cards in a swipeable row on phones and tablets, and a grid on desktop
   (`gridCls`, e.g. "lg:grid-cols-3"). */
const CardRow = ({ children, gridCls, className = "", isDarkMode }: {
  children: ReactNode; gridCls: string; className?: string; isDarkMode: boolean;
}) => {
  const { playClick } = useSound();
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const cards = Children.toArray(children);

  // Scroll distance from one card to the next
  const step = () => {
    const [first, second] = Array.from(rowRef.current?.children ?? []) as HTMLElement[];
    return first && second ? second.offsetLeft - first.offsetLeft : 1;
  };

  return (
    <div className={`flex flex-col min-h-0 lg:flex-1 ${className}`}>
      <div
        ref={rowRef}
        onScroll={(e) => setActive(Math.round(e.currentTarget.scrollLeft / step()))}
        className={`flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 scroll-px-4 sm:-mx-6 sm:px-6 sm:scroll-px-6 lg:grid lg:flex-1 lg:min-h-0 lg:gap-4 lg:mx-0 lg:px-0 lg:overflow-visible ${gridCls}`}
      >
        {cards.map((card, i) => (
          <div key={i} className="snap-start shrink-0 w-[88%] sm:w-[60%] md:w-[46%] lg:w-auto lg:min-h-0">
            {card}
          </div>
        ))}
      </div>
      <div className="flex md:hidden justify-center gap-1.5 mt-3">
        {cards.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show project ${i + 1}`}
            onClick={() => { playClick(); rowRef.current?.scrollTo({ left: i * step(), behavior: "smooth" }); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? `w-4 ${isDarkMode ? "bg-white" : "bg-slate-900"}` : `w-1.5 ${isDarkMode ? "bg-white/20" : "bg-slate-300"}`}`}
          />
        ))}
      </div>
    </div>
  );
};

const SlideHeader = ({ current, eyebrow, eyebrowCls, title, accent, gradient, subtitle, isDarkMode, scrollToSection }: {
  current: string; eyebrow: ReactNode; eyebrowCls: string; title: string; accent: string; gradient: string;
  subtitle: string; isDarkMode: boolean; scrollToSection: (sectionId: string) => void;
}) => {
  const { playClick, playHover } = useSound();
  return (
    <header className="shrink-0 flex flex-col-reverse gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className={`flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase ${eyebrowCls}`}>{eyebrow}</p>
        <h2 className={`mt-1 text-xl sm:text-2xl font-bold leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
          {title}{" "}
          <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{accent}</span>
        </h2>
        <p className={`mt-1 text-xs sm:text-sm ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>{subtitle}</p>
      </div>

      {/* Jump between the three project slides */}
      <div
        role="group"
        aria-label="Project categories"
        className={`self-start sm:self-auto shrink-0 flex gap-0.5 p-1 rounded-xl border ${isDarkMode ? "bg-white/[0.04] border-white/[0.08]" : "bg-white border-slate-200 shadow-sm"}`}
      >
        {PROJECT_SLIDES.map((slide) => {
          const active = slide.id === current;
          return (
            <button
              key={slide.id}
              type="button"
              aria-current={active ? "true" : undefined}
              onClick={() => { playClick(); scrollToSection(slide.id); }}
              onMouseEnter={playHover}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors duration-200 ${
                active
                  ? isDarkMode ? "bg-white text-gray-900" : "bg-slate-900 text-white"
                  : isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {slide.label}
              <span className="text-[10px] tabular-nums opacity-60">{slide.count}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

// The header stays at the top, so the Live/Personal/Shopify tabs don't move
// between slides; the cards are centred in the space below it.
const SlideShell = ({ id, glows, header, isDarkMode, children }: {
  id: string; glows: [string, string]; header: ReactNode; isDarkMode: boolean; children: ReactNode;
}) => (
  <section id={id} className={`h-full overflow-hidden relative ${isDarkMode ? "bg-[#141414]" : "bg-slate-50"}`}>
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute -top-24 -left-20 w-72 h-72 rounded-full blur-3xl ${isDarkMode ? "opacity-[0.07]" : "opacity-20"} ${glows[0]}`} />
      <div className={`absolute -bottom-24 -right-20 w-72 h-72 rounded-full blur-3xl ${isDarkMode ? "opacity-[0.07]" : "opacity-20"} ${glows[1]}`} />
    </div>
    <div className="relative z-10 h-full w-full max-w-[1500px] mx-auto flex flex-col gap-3 lg:gap-4 px-4 sm:px-6 lg:px-8 py-4 lg:py-5">
      {header}
      <div className="flex-1 min-h-0 flex flex-col justify-center">{children}</div>
    </div>
  </section>
);

/* Desktop view of the live projects: the selected one plays on a large stage
   framed as a browser window, with its details and a picker for the others
   beside it. Only the selected project's media is mounted. */
const LiveShowcase = ({ projects, isDarkMode }: { projects: Project[]; isDarkMode: boolean }) => {
  const { playClick, playHover } = useSound();
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  const name = project.name ?? project.title;
  const host = hostOf(project.demo);

  const panel = isDarkMode ? "bg-[#1c1c1e] border-white/[0.08]" : "bg-white border-slate-200";
  const muted = isDarkMode ? "text-gray-400" : "text-slate-500";

  return (
    <div className="hidden lg:grid flex-1 min-h-0 max-h-[720px] grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-5">
      {/* Stage */}
      <div className={`group flex flex-col min-h-0 rounded-2xl border overflow-hidden shadow-2xl ${isDarkMode ? "shadow-black/40" : "shadow-slate-300/60"} ${panel}`}>
        <div className={`shrink-0 h-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 border-b ${isDarkMode ? "border-white/[0.08]" : "border-slate-200 bg-slate-50"}`}>
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className={`flex items-center gap-1.5 min-w-0 max-w-[340px] px-3 h-6 rounded-md text-[11px] font-medium ${isDarkMode ? "bg-white/[0.06] text-gray-300" : "bg-white border border-slate-200 text-slate-600"}`}>
            {host ? <><LiveDot /><span className="truncate">{host}</span></> : <span className="truncate">{name}</span>}
          </span>
          {isLink(project.demo) && (
            <a
              href={project.demo} target="_blank" rel="noopener noreferrer" onClick={playClick}
              aria-label={`Open ${name} in a new tab`} title="Open site"
              className={`justify-self-end w-7 h-7 rounded-md flex items-center justify-center transition-colors ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/70"}`}
            >
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>
        <div key={project.id} className="group/media relative flex-1 min-h-0 overflow-hidden bg-slate-900 motion-safe:animate-[stage-in_0.45s_ease-out]">
          <CardMedia project={project} isDarkMode={isDarkMode} sizes="(min-width: 1024px) 60vw, 90vw" />
        </div>
      </div>

      {/* Details and picker */}
      <div className="flex flex-col min-h-0 gap-4">
        <div key={project.id} className={`flex-1 min-h-0 flex flex-col justify-center gap-3 rounded-2xl border p-6 xl:p-7 short:gap-2 short:p-5 motion-safe:animate-[fade-up_0.35s_ease-out] ${panel}`}>
          <div className="flex items-center justify-between gap-3">
            <p className={`text-[10px] font-semibold tracking-widest uppercase truncate ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>{project.kind}</p>
            <p className={`shrink-0 text-xs font-semibold tabular-nums ${muted}`}>
              {String(selected + 1).padStart(2, "0")}
              <span className="opacity-50"> / {String(projects.length).padStart(2, "0")}</span>
            </p>
          </div>
          <h3 className={`text-2xl xl:text-[28px] font-bold leading-tight tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>{name}</h3>
          <p className={`text-sm leading-relaxed line-clamp-3 short:line-clamp-2 ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
            {project.summary ?? project.description}
          </p>
          {project.highlights && (
            <Highlights items={project.highlights} iconCls="text-emerald-500" textCls={isDarkMode ? "text-gray-300" : "text-slate-700"} />
          )}
          <TechChips
            tech={project.tech}
            chipCls={isDarkMode ? "bg-blue-500/10 text-blue-300 border-blue-500/20" : "bg-blue-50 text-blue-700 border-blue-200"}
            visibleCls="flex short:hidden"
          />
          <div className="pt-1">
            <ProjectLinks project={project} demoLabel="Visit site" isDarkMode={isDarkMode} />
          </div>
        </div>

        <div role="group" aria-label="Choose a project" className="shrink-0 grid grid-cols-2 gap-2">
          {projects.map((p, i) => {
            const active = i === selected;
            const still = projectStill(p);
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={active}
                onClick={() => { if (!active) { playClick(); setSelected(i); } }}
                onMouseEnter={playHover}
                className={`flex items-center gap-3 p-2 rounded-xl border text-left transition-[border-color,background-color,box-shadow] duration-200 ${
                  active
                    ? isDarkMode ? "bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10" : "bg-blue-50 border-blue-400 shadow-md shadow-blue-500/10"
                    : isDarkMode ? `${panel} hover:border-white/20` : `${panel} hover:border-slate-300`
                }`}
              >
                <span className="relative shrink-0 w-16 h-10 rounded-md overflow-hidden bg-slate-900">
                  {still ? (
                    <GatedImage src={still} alt="" fill sizes="64px" className="object-cover object-left-top" />
                  ) : (
                    <span className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-600" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className={`block text-[13px] font-semibold leading-tight truncate ${isDarkMode ? "text-white" : "text-slate-900"}`}>{p.name ?? p.title}</span>
                  <span className={`block mt-0.5 text-[11px] leading-tight truncate ${muted}`}>{p.kind}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const MONOGRAM_GRADIENTS = [
  "from-emerald-500 to-teal-600",
  "from-teal-500 to-cyan-600",
  "from-green-500 to-emerald-600",
  "from-cyan-500 to-sky-600",
  "from-lime-500 to-green-600",
];

// The store's homepage screenshot (public/images/shopify) with its name and
// what it sells; opens the live store
const StoreCard = ({ project, index, isDarkMode }: { project: Project; index: number; isDarkMode: boolean }) => {
  const { playClick, playHover } = useSound();
  const name = project.name ?? project.title;
  return (
    <a
      href={project.demo}
      target="_blank"
      rel="noopener noreferrer"
      title={`${name} · ${hostOf(project.demo)}`}
      onClick={playClick}
      onMouseEnter={playHover}
      className={`group relative snap-start overflow-hidden rounded-xl border transition-[border-color,box-shadow] duration-300 hover:shadow-lg ${
        isDarkMode
          ? "bg-[#1c1c1e] border-white/[0.08] hover:border-emerald-500/50 hover:shadow-emerald-500/10"
          : "bg-slate-100 border-slate-200 hover:border-emerald-400 hover:shadow-emerald-500/15"
      }`}
    >
      {project.image ? (
        <GatedImage
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 17vw, (min-width: 768px) 32vw, 75vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <span
          aria-hidden="true"
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${MONOGRAM_GRADIENTS[index % MONOGRAM_GRADIENTS.length]} text-white text-2xl font-bold`}
        >
          {name.replace(/^the\s+/i, "").charAt(0)}
        </span>
      )}
      {/* A dark fade under the text keeps it readable on any screenshot */}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-3 pt-6 pb-2">
        <span className="block text-[13px] font-semibold leading-tight text-white truncate">{name}</span>
        <span className="block mt-0.5 text-[11px] leading-snug text-white/75 truncate">{project.kind}</span>
      </span>
      <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
        <ArrowUpRight className="w-3.5 h-3.5 text-white" aria-hidden="true" />
      </span>
    </a>
  );
};

// Last cell of the store grid: the write-ups behind the stores
const CaseStudiesTile = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { playClick, playHover } = useSound();
  return (
    <Link
      href="/projects"
      onClick={playClick}
      onMouseEnter={playHover}
      className={`snap-start flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed p-3 text-center transition-colors duration-200 ${
        isDarkMode
          ? "border-white/15 text-gray-300 hover:border-emerald-500/50 hover:text-white"
          : "border-slate-300 text-slate-600 hover:border-emerald-400 hover:text-slate-900"
      }`}
    >
      <BookOpen className={`w-5 h-5 ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`} aria-hidden="true" />
      <span className="text-[13px] font-semibold">Case studies</span>
      <span className={`text-[11px] ${isDarkMode ? "text-gray-500" : "text-slate-500"}`}>How each store was built →</span>
    </Link>
  );
};

export function LiveProjects({ isDarkMode, scrollToSection }: SlideProps) {
  return (
    <SlideShell
      id="projects"
      glows={["bg-blue-400", "bg-emerald-400"]}
      isDarkMode={isDarkMode}
      header={
        <SlideHeader
          current="projects"
          eyebrow={<><LiveDot /> Client work</>}
          eyebrowCls={isDarkMode ? "text-emerald-400" : "text-emerald-600"}
          title="Live"
          accent="Projects"
          gradient="from-blue-600 to-purple-600"
          subtitle="Products I built for real businesses, all live in production."
          isDarkMode={isDarkMode}
          scrollToSection={scrollToSection}
        />
      }
    >
      {/* Swipeable cards below lg, the showcase from lg up */}
      <CardRow className="lg:hidden" gridCls="" isDarkMode={isDarkMode}>
        {liveProjects.map((p) => <ProjectCard key={p.id} project={p} variant="live" isDarkMode={isDarkMode} />)}
      </CardRow>
      <LiveShowcase projects={liveProjects} isDarkMode={isDarkMode} />
    </SlideShell>
  );
}

export function PersonalProjects({ isDarkMode, scrollToSection }: SlideProps) {
  return (
    <SlideShell
      id="personal-projects"
      glows={["bg-violet-400", "bg-fuchsia-400"]}
      isDarkMode={isDarkMode}
      header={
        <SlideHeader
          current="personal-projects"
          eyebrow={<><Sparkles className="w-3 h-3" aria-hidden="true" /> AI / ML &amp; research</>}
          eyebrowCls={isDarkMode ? "text-violet-400" : "text-violet-600"}
          title="Personal"
          accent="Projects"
          gradient="from-violet-500 to-fuchsia-500"
          subtitle="Side projects I built on my own, from AI chatbots to NLP research."
          isDarkMode={isDarkMode}
          scrollToSection={scrollToSection}
        />
      }
    >
      <CardRow className="lg:max-h-[600px]" gridCls="lg:grid-cols-3 lg:grid-rows-1" isDarkMode={isDarkMode}>
        {personalProjects.map((p) => <ProjectCard key={p.id} project={p} variant="personal" isDarkMode={isDarkMode} />)}
      </CardRow>
    </SlideShell>
  );
}

export function ShopifyProjects({ isDarkMode, scrollToSection }: SlideProps) {
  return (
    <SlideShell
      id="shopify-projects"
      glows={["bg-emerald-400", "bg-teal-400"]}
      isDarkMode={isDarkMode}
      header={
        <SlideHeader
          current="shopify-projects"
          eyebrow={<><ShoppingBag className="w-3 h-3" aria-hidden="true" /> E-commerce</>}
          eyebrowCls={isDarkMode ? "text-emerald-400" : "text-emerald-600"}
          title="Shopify"
          accent="Stores"
          gradient="from-emerald-500 to-teal-500"
          subtitle={`${shopifyProjects.length} custom storefronts for brands in fashion, jewellery, beauty and more. Click any store to see it live.`}
          isDarkMode={isDarkMode}
          scrollToSection={scrollToSection}
        />
      }
    >
      {/* Phones: two rows of cards that scroll sideways. md+: a grid that fills
          the slide, 3 columns (tablets) or 6 (desktop), with as many rows as
          the stores plus the case-studies tile need. */}
      <div
        style={{
          "--rows-md": Math.ceil((shopifyProjects.length + 1) / 3),
          "--rows-lg": Math.ceil((shopifyProjects.length + 1) / 6),
        } as CSSProperties}
        className="grid gap-2 grid-flow-col grid-rows-2 auto-cols-[72%] sm:auto-cols-[44%] h-[clamp(240px,46vh,340px)] overflow-x-auto snap-x snap-mandatory -mx-4 px-4 scroll-px-4 sm:-mx-6 sm:px-6 sm:scroll-px-6 md:h-auto md:flex-1 md:min-h-0 md:max-h-[720px] md:mx-0 md:px-0 md:gap-2.5 md:overflow-visible md:snap-none md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:grid-rows-[repeat(var(--rows-md),minmax(0,1fr))] lg:grid-cols-6 lg:max-h-[640px] lg:grid-rows-[repeat(var(--rows-lg),minmax(0,1fr))]"
      >
        {shopifyProjects.map((p, i) => <StoreCard key={p.id} project={p} index={i} isDarkMode={isDarkMode} />)}
        <CaseStudiesTile isDarkMode={isDarkMode} />
      </div>
    </SlideShell>
  );
}
