"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowUp, ChevronDown, Moon, Sun } from "lucide-react";
import ViewsMenu from "../components/ViewsMenu";

const NAV = [
  { id: "top", label: "Home", mobile: false },
  { id: "projects", label: "Projects", mobile: true },
  { id: "stores", label: "Stores", mobile: true },
  { id: "work", label: "Work", mobile: true },
  { id: "contact", label: "Contact", mobile: true },
];

// Lenis drives the window scroll, so CSS smooth scrolling would fight it;
// native smooth scrolling from script is fine
function scrollToId(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
  else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function MinimalHeader({ initials }: { initials: string }) {
  const ref = useRef<HTMLElement>(null);
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("top");

  // Shares the "theme" key with the main site. The inline script in the page
  // sets data-theme before paint, but doesn't run on client-side navigation,
  // so it's applied again here. html.dark keeps the chat widget in step.
  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(".minimal");
    let isDark = true;
    try {
      isDark = localStorage.getItem("theme") !== "light";
    } catch {}
    if (root) root.dataset.theme = isDark ? "dark" : "light";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    return () => {
      let savedDark = false;
      try {
        savedDark = localStorage.getItem("theme") === "dark";
      } catch {}
      document.documentElement.classList.toggle("dark", savedDark);
    };
  }, []);

  // The active section is the last one whose top has passed a line near the
  // top of the screen; at the page bottom it's the last one, since short
  // closing sections never reach that line
  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom =
        window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = sections[0]?.id ?? "top";
      for (const el of sections) if (el.getBoundingClientRect().top <= window.innerHeight * 0.3) current = el.id;
      setActive(atBottom ? (sections.at(-1)?.id ?? current) : current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    const root = ref.current?.closest<HTMLElement>(".minimal");
    if (root) root.dataset.theme = next ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  return (
    <header
      ref={ref}
      className="sticky top-0 z-30 border-b border-(--m-line) bg-(--m-bg)/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-12 max-w-3xl items-center justify-between border-x border-(--m-line) px-4 sm:px-6">
        <a
          href="#top"
          onClick={(e) => scrollToId(e, "top")}
          className="font-mono text-base font-bold tracking-tight"
          aria-label="Back to top"
        >
          {initials}
        </a>
        <nav aria-label="Sections" className="flex items-center gap-3 sm:gap-4">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToId(e, item.id)}
              aria-current={active === item.id ? "location" : undefined}
              className={`${item.mobile ? "" : "hidden sm:inline"} text-[13px] font-medium underline-offset-[6px] decoration-2 transition-colors ${
                active === item.id
                  ? "text-(--m-fg) underline"
                  : "text-(--m-muted) hover:text-(--m-fg)"
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="ml-1 grid size-8 place-items-center rounded-md text-(--m-muted) transition-colors hover:bg-(--m-card) hover:text-(--m-fg)"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <ViewsMenu current="minimal" compact tone={dark ? "dark" : "light"} />
        </nav>
      </div>
    </header>
  );
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sits above the chat widget's launcher, under its open panel
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-24 right-6 z-40 grid size-10 place-items-center rounded-full border border-(--m-line) bg-(--m-fg) text-(--m-bg) shadow-lg transition-all duration-200 sm:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp className="size-4" />
    </button>
  );
}

type Role = { period: string; title: string; points: string[]; tech?: string[] };

// Bolds figures like "17+" or "10+" so they stand out when skimming
function emphasize(text: string) {
  return text.split(/(\d+(?:[.,]\d+)*\+?%?)/).map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-(--m-fg)">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function ExperienceList({ roles }: { roles: Role[] }) {
  // The latest role starts open, like a resume's first entry
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  return (
    <ol className="space-y-7">
      {roles.map((role, i) => {
        const isOpen = Boolean(open[i]);
        const detailsId = `role-${i}`;
        return (
          <li key={role.title}>
            <div className="flex items-center gap-3">
              <span className="size-1.5 shrink-0 rounded-full bg-(--m-muted)" aria-hidden="true" />
              <h3 className="text-[15px] font-semibold leading-snug">{role.title}</h3>
            </div>
            <div className="mt-2 ml-[2.5px] border-l border-(--m-line) pl-[18px]">
              <p className="font-mono text-xs text-(--m-muted)">{role.period}</p>
              <div id={detailsId} hidden={!isOpen}>
                <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-(--m-muted)">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <span
                        className="mt-[7px] size-1.5 shrink-0 rotate-45 bg-(--m-fg)"
                        aria-hidden="true"
                      />
                      <span>{emphasize(point)}</span>
                    </li>
                  ))}
                </ul>
                {role.tech && (
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tech used">
                    {role.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded border border-(--m-line) bg-(--m-card) px-2 py-0.5 text-[11px] font-medium"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                type="button"
                onClick={() => setOpen((prev) => ({ ...prev, [i]: !isOpen }))}
                aria-expanded={isOpen}
                aria-controls={detailsId}
                className="mt-3 inline-flex items-center gap-1 rounded-md border border-(--m-line) px-2.5 py-1 text-xs font-medium transition-colors hover:bg-(--m-card)"
              >
                {isOpen ? "Show less" : "Show more"}
                <ChevronDown className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
