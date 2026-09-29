"use client";

import { useEffect, useRef, useState } from "react";
import type { DayStats } from "../lib/search-console";

// Clicks and impressions differ in scale by orders of magnitude, so each gets
// its own chart on a shared x-axis instead of two y-axes on one.
const METRICS = [
  { key: "clicks", label: "Clicks" },
  { key: "impressions", label: "Impressions" },
] as const;

const LINE = "#9333ea"; // purple-600, the admin accent
const GRID = "#e2e8f0"; // slate-200
const TICK = "#94a3b8"; // slate-400
const PLOT_H = 72;
const PAD = { top: 8, left: 40, right: 8 };
const AXIS_H = 20;

const count = new Intl.NumberFormat("en");
const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const formatDay = (date: string, withWeekday = false) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    ...(withWeekday && { weekday: "short" }),
  });

// Whole-number ticks at 1/2/5 × 10^n, with the top tick at or above the max
function niceTop(max: number) {
  const half = max / 2;
  const magnitude = 10 ** Math.floor(Math.log10(half || 1));
  const step = Math.max(1, [1, 2, 5, 10].map((m) => m * magnitude).find((s) => s >= half) ?? 10 * magnitude);
  return step * 2;
}

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Measure now rather than waiting for the observer's first callback
    setWidth(el.getBoundingClientRect().width);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

export default function SearchTrends({ days }: { days: DayStats[] }) {
  const [ref, width] = useWidth();
  const [active, setActive] = useState<number | null>(null);
  const last = days.length - 1;
  const shown = days[active ?? last];

  const plotW = Math.max(0, width - PAD.left - PAD.right);
  const x = (i: number) => PAD.left + (last > 0 ? (i / last) * plotW : plotW / 2);

  const indexAt = (clientX: number, target: Element) => {
    const offset = clientX - target.getBoundingClientRect().left - PAD.left;
    return Math.min(last, Math.max(0, Math.round((offset / (plotW || 1)) * last)));
  };

  return (
    <div className="mt-6">
      {/* Readout: the hovered or focused day, otherwise the latest one */}
      <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm" aria-live="polite">
        <span className="font-medium text-slate-900">{formatDay(shown.date, true)}</span>
        {METRICS.map((m) => (
          <span key={m.key} className="text-slate-500">
            <strong className="font-semibold text-slate-900 tabular-nums">{count.format(shown[m.key])}</strong>{" "}
            {m.label.toLowerCase()}
          </span>
        ))}
      </p>

      <div
        ref={ref}
        tabIndex={0}
        role="group"
        aria-label="Daily clicks and impressions. Use the left and right arrow keys to move between days."
        className="mt-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
        onPointerMove={(e) => setActive(indexAt(e.clientX, e.currentTarget))}
        onPointerLeave={() => setActive(null)}
        onFocus={() => setActive((i) => i ?? last)}
        onBlur={() => setActive(null)}
        onKeyDown={(e) => {
          if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
          e.preventDefault();
          setActive((i) => Math.min(last, Math.max(0, (i ?? last) + (e.key === "ArrowLeft" ? -1 : 1))));
        }}
      >
        {METRICS.map((m, panel) => {
          const isBottom = panel === METRICS.length - 1;
          const height = PAD.top + PLOT_H + (isBottom ? AXIS_H : 4);
          const top = niceTop(Math.max(...days.map((d) => d[m.key])));
          const y = (v: number) => PAD.top + PLOT_H * (1 - v / top);
          const line = days.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d[m.key])}`).join("");
          const area = `${line}L${x(last)},${y(0)}L${x(0)},${y(0)}Z`;

          return (
            <div key={m.key} className={panel ? "mt-3" : ""}>
              <p className="text-xs font-medium text-slate-500">{m.label} per day</p>
              <div style={{ height }}>
                {width > 0 && (
                  <svg width={width} height={height} aria-hidden="true" className="block overflow-visible">
                    {[0, top / 2, top].map((tick) => (
                      <g key={tick}>
                        <line x1={PAD.left} x2={width - PAD.right} y1={y(tick)} y2={y(tick)} stroke={GRID} strokeWidth={1} />
                        <text
                          x={PAD.left - 8}
                          y={y(tick)}
                          dy="0.32em"
                          textAnchor="end"
                          fontSize={10}
                          fill={TICK}
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          {compact.format(tick)}
                        </text>
                      </g>
                    ))}
                    <path d={area} fill={LINE} fillOpacity={0.1} />
                    <path d={line} fill="none" stroke={LINE} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                    {active !== null && (
                      <>
                        <line x1={x(active)} x2={x(active)} y1={PAD.top} y2={y(0)} stroke={TICK} strokeWidth={1} />
                        <circle cx={x(active)} cy={y(days[active][m.key])} r={4} fill={LINE} stroke="#fff" strokeWidth={2} />
                      </>
                    )}
                    {isBottom &&
                      [0, Math.floor(last / 2), last].map((i, n) => (
                        <text
                          key={n}
                          x={x(i)}
                          y={y(0) + 14}
                          textAnchor={n === 0 ? "start" : n === 2 ? "end" : "middle"}
                          fontSize={10}
                          fill={TICK}
                        >
                          {formatDay(days[i].date)}
                        </text>
                      ))}
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <details className="mt-3 text-sm">
        <summary className="cursor-pointer font-medium text-purple-600 hover:underline">Show daily numbers</summary>
        <table className="mt-2 w-full text-left">
          <thead className="text-xs text-slate-500">
            <tr>
              <th className="py-1.5 font-medium">Day</th>
              <th className="py-1.5 text-right font-medium">Clicks</th>
              <th className="py-1.5 text-right font-medium">Impressions</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {[...days].reverse().map((d) => (
              <tr key={d.date} className="border-t border-slate-100">
                <td className="py-1.5">{formatDay(d.date, true)}</td>
                <td className="py-1.5 text-right">{count.format(d.clicks)}</td>
                <td className="py-1.5 text-right">{count.format(d.impressions)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
