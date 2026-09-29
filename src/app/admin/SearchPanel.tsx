import Link from "next/link";
import { SITE_URL } from "../data/site";
import {
  SEARCH_RANGES,
  getSearchReport,
  searchConsoleProperty,
  type SearchRange,
  type TopRow,
  type Totals,
} from "../lib/search-console";
import SearchTrends from "./SearchTrends";

// null: nothing to compare against; good: null means no change
type Delta = { text: string; good: boolean | null } | null;
const NO_CHANGE: Delta = { text: "No change", good: null };

const count = new Intl.NumberFormat("en");
const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const percent = (ratio: number) => `${(ratio * 100).toFixed(1)}%`;
const formatDay = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", month: "short", day: "numeric" });

// Up is good for everything except position, where a lower number ranks higher
function deltas(current: Totals, previous: Totals): Delta[] {
  const arrow = (up: boolean) => (up ? "↑" : "↓");
  const change = (cur: number, prev: number): Delta => {
    if (!prev) return null;
    const pct = Math.round(((cur - prev) / prev) * 100);
    return pct ? { text: `${arrow(pct > 0)} ${Math.abs(pct)}%`, good: pct > 0 } : NO_CHANGE;
  };
  const ctrPoints = (current.ctr - previous.ctr) * 100;
  const rankGain =
    current.position !== null && previous.position !== null ? previous.position - current.position : null;
  return [
    change(current.clicks, previous.clicks),
    change(current.impressions, previous.impressions),
    !previous.impressions || !current.impressions
      ? null
      : Math.abs(ctrPoints) < 0.05
        ? NO_CHANGE
        : { text: `${arrow(ctrPoints > 0)} ${Math.abs(ctrPoints).toFixed(1)} pts`, good: ctrPoints > 0 },
    // A falling position number means ranking higher, so the arrow shows rank
    rankGain === null
      ? null
      : Math.abs(rankGain) < 0.05
        ? NO_CHANGE
        : { text: `${arrow(rankGain > 0)} ${Math.abs(rankGain).toFixed(1)} places`, good: rankGain > 0 },
  ];
}

function Notice({ tone, children }: { tone: "amber" | "red"; children: React.ReactNode }) {
  const colors = tone === "amber" ? "border-amber-200 bg-amber-50 text-amber-800" : "border-red-200 bg-red-50 text-red-700";
  return <div className={`mt-4 rounded-xl border p-4 text-sm ${colors}`}>{children}</div>;
}

function TopTable({ title, rows, page }: { title: string; rows: TopRow[]; page?: boolean }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      {rows.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">Nothing yet for these dates.</p>
      ) : (
        <table className="mt-2 w-full table-fixed text-left text-sm">
          <thead className="text-xs text-slate-500">
            <tr>
              <th className="py-1.5 font-medium">{page ? "Page" : "Query"}</th>
              <th className="w-14 py-1.5 text-right font-medium">Clicks</th>
              <th className="w-16 py-1.5 text-right font-medium">Impr.</th>
              <th className="hidden w-14 py-1.5 text-right font-medium sm:table-cell">CTR</th>
              <th className="w-16 py-1.5 text-right font-medium">Position</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {rows.map((row) => {
              const label = page && row.key.startsWith(SITE_URL) ? row.key.slice(SITE_URL.length) || "/" : row.key;
              return (
                <tr key={row.key} className="border-t border-slate-100">
                  <td className="py-1.5 pr-2 [overflow-wrap:anywhere]">
                    {page ? (
                      <a href={row.key} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 hover:underline">
                        {label}
                      </a>
                    ) : (
                      label
                    )}
                  </td>
                  <td className="py-1.5 text-right">{count.format(row.clicks)}</td>
                  <td className="py-1.5 text-right">{compact.format(row.impressions)}</td>
                  <td className="hidden py-1.5 text-right sm:table-cell">{percent(row.ctr)}</td>
                  <td className="py-1.5 text-right">{row.position.toFixed(1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default async function SearchPanel({ range }: { range: SearchRange }) {
  const property = searchConsoleProperty();
  const report = await getSearchReport(range);
  const changes = report.status === "ok" ? deltas(report.current, report.previous) : [];

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Search performance</h2>
          <p className="mt-1 text-sm text-slate-600">Google Search Console · {property}</p>
        </div>
        <a
          href={`https://search.google.com/search-console/performance/search-analytics?resource_id=${encodeURIComponent(property)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-purple-600 hover:underline"
        >
          Open Search Console ↗
        </a>
      </div>

      {report.status === "unconfigured" && (
        <Notice tone="amber">
          <p>Connect Search Console to see clicks, impressions and rankings here:</p>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5">
            <li>
              In Google Cloud Console, create a project, enable the <strong>Google Search Console API</strong>, then create a
              service account and download a JSON key for it.
            </li>
            <li>
              In Search Console, open the <strong>{property}</strong> property, go to Settings → Users and permissions, and add
              the service account&apos;s email as a user. Restricted permission is enough.
            </li>
            <li>
              In your Vercel project, add the key file&apos;s contents as <code>GOOGLE_SERVICE_ACCOUNT_KEY</code>, then
              redeploy. For local development, add it to <code>.env.local</code> too.
            </li>
          </ol>
          <p className="mt-2">
            If your property is a Domain property, also set <code>GSC_SITE_URL</code> to{" "}
            <code>sc-domain:{new URL(SITE_URL).hostname.replace(/^www\./, "")}</code>.
          </p>
        </Notice>
      )}

      {report.status === "error" && <Notice tone="red">{report.message}</Notice>}

      {report.status === "ok" && (
        <>
          <nav aria-label="Date range" className="mt-5 flex flex-wrap items-center gap-2">
            {SEARCH_RANGES.map((days) => (
              <Link
                key={days}
                href={`/admin?range=${days}`}
                scroll={false}
                aria-current={days === range ? "page" : undefined}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${
                  days === range
                    ? "border-purple-300 bg-purple-50 text-purple-700"
                    : "border-slate-200 text-slate-600 hover:border-purple-300"
                }`}
              >
                Last {days} days
              </Link>
            ))}
          </nav>

          <p className="mt-4 text-xs text-slate-500">
            {formatDay(report.start)} – {formatDay(report.end)}, compared with the {range} days before. Dates are in Pacific
            time and the last two days may still change.
          </p>

          <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {([
              { label: "Clicks", value: compact.format(report.current.clicks) },
              { label: "Impressions", value: compact.format(report.current.impressions) },
              { label: "Average CTR", value: percent(report.current.ctr) },
              {
                label: "Average position",
                value: report.current.position === null ? "–" : report.current.position.toFixed(1),
              },
            ] as const).map((tile, i) => {
              const delta = changes[i];
              const tone = delta?.good === true ? "text-emerald-600" : delta?.good === false ? "text-red-600" : "text-slate-400";
              return (
                <div key={tile.label} className="rounded-xl border border-slate-200 p-3">
                  <dt className="text-xs text-slate-500">{tile.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold">{tile.value}</dd>
                  <dd className={`mt-0.5 text-xs ${tone}`}>{delta ? delta.text : "No earlier data"}</dd>
                </div>
              );
            })}
          </dl>

          <SearchTrends days={report.days} />

          <div className="mt-6 space-y-6 border-t border-slate-100 pt-5">
            <TopTable title="Top queries" rows={report.queries} />
            <TopTable title="Top pages" rows={report.pages} page />
          </div>
        </>
      )}
    </section>
  );
}
