import { createSign } from "node:crypto";
import { SITE_URL } from "../data/site";

// Search performance for /admin, read from the Search Console API with a Google
// service account. The account needs no Google Cloud roles, only access to the
// property, granted in Search Console under Settings → Users and permissions.
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API_URL = "https://searchconsole.googleapis.com/webmasters/v3";
const DAY_MS = 24 * 60 * 60 * 1000;
const TOP_ROWS = 10;

export const SEARCH_RANGES = [7, 28, 90] as const;
export type SearchRange = (typeof SEARCH_RANGES)[number];

// The HTML-file verification in public/ is for the URL-prefix property; set
// GSC_SITE_URL to "sc-domain:rajdeepkotoky.com" to read a Domain property instead.
export const searchConsoleProperty = () => process.env.GSC_SITE_URL || `${SITE_URL}/`;

export type DayStats = { date: string; clicks: number; impressions: number };
export type Totals = { clicks: number; impressions: number; ctr: number; position: number | null };
export type TopRow = { key: string; clicks: number; impressions: number; ctr: number; position: number };

export type SearchReport =
  | { status: "unconfigured" }
  | { status: "error"; message: string }
  | {
      status: "ok";
      start: string;
      end: string;
      days: DayStats[];
      current: Totals;
      previous: Totals;
      queries: TopRow[];
      pages: TopRow[];
    };

type Credentials = { clientEmail: string; privateKey: string };
type ApiRow = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number };

// Shown on the admin page, so the messages say what to fix
class SearchConsoleError extends Error {}

// GOOGLE_SERVICE_ACCOUNT_KEY holds the service account's JSON key file as-is
function getCredentials(): Credentials | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;
  let key: { client_email?: unknown; private_key?: unknown };
  try {
    key = JSON.parse(raw);
  } catch {
    throw new SearchConsoleError("GOOGLE_SERVICE_ACCOUNT_KEY isn't valid JSON. Paste the whole key file.");
  }
  if (typeof key.client_email !== "string" || typeof key.private_key !== "string") {
    throw new SearchConsoleError("GOOGLE_SERVICE_ACCOUNT_KEY needs a service account key with client_email and private_key.");
  }
  // Some env editors store the key's newlines as literal "\n"
  return { clientEmail: key.client_email, privateKey: key.private_key.replace(/\\n/g, "\n") };
}

let cachedToken: { clientEmail: string; value: string; expiresAt: number } | null = null;

const base64url = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");

// Service accounts sign their own JWT and trade it for an access token
async function getAccessToken({ clientEmail, privateKey }: Credentials) {
  if (cachedToken?.clientEmail === clientEmail && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }
  const iat = Math.floor(Date.now() / 1000);
  const unsigned = `${base64url({ alg: "RS256", typ: "JWT" })}.${base64url({
    iss: clientEmail,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat,
    exp: iat + 3600,
  })}`;
  let signature: string;
  try {
    signature = createSign("RSA-SHA256").update(unsigned).sign(privateKey, "base64url");
  } catch {
    throw new SearchConsoleError("The private key in GOOGLE_SERVICE_ACCOUNT_KEY couldn't be read.");
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
    cache: "no-store",
  });
  const body = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error_description?: string;
  };
  if (!res.ok || !body.access_token) {
    throw new SearchConsoleError(
      `Google rejected the service account key${body.error_description ? `: ${body.error_description}` : "."}`,
    );
  }
  cachedToken = { clientEmail, value: body.access_token, expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000 };
  return body.access_token;
}

async function querySearchAnalytics(
  token: string,
  { clientEmail }: Credentials,
  request: { startDate: string; endDate: string; dimensions: string[]; rowLimit: number },
): Promise<ApiRow[]> {
  const property = searchConsoleProperty();
  const res = await fetch(`${API_URL}/sites/${encodeURIComponent(property)}/searchAnalytics/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    // "all" includes the last couple of days, which Google may still revise
    body: JSON.stringify({ ...request, dataState: "all" }),
    cache: "no-store",
  });
  if (res.ok) return ((await res.json()) as { rows?: ApiRow[] }).rows ?? [];

  const message = ((await res.json().catch(() => null)) as { error?: { message?: string } } | null)?.error?.message;
  if (res.status === 403 && message?.includes("sufficient permission")) {
    throw new SearchConsoleError(
      `${clientEmail} can't read ${property}. Add it as a user of that property in Search Console (Settings → Users and permissions).`,
    );
  }
  throw new SearchConsoleError(`Search Console returned ${res.status}${message ? `: ${message}` : "."}`);
}

// Search Console reports calendar days in Pacific Time
const pacificToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(new Date());
const shiftDate = (date: string, days: number) => new Date(Date.parse(date) + days * DAY_MS).toISOString().slice(0, 10);

// Position is averaged per impression, as Search Console does
function sumTotals(rows: { clicks: number; impressions: number; position: number }[]): Totals {
  const clicks = rows.reduce((s, r) => s + r.clicks, 0);
  const impressions = rows.reduce((s, r) => s + r.impressions, 0);
  const weighted = rows.reduce((s, r) => s + r.position * r.impressions, 0);
  return {
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: impressions ? weighted / impressions : null,
  };
}

// The API orders by clicks only; break ties by impressions so a new site with
// few clicks still shows its most-seen queries and pages first
const topRows = (rows: ApiRow[]): TopRow[] =>
  rows
    .map((r) => ({ key: r.keys?.[0] ?? "", clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }))
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .slice(0, TOP_ROWS);

/** The last `range` days up to yesterday, compared with the `range` days before. */
export async function getSearchReport(range: SearchRange): Promise<SearchReport> {
  try {
    const credentials = getCredentials();
    if (!credentials) return { status: "unconfigured" };
    const token = await getAccessToken(credentials);

    const end = shiftDate(pacificToday(), -1);
    const start = shiftDate(end, 1 - range);
    const previousStart = shiftDate(start, -range);
    const current = { startDate: start, endDate: end, rowLimit: 250 };
    const [daily, queries, pages] = await Promise.all([
      querySearchAnalytics(token, credentials, { startDate: previousStart, endDate: end, dimensions: ["date"], rowLimit: 500 }),
      querySearchAnalytics(token, credentials, { ...current, dimensions: ["query"] }),
      querySearchAnalytics(token, credentials, { ...current, dimensions: ["page"] }),
    ]);

    // Days with no impressions are missing from the response; fill them with zeros
    const byDate = new Map(daily.map((r) => [r.keys?.[0], r]));
    const daysFrom = (from: string) =>
      Array.from({ length: range }, (_, i) => {
        const date = shiftDate(from, i);
        const row = byDate.get(date);
        return { date, clicks: row?.clicks ?? 0, impressions: row?.impressions ?? 0, position: row?.position ?? 0 };
      });
    const currentDays = daysFrom(start);

    return {
      status: "ok",
      start,
      end,
      days: currentDays.map(({ date, clicks, impressions }) => ({ date, clicks, impressions })),
      current: sumTotals(currentDays),
      previous: sumTotals(daysFrom(previousStart)),
      queries: topRows(queries),
      pages: topRows(pages),
    };
  } catch (error) {
    if (error instanceof SearchConsoleError) return { status: "error", message: error.message };
    console.error("Search Console request failed:", error);
    return { status: "error", message: "Couldn't reach Search Console. Try again in a minute." };
  }
}
