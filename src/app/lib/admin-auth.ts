import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Single-user admin: the password and signing secret come from env vars, and a
// session is an HMAC-signed expiry in an httpOnly cookie scoped to /admin.
const COOKIE = "admin_session";
const COOKIE_PATH = "/admin";
const SESSION_TTL_S = 7 * 24 * 60 * 60;

type AdminConfig = { password: string; secret: string };

// Fails closed: a missing or short password/secret keeps the admin locked.
function getConfig(): AdminConfig | null {
  const password = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  return password.length >= 12 && secret.length >= 32 ? { password, secret } : null;
}

export const adminConfigured = () => getConfig() !== null;

// Compares digests so neither the length nor the content leaks through timing
const sha256 = (value: string) => createHash("sha256").update(value).digest();
const safeEqual = (a: string, b: string) => timingSafeEqual(sha256(a), sha256(b));

// The password is part of the signature, so changing it (or the secret) signs
// everyone out
const sign = (expiresAt: number, { password, secret }: AdminConfig) =>
  createHmac("sha256", secret).update(`${expiresAt}.${password}`).digest("base64url");

export function checkPassword(input: string) {
  const config = getConfig();
  return config !== null && safeEqual(input, config.password);
}

export async function startSession() {
  const config = getConfig();
  if (!config) throw new Error("Admin is not configured");
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_S;
  (await cookies()).set(COOKIE, `${expiresAt}.${sign(expiresAt, config)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: COOKIE_PATH,
    maxAge: SESSION_TTL_S,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: COOKIE, path: COOKIE_PATH });
}

export async function isAdmin() {
  const config = getConfig();
  const token = (await cookies()).get(COOKIE)?.value;
  if (!config || !token) return false;
  const [expiresAt, signature] = token.split(".");
  const expiry = Number(expiresAt);
  if (!Number.isInteger(expiry) || expiry * 1000 < Date.now() || !signature) return false;
  return safeEqual(signature, sign(expiry, config));
}

// Every admin page and server action calls this itself rather than relying on
// middleware, so a request can't skip the check.
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
