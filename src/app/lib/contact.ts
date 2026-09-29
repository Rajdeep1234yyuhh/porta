import { del, list, put } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import { DEFAULT_CONTACT, buildContact, type Contact, type ContactDetails } from "../data/site";
import { blobConfigured } from "./resume";

// Contact details saved from /admin live in Vercel Blob as JSON. Each save
// writes a new uniquely named file and deletes the older ones: the Blob CDN
// caches public files by URL, so overwriting one fixed file could keep serving
// the old details after a save.
const BLOB_PREFIX = "settings/contact";

// Pages are rendered once and cached; saving revalidates this tag so they pick
// up the new details
export const CONTACT_TAG = "contact-details";

export const CONTACT_FIELDS = ["email", "phone", "whatsapp", "github", "linkedin", "instagram"] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];

const MAX_LENGTH = 200;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+\d[\d\s-]*$/;

const PROFILE_HOSTS: Record<"github" | "linkedin" | "instagram", (host: string) => boolean> = {
  github: (host) => host === "github.com" || host === "www.github.com",
  // LinkedIn also serves profiles from country subdomains like in.linkedin.com
  linkedin: (host) => host === "linkedin.com" || host.endsWith(".linkedin.com"),
  instagram: (host) => host === "instagram.com" || host === "www.instagram.com",
};

const ERRORS: Record<ContactField, string> = {
  email: "Enter a valid email address.",
  phone: "Use the international format with the country code, e.g. +91 8638752315.",
  whatsapp: "Use the international format with the country code, e.g. +91 8638752315.",
  github: "Enter your GitHub profile link, e.g. https://github.com/username.",
  linkedin: "Enter your LinkedIn profile link, e.g. https://www.linkedin.com/in/username.",
  instagram: "Enter your Instagram profile link, e.g. https://www.instagram.com/username.",
};

// Accepts links typed without "https://" and returns the cleaned-up value, or
// null if it isn't valid
function normalize(field: ContactField, raw: string): string | null {
  const value = raw.trim().replace(/\s+/g, " ");
  if (!value || value.length > MAX_LENGTH) return null;
  if (field === "email") return EMAIL.test(value) ? value : null;
  if (field === "phone" || field === "whatsapp") {
    const count = value.replace(/\D/g, "").length;
    return PHONE.test(value) && count >= 8 && count <= 15 ? value : null;
  }
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    const hasHandle = url.pathname.split("/").some(Boolean);
    return PROFILE_HOSTS[field](url.hostname.toLowerCase()) && hasHandle ? `https://${url.host}${url.pathname}` : null;
  } catch {
    return null;
  }
}

export function validateContactDetails(
  input: Partial<Record<ContactField, unknown>>,
): { ok: true; details: ContactDetails } | { ok: false; errors: Partial<Record<ContactField, string>> } {
  const details: Partial<ContactDetails> = {};
  const errors: Partial<Record<ContactField, string>> = {};
  for (const field of CONTACT_FIELDS) {
    const raw = input[field];
    const value = typeof raw === "string" ? normalize(field, raw) : null;
    if (value === null) errors[field] = ERRORS[field];
    else details[field] = value;
  }
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, details: details as ContactDetails };
}

const readSavedDetails = unstable_cache(
  async (): Promise<ContactDetails | null> => {
    const { blobs } = await list({ prefix: BLOB_PREFIX });
    const latest = blobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())[0];
    if (!latest) return null;
    const res = await fetch(latest.url);
    if (!res.ok) throw new Error(`Reading ${latest.pathname} failed with ${res.status}`);
    const result = validateContactDetails(await res.json());
    return result.ok ? result.details : null;
  },
  [BLOB_PREFIX],
  { tags: [CONTACT_TAG] },
);

/** The live details: the ones saved from /admin, otherwise the defaults. */
export async function getContactDetails(): Promise<ContactDetails> {
  if (!blobConfigured()) return DEFAULT_CONTACT;
  try {
    return (await readSavedDetails()) ?? DEFAULT_CONTACT;
  } catch (error) {
    // Show the defaults rather than failing every page if Blob is unreachable
    console.error("Failed to read the saved contact details:", error);
    return DEFAULT_CONTACT;
  }
}

export const getContact = async (): Promise<Contact> => buildContact(await getContactDetails());

export async function saveContactDetails(details: ContactDetails) {
  const { url } = await put(`${BLOB_PREFIX}.json`, JSON.stringify(details), {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
  });
  const { blobs } = await list({ prefix: BLOB_PREFIX });
  const older = blobs.filter((blob) => blob.url !== url).map((blob) => blob.url);
  if (older.length) await del(older);
}
