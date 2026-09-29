import Link from "next/link";
import { Suspense } from "react";
import { requireAdmin } from "../lib/admin-auth";
import { getContactDetails } from "../lib/contact";
import { RESUME_MAX_BYTES, blobConfigured, getUploadedResumeInfo } from "../lib/resume";
import { SEARCH_RANGES } from "../lib/search-console";
import { logout } from "./actions";
import ContactForm from "./ContactForm";
import ResumeForm from "./ResumeForm";
import SearchPanel from "./SearchPanel";

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

const formatDate = (date: Date) =>
  date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  await requireAdmin();

  const { range } = await searchParams;
  const searchRange = SEARCH_RANGES.find((days) => String(days) === range) ?? 28;
  const canUpload = blobConfigured();
  const [uploaded, contactDetails] = await Promise.all([getUploadedResumeInfo(), getContactDetails()]);

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-purple-100 text-purple-600 border border-purple-200">
            Admin
          </span>
          <h1 className="mt-3 text-2xl font-bold">Site content</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-purple-300"
          >
            View site
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-purple-300"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Resume</h2>
            <p className="mt-1 text-sm text-slate-600">
              {uploaded
                ? `Uploaded ${formatDate(uploaded.uploadedAt)} · ${formatSize(uploaded.size)}`
                : "Showing the bundled copy from the repo (assets/resume.pdf)."}
            </p>
          </div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-purple-600 hover:underline"
          >
            Open /resume.pdf ↗
          </a>
        </div>

        {!canUpload && (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Uploads need a Vercel Blob store. In your Vercel project, open Storage, create a{" "}
            <strong>public</strong> Blob store and connect it to this project, then redeploy. For local
            development, run <code>vercel env pull .env.local</code> afterwards.
          </p>
        )}

        <ResumeForm enabled={canUpload} hasUpload={uploaded !== null} maxBytes={RESUME_MAX_BYTES} />
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Contact details</h2>
        <p className="mt-1 text-sm text-slate-600">
          Shown everywhere on the site: the navbar, hero and contact buttons, the chat assistant, the terminal and 3D
          pages, and the details Google reads.
        </p>
        {!canUpload && (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Saving needs the same Vercel Blob store as the resume upload. Until it&apos;s connected, the site shows the
            details below from the code.
          </p>
        )}
        <ContactForm initial={contactDetails} enabled={canUpload} />
      </section>

      {/* Google can be slow; the rest of the page doesn't wait for it */}
      <Suspense
        fallback={
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Search performance</h2>
            <p className="mt-1 text-sm text-slate-500">Loading Search Console data…</p>
          </section>
        }
      >
        <SearchPanel range={searchRange} />
      </Suspense>
    </>
  );
}
