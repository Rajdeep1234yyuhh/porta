import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | Rajdeep Kotoky",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 text-center bg-slate-50">
      <span className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-purple-100 text-purple-600 border border-purple-200">
        404
      </span>
      <h1 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
        This page doesn&apos;t{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">exist</span>
      </h1>
      <p className="mt-3 max-w-md text-sm md:text-base text-slate-600">
        The link may be broken or the page may have moved. Here are a few good places to start.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Back to home
        </Link>
        <Link
          href="/projects"
          className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:border-purple-300 transition-colors"
        >
          View projects
        </Link>
        <Link
          href="/services"
          className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:border-purple-300 transition-colors"
        >
          Services
        </Link>
      </div>
    </main>
  );
}
