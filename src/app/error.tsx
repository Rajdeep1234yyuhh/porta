"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useContact } from "./context/ContactContext";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const contact = useContact();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 text-center bg-slate-50">
      <span className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
        Something went wrong
      </span>
      <h1 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
        This page hit an{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">unexpected error</span>
      </h1>
      <p className="mt-3 max-w-md text-sm md:text-base text-slate-600">
        Try again, or head back home. If it keeps happening, email{" "}
        <a href={contact.mailtoHref} className="text-purple-600 font-medium hover:underline">
          {contact.email}
        </a>
        .
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:border-purple-300 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
