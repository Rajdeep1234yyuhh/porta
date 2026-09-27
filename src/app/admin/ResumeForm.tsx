"use client";

import { useActionState, useState } from "react";
import { revertResume, uploadResume, type FormState } from "./actions";

type Props = { enabled: boolean; hasUpload: boolean; maxBytes: number };

export default function ResumeForm({ enabled, hasUpload, maxBytes }: Props) {
  const [picked, setPicked] = useState<File | null>(null);
  const [state, formAction, pending] = useActionState(async (prev: FormState, formData: FormData) => {
    const result = await uploadResume(prev, formData);
    // React clears the file input after the action, so clear the selection too
    if (result?.ok) setPicked(null);
    return result;
  }, null);

  const maxMb = maxBytes / 1024 / 1024;
  const tooBig = picked !== null && picked.size > maxBytes;
  const message = tooBig ? { ok: false, message: `The PDF must be ${maxMb} MB or smaller.` } : state;

  return (
    <div className="mt-5 border-t border-slate-100 pt-5">
      <form action={formAction} className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Upload a new resume (PDF, up to {maxMb} MB)</span>
          <input
            type="file"
            name="resume"
            accept="application/pdf,.pdf"
            required
            disabled={!enabled || pending}
            onChange={(e) => setPicked(e.target.files?.[0] ?? null)}
            className="mt-2 block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-purple-700 hover:file:bg-purple-100 disabled:opacity-60"
          />
        </label>
        {message && (
          <p role={message.ok ? "status" : "alert"} className={`text-sm ${message.ok ? "text-emerald-600" : "text-red-600"}`}>
            {message.message}
          </p>
        )}
        <button
          type="submit"
          disabled={!enabled || pending || !picked || tooBig}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Uploading…" : "Upload and publish"}
        </button>
      </form>

      {hasUpload && (
        <form
          action={revertResume}
          onSubmit={(e) => {
            if (!confirm("Delete the uploaded resume and go back to the bundled copy?")) e.preventDefault();
          }}
          className="mt-4"
        >
          <button type="submit" className="text-sm font-medium text-slate-500 hover:text-red-600">
            Revert to the bundled resume
          </button>
        </form>
      )}
    </div>
  );
}
