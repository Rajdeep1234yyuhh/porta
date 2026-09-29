"use client";

import { useActionState } from "react";
import type { ContactDetails } from "../data/site";
import { updateContact } from "./actions";

type Field = {
  name: keyof ContactDetails;
  label: string;
  type: "email" | "tel" | "text";
  hint: string;
};

// Profile links accept "github.com/you" as well as full URLs, so they aren't type="url"
const FIELDS: Field[] = [
  { name: "email", label: "Email", type: "email", hint: "Used for the email buttons and mailto links." },
  { name: "phone", label: "Phone", type: "tel", hint: "With the country code, e.g. +91 8638752315." },
  { name: "whatsapp", label: "WhatsApp", type: "tel", hint: "With the country code, e.g. +91 8638752315." },
  { name: "github", label: "GitHub profile", type: "text", hint: "e.g. https://github.com/username" },
  { name: "linkedin", label: "LinkedIn profile", type: "text", hint: "e.g. https://www.linkedin.com/in/username" },
  { name: "instagram", label: "Instagram profile", type: "text", hint: "e.g. https://www.instagram.com/username" },
];

type Props = { initial: ContactDetails; enabled: boolean };

export default function ContactForm({ initial, enabled }: Props) {
  const [state, formAction, pending] = useActionState(updateContact, null);
  // React resets the form after each submit, back to these values
  const values = state?.values ?? initial;

  return (
    <form action={formAction} className="mt-5 border-t border-slate-100 pt-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const error = state?.errors?.[field.name];
          return (
            <label key={field.name} className="block">
              <span className="text-sm font-medium text-slate-700">{field.label}</span>
              <input
                type={field.type}
                name={field.name}
                defaultValue={values[field.name]}
                required
                disabled={!enabled || pending}
                aria-invalid={error ? true : undefined}
                aria-describedby={`${field.name}-note`}
                autoComplete="off"
                spellCheck={false}
                className={`mt-1.5 block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 disabled:opacity-60 ${
                  error ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:border-purple-300 focus:ring-purple-100"
                }`}
              />
              <span id={`${field.name}-note`} className={`mt-1 block text-xs ${error ? "text-red-600" : "text-slate-500"}`}>
                {error ?? field.hint}
              </span>
            </label>
          );
        })}
      </div>

      {state && (
        <p role={state.ok ? "status" : "alert"} className={`mt-4 text-sm ${state.ok ? "text-emerald-600" : "text-red-600"}`}>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={!enabled || pending}
        className="mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save contact details"}
      </button>
    </form>
  );
}
