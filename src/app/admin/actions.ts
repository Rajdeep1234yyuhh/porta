"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminConfigured, checkPassword, endSession, requireAdmin, startSession } from "../lib/admin-auth";
import { RESUME_MAX_BYTES, deleteUploadedResume, saveResume } from "../lib/resume";

export type FormState = { ok: boolean; message: string } | null;

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!adminConfigured()) {
    return { ok: false, message: "Admin login isn't set up. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET." };
  }
  const password = formData.get("password");
  if (typeof password !== "string" || !checkPassword(password)) {
    return { ok: false, message: "Wrong password." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

export async function uploadResume(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const file = formData.get("resume");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Choose a PDF to upload." };
  }
  if (file.size > RESUME_MAX_BYTES) {
    return { ok: false, message: `The PDF must be ${RESUME_MAX_BYTES / 1024 / 1024} MB or smaller.` };
  }
  // Check the file's signature, not its name or the browser-reported type
  const pdf = Buffer.from(await file.arrayBuffer());
  if (pdf.subarray(0, 5).toString("latin1") !== "%PDF-") {
    return { ok: false, message: "That file isn't a PDF." };
  }

  try {
    await saveResume(pdf);
  } catch (error) {
    console.error("Resume upload failed:", error);
    return { ok: false, message: "Upload failed. Check the Blob store connection and try again." };
  }
  revalidatePath("/admin");
  return { ok: true, message: "Resume updated. It's live at /resume.pdf." };
}

export async function revertResume() {
  await requireAdmin();
  await deleteUploadedResume();
  revalidatePath("/admin");
}
