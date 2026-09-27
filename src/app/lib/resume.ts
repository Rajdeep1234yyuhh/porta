import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BlobNotFoundError, del, get, head, put } from "@vercel/blob";

// The resume uploaded from /admin lives in Vercel Blob under a fixed name.
// Until one is uploaded, or when no Blob store is connected (e.g. local dev),
// /resume.pdf serves the copy bundled in assets/.
const BLOB_PATH = "resume/resume.pdf";
const BUNDLED_PATH = join(process.cwd(), "assets/resume.pdf");

// Vercel rejects function request bodies over 4.5 MB
export const RESUME_MAX_BYTES = 4 * 1024 * 1024;

export const blobConfigured = () =>
  Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

export async function getUploadedResumeInfo() {
  if (!blobConfigured()) return null;
  try {
    return await head(BLOB_PATH);
  } catch (error) {
    if (error instanceof BlobNotFoundError) return null;
    throw error;
  }
}

/** The live resume: the uploaded one if present, otherwise the bundled copy. */
export async function openResume(): Promise<{ body: ReadableStream<Uint8Array> | Uint8Array; size: number }> {
  if (blobConfigured()) {
    try {
      // Skip the Blob CDN cache so a new upload is live immediately
      const uploaded = await get(BLOB_PATH, { access: "public", useCache: false });
      if (uploaded?.statusCode === 200) return { body: uploaded.stream, size: uploaded.blob.size };
    } catch (error) {
      // Serve the bundled copy rather than a broken link if Blob is unreachable
      console.error("Failed to read the uploaded resume:", error);
    }
  }
  const bundled = new Uint8Array(await readFile(BUNDLED_PATH));
  return { body: bundled, size: bundled.byteLength };
}

export async function saveResume(pdf: Buffer) {
  await put(BLOB_PATH, pdf, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/pdf",
    cacheControlMaxAge: 60,
  });
}

export async function deleteUploadedResume() {
  await del(BLOB_PATH);
}
