import { openResume } from "../lib/resume";

// Always resolve the current file so an upload from /admin is live at once
export const dynamic = "force-dynamic";

export async function GET() {
  const { body, size } = await openResume();
  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(size),
      "Content-Disposition": 'inline; filename="Rajdeep-Kotoky-Resume.pdf"',
      "Cache-Control": "no-cache",
    },
  });
}
