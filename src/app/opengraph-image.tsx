import { renderOgImage } from "./lib/og";

export const alt = "Rajdeep Kotoky, freelance full-stack developer and AI engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Freelance Software Developer",
    title: "Rajdeep Kotoky",
    subtitle: "Next.js • AI/ML • Shopify",
  });
}
