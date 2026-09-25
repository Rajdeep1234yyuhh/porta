import { allServices, getServiceBySlug } from "../../data/services";
import { renderOgImage } from "../../lib/og";

export const alt = "Freelance development service by Rajdeep Kotoky";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Prerendered at build time: the fonts and photo it reads from assets/ are
// not bundled into serverless functions.
export const dynamicParams = false;

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  return renderOgImage({
    eyebrow: "Freelance service",
    title: service?.seoTitle ?? "Rajdeep Kotoky",
    subtitle: service ? service.technologies.slice(0, 4).join(" • ") : "Next.js • AI/ML • Shopify",
  });
}
