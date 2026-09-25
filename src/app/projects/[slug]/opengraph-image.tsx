import { allProjects, getProjectBySlug } from "../../data/projects";
import { renderOgImage } from "../../lib/og";

export const alt = "Project case study by Rajdeep Kotoky";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Prerendered at build time: the fonts and photo it reads from assets/ are
// not bundled into serverless functions.
export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return renderOgImage({
    eyebrow: project ? `Case study · ${project.categories[0]}` : "Case study",
    title: project?.title ?? "Rajdeep Kotoky",
    subtitle: project ? project.tech.slice(0, 4).join(" • ") : "Next.js • AI/ML • Shopify",
  });
}
