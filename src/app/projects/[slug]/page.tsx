import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allProjects, getProjectBySlug } from "../../data/projects";
import ProjectDetailClient, { type ProjectLink } from "../../components/ProjectDetailClient";
import { getYoutubeVideoId } from "../../lib/youtube";
import {
  JsonLd,
  absoluteUrl,
  breadcrumbJsonLd,
  clampDescription,
  pageMetadata,
  personRef,
} from "../../lib/seo";

// Only the known projects exist; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  // "Brand: Category Case Study" keeps titles short enough to show in full
  // in search results; the full project title is the page's h1.
  const name = project.title.split(" - ")[0];
  return pageMetadata({
    title: `${name}: ${project.categories[0]} Case Study`,
    description: clampDescription(project.description),
    path: `/projects/${slug}`,
    image: `/projects/${slug}/opengraph-image`,
  });
}

const toLink = ({ slug, title, categories }: (typeof allProjects)[number]): ProjectLink => ({
  slug,
  title,
  category: categories[0],
});

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = allProjects.findIndex((p) => p.slug === slug);
  const prev = allProjects[(index - 1 + allProjects.length) % allProjects.length];
  const next = allProjects[(index + 1) % allProjects.length];
  // Same primary category first, so related links stay relevant.
  const related = allProjects
    .filter((p) => p.slug !== slug && p.slug !== prev.slug && p.slug !== next.slug)
    .sort(
      (a, b) =>
        Number(b.categories[0] === project.categories[0]) -
        Number(a.categories[0] === project.categories[0]),
    )
    .slice(0, 4);

  const path = `/projects/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "CreativeWork",
            name: project.title,
            description: project.caseStudy?.overview ?? project.description,
            url: absoluteUrl(path),
            dateCreated: project.date,
            creator: personRef,
            keywords: project.tech.join(", "),
            genre: project.categories.join(", "),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path },
          ]),
        ]}
      />
      <ProjectDetailClient
        project={project}
        youtubeId={project.video ? getYoutubeVideoId(project.video) : null}
        prev={toLink(prev)}
        next={toLink(next)}
        related={related.map(toLink)}
      />
    </>
  );
}
