import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ExternalLink, Github, PlayCircle } from "lucide-react";
import { getProjectBySlug } from "../../../data/projects";
import { getYoutubeVideoId } from "../../../lib/youtube";
import { clampDescription, pageMetadata } from "../../../lib/seo";
import { allProjects, hasSource, primaryDepartment, productsForProject, projectHost, projectName, projectsInDepartment } from "../../catalog";
import { Breadcrumbs, CategoryCard, Container, ProductCard, SectionHeader } from "../../components/ui";
import { ProjectVisual } from "../../components/visuals";

export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return {};
  const { name } = projectName(project);
  return {
    ...pageMetadata({ title: `${name} | Store`, description: clampDescription(project.description), path: `/ecom/categories/${project.slug}` }),
    // Same content as the case study page, which is the one to rank
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  const { name, subtitle } = projectName(project);
  const department = primaryDepartment(project);
  const products = productsForProject(project);
  const host = projectHost(project);
  const youtubeId = project.video ? getYoutubeVideoId(project.video) : null;
  const related = projectsInDepartment(department).filter((p) => p.slug !== project.slug).slice(0, 4);
  const cs = project.caseStudy;

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { label: "Store", href: "/ecom" },
          { label: department.name, href: `/ecom/categories?department=${department.slug}` },
          { label: name },
        ]}
      />

      <section className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
          <ProjectVisual project={project} sizes="(min-width: 1024px) 50vw, 100vw" priority />
        </div>

        <div>
          <span className="inline-block rounded-md bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">{project.categories.join(" · ")}</span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{name}</h1>
          {subtitle && <p className="mt-1 text-lg text-slate-600">{subtitle}</p>}
          <p className="mt-4 leading-relaxed text-slate-700">{project.description}</p>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-xs text-slate-500">Year</dt>
              <dd className="font-semibold text-slate-900">{project.date}</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-xs text-slate-500">Products</dt>
              <dd className="font-semibold text-slate-900">{products.length}</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-xs text-slate-500">Tech tags</dt>
              <dd className="font-semibold text-slate-900">{project.tech.length}</dd>
            </div>
          </dl>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech tags">
            {project.tech.map((t) => (
              <li key={t}>
                <Link href={`/ecom/categories?tech=${encodeURIComponent(t)}`} className="inline-block rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-700 hover:border-violet-300 hover:text-violet-700">
                  {t}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#products" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white hover:opacity-90">
              Shop this category <ArrowRight className="h-4 w-4" />
            </a>
            {youtubeId && (
              <a href={project.video} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                <PlayCircle className="h-4 w-4" /> Watch demo
              </a>
            )}
            {host && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                <ExternalLink className="h-4 w-4" /> Visit {host}
              </a>
            )}
            {hasSource(project) && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                <Github className="h-4 w-4" /> Source code
              </a>
            )}
          </div>
        </div>
      </section>

      <section id="products" className="mt-14 scroll-mt-40">
        <SectionHeader title="Products in this category" subtitle={`The services that built ${name}.`} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((service) => (
            <ProductCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {cs && (
        <section className="mt-14">
          <SectionHeader title="About this category" subtitle="The case study behind the build." />
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              { title: "Overview", text: cs.overview },
              { title: "The challenge", text: cs.challenge },
              { title: "The solution", text: cs.solution },
            ].map((block) => (
              <div key={block.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">{block.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{block.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-emerald-50 p-5">
            <h3 className="font-bold text-emerald-900">Highlights</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {cs.results.map((result) => (
                <li key={result} className="flex gap-2 text-sm text-emerald-900">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {result}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-14">
          <SectionHeader title={`More in ${department.name}`} href={`/ecom/categories?department=${department.slug}`} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <CategoryCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
