import Link from "next/link";
import { X } from "lucide-react";
import type { Project } from "../../data/projects";
import { pageMetadata } from "../../lib/seo";
import { getServiceBySlug } from "../../data/services";
import { DEPARTMENTS, allProjects, getDepartment, projectsForProduct, projectsInDepartment } from "../catalog";
import { Breadcrumbs, CategoryCard, Container } from "../components/ui";

export const metadata = pageMetadata({
  title: "All Categories | Store",
  description:
    "Every portfolio build as a store category: Shopify stores, web apps and platforms, and AI & ML projects, filterable by department and tech.",
  path: "/ecom/categories",
});

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "name", label: "A–Z" },
] as const;

type Params = { department?: string; tech?: string; product?: string; sort?: string };

// Tech tags used by at least two builds, most common first
const TECH_FACETS = Object.entries(
  allProjects.flatMap((p) => p.tech).reduce<Record<string, number>>((acc, t) => ({ ...acc, [t]: (acc[t] ?? 0) + 1 }), {}),
)
  .filter(([, count]) => count > 1)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

function sortProjects(projects: Project[], sort: string) {
  const list = [...projects];
  if (sort === "newest") return list.sort((a, b) => b.date.localeCompare(a.date));
  if (sort === "oldest") return list.sort((a, b) => a.date.localeCompare(b.date));
  if (sort === "name") return list.sort((a, b) => a.title.localeCompare(b.title));
  return list;
}

export default async function CategoriesPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const department = getDepartment(params.department);
  const tech = TECH_FACETS.some(([t]) => t === params.tech) ? params.tech : undefined;
  const product = params.product ? getServiceBySlug(params.product) : undefined;
  const sort = SORTS.some((s) => s.value === params.sort) ? params.sort! : "featured";

  const withProduct = product ? new Set(projectsForProduct(product).map((p) => p.slug)) : null;
  const results = sortProjects(
    (department ? projectsInDepartment(department) : allProjects).filter(
      (p) => (!tech || p.tech.includes(tech)) && (!withProduct || withProduct.has(p.slug)),
    ),
    sort,
  );

  const href = (next: Params) => {
    const merged = { department: department?.slug, tech, product: product?.slug, sort: sort === "featured" ? undefined : sort, ...next };
    const query = new URLSearchParams(Object.entries(merged).filter((e): e is [string, string] => Boolean(e[1]))).toString();
    return `/ecom/categories${query ? `?${query}` : ""}`;
  };
  const chip = (active: boolean) =>
    `block rounded-lg px-3 py-1.5 text-sm ${active ? "bg-violet-600 font-semibold text-white" : "text-slate-700 hover:bg-slate-100"}`;

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { label: "Store", href: "/ecom" },
          { label: "Categories", href: department ? "/ecom/categories" : undefined },
          ...(department ? [{ label: department.name }] : []),
        ]}
      />
      <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">{department?.name ?? "All categories"}</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        {department?.blurb ?? "Every build in the portfolio is a category here — open one to see what went into it and the products behind it."}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[15rem_1fr]">
        <aside aria-label="Filters" className="space-y-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Department</h2>
            <ul className="mt-2 flex flex-wrap gap-1 lg:flex-col">
              <li>
                <Link href={href({ department: undefined })} scroll={false} className={chip(!department)}>
                  All <span className="opacity-70">({allProjects.length})</span>
                </Link>
              </li>
              {DEPARTMENTS.map((d) => (
                <li key={d.slug}>
                  <Link href={href({ department: d.slug })} scroll={false} className={chip(department?.slug === d.slug)}>
                    {d.name} <span className="opacity-70">({projectsInDepartment(d).length})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Tech</h2>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {TECH_FACETS.map(([t, count]) => (
                <li key={t}>
                  <Link
                    href={href({ tech: tech === t ? undefined : t })}
                    scroll={false}
                    aria-current={tech === t ? "true" : undefined}
                    className={`inline-block rounded-full border px-2.5 py-1 text-xs ${
                      tech === t ? "border-violet-600 bg-violet-600 text-white" : "border-slate-200 text-slate-700 hover:border-violet-300"
                    }`}
                  >
                    {t} <span className="opacity-70">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section aria-label="Results">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900">{results.length}</strong> {results.length === 1 ? "category" : "categories"}
              {[
                tech && { label: tech, clear: href({ tech: undefined }) },
                product && { label: `Made with ${product.title}`, clear: href({ product: undefined }) },
              ].map(
                (filter) =>
                  filter && (
                    <Link
                      key={filter.label}
                      href={filter.clear}
                      scroll={false}
                      className="ml-2 inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700 hover:bg-violet-100"
                    >
                      {filter.label} <X className="h-3 w-3" aria-label="Remove filter" />
                    </Link>
                  ),
              )}
            </p>
            <nav aria-label="Sort" className="flex items-center gap-1 text-sm">
              <span className="mr-1 text-slate-500">Sort:</span>
              {SORTS.map((s) => (
                <Link
                  key={s.value}
                  href={href({ sort: s.value === "featured" ? undefined : s.value })}
                  scroll={false}
                  aria-current={sort === s.value ? "true" : undefined}
                  className={`rounded-md px-2 py-1 ${sort === s.value ? "bg-slate-900 font-semibold text-white" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  {s.label}
                </Link>
              ))}
            </nav>
          </div>

          {results.length ? (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((project) => (
                <CategoryCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-slate-500">
              No categories match.{" "}
              <Link href="/ecom/categories" className="font-semibold text-violet-700 hover:underline">
                Clear filters
              </Link>
            </p>
          )}
        </section>
      </div>
    </Container>
  );
}
