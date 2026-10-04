import Link from "next/link";
import type { Project } from "../../data/projects";
import type { ServiceData } from "../../data/services";
import { pageMetadata } from "../../lib/seo";
import { DEPARTMENTS, allProjects, allServices } from "../catalog";
import { Breadcrumbs, CategoryCard, Container, ProductCard, SectionHeader } from "../components/ui";

export const metadata = {
  ...pageMetadata({ title: "Search | Store", description: "Search the store.", path: "/ecom/search" }),
  robots: { index: false, follow: true },
};

const productText = (s: ServiceData) =>
  [s.title, s.shortDescription, s.fullDescription, ...s.features, ...s.technologies].join(" ").toLowerCase();

const categoryText = (p: Project) =>
  [p.title, p.description, p.demo, ...p.tech, ...p.categories, p.caseStudy?.overview ?? ""].join(" ").toLowerCase();

// Every word of the query must appear somewhere in the item
const matches = (text: string, words: string[]) => words.every((w) => text.includes(w));

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw ?? "").trim().slice(0, 100);
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);

  const products = words.length ? allServices.filter((s) => matches(productText(s), words)) : [];
  const categories = words.length ? allProjects.filter((p) => matches(categoryText(p), words)) : [];
  const total = products.length + categories.length;

  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ label: "Store", href: "/ecom" }, { label: "Search" }]} />
      <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
        {query ? (
          <>
            Results for <span className="text-violet-700">“{query}”</span>
          </>
        ) : (
          "Search the store"
        )}
      </h1>
      {query && (
        <p className="mt-2 text-slate-600">
          {total} {total === 1 ? "result" : "results"}: {products.length} {products.length === 1 ? "product" : "products"}, {categories.length}{" "}
          {categories.length === 1 ? "category" : "categories"}
        </p>
      )}

      {query && total === 0 && (
        <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-slate-700">
          <p className="font-semibold">Nothing matched.</p>
          <p className="mt-1 text-sm">Try a technology like “Next.js” or “Shopify”, or browse instead:</p>
        </div>
      )}

      {(!query || total === 0) && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {[
            { href: "/ecom/products", label: "All products" },
            ...DEPARTMENTS.map((d) => ({ href: `/ecom/categories?department=${d.slug}`, label: d.name })),
          ].map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="inline-block rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-violet-300 hover:text-violet-700">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {products.length > 0 && (
        <section className="mt-10">
          <SectionHeader title="Products" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((s) => (
              <ProductCard key={s.slug} service={s} />
            ))}
          </div>
        </section>
      )}

      {categories.length > 0 && (
        <section className="mt-10">
          <SectionHeader title="Categories" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((p) => (
              <CategoryCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
