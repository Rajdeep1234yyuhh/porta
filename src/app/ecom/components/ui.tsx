import Link from "next/link";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import type { Project } from "../../data/projects";
import type { ServiceData } from "../../data/services";
import type { Testimonial } from "../../data/testimonials";
import { BEST_SELLER, SELLER_RATING, primaryDepartment, productsForProject, projectName, projectsForProduct } from "../catalog";
import { AddToCartButton } from "./CartButtons";
import { ProductVisual, ProjectVisual } from "./visuals";

export function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${className} ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} />
      ))}
    </span>
  );
}

export function SellerRating({ compact }: { compact?: boolean }) {
  return (
    <a href={SELLER_RATING.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm hover:underline">
      <Stars rating={SELLER_RATING.average} className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      <span className="font-semibold text-slate-900">{SELLER_RATING.average.toFixed(1)}</span>
      <span className="text-slate-500">({SELLER_RATING.count}{compact ? "" : " Google reviews"})</span>
    </a>
  );
}

/** Services have no list price; the store quotes per project. */
export function QuotePrice({ large }: { large?: boolean }) {
  return (
    <div>
      <p className={`font-bold text-slate-900 ${large ? "text-2xl" : "text-base"}`}>Price on request</p>
      <p className="text-xs text-slate-500">Quoted per project — depends on scope</p>
    </div>
  );
}

export function SectionHeader({ title, subtitle, href, linkLabel = "View all" }: { title: string; subtitle?: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:underline">
          {linkLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-violet-700 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-slate-800">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ProductCard({ service }: { service: ServiceData }) {
  const builds = projectsForProduct(service).length;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
      <Link href={`/ecom/products/${service.slug}`} className="relative block aspect-[16/9] overflow-hidden sm:aspect-[4/3]">
        <ProductVisual service={service} />
        {service.slug === BEST_SELLER.slug && (
          <span className="absolute left-3 top-3 rounded-md bg-amber-400 px-2 py-0.5 text-xs font-bold text-amber-950 shadow">Best seller</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/ecom/products/${service.slug}`} className="font-semibold text-slate-900 hover:text-violet-700">
          {service.title}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{service.shortDescription}</p>
        <div className="mt-2">
          <SellerRating compact />
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Featured in {builds} {builds === 1 ? "build" : "builds"}
        </p>
        <div className="mt-auto pt-4">
          <QuotePrice />
          <div className="mt-3">
            <AddToCartButton slug={service.slug} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function CategoryCard({ project }: { project: Project }) {
  const { name, subtitle } = projectName(project);
  const products = productsForProject(project).length;
  return (
    <Link
      href={`/ecom/categories/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
          <ProjectVisual project={project} />
        </div>
        <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur">
          {primaryDepartment(project).name}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-slate-900 group-hover:text-violet-700">{name}</h3>
        {subtitle && <p className="mt-0.5 line-clamp-2 text-sm text-slate-600">{subtitle}</p>}
        <p className="mt-auto pt-3 text-xs text-slate-500">
          {project.date} · {products} {products === 1 ? "product" : "products"} · {project.tech.length} tags
        </p>
      </div>
    </Link>
  );
}

export function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ background: review.avatarColor }}
          aria-hidden="true"
        >
          {review.initial}
        </span>
        <figcaption className="min-w-0">
          <p className="truncate font-semibold text-slate-900">{review.name}</p>
          <p className="truncate text-xs text-slate-500">{review.role}</p>
        </figcaption>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Stars rating={review.rating} className="h-3.5 w-3.5" />
        <span className="text-xs text-slate-500">Google review</span>
      </div>
      <blockquote className={`mt-2 text-sm leading-relaxed ${review.text ? "text-slate-700" : "italic text-slate-400"}`}>
        {review.text ? `“${review.text}”` : `Left a ${review.rating}-star rating`}
      </blockquote>
    </figure>
  );
}

export const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);
