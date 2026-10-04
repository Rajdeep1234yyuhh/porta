import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, Globe2, PackageCheck, ShieldCheck } from "lucide-react";
import { getServiceBySlug } from "../../../data/services";
import { testimonials } from "../../../data/testimonials";
import { PROFILE } from "../../../data/profile";
import { pageMetadata } from "../../../lib/seo";
import { BEST_SELLER, SELLER_RATING, allServices, projectsForProduct } from "../../catalog";
import { AddToCartButton, BuyNowButton } from "../../components/CartButtons";
import { Breadcrumbs, CategoryCard, Container, ProductCard, QuotePrice, ReviewCard, SectionHeader, SellerRating } from "../../components/ui";
import { ProductVisual } from "../../components/visuals";

export const dynamicParams = false;

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getServiceBySlug((await params).slug);
  if (!service) return {};
  return {
    ...pageMetadata({ title: `${service.title} | Store`, description: service.shortDescription, path: `/ecom/products/${service.slug}` }),
    // Same content as the service page, which is the one to rank
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();

  const builds = projectsForProduct(service);
  const others = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);
  const reviews = testimonials.filter((t) => t.text).slice(0, 3);

  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ label: "Store", href: "/ecom" }, { label: "Products", href: "/ecom/products" }, { label: service.title }]} />

      <section className="mt-6 grid gap-8 lg:grid-cols-[1fr_1fr_20rem]">
        <div className="relative aspect-square overflow-hidden rounded-3xl lg:col-span-1">
          <ProductVisual service={service} large />
          {service.slug === BEST_SELLER.slug && (
            <span className="absolute left-4 top-4 rounded-md bg-amber-400 px-2.5 py-1 text-sm font-bold text-amber-950 shadow">Best seller</span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{service.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            Sold by{" "}
            <Link href="/ecom/seller" className="font-medium text-violet-700 hover:underline">
              {PROFILE.name}
            </Link>
          </p>
          <div className="mt-3">
            <SellerRating />
          </div>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">{service.shortDescription}</p>

          <h2 className="mt-6 text-sm font-bold uppercase tracking-wider text-slate-500">What&apos;s included</h2>
          <ul className="mt-3 space-y-2">
            {service.features.map((feature) => (
              <li key={feature} className="flex gap-2 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /> {feature}
              </li>
            ))}
          </ul>
        </div>

        <aside aria-label="Buy" className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-40">
          <QuotePrice large />
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" /> In stock: available for new projects
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
            <li className="flex gap-2">
              <Globe2 className="h-4 w-4 shrink-0 text-slate-400" /> Delivered remotely, worldwide
            </li>
            <li className="flex gap-2">
              <Clock className="h-4 w-4 shrink-0 text-slate-400" /> Replies {PROFILE.responseTime.toLowerCase()}
            </li>
            <li className="flex gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-slate-400" /> Performance-optimized &amp; security-checked
            </li>
            <li className="flex gap-2">
              <PackageCheck className="h-4 w-4 shrink-0 text-slate-400" /> Backed by post-launch support
            </li>
          </ul>
          <div className="mt-5 space-y-2.5">
            <AddToCartButton slug={service.slug} size="lg" />
            <BuyNowButton title={service.title} />
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">Checkout sends an inquiry — nothing is charged.</p>
        </aside>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Product description</h2>
          <p className="mt-3 leading-relaxed text-slate-700">{service.fullDescription}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Specifications</h2>
          <dl className="mt-3 divide-y divide-slate-200 rounded-2xl border border-slate-200 text-sm">
            <div className="grid grid-cols-[7rem_1fr] gap-3 p-3">
              <dt className="text-slate-500">Tech stack</dt>
              <dd className="text-slate-900">{service.technologies.join(", ")}</dd>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-3 p-3">
              <dt className="text-slate-500">Featured in</dt>
              <dd className="text-slate-900">
                {builds.length} {builds.length === 1 ? "build" : "builds"}
              </dd>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-3 p-3">
              <dt className="text-slate-500">Delivery</dt>
              <dd className="text-slate-900">Remote, worldwide</dd>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-3 p-3">
              <dt className="text-slate-500">Engagement</dt>
              <dd className="text-slate-900">{PROFILE.openFor}</dd>
            </div>
          </dl>
        </div>
      </section>

      {builds.length > 0 && (
        <section className="mt-14">
          <SectionHeader
            title="Categories featuring this product"
            subtitle={`${builds.length} ${builds.length === 1 ? "build" : "builds"} made with ${service.title}.`}
            href={builds.length > 8 ? `/ecom/categories?product=${service.slug}` : undefined}
            linkLabel={`View all ${builds.length}`}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {builds.slice(0, 8).map((project) => (
              <CategoryCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <SectionHeader title="You may also like" href="/ecom/products" linkLabel="All products" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => (
            <ProductCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeader
          title="Seller reviews"
          subtitle={`${SELLER_RATING.average.toFixed(1)} out of 5 from ${SELLER_RATING.count} Google reviews`}
          href={SELLER_RATING.url}
          linkLabel="See all on Google"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </Container>
  );
}
