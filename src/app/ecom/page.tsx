import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Briefcase, Clock, Star, Store } from "lucide-react";
import { PROFILE, PROFILE_STATS } from "../data/profile";
import { testimonials } from "../data/testimonials";
import { pageMetadata } from "../lib/seo";
import { DEPARTMENTS, SELLER_RATING, allProjects, allServices, projectsInDepartment } from "./catalog";
import { CategoryCard, Container, ProductCard, ReviewCard, SectionHeader, SellerRating } from "./components/ui";
import { ProjectVisual } from "./components/visuals";

export const metadata = pageMetadata({
  title: "Store: Rajdeep Kotoky's Portfolio as a Shop",
  description:
    "Browse Rajdeep Kotoky's portfolio as an online store: Shopify stores, web platforms and AI builds as categories, and development services as products you can add to a quote cart.",
  path: "/ecom",
});

const STAT_ICONS = [Briefcase, Store, BadgeCheck, Clock];

export default function StoreHome() {
  const reviews = testimonials.filter((t) => t.text).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-slate-50 py-6 sm:py-8">
        <Container className="grid gap-5 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 p-7 text-white sm:p-10 lg:col-span-2">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
            <div className="absolute -bottom-24 right-24 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" aria-hidden="true" />
            <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-violet-200">Built to order</p>
            <h1 className="relative mt-3 max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">{PROFILE.headline}</h1>
            <p className="relative mt-4 max-w-xl text-sm leading-relaxed text-violet-100 sm:text-base">{PROFILE.bio}</p>
            <div className="relative mt-7 flex flex-wrap gap-3">
              <Link href="/ecom/products" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-800 hover:bg-violet-50">
                Shop products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/ecom/categories" className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">
                Browse {allProjects.length} categories
              </Link>
            </div>
          </div>

          <aside className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Sold by</p>
            <div className="mt-4 flex items-center gap-4">
              <Image src={PROFILE.photo} alt={PROFILE.name} width={72} height={72} className="h-18 w-18 shrink-0 rounded-2xl object-cover" />
              <div>
                <p className="text-lg font-bold text-slate-900">{PROFILE.name}</p>
                <p className="text-sm text-slate-500">{PROFILE.role}</p>
              </div>
            </div>
            <div className="mt-4">
              <SellerRating />
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" /> Available for new projects
            </p>
            <p className="mt-1 text-sm text-slate-500">Based in {PROFILE.location} · Replies {PROFILE.responseTime.toLowerCase()}</p>
            <div className="mt-auto pt-6">
              <Link
                href="/ecom/seller"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Visit seller profile <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      {/* Trust strip */}
      <section className="border-y border-slate-200 bg-white">
        <Container className="grid grid-cols-2 gap-y-5 py-6 lg:grid-cols-5">
          {PROFILE_STATS.map((stat, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-lg font-bold leading-none text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
          <div className="col-span-2 flex items-center gap-3 lg:col-span-1">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
              <Star className="h-5 w-5 fill-amber-400" />
            </span>
            <div>
              <p className="text-lg font-bold leading-none text-slate-900">{SELLER_RATING.average.toFixed(1)} / 5</p>
              <p className="mt-1 text-xs text-slate-500">{SELLER_RATING.count} Google reviews</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Departments */}
      <section className="py-12">
        <Container>
          <SectionHeader title="Shop by department" subtitle="Every build in the portfolio, grouped like store aisles." href="/ecom/categories" linkLabel="All categories" />
          <div className="grid gap-5 md:grid-cols-3">
            {DEPARTMENTS.map((dept) => {
              const projects = projectsInDepartment(dept);
              return (
                <Link
                  key={dept.slug}
                  href={`/ecom/categories?department=${dept.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
                >
                  <div className="grid h-36 grid-cols-3 gap-0.5 bg-slate-200">
                    {projects.slice(0, 3).map((p) => (
                      <div key={p.slug} className="relative overflow-hidden">
                        <ProjectVisual project={p} sizes="15vw" />
                      </div>
                    ))}
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-700">{dept.name}</h3>
                      <span className="shrink-0 text-sm text-slate-500">{projects.length} categories</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{dept.blurb}</p>
                    <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-violet-700">
                      Shop {dept.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="bg-slate-50 py-12">
        <Container>
          <SectionHeader title="Featured products" subtitle="Services you can add to your cart and get a quote for." href="/ecom/products" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {allServices.map((service) => (
              <ProductCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-12">
        <Container>
          <SectionHeader title="Popular categories" subtitle="Live builds, each with the products that went into it." href="/ecom/categories" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {allProjects.slice(0, 8).map((project) => (
              <CategoryCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-slate-50 py-12">
        <Container>
          <SectionHeader title="Customer reviews" subtitle={`${SELLER_RATING.average.toFixed(1)} out of 5 from ${SELLER_RATING.count} Google reviews`} href={SELLER_RATING.url} linkLabel="See all on Google" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
