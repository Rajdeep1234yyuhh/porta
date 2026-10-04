import Image from "next/image";
import { FlaskConical, GraduationCap } from "lucide-react";
import { EDUCATION, EXPERIENCE, PROFILE, PROFILE_STATS, RESEARCH, SKILL_GROUPS } from "../../data/profile";
import { testimonials } from "../../data/testimonials";
import { pageMetadata } from "../../lib/seo";
import { SELLER_RATING } from "../catalog";
import { Breadcrumbs, Container, ReviewCard, SectionHeader, SellerRating } from "../components/ui";
import SellerContact from "./SellerContact";

export const metadata = {
  ...pageMetadata({
    title: "About the Seller | Store",
    description: `${PROFILE.name} — ${PROFILE.role}. Experience, skills, research and reviews.`,
    path: "/ecom/seller",
  }),
  alternates: { canonical: "/" },
};

export default function SellerPage() {
  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ label: "Store", href: "/ecom" }, { label: "About the seller" }]} />

      <section className="mt-6 grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 md:grid-cols-[auto_1fr]">
        <Image src={PROFILE.photo} alt={PROFILE.name} width={144} height={144} className="h-28 w-28 rounded-3xl object-cover sm:h-36 sm:w-36" priority />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Seller profile</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{PROFILE.name}</h1>
          <p className="mt-1 text-slate-600">{PROFILE.role}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <SellerRating />
            <span className="flex items-center gap-2 font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" /> Available for new projects
            </span>
            <span className="text-slate-500">
              {PROFILE.location} · Replies {PROFILE.responseTime.toLowerCase()}
            </span>
          </div>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">{PROFILE.bio}</p>
          <div className="mt-5">
            <SellerContact />
          </div>
        </div>
      </section>

      <section aria-label="Seller stats" className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PROFILE_STATS.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-slate-50 p-5">
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
          </div>
        ))}
      </section>

      <div className="mt-14 grid gap-10 lg:grid-cols-[3fr_2fr]">
        <section>
          <SectionHeader title="Store history" subtitle="Experience" />
          <ol className="relative space-y-6 border-l-2 border-violet-100 pl-6">
            {EXPERIENCE.map((role) => (
              <li key={role.title} className="relative">
                <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-white bg-violet-600" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">{role.period}</p>
                <h3 className="mt-0.5 font-bold text-slate-900">{role.title}</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-5">
              <FlaskConical className="h-5 w-5 text-violet-600" />
              <h3 className="mt-2 font-bold text-slate-900">Research</h3>
              <p className="mt-1 text-sm font-medium text-slate-800">{RESEARCH.title}</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {RESEARCH.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 p-5">
              <GraduationCap className="h-5 w-5 text-violet-600" />
              <h3 className="mt-2 font-bold text-slate-900">Education</h3>
              <p className="mt-1 text-sm text-slate-700">
                {EDUCATION.degree}, {EDUCATION.field}
              </p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeader title="Skills & tech stack" subtitle="What every product is built with" />
          <div className="space-y-5">
            {SKILL_GROUPS.map((group) => (
              <div key={group.name}>
                <h3 className="text-sm font-bold text-slate-900">{group.name}</h3>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section id="reviews" className="mt-14">
        <SectionHeader
          title="Seller reviews"
          subtitle={`${SELLER_RATING.average.toFixed(1)} out of 5 from ${SELLER_RATING.count} Google reviews`}
          href={SELLER_RATING.url}
          linkLabel="See all on Google"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </Container>
  );
}
