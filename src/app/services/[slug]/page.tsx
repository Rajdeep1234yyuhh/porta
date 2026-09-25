import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allServices, getServiceBySlug } from "../../data/services";
import ServiceDetailClient from "../../components/ServiceDetailClient";
import {
  JsonLd,
  absoluteUrl,
  breadcrumbJsonLd,
  clampDescription,
  pageMetadata,
  personRef,
} from "../../lib/seo";

// Only the known services exist; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: clampDescription(
      `${service.shortDescription} Hire Rajdeep Kotoky, freelance full-stack developer.`,
      160,
    ),
    path: `/services/${slug}`,
    image: `/services/${slug}/opengraph-image`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const index = allServices.findIndex((s) => s.slug === slug);
  const path = `/services/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "Service",
            name: service.seoTitle,
            serviceType: service.title,
            description: service.fullDescription,
            url: absoluteUrl(path),
            provider: personRef,
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path },
          ]),
        ]}
      />
      <ServiceDetailClient service={service} index={index} />
    </>
  );
}
