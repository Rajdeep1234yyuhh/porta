import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allServices, getServiceBySlug } from "../../data/services";
import ServiceDetailClient from "../../components/ServiceDetailClient";

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
  return {
    title: `${service.title} | Rajdeep Kotoky`,
    description: service.shortDescription,
    alternates: {
      canonical: `https://rajdeepkotoky.vercel.app/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Rajdeep Kotoky`,
      description: service.shortDescription,
      url: `https://rajdeepkotoky.vercel.app/services/${slug}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
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
  return <ServiceDetailClient service={service} index={index} />;
}
