import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Rajdeep Kotoky",
  description:
    "Browse all 25+ projects by Rajdeep Kotoky — web apps, Shopify stores, and AI/ML integrations built with Next.js, React, and Python.",
  alternates: {
    canonical: "https://rajdeepkotoky.vercel.app/projects",
  },
  openGraph: {
    title: "Projects — Rajdeep Kotoky",
    description:
      "Browse all 25+ projects by Rajdeep Kotoky — web apps, Shopify stores, and AI/ML integrations.",
    url: "https://rajdeepkotoky.vercel.app/projects",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Rajdeep Kotoky",
    description:
      "Browse all 25+ projects by Rajdeep Kotoky — web apps, Shopify stores, and AI/ML integrations.",
    images: ["/og-image.jpg"],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
