import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Rajdeep Kotoky",
  description:
    "Browse all 25+ projects by Rajdeep Kotoky — web apps, Shopify stores, and AI/ML integrations built with Next.js, React, and Python.",
  openGraph: {
    title: "Projects — Rajdeep Kotoky",
    description:
      "Browse all 25+ projects by Rajdeep Kotoky — web apps, Shopify stores, and AI/ML integrations.",
    url: "https://rajdeepkotoky.vercel.app/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
