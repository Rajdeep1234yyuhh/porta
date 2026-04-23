import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Rajdeep Kotoky",
  description:
    "Web Development, E-commerce Solutions, and AI/ML Integration services by Rajdeep Kotoky. Professional, fast, and affordable.",
  alternates: {
    canonical: "https://rajdeepkotoky.vercel.app/services",
  },
  openGraph: {
    title: "Services — Rajdeep Kotoky",
    description:
      "Web Development, E-commerce, and AI/ML Integration services by Rajdeep Kotoky.",
    url: "https://rajdeepkotoky.vercel.app/services",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Rajdeep Kotoky",
    description:
      "Web Development, E-commerce, and AI/ML Integration services by Rajdeep Kotoky.",
    images: ["/og-image.jpg"],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
