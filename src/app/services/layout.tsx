import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Rajdeep Kotoky",
  description:
    "Web Development, E-commerce Solutions, and AI/ML Integration services by Rajdeep Kotoky. Professional, fast, and affordable.",
  openGraph: {
    title: "Services — Rajdeep Kotoky",
    description:
      "Web Development, E-commerce, and AI/ML Integration services by Rajdeep Kotoky.",
    url: "https://rajdeepkotoky.vercel.app/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
