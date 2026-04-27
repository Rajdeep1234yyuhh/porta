import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rajdeepkotoky.vercel.app"),
  title: "Rajdeep Kotoky | Full-Stack Developer & AI Engineer",
  description:
    "Portfolio of Rajdeep Kotoky, a Full-Stack Developer & AI Engineer specializing in Next.js, React, Shopify, and AI/ML integrations.",
  keywords: [
    "Rajdeep Kotoky",
    "Full-Stack Developer",
    "AI Engineer",
    "Next.js Developer",
    "React Developer",
    "Shopify Developer",
    "AI ML Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Rajdeep Kotoky" }],
  alternates: {
    canonical: "https://rajdeepkotoky.vercel.app",
  },
  openGraph: {
    title: "Rajdeep Kotoky | Full-Stack Developer & AI Engineer",
    description:
      "Full-Stack Developer & AI Engineer specializing in Next.js, React, Shopify, and AI/ML integrations.",
    url: "https://rajdeepkotoky.vercel.app",
    siteName: "Rajdeep Kotoky Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rajdeep Kotoky | Full-Stack Developer & AI Engineer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajdeep Kotoky | Full-Stack Developer & AI Engineer",
    description:
      "Full-Stack Developer & AI Engineer specializing in Next.js, React, Shopify, and AI/ML.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rajdeep Kotoky",
  url: "https://rajdeepkotoky.vercel.app",
  image: "https://rajdeepkotoky.vercel.app/og-image.jpg",
  jobTitle: "Full Stack Developer & AI/ML Engineer",
  sameAs: [
    "https://github.com/Rajdeep1234yyuhh",
    "https://www.linkedin.com/in/rajdeep-kotoky-2273561a0/",
  ],
  knowsAbout: ["Next.js", "React", "Shopify", "Tailwind CSS", "Python", "Node.js", "AI/ML"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
