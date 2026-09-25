import type { Metadata } from "next";
import { Geist_Mono, JetBrains_Mono, Outfit } from "next/font/google";
import { SITE_URL } from "./data/site";
import { JsonLd, SITE_NAME, personJsonLd, websiteJsonLd } from "./lib/seo";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";
import ChatWidget from "./components/ChatWidget";
import { SoundProvider } from "./context/SoundContext";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Self-hosted by next/font (no render-blocking request to Google Fonts).
// Components reference these as var(--font-outfit) / var(--font-jetbrains-mono).
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Site-wide defaults only. Canonical URLs and og:url are set per page (via
// pageMetadata) so no page inherits the home page's.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rajdeep Kotoky | Freelance Full-Stack Developer & AI Engineer",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Freelance full-stack developer & AI engineer building SaaS products, web apps, Shopify stores and AI chatbots with Next.js, React & Python. 28 projects shipped.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <JsonLd data={[personJsonLd, websiteJsonLd]} />
        <SoundProvider>
          <LenisProvider>{children}</LenisProvider>
          <ChatWidget />
        </SoundProvider>
      </body>
    </html>
  );
}
