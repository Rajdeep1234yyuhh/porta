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
  title: "Rajdeep Kotoky — Web Developer & AI/ML Engineer",
  description:
    "Portfolio of Rajdeep Kotoky, a Full Stack Web Developer specializing in Next.js, React, Shopify, and AI/ML integrations.",
  keywords: [
    "Rajdeep Kotoky",
    "Web Developer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Shopify Developer",
    "AI ML Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Rajdeep Kotoky" }],
  openGraph: {
    title: "Rajdeep Kotoky — Web Developer & AI/ML Engineer",
    description:
      "Full Stack Web Developer specializing in Next.js, React, Shopify, and AI/ML integrations.",
    url: "https://rajdeepkotoky.vercel.app",
    siteName: "Rajdeep Kotoky Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rajdeep Kotoky Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajdeep Kotoky — Web Developer & AI/ML Engineer",
    description:
      "Full Stack Web Developer specializing in Next.js, React, Shopify, and AI/ML.",
    images: ["/og-image.jpg"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
