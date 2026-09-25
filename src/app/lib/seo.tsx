import type { Metadata } from "next";
import { CONTACT, SITE_URL } from "../data/site";

export const SITE_NAME = "Rajdeep Kotoky";

type PageSeo = {
  /** Page title without the site name (the root layout's template appends it). */
  title: string;
  description: string;
  /** Path starting with "/", used for the canonical URL and og:url. */
  path: string;
  /** Share-card image path; defaults to the site-wide card. */
  image?: string;
  /** Use the title as-is instead of appending the site name (home page). */
  absoluteTitle?: boolean;
};

// A page's metadata replaces top-level keys like `openGraph` instead of merging
// them with the root layout's, so every page builds its full set here. Config
// images win over opengraph-image files, so pages with their own card pass it
// as `image`. X falls back to og:image, so no twitter:image is needed.
export function pageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  absoluteTitle,
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

/** Trims text to a search-snippet-friendly length at a word boundary. */
export function clampDescription(text: string, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:\s-]+$/, "")}…`;
}

export const absoluteUrl = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

const PERSON_ID = `${SITE_URL}/#person`;

export const personRef = { "@id": PERSON_ID };

export const personJsonLd = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Rajdeep Kotoky",
  url: SITE_URL,
  image: `${SITE_URL}/DP.jpg`,
  jobTitle: "Freelance Full-Stack Developer & AI/ML Engineer",
  email: CONTACT.email,
  sameAs: [CONTACT.github, CONTACT.linkedin],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Shopify",
    "Liquid",
    "Tailwind CSS",
    "AI/ML",
    "LLM chatbots",
    "RAG pipelines",
  ],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
  publisher: personRef,
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Renders schema.org data; "<" is escaped so it can't close the script tag. */
export function JsonLd({ data }: { data: object[] }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": data });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}
