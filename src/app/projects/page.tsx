import ProjectsClient from "../components/ProjectsClient";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Projects & Case Studies",
  description:
    "28 projects with full case studies: SaaS platforms, AI chatbots, travel and ERP systems, and 20+ custom Shopify stores built with Next.js, React and Python.",
  path: "/projects",
});

export default function ProjectShowcase() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />
      <h1 className="sr-only">Projects &amp; case studies by Rajdeep Kotoky</h1>
      <ProjectsClient />
    </>
  );
}
