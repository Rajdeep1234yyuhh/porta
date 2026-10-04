import { allProjects, type Project } from "../data/projects";
import { allServices, getServiceBySlug, type ServiceData } from "../data/services";
import { testimonials } from "../data/testimonials";

// The /ecom store presents the portfolio as a shop: projects are the
// categories (grouped into departments by their portfolio category) and
// services are the products. Nothing here adds information; it only
// re-groups what's in data/.

export type Department = {
  slug: string;
  name: string;
  blurb: string;
  /** Portfolio categories (Project.categories) that belong to it */
  matches: string[];
};

export const DEPARTMENTS: Department[] = [
  {
    slug: "shopify-stores",
    name: "Shopify Stores",
    blurb: "Custom Shopify themes and storefronts for fashion, jewellery, beauty and lifestyle brands.",
    matches: ["Shopify"],
  },
  {
    slug: "web-platforms",
    name: "Web Apps & Platforms",
    blurb: "Full-stack platforms, booking systems, ERPs and tools built with Next.js and TypeScript.",
    matches: ["Web Development"],
  },
  {
    slug: "ai-ml",
    name: "AI & ML",
    blurb: "LLM-powered products, chatbots and NLP research.",
    matches: ["AI/ML", "NLP", "Deep Learning", "Research"],
  },
];

export const getDepartment = (slug: string | null | undefined) => DEPARTMENTS.find((d) => d.slug === slug);

export const projectsInDepartment = (department: Department) =>
  allProjects.filter((p) => p.categories.some((c) => department.matches.includes(c)));

/** The department a project is listed under first (its first portfolio category). */
export const primaryDepartment = (project: Project) =>
  DEPARTMENTS.find((d) => d.matches.includes(project.categories[0])) ?? DEPARTMENTS[1];

// Which services (products) each project shows off. Shopify stores are all
// E-commerce Solutions; the rest are listed by hand.
const PRODUCTS_BY_PROJECT: Record<string, string[]> = {
  "dhiti-ai-career-assessment": ["ai-ml-solutions", "custom-saas", "web-applications"],
  "travel-grid-india-ota-platform": ["web-applications", "ecommerce-solutions"],
  "go-travelz-travel-agency": ["websites"],
  "real-bengal-sweets-erp": ["web-applications"],
  "mental-health-ai-chatbot": ["ai-ml-solutions", "web-applications"],
  "assamese-english-tourism-chatbot": ["ai-ml-solutions", "technical-solutions"],
  "website-to-video": ["technical-solutions", "web-applications"],
};

export function productsForProject(project: Project): ServiceData[] {
  const slugs = PRODUCTS_BY_PROJECT[project.slug] ?? (project.categories.includes("Shopify") ? ["ecommerce-solutions"] : ["web-applications"]);
  return slugs.map((slug) => getServiceBySlug(slug)).filter((s): s is ServiceData => Boolean(s));
}

export const projectsForProduct = (service: ServiceData) =>
  allProjects.filter((p) => productsForProject(p).some((s) => s.slug === service.slug));

// The product shown off by the most builds wears the "Best seller" badge
export const BEST_SELLER = allServices.reduce((best, s) =>
  projectsForProduct(s).length > projectsForProduct(best).length ? s : best,
);

/** "Florine Jewels - Jewellery E-commerce Platform" → name and subtitle */
export function projectName(project: Project) {
  const [name, ...rest] = project.title.split(" - ");
  return { name, subtitle: rest.join(" - ") };
}

export const projectHost = (project: Project) => {
  if (!/^https?:\/\//.test(project.demo)) return null;
  return new URL(project.demo).hostname.replace(/^www\./, "");
};

export const hasSource = (project: Project) => /^https?:\/\//.test(project.github);

const ratings = testimonials.map((t) => t.rating);
export const SELLER_RATING = {
  average: ratings.reduce((sum, r) => sum + r, 0) / ratings.length,
  count: ratings.length,
  url: "https://share.google/kl4CoOLSq221n1mIl",
};

export { allProjects, allServices };
