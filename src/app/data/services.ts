export interface ServiceData {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: "globe" | "database" | "code" | "layers" | "shoppingBag" | "package" | "bot" | "cpu" | "monitor";
  features: string[];
  technologies: string[];
}

export const allServices: ServiceData[] = [
  {
    slug: "custom-saas",
    title: "Custom SaaS Products",
    shortDescription:
      "End-to-end SaaS platforms with subscription billing, multi-tenant architecture, and admin dashboards.",
    fullDescription:
      "I design and build complete SaaS products from the ground up — multi-tenant platforms, subscription management, role-based access controls, and analytics dashboards. Whether you have an idea or a full spec, I take it from architecture to a live, scalable product ready for real users and real revenue.",
    icon: "layers",
    features: [
      "Multi-tenant architecture",
      "Subscription & billing (Stripe)",
      "User roles & permissions",
      "Admin dashboards & analytics",
      "REST / GraphQL API design",
      "CI/CD & cloud deployment",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Docker"],
  },
  {
    slug: "web-applications",
    title: "Web Applications",
    shortDescription:
      "Full-stack web applications, dashboards, portals, and internal tools built for performance and scale.",
    fullDescription:
      "I build full-stack web applications that go beyond simple websites — admin panels, client portals, internal tools, data dashboards, and complex interactive platforms. Every app is architected for performance, built with clean code, and designed to handle real-world usage from day one.",
    icon: "monitor",
    features: [
      "Full-stack application development",
      "Admin panels & client portals",
      "Internal tools & dashboards",
      "Authentication & user management",
      "RESTful & GraphQL APIs",
      "Performance optimization & scaling",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    slug: "ecommerce-solutions",
    title: "E-commerce Solutions",
    shortDescription:
      "Shopify stores and fully custom e-commerce platforms — built to convert and scale.",
    fullDescription:
      "I cover both ends of e-commerce — custom Shopify theme development with Liquid for brands that want speed and reliability, and fully bespoke platforms built from scratch for businesses that need complete flexibility beyond what any platform can offer. With 18+ Shopify stores delivered, I know what makes a store convert and how to build it right.",
    icon: "shoppingBag",
    features: [
      "Custom Shopify theme & Liquid development",
      "Shopify app integrations & configuration",
      "Fully custom storefront builds",
      "Payment gateway integration (Stripe, Razorpay)",
      "Inventory, orders & shipping systems",
      "Store speed, SEO & conversion optimization",
    ],
    technologies: ["Shopify", "Liquid", "Next.js", "Node.js", "Stripe", "Tailwind CSS"],
  },
  {
    slug: "websites",
    title: "Websites",
    shortDescription:
      "Portfolio, business, school, company, and personal sites — fast, responsive, and SEO-ready.",
    fullDescription:
      "I build all kinds of websites — personal portfolios, business landing pages, school & institution sites, corporate presences, and more. Every site is fully responsive, performance-optimized, SEO-ready, and designed to make a strong first impression on every device.",
    icon: "globe",
    features: [
      "Portfolio & personal websites",
      "Business & corporate sites",
      "School & institution websites",
      "Landing pages & microsites",
      "CMS integration (WordPress etc.)",
      "SEO & Core Web Vitals optimization",
    ],
    technologies: ["Next.js", "React", "WordPress", "Tailwind CSS", "HTML5", "Figma"],
  },
  {
    slug: "ai-ml-solutions",
    title: "AI / ML Solutions",
    shortDescription:
      "AI integrations, custom chatbots, NLP pipelines, and ML model development for real-world use.",
    fullDescription:
      "I bridge the gap between AI research and production-ready products — integrating LLMs into your workflows, building custom chatbots and assistants, designing NLP pipelines, and deploying trained models as usable APIs. From OpenAI integrations to fine-tuned HuggingFace models, I make AI work for your actual business needs.",
    icon: "bot",
    features: [
      "LLM integration (OpenAI, LLaMA, Gemini)",
      "Custom chatbot & assistant builds",
      "NLP & text analysis pipelines",
      "Custom ML model development",
      "AI-powered features in web apps",
      "Model deployment & API wrapping",
    ],
    technologies: ["Python", "OpenAI API", "HuggingFace", "LLaMA 2", "BERT", "TensorFlow"],
  },
  {
    slug: "technical-solutions",
    title: "Technical Solutions",
    shortDescription:
      "Complex technical problem-solving using core CS fundamentals — algorithms, systems, automation, and more.",
    fullDescription:
      "Got a technical challenge that doesn't fit neatly into a category? I apply core computer science knowledge — algorithms, data structures, system design, and software engineering — to tackle problems that require real thinking. I also take on research-driven technical work: investigating approaches, evaluating trade-offs, building proofs of concept, and turning findings into actionable solutions. From automation scripts to system architecture to exploratory research, if it's a technical problem, I can work through it.",
    icon: "cpu",
    features: [
      "Algorithm & data structure design",
      "System architecture & design",
      "Automation scripts & tooling",
      "API development & third-party integrations",
      "Performance debugging & optimization",
      "Research, prototyping & POC builds",
    ],
    technologies: ["Python", "TypeScript", "Node.js", "System Design", "Algorithms", "Linux"],
  },
];

export const getServiceBySlug = (slug: string) =>
  allServices.find((service) => service.slug === slug);

export const getServiceIndex = (slug: string) =>
  allServices.findIndex((service) => service.slug === slug);
