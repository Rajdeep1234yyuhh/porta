export interface ServiceData {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: "globe" | "database" | "code";
  features: string[];
  technologies: string[];
}

export const allServices: ServiceData[] = [
  {
    slug: "web-development",
    title: "Web Development",
    shortDescription:
      "Custom websites and web applications using modern frameworks like Next.js and React.",
    fullDescription:
      "I build fast, scalable, and production-ready web applications tailored to your business needs. From landing pages to complex full-stack platforms, I handle everything from UI design to deployment - using modern frameworks and industry best practices.",
    icon: "globe",
    features: [
      "Custom UI/UX implementation",
      "RESTful & GraphQL APIs",
      "Authentication & authorization",
      "Fully responsive design",
      "SEO optimization",
      "Performance tuning & Core Web Vitals",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express"],
  },
  {
    slug: "ecommerce-solutions",
    title: "E-commerce Solutions",
    shortDescription:
      "Shopify stores, custom e-commerce platforms, and payment gateway integrations.",
    fullDescription:
      "From Shopify stores to fully custom platforms, I build complete e-commerce experiences that convert visitors into customers. I handle everything from storefront design to payment integration and post-launch performance optimization.",
    icon: "database",
    features: [
      "Custom Shopify theme development",
      "Liquid templating & sections",
      "Payment gateway setup (Stripe etc.)",
      "Product & inventory management",
      "Store performance optimization",
      "Analytics & conversion tracking",
    ],
    technologies: ["Shopify", "Liquid", "Stripe"],
  },
  {
    slug: "ai-ml-integration",
    title: "AI/ML Integration",
    shortDescription:
      "Machine learning solutions and AI-powered features for web applications.",
    fullDescription:
      "I integrate cutting-edge AI and machine learning capabilities into real-world web applications. Whether it's a smart chatbot, an NLP pipeline, or an LLM-powered feature, I bridge the gap between AI research and production-ready products.",
    icon: "code",
    features: [
      "LLM integrations (OpenAI, LLaMA)",
      "NLP & text analysis pipelines",
      "Custom ML model development",
      "AI chatbot & assistant builds",
      "Data analysis & visualization",
      "Model deployment & API wrapping",
    ],
    technologies: ["Python", "OpenAI API", "HuggingFace", "TensorFlow", "LLaMA 2", "BERT"],
  },
];
