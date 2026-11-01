// About Rajdeep, as the hero section and the terminal page describe him.
// The /ecom store's seller page and the /minimal page read it from here; the
// terminal page still keeps its own formatted copy.

export const PROFILE = {
  name: "Rajdeep Kotoky",
  role: "Full-Stack & AI/ML Developer · Shopify Expert",
  location: "Assam, India",
  photo: "/DP.jpg",
  bio: "Full-Stack & AI/ML Developer and Shopify Expert crafting scalable digital products for startups, brands, and modern businesses — every delivery is performance-optimized, security-checked, and backed by post-launch support.",
  headline: "SaaS Products, AI/ML Systems & Shopify Experiences",
  responseTime: "Usually within 24 hours",
  openFor: "Freelance · Contract · Full-time",
};

export const PROFILE_STATS = [
  { value: "4", label: "Full-Stack Projects Delivered" },
  { value: "20", label: "Shopify Stores" },
  { value: "25+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
];

export const SKILL_GROUPS = [
  {
    name: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Material UI", "HTML5", "Figma"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "PHP", "Python", "REST APIs", "GraphQL", "MongoDB", "Firebase"],
  },
  {
    name: "E-commerce",
    skills: ["Shopify", "Liquid", "Custom Themes", "Shopify CLI", "Payment Gateway Integrations", "Razorpay", "Stripe"],
  },
  {
    name: "AI / ML",
    skills: ["OpenAI API", "LLaMA 2", "BERT", "MuRIL", "HuggingFace", "PyTorch", "TensorFlow", "LangChain", "NLP Pipelines", "Model Deployment"],
  },
  {
    name: "Tools & Platforms",
    skills: ["Git", "GitHub", "Vercel", "Firebase", "Figma", "WordPress", "Google Analytics", "Meta Ads"],
  },
];

export const EXPERIENCE = [
  {
    period: "2024 – present",
    title: "Freelance Full-Stack & AI Developer",
    points: [
      "Building SaaS products, Shopify e-commerce stores, and LLM-powered tools for clients worldwide.",
      "Projects: Dhiti (dhiti.ai) · Yeco · Tourism Chatbot",
      "17+ Shopify stores delivered in this period",
    ],
    tech: ["Next.js", "TypeScript", "OpenAI API", "LLaMA", "Firebase", "Shopify"],
  },
  {
    period: "2022 – 2024",
    title: "Shopify Developer (Contract)",
    points: [
      "Custom theme development with Liquid, Shopify CLI.",
      "App integrations, performance optimisation, payment gateway setups for 10+ live stores.",
    ],
    tech: ["Shopify", "Liquid", "Shopify CLI", "JavaScript", "Razorpay"],
  },
  {
    period: "2020 – 2022",
    title: "Web Developer",
    points: [
      "React + Node.js full-stack applications.",
      "REST API design, MongoDB / Firebase databases, deployment pipelines, responsive UIs.",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Firebase"],
  },
];

export const RESEARCH = {
  title: "Assamese-English Code-Mixed NLP (2025)",
  points: ["MuRIL-based chatbot — 97% intent accuracy", "44 intents · 221,799 Q&A pairs · 51 destinations"],
};

export const EDUCATION = { degree: "B.Tech", field: "Computer Science" };

/** Rajdeep's story, from his resume: the hero shows `teaser`, the "My story" dialog the rest. */
export const STORY = {
  teaser:
    "I started in 2021 building Shopify stores for 20+ clients. In 2024 I went freelance, and now I build AI products like DHITI.",
  intro:
    "I'm a developer based in Guwahati, Assam. Here's how I got from my first client websites to building AI products.",
  chapters: [
    {
      year: "2017",
      title: "Computer Science in Guwahati",
      text: "Started a B.Tech in Computer Science and Engineering at Assam Don Bosco University, graduating in 2021.",
    },
    {
      year: "2021",
      title: "First job: websites for real clients",
      text: "Joined Bloomegg as a remote web developer. Over a year and a half I delivered 30+ web projects for 20+ clients, mostly Shopify stores built with Liquid, HTML, CSS and JavaScript, including Aekay, Vintage Loom and Giisha Beauty.",
    },
    {
      year: "2023",
      title: "Building products in React",
      text: "Moved to Senseio as a front-end developer, working on the company's products in React and JavaScript and connecting them to backend APIs.",
    },
    {
      year: "2024",
      title: "Going freelance",
      text: "Went freelance and built DHITI (dhiti.ai), an AI career-assessment platform, end to end with Next.js, Firebase, the OpenAI API and Razorpay payments. The same year I started an M.Tech in Information Technology at Gauhati University.",
    },
    {
      year: "2025",
      title: "AI and NLP research",
      text: "Built an Assamese-English chatbot for Assam tourism that understands code-mixed questions, with ~97% intent accuracy across 44 intents and semantic search over 221,799 Q&A pairs, plus Yeco, an AI mental-health companion on the LLaMA API.",
    },
    {
      year: "Today",
      title: "What I do now",
      text: "I build SaaS products, AI tools and Shopify stores for clients, from booking platforms and ERP systems to brand storefronts. I'm open to freelance, contract and full-time work.",
    },
  ],
};
