export interface FeaturedProject {
  title: string;
  description: string;
  image?: string;
  video?: string;
  videoStartTime?: number;
  mediaType: "image" | "video";
  tech: string[];
  demo: string;
  github: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Career Assessment Tool",
    description:
      "AI-powered career assessment solution built with Next.js and intelligent backend integration. Features include dynamic skill evaluation, personalized career recommendations, real-time analytics dashboard, and secure user profile management.",
    mediaType: "video",
    video: "https://youtu.be/A_9EQWd8N1A",
    videoStartTime: 29,
    image: "/images/ecommerce-thumbnail.jpg",
    tech: [
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "firebase",
      "python",
      "AI",
      "ML",
    ],
    demo: "https://dhiti.ai/",
    github: "https://github.com/Rajdeep1234yyuhh/mks",
  },
  {
    title: "Mental Health Assistant Chatbot",
    description:
      "AI-powered mental health assistant chatbot that interacts with users, detects emotions from conversations, and tracks emotional trends over time.",
    mediaType: "video",
    video: "yeco.mp4",
    image: "/images/analytics-dashboard-thumbnail.jpg",
    tech: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Firebase",
      "Next.js",
      "TypeScript",
      "LLaMA API",
      "Database Integration",
    ],
    demo: "https://yeco-bice.vercel.app/",
    github: "https://github.com/Rajdeep1234yyuhh/yeco",
  },
  {
    title: "ShopFruitful E-commerce Website",
    description:
      "Custom e-commerce storefront developed using Shopify and Liquid. Features include responsive design, optimized product listings, seamless cart and checkout flow, and personalized UI enhancements crafted with CSS for an elegant shopping experience.",
    mediaType: "video",
    video: "fruitful.mp4",
    image: "/images/shopfruitful-thumbnail.jpg",
    tech: ["Shopify", "Liquid", "CSS"],
    demo: "https://shopfruitful.com/",
    github: "#",
  },
];
