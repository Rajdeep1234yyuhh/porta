export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  video?: string;
  videoStartTime?: number;
  mediaType: "image" | "video";
  tech: string[];
  categories: string[];
  demo: string;
  github: string;
  date: string;
}

export const allProjects: Project[] = [
  {
    id: 1,
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
    categories: ["AI/ML", "Web Development"],
    demo: "https://dhiti.ai/",
    github: "https://github.com/Rajdeep1234yyuhh/mks",
    date: "2025",
  },
  {
    id: 2,
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
    categories: ["AI/ML", "Web Development"],
    demo: "https://yeco-bice.vercel.app/",
    github: "https://github.com/Rajdeep1234yyuhh/yeco",
    date: "2025",
  },
  {
    id: 3,
    title: "ShopFruitful E-commerce Website",
    description:
      "Custom Shopify and Liquid storefront with responsive design, optimized product listings, smooth cart and checkout flow, and polished CSS UI enhancements.",
    mediaType: "video",
    video: "fruitful.mp4",
    image: "/images/shopfruitful-thumbnail.jpg",
    tech: ["Shopify", "Liquid", "CSS"],
    categories: ["Shopify"],
    demo: "https://shopfruitful.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 4,
    title: "Assamese-English Code-Mixed Tourism Chatbot",
    description:
      "A two-stage intelligent dialogue system for Assam tourism, featuring a MuRIL-based intent classifier across 44 intents with ~97% accuracy and a semantic retrieval module over 221,799 Q&A pairs covering 51 destinations - designed for low-resource code-mixed NLP.",
    mediaType: "image",
    tech: [
      "Python",
      "PyTorch",
      "MuRIL",
      "HuggingFace Transformers",
      "NumPy",
      "Jupyter Notebook",
    ],
    categories: ["NLP", "Deep Learning", "Research"],
    demo: "#",
    github: "#",
    date: "2025",
  },
  {
    id: 6,
    title: "Data Collector Application",
    description:
      "Collects data for model training. Collects data from users and stores them in a structured format.",
    mediaType: "image",
    tech: ["Next.js", "Firebase"],
    categories: ["Web Development", "AI/ML"],
    demo: "https://ass-eng-chatbot.vercel.app/",
    github: "https://github.com/Rajdeep1234yyuhh/ass-eng-chatbot",
    date: "2023",
  },
  {
    id: 7,
    title: "Website to Video",
    description: "Application that converts websites to a showcased video.",
    mediaType: "image",
    tech: ["React", "Node.js", "Express", "ffmpeg"],
    categories: ["Web Development"],
    demo: "#",
    github: "#",
    date: "2023",
  },
  {
    id: 8,
    title: "Travel Package Landing Page",
    description: "Landing page for a Travel agency.",
    mediaType: "image",
    tech: ["Next.js", "Tailwind CSS", "Firebase"],
    categories: ["Web Development"],
    demo: "https://anup-ebon.vercel.app/",
    github: "https://github.com/Rajdeep1234yyuhh/anup",
    date: "2023",
  },
  {
    id: 9,
    title: "Zanera - Imitation Jewellery E-commerce Platform",
    description:
      "Shopify jewellery store for affordable imitation pieces, covering ethnic, traditional, and modern designs for daily wear and special occasions.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://zanera.in/",
    github: "#",
    date: "2025",
  },
  {
    id: 10,
    title: "The Anvik - Ethnic Jewellery E-commerce Platform",
    description:
      "Shopify jewellery store for handcrafted earrings, jhumkas, chandbalis, and traditional sets for weddings, festivals, and everyday wear.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://www.theanvik.com/",
    github: "#",
    date: "2025",
  },
  {
    id: 11,
    title: "Heer House of Jewellery - Handcrafted Bridal Jewellery Platform",
    description:
      "Shopify bridal jewellery platform featuring handcrafted kundan sets, anklets, earrings, and bespoke accessories with traditional techniques and modern styling.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://heerhouseofjewellery.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 12,
    title: "Fruitful - Fruit-Based Skincare E-commerce Platform",
    description:
      "Shopify skincare store for fruit-powered, vegan, beginner-friendly products built around clean formulas and simple daily routines.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://shopfruitful.com/",
    github: "#",
    date: "2026",
  },
  {
    id: 13,
    title: "Giisha Beauty - Ayurvedic Haircare E-commerce Platform",
    description:
      "Shopify haircare store for Ayurvedic-inspired oils, masks, and grooming tools, blending Indian rituals with modern healthy-hair care.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://www.giishabeauty.com/",
    github: "#",
    date: "2025",
  },
  {
    id: 14,
    title: "Roslyn by Demi - Women's Fashion E-commerce Platform",
    description:
      "Shopify fashion store for modern women's dresses, co-ord sets, tops, and accessories focused on elegance, comfort, and contemporary style.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://roslynbydemi.com/",
    github: "#",
    date: "2026",
  },
  {
    id: 15,
    title: "Nishorama - Gen-Z Ethnic Fashion E-commerce Platform",
    description:
      "Shopify D2C fashion store for Gen-Z ethnic wear, including block-printed kurtis, fusion outfits, and contemporary desi styles.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://www.nishorama.com/",
    github: "#",
    date: "2025",
  },
  {
    id: 16,
    title: "Vintage Loom - Handcrafted Cotton Ethnic Wear Platform",
    description:
      "Shopify ethnic wear store for handcrafted cotton suit sets, kurtas, and sarees rooted in handblock printing and artisan craftsmanship.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://www.vintageloom.com/",
    github: "#",
    date: "2026",
  },
  {
    id: 18,
    title: "Aekay - Fashion Accessories & Jewellery E-commerce Platform",
    description:
      "Shopify accessories store for affordable rings, earrings, necklaces, and bracelets, focused on everyday style, durability, and accessibility.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Razorpay/Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://aekay.in/",
    github: "#",
    date: "2021",
  },
  {
    id: 19,
    title: "The House of Hoor - Handcrafted Ethnic Wear E-commerce Platform",
    description:
      "Shopify ethnic fashion store for handcrafted suit sets, anarkalis, co-ords, and kurtas with handblock prints and modern elegance.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://thehouseofhoor.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 20,
    title: "Gelato Vinto - Artisanal Gelato & Dessert E-commerce Platform",
    description:
      "Shopify dessert store for Italian-style artisanal gelato, gelato cakes, sorbets, and sugar-free options made with natural ingredients.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://www.gelatovinto.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 21,
    title: "Homebagh - Online Plants & Home Decor E-commerce Platform",
    description:
      "Shopify plants and decor store for indoor/outdoor plants, planters, and gardening accessories that support greener living spaces.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://homebagh.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 22,
    title:
      "The Mesh Store - Trendy Women's Fashion & Accessories E-commerce Platform",
    description:
      "Shopify fashion store for women's clothing, bags, and accessories, from everyday basics to party looks with bold cruelty-free styling.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://themeshstore.co/",
    github: "#",
    date: "2024",
  },
  {
    id: 23,
    title: "Kapda Shop - Online Fabric & Textile Marketplace",
    description:
      "Shopify textile marketplace for premium cotton, silk, linen, velvet, and georgette fabrics across retail and bulk sourcing.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://kapdashop.com/",
    github: "#",
    date: "2025",
  },
  {
    id: 24,
    title: "Bombay Blossom - Handcrafted Bags & Jewellery E-commerce Platform",
    description:
      "Shopify handcrafted fashion store for bags, jewellery, and accessories made with Indian textiles, recycled fabrics, and handloom techniques.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://www.bombayblossom.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 25,
    title:
      "Armor by Smugglerz - Men's Innerwear & Loungewear E-commerce Platform",
    description:
      "Shopify men's innerwear store for boxers, trunks, and loungewear with bold prints, performance fabrics, and everyday comfort.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://armorbysmugglerz.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 26,
    title: "DIY by Tok - Kids DIY Kits & Educational Toys E-commerce Platform",
    description:
      "Shopify kids store for DIY kits and educational toys that encourage hands-on learning, creativity, and activity-based play.",
    mediaType: "image",
    tech: [
      "Shopify",
      "JavaScript",
      "HTML",
      "CSS",
      "Payment Gateway Integration",
    ],
    categories: ["Shopify"],
    demo: "https://diybytok.com/",
    github: "#",
    date: "2024",
  },
];

// Backward-compat alias used by existing imports
export const featuredProjects = allProjects.slice(0, 3);
