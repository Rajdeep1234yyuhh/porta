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
    tech: ["Next.js", "Tailwind CSS", "Node.js", "firebase", "python", "AI", "ML"],
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
    tech: ["React", "Tailwind CSS", "Node.js", "Firebase", "Next.js", "TypeScript", "LLaMA API", "Database Integration"],
    categories: ["AI/ML", "Web Development"],
    demo: "https://yeco-bice.vercel.app/",
    github: "https://github.com/Rajdeep1234yyuhh/yeco",
    date: "2025",
  },
  {
    id: 3,
    title: "ShopFruitful E-commerce Website",
    description:
      "Custom e-commerce storefront developed using Shopify and Liquid. Features include responsive design, optimized product listings, seamless cart and checkout flow, and personalized UI enhancements crafted with CSS for an elegant shopping experience.",
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
    tech: ["Python", "PyTorch", "MuRIL", "HuggingFace Transformers", "NumPy", "Jupyter Notebook"],
    categories: ["NLP", "Deep Learning", "Research"],
    demo: "#",
    github: "#",
    date: "2025",
  },
  {
    id: 6,
    title: "Data Collector Application",
    description: "Collects data for model training. Collects data from users and stores them in a structured format.",
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
      "An online jewellery platform offering stylish and affordable imitation jewellery, including ethnic, traditional, and modern designs crafted for everyday wear and special occasions.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://zanera.in/",
    github: "#",
    date: "2025",
  },
  {
    id: 10,
    title: "The Anvik - Ethnic Jewellery E-commerce Platform",
    description:
      "An online jewellery store offering handcrafted designer earrings, jhumkas, chandbalis, and traditional jewellery sets tailored for weddings, festive occasions, and everyday wear.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://www.theanvik.com/",
    github: "#",
    date: "2025",
  },
  {
    id: 11,
    title: "Heer House of Jewellery - Handcrafted Bridal Jewellery Platform",
    description:
      "An online jewellery platform specializing in handcrafted bridal and occasion-based jewellery, offering kundan sets, anklets, earrings, and bespoke accessories designed with traditional techniques and modern aesthetics.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://heerhouseofjewellery.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 12,
    title: "Fruitful - Fruit-Based Skincare E-commerce Platform",
    description:
      "A skincare e-commerce platform offering fruit-powered, vegan, and beginner-friendly skincare products designed to simplify daily routines with clean formulations and natural ingredients.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://shopfruitful.com/",
    github: "#",
    date: "2026",
  },
  {
    id: 13,
    title: "Giisha Beauty - Ayurvedic Haircare E-commerce Platform",
    description:
      "A haircare-focused e-commerce platform offering Ayurvedic-inspired treatments like hair oils, masks, and grooming tools, combining traditional Indian rituals with modern science for healthy, glossy hair.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://www.giishabeauty.com/",
    github: "#",
    date: "2025",
  },
  {
    id: 14,
    title: "Roslyn by Demi - Women's Fashion E-commerce Platform",
    description:
      "A fashion e-commerce platform offering chic, modern women's clothing including dresses, co-ord sets, tops, and accessories, designed to blend elegance, comfort, and contemporary style.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://roslynbydemi.com/",
    github: "#",
    date: "2026",
  },
  {
    id: 15,
    title: "Nishorama - Gen-Z Ethnic Fashion E-commerce Platform",
    description:
      "A direct-to-consumer fashion platform offering bold, handcrafted ethnic wear like block-printed kurtis, fusion outfits, and contemporary desi styles designed for modern Gen-Z audiences.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://www.nishorama.com/",
    github: "#",
    date: "2025",
  },
  {
    id: 16,
    title: "Vintage Loom - Handcrafted Cotton Ethnic Wear Platform",
    description:
      "A fashion e-commerce platform offering handcrafted cotton ethnic wear including suit sets, kurtas, and sarees, designed with handblock printing techniques and rooted in sustainable artisan craftsmanship.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://www.vintageloom.com/",
    github: "#",
    date: "2026",
  },
  {
    id: 17,
    title: "Bloomegg - Performance Marketing & E-commerce Growth Agency",
    description:
      "A digital marketing agency specializing in performance marketing, social media advertising, and e-commerce growth strategies, helping brands scale revenue through data-driven campaigns and creative execution.",
    mediaType: "image",
    tech: ["JavaScript", "HTML", "CSS", "Analytics Tools", "Ad Platforms (Google, Meta)"],
    categories: ["Web Development"],
    demo: "https://bloomegg.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 18,
    title: "Aekay - Fashion Accessories & Jewellery E-commerce Platform",
    description:
      "An online fashion accessories platform offering trendy, affordable jewellery including rings, earrings, necklaces, and bracelets, designed for everyday wear with a focus on durability, style, and accessibility.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Razorpay/Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://aekay.in/",
    github: "#",
    date: "2021",
  },
  {
    id: 19,
    title: "The House of Hoor - Handcrafted Ethnic Wear E-commerce Platform",
    description:
      "A premium fashion e-commerce platform offering handcrafted ethnic wear including suit sets, anarkalis, co-ord sets, and kurtas, rooted in handblock printing and designed with a blend of traditional craftsmanship and modern elegance.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://thehouseofhoor.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 20,
    title: "Gelato Vinto - Artisanal Gelato & Dessert E-commerce Platform",
    description:
      "An online dessert platform offering authentic Italian-style artisanal gelato, gelato cakes, sorbets, and sugar-free options, crafted with natural ingredients and designed to deliver a premium dessert experience.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://www.gelatovinto.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 21,
    title: "Homebagh - Online Plants & Home Decor E-commerce Platform",
    description:
      "An e-commerce platform offering indoor and outdoor plants, planters, and gardening accessories, focused on creating greener, aesthetically pleasing living spaces with easy-to-maintain plant solutions.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://homebagh.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 22,
    title: "The Mesh Store - Trendy Women's Fashion & Accessories E-commerce Platform",
    description:
      "A fashion e-commerce platform offering trendy women's clothing, bags, and accessories ranging from everyday basics to party and gala outfits, with a focus on cruelty-free materials and bold, modern styles.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://themeshstore.co/",
    github: "#",
    date: "2024",
  },
  {
    id: 23,
    title: "Kapda Shop - Online Fabric & Textile Marketplace",
    description:
      "An e-commerce platform offering a wide range of premium fabrics including cotton, silk, linen, velvet, and georgette, catering to designers, boutiques, and individuals for both retail and bulk sourcing.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://kapdashop.com/",
    github: "#",
    date: "2025",
  },
  {
    id: 24,
    title: "Bombay Blossom - Handcrafted Bags & Jewellery E-commerce Platform",
    description:
      "A handcrafted fashion e-commerce platform offering artisanal bags, jewellery, and accessories made from traditional Indian textiles, recycled fabrics, and handloom techniques, promoting sustainable fashion and supporting local artisans.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://www.bombayblossom.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 25,
    title: "Armor by Smugglerz - Men's Innerwear & Loungewear E-commerce Platform",
    description:
      "A men's fashion e-commerce platform offering premium innerwear, boxers, trunks, and loungewear with bold prints, performance fabrics, and comfort-focused designs tailored for everyday wear.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://armorbysmugglerz.com/",
    github: "#",
    date: "2024",
  },
  {
    id: 26,
    title: "DIY by Tok - Kids DIY Kits & Educational Toys E-commerce Platform",
    description:
      "An e-commerce platform offering creative DIY kits and educational toys for children, designed to enhance hands-on learning, creativity, and engagement through fun, activity-based experiences.",
    mediaType: "image",
    tech: ["Shopify", "JavaScript", "HTML", "CSS", "Payment Gateway Integration"],
    categories: ["Shopify"],
    demo: "https://diybytok.com/",
    github: "#",
    date: "2024",
  },
];

// Backward-compat alias used by existing imports
export const featuredProjects = allProjects.slice(0, 3);
