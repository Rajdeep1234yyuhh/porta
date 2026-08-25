export interface CaseStudy {
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
}

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
  caseStudy?: CaseStudy;
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
    caseStudy: {
      overview:
        "Built for Dhiti AI, this platform helps students and young professionals navigate career decisions through AI-powered assessments and personalized roadmaps. It replaces one-size-fits-all career counseling with intelligent, data-driven guidance tailored to each individual's strengths.",
      challenge:
        "Career counseling in India is largely inaccessible, expensive, and generic. Students receive the same advice regardless of their individual strengths, interests, or market realities. Existing digital tools were essentially static questionnaires with no real intelligence behind the recommendations.",
      solution:
        "Architected a full-stack platform using Next.js for the frontend and Python for the AI/ML backend. Integrated Firebase for real-time user profiles and assessment data. Built a dynamic skill evaluation engine that adapts questions based on responses, and a recommendation system that maps skill gaps to learning pathways across 50+ career domains.",
      results: [
        "Deployed at dhiti.ai with live production traffic",
        "Dynamic skill evaluation engine adapts to each user's responses in real time",
        "Personalized career roadmaps generated across 50+ career domains",
        "Analytics dashboard gives counselors visibility into student progress",
        "Firebase integration enables instant data sync with zero-latency profiles",
      ],
    },
  },
  {
    id: 27,
    title: "Travel Grid India - OTA platform",
    description:
      "Full-stack OTA (Online Travel Agency) platform for browsing and booking stays and travel packages, with an admin panel for managing property listings, availability, and pricing.",
    mediaType: "image",
    image: "/images/travelgridindia-thumbnail.jpg",
    tech: ["Next.js", "TypeScript", "Firebase"],
    categories: ["Web Development"],
    demo: "https://travelgridindia.com/",
    github: "#",
    date: "2026",
    caseStudy: {
      overview:
        "Travel Grid India is a full-stack OTA (Online Travel Agency) platform built for a travel booking business based in Northeast India, letting travelers search and book homestays, hotels, and curated packages across multiple destinations from a single storefront.",
      challenge:
        "Small regional travel operators typically rely on manual bookings over phone and WhatsApp, with no centralized way to manage listings, pricing, or availability across multiple properties and packages. The business needed a real booking platform without the overhead of enterprise OTA software.",
      solution:
        "Built with Next.js and TypeScript for the storefront, with Firebase powering authentication, listings data, and real-time availability. Implemented a searchable stay browser, package listings, and an admin panel for the property owner to manage listings and bookings without touching code.",
      results: [
        "Live at travelgridindia.com with 7+ properties listed across multiple destinations",
        "Admin panel lets the business owner manage listings, packages, and bookings directly",
        "Firebase-backed real-time availability across all listed properties",
        "Unified search across stays and curated travel packages",
        "Replaces manual phone/WhatsApp booking coordination with a self-serve storefront",
      ],
    },
  },
  {
    id: 28,
    title: "Go Travelz - Travel Agency",
    description:
      "Marketing and booking landing page for a travel agency offering curated holiday packages, built to convert visitors into package inquiries and calls.",
    mediaType: "image",
    image: "/images/gotravelz-thumbnail.jpg",
    tech: ["Next.js", "TypeScript"],
    categories: ["Web Development"],
    demo: "https://gotravelz.com/",
    github: "#",
    date: "2026",
    caseStudy: {
      overview:
        "Go Travelz is a travel agency landing page designed to showcase curated holiday packages — like the featured Meghalaya package — and drive direct inquiries and calls from prospective travelers.",
      challenge:
        "The agency needed a fast, visually compelling online presence that could present destination packages with pricing and trust signals, and make it effortless for visitors to either explore packages or call the agency directly, without building a full booking engine.",
      solution:
        "Built with Next.js and TypeScript, the page leads with a destination-focused hero (featured package, pricing, and duration), backed by trust badges (traveler count, ratings, verification), a testimonial callout, and clear calls to action for exploring packages or calling the agency.",
      results: [
        "Live at gotravelz.com",
        "Destination-led hero section with per-person pricing and trip duration",
        "Trust signals (5,000+ travelers, ratings, govt.-approved badge) built into the layout",
        "Dual call-to-action: browse packages or call the agency directly",
        "Fast, lightweight Next.js build optimized for mobile discovery traffic",
      ],
    },
  },
  {
    id: 29,
    title: "Real Bengal Sweets - ERP system",
    description:
      "Lightweight ERP/billing system for a sweets shop, with a fast billing counter for generating bills and a live dashboard of the day's collections.",
    mediaType: "image",
    image: "/images/real.png",
    tech: ["Next.js", "Supabase", "Tailwind CSS", "TypeScript"],
    categories: ["Web Development"],
    demo: "https://realbangalsweets.vercel.app/",
    github: "#",
    date: "2026",
    caseStudy: {
      overview:
        "An ERP and billing system built for Real Bengal Sweets, a sweets shop, to replace manual billing with a fast, keyboard-driven counter workflow and give shop admins live visibility into daily sales.",
      challenge:
        "The shop was billing customers manually, with no structured record of daily sales, item-level totals, or multi-shop tracking. Staff needed a billing flow fast enough for a busy counter, while the owner needed prices locked down and a running view of what had been collected.",
      solution:
        "Built with Next.js, TypeScript, and Tailwind CSS on the frontend, with Supabase as the backend for items, pricing, and bill records. Designed a keyboard-first billing counter (Enter moves between customer, item, and quantity) where prices are fixed by the admin and can't be edited at checkout, plus a live 'Today's Bills' panel showing per-shop collections as they come in.",
      results: [
        "Live billing counter with keyboard-driven flow for fast order entry",
        "Admin-controlled pricing that counter staff cannot override",
        "Real-time 'Today's Bills' dashboard showing collections per shop",
        "Supabase backend for structured item, pricing, and sales records",
        "Multi-shop support (Shop 1 counter shown, extensible to more locations)",
      ],
    },
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
    caseStudy: {
      overview:
        "Yeco is an AI-powered mental health companion that listens, empathizes, and tracks emotional trends over time. Built to reduce the barrier between people struggling with mental health and the support they need — anonymously and without judgment.",
      challenge:
        "Mental health support in India faces a dual barrier: stigma keeps people from seeking help, and professionals are scarce. Existing apps felt clinical or prescriptive rather than empathetic. Users needed a judgment-free space that felt like a genuine conversation.",
      solution:
        "Built a conversational interface using React and Next.js, powered by the LLaMA API for nuanced, empathetic responses. Integrated Firebase for anonymous persistent sessions with mood history stored over rolling 30-day windows. The system performs real-time sentiment analysis on each message to detect distress signals and surface emotional trend visualizations on a personal dashboard.",
      results: [
        "Live at yeco-bice.vercel.app with fully anonymous user sessions",
        "Real-time sentiment analysis runs on every message to detect emotional tone",
        "Mood trend visualization tracks emotional patterns over 30-day windows",
        "LLaMA API integration delivers empathetic, context-aware responses",
        "Firebase ensures anonymous data persistence without identity exposure",
      ],
    },
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
    caseStudy: {
      overview:
        "A fully custom Shopify storefront for ShopFruitful, a fruit-based skincare brand targeting first-time skincare users who want clean, vegan, and beginner-friendly products. The goal was a storefront that educates as much as it sells.",
      challenge:
        "The brand had a strong identity but needed a storefront that communicated its clean ingredient philosophy while guiding new skincare users through product discovery without overwhelming them. Generic Shopify themes couldn't deliver this.",
      solution:
        "Developed a custom Liquid theme from scratch with responsive CSS, smooth cart and checkout flows, and carefully designed product listing pages that highlight ingredient stories. Implemented performance optimizations including lazy loading and minimal JS footprint to achieve fast load times on mobile.",
      results: [
        "Live at shopfruitful.com serving real customers",
        "Custom Liquid templates built from scratch — not a bought theme",
        "Mobile-first responsive design for 70%+ mobile traffic",
        "Optimized checkout flow to reduce cart abandonment",
        "Ingredient-first product pages guide first-time skincare buyers",
      ],
    },
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
    caseStudy: {
      overview:
        "A research-grade NLP dialogue system for Assam tourism that handles code-mixed Assamese-English queries — a virtually unexplored frontier in low-resource language AI. This system bridges the gap between how locals actually speak and how machines understand language.",
      challenge:
        "Code-mixed Assamese-English (mixing both languages within a single sentence) is spoken by millions but almost entirely ignored by NLP research. No existing system could handle Assam tourism queries in this natural code-mixed form across the diversity of 51 tourist destinations.",
      solution:
        "Built a two-stage pipeline: first, fine-tuned Google's MuRIL (a multilingual BERT variant pre-trained on Indian languages) for intent classification across 44 distinct tourism intent categories. Second, developed a semantic retrieval module that searches over a curated corpus of 221,799 Q&A pairs covering 51 Assam tourist destinations to return accurate, relevant answers.",
      results: [
        "~97% intent classification accuracy across 44 intent categories",
        "221,799 Q&A pairs curated covering 51 Assam tourist destinations",
        "MuRIL fine-tuned for code-mixed Assamese-English — a novel research contribution",
        "Two-stage architecture: intent classification feeding semantic retrieval",
        "Significant advancement in low-resource Indian language NLP research",
      ],
    },
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
    caseStudy: {
      overview:
        "A structured data collection web app built to gather labeled examples for training the Assamese-English NLP model. It enables real speakers to contribute validated Assamese-English query-response pairs through a simple, accessible interface.",
      challenge:
        "Training a code-mixed NLP model requires large amounts of labeled data, but no existing dataset existed for Assamese-English tourism queries. Data needed to be collected from real speakers in a structured, validated format that could feed directly into training pipelines.",
      solution:
        "Built with Next.js and Firebase, the app presents contributors with tourism-related prompts and collects their natural Assamese-English responses. Data is validated on submission and stored in a structured Firebase format ready for model training pipelines.",
      results: [
        "Live at ass-eng-chatbot.vercel.app with active contributor access",
        "Structured dataset collection enabling NLP model training",
        "Firebase real-time database for instant, reliable data storage",
        "Intuitive UI designed for non-technical contributors",
        "Direct pipeline from user submissions to model training datasets",
      ],
    },
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
    caseStudy: {
      overview:
        "A tool that automatically captures and converts any website into a polished showcase video — useful for agencies presenting client work, developers documenting projects, or anyone needing professional demo clips without video editing skills.",
      challenge:
        "Manually recording and editing website showcase videos is time-consuming and requires video editing expertise. Developers and agencies needed an automated way to produce professional demo clips from just a URL.",
      solution:
        "Built with React for the frontend and a Node.js/Express backend. A headless browser captures the target website in a controlled viewport, and ffmpeg processes the frames into smooth, professional-quality videos with configurable duration, resolution, and export format.",
      results: [
        "Automated full website video capture from a single URL input",
        "Node.js/Express backend with ffmpeg for video processing pipeline",
        "Configurable recording duration, resolution, and output format",
        "Clean React UI for URL input and video download management",
        "Eliminates manual screen recording for website demos entirely",
      ],
    },
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
    caseStudy: {
      overview:
        "A conversion-focused landing page for a travel agency, designed to present curated travel packages and drive inquiries through clear calls to action. Built to give the agency a credible, professional online presence that converts browsers into leads.",
      challenge:
        "The agency needed an online presence that communicated the quality of their packages and made it easy for potential travelers to reach out, without the complexity of a full booking system. Speed and mobile experience were critical.",
      solution:
        "Built with Next.js and Tailwind CSS for performance and responsiveness. Firebase powers the contact form with instant inquiry delivery to the agency. The page features animated package cards, a testimonial section, and a mobile-optimized layout with smooth scroll behavior.",
      results: [
        "Live at anup-ebon.vercel.app",
        "Firebase-powered contact form for instant lead capture",
        "Fully responsive across mobile, tablet, and desktop",
        "Animated package showcase cards driving visual engagement",
        "Next.js static generation for near-instant page loads",
      ],
    },
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
    caseStudy: {
      overview:
        "A complete Shopify e-commerce store for Zanera, a brand selling affordable imitation jewellery across ethnic, traditional, and modern styles for everyday wear and special occasions. The focus was a visually rich storefront that converts at scale.",
      challenge:
        "The jewellery market is intensely visual. Zanera needed a storefront that could showcase intricate pieces beautifully while supporting smooth browsing across hundreds of SKUs and providing a trustworthy checkout experience for price-sensitive buyers.",
      solution:
        "Custom Shopify theme with Liquid templates optimized for high-quality jewellery photography, collections organized by occasion and style, and payment gateway integration for smooth Indian payments. Implemented product variant management for material and size options.",
      results: [
        "Live at zanera.in serving real customers",
        "Custom Shopify Liquid theme optimized for jewellery photography",
        "Collections organized by occasion, style, and material",
        "Smooth checkout with Indian payment gateway integration",
        "Product variant management for size and material options",
      ],
    },
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
    caseStudy: {
      overview:
        "A handcrafted Shopify jewellery store for The Anvik, specializing in earrings, jhumkas, chandbalis, and traditional sets for weddings, festivals, and everyday wear. The mission: make the storefront feel as premium as the jewellery itself.",
      challenge:
        "The Anvik's products tell a story of traditional craftsmanship that generic Shopify themes couldn't convey. The brand needed a storefront that felt premium enough to justify artisan pricing while remaining accessible to first-time buyers.",
      solution:
        "Built a warm, elegant theme with custom Liquid sections and CSS that highlights the artisanal nature of each product. Implemented an occasion-based browsing flow (wedding, festival, daily) and structured product pages with detailed craft descriptions and styling tips.",
      results: [
        "Live at theanvik.com",
        "Custom theme reflecting the artisanal brand identity",
        "Occasion-based browsing: wedding, festival, everyday",
        "Detailed product pages with craft stories and styling tips",
        "Secure Indian payment gateway integration",
      ],
    },
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
    caseStudy: {
      overview:
        "A premium Shopify bridal jewellery platform for Heer House of Jewellery, featuring handcrafted kundan sets, anklets, earrings, and bespoke accessories made with traditional techniques and modern styling sensibilities.",
      challenge:
        "Bridal jewellery purchases are high-stakes decisions. The platform needed to instill deep trust, showcase craftsmanship in fine detail, and support customers who are planning purchases months in advance for specific ceremonies.",
      solution:
        "Developed a premium Shopify theme with large-format photography support, comprehensive product descriptions covering materials, care instructions, and customization options. WhatsApp integration enables direct bridal consultation requests for bespoke orders.",
      results: [
        "Live at heerhouseofjewellery.com",
        "Premium theme with large-format photography support",
        "WhatsApp integration for direct bridal consultation requests",
        "Detailed product descriptions with care and customization info",
        "Bridal collection structured by ceremony type",
      ],
    },
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
    caseStudy: {
      overview:
        "The main Shopify e-commerce storefront for Fruitful, a fruit-based skincare brand with a clean, vegan, beginner-friendly product line built around simple daily routines. The goal was a store that demystifies skincare rather than overwhelming newcomers.",
      challenge:
        "The skincare market is saturated and intimidating for beginners. Fruitful needed a storefront that communicated ingredient transparency, built trust with skeptical first-time buyers, and guided them toward the right products without decision fatigue.",
      solution:
        "Built a clean, minimal Shopify theme that puts ingredients front and center. Custom sections highlight the fruit-to-skin story for each product, a routine builder guides beginners through selection, and a minimalist checkout reduces abandonment.",
      results: [
        "Live at shopfruitful.com",
        "Ingredient-first product pages with fruit story sections",
        "Beginner routine builder guiding product selection step by step",
        "Minimal clean design reducing decision fatigue",
        "Vegan and cruelty-free certifications prominently featured",
      ],
    },
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
    caseStudy: {
      overview:
        "A Shopify haircare store for Giisha Beauty, blending Ayurvedic traditions with modern haircare through oils, masks, and grooming tools rooted in Indian wellness rituals. The brand needed digital credibility to match its formulation quality.",
      challenge:
        "Ayurvedic haircare has strong trust equity in India but lacks credibility-building digital storefronts. Giisha needed an online presence that educated customers on ingredients and positioned products as effective alternatives to synthetic options.",
      solution:
        "Custom Shopify theme with ingredient education sections, blog integration for Ayurvedic knowledge articles, before/after showcase capabilities, and a product recommendation quiz routing users to their ideal haircare routine.",
      results: [
        "Live at giishabeauty.com",
        "Ingredient education sections for each product",
        "Blog integration for Ayurvedic knowledge and rituals content",
        "Product quiz routing users to a personalized haircare routine",
        "Before/after showcase section for authentic social proof",
      ],
    },
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
    caseStudy: {
      overview:
        "A modern Shopify fashion store for Roslyn by Demi, featuring women's dresses, co-ord sets, tops, and accessories with a focus on elegance, comfort, and contemporary style. The brand needed a storefront as strong as its aesthetic identity.",
      challenge:
        "D2C fashion brands face brutal competition online. Roslyn by Demi needed a storefront that conveyed its visual identity strongly enough to stand out, while delivering a smooth browsing-to-checkout experience that reduced drop-off.",
      solution:
        "Built a visually-driven Shopify theme with editorial layout sections, a lookbook-style homepage, size guide integration, and collections structured by occasion (casual, party, formal). Implemented Instagram-feed integration to surface real customer styling as social proof.",
      results: [
        "Live at roslynbydemi.com",
        "Editorial lookbook homepage layout differentiating the brand",
        "Collections organized by occasion: casual, party, formal",
        "Size guide integration aimed at reducing return rates",
        "Instagram feed integration for real-customer social proof",
      ],
    },
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
    caseStudy: {
      overview:
        "A Gen-Z-focused D2C Shopify store for Nishorama, selling block-printed kurtis, fusion ethnic outfits, and contemporary desi styles that blend traditional and modern aesthetics. The brand speaks to cultural pride without feeling old-fashioned.",
      challenge:
        "Nishorama targets Gen-Z buyers who respond to authenticity, cultural identity, and visual storytelling. A standard Shopify theme would fail to capture the brand's vibrant energy and fusion identity in a way that resonated with this audience.",
      solution:
        "Developed a bold, colorful Shopify theme with large hero imagery, artisan story sections documenting the block-printing process, and an outfit inspiration grid. Social commerce features include a wishlist, Instagram integration, and UGC testimonial sections.",
      results: [
        "Live at nishorama.com",
        "Bold visual theme resonant with Gen-Z cultural aesthetics",
        "Artisan story sections highlighting block-printing craft origins",
        "Outfit inspiration grid for visual styling ideas",
        "UGC testimonial sections and Instagram integration",
      ],
    },
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
    caseStudy: {
      overview:
        "A handcrafted Shopify ethnic wear store for Vintage Loom, featuring cotton suit sets, kurtas, and sarees rooted in handblock printing and traditional artisan craftsmanship. Each piece is unique — and the storefront needed to say that clearly.",
      challenge:
        "Handcrafted textile brands struggle to convey the uniqueness of artisan products in a typical e-commerce format. Each Vintage Loom piece is one-of-a-kind, requiring a storefront that communicates rarity and craft value without sounding exclusionary.",
      solution:
        "Built a warm, earthy-toned Shopify theme with artisan process documentation sections, handblock print detail galleries, limited quantity indicators for unique pieces, and natural fiber care guide integrations into every product page.",
      results: [
        "Live at vintageloom.com",
        "Artisan process documentation integrated into product pages",
        "Handblock print detail galleries with zoom capability",
        "Limited quantity indicators communicating product uniqueness",
        "Natural fiber care guides built into product descriptions",
      ],
    },
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
    caseStudy: {
      overview:
        "A Shopify accessories and jewellery store for Aekay, offering affordable rings, earrings, necklaces, and bracelets focused on everyday style, durability, and accessibility. The challenge was building trust at low price points with a large catalog.",
      challenge:
        "With a large SKU catalog of affordable accessories, Aekay needed a storefront that prevented choice paralysis, made browsing intuitive, and built enough trust for price-sensitive buyers to complete purchases confidently.",
      solution:
        "Built a clean, organized Shopify store with robust filtering by type, material, and occasion. Implemented Razorpay for seamless Indian payments, customer review sections surfaced prominently, and a best-sellers page that guides discovery.",
      results: [
        "Live at aekay.in",
        "Robust filtering by type, material, and occasion",
        "Razorpay integration for seamless Indian payments",
        "Best-sellers and trending sections guiding buyer decisions",
        "Customer review sections building trust at low price points",
      ],
    },
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
    caseStudy: {
      overview:
        "A Shopify ethnic fashion store for The House of Hoor, selling handcrafted suit sets, anarkalis, co-ords, and kurtas with handblock prints and a blend of traditional and modern elegance. The brand competes on craft quality — the store needed to show that.",
      challenge:
        "The brand needed to attract a discerning audience that values craftsmanship over fast fashion, while competing in a crowded online ethnic wear market that often undervalues artisan work. Perceived value had to be built through storytelling, not just discounts.",
      solution:
        "Developed a sophisticated Shopify theme that leads with craft storytelling — artisan process photos, handblock printing technique documentation, and fabric origin content. Editorial collection curation and visual merchandising elevate perceived brand value above the competition.",
      results: [
        "Live at thehouseofhoor.com",
        "Craft storytelling sections with artisan process photography",
        "Editorial collection curation with visual merchandising",
        "Fabric origin and printing technique content on product pages",
        "Premium brand positioning consistent with artisan value",
      ],
    },
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
    caseStudy: {
      overview:
        "A Shopify dessert e-commerce platform for Gelato Vinto, an Italian-style artisanal gelato brand offering gelato cakes, sorbets, and sugar-free options made with natural ingredients. Selling premium perishables online demanded a different approach.",
      challenge:
        "Selling perishable food online is logistically complex. Beyond logistics, Gelato Vinto needed a storefront that evoked the luxury and indulgence of authentic Italian gelato convincingly enough to justify premium pricing in the Indian market.",
      solution:
        "Built a vibrant, food-photography-forward Shopify theme with temperature and delivery zone information integrated into product pages. Custom flavor story cards, ingredient sourcing sections, and occasion-based curation (birthdays, parties, daily indulgence) drive conversions.",
      results: [
        "Live at gelatovinto.com",
        "Food-photography-forward design creating strong appetite appeal",
        "Flavor story cards with ingredient and origin details",
        "Occasion-based curation: birthdays, parties, everyday treats",
        "Delivery zone and freshness information integrated into product pages",
      ],
    },
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
    caseStudy: {
      overview:
        "A Shopify plants and home decor store for Homebagh, offering indoor and outdoor plants, planters, and gardening accessories that support greener, more beautiful living spaces. The key insight: plant buyers need education before they're ready to buy.",
      challenge:
        "Plant e-commerce requires educating buyers on care requirements before purchase to reduce returns and increase long-term satisfaction. Most plant stores skip this education, leading to poor customer experiences and preventable churn.",
      solution:
        "Built a Shopify store with embedded care guides on every product page, a plant finder quiz for beginners, and planter bundle suggestions pairing plants with compatible containers. An airy, natural visual design reinforces the brand's wellness-through-nature positioning.",
      results: [
        "Live at homebagh.com",
        "Embedded care guide on every plant product page",
        "Plant finder quiz routing beginners to easy-care options",
        "Bundle suggestions pairing plants with compatible planters",
        "Airy, natural visual design reinforcing brand identity",
      ],
    },
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
    caseStudy: {
      overview:
        "A bold Shopify fashion store for The Mesh Store, offering women's clothing, bags, and accessories — from everyday basics to party looks — with bold cruelty-free and sustainable styling as core brand values.",
      challenge:
        "The Mesh Store targets fashion-forward women who want bold styles without ethical compromise. The storefront needed to communicate both the aesthetic vision and the brand's cruelty-free commitment convincingly, or risk losing trust.",
      solution:
        "Developed a dynamic Shopify theme with bold editorial homepage sections, cruelty-free and sustainability badges integrated into product pages, and a 'Complete the Look' feature that cross-sells outfits. Instagram integration surfaces real customer styling as social proof.",
      results: [
        "Live at themeshstore.co",
        "Bold editorial homepage with campaign-style imagery",
        "Cruelty-free and sustainability badges on all product pages",
        "'Complete the Look' cross-sell feature driving order value",
        "Instagram integration for real-customer styling inspiration",
      ],
    },
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
    caseStudy: {
      overview:
        "A Shopify textile marketplace for Kapda Shop, serving both retail fabric shoppers and bulk sourcing buyers across cotton, silk, linen, velvet, and georgette fabrics. Two very different buyer personas, one cohesive storefront.",
      challenge:
        "Serving retail and wholesale customers from a single storefront is technically and UX-wise complex. Pricing, minimum order quantities, and product presentation needed to work for two very different buyer profiles without confusing either.",
      solution:
        "Built a dual-persona Shopify store with separate retail and wholesale-oriented collection pages. Implemented tiered pricing display, bulk order inquiry forms, and a fabric swatch request feature. Detailed material specifications support professional buyers making informed sourcing decisions.",
      results: [
        "Live at kapdashop.com",
        "Dual-persona storefront serving both retail and wholesale buyers",
        "Bulk order inquiry forms with tiered pricing display",
        "Fabric swatch request feature for professional buyers",
        "Detailed material specifications across all listings",
      ],
    },
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
    caseStudy: {
      overview:
        "A handcrafted Shopify fashion store for Bombay Blossom, featuring bags, jewellery, and accessories made from Indian textiles, recycled fabrics, and handloom techniques. Sustainability and aesthetics needed to coexist without either feeling compromised.",
      challenge:
        "Sustainable handcraft brands face the challenge of communicating both aesthetic appeal and ethical value without sounding preachy. Bombay Blossom needed both elements to work together seamlessly in a single, cohesive storefront.",
      solution:
        "Developed a vibrant Shopify theme that leads with craft aesthetics while weaving sustainability into product storytelling naturally. Custom sections document fabric origins, artisan communities, and recycling processes. A 'Meet the Maker' feature builds personal connection with the brand.",
      results: [
        "Live at bombayblossom.com",
        "Fabric origin and artisan community documentation sections",
        "'Meet the Maker' feature building authentic brand connection",
        "Recycled material process sections integrated into product pages",
        "Vibrant visual design that leads with craft over sustainability messaging",
      ],
    },
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
    caseStudy: {
      overview:
        "A bold Shopify men's innerwear and loungewear store for Armor by Smugglerz, featuring boxers, trunks, and loungewear with bold prints, performance fabrics, and everyday comfort as core promises. The brand needed a strong digital identity.",
      challenge:
        "Men's innerwear is a category with low brand loyalty where price typically dominates decision-making. Armor needed a storefront that built brand identity strongly enough to command repeat purchases and justify a premium over generic options.",
      solution:
        "Built a bold, confident Shopify theme with strong typography and irreverent brand voice sections. Performance fabric highlights are integrated into every product page, and a size guide with fit photography reduces the sizing uncertainty that drives abandonment in this category.",
      results: [
        "Live at armorbysmugglerz.com",
        "Bold typography and confident brand voice throughout the store",
        "Performance fabric highlights on all product pages",
        "Size guide with fit photography reducing sizing-related drop-off",
        "Collections organized by print style and fabric type",
      ],
    },
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
    caseStudy: {
      overview:
        "A Shopify kids store for DIY by Tok, offering DIY kits and educational toys that encourage hands-on learning, creativity, and activity-based play. The buying decision belongs to parents — the store was designed to give them confidence.",
      challenge:
        "Parents buying educational toys face analysis paralysis. They need confidence that a product is genuinely educational, age-appropriate, and engaging enough to hold a child's attention. DIY by Tok needed the storefront to address all three concerns clearly.",
      solution:
        "Developed a playful, colorful Shopify theme with age-range filters, educational outcome tags on every product, parent review sections, and video demonstration previews. A 'What will they learn?' section on each product page speaks directly to parent buying criteria.",
      results: [
        "Live at diybytok.com",
        "Age-range filtering for age-appropriate product discovery",
        "Educational outcome tags on every product listing",
        "'What will they learn?' section addressing parent concerns directly",
        "Video demonstration previews for key products",
      ],
    },
  },
];

// Backward-compat alias used by existing imports
export const featuredProjects = allProjects.slice(0, 3);
