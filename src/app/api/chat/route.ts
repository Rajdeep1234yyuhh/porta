import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// In-memory rate limiter: max 10 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

const VALID_ACTIONS = new Set([
  "ask_projects",
  "show_tech",
  "show_shopify",
  "show_services",
  "show_contact",
]);

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;

function validateMessages(
  messages: unknown,
): messages is Array<{ role: string; content: string }> {
  if (!Array.isArray(messages) || messages.length > MAX_MESSAGES) return false;
  return messages.every(
    (m) =>
      m !== null &&
      typeof m === "object" &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length > 0 &&
      m.content.length <= MAX_CONTENT_LENGTH,
  );
}

const CONTACT_PHONE = process.env.NEXT_PUBLIC_PHONE ?? "";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "";

const SYSTEM_PROMPT = `You are an AI assistant for Rajdeep Kotoky's portfolio website. Your job is to help visitors learn about Rajdeep and connect with him. Be friendly, concise, and professional.

## About Rajdeep Kotoky
Rajdeep Kotoky is a Full-Stack Developer, Shopify expert & AI/ML Engineer based in India. He specializes in building modern web applications, e-commerce solutions, and AI-powered products. He is passionate about clean code, great UX, and leveraging AI to solve real-world problems.

## Skills & Technologies
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Python, REST APIs, GraphQL
- **E-commerce:** Shopify (themes, apps, Liquid), Hydrogen
- **AI/ML:** LLaMA, OpenAI API, Groq, LangChain, model fine-tuning, RAG pipelines
- **Databases:** PostgreSQL, MongoDB, Supabase, Firebase
- **Tools:** Git, Vercel, Docker, AWS basics

## Services Offered
1. **Full-Stack Web Development** — Custom web apps with Next.js/React, responsive design, API integration, authentication, deployment on Vercel/AWS.
2. **Database Architecture** — Schema design, query optimization, migrations, PostgreSQL, MongoDB, Supabase.
3. **Custom Software Development** — Desktop/CLI tools, automation scripts, Python backends, system utilities.
4. **System Design & Architecture** — Scalable architecture planning, microservices, API design, tech stack consulting.
5. **Shopify & E-commerce** — Custom Shopify themes, Liquid templating, app development, storefront optimization, Hydrogen.
6. **Package & Library Development** — Open-source packages, reusable component libraries, npm/PyPI publishing.
7. **AI Chatbot & Agent Development** — Custom AI assistants, RAG pipelines, LLM integrations, conversational agents.
8. **AI/ML Integration** — Embedding AI features into existing apps, fine-tuning models, inference APIs.
9. **UI/UX & Frontend Engineering** — Pixel-perfect interfaces, animations, design systems, accessibility.

## Contact Methods
- **Phone / WhatsApp:** ${CONTACT_PHONE}
- **Email:** ${CONTACT_EMAIL}
- **LinkedIn:** https://www.linkedin.com/in/rajdeep-kotoky-2273561a0/
- **GitHub:** https://github.com/Rajdeep1234yyuhh
- **Contact Form:** Use the contact section on this website (scroll to the bottom or click Contact in the nav)

## How to Respond
- Keep answers short and conversational: 2-4 sentences.
- If someone asks about Rajdeep's skills, services, or background — answer from the info above.
- If someone wants to hire or collaborate — give them the contact options and encourage them to reach out.
- If someone asks about pricing — say pricing depends on scope and suggest contacting Rajdeep.
- If someone asks something outside your knowledge — be honest and direct them to contact Rajdeep.
- Never make up information not provided above.

## Response Format — CRITICAL
You MUST always respond with valid raw JSON only. No markdown, no code fences, no extra text outside the JSON.
Use this exact shape:
{"reply":"your response text here","action":null}

Set "action" to one of these strings (or null if none applies):
- "ask_projects"   → user asks about projects, portfolio, or what Rajdeep has built (offer to show them)
- "show_tech"      → user specifically wants tech / AI / software / full-stack projects
- "show_shopify"   → user specifically wants Shopify / e-commerce work
- "show_services"  → user asks about services, what Rajdeep offers, or what he can do for them
- "show_contact"   → user wants to hire, get a quote, reach out, or contact Rajdeep

Example:
{"reply":"Rajdeep has built several AI and Shopify projects. Would you like to see them?","action":"ask_projects"}`;

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // CSRF: reject cross-origin requests
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && !origin.includes(host.split(":")[0])) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Body size guard
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 50_000) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  try {
    const body = await req.json();
    const { messages } = body;

    if (!validateMessages(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const groqApiKey = process.env.GROQ_API_KEY?.trim();

    if (!groqApiKey) {
      console.error("GROQ_API_KEY is not configured");
      return NextResponse.json(
        {
          error:
            "Chat is not configured yet. Please contact Rajdeep directly.",
        },
        { status: 503 },
      );
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          max_tokens: 300,
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      console.error("Groq API error:", response.status);
      return NextResponse.json(
        { error: "Failed to get response" },
        { status: 500 },
      );
    }

    const data = await response.json();
    const raw: string = data.choices?.[0]?.message?.content ?? "";

    let content = "Sorry, I couldn't generate a response.";
    let action: string | null = null;
    try {
      const cleaned = raw
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();
      const parsed = JSON.parse(cleaned);
      if (typeof parsed.reply === "string") {
        content = parsed.reply.slice(0, 1000);
      }
      if (parsed.action != null && VALID_ACTIONS.has(parsed.action)) {
        action = parsed.action;
      }
    } catch {
      if (typeof raw === "string" && raw.length > 0) {
        content = raw.slice(0, 1000);
      }
    }

    return NextResponse.json({ content, action });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
