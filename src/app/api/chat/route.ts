import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge } from "./knowledge";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
- **Phone Number:** 8638752315
- **Email:** kotoky10@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/rajdeep-kotoky-2273561a0/
- **GitHub:** https://github.com/Rajdeep1234yyuhh
- **Contact Form:** Use the contact section on this website (scroll to the bottom or click Contact in the nav)
- **WhatsApp:** 8638752315

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
  try {
    const { messages } = await req.json();
    const chatMessages = Array.isArray(messages) ? messages : [];
    const lastUserMessage = [...chatMessages]
      .reverse()
      .find(
        (message): message is { role: string; content: string } =>
          message?.role === "user" && typeof message.content === "string",
      )?.content ?? "";
    const knowledgeContext = await searchKnowledge(lastUserMessage);
    const groqApiKey = process.env.GROQ_API_KEY?.trim();

    if (!groqApiKey) {
      console.error("GROQ_API_KEY is missing for chat route", {
        vercelEnv: process.env.VERCEL_ENV,
        nodeEnv: process.env.NODE_ENV,
        hasGroqKey: Object.prototype.hasOwnProperty.call(
          process.env,
          "GROQ_API_KEY",
        ),
        groqKeyLength: process.env.GROQ_API_KEY?.length ?? 0,
      });

      return NextResponse.json(
        {
          error:
            "Chat is not configured yet. Please contact Rajdeep directly at kotoky10@gmail.com",
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
          model: "openai/gpt-oss-120b",
          // gpt-oss is a reasoning model; reasoning tokens count against
          // max_tokens, so keep effort low to leave room for the reply.
          reasoning_effort: "low",
          messages: [
            {
              role: "system",
              content: knowledgeContext
                ? `${SYSTEM_PROMPT}\n\n## Relevant knowledge base sources\nUse the following sources to answer the visitor accurately.\n\n${knowledgeContext}`
                : SYSTEM_PROMPT,
            },
            ...chatMessages,
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq API error:", err);
      return NextResponse.json(
        { error: "Failed to get response" },
        { status: 500 },
      );
    }

    const data = await response.json();
    const raw: string = data.choices?.[0]?.message?.content ?? "";

    let content = raw;
    let action: string | null = null;
    try {
      // strip accidental markdown code fences if the model wraps JSON
      const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
      const parsed = JSON.parse(cleaned);
      content = parsed.reply ?? raw;
      action = parsed.action ?? null;
    } catch {
      content = raw || "Sorry, I couldn't generate a response.";
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
