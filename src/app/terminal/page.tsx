"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const PROMPT = "visitor@rajdeep:~$";
const VERSION = "2.0.1";

type LineType = "cmd" | "out" | "success" | "error" | "warn" | "dim" | "blank" | "accent" | "highlight";

interface Line { type: LineType; text: string; }
interface Entry { id: number; input: string; lines: Line[]; }

/* ── helpers ── */
const o  = (text: string): Line => ({ type: "out",       text });
const a  = (text: string): Line => ({ type: "accent",    text });
const h  = (text: string): Line => ({ type: "highlight", text });
const d  = (text: string): Line => ({ type: "dim",       text });
const s  = (text: string): Line => ({ type: "success",   text });
const e  = (text: string): Line => ({ type: "error",     text });
const bl = (): Line              => ({ type: "blank",     text: "" });

/* ══════════════════════════════════════════════════════
   COMMAND CONTENT
══════════════════════════════════════════════════════ */

const BANNER: Line[] = [
  a("  ██████╗  ██╗  ██╗"),
  a("  ██╔══██╗ ██║ ██╔╝"),
  a("  ██████╔╝ █████╔╝ "),
  a("  ██╔══██╗ ██╔═██╗ "),
  a("  ██║  ██║ ██║  ██╗"),
  a("  ╚═╝  ╚═╝ ╚═╝  ╚═╝"),
  bl(),
  h("  Rajdeep Kotoky — Full-Stack Developer & AI Engineer"),
  d(`  Portfolio Terminal v${VERSION}  ·  Type 'help' to explore`),
  bl(),
];

const HELP: Line[] = [
  a("Available commands"),
  o("─────────────────────────────────────────────────"),
  o("  about        Who I am · summary · stats"),
  o("  skills       Full tech stack by category"),
  o("  projects     All 26 projects · use flags below"),
  o("    projects web      → web dev projects"),
  o("    projects shopify  → Shopify stores"),
  o("    projects ai       → AI / ML projects"),
  o("  services     What I offer & pricing tiers"),
  o("  experience   Work timeline"),
  o("  contact      Email · WhatsApp · phone"),
  o("  social       GitHub · LinkedIn · Instagram"),
  o("  hire         Why work with me"),
  o("─────────────────────────────────────────────────"),
  o("  neofetch     System info panel"),
  o("  banner       ASCII welcome art"),
  o("  ls           List sections"),
  o("  date         Current date & time"),
  o("  echo [txt]   Print text"),
  o("  clear        Clear screen   (Ctrl+L)"),
  o("  exit         Return to portfolio"),
  o("─────────────────────────────────────────────────"),
  d("  ↑ ↓  history   Tab  autocomplete"),
];

const ABOUT: Line[] = [
  a("┌─ Rajdeep Kotoky ────────────────────────────────────"),
  o("│"),
  o("│  Name       Rajdeep Kotoky"),
  o("│  Role       Full-Stack Developer & AI Engineer"),
  o("│  Based      Assam, India"),
  o("│  Experience 5+ years shipping production apps"),
  o("│"),
  h("│  I build production-ready web apps and AI solutions"),
  h("│  — Shopify stores, SaaS platforms, ML models, and"),
  h("│  LLM integrations. 5+ years turning ideas into"),
  h("│  shipped products."),
  o("│"),
  o("│  Projects   25+   delivered"),
  o("│  Clients    30+   satisfied (100% satisfaction)"),
  o("│  Years      5+    of experience"),
  o("│"),
  s("│  Status     ● Available for new projects"),
  o("│  Email      kotoky10@gmail.com"),
  o("│  Phone      +91 86387 52315"),
  a("└─────────────────────────────────────────────────────"),
];

const SKILLS: Line[] = [
  a("┌─ Tech Stack ────────────────────────────────────────"),
  o("│"),
  h("│  Frontend"),
  o("│    Next.js · React · TypeScript · JavaScript"),
  o("│    Tailwind CSS · Material UI · HTML5 · Figma"),
  o("│"),
  h("│  Backend"),
  o("│    Node.js · Express · PHP · Python"),
  o("│    REST APIs · GraphQL · MongoDB · Firebase"),
  o("│"),
  h("│  E-commerce"),
  o("│    Shopify · Liquid · Custom Themes"),
  o("│    Shopify CLI · Payment Gateway Integrations"),
  o("│    Razorpay · Stripe"),
  o("│"),
  h("│  AI / ML"),
  o("│    OpenAI API · LLaMA 2 · BERT · MuRIL"),
  o("│    HuggingFace · PyTorch · TensorFlow"),
  o("│    LangChain · NLP Pipelines · Model Deployment"),
  o("│"),
  h("│  Tools & Platforms"),
  o("│    Git · GitHub · Vercel · Firebase · Figma"),
  o("│    WordPress · Google Analytics · Meta Ads"),
  a("└─────────────────────────────────────────────────────"),
];

const PROJECTS_ALL: Line[] = [
  a("┌─ All Projects (26) ─────────────────────────────────"),
  o("│"),
  h("│  AI / ML"),
  o("│  01  Career Assessment Tool (Dhiti)"),
  d("│      Next.js · Firebase · Python · AI/ML · 2025"),
  d("│      dhiti.ai"),
  o("│  02  Mental Health Chatbot (Yeco)"),
  d("│      React · Next.js · LLaMA API · Firebase · 2025"),
  d("│      yeco-bice.vercel.app"),
  o("│  03  Assamese-English Tourism Chatbot"),
  d("│      MuRIL · HuggingFace · PyTorch · 97% acc · 2025"),
  d("│      44 intents · 221,799 Q&A pairs · 51 destinations"),
  o("│  04  Data Collector App (Model Training)"),
  d("│      Next.js · Firebase · 2023"),
  o("│"),
  h("│  Web Development"),
  o("│  05  Website to Video Converter"),
  d("│      React · Node.js · Express · ffmpeg · 2023"),
  o("│  06  Travel Package Landing Page"),
  d("│      Next.js · Tailwind · Firebase · 2023"),
  d("│      anup-ebon.vercel.app"),
  o("│  07  Bloomegg — Performance Marketing Agency"),
  d("│      JavaScript · HTML · CSS · Ad Platforms · 2024"),
  d("│      bloomegg.com"),
  o("│"),
  h("│  Shopify E-commerce"),
  o("│  08  ShopFruitful — Fruit Skincare"),
  d("│      Shopify · Liquid · 2024  ·  shopfruitful.com"),
  o("│  09  Zanera — Imitation Jewellery"),
  d("│      Shopify · Liquid · 2025  ·  zanera.in"),
  o("│  10  The Anvik — Ethnic Jewellery"),
  d("│      Shopify · Liquid · 2025  ·  theanvik.com"),
  o("│  11  Heer House of Jewellery — Bridal"),
  d("│      Shopify · Liquid · 2024  ·  heerhouseofjewellery.com"),
  o("│  12  Giisha Beauty — Ayurvedic Haircare"),
  d("│      Shopify · Liquid · 2025  ·  giishabeauty.com"),
  o("│  13  Roslyn by Demi — Women's Fashion"),
  d("│      Shopify · Liquid · 2026  ·  roslynbydemi.com"),
  o("│  14  Nishorama — Gen-Z Ethnic Fashion"),
  d("│      Shopify · Liquid · 2025  ·  nishorama.com"),
  o("│  15  Vintage Loom — Handcrafted Cotton Wear"),
  d("│      Shopify · Liquid · 2026  ·  vintageloom.com"),
  o("│  16  Aekay — Fashion Accessories"),
  d("│      Shopify · Razorpay · 2021  ·  aekay.in"),
  o("│  17  The House of Hoor — Ethnic Wear"),
  d("│      Shopify · Liquid · 2024  ·  thehouseofhoor.com"),
  o("│  18  Gelato Vinto — Artisanal Gelato"),
  d("│      Shopify · Liquid · 2024  ·  gelatovinto.com"),
  o("│  19  Homebagh — Plants & Home Decor"),
  d("│      Shopify · Liquid · 2024  ·  homebagh.com"),
  o("│  20  The Mesh Store — Women's Fashion"),
  d("│      Shopify · Liquid · 2024  ·  themeshstore.co"),
  o("│  21  Kapda Shop — Fabric & Textile Marketplace"),
  d("│      Shopify · Liquid · 2025  ·  kapdashop.com"),
  o("│  22  Bombay Blossom — Handcrafted Bags"),
  d("│      Shopify · Liquid · 2024  ·  bombayblossom.com"),
  o("│  23  Armor by Smugglerz — Men's Innerwear"),
  d("│      Shopify · Liquid · 2024  ·  armorbysmugglerz.com"),
  o("│  24  DIY by Tok — Kids Educational Kits"),
  d("│      Shopify · Liquid · 2024  ·  diybytok.com"),
  o("│  25  Fruitful — Vegan Skincare (re-launch)"),
  d("│      Shopify · Liquid · 2026  ·  shopfruitful.com"),
  o("│  26  Nishorama v2 (ongoing)"),
  d("│      Shopify · Liquid · 2025  ·  nishorama.com"),
  o("│"),
  d("│  26 total  ·  Run 'projects web', 'projects shopify',"),
  d("│  or 'projects ai' to filter by category"),
  a("└─────────────────────────────────────────────────────"),
];

const PROJECTS_WEB: Line[] = [
  a("┌─ Web Development Projects ──────────────────────────"),
  o("│"),
  h("│  01  Career Assessment Tool — Dhiti"),
  o("│      AI-powered career assessment with dynamic skill"),
  o("│      evaluation and personalized recommendations."),
  d("│      Next.js · Firebase · Python · AI/ML"),
  d("│      dhiti.ai  ·  2025"),
  o("│"),
  h("│  02  Mental Health Chatbot — Yeco"),
  o("│      Detects emotions from conversations and tracks"),
  o("│      emotional trends over time."),
  d("│      React · Next.js · TypeScript · LLaMA API · Firebase"),
  d("│      yeco-bice.vercel.app  ·  2025"),
  o("│"),
  h("│  03  Website to Video Converter"),
  o("│      Converts any website URL into a showcase video."),
  d("│      React · Node.js · Express · ffmpeg  ·  2023"),
  o("│"),
  h("│  04  Travel Package Landing Page"),
  o("│      Lead generation landing page for travel agency."),
  d("│      Next.js · Tailwind CSS · Firebase"),
  d("│      anup-ebon.vercel.app  ·  2023"),
  o("│"),
  h("│  05  Bloomegg — Performance Marketing Agency"),
  o("│      Agency website with analytics integrations"),
  o("│      and Google / Meta ad platform connections."),
  d("│      JavaScript · HTML · CSS · Ad Platforms"),
  d("│      bloomegg.com  ·  2024"),
  o("│"),
  h("│  06  Data Collector App"),
  o("│      Structured data collection for ML model training."),
  d("│      Next.js · Firebase  ·  2023"),
  a("└─────────────────────────────────────────────────────"),
];

const PROJECTS_SHOPIFY: Line[] = [
  a("┌─ Shopify Projects (17 stores) ──────────────────────"),
  o("│"),
  o("│  Store                           Category    Year"),
  o("│  ─────────────────────────────────────────────────"),
  o("│  ShopFruitful                    Skincare    2024"),
  d("│    shopfruitful.com"),
  o("│  Zanera                          Jewellery   2025"),
  d("│    zanera.in"),
  o("│  The Anvik                       Jewellery   2025"),
  d("│    theanvik.com"),
  o("│  Heer House of Jewellery         Bridal      2024"),
  d("│    heerhouseofjewellery.com"),
  o("│  Giisha Beauty                   Haircare    2025"),
  d("│    giishabeauty.com"),
  o("│  Roslyn by Demi                  Fashion     2026"),
  d("│    roslynbydemi.com"),
  o("│  Nishorama                       Ethnic Wear 2025"),
  d("│    nishorama.com"),
  o("│  Vintage Loom                    Cotton Wear 2026"),
  d("│    vintageloom.com"),
  o("│  Aekay                           Accessories 2021"),
  d("│    aekay.in"),
  o("│  The House of Hoor               Ethnic Wear 2024"),
  d("│    thehouseofhoor.com"),
  o("│  Gelato Vinto                    Food        2024"),
  d("│    gelatovinto.com"),
  o("│  Homebagh                        Plants      2024"),
  d("│    homebagh.com"),
  o("│  The Mesh Store                  Fashion     2024"),
  d("│    themeshstore.co"),
  o("│  Kapda Shop                      Textiles    2025"),
  d("│    kapdashop.com"),
  o("│  Bombay Blossom                  Bags        2024"),
  d("│    bombayblossom.com"),
  o("│  Armor by Smugglerz              Innerwear   2024"),
  d("│    armorbysmugglerz.com"),
  o("│  DIY by Tok                      Kids/Edu    2024"),
  d("│    diybytok.com"),
  o("│"),
  d("│  All stores: Shopify · Liquid · Payment Gateways"),
  a("└─────────────────────────────────────────────────────"),
];

const PROJECTS_AI: Line[] = [
  a("┌─ AI / ML Projects ──────────────────────────────────"),
  o("│"),
  h("│  01  Assamese-English Tourism Chatbot (2025)"),
  o("│      Two-stage dialogue system for Assam tourism."),
  o("│      MuRIL-based intent classifier: 97% accuracy"),
  o("│      44 intents · 221,799 Q&A pairs · 51 destinations"),
  o("│      Semantic retrieval over structured knowledge base."),
  d("│      Python · PyTorch · MuRIL · HuggingFace Transformers"),
  d("│      NumPy · Jupyter Notebook  (NLP / Deep Learning)"),
  o("│"),
  h("│  02  Career Assessment Tool — Dhiti (2025)"),
  o("│      AI-powered skill evaluation with personalised"),
  o("│      career recommendations and real-time analytics."),
  d("│      Next.js · Node.js · Firebase · Python · AI/ML"),
  d("│      dhiti.ai"),
  o("│"),
  h("│  03  Mental Health Chatbot — Yeco (2025)"),
  o("│      Emotion detection from conversations."),
  o("│      Tracks emotional trends over time."),
  d("│      React · Next.js · TypeScript · LLaMA API · Firebase"),
  d("│      yeco-bice.vercel.app"),
  o("│"),
  h("│  04  Data Collector App — Model Training (2023)"),
  o("│      Structured dataset collection tool used for"),
  o("│      training the Assamese NLP models."),
  d("│      Next.js · Firebase"),
  a("└─────────────────────────────────────────────────────"),
];

const SERVICES: Line[] = [
  a("┌─ Services ──────────────────────────────────────────"),
  o("│"),
  h("│  01  Web Development"),
  o("│      Full-stack web apps with Next.js & Node.js."),
  o("│      From landing pages to complex SaaS platforms."),
  o("│      Custom UI/UX · REST & GraphQL APIs · Auth"),
  o("│      Responsive · SEO-optimised · Core Web Vitals"),
  d("│      Stack: Next.js · React · TypeScript · Tailwind"),
  o("│"),
  h("│  02  E-commerce Solutions"),
  o("│      Shopify stores, custom themes & app integrations."),
  o("│      Complete storefront to payment to post-launch."),
  o("│      Custom Liquid themes · Payment gateways"),
  o("│      Inventory systems · Analytics & conversion"),
  d("│      Stack: Shopify · Liquid · Stripe · Razorpay"),
  o("│"),
  h("│  03  AI / ML Integration"),
  o("│      LLM pipelines, NLP models, chatbots."),
  o("│      Bridges the gap between AI research & production."),
  o("│      OpenAI · LLaMA · Custom fine-tuning"),
  o("│      Data analysis · Model deployment · API wrapping"),
  d("│      Stack: Python · OpenAI · HuggingFace · PyTorch"),
  o("│"),
  h("│  04  Quick Fix  (48 h turnaround)"),
  o("│      ┌── FREE ────────────────────────────────────┐"),
  o("│      │  Bug Fix      Runtime errors, API failures  │"),
  o("│      │  Code Review  Components, queries, perf     │"),
  o("│      │  UI Polish    Responsive, animations        │"),
  o("│      └───────────────────────────────────────────┘"),
  o("│      ┌── PAID ────────────────────────────────────┐"),
  o("│      │  Small Feature  Auth, forms, filters        │"),
  o("│      │  API Integration  Firebase, Stripe, AI      │"),
  o("│      │  Perf Audit  Bundle, re-renders, DB tuning  │"),
  o("│      └───────────────────────────────────────────┘"),
  o("│"),
  d("│  Run 'contact' to get in touch for a quote"),
  a("└─────────────────────────────────────────────────────"),
];

const EXPERIENCE: Line[] = [
  a("┌─ Experience ────────────────────────────────────────"),
  o("│"),
  h("│  2024 – present   Freelance Full-Stack & AI Developer"),
  o("│    Building SaaS products, Shopify e-commerce stores,"),
  o("│    and LLM-powered tools for clients worldwide."),
  o("│    Projects: Dhiti (dhiti.ai) · Yeco · Tourism Chatbot"),
  o("│    17+ Shopify stores delivered in this period"),
  o("│"),
  h("│  2022 – 2024      Shopify Developer (Contract)"),
  o("│    Custom theme development with Liquid, Shopify CLI."),
  o("│    App integrations, performance optimisation,"),
  o("│    payment gateway setups for 10+ live stores."),
  o("│"),
  h("│  2020 – 2022      Web Developer"),
  o("│    React + Node.js full-stack applications."),
  o("│    REST API design, MongoDB / Firebase databases,"),
  o("│    deployment pipelines, responsive UIs."),
  o("│"),
  h("│  Research"),
  o("│    Assamese-English Code-Mixed NLP (2025)"),
  o("│    MuRIL-based chatbot — 97% intent accuracy"),
  o("│    44 intents · 221,799 Q&A pairs · 51 destinations"),
  o("│"),
  o("│  ─────────────────────────────────────────────────"),
  o("│  Total     5+ years"),
  o("│  Projects  26 delivered"),
  s("│  Clients   30+ (100% satisfaction)"),
  a("└─────────────────────────────────────────────────────"),
];

const CONTACT: Line[] = [
  a("┌─ Contact ───────────────────────────────────────────"),
  o("│"),
  h("│  Email      kotoky10@gmail.com"),
  h("│  WhatsApp   +91 86387 52315"),
  h("│  Phone      +91 86387 52315"),
  o("│"),
  s("│  Response   Usually within 24 hours"),
  o("│  Open for   Freelance · Contract · Full-time"),
  o("│"),
  o("│  Direct links:"),
  d("│    wa.me/918638752315"),
  d("│    mailto:kotoky10@gmail.com"),
  o("│"),
  a("└─────────────────────────────────────────────────────"),
];

const SOCIAL: Line[] = [
  a("┌─ Social ────────────────────────────────────────────"),
  o("│"),
  h("│  GitHub      github.com/Rajdeep1234yyuhh"),
  h("│  LinkedIn    linkedin.com/in/rajdeep-kotoky-2273561a0"),
  h("│  Instagram   instagram.com/radioactive_gigs"),
  o("│"),
  a("└─────────────────────────────────────────────────────"),
];

const HIRE: Line[] = [
  a("┌─ Why hire Rajdeep? ─────────────────────────────────"),
  o("│"),
  s("│  ✓  5+ years shipping real, production apps"),
  s("│  ✓  Full-stack — frontend to backend to deploy"),
  s("│  ✓  AI-native — LLMs & ML integrated by default"),
  s("│  ✓  Shopify expert — 17+ live stores delivered"),
  s("│  ✓  NLP Research — 97% accuracy, multilingual"),
  s("│  ✓  Fast delivery · clean code · honest comms"),
  s("│  ✓  30+ clients — 100% satisfaction record"),
  o("│"),
  h("│  Best fit for:"),
  o("│    → SaaS MVPs that need to ship fast"),
  o("│    → Shopify stores needing custom themes/apps"),
  o("│    → AI features on top of existing products"),
  o("│    → Urgent fixes with 48 h turnaround"),
  o("│"),
  o("│  Ready to start? → Run: contact"),
  a("└─────────────────────────────────────────────────────"),
];

const LS: Line[] = [
  o("drwxr-xr-x  about/"),
  o("drwxr-xr-x  skills/"),
  o("drwxr-xr-x  projects/"),
  o("drwxr-xr-x  services/"),
  o("drwxr-xr-x  experience/"),
  o("drwxr-xr-x  contact/"),
  o("drwxr-xr-x  social/"),
  bl(),
  d("-rw-r--r--  resume.pdf"),
  d("-rw-r--r--  portfolio.url → rajdeepkotoky.vercel.app"),
];

const NEOFETCH: Line[] = [
  a("  ██████╗  ██╗  ██╗   ") ,
  a("  ██╔══██╗ ██║ ██╔╝   ") ,
  a("  ██████╔╝ █████╔╝    ") ,
  a("  ██╔══██╗ ██╔═██╗    ") ,
  a("  ██║  ██║ ██║  ██╗   ") ,
  a("  ╚═╝  ╚═╝ ╚═╝  ╚═╝   ") ,
  bl(),
  o("  rajdeep@portfolio"),
  o("  ─────────────────────────────────────"),
  o("  OS        Portfolio v2.0"),
  o("  Host      rajdeepkotoky.vercel.app"),
  o("  Kernel    Next.js 15 (App Router)"),
  o("  Shell     TypeScript"),
  o("  DE        Tailwind CSS v4"),
  o("  Languages TypeScript · Python · JavaScript"),
  o("  Frontend  Next.js · React · Tailwind"),
  o("  Backend   Node.js · Express · Firebase"),
  o("  AI Stack  OpenAI · HuggingFace · PyTorch"),
  o("  Commerce  Shopify · Liquid · Stripe"),
  o("  Uptime    5+ years"),
  o("  Projects  26 delivered"),
  s("  Status    ● Available for hire"),
];

/* ── command router ── */
function runCommand(raw: string): { lines: Line[]; shouldClear?: boolean; shouldExit?: boolean } {
  const trimmed = raw.trim();
  const lower   = trimmed.toLowerCase();
  const [cmd, ...args] = lower.split(/\s+/);
  const flag = args.join(" ");

  switch (cmd) {
    case "help":       return { lines: HELP };
    case "about":
    case "whoami":     return { lines: ABOUT };
    case "skills":     return { lines: SKILLS };
    case "projects":
      if (flag === "shopify")   return { lines: PROJECTS_SHOPIFY };
      if (flag === "ai" || flag === "ml") return { lines: PROJECTS_AI };
      if (flag === "web")       return { lines: PROJECTS_WEB };
      return { lines: PROJECTS_ALL };
    case "services":   return { lines: SERVICES };
    case "experience":
    case "exp":        return { lines: EXPERIENCE };
    case "contact":    return { lines: CONTACT };
    case "social":     return { lines: SOCIAL };
    case "hire":       return { lines: HIRE };
    case "banner":     return { lines: BANNER };
    case "neofetch":   return { lines: NEOFETCH };
    case "ls":
    case "dir":        return { lines: LS };
    case "clear":      return { lines: [], shouldClear: true };
    case "exit":
    case "quit":       return { lines: [], shouldExit: true };
    case "date":
      return { lines: [o(`  ${new Date().toString()}`)] };
    case "echo":
      return { lines: [o(`  ${args.join(" ")}`)] };
    case "pwd":
      return { lines: [o("  /home/visitor/portfolio")] };
    case "uname":
      return { lines: [o(`  Portfolio Terminal v${VERSION} — Next.js 15`)] };
    case "cat":
      if (!flag) return { lines: [e("  Usage: cat [section]  e.g. cat skills")] };
      return runCommand(flag);
    case "open":
    case "resume":
      return { lines: [s("  Opening resume.pdf..."), d("  → /resume.pdf")] };
    case "":
      return { lines: [] };
    default:
      return {
        lines: [
          e(`  command not found: ${cmd}`),
          d("  Type 'help' to list available commands."),
        ],
      };
  }
}

/* ── color map ── */
const C: Record<LineType, string> = {
  cmd:       "#00ffcc",
  out:       "#7abfb0",
  success:   "#00ff88",
  error:     "#ff5566",
  warn:      "#ffcc44",
  dim:       "#2a6050",
  blank:     "transparent",
  accent:    "#00ccaa",
  highlight: "#a8f0e8",
};

const Cursor = () => (
  <span style={{
    display: "inline-block", width: 9, height: "1.1em",
    background: "#00ffcc", marginLeft: 2, verticalAlign: "text-bottom",
    animation: "blink 1.1s step-start infinite",
  }} />
);

export default function TerminalPage() {
  const [history, setHistory]     = useState<Entry[]>([]);
  const [input, setInput]         = useState("");
  const [cmdHistory, setCmdHist]  = useState<string[]>([]);
  const [histIdx, setHistIdx]     = useState(-1);
  const [booted, setBooted]       = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const idRef     = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setHistory([{ id: idRef.current++, input: "__boot__", lines: BANNER }]);
      setBooted(true);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  const submit = useCallback(() => {
    const raw    = input.trim();
    const result = runCommand(raw);

    if (result.shouldExit) { window.location.href = "/"; return; }
    if (result.shouldClear) { setHistory([]); setInput(""); return; }

    if (raw) { setCmdHist((h) => [raw, ...h]); setHistIdx(-1); }

    setHistory((h) => [...h, { id: idRef.current++, input: raw, lines: result.lines }]);
    setInput("");
  }, [input]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(next); setInput(cmdHistory[next] ?? ""); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = ["help","about","whoami","skills","projects","services","experience","contact","social","hire","neofetch","banner","ls","date","echo","clear","exit","resume","pwd","uname","cat","projects shopify","projects ai","projects web"];
      const match = cmds.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  }, [submit, histIdx, cmdHistory, input]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:translateY(0)} }
        .entry { animation: fadeIn 0.1s ease both; }
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#1a3a2a;border-radius:2px}
      `}</style>

      <div onClick={focusInput} style={{
        minHeight: "100dvh", background: "#060c09",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        display: "flex", flexDirection: "column", cursor: "text",
      }}>

        {/* Title bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 20px", background: "#0a1410",
          borderBottom: "1px solid #0d2a1a", flexShrink: 0,
        }}>
          <div style={{ display: "flex", gap: 7 }}>
            {["#ff5f57","#ffbd2e","#28c840"].map((bg) => (
              <span key={bg} style={{ width: 12, height: 12, borderRadius: "50%", background: bg, display: "block" }} />
            ))}
          </div>
          <span style={{ fontSize: 11, color: "#2a5a40", letterSpacing: "0.08em" }}>
            rajdeep@portfolio — terminal v{VERSION}
          </span>
          <Link href="/" onClick={(e) => e.stopPropagation()}
            style={{ fontSize: 11, color: "#00ccaa", textDecoration: "none",
              padding: "4px 12px", border: "1px solid rgba(0,204,170,0.35)",
              borderRadius: 5, fontWeight: 600, letterSpacing: "0.06em",
              background: "rgba(0,204,170,0.08)",
              transition: "all 0.15s ease", display: "inline-flex", alignItems: "center", gap: 5 }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.background="rgba(0,204,170,0.18)"; el.style.borderColor="rgba(0,204,170,0.7)"; el.style.color="#00ffcc"; el.style.boxShadow="0 0 12px rgba(0,204,170,0.25)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.background="rgba(0,204,170,0.08)"; el.style.borderColor="rgba(0,204,170,0.35)"; el.style.color="#00ccaa"; el.style.boxShadow="none"; }}>
            ← Portfolio
          </Link>
        </div>

        {/* Output */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "20px 28px",
          display: "flex", flexDirection: "column",
        }}>
          {!booted && <span style={{ color: "#2a5a40", fontSize: 13 }}>Initialising…</span>}

          {history.map((entry) => (
            <div key={entry.id} className="entry" style={{ marginBottom: 14 }}>
              {entry.input !== "__boot__" && (
                <div style={{ display: "flex", gap: 10, marginBottom: 3, userSelect: "none" }}>
                  <span style={{ color: "#00ccaa", fontSize: 13, flexShrink: 0 }}>{PROMPT}</span>
                  <span style={{ color: "#00ffcc", fontSize: 13 }}>{entry.input}</span>
                </div>
              )}
              {entry.lines.map((line, i) => (
                <div key={i} style={{
                  fontSize: 13, lineHeight: 1.7, color: C[line.type],
                  whiteSpace: "pre", minHeight: line.type === "blank" ? "0.7em" : undefined,
                }}>
                  {line.text}
                </div>
              ))}
            </div>
          ))}

          {/* Active input line */}
          {booted && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 8 }}>
              <span style={{ color: "#00ccaa", fontSize: 13, flexShrink: 0, userSelect: "none" }}>{PROMPT}</span>
              <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
                <span style={{ color: "#00ffcc", fontSize: 13, pointerEvents: "none", userSelect: "none", whiteSpace: "pre" }}>{input}</span>
                <Cursor />
                <input ref={inputRef} value={input} autoFocus autoComplete="off" autoCorrect="off"
                  autoCapitalize="off" spellCheck={false}
                  onChange={(e) => { setInput(e.target.value); setHistIdx(-1); }}
                  onKeyDown={handleKeyDown}
                  style={{ position: "absolute", inset: 0, opacity: 0, width: "100%",
                    border: "none", outline: "none", background: "transparent",
                    cursor: "text", fontSize: 13, fontFamily: "inherit" }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Hint bar */}
        <div style={{
          padding: "7px 28px", background: "#0a1410", borderTop: "1px solid #0d2a1a",
          display: "flex", gap: 28, flexShrink: 0, flexWrap: "wrap",
        }}>
          {[["Enter","run"],["↑ ↓","history"],["Tab","autocomplete"],["Ctrl+L","clear"],["exit","← portfolio"]].map(([k, l]) => (
            <span key={k} style={{ fontSize: 11, color: "#1a4a30" }}>
              <span style={{ color: "#2a6a44" }}>{k}</span>{" "}{l}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
