# Rajdeep Kotoky — Portfolio

Personal portfolio of Rajdeep Kotoky, Full-Stack Developer & AI/ML Engineer.

**Live site:** https://www.rajdeepkotoky.com

## Highlights

- **Slide-based home page** — hero, testimonials, projects, services, quick solutions and contact, navigated by wheel, swipe or keyboard.
- **AI assistant** — a chat widget backed by a Groq-hosted LLM that answers questions about my work and routes visitors to projects, services or contact. The API route validates input, rate-limits per IP, and never exposes the API key to the browser.
- **3D experiences** — an interactive cube (`/cube`) and a 3D scroll tour (`/zoom`) built with React Three Fiber.
- **Terminal mode** — a command-line style version of the portfolio at `/terminal`.
- **Project & service pages** — a statically generated case-study page for every project and a page per service, each with its own metadata, generated social-share image and structured data.

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · React Three Fiber / drei · Lenis · Groq API · Vercel

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then add your Groq API key
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Name           | Required | Description                                                      |
| -------------- | -------- | ---------------------------------------------------------------- |
| `GROQ_API_KEY` | For chat | Server-only key for the AI assistant. Without it, chat returns a friendly "not configured" message. |

### Scripts

| Command             | Description                   |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start the dev server          |
| `npm run build`     | Production build              |
| `npm run start`     | Serve the production build    |
| `npm run lint`      | Lint with ESLint              |
| `npm run typecheck` | Type-check with TypeScript    |

## Project structure

```
src/app/
├── api/chat/       AI assistant API route (+ optional knowledge-base search)
├── components/     Page sections and client components
├── data/           Projects, services, testimonials and site/contact config
├── services/       Service listing and statically generated detail pages
├── projects/       Full project showcase
├── cube/ zoom/     3D experiences
└── terminal/       Terminal-style portfolio
```

Contact details and the site URL live in `src/app/data/site.ts`; update them there and every page, link and the chat assistant pick up the change.

## Deployment

Deployed on Vercel. Set `GROQ_API_KEY` in the project's environment variables. Every push is checked by the CI workflow (lint, type-check, build).

## Contact

- Email: kotoky10@gmail.com
- LinkedIn: https://www.linkedin.com/in/rajdeep-kotoky-2273561a0/
- GitHub: https://github.com/Rajdeep1234yyuhh
