import Image from "next/image";
import Link from "next/link";
import { Geist } from "next/font/google";
import {
  BadgeCheck,
  Briefcase,
  CodeXml,
  FileDown,
  FlaskConical,
  GraduationCap,
  Mail,
  MapPin,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";
import { FaLinkedin } from "react-icons/fa";
import {
  SiExpress,
  SiFirebase,
  SiGithub,
  SiGraphql,
  SiHuggingface,
  SiInstagram,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPython,
  SiPytorch,
  SiRazorpay,
  SiReact,
  SiShopify,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiWhatsapp,
} from "react-icons/si";
import { LazyVideo } from "../components/LazyVideo";
import { EDUCATION, EXPERIENCE, PROFILE, PROFILE_STATS, RESEARCH } from "../data/profile";
import { allProjects, type Project } from "../data/projects";
import { getContact } from "../lib/contact";
import { pageMetadata } from "../lib/seo";
import { getYoutubeVideoId } from "../lib/youtube";
import { ExperienceList, MinimalHeader, ScrollToTop } from "./MinimalClient";
import "./minimal.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata = pageMetadata({
  title: "Minimal Portfolio",
  description:
    "A minimal one-page portfolio of Rajdeep Kotoky, full-stack & AI/ML developer and Shopify expert: projects, Shopify stores, tech stack and experience.",
  path: "/minimal",
});

// Sets the theme before first paint so a light-theme visitor never sees a
// dark flash. Dark is the default, as this design was made for it.
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");document.currentScript.parentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){}`;

const isStore = (p: Project) => p.categories.includes("Shopify");
const projects = allProjects.filter((p) => !isStore(p));
const stores = allProjects.filter(isStore);

const STACK: { name: string; icon: IconType; color?: string }[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", icon: SiExpress },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Firebase", icon: SiFirebase, color: "#FFA000" },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
  { name: "Shopify", icon: SiShopify, color: "#7AB55C" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
  { name: "Razorpay", icon: SiRazorpay, color: "#3395FF" },
  { name: "OpenAI", icon: SiOpenai },
  { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "LangChain", icon: SiLangchain },
];

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

/* ── layout pieces ── */

// Full-width rule below, content in the bordered centre column
function Block({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-(--m-line)">
      <div className={`mx-auto max-w-3xl border-x border-(--m-line) px-4 sm:px-6 ${className}`}>{children}</div>
    </div>
  );
}

function Band({ tall }: { tall?: boolean }) {
  return (
    <div className="minimal-dots border-b border-(--m-line)" aria-hidden="true">
      <div className={`mx-auto max-w-3xl border-x border-(--m-line) ${tall ? "h-12" : "h-8"}`} />
    </div>
  );
}

function Section({
  id,
  title,
  action,
  children,
}: {
  id: string;
  title: string;
  action?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-12 border-b border-(--m-line)">
      <div className="mx-auto max-w-3xl border-x border-(--m-line) px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight">
            {title}
          </h2>
          {action && (
            <Link
              href={action.href}
              className="text-xs font-medium text-(--m-muted) underline underline-offset-4 transition-colors hover:text-(--m-fg)"
            >
              {action.label}
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

const B = ({ children }: { children: React.ReactNode }) => <strong className="font-semibold">{children}</strong>;

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="font-medium text-(--m-fg) underline decoration-(--m-muted) underline-offset-4 transition-colors hover:decoration-(--m-fg)"
    >
      {children}
    </a>
  );
}

function IntroLine({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      <Icon className="size-4 shrink-0 text-(--m-muted)" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

/* ── project cards ── */

// Stand-in for projects without a screenshot: a tiny browser window
function BrowserMock({ project }: { project: Project }) {
  const host = hostOf(project.demo) ?? project.categories[0];
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex h-5 shrink-0 items-center gap-1 border-b border-(--m-line) px-2">
        <span className="size-1.5 rounded-full bg-(--m-line)" />
        <span className="size-1.5 rounded-full bg-(--m-line)" />
        <span className="size-1.5 rounded-full bg-(--m-line)" />
        <span className="ml-1.5 truncate font-mono text-[9px] text-(--m-muted)">{host}</span>
      </div>
      <div className="minimal-dots grid flex-1 place-items-center px-3">
        <span className="line-clamp-2 text-center text-base font-semibold tracking-tight">
          {project.title.split(" - ")[0]}
        </span>
      </div>
    </div>
  );
}

function Thumb({ project }: { project: Project }) {
  const media = "absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]";
  if (project.image) return <Image src={project.image} alt="" fill sizes="224px" className={media} />;
  const youtubeId = project.video ? getYoutubeVideoId(project.video) : null;
  if (youtubeId) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={`https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg`} alt="" loading="lazy" className={media} />
    );
  }
  if (project.video) return <LazyVideo src={project.video} className={media} />;
  return <BrowserMock project={project} />;
}

function CardRail({ items, icon: Icon, short }: { items: Project[]; icon: LucideIcon; short?: boolean }) {
  return (
    <ul className="minimal-rail -mr-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pr-4 pb-3 sm:-mr-6 sm:pr-6">
      {items.map((project) => (
        <li key={project.slug} className="w-56 shrink-0 snap-start">
          <Link href={`/projects/${project.slug}`} className="group block">
            <div className="relative aspect-video overflow-hidden rounded-lg border border-(--m-line) bg-(--m-card) transition-colors group-hover:border-(--m-muted)">
              <Thumb project={project} />
            </div>
            <p className="mt-2 flex gap-2 text-[13px] leading-snug font-medium">
              <Icon className="mt-0.5 size-3.5 shrink-0 text-(--m-muted)" aria-hidden="true" />
              <span className={`${short ? "truncate" : "line-clamp-2"} underline-offset-4 group-hover:underline`}>
                {short ? project.title.split(" - ")[0] : project.title}
              </span>
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ── page ── */

export default async function MinimalPage() {
  const contact = await getContact();
  const socials = [
    { href: contact.linkedin, label: "LinkedIn", icon: FaLinkedin },
    { href: contact.github, label: "GitHub", icon: SiGithub },
    { href: contact.instagram, label: "Instagram", icon: SiInstagram },
    { href: contact.whatsappHref, label: "WhatsApp", icon: SiWhatsapp },
  ];
  const socialLinks = (size: string) =>
    socials.map(({ href, label, icon: Icon }) => (
      <li key={label}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="block text-(--m-muted) transition-colors hover:text-(--m-fg)"
        >
          <Icon className={size} />
        </a>
      </li>
    ));

  return (
    <div
      className={`minimal ${geist.variable} min-h-dvh bg-(--m-bg) text-(--m-fg) antialiased`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      <MinimalHeader initials="RK" />

      <main>
        <div id="top" className="scroll-mt-12">
          <Band tall />

          <Block className="py-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="size-24 shrink-0 rounded-full border border-(--m-line) p-1 sm:size-28">
                <Image
                  src={PROFILE.photo}
                  alt={PROFILE.name}
                  width={224}
                  height={224}
                  priority
                  className="size-full rounded-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <ul className="flex items-center gap-3" aria-label="Social profiles">
                  {socialLinks("size-4")}
                </ul>
                <h1 className="mt-2.5 flex items-center gap-1.5 text-2xl font-semibold tracking-tight sm:text-[28px]">
                  {PROFILE.name}
                  <BadgeCheck className="size-5 shrink-0 fill-sky-500 text-(--m-bg) sm:size-6" aria-hidden="true" />
                </h1>
                <p className="mt-1 text-sm text-(--m-muted)">{PROFILE.role}</p>
              </div>
            </div>
          </Block>

          <Block className="py-5">
            <ul className="space-y-3.5 text-sm">
              <IntroLine icon={Briefcase}>
                I build AI & SaaS products like <InlineLink href="https://dhiti.ai/">Dhiti</InlineLink>
              </IntroLine>
              <IntroLine icon={ShoppingBag}>
                & craft Shopify stores for <InlineLink href="#stores">{stores.length} brands</InlineLink>
              </IntroLine>
              <IntroLine icon={MapPin}>
                Based in {PROFILE.location}, open to <InlineLink href="#contact">new work</InlineLink>
              </IntroLine>
              <IntroLine icon={FileDown}>
                Download my resume at <InlineLink href="/resume.pdf">resume.pdf</InlineLink>
              </IntroLine>
            </ul>
          </Block>

          <Band />

          <Section id="about" title="About">
            <p className="text-sm leading-7">
              Full-stack & AI/ML developer with <B>5+ years</B> of experience shipping production apps. Currently
              building <B>AI-powered SaaS</B> like <B>Dhiti</B>, an OpenAI-driven career assessment platform, along
              with <B>LLM chatbots</B>, booking platforms and ERP tools for growing businesses. I&apos;ve delivered{" "}
              <B>{stores.length} Shopify stores</B> for brands across India, and my research on{" "}
              <B>Assamese-English code-mixed NLP</B> reached <B>~97% intent accuracy</B>. Every delivery is
              performance-optimized, security-checked and backed by post-launch support.
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-(--m-line) bg-(--m-line) sm:grid-cols-4">
              {PROFILE_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col bg-(--m-bg) px-3 py-3">
                  <dt className="order-2 mt-0.5 text-xs text-(--m-muted)">{stat.label}</dt>
                  <dd className="order-1 font-mono text-xl font-semibold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Section>
        </div>

        <Band />

        <Section id="projects" title="Projects" action={{ href: "/projects", label: "View all" }}>
          <CardRail items={projects} icon={CodeXml} />
        </Section>

        <Band />

        <Section id="stores" title="Shopify Stores" action={{ href: "/projects", label: "View all" }}>
          <CardRail items={stores} icon={ShoppingBag} short />
        </Section>

        <Band />

        <Section id="stack" title="Tech Stack">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {STACK.map(({ name, icon: Icon, color }) => (
              <li
                key={name}
                className="flex items-center gap-2 rounded-md border border-(--m-line) bg-(--m-card) px-3 py-2 text-[13px] font-medium transition-colors hover:bg-(--m-card-hover)"
              >
                <Icon className="size-4 shrink-0" style={color ? { color } : undefined} aria-hidden="true" />
                <span className="truncate">{name}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Band />

        <Section id="work" title="Experience" action={{ href: "/resume.pdf", label: "Resume" }}>
          <ExperienceList roles={EXPERIENCE} />

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-(--m-line) p-4">
              <h3 className="flex items-center gap-2 text-[13px] font-semibold">
                <FlaskConical className="size-4 text-(--m-muted)" aria-hidden="true" />
                Research
              </h3>
              <p className="mt-2 text-sm font-medium">{RESEARCH.title}</p>
              <ul className="mt-2 space-y-1 text-[13px] text-(--m-muted)">
                {RESEARCH.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-(--m-line) p-4">
              <h3 className="flex items-center gap-2 text-[13px] font-semibold">
                <GraduationCap className="size-4 text-(--m-muted)" aria-hidden="true" />
                Education
              </h3>
              <p className="mt-2 text-sm font-medium">{EDUCATION.degree}</p>
              <p className="mt-1 text-[13px] text-(--m-muted)">{EDUCATION.field}</p>
            </div>
          </div>
        </Section>

        <Band />

        <Section id="contact" title="Contact">
          <p className="text-sm leading-7">
            Have a project in mind? I&apos;m open to <B>freelance, contract and full-time</B> work, and usually reply
            within 24 hours.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[13px] font-medium">
            <a
              href={contact.mailtoHref}
              className="inline-flex items-center gap-2 rounded-md bg-(--m-fg) px-3.5 py-2 text-(--m-bg) transition-opacity hover:opacity-85"
            >
              <Mail className="size-4" aria-hidden="true" />
              Email me
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-(--m-line) bg-(--m-card) px-3.5 py-2 transition-colors hover:bg-(--m-card-hover)"
            >
              <SiWhatsapp className="size-4 text-[#25D366]" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-md border border-(--m-line) bg-(--m-card) px-3.5 py-2 transition-colors hover:bg-(--m-card-hover)"
            >
              <FileDown className="size-4 text-(--m-muted)" aria-hidden="true" />
              Resume
            </a>
          </div>
          <p className="mt-4 font-mono text-xs break-all text-(--m-muted)">
            {contact.email} · {contact.phoneDisplay}
          </p>
        </Section>

        <Band />
      </main>

      <footer className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 border-x border-(--m-line) px-4 py-4 text-xs text-(--m-muted) sm:px-6">
        <p>
          © {new Date().getFullYear()} {PROFILE.name} ·{" "}
          <Link href="/" className="font-medium text-(--m-fg) underline underline-offset-4">
            Full portfolio
          </Link>
        </p>
        <ul className="flex items-center gap-3.5" aria-label="Social profiles">
          {socialLinks("size-3.5")}
        </ul>
      </footer>

      <ScrollToTop />
    </div>
  );
}
