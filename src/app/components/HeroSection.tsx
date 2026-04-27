/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { ExternalLink, Mail, Phone, FileText, Braces } from "lucide-react";
import {
  SiNextdotjs,
  SiShopify,
  SiPython,
  SiTypescript,
  SiOpenai,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiFirebase,
  SiMongodb,
  SiWordpress,
  SiJavascript,
  SiExpress,
  SiMui,
  SiHuggingface,
  SiHtml5,
  SiPhp,
  SiFigma,
} from "react-icons/si";
import { MdDesignServices, MdWeb } from "react-icons/md";

const PHONE = "8638752315";

interface HeroSectionProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MAIN_STACK: Array<{
  name: string;
  Icon: any;
  color: string;
  bg: string;
  lightBg: string;
  lightColor: string;
}> = [
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    color: "#ffffff",
    bg: "#000000",
    lightBg: "#f0f0f0",
    lightColor: "#111111",
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    color: "#ffffff",
    bg: "#3178C6",
    lightBg: "#dbeafe",
    lightColor: "#1d4ed8",
  },
  {
    name: "AI / ML",
    Icon: SiOpenai,
    color: "#ffffff",
    bg: "#1a1a1a",
    lightBg: "#f0f0f0",
    lightColor: "#111111",
  },
  {
    name: "Python",
    Icon: SiPython,
    color: "#FFD343",
    bg: "#1e3a5f",
    lightBg: "#fef9e7",
    lightColor: "#b45309",
  },
  {
    name: "Shopify",
    Icon: SiShopify,
    color: "#96BF48",
    bg: "#1a2a0a",
    lightBg: "#eef6e0",
    lightColor: "#4a7a10",
  },
  {
    name: "Liquid",
    Icon: Braces,
    color: "#38BDF8",
    bg: "#0f172a",
    lightBg: "#e0f4fe",
    lightColor: "#0284c7",
  },
];

const MINOR_STACK = [
  {
    name: "React",
    Icon: SiReact,
    color: "#61DAFB",
    bg: "#20232a",
    lightBg: "#e0f8fe",
    lightColor: "#0891b2",
  },
  {
    name: "JavaScript",
    Icon: SiJavascript,
    color: "#F7DF1E",
    bg: "#1a1a00",
    lightBg: "#fefce8",
    lightColor: "#a16207",
  },
  {
    name: "Node.js",
    Icon: SiNodedotjs,
    color: "#68A063",
    bg: "#1a1a1a",
    lightBg: "#edf5e8",
    lightColor: "#166534",
  },
  {
    name: "Express",
    Icon: SiExpress,
    color: "#ffffff",
    bg: "#1a1a1a",
    lightBg: "#f1f1f1",
    lightColor: "#333333",
  },
  {
    name: "Tailwind CSS",
    Icon: SiTailwindcss,
    color: "#38BDF8",
    bg: "#0f172a",
    lightBg: "#e0f4fe",
    lightColor: "#0284c7",
  },
  {
    name: "Material UI",
    Icon: SiMui,
    color: "#007FFF",
    bg: "#0a1929",
    lightBg: "#e8f3ff",
    lightColor: "#0059b3",
  },
  {
    name: "Firebase",
    Icon: SiFirebase,
    color: "#FFCA28",
    bg: "#1a1200",
    lightBg: "#fffbea",
    lightColor: "#b45309",
  },
  {
    name: "MongoDB",
    Icon: SiMongodb,
    color: "#47A248",
    bg: "#0d1f0d",
    lightBg: "#edf7ed",
    lightColor: "#166534",
  },
  {
    name: "OpenAI API",
    Icon: SiOpenai,
    color: "#ffffff",
    bg: "#1a1a1a",
    lightBg: "#f1f1f1",
    lightColor: "#111111",
  },
  {
    name: "LLaMA 2",
    Icon: SiHuggingface,
    color: "#FFD21E",
    bg: "#1a1400",
    lightBg: "#fffbea",
    lightColor: "#92400e",
  },
  {
    name: "BERT",
    Icon: SiHuggingface,
    color: "#FFD21E",
    bg: "#1a1400",
    lightBg: "#fffbea",
    lightColor: "#92400e",
  },
  {
    name: "MuRIL",
    Icon: SiHuggingface,
    color: "#FFD21E",
    bg: "#1a1400",
    lightBg: "#fffbea",
    lightColor: "#92400e",
  },
  {
    name: "HTML5",
    Icon: SiHtml5,
    color: "#E34F26",
    bg: "#2a0e00",
    lightBg: "#fef0eb",
    lightColor: "#c2410c",
  },
  {
    name: "PHP",
    Icon: SiPhp,
    color: "#777BB4",
    bg: "#1a1a2e",
    lightBg: "#f0f0f9",
    lightColor: "#4f46e5",
  },
  {
    name: "WordPress",
    Icon: SiWordpress,
    color: "#21759B",
    bg: "#0d3349",
    lightBg: "#e8f4fb",
    lightColor: "#21759B",
  },
  {
    name: "Figma",
    Icon: SiFigma,
    color: "#F24E1E",
    bg: "#2a0a00",
    lightBg: "#fef0eb",
    lightColor: "#c2410c",
  },
  {
    name: "Web Design",
    Icon: MdWeb,
    color: "#34d399",
    bg: "#0d1f18",
    lightBg: "#ecfdf5",
    lightColor: "#059669",
  },
  {
    name: "Software Design",
    Icon: MdDesignServices,
    color: "#a78bfa",
    bg: "#1e1030",
    lightBg: "#f5f0ff",
    lightColor: "#7c3aed",
  },
];

const HeroSection = ({ isDarkMode, scrollToSection }: HeroSectionProps) => {
  const [fullStackCount, setFullStackCount] = React.useState(0);
  const [shopifyCount, setShopifyCount] = React.useState(0);
  const [clientCount, setClientCount] = React.useState(0);
  const [yearsCount, setYearsCount] = React.useState(0);
  const [contactOpen, setContactOpen] = React.useState(false);
  const contactRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node))
        setContactOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  React.useEffect(() => {
    const fi = setInterval(
      () =>
        setFullStackCount((p) => {
          if (p >= 4) {
            clearInterval(fi);
            return 4;
          }
          return p + 1;
        }),
      180,
    );
    const si = setInterval(
      () =>
        setShopifyCount((p) => {
          if (p >= 18) {
            clearInterval(si);
            return 18;
          }
          return p + 1;
        }),
      40,
    );
    const ci = setInterval(
      () =>
        setClientCount((p) => {
          if (p >= 25) {
            clearInterval(ci);
            return 25;
          }
          return p + 1;
        }),
      50,
    );
    const yi = setInterval(
      () =>
        setYearsCount((p) => {
          if (p >= 5) {
            clearInterval(yi);
            return 5;
          }
          return p + 1;
        }),
      300,
    );
    return () => {
      clearInterval(fi);
      clearInterval(si);
      clearInterval(ci);
      clearInterval(yi);
    };
  }, []);

  /* Color tokens - only colors differ between modes */
  const t = isDarkMode
    ? {
        section: "#08090f",
        blob1: "radial-gradient(circle, rgba(0,200,255,0.06), transparent 70%)",
        blob2: "radial-gradient(circle, rgba(120,0,255,0.05), transparent 70%)",
        cardBg: "#1c1c1e",
        cardBorder: "#2a2a2a",
        eyebrow: "#00ccaa",
        eyebrowLine: "rgba(0,204,170,0.5)",
        h1Line1: "#a8f0e8",
        h1Line2: "#9d8fff",
        bioBody: "#5a7a70",
        bioEmphasis: "#8aa8a0",
        statNum: "#e0f4f0",
        statSup: "#00ccaa",
        statLabel: "#2a5a50",
        btn1Border: "rgba(0,255,200,0.25)",
        btn1Bg: "rgba(0,255,200,0.1)",
        btn1Text: "#00ffcc",
        btn2Border: "rgba(0,204,170,0.25)",
        btn2Bg: "transparent",
        btn2Text: "#00ccaa",
        btn3Border: "#1a3a30",
        btn3Bg: "transparent",
        btn3Text: "#4a7a70",
        divider: "#0a2a22",
        stackLabel: "#1a4a40",
        iconBg: "#040d0a",
        iconBorder: "#0a2a22",
        glow: "#2a2a2a",
        photoNameText: "text-white",
        photoSubText: "text-gray-400",
        tooltipBg: "bg-gray-900",
      }
    : ({
        section: "#ffffff",
        blob1:
          "radial-gradient(circle, rgba(109,40,217,0.04), transparent 70%)",
        blob2:
          "radial-gradient(circle, rgba(13,148,136,0.05), transparent 70%)",
        cardBg: "#ffffff",
        cardBorder: "#e2e8f0",
        eyebrow: "#0d9488",
        eyebrowLine: "rgba(13,148,136,0.3)",
        h1Line1: "#0f172a",
        h1Line2: "#6d28d9",
        bioBody: "#475569",
        bioEmphasis: "#1e293b",
        statNum: "#0f172a",
        statSup: "#0d9488",
        statLabel: "#94a3b8",
        btn1Border: "transparent",
        btn1Bg: "#0d9488",
        btn1Text: "#ffffff",
        btn2Border: "#cbd5e1",
        btn2Bg: "transparent",
        btn2Text: "#334155",
        btn3Border: "#e2e8f0",
        btn3Bg: "transparent",
        btn3Text: "#64748b",
        divider: "#e2e8f0",
        stackLabel: "#94a3b8",
        iconBg: "",
        iconBorder: "#e2e8f0",
        glow: "rgba(148,163,184,0.15)",
        photoNameText: "text-slate-900",
        photoSubText: "text-slate-500",
        tooltipBg: "bg-slate-800",
      } as const);

  /* Core stack icons */
  const techStack = (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <div style={{ height: 1, flex: 1, background: t.divider }} />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase" as const,
            color: t.stackLabel,
          }}
        >
          Core Stack
        </span>
        <div style={{ height: 1, flex: 1, background: t.divider }} />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap" as const,
          gap: 8,
          justifyContent: "center",
        }}
      >
        {MAIN_STACK.map((tech) => (
          <div
            key={tech.name}
            className="relative group flex items-center justify-center cursor-default transition-all duration-150 hover:scale-110"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: isDarkMode ? t.iconBg : tech.lightBg,
              border: `1px solid ${t.iconBorder}`,
            }}
          >
            <tech.Icon
              size={18}
              color={isDarkMode ? tech.color : tech.lightColor}
            />
            <span
              className={`pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold px-2 py-0.5 rounded-md text-white shadow opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10 ${t.tooltipBg}`}
            >
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  /* Contact dropdown */
  const contactDropdown = (
    <div className="relative" ref={contactRef}>
      <div
        className={`absolute bottom-full left-1/2 z-50 mb-3 flex -translate-x-1/2 gap-2 floating-action-menu ${
          contactOpen ? "is-open" : "is-closed"
        }`}
        style={
          {
            "--floating-closed-y": "8px",
            "--floating-origin": "center bottom",
          } as React.CSSProperties
        }
      >
        <a
          href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20would%20like%20to%20get%20in%20touch%21`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setContactOpen(false)}
          className="floating-action-option"
          style={{ color: "#25D366" }}
          aria-label="WhatsApp"
          title="WhatsApp"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="floating-action-label">WhatsApp</span>
        </a>
        <a
          href={`tel:+91${PHONE}`}
          onClick={() => setContactOpen(false)}
          className="floating-action-option"
          style={{ color: "#60a5fa" }}
          aria-label="Call me"
          title="Call me"
        >
          <Phone className="w-4 h-4" />
          <span className="floating-action-label">Call</span>
        </a>
      </div>
      <button
        onClick={() => setContactOpen((o) => !o)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          fontWeight: 500,
          padding: "9px 18px",
          borderRadius: 4,
          cursor: "pointer",
          border: `1px solid ${t.btn3Border}`,
          background: t.btn3Bg,
          color: t.btn3Text,
          transition: "all 0.18s ease",
        }}
      >
        Get In Touch
      </button>
    </div>
  );

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(-3deg);
          }
          50% {
            transform: translateY(-7px) rotate(-3deg);
          }
        }
        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0) rotate(2deg);
          }
          50% {
            transform: translateY(-9px) rotate(2deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-5px) rotate(-2deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        @keyframes popUpFromButton {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <section
        id="about"
        style={{ background: t.section }}
        className="h-full flex flex-col overflow-hidden relative"
      >
        {/* Ambient blobs */}
        <div
          className="absolute -top-24 -left-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: t.blob1 }}
        />
        <div
          className="absolute -bottom-20 right-10 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: t.blob2 }}
        />

        {/* MOBILE layout */}
        <div className="md:hidden flex-1 flex flex-col justify-center px-5 py-4 relative z-10 gap-3">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative mx-12">
              <div
                style={{
                  background: t.cardBg,
                  border: `1px solid ${t.cardBorder}`,
                }}
                className="rounded-2xl p-2 shadow-xl"
              >
                <img
                  src="/DP.jpg"
                  alt="Rajdeep"
                  className="w-28 h-36 object-cover rounded-xl"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold shadow flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />{" "}
                Available
              </div>
              {[
                {
                  pos: "absolute -top-3 -left-10 animate-float",
                  icon: <SiNextdotjs size={10} color="#fff" />,
                  iconBg: "#000",
                  label: "Next.js",
                },
                {
                  pos: "absolute top-8 -right-10 animate-float-reverse",
                  icon: <SiShopify size={10} color="#fff" />,
                  iconBg: "#96BF48",
                  label: "Shopify",
                },
                {
                  pos: "absolute bottom-4 -left-10 animate-float-slow",
                  icon: <SiPython size={10} color="#FFD343" />,
                  iconBg: "#1e3a5f",
                  label: "AI / ML",
                },
              ].map(({ pos, icon, iconBg, label }) => (
                <div
                  key={label}
                  className={`${pos} rounded-lg p-1.5 shadow-md border`}
                  style={{ background: t.cardBg, borderColor: t.cardBorder }}
                >
                  <div className="flex items-center gap-1">
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center"
                      style={{ background: iconBg }}
                    >
                      {icon}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: t.statNum,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="text-center space-y-1.5">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: t.eyebrow,
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 1,
                  background: t.eyebrowLine,
                  display: "block",
                }}
              />
              Rajdeep Kotoky
              <span
                style={{
                  width: 16,
                  height: 1,
                  background: t.eyebrowLine,
                  display: "block",
                }}
              />
            </div>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              <span
                style={{ display: "block", fontSize: 21, color: t.h1Line1 }}
              >
                Full-Stack &amp; AI/ML Developer
              </span>
              <span
                style={{ display: "block", fontSize: 18, color: t.h1Line2 }}
              >
                Shopify Expert
              </span>
            </h1>
            <p
              style={{
                fontSize: 12,
                lineHeight: 1.7,
                color: t.bioBody,
                padding: "0 8px",
              }}
            >
              Full-stack apps,{" "}
              <span style={{ color: t.bioEmphasis, fontWeight: 500 }}>
                AI/ML systems
              </span>{" "}
              &amp;{" "}
              <span style={{ color: t.bioEmphasis, fontWeight: 500 }}>
                Shopify stores
              </span>{" "}
              - built to scale, automate, and grow revenue. End-to-end, focused
              on performance and real impact.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            <div className="text-center">
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  fontWeight: 700,
                  color: t.statNum,
                  lineHeight: 1,
                }}
              >
                {fullStackCount}
              </div>
              <div style={{ fontSize: 10, color: t.statLabel, marginTop: 3 }}>
                Full-Stack
              </div>
              <div style={{ fontSize: 9, color: t.bioBody, marginTop: 1 }}>
                incl. AI
              </div>
            </div>
            <div className="text-center">
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  fontWeight: 700,
                  color: t.statNum,
                  lineHeight: 1,
                }}
              >
                {shopifyCount}
              </div>
              <div style={{ fontSize: 10, color: t.statLabel, marginTop: 3 }}>
                Shopify Stores
              </div>
              <div style={{ fontSize: 9, color: t.bioBody, marginTop: 1 }}>
                & many more
              </div>
            </div>
            <div className="text-center">
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  fontWeight: 700,
                  color: t.statNum,
                  lineHeight: 1,
                }}
              >
                {clientCount}
                <sup style={{ color: t.statSup, fontSize: 9 }}>+</sup>
              </div>
              <div style={{ fontSize: 10, color: t.statLabel, marginTop: 3 }}>
                Happy Clients
              </div>
            </div>
            <div className="text-center">
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  fontWeight: 700,
                  color: t.statNum,
                  lineHeight: 1,
                }}
              >
                {yearsCount}
                <sup style={{ color: t.statSup, fontSize: 9 }}>+</sup>
              </div>
              <div style={{ fontSize: 10, color: t.statLabel, marginTop: 3 }}>
                Yrs Experience
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => scrollToSection("projects")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: 4,
                cursor: "pointer",
                border: `1px solid ${t.btn1Border}`,
                background: t.btn1Bg,
                color: t.btn1Text,
              }}
            >
              View My Work
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: 4,
                border: `1px solid ${t.btn2Border}`,
                background: t.btn2Bg,
                color: t.btn2Text,
                textDecoration: "none",
              }}
            >
              Resume
            </a>
            {contactDropdown}
          </div>

          {techStack}
        </div>

        {/* DESKTOP layout */}
        <div className="hidden md:flex flex-1 items-center relative z-10 overflow-hidden">
          <div className="max-w-6xl mx-auto px-8 lg:px-12 w-full">
            <div className="grid grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left */}
              <div>
                {/* Eyebrow */}
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: t.eyebrow,
                    marginBottom: 18,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 1,
                      background: t.eyebrowLine,
                      flexShrink: 0,
                      display: "block",
                    }}
                  />
                  Rajdeep Kotoky
                </div>

                {/* Heading */}
                <h1
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "clamp(32px, 3.8vw, 52px)",
                    fontWeight: 900,
                    lineHeight: 1.08,
                    letterSpacing: "-0.03em",
                    marginBottom: 20,
                  }}
                >
                  <span style={{ display: "block", color: t.h1Line1 }}>
                    Full-Stack &amp; AI/ML Developer
                  </span>
                  <span style={{ display: "block", color: t.h1Line2 }}>
                    Shopify Expert
                  </span>
                </h1>

                {/* Bio */}
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: t.bioBody,
                    maxWidth: 460,
                    marginBottom: 28,
                  }}
                >
                  I build{" "}
                  <span style={{ color: t.bioEmphasis, fontWeight: 500 }}>
                    full-stack applications
                  </span>
                  ,{" "}
                  <span style={{ color: t.bioEmphasis, fontWeight: 500 }}>
                    AI/ML integrations &amp; systems
                  </span>
                  , and{" "}
                  <span style={{ color: t.bioEmphasis, fontWeight: 500 }}>
                    Shopify stores
                  </span>{" "}
                  for businesses to scale, automate, and increase revenue -
                  end-to-end solutions focused on{" "}
                  <span style={{ color: t.bioEmphasis, fontWeight: 500 }}>
                    performance, usability, and real impact
                  </span>
                  .
                </p>

                {/* Stats */}
                <div
                  style={{
                    display: "flex",
                    gap: 18,
                    marginBottom: 28,
                    flexWrap: "wrap" as const,
                  }}
                >
                  {/* Full-Stack */}
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 24,
                        fontWeight: 700,
                        color: t.statNum,
                        lineHeight: 1,
                      }}
                    >
                      {fullStackCount}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: t.statLabel,
                        marginTop: 4,
                        letterSpacing: "0.04em",
                      }}
                    >
                      Full-Stack Projects Delivered
                    </div>
                    <div
                      style={{ fontSize: 10, color: t.bioBody, marginTop: 2 }}
                    >
                      incl. AI integrations
                    </div>
                  </div>

                  {/* Shopify */}
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 24,
                        fontWeight: 700,
                        color: t.statNum,
                        lineHeight: 1,
                      }}
                    >
                      {shopifyCount}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: t.statLabel,
                        marginTop: 4,
                        letterSpacing: "0.04em",
                      }}
                    >
                      Shopify Stores
                    </div>
                    <div
                      style={{ fontSize: 10, color: t.bioBody, marginTop: 2 }}
                    >
                      & many more worked with
                    </div>
                  </div>

                  {/* Clients */}
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 24,
                        fontWeight: 700,
                        color: t.statNum,
                        lineHeight: 1,
                      }}
                    >
                      {clientCount}
                      <sup style={{ color: t.statSup, fontSize: 12 }}>+</sup>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: t.statLabel,
                        marginTop: 4,
                        letterSpacing: "0.04em",
                      }}
                    >
                      Happy Clients
                    </div>
                  </div>

                  {/* Years */}
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 24,
                        fontWeight: 700,
                        color: t.statNum,
                        lineHeight: 1,
                      }}
                    >
                      {yearsCount}
                      <sup style={{ color: t.statSup, fontSize: 12 }}>+</sup>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: t.statLabel,
                        marginTop: 4,
                        letterSpacing: "0.04em",
                      }}
                    >
                      Years Experience
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap" as const,
                    marginBottom: 32,
                  }}
                >
                  <button
                    onClick={() => scrollToSection("projects")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 500,
                      padding: "9px 18px",
                      borderRadius: 4,
                      cursor: "pointer",
                      border: `1px solid ${t.btn1Border}`,
                      background: t.btn1Bg,
                      color: t.btn1Text,
                      transition: "all 0.18s ease",
                    }}
                  >
                    View My Work
                  </button>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 500,
                      padding: "9px 18px",
                      borderRadius: 4,
                      cursor: "pointer",
                      border: `1px solid ${t.btn2Border}`,
                      background: t.btn2Bg,
                      color: t.btn2Text,
                      transition: "all 0.18s ease",
                      textDecoration: "none",
                    }}
                  >
                    Resume
                  </a>
                  {contactDropdown}
                </div>
              </div>

              {/* Right - Photo + Core Stack */}
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div
                    style={{
                      background: t.cardBg,
                      border: `1px solid ${t.cardBorder}`,
                    }}
                    className="rounded-2xl p-3 shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                  >
                    <img
                      src="/DP.jpg"
                      alt="Professional Photo"
                      className="w-44 h-56 lg:w-52 lg:h-64 object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />{" "}
                    Available
                  </div>
                  {/* Floating tech badges */}
                  <div
                    className="absolute -top-5 -left-6 rounded-xl p-2.5 shadow-lg border animate-float cursor-pointer hover:scale-105 transition-all duration-300"
                    style={{ background: t.cardBg, borderColor: t.cardBorder }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center">
                        <SiNextdotjs size={14} color="#ffffff" />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: t.statNum,
                          }}
                        >
                          Next.js
                        </div>
                        <div style={{ fontSize: 10, color: t.bioBody }}>
                          React Framework
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute top-10 -right-8 rounded-xl p-2.5 shadow-lg border animate-float-reverse cursor-pointer hover:scale-105 transition-all duration-300"
                    style={{ background: t.cardBg, borderColor: t.cardBorder }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-[#96BF48] rounded-lg flex items-center justify-center">
                        <SiShopify size={14} color="#ffffff" />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: t.statNum,
                          }}
                        >
                          Shopify
                        </div>
                        <div style={{ fontSize: 10, color: t.bioBody }}>
                          E-commerce
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute bottom-6 -left-8 rounded-xl p-2.5 shadow-lg border animate-float-slow cursor-pointer hover:scale-105 transition-all duration-300"
                    style={{ background: t.cardBg, borderColor: t.cardBorder }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
                        <SiPython size={14} color="#FFD343" />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: t.statNum,
                          }}
                        >
                          AI / ML
                        </div>
                        <div style={{ fontSize: 10, color: t.bioBody }}>
                          Python &amp; Models
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 rounded-2xl blur-2xl -z-10 scale-95 opacity-30"
                    style={{ background: t.glow }}
                  />
                </div>
                {techStack}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HeroSection;
