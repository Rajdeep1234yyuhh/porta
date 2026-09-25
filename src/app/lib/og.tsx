import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_URL } from "../data/site";

// Social-share cards (og:image) for opengraph-image routes. Satori can't read
// woff2 or variable fonts, so static Outfit TTFs live in assets/og.
const asset = (name: string) => readFile(join(process.cwd(), "assets/og", name));

const domain = new URL(SITE_URL).hostname.replace(/^www\./, "");

export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const [regular, bold, avatar] = await Promise.all([
    asset("Outfit-400.ttf"),
    asset("Outfit-700.ttf"),
    asset("avatar.jpg"),
  ]);
  const titleSize = title.length > 60 ? 50 : title.length > 34 ? 60 : 80;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "Outfit",
          color: "#ffffff",
          background: "linear-gradient(135deg, #070b1f 0%, #0f1a4a 55%, #1d3f9e 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "0 48px 0 80px",
          }}
        >
          <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#cbd5e1" }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: titleSize, fontWeight: 700, lineHeight: 1.1, marginTop: 20 }}>{title}</div>
          <div style={{ fontSize: 30, color: "#60a5fa", marginTop: 24 }}>{subtitle}</div>
          <div style={{ fontSize: 24, color: "#94a3b8", marginTop: 44 }}>{domain}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", paddingRight: 80 }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- Satori image, not DOM */}
          <img
            src={`data:image/jpeg;base64,${avatar.toString("base64")}`}
            width={280}
            height={280}
            style={{ borderRadius: 9999, border: "6px solid rgba(96,165,250,0.55)" }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Outfit", data: regular, weight: 400, style: "normal" },
        { name: "Outfit", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
