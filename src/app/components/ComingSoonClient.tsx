"use client";
import Link from "next/link";

export default function ComingSoonClient() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "radial-gradient(ellipse at 50% 50%, #2d1b6e 0%, #1a1040 35%, #0e0a2a 70%, #080618 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Outfit', 'Inter', sans-serif",
    }}>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ring-1 {
          animation: spin-slow 18s linear infinite;
        }
        .ring-2 {
          animation: spin-reverse 26s linear infinite;
        }
        .ring-3 {
          animation: spin-slow 38s linear infinite;
        }
        .icon-float {
          animation: float-up 4s ease-in-out infinite;
        }
        .fade-1 { animation: fade-in 0.7s ease forwards; }
        .fade-2 { animation: fade-in 0.7s ease 0.15s forwards; opacity: 0; }
        .fade-3 { animation: fade-in 0.7s ease 0.3s forwards;  opacity: 0; }
        .fade-4 { animation: fade-in 0.7s ease 0.45s forwards; opacity: 0; }
        .fade-5 { animation: fade-in 0.7s ease 0.6s forwards;  opacity: 0; }
        .back-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(8px);
        }
        .back-btn:hover {
          background: rgba(167,139,250,0.18) !important;
          border-color: rgba(167,139,250,0.55) !important;
          color: #ffffff !important;
          box-shadow: 0 0 18px rgba(124,58,237,0.35);
        }
        .back-btn:hover .back-arrow { transform: translateX(-3px); }
        .back-arrow { display: inline-block; transition: transform 0.18s ease; }
      `}</style>

      {/* Decorative rings */}
      <div className="ring-1" style={{
        position: "absolute",
        width: 520,
        height: 520,
        borderRadius: "50%",
        border: "1px solid rgba(167,139,250,0.18)",
        pointerEvents: "none",
      }} />
      <div className="ring-2" style={{
        position: "absolute",
        width: 720,
        height: 720,
        borderRadius: "50%",
        border: "1px dashed rgba(96,165,250,0.12)",
        pointerEvents: "none",
      }} />
      <div className="ring-3" style={{
        position: "absolute",
        width: 940,
        height: 940,
        borderRadius: "50%",
        border: "1px solid rgba(167,139,250,0.07)",
        pointerEvents: "none",
      }} />

      {/* Glow orbs */}
      <div style={{
        position: "absolute",
        top: "18%",
        left: "14%",
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.28) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "20%",
        right: "12%",
        width: 260,
        height: 260,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }}>

        {/* Icon */}
        <div className="icon-float fade-1" style={{ marginBottom: 28 }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "linear-gradient(135deg, rgba(124,58,237,0.35) 0%, rgba(37,99,235,0.25) 100%)",
            border: "1px solid rgba(167,139,250,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            boxShadow: "0 0 32px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(196,181,253,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>

        {/* Label */}
        <div className="fade-2" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(124,58,237,0.15)",
          border: "1px solid rgba(167,139,250,0.25)",
          borderRadius: 100,
          padding: "5px 16px",
          marginBottom: 22,
        }}>
          <div style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#a78bfa",
            boxShadow: "0 0 8px #a78bfa",
            animation: "pulse-glow 2s ease-in-out infinite",
          }} />
          <span style={{ color: "#c4b5fd", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            In Development
          </span>
        </div>

        {/* Heading */}
        <h1 className="fade-3" style={{
          fontSize: "clamp(42px, 8vw, 80px)",
          fontWeight: 900,
          lineHeight: 1.06,
          letterSpacing: "-0.03em",
          margin: "0 0 18px",
          background: "linear-gradient(135deg, #ffffff 30%, #c4b5fd 65%, #93c5fd 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Coming Soon
        </h1>

        {/* Subtext */}
        <p className="fade-4" style={{
          color: "rgba(255,255,255,0.38)",
          fontSize: "clamp(13px, 2vw, 16px)",
          lineHeight: 1.7,
          maxWidth: 400,
          margin: "0 auto 40px",
        }}>
          Something new is being built here.<br />
          Check back soon.
        </p>

        {/* Divider dots */}
        <div className="fade-4" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 40 }}>
          {["#7c3aed", "#2563eb", "#db2777"].map((c, i) => (
            <div key={i} style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: c,
              boxShadow: `0 0 8px ${c}`,
              animation: `pulse-glow ${1.8 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>

        {/* Back button */}
        <Link href="/" className="back-btn fade-5" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "rgba(255,255,255,0.75)",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          textDecoration: "none",
          padding: "9px 20px",
          borderRadius: 100,
          transition: "all 0.2s ease",
        }}>
          <span className="back-arrow">←</span>
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
