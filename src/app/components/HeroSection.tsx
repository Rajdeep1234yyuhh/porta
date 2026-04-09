"use client";

import React from "react";
import { ExternalLink, Mail, Phone, FileText } from "lucide-react";
import { SiNextdotjs, SiShopify, SiPython } from "react-icons/si";

const PHONE = "8638752315";

interface HeroSectionProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
}

const TYPING_PHRASES = ["AI/ML Engineer", "Web Developer", "Software Developer", "Shopify Developer"];

const HeroSection = ({ isDarkMode, scrollToSection }: HeroSectionProps) => {
  const [projectCount, setProjectCount] = React.useState(0);
  const [yearsCount, setYearsCount] = React.useState(0);
  const [satisfactionCount, setSatisfactionCount] = React.useState(0);
  const [contactOpen, setContactOpen] = React.useState(false);
  const contactRef = React.useRef<HTMLDivElement>(null);

  const [displayedText, setDisplayedText] = React.useState("");
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  React.useEffect(() => {
    const current = TYPING_PHRASES[phraseIndex];
    let delay: number;
    if (!isDeleting && charIndex < current.length) delay = 60;
    else if (!isDeleting && charIndex === current.length) delay = 1800;
    else if (isDeleting && charIndex > 0) delay = 35;
    else delay = 300;

    const t = setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setDisplayedText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (!isDeleting && charIndex === current.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex > 0) {
        setDisplayedText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % TYPING_PHRASES.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIndex, isDeleting, phraseIndex]);

  React.useEffect(() => {
    const pi = setInterval(() => setProjectCount((p) => { if (p >= 50) { clearInterval(pi); return 50; } return p + 1; }), 30);
    const yi = setInterval(() => setYearsCount((p) => { if (p >= 5) { clearInterval(yi); return 5; } return p + 1; }), 300);
    const si = setInterval(() => setSatisfactionCount((p) => { if (p >= 100) { clearInterval(si); return 100; } return p + 2; }), 20);
    return () => { clearInterval(pi); clearInterval(yi); clearInterval(si); };
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes float { 0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8px) rotate(-3deg)} }
        @keyframes float-reverse { 0%,100%{transform:translateY(0) rotate(2deg)}50%{transform:translateY(-10px) rotate(2deg)} }
        @keyframes float-slow { 0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-6px) rotate(-2deg)} }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }
        .shimmer-text {
          background: linear-gradient(90deg,#2563eb 0%,#7c3aed 30%,#a78bfa 50%,#7c3aed 70%,#2563eb 100%);
          background-size: 200% auto; background-clip: text;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { opacity:0; animation:fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
        .cursor-blink { display:inline-block;width:2px;margin-left:2px;background:currentColor;animation:blink 0.9s step-end infinite;vertical-align:text-bottom; }
        @keyframes popUpFromButton { from{opacity:0;transform:translateY(8px) scale(0.92)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>

      <section
        id="about"
        className={`h-full flex items-center overflow-hidden relative ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
      >
        {/* Background */}
        <div className={`absolute inset-0 ${isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-slate-50 to-blue-50"}`} />
        <div className={`absolute top-10 right-10 w-56 h-56 rounded-full blur-3xl opacity-30 animate-pulse ${isDarkMode ? "bg-blue-500/20" : "bg-blue-100"}`} />
        <div className={`absolute bottom-10 left-10 w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse delay-700 ${isDarkMode ? "bg-purple-500/20" : "bg-purple-100"}`} />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center">

            {/* Left */}
            <div className={`space-y-4 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
              {/* Mobile-only photo */}
              <div className="flex md:hidden justify-center mb-2">
                <div className="relative">
                  <div className={`rounded-2xl p-2 shadow-xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                    <img src="DP.jpg" alt="Rajdeep" className="w-20 h-24 object-cover rounded-xl" />
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold shadow flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    Available
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="font-bold leading-tight">
                  <span style={{ animationDelay: "0ms" }} className={`fade-up block text-xl sm:text-2xl font-semibold mb-0.5 ${isDarkMode ? "text-gray-300" : "text-slate-700"}`}>
                    I can be your
                  </span>
                  <span style={{ animationDelay: "150ms" }} className="fade-up block shimmer-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    {displayedText}
                    <span className={`cursor-blink ${isDarkMode ? "bg-purple-400" : "bg-blue-600"}`} />
                  </span>
                </h1>
                <p style={{ animationDelay: "300ms" }} className={`fade-up text-sm leading-relaxed max-w-lg ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>
                  I craft exceptional digital experiences using modern technologies. Specializing in Next.js, React, and AI-powered web solutions that drive results.
                </p>
              </div>

              {/* Stats */}
              <div style={{ animationDelay: "450ms" }} className="fade-up flex items-center space-x-6">
                {[
                  { val: `${projectCount}+`, label: "Projects" },
                  { val: `${yearsCount}+`, label: "Years Exp" },
                  { val: `${satisfactionCount}%`, label: "Satisfaction" },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{val}</div>
                    <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>{label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{ animationDelay: "600ms" }} className="fade-up flex flex-wrap gap-3">
                <button
                  onClick={() => scrollToSection("projects")}
                  className={`group px-5 py-2.5 rounded-md transition-all duration-200 font-medium flex items-center gap-2 text-sm active:scale-95 ${isDarkMode ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-800"}`}
                >
                  View My Work
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group px-5 py-2.5 rounded-md transition-all duration-200 font-medium border-2 flex items-center gap-2 text-sm ${isDarkMode ? "border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10" : "border-emerald-600/30 text-emerald-700 hover:bg-emerald-50"}`}
                >
                  Resume
                  <FileText className="w-3.5 h-3.5 group-hover:-translate-y-px transition-transform" />
                </a>
                <div className="relative" ref={contactRef}>
                  {contactOpen && (
                    <div className="absolute bottom-full mb-2 left-0 flex flex-col gap-2">
                      <a
                        href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20would%20like%20to%20get%20in%20touch%21`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ animation: "popUpFromButton 0.32s cubic-bezier(0.34,1.56,0.64,1) both", animationDelay: "60ms" }}
                        className="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-xs text-white bg-[#25D366] hover:bg-[#1ebe5d] shadow-md whitespace-nowrap"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        WhatsApp
                      </a>
                      <a
                        href={`tel:+91${PHONE}`}
                        style={{ animation: "popUpFromButton 0.32s cubic-bezier(0.34,1.56,0.64,1) both", animationDelay: "0ms" }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-xs shadow-md whitespace-nowrap ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-slate-800 border border-slate-200"}`}
                      >
                        <Phone className="w-3.5 h-3.5 text-blue-500" />
                        Call Me
                      </a>
                    </div>
                  )}
                  <button
                    onClick={() => setContactOpen((o) => !o)}
                    className={`group px-5 py-2.5 rounded-md transition-all duration-200 font-medium border-2 flex items-center gap-2 text-sm ${isDarkMode ? "border-purple-500/50 text-purple-300 hover:bg-purple-500/10" : "border-purple-600/30 text-purple-700 hover:bg-purple-50"}`}
                  >
                    Get In Touch
                    <Mail className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right — Photo + floating tech cards */}
            <div className="hidden md:flex justify-center items-center">
              <div className="relative">
                <div className={`relative rounded-2xl p-2.5 shadow-2xl transition-all duration-500 hover:scale-[1.02] ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                  <img
                    src="DP.jpg"
                    alt="Professional Photo"
                    className="w-44 h-52 lg:w-56 lg:h-64 object-cover rounded-xl"
                  />
                  <div className="absolute -top-2.5 -right-2.5 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    Available
                  </div>
                </div>

                {/* Floating cards */}
                <div className={`absolute -top-5 -left-5 rounded-xl p-2.5 shadow-lg border animate-float cursor-pointer transition-all duration-300 hover:scale-105 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-100"}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center"><SiNextdotjs size={14} color="#ffffff" /></div>
                    <div>
                      <div className={`text-xs font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Next.js</div>
                      <div className={`text-[10px] ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>React Framework</div>
                    </div>
                  </div>
                </div>

                <div className={`absolute top-10 -right-7 rounded-xl p-2.5 shadow-lg border animate-float-reverse cursor-pointer transition-all duration-300 hover:scale-105 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-100"}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#96BF48] rounded-lg flex items-center justify-center"><SiShopify size={14} color="#ffffff" /></div>
                    <div>
                      <div className={`text-xs font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Shopify</div>
                      <div className={`text-[10px] ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>E-commerce</div>
                    </div>
                  </div>
                </div>

                <div className={`absolute bottom-6 -left-7 rounded-xl p-2.5 shadow-lg border animate-float-slow cursor-pointer transition-all duration-300 hover:scale-105 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-100"}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#1e3a5f] rounded-lg flex items-center justify-center"><SiPython size={14} color="#FFD343" /></div>
                    <div>
                      <div className={`text-xs font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`}>AI/ML</div>
                      <div className={`text-[10px] ${isDarkMode ? "text-gray-400" : "text-slate-500"}`}>Python & TensorFlow</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-14 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-10 rotate-12" />
                <div className="absolute -bottom-6 -left-14 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-10" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
export default HeroSection;
