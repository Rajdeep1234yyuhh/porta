/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, Phone, MessageCircle, X, Info } from "lucide-react";

const PHONE = "8638752315"; // keep in sync with Navbar.jsx

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface QuickFixFABProps {
  isDarkMode: boolean;
  scrollToSection: (id: string) => void;
}

const QuickFixFAB: React.FC<QuickFixFABProps> = ({
  isDarkMode,
  scrollToSection,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside tap
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  const optionBase =
    "flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-semibold text-white text-sm shadow-lg whitespace-nowrap";

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3"
    >
      {/* Options — stacked above FAB, pop upward with stagger */}
      {open && (
        <div className="flex flex-col items-end gap-2.5">
          {/* WhatsApp — farthest from button, last to appear */}
          <a
            href={`https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20tech%20help%20with%3A%20`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              animation:
                "popUpFromButton 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
              animationDelay: "160ms",
            }}
            className={`${optionBase} bg-[#25D366] hover:bg-[#1ebe5d] transition-colors`}
          >
            <WhatsAppIcon />
            WhatsApp
          </a>

          {/* Call */}
          <a
            href={`tel:+${PHONE}`}
            onClick={() => setOpen(false)}
            style={{
              animation:
                "popUpFromButton 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
              animationDelay: "80ms",
            }}
            className={`${optionBase} bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-colors`}
          >
            <Phone className="w-5 h-5" />
            Call Me
          </a>

          {/* Message — closest to button, appears first */}
          <button
            onClick={() => {
              scrollToSection("contact");
              setOpen(false);
            }}
            style={{
              animation:
                "popUpFromButton 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
              animationDelay: "0ms",
            }}
            className={`${optionBase} bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-colors`}
          >
            <MessageCircle className="w-5 h-5" />
            Message
          </button>

          <button
            onClick={() => {
              scrollToSection("quick-solutions");
              setOpen(false);
            }}
            style={{
              animation:
                "popUpFromButton 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
              animationDelay: "0ms",
            }}
            className={`${optionBase} bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-colors`}
          >
            <Info className="w-5 h-5" />
            Details
          </button>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300
          bg-gradient-to-br from-green-500 to-emerald-600
          hover:from-green-600 hover:to-emerald-700
          hover:scale-110 active:scale-95
          ${open ? "rotate-45" : ""}
        `}
        style={{ boxShadow: "0 4px 24px 0 rgba(16,185,129,0.45)" }}
        aria-label="Quick Fix"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <span className="relative flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" fill="white" />
            {/* Pulsing ring */}
            <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-40 animate-ping" />
          </span>
        )}
      </button>
    </div>
  );
};

export default QuickFixFAB;
