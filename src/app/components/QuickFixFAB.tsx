"use client";

import { CONTACT } from "../data/site";
import { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { SpeedDial } from "primereact/speeddial";

const HELP_NUDGE_INITIAL_DELAY_MS = 1200;
const HELP_NUDGE_INTERVAL_MS = 15000;
const HELP_NUDGE_VISIBLE_MS = 6000;

interface QuickFixFABProps {
  isDarkMode: boolean;
  scrollToSection: (id: string) => void;
}

const QuickFixFAB = ({ scrollToSection }: QuickFixFABProps) => {
  const [showHelpNudge, setShowHelpNudge] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let hideTimeoutId: number | undefined;

    const hideNudge = () => setShowHelpNudge(false);

    const showNudge = () => {
      if (!mobileQuery.matches) {
        hideNudge();
        return;
      }

      setShowHelpNudge(true);

      if (hideTimeoutId) {
        window.clearTimeout(hideTimeoutId);
      }

      hideTimeoutId = window.setTimeout(hideNudge, HELP_NUDGE_VISIBLE_MS);
    };

    const handleViewportChange = () => {
      if (!mobileQuery.matches) {
        hideNudge();
      }
    };

    const initialTimeoutId = window.setTimeout(
      showNudge,
      HELP_NUDGE_INITIAL_DELAY_MS
    );
    const intervalId = window.setInterval(showNudge, HELP_NUDGE_INTERVAL_MS);
    mobileQuery.addEventListener("change", handleViewportChange);

    return () => {
      window.clearTimeout(initialTimeoutId);
      window.clearInterval(intervalId);

      if (hideTimeoutId) {
        window.clearTimeout(hideTimeoutId);
      }

      mobileQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  const items = [
    {
      label: "WhatsApp",
      icon: "pi pi-whatsapp",
      command: () => {
        window.open(
          `${CONTACT.whatsappHref}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20tech%20help%20with%3A%20`,
          "_blank"
        );
      },
    },
    {
      label: "Call Me",
      icon: "pi pi-phone",
      command: () => { window.location.href = CONTACT.telHref; },
    },
    {
      label: "Message",
      icon: "pi pi-comment",
      command: () => scrollToSection("contact"),
    },
    {
      label: "Details",
      icon: "pi pi-info-circle",
      command: () => scrollToSection("quick-solutions"),
    },
  ];

  return (
    <>
      <style>{`
        .quick-fix-fab .p-speeddial-button.p-button {
          width: 4rem !important;
          height: 4rem !important;
          border-radius: 9999px !important;
          border: 1px solid rgba(255,255,255,0.18) !important;
          background: linear-gradient(145deg, #6b7280, #374151, #1f2937) !important;
          box-shadow:
            0 2px 0 rgba(255,255,255,0.15) inset,
            0 -1px 0 rgba(0,0,0,0.4) inset,
            0 8px 24px rgba(0,0,0,0.5),
            0 2px 6px rgba(0,0,0,0.3) !important;
          transition: transform 0.15s, box-shadow 0.15s, background 0.15s !important;
        }
        .quick-fix-fab .p-speeddial-button.p-button:hover {
          background: linear-gradient(145deg, #9ca3af, #4b5563, #374151) !important;
          transform: scale(1.07) !important;
          box-shadow:
            0 2px 0 rgba(255,255,255,0.2) inset,
            0 -1px 0 rgba(0,0,0,0.4) inset,
            0 12px 32px rgba(0,0,0,0.55),
            0 4px 10px rgba(0,0,0,0.3) !important;
        }
        .quick-fix-fab .p-speeddial-button.p-button:active {
          transform: scale(0.96) !important;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.1) inset,
            0 4px 12px rgba(0,0,0,0.4) !important;
        }
        .quick-fix-fab .p-speeddial-button .p-button-icon {
          font-size: 1.3rem !important;
          color: #f3f4f6 !important;
        }

        .quick-fix-fab .p-speeddial-item .p-speeddial-action {
          width: 2.75rem !important;
          height: 2.75rem !important;
          border-radius: 9999px !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          background: linear-gradient(145deg, #4b5563, #1f2937) !important;
          box-shadow:
            0 2px 0 rgba(255,255,255,0.1) inset,
            0 6px 16px rgba(0,0,0,0.4) !important;
          transition: transform 0.15s, background 0.15s !important;
        }
        .quick-fix-fab .p-speeddial-item .p-speeddial-action:hover {
          background: linear-gradient(145deg, #6b7280, #374151) !important;
          transform: scale(1.12) !important;
        }
        .quick-fix-fab .p-speeddial-action-icon {
          color: #f9fafb !important;
          font-size: 1rem !important;
        }

        .mobile-help-nudge {
          display: none;
        }

        @keyframes mobileHelpNudgePop {
          0% {
            opacity: 0;
            transform: translateX(3rem) scale(0.72);
          }
          68% {
            opacity: 1;
            transform: translateX(-0.16rem) scale(1.04);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @media (max-width: 767px) {
          .mobile-help-nudge {
            align-items: center;
            background: #111827;
            border: 1px solid rgba(255,255,255,0.14);
            border-radius: 9999px;
            bottom: 0.85rem;
            box-shadow:
              0 2px 0 rgba(255,255,255,0.12) inset,
              0 10px 28px rgba(0,0,0,0.35);
            color: #f9fafb;
            display: inline-flex;
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0;
            line-height: 1;
            opacity: 0;
            padding: 0.65rem 0.8rem;
            pointer-events: none;
            position: absolute;
            right: 4.65rem;
            transform: translateX(3rem) scale(0.72);
            transform-origin: right center;
            transition:
              opacity 220ms ease,
              transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
            white-space: nowrap;
            will-change: opacity, transform;
          }

          .mobile-help-nudge::after {
            background: #111827;
            border-right: 1px solid rgba(255,255,255,0.14);
            border-top: 1px solid rgba(255,255,255,0.14);
            content: "";
            height: 0.65rem;
            position: absolute;
            right: -0.33rem;
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
            width: 0.65rem;
          }

          .mobile-help-nudge.is-visible {
            animation: mobileHelpNudgePop 430ms cubic-bezier(0.2, 0.85, 0.2, 1) both;
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>

      <div className="quick-fix-fab fixed bottom-10 right-8 z-50 hidden">
        <span
          aria-hidden="true"
          className={`mobile-help-nudge ${showHelpNudge ? "is-visible" : ""}`}
        >
          Need help?
        </span>
        <SpeedDial
          model={items}
          radius={95}
          type="quarter-circle"
          direction="up-left"
          style={{ right: 0, bottom: 0 }}
          showIcon="pi pi-bolt"
          hideIcon="pi pi-times"
          buttonClassName="p-button-rounded"
          transitionDelay={55}
        />
      </div>
    </>
  );
};

export default QuickFixFAB;
