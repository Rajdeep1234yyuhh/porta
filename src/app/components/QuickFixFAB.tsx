"use client";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { SpeedDial } from "primereact/speeddial";

const PHONE = "8638752315";

interface QuickFixFABProps {
  isDarkMode: boolean;
  scrollToSection: (id: string) => void;
}

const QuickFixFAB: React.FC<QuickFixFABProps> = ({ scrollToSection }) => {
  const items = [
    {
      label: "WhatsApp",
      icon: "pi pi-whatsapp",
      command: () => {
        window.open(
          `https://wa.me/${PHONE}?text=Hi%20Rajdeep%2C%20I%20need%20quick%20tech%20help%20with%3A%20`,
          "_blank"
        );
      },
    },
    {
      label: "Call Me",
      icon: "pi pi-phone",
      command: () => { window.location.href = `tel:+${PHONE}`; },
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
      `}</style>

      <div className="quick-fix-fab fixed bottom-10 right-8 z-50">
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
