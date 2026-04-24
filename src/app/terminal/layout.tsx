import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminal — Rajdeep Kotoky",
  description: "Interactive portfolio terminal. Type 'help' to explore commands.",
};

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
