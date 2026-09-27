import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="min-h-dvh bg-slate-50 px-4 py-10 sm:py-16 text-slate-900"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      <div className="mx-auto w-full max-w-2xl">{children}</div>
    </main>
  );
}
