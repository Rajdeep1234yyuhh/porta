import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Terminal Portfolio",
  description:
    "Explore Rajdeep Kotoky's portfolio from a command line: type 'help' to browse projects, skills, services and contact details in this interactive terminal.",
  path: "/terminal",
});

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="sr-only">Rajdeep Kotoky: interactive terminal portfolio</h1>
      {children}
    </>
  );
}
