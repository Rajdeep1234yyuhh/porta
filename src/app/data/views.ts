// The versions ("views") of the portfolio. Each one links to the others
// through the views menu (components/ViewsMenu.tsx), the home page's view
// switcher, the terminal's `views` command and the store's footer.

export type ViewId = "classic" | "cube" | "zoom" | "terminal" | "store" | "minimal";

export type PortfolioView = {
  id: ViewId;
  href: string;
  label: string;
  blurb: string;
  /** Neon accent; the switchers' glowing border (globals.css) uses these too */
  color: string;
  /** Loads three.js, so links to it don't prefetch */
  heavy?: boolean;
};

export const PORTFOLIO_VIEWS: PortfolioView[] = [
  { id: "classic", href: "/", label: "Classic", blurb: "The full portfolio, slide by slide", color: "#a78bfa" },
  { id: "cube", href: "/cube", label: "3D Cube", blurb: "Spin a cube of skills and projects", color: "#f472b6", heavy: true },
  { id: "zoom", href: "/zoom", label: "3D Journey", blurb: "Walk a hall of 3D rooms", color: "#38bdf8", heavy: true },
  { id: "terminal", href: "/terminal", label: "Terminal", blurb: "Explore it by typing commands", color: "#34d399" },
  { id: "store", href: "/ecom", label: "Store", blurb: "Browse my work like a shop", color: "#fbbf24" },
  { id: "minimal", href: "/minimal", label: "Minimal", blurb: "Everything on one clean page", color: "#e4e4e7" },
];
