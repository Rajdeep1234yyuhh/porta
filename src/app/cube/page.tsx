import CubePageClient from "../components/CubePageClient";
import ComingSoonClient from "../components/ComingSoonClient";
import { pageMetadata } from "../lib/seo";

// ← flip to true to show the Three.js cube, false for "Coming Soon"
const SHOW_CUBE = true;

export const metadata = pageMetadata({
  title: "Interactive 3D Cube Portfolio",
  description:
    "Rotate an interactive 3D cube to explore Rajdeep Kotoky's skills, projects and contact details. Built with React Three Fiber and Three.js.",
  path: "/cube",
});

export default function CubePage() {
  return (
    <>
      <h1 className="sr-only">Rajdeep Kotoky: interactive 3D cube portfolio</h1>
      {SHOW_CUBE ? <CubePageClient /> : <ComingSoonClient />}
    </>
  );
}
