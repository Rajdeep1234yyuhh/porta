import CubePageClient from "../components/CubePageClient";
import ComingSoonClient from "../components/ComingSoonClient";

// ← flip to true to show the Three.js cube, false for "Coming Soon"
const SHOW_CUBE = true;

export default function CubePage() {
  return SHOW_CUBE ? <CubePageClient /> : <ComingSoonClient />;
}
