import ZoomClient from "./ZoomClient";
import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "3D Portfolio Experience",
  description:
    "An interactive 3D scroll journey through Rajdeep Kotoky's projects, testimonials, skills and services, built with React Three Fiber and Three.js.",
  path: "/zoom",
});

export default function ZoomPage() {
  return (
    <>
      <h1 className="sr-only">Rajdeep Kotoky: 3D portfolio experience</h1>
      <ZoomClient />
    </>
  );
}
