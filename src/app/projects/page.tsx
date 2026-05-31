import { Suspense } from "react";
import ProjectsClient from "../components/ProjectsClient";

export default function ProjectShowcase() {
  return (
    <Suspense>
      <ProjectsClient />
    </Suspense>
  );
}
