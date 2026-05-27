import { Suspense } from "react";
import ProjectsClient from "../components/ProjectsClient";

export default function CaseStudiesPage() {
  return (
    <Suspense>
      <ProjectsClient />
    </Suspense>
  );
}
