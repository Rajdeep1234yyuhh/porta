import type { MetadataRoute } from "next";
import { allProjects } from "./data/projects";
import { allServices } from "./data/services";
import { absoluteUrl } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ) => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority });

  return [
    entry("/", 1),
    entry("/projects", 0.9),
    entry("/services", 0.9),
    ...allServices.map((s) => entry(`/services/${s.slug}`, 0.8)),
    ...allProjects.map((p) => entry(`/projects/${p.slug}`, 0.7)),
    entry("/zoom", 0.4, "yearly"),
    entry("/cube", 0.4, "yearly"),
    entry("/terminal", 0.3, "yearly"),
  ];
}
