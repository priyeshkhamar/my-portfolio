import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...caseStudies.map((c) => ({
      url: `${site.url}/projects/${c.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
