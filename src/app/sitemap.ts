import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { servicePages } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        absoluteUrl("/images/hero-slide-1.png"),
        absoluteUrl("/images/feature-showcase.png"),
      ],
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/layanan"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...servicePages.map((service) => ({
      url: absoluteUrl(`/layanan/${service.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
