import type { MetadataRoute } from "next";
import { getContent } from "@/lib/cms";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
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
    ...content.services.map((service) => ({
      url: absoluteUrl(`/layanan/${service.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
