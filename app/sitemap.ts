import type { MetadataRoute } from "next";

// Required so the route can be emitted by `next build` with output: "export".
export const dynamic = "force-static";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
