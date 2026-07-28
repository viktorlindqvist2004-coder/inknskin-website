import type { MetadataRoute } from "next";

// Required so the route can be emitted by `next build` with output: "export".
export const dynamic = "force-static";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
