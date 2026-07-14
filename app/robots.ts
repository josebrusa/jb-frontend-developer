import type { MetadataRoute } from "next";

import { siteConfig } from "../src/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/*.pdf$"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
