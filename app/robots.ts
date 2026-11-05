import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://docs.fusioncol.com/sitemap.xml",
    host: "https://docs.fusioncol.com",
  };
}
