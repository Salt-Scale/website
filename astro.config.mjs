// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// `site` drives canonical URLs, JSON-LD, sitemap, OG tags.
// In Vercel production we hard-fail if SITE_URL is unset so we never ship
// `https://example.com` canonicals. In previews / local we fall back to the
// canonical domain so structured data still resolves to a real asset.
const isVercelProd = process.env.VERCEL_ENV === "production";
const SITE_URL = process.env.SITE_URL || "https://saltandscale.consulting";

if (isVercelProd && !process.env.SITE_URL) {
  throw new Error(
    "SITE_URL env var is required for production builds (used in canonicals, sitemap, JSON-LD).",
  );
}

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },
});
