// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import partytown from "@astrojs/partytown";

import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
const site = process.env.SITE_URL || "https://example.com";

export default defineConfig({
  site,
  integrations: [react(), partytown(), sitemap()],
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },
});
