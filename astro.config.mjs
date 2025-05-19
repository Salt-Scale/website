// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import partytown from '@astrojs/partytown';

import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), partytown(), sitemap()],
  adapter: vercel()
});