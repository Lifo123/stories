import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://lifo123.github.io/stories/',
  base: '/stories/',
  integrations: [react(), mdx(), sitemap()],
  outDir: 'build',

  build: {
    assets: 'assets',
  },
  vite: {
    plugins: [tailwindcss()],
   
  },
});