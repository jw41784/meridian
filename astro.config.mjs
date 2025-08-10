import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://jw41784.github.io',
  base: '/meridian',
  integrations: [tailwind(), mdx(), sitemap(), react()],
  output: 'static',
  build: {
    assets: 'astro',
  },
});
