import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const site = process.env.SITE ?? 'https://go.sagardash.me';
const base = process.env.BASE_PATH ?? '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [tailwind()],
});
