// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://pushpendra.dev',
  integrations: [react()],
  // Read mode ships zero JavaScript; only the Play-mode island loads React.
});
