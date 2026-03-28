// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://noz915.github.io',
  base: '/travel/',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW'],
  },
});
