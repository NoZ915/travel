// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/travel-claude-gpt/',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW'],
  },
});
