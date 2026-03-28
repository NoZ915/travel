import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const trips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trips' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    destination: z.string(),
    country: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cities: z.array(
      z.object({
        name: z.string(),
        label: z.string().optional(),
        lat: z.number(),
        lng: z.number(),
        note: z.string().optional(),
      })
    ).optional(),
  }),
});

export const collections = { trips };
