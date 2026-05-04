import { defineCollection, z } from 'astro:content';

const places = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    category: z.enum(['cenotes', 'lagunas', 'ruinas', 'experiencias', 'parques', 'nightlife']),
    emoji: z.string(),
    distance: z.string(),
    price: z.string(),
    hours: z.string(),
    highlight: z.string(),
    highlightEn: z.string(),
    features: z.array(z.string()).optional(),
    featuresEn: z.array(z.string()).optional(),
    order: z.number(),
  }),
});

export const collections = { places };
