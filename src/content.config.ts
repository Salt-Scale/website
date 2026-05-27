import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const insights = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    datePublished: z.date(),
    dateModified: z.date().optional(),
    author: z.string().default('Gabriel Rosales'),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
    takeaways: z.array(z.string()).optional(),
  }),
});

export const collections = { insights };
