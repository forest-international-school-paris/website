import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Forest International School'),
    image: z.string().optional(),
    lang: z.literal('en'),
    // 'guide' = evergreen SEO piece, 'news' = announcement/recap — selects the lint
    // profile in .claude/skills/school-seo-content/references/article-checklist.md
    type: z.enum(['guide', 'news']).default('news'),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    lint_allow: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
