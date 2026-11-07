import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const autores = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/autores' }),
  schema: z.object({
    nombre: z.string(),
    cargo: z.string().optional(),
    foto: z.string().optional(),
  }),
});

const columnas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/columnas' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: reference('autores'),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const documentos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/documentos' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string().default('General'),
    description: z.string(),
    file: z.string(),
    author: reference('autores').optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { autores, columnas, documentos };
