import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  thumbnail: z.string().url('Thumbnail must be a valid URL'),
  shortDescription: z.string().min(1, 'Short description is required'),
  problem: z.string().min(1, 'Problem description is required'),
  solution: z.string().min(1, 'Solution description is required'),
  outcome: z.string().min(1, 'Outcome description is required'),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published']).default('draft'),
});

export const projectUpdateSchema = projectSchema.partial();

export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  coverImage: z.string().url('Cover image must be a valid URL'),
  content: z.string().min(1, 'Content is required'),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']).default('draft'),
});

export const blogUpdateSchema = blogSchema.partial();
