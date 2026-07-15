import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const baseSchema = z.object({
  order: z.number().default(0)
})

export default defineContentConfig({
  collections: {
    history: defineCollection({
      type: 'page',
      source: 'history/*.md',
      schema: baseSchema
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: baseSchema.extend({
        featured: z.boolean().default(false),
        tech: z.array(z.string()).default([]),
        links: z.object({
          github: z.string().nullable().optional(),
          demo: z.string().nullable().optional()
        }).optional()
      })
    }),
    certificates: defineCollection({
      type: 'page',
      source: 'certificates/*.md',
      schema: baseSchema
    }),
    profile: defineCollection({
      type: 'page',
      source: 'profile/*.md'
    }),
    skills: defineCollection({
      type: 'page',
      source: 'skills/*.md'
    })
  }
})
