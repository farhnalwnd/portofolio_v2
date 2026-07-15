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
      schema: baseSchema
    }),
    certificates: defineCollection({
      type: 'page',
      source: 'certificates/*.md',
      schema: baseSchema
    })
  }
})
