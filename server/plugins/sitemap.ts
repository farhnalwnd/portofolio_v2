import { defineNitroPlugin } from 'nitropack/runtime'

export default defineNitroPlugin((nitroApp) => {
  // @ts-ignore
  nitroApp.hooks.hook('sitemap:input', async (ctx) => {
    const projects = await queryCollection(ctx.event, 'projects').all()
    for (const p of projects) {
      const slug = p.path.split('/').pop()?.replace('.md', '') || ''
      ctx.urls.push({
        loc: `/projects/${slug}/detail`,
        changefreq: 'monthly',
        priority: 0.8
      })
    }
  })
})
