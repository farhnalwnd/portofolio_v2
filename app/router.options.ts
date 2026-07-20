import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()

    if (savedPosition) {
      return savedPosition
    }

    const cleanPath = (p: string) => p.replace(/^\/(en|id)/, '').replace(/\/$/, '') || '/'
    const isLocaleSwitch = cleanPath(to.path) === cleanPath(from.path)

    if (isLocaleSwitch) {
      return false
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:finish', () => {
        resolve({ top: 0, left: 0 })
      })
    })
  }
}
