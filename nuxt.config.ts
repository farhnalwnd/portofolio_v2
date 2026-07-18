// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@nuxt/icon'
  ],
  icon: {
    serverBundle: {
      collections: ['lucide', 'logos', 'simple-icons', 'mdi']
    },
    clientBundle: {
      scan: true
    }
  },
  googleFonts: {
    families: {
      'Space+Grotesk': [300, 400, 500, 600, 700, 900]
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true
  }
})
