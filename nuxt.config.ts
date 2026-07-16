// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    web3formsAccessKey: '' // mapped from NUXT_WEB3FORMS_ACCESS_KEY env
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@nuxt/icon'
  ],
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
