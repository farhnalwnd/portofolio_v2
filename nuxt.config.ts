// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  sourcemap: { client: false, server: false },
  vite: {
    build: {
      modulePreload: {
        polyfill: false
      }
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/history', '/projects', '/skills', '/certificates', '/catch-me']
    }
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@vercel/analytics',
    '@vercel/speed-insights'
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
