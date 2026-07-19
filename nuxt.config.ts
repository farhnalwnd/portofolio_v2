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
    },
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit'
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    }
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Farhan Alwanda - Portfolio'
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/history', '/projects', '/skills', '/certificates', '/catch-me', '/robots.txt', '/sitemap.xml']
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
    '@vercel/speed-insights',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
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
      'Space+Grotesk': [400, 700]
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true
  }
})
