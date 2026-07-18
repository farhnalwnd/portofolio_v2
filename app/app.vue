<script setup lang="ts">
import { computed } from 'vue'

const config = useRuntimeConfig()
const route = useRoute()

const canonicalUrl = computed(() => {
  const base = (config.public.siteUrl || 'https://farhanalwanda.dev').replace(/\/$/, '')
  return `${base}${route.path}`
})

const ogImageUrl = computed(() => {
  const base = (config.public.siteUrl || 'https://farhanalwanda.dev').replace(/\/$/, '')
  return `${base}/og-farhan-alwanda.png`
})

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Farhan Alwanda` : 'Farhan Alwanda - Full-Stack Developer & AI Engineer'
  },
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'canonical', href: canonicalUrl }
  ]
})

useSeoMeta({
  description: 'Portfolio of Farhan Alwanda, a Full-Stack Developer & AI Engineer crafting intelligent web applications and IoT solutions.',
  ogTitle: 'Farhan Alwanda - Full-Stack Developer & AI Engineer',
  ogDescription: 'I craft intelligent web applications and IoT solutions. Minimal fluff, raw performance, and bold aesthetics.',
  ogImage: ogImageUrl,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogSiteName: 'Farhan Alwanda Portfolio',
  ogUrl: canonicalUrl,
  twitterCard: 'summary_large_image',
  twitterTitle: 'Farhan Alwanda - Full-Stack Developer & AI Engineer',
  twitterDescription: 'I craft intelligent web applications and IoT solutions.',
  twitterImage: ogImageUrl
})
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans antialiased bg-brutal-cream text-brutal-black">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
