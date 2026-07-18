<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Farhan Alwanda` : 'Farhan Alwanda - Full-Stack Developer & AI Engineer'
  },
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})

useSeoMeta({
  description: 'Portfolio of Farhan Alwanda, a Full-Stack Developer & AI Engineer crafting intelligent web applications and IoT solutions.',
  ogTitle: 'Farhan Alwanda - Full-Stack Developer & AI Engineer',
  ogDescription: 'I craft intelligent web applications and IoT solutions. Minimal fluff, raw performance, and bold aesthetics.',
  ogImage: '/og-farhan-alwanda.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Farhan Alwanda - Full-Stack Developer & AI Engineer',
  twitterDescription: 'I craft intelligent web applications and IoT solutions.',
  twitterImage: '/og-farhan-alwanda.png'
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
