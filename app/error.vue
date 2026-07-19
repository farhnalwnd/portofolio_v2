<template>
  <div class="min-h-screen bg-brutal-cream text-brutal-black flex flex-col justify-between selection:bg-brutal-yellow selection:text-brutal-black font-sans relative overflow-hidden">
    <TheNavbar />

    <main class="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-16 flex-grow flex items-center justify-center">
      <BrutalistCard color="white" class="p-8 md:p-12 text-center w-full relative">
        <div class="inline-block bg-brutal-red text-white font-black text-6xl md:text-8xl px-6 py-2 border-4 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 transform -rotate-2">
          {{ statusCode }}
        </div>

        <h1 class="text-3xl md:text-5xl font-black uppercase tracking-tight text-brutal-black mb-4">
          {{ errorTitle }}
        </h1>

        <p class="text-lg md:text-xl font-bold uppercase tracking-tight text-zinc-700 max-w-xl mx-auto mb-8">
          {{ errorDescription }}
        </p>

        <div class="flex justify-center">
          <BrutalistBtn color="yellow" size="lg" @click="handleError">
            {{ $t('error.back_home') }}
          </BrutalistBtn>
        </div>
      </BrutalistCard>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const statusCode = computed(() => props.error?.statusCode || 500)

const errorTitle = computed(() => {
  if (statusCode.value === 404) return t('error.title_404')
  if (statusCode.value === 500) return t('error.title_500')
  return t('error.title_generic')
})

const errorDescription = computed(() => {
  if (statusCode.value === 404) return t('error.desc_404')
  if (statusCode.value === 500) return t('error.desc_500')
  return props.error?.statusMessage || t('error.desc_generic')
})

useSeoMeta({
  title: computed(() => `${statusCode.value} - ${t('error.seo_title')}`),
  ogTitle: computed(() => `${statusCode.value} - ${t('error.seo_title')} | Farhan Alwanda`)
})

const handleError = () => clearError({ redirect: localePath('/') })
</script>
