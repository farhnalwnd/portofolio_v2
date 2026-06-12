<script setup>
import { onMounted, ref, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap'
import { Icon } from '@iconify/vue'
import { projects } from '../data/projects.js'
import { useGsapStore } from '../stores/gsap'

const route = useRoute()
const router = useRouter()

const gsapStore = useGsapStore()
let ctx
const containerRef = ref(null)
const imageError = ref(false)

const project = computed(() => {
  return projects.find((p) => p.slug === route.params.slug)
})

const techColors = [
  { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
  { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
  { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' },
  { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
]

onMounted(() => {
  if (!project.value) {
    router.push('/projects')
    return
  }

  ctx = gsap.context(() => {
    const tl = gsap.timeline()

    tl.from('.back-button', {
      opacity: 0,
      x: -20,
      duration: 0.6,
      ease: 'power3.out',
    })
      .from(
        '.project-hero',
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3',
      )
      .from(
        '.project-section',
        {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4',
      )

    gsapStore.setActiveTimeline(tl)
  }, containerRef.value)
})

onUnmounted(() => {
  gsapStore.setActiveTimeline(null)
  ctx?.revert()
})
</script>

<template>
  <div v-if="project" ref="containerRef" class="min-h-screen pt-28 pb-32 md:pb-48 px-4">
    <div class="max-w-full mx-auto">
      <button
        @click="router.push('/projects')"
        class="back-button inline-flex items-center gap-2 px-5 py-2.5 mb-16 text-text-custom bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/20 rounded-full hover:bg-zinc-900/90 hover:text-blue-400 hover:border-zinc-900/90 dark:hover:bg-white/90 dark:hover:text-accent-custom dark:hover:border-white/90 transition-all duration-300 group font-medium shadow-md"
      >
        <Icon
          icon="lucide:arrow-left"
          class="text-xl transition-transform group-hover:-translate-x-1"
        />
        <span>Kembali ke Projects</span>
      </button>

      <div class="project-hero mb-16 md:mb-24 text-center flex flex-col items-center">
        <div class="flex flex-wrap items-center justify-center gap-3 mb-6">
          <span
            class="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-accent-custom/10 text-accent-custom border border-accent-custom/20 rounded-full"
          >
            {{ project.category }}
          </span>
          <span
            v-if="project.featured"
            class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full"
          >
            <Icon icon="lucide:star" class="text-sm" />
            Featured
          </span>
          <span class="text-secondary-custom text-sm">{{ project.year }}</span>
        </div>

        <h1 class="text-5xl md:text-7xl font-bold text-text-custom mb-6 font-archivo leading-tight">
          {{ project.title }}
        </h1>

        <p class="text-xl md:text-2xl text-secondary-custom leading-relaxed max-w-3xl">
          {{ project.description }}
        </p>
      </div>

      <div class="project-section mb-16 md:mb-24">
        <h2 class="text-2xl md:text-3xl font-bold text-text-custom mb-8 font-archivo text-center">
          Tentang Project
        </h2>
        <div class="flex flex-col lg:flex-row gap-8 items-stretch">
          <div
            class="w-full lg:w-1/2 rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative aspect-video flex items-center justify-center min-h-[220px]"
          >
            <img
              v-if="project.thumbnail && !imageError"
              :src="project.thumbnail"
              :alt="project.title"
              class="w-full h-full object-cover"
              @error="imageError = true"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-linear-to-br from-accent-custom/20 via-purple-500/10 to-accent-custom/5 text-secondary-custom"
            >
              <Icon icon="lucide:image" class="text-7xl opacity-30" />
            </div>
          </div>
          <div
            class="flex-1 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl flex items-center"
          >
            <p class="text-secondary-custom text-lg leading-relaxed">
              {{ project.fullDescription }}
            </p>
          </div>
        </div>
      </div>

      <div class="project-section mb-16 md:mb-24">
        <h2 class="text-2xl md:text-3xl font-bold text-text-custom mb-8 font-archivo text-center">
          Tech Stack
        </h2>
        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="(tech, index) in project.techStack"
            :key="tech"
            :class="`px-5 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 ${techColors[index % techColors.length].bg} ${techColors[index % techColors.length].border}`"
          >
            <span :class="`font-semibold ${techColors[index % techColors.length].text}`">{{
              tech
            }}</span>
          </div>
        </div>
      </div>

      <div v-if="project.links.github || project.links.demo" class="project-section mb-20">
        <h2 class="text-2xl md:text-3xl font-bold text-text-custom mb-8 font-archivo text-center">
          Links & Resources
        </h2>
        <div class="flex flex-wrap justify-center gap-6">
          <a
            v-if="project.links.github"
            :href="project.links.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-8 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl hover:bg-zinc-900 hover:border-accent-custom/50 hover:scale-[1.02] transition-all duration-300 shadow-xl group"
          >
            <Icon
              icon="lucide:github"
              class="text-2xl text-white group-hover:text-accent-custom transition-colors"
            />
            <span class="font-semibold text-white group-hover:text-accent-custom transition-colors"
              >View on GitHub</span
            >
          </a>
          <a
            v-if="project.links.demo"
            :href="project.links.demo"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-8 py-4 bg-accent-custom text-white rounded-2xl hover:scale-[1.02] transition-transform shadow-xl shadow-accent-custom/30 font-semibold"
          >
            <Icon icon="lucide:external-link" class="text-2xl" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
