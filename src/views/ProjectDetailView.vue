<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap'
import Icon from '../components/icons/Icon.vue'
import IconArrowLeft from '~icons/lucide/arrow-left'
import IconStar from '~icons/lucide/star'
import IconImage from '~icons/lucide/image'
import IconGithub from '~icons/lucide/github'
import IconExternalLink from '~icons/lucide/external-link'
import { projects } from '../data/projects.js'
import { useGsapStore } from '../stores/gsap'
import { getTechIcon, getTechColor } from '../data/techIcons.js'
import { usePageAnimation } from '../composables/usePageAnimation.js'

const route = useRoute()
const router = useRouter()

const gsapStore = useGsapStore()
const imageError = ref(false)

const project = computed(() => {
  return projects.find((p) => p.slug === route.params.slug)
})

if (!project.value) {
  router.push('/projects')
}

const { containerRef } = usePageAnimation(
  () => {
    if (!project.value) return

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
  },
  {
    onCleanup: () => {
      gsapStore.setActiveTimeline(null)
    },
  },
)
</script>

<template>
  <div v-if="project" ref="containerRef" class="min-h-screen pt-28 pb-32 md:pb-48 px-4">
    <div class="max-w-full mx-auto">
      <button
        @click="router.push('/projects')"
        class="back-button inline-flex items-center gap-2 px-5 py-2.5 mb-8 sm:mb-16 text-text-custom bg-white/70 dark:bg-white/5 border border-black/8 dark:border-white/10 rounded-full hover:bg-accent-custom hover:text-white dark:hover:bg-accent-custom dark:hover:text-white hover:border-accent-custom dark:hover:border-accent-custom transition-all duration-300 ease-out group font-medium shadow-lg dark:shadow-2xl cursor-pointer"
      >
        <IconArrowLeft class="text-xl transition-transform group-hover:-translate-x-1" />
        <span>Kembali ke Projects</span>
      </button>

      <div class="project-hero pt-4 pb-8 md:pb-20 md:pt-14 text-center flex flex-col items-center">
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
            <IconStar class="text-sm" />
            Featured
          </span>
          <span class="text-secondary-custom text-sm">{{ project.year }}</span>
        </div>

        <h1
          class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-text-custom mb-4 sm:mb-6 font-archivo leading-tight"
        >
          {{ project.title }}
        </h1>

        <p
          class="text-base sm:text-lg md:text-xl lg:text-2xl text-secondary-custom leading-relaxed max-w-3xl px-4"
        >
          {{ project.description }}
        </p>
      </div>

      <div class="project-section pb-10 md:pb-16">
        <div class="flex flex-col lg:flex-row gap-8 items-stretch px-4">
          <div
            class="w-full lg:w-1/2 rounded-2xl bg-white/70 dark:bg-white/5 border border-black/8 dark:border-white/10 overflow-hidden relative aspect-video flex items-center justify-center min-h-55 shadow-lg dark:shadow-2xl"
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
              <IconImage class="text-7xl opacity-30" />
            </div>
          </div>
          <div
            class="flex-1 p-6 sm:p-8 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/8 dark:border-white/10 shadow-lg dark:shadow-2xl flex flex-col justify-center"
          >
            <h2
              class="text-xl sm:text-2xl md:text-3xl font-bold text-text-custom pb-4 sm:mb-6 font-archivo"
            >
              About Project
            </h2>
            <p class="text-secondary-custom text-sm sm:text-base md:text-lg leading-relaxed">
              {{ project.fullDescription }}
            </p>
          </div>
        </div>
      </div>

      <div class="project-section mb-16 md:mb-24">
        <div
          class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-4 sm:p-6 md:p-8 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/8 dark:border-white/10 shadow-lg dark:shadow-2xl"
        >
          <!-- Tech Stack on the left -->
          <div class="flex flex-wrap gap-2 md:gap-3">
            <div
              v-for="tech in project.techStack"
              :key="tech"
              :class="`px-3 py-2 md:px-4 md:py-2.5 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-1.5 md:gap-2 ${getTechColor(tech).bg} ${getTechColor(tech).border}`"
            >
              <Icon
                :icon="getTechIcon(tech)"
                :class="`text-base md:text-lg ${getTechColor(tech).text}`"
              />
              <span :class="`font-semibold text-xs md:text-sm ${getTechColor(tech).text}`">{{
                tech
              }}</span>
            </div>
          </div>

          <!-- Links on the right -->
          <div
            v-if="project.links.github || project.links.demo"
            class="flex flex-wrap gap-4 w-full md:w-auto justify-stretch md:justify-end"
          >
            <a
              v-if="project.links.github"
              :href="project.links.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 bg-zinc-950 border border-zinc-800 rounded-xl hover:bg-zinc-900 hover:border-accent-custom/50 hover:scale-[1.02] transition-all duration-300 shadow-lg group"
            >
              <IconGithub
                class="text-xl text-white group-hover:text-accent-custom transition-colors"
              />
              <span
                class="font-semibold text-sm text-white group-hover:text-accent-custom transition-colors"
                >GitHub</span
              >
            </a>
            <a
              v-if="project.links.demo"
              :href="project.links.demo"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 bg-accent-custom hover:bg-accent-hover-custom text-white rounded-xl shadow-lg shadow-accent-custom/25 hover:shadow-accent-custom/40 transition-all duration-300 hover:scale-[1.02] font-semibold"
            >
              <IconExternalLink class="text-xl" />
              <span class="text-sm">Demo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
