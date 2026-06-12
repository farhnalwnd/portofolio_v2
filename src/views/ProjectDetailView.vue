<script setup>
import { onMounted, ref, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap'
import { Icon } from '@iconify/vue'
import { projects } from '../data/projects.js'

const route = useRoute()
const router = useRouter()

let ctx
const containerRef = ref(null)

const project = computed(() => {
  return projects.find((p) => p.slug === route.params.slug)
})

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
  }, containerRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div v-if="project" ref="containerRef" class="min-h-screen py-20 px-4">
    <div class="max-w-5xl mx-auto">
      <button
        @click="router.push('/projects')"
        class="back-button inline-flex items-center gap-2 px-4 py-2 mb-8 text-secondary-custom hover:text-text-custom transition-colors group"
      >
        <Icon
          icon="lucide:arrow-left"
          class="text-xl transition-transform group-hover:-translate-x-1"
        />
        <span class="font-medium">Kembali ke Projects</span>
      </button>

      <div class="project-hero mb-16">
        <div class="flex flex-wrap items-center gap-3 mb-6">
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

        <h1 class="text-5xl md:text-7xl font-bold text-text-custom mb-6 font-archivo">
          {{ project.title }}
        </h1>

        <p class="text-xl md:text-2xl text-secondary-custom leading-relaxed">
          {{ project.description }}
        </p>
      </div>

      <div class="project-section mb-12">
        <h2 class="text-2xl md:text-3xl font-bold text-text-custom mb-6 font-archivo">
          Tentang Project
        </h2>
        <div class="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <p class="text-secondary-custom text-lg leading-relaxed">
            {{ project.fullDescription }}
          </p>
        </div>
      </div>

      <div class="project-section mb-12">
        <h2 class="text-2xl md:text-3xl font-bold text-text-custom mb-6 font-archivo">
          Tech Stack
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="tech in project.techStack"
            :key="tech"
            class="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-center hover:bg-white/10 hover:border-accent-custom/30 transition-all duration-300 group"
          >
            <span
              class="text-text-custom font-medium group-hover:text-accent-custom transition-colors"
              >{{ tech }}</span
            >
          </div>
        </div>
      </div>

      <div v-if="project.links.github || project.links.demo" class="project-section">
        <h2 class="text-2xl md:text-3xl font-bold text-text-custom mb-6 font-archivo">Links</h2>
        <div class="flex flex-wrap gap-4">
          <a
            v-if="project.links.github"
            :href="project.links.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 hover:border-accent-custom/30 transition-all duration-300 group"
          >
            <Icon
              icon="lucide:github"
              class="text-xl group-hover:text-accent-custom transition-colors"
            />
            <span
              class="font-medium text-text-custom group-hover:text-accent-custom transition-colors"
              >View on GitHub</span
            >
          </a>
          <a
            v-if="project.links.demo"
            :href="project.links.demo"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 bg-accent-custom text-white rounded-full hover:scale-105 transition-transform shadow-xl shadow-accent-custom/20"
          >
            <Icon icon="lucide:external-link" class="text-xl" />
            <span class="font-medium">Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
