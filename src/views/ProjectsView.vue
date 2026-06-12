<script setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects.js'

gsap.registerPlugin(ScrollTrigger)

let ctx
const containerRef = ref(null)

onMounted(async () => {
  await nextTick()
  window.scrollTo(0, 0)
  ScrollTrigger.clearScrollMemory()

  ctx = gsap.context(() => {
    gsap.from('.page-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    })

    ScrollTrigger.batch('.project-card', {
      onEnter: (batch) => {
        gsap.from(batch, {
          opacity: 0,
          y: 60,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        })
      },
      start: 'top 80%',
    })
  }, containerRef.value)

  ScrollTrigger.refresh()
})

onUnmounted(() => {
  ctx?.revert()
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div ref="containerRef" class="min-h-screen py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="page-title text-center mb-16">
        <div
          class="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-accent-custom border border-accent-custom/20 rounded-full bg-accent-custom/5"
        >
          Portfolio
        </div>
        <h1 class="text-5xl md:text-7xl font-bold text-text-custom mb-6 font-archivo">
          Projects & Work
        </h1>
        <p class="text-xl text-secondary-custom max-w-2xl mx-auto leading-relaxed">
          Showcase proyek yang telah dikerjakan dengan berbagai teknologi modern dan solusi inovatif
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
      </div>

      <div v-if="projects.length === 0" class="text-center py-20">
        <p class="text-secondary-custom text-lg">Tidak ada proyek yang tersedia saat ini.</p>
      </div>
    </div>
  </div>
</template>
