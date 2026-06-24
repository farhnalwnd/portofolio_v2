<script setup>
import { computed } from 'vue'
import IconStar from '~icons/lucide/star'
import IconLayoutGrid from '~icons/lucide/layout-grid'
import gsap from 'gsap'
import FeaturedProjectCard from '../components/FeaturedProjectCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects.js'
import { usePageAnimation } from '../composables/usePageAnimation.js'
import { useResponsiveTheme } from '../composables/useResponsiveTheme.js'

const { spacing } = useResponsiveTheme()

const featuredProjects = computed(() => projects.filter((p) => p.featured))
const regularProjects = computed(() => projects.filter((p) => !p.featured))

const { containerRef } = usePageAnimation(() => {
  gsap.fromTo(
    '.page-title',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all' },
  )

  gsap.fromTo(
    '.featured-section-title',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1, clearProps: 'all' },
  )

  gsap.fromTo(
    '.featured-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2,
      clearProps: 'all',
    },
  )

  gsap.fromTo(
    '.regular-section-title',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: '.regular-section-title',
        start: 'top 90%',
        once: true,
      },
    },
  )

  gsap.fromTo(
    '.project-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: '.regular-projects-grid',
        start: 'top 90%',
        once: true,
      },
    },
  )
})
</script>

<template>
  <div ref="containerRef" class="min-h-screen overflow-hidden relative">
    <!-- Decorative Blobs -->
    <div
      class="absolute top-[10%] -left-[10%] w-[35vw] h-[35vw] bg-accent-custom/15 dark:bg-accent-custom/25 blur-[95px] rounded-full animate-mesh-1 pointer-events-none"
    ></div>
    <div
      class="absolute top-[60%] -right-[10%] w-[40vw] h-[40vw] bg-purple-500/12 dark:bg-purple-500/20 blur-[90px] rounded-full animate-mesh-2 pointer-events-none"
    ></div>

    <div :class="['pt-28 pb-10 relative z-10', spacing.containerPadding]">
      <div class="page-title text-center mb-12 sm:mb-16">
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold text-text-custom mb-6 font-archivo">
          Projects & Work
        </h1>
      </div>
    </div>

    <!-- Featured Projects Grid -->
    <div v-if="featuredProjects.length > 0" class="w-full pb-16 md:pb-20 relative z-10">
      <div :class="['featured-section-title pb-8', spacing.containerPadding]">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-text-custom font-archivo flex items-center gap-3 tracking-tight"
        >
          <IconStar class="text-purple-500 text-2xl sm:text-3xl md:text-4xl" />
          Featured Projects
        </h2>
      </div>

      <div
        class="flex overflow-x-auto gap-6 snap-x snap-mandatory px-4 md:px-8 lg:px-12 pb-6 no-scrollbar"
      >
        <FeaturedProjectCard
          v-for="project in featuredProjects"
          :key="project.slug"
          :project="project"
        />
      </div>
    </div>

    <!-- Other Projects Grid -->
    <div
      :class="[
        'w-full mx-auto pt-16 md:pt-20 pb-32 md:pb-48 relative z-10',
        spacing.containerPadding,
      ]"
    >
      <div v-if="regularProjects.length > 0" class="regular-section-title pb-8">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-text-custom font-archivo flex items-center gap-3 tracking-tight"
        >
          <IconLayoutGrid class="text-accent-custom text-2xl sm:text-3xl md:text-4xl" />
          Other Projects
        </h2>
      </div>

      <div class="regular-projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in regularProjects"
          :key="project.slug"
          :project="project"
          class="project-card w-full"
        />
      </div>

      <div v-if="regularProjects.length === 0" class="text-center py-20">
        <p class="text-secondary-custom text-lg">Tidak ada proyek yang tersedia saat ini.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
