<script setup>
import { onMounted, computed } from 'vue'
import { Icon } from '@iconify/vue'
import FeaturedProjectCard from '../components/FeaturedProjectCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects.js'

const featuredProjects = computed(() => projects.filter((p) => p.featured))
const regularProjects = computed(() => projects.filter((p) => !p.featured))

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="min-h-screen overflow-hidden">
    <div class="pt-28 pb-10 px-4">
      <div class="page-title text-center mb-16">
        <h1 class="text-5xl md:text-7xl font-bold text-text-custom mb-6 font-archivo">
          Projects & Work
        </h1>
      </div>
    </div>

    <div v-if="featuredProjects.length > 0" class="w-full overflow-hidden mb-20">
      <div class="px-4 md:px-8 lg:px-12 mb-16">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-black text-text-custom font-archivo flex items-center gap-3 max-w-7xl mx-auto tracking-tight"
        >
          <Icon icon="lucide:star" class="text-purple-500 text-3xl md:text-4xl" />
          Featured Projects
        </h2>
      </div>

      <div
        class="w-full overflow-x-auto snap-x snap-mandatory flex gap-6 px-4 md:px-8 lg:px-12 pb-6 no-scrollbar"
      >
        <FeaturedProjectCard
          v-for="project in featuredProjects"
          :key="project.slug"
          :project="project"
        />
      </div>
    </div>

    <div class="max-w-full mx-auto px-4 pb-32 md:pb-48">
      <h2
        v-if="regularProjects.length > 0"
        class="text-3xl md:text-4xl lg:text-5xl font-black text-text-custom mb-16 font-archivo flex items-center gap-3 tracking-tight"
      >
        <Icon icon="lucide:layout-grid" class="text-accent-custom text-3xl md:text-4xl" />
        Other Projects
      </h2>

      <div class="flex flex-wrap justify-evenly gap-8">
        <ProjectCard
          v-for="project in regularProjects"
          :key="project.slug"
          :project="project"
          class="w-full md:w-1/2 lg:w-1/4 shrink-0"
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
