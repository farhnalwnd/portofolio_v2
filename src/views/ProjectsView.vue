<script setup>
import { onMounted, computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import FeaturedProjectCard from '../components/FeaturedProjectCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects.js'

const featuredProjects = computed(() => projects.filter((p) => p.featured))
const regularProjects = computed(() => projects.filter((p) => !p.featured))

const sliderRef = ref(null)
let isDown = false
let startX = 0
let scrollLeft = 0

const startDrag = (e) => {
  isDown = true
  startX = e.pageX - sliderRef.value.offsetLeft
  scrollLeft = sliderRef.value.scrollLeft
}

const stopDrag = () => {
  isDown = false
}

const moveDrag = (e) => {
  if (!isDown) return
  e.preventDefault()
  const x = e.pageX - sliderRef.value.offsetLeft
  const walk = (x - startX) * 1.5
  sliderRef.value.scrollLeft = scrollLeft - walk
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="min-h-screen overflow-hidden relative">
    <!-- Decorative Blobs -->
    <div
      class="absolute top-[10%] -left-[10%] w-[35vw] h-[35vw] bg-accent-custom/15 dark:bg-accent-custom/25 blur-[95px] rounded-full animate-mesh-1 pointer-events-none"
    ></div>
    <div
      class="absolute top-[60%] -right-[10%] w-[40vw] h-[40vw] bg-purple-500/12 dark:bg-purple-500/20 blur-[90px] rounded-full animate-mesh-2 pointer-events-none"
    ></div>

    <div class="pt-28 pb-10 px-4 relative z-10">
      <div class="page-title text-center mb-16">
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold text-text-custom mb-6 font-archivo">
          Projects & Work
        </h1>
      </div>
    </div>

    <div v-if="featuredProjects.length > 0" class="w-full overflow-hidden pb-16 md:pb-20">
      <div class="px-4 md:px-8 lg:px-12 pb-8">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-text-custom font-archivo flex items-center gap-3 max-w-7xl mx-auto tracking-tight"
        >
          <Icon icon="lucide:star" class="text-purple-500 text-2xl sm:text-3xl md:text-4xl" />
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

    <div class="max-w-full mx-auto px-4 pt-16 md:pt-20 pb-32 md:pb-48">
      <h2
        v-if="regularProjects.length > 0"
        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-text-custom pb-8 font-archivo flex items-center gap-3 tracking-tight"
      >
        <Icon
          icon="lucide:layout-grid"
          class="text-accent-custom text-2xl sm:text-3xl md:text-4xl"
        />
        Other Projects
      </h2>

      <div
        ref="sliderRef"
        class="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
        @mousedown="startDrag"
        @mouseup="stopDrag"
        @mousemove="moveDrag"
      >
        <ProjectCard
          v-for="project in regularProjects"
          :key="project.slug"
          :project="project"
          class="project-card w-[85vw] md:w-[45vw] lg:w-[28vw] shrink-0 snap-center"
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
