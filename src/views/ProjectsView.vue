<script setup>
import { onMounted, onUnmounted, computed, ref } from 'vue'
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
let animationFrameId = null
const scrollSpeed = 0.5
const isHovered = ref(false)
let targetScroll = null

const loopedProjects = computed(() => {
  if (regularProjects.value.length === 0) return []
  return [...regularProjects.value, ...regularProjects.value, ...regularProjects.value]
})

const startDrag = (e) => {
  isDown = true
  startX = e.pageX - sliderRef.value.offsetLeft
  scrollLeft = sliderRef.value.scrollLeft
  targetScroll = null // Reset targetScroll on drag
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

const handleScroll = () => {
  const container = sliderRef.value
  if (!container) return

  const originalWidth = container.scrollWidth / 3

  if (container.scrollLeft >= originalWidth * 2) {
    container.scrollLeft -= originalWidth
    if (targetScroll !== null) targetScroll -= originalWidth
  } else if (container.scrollLeft <= 0) {
    container.scrollLeft += originalWidth
    if (targetScroll !== null) targetScroll += originalWidth
  }
}

const startAutoScroll = () => {
  const scroll = () => {
    if (sliderRef.value && !isHovered.value && !isDown) {
      sliderRef.value.scrollLeft += scrollSpeed
    }
    animationFrameId = requestAnimationFrame(scroll)
  }
  animationFrameId = requestAnimationFrame(scroll)
}

onMounted(() => {
  window.scrollTo(0, 0)

  setTimeout(() => {
    if (sliderRef.value) {
      const originalWidth = sliderRef.value.scrollWidth / 3
      sliderRef.value.scrollLeft = originalWidth
      startAutoScroll()
    }
  }, 100)
})

const slide = (direction) => {
  const container = sliderRef.value
  if (!container) return

  const cards = container.querySelectorAll('.project-card')
  if (!cards.length) return

  const card = cards[0]
  const style = window.getComputedStyle(container)
  const gap = parseInt(style.columnGap || style.gap || '24', 10)
  const itemWidth = card.getBoundingClientRect().width + gap

  // Initialize or reset if the user manually dragged or it's out of sync
  const currentScroll = container.scrollLeft
  if (targetScroll === null || Math.abs(targetScroll - currentScroll) > itemWidth * 1.5) {
    targetScroll = currentScroll
  }

  if (direction === 'right') {
    targetScroll = Math.floor(targetScroll / itemWidth) * itemWidth + itemWidth
  } else {
    targetScroll = Math.ceil(targetScroll / itemWidth) * itemWidth - itemWidth
  }

  container.scrollTo({
    left: targetScroll,
    behavior: 'smooth',
  })
}

const slideLeft = () => slide('left')
const slideRight = () => slide('right')

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
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
        <h1 class="text-5xl md:text-7xl font-bold text-text-custom mb-6 font-archivo">
          Projects & Work
        </h1>
      </div>
    </div>

    <div v-if="featuredProjects.length > 0" class="w-full overflow-hidden pb-16 md:pb-20">
      <div class="px-4 md:px-8 lg:px-12 pb-8">
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

    <div class="max-w-full mx-auto px-4 pt-16 md:pt-20 pb-32 md:pb-48">
      <h2
        v-if="regularProjects.length > 0"
        class="text-3xl md:text-4xl lg:text-5xl font-black text-text-custom pb-8 font-archivo flex items-center gap-3 tracking-tight"
      >
        <Icon icon="lucide:layout-grid" class="text-accent-custom text-3xl md:text-4xl" />
        Other Projects
      </h2>

      <div class="relative group/slider">
        <div
          ref="sliderRef"
          class="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
          @mousedown="startDrag"
          @mouseup="stopDrag"
          @mousemove="moveDrag"
          @scroll="handleScroll"
          @mouseenter="isHovered = true"
          @mouseleave="
            () => {
              stopDrag()
              isHovered = false
            }
          "
        >
          <ProjectCard
            v-for="(project, index) in loopedProjects"
            :key="`${project.slug}-${index}`"
            :project="project"
            class="project-card w-[85vw] md:w-[45vw] lg:w-[28vw] shrink-0 snap-center"
          />
        </div>

        <button
          class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg flex items-center justify-center text-text-custom opacity-0 group-hover/slider:opacity-100 focus:opacity-100 transition-all duration-300 hover:bg-accent-custom hover:text-white cursor-pointer active:scale-95"
          @click="slideLeft"
        >
          <Icon icon="lucide:chevron-left" class="text-xl md:text-2xl" />
        </button>

        <button
          class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-lg flex items-center justify-center text-text-custom opacity-0 group-hover/slider:opacity-100 focus:opacity-100 transition-all duration-300 hover:bg-accent-custom hover:text-white cursor-pointer active:scale-95"
          @click="slideRight"
        >
          <Icon icon="lucide:chevron-right" class="text-xl md:text-2xl" />
        </button>
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
