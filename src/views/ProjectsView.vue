<script setup>
import { onMounted, ref, computed, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'
import FeaturedProjectCard from '../components/FeaturedProjectCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects.js'

gsap.registerPlugin(ScrollTrigger)

const ctx = ref(null)
const containerRef = ref(null)
const featuredRef = ref(null)
const regularRef = ref(null)

const featuredProjects = computed(() => projects.filter((p) => p.featured))
const regularProjects = computed(() => projects.filter((p) => !p.featured))

onMounted(async () => {
  await nextTick()
  window.scrollTo(0, 0)
  ScrollTrigger.clearScrollMemory()

  ctx.value = gsap.context(() => {
    gsap.from('.page-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    })

    if (featuredRef.value) {
      gsap.from(featuredRef.value.querySelectorAll('.featured-card'), {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      })
    }

    if (regularRef.value) {
      ScrollTrigger.batch(regularRef.value.querySelectorAll('.project-card'), {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.8,
              ease: 'power3.out',
              overwrite: true,
            },
          )
        },
        start: 'top 95%',
        once: true,
      })
    }
  }, containerRef.value)

  ScrollTrigger.refresh()
})

onUnmounted(() => {
  ctx.value?.revert()
})
</script>

<template>
  <div ref="containerRef" class="min-h-screen overflow-hidden">
    <div class="py-20 px-4">
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
    </div>

    <div v-if="featuredProjects.length > 0" class="w-full overflow-hidden mb-16">
      <div class="px-4 md:px-8 lg:px-12 mb-6">
        <h2
          class="text-2xl font-bold text-text-custom font-archivo flex items-center gap-2 max-w-7xl mx-auto"
        >
          <Icon icon="lucide:star" class="text-purple-500 text-xl" />
          Featured Projects
        </h2>
      </div>

      <div
        ref="featuredRef"
        class="w-full overflow-x-auto snap-x snap-mandatory flex gap-6 px-4 md:px-8 lg:px-12 pb-6 no-scrollbar"
      >
        <FeaturedProjectCard
          v-for="project in featuredProjects"
          :key="project.slug"
          :project="project"
        />
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4">
      <h2
        v-if="regularProjects.length > 0"
        class="text-2xl font-bold text-text-custom mb-8 font-archivo flex items-center gap-2"
      >
        <Icon icon="lucide:layout-grid" class="text-accent-custom text-xl" />
        Other Projects
      </h2>

      <div
        ref="regularRef"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
      >
        <ProjectCard v-for="project in regularProjects" :key="project.slug" :project="project" />
      </div>

      <div v-if="projects.length === 0" class="text-center py-20">
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
