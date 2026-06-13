<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const imageError = ref(false)
</script>

<template>
  <router-link
    :to="`/projects/${project.slug}`"
    class="featured-card group relative shrink-0 snap-center block overflow-hidden rounded-2xl bg-white/80 dark:bg-white/8 backdrop-blur-2xl border border-black/5 dark:border-white/12 shadow-xl dark:shadow-2xl dark:shadow-accent-custom/5 transition-all duration-300 ease-out hover:scale-[1.02] hover:border-accent-custom/30 dark:hover:border-accent-custom/50 hover:shadow-accent-custom/10 dark:hover:shadow-accent-custom/20 min-w-[85vw] md:min-w-[60vw] lg:min-w-[45vw] h-[60vh] md:h-[65vh]"
  >
    <div class="absolute inset-0 bg-primary-custom">
      <img
        v-if="project.thumbnail && !imageError"
        :src="project.thumbnail"
        :alt="project.title"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        @error="imageError = true"
      />
      <div
        v-else
        class="absolute inset-0 bg-linear-to-br from-accent-custom/30 via-purple-500/20 to-accent-custom/10 flex items-center justify-center text-secondary-custom"
      >
        <Icon icon="lucide:image" class="text-9xl opacity-20" />
      </div>
    </div>

    <div
      class="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500"
    ></div>

    <div class="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12">
      <div class="flex items-center gap-3 mb-3 md:mb-4">
        <span
          class="inline-block px-3 py-1 md:px-4 md:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-accent-custom text-white border border-accent-custom/50 rounded-full shadow-lg shadow-accent-custom/30"
        >
          {{ project.category }}
        </span>
        <span
          class="inline-flex items-center gap-1 px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] sm:text-xs font-semibold bg-purple-500 text-white border border-purple-400/50 rounded-full shadow-lg"
        >
          <Icon icon="lucide:star" class="text-xs sm:text-sm" />
          Featured
        </span>
        <span class="text-white/70 text-xs sm:text-sm font-medium">{{ project.year }}</span>
      </div>

      <h3
        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white py-1 md:py-2 font-archivo leading-tight group-hover:text-accent-custom transition-colors"
      >
        {{ project.title }}
      </h3>

      <p
        class="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 max-w-3xl"
      >
        {{ project.description }}
      </p>

      <div class="flex flex-wrap gap-2 py-2">
        <span
          v-for="(tech, idx) in project.techStack"
          :key="tech"
          :class="[
            'px-2 py-1 md:px-3 md:py-1.5 text-[10px] sm:text-xs font-medium bg-white/10 backdrop-blur-xl text-white/90 rounded-lg border border-white/20',
            idx >= 3 ? 'hidden sm:inline-block' : '',
            idx >= 5 ? 'hidden' : '',
          ]"
        >
          {{ tech }}
        </span>
        <span
          v-if="project.techStack.length > 3"
          class="px-2 py-1 text-[10px] sm:text-xs font-medium text-white/60 sm:hidden"
        >
          +{{ project.techStack.length - 3 }}
        </span>
        <span
          v-if="project.techStack.length > 5"
          class="hidden sm:inline-block px-3 py-1.5 text-xs font-medium text-white/60"
        >
          +{{ project.techStack.length - 5 }}
        </span>
      </div>

      <div class="flex items-center gap-2 text-white group-hover:gap-3 transition-all">
        <span class="text-xs sm:text-sm md:text-base font-semibold">View Project</span>
        <Icon
          icon="lucide:arrow-right"
          class="text-sm sm:text-lg md:text-xl transition-transform group-hover:translate-x-1"
        />
      </div>
    </div>

    <div
      class="absolute inset-0 bg-linear-to-r from-accent-custom/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
    ></div>
  </router-link>
</template>
