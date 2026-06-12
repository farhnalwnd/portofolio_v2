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
    class="project-card group block relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-accent-custom/30"
  >
    <div class="aspect-video w-full overflow-hidden bg-primary-custom/50 relative">
      <img
        v-if="project.thumbnail && !imageError"
        :src="project.thumbnail"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @error="imageError = true"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-linear-to-br from-accent-custom/20 via-purple-500/10 to-accent-custom/5 text-secondary-custom transition-transform duration-500 group-hover:scale-110"
      >
        <Icon icon="lucide:image" class="text-6xl opacity-30" />
      </div>
    </div>

    <div class="p-6">
      <div class="flex items-start justify-between gap-2 mb-3">
        <span
          class="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent-custom/10 text-accent-custom border border-accent-custom/20 rounded-full"
        >
          {{ project.category }}
        </span>
        <span
          v-if="project.featured"
          class="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full"
        >
          <Icon icon="lucide:star" class="text-sm" />
        </span>
      </div>

      <h3
        class="text-2xl font-bold text-text-custom mb-2 font-archivo group-hover:text-accent-custom transition-colors"
      >
        {{ project.title }}
      </h3>

      <p class="text-secondary-custom text-sm leading-relaxed mb-4 line-clamp-2">
        {{ project.description }}
      </p>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in project.techStack.slice(0, 4)"
          :key="tech"
          class="px-2 py-1 text-xs font-medium bg-white/5 text-text-custom/70 rounded-md border border-white/5"
        >
          {{ tech }}
        </span>
        <span
          v-if="project.techStack.length > 4"
          class="px-2 py-1 text-xs font-medium text-secondary-custom"
        >
          +{{ project.techStack.length - 4 }}
        </span>
      </div>
    </div>

    <div
      class="absolute inset-0 bg-linear-to-t from-accent-custom/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
    ></div>
  </router-link>
</template>
