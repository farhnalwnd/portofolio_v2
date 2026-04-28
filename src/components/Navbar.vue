<script setup>
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
    <div
      class="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
    >
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/education" class="nav-link">Education</RouterLink>
      <RouterLink to="/projects" class="nav-link">Projects</RouterLink>
      <RouterLink to="/about" class="nav-link">About</RouterLink>
      <RouterLink to="/contact" class="nav-link">Contact</RouterLink>

      <div class="h-4 w-[1px] bg-white/20 mx-2"></div>

      <button
        @click="toggleDark()"
        class="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
        aria-label="Toggle Dark Mode"
      >
        <Icon :icon="isDark ? 'ph:moon-stars-bold' : 'ph:sun-bold'" class="text-xl" />
      </button>
    </div>
  </nav>
</template>

<style scoped>
@reference "../assets/main.css";

.nav-link {
  @apply px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white rounded-full;
}

.router-link-active {
  @apply text-accent-custom bg-white/5;
}
</style>
