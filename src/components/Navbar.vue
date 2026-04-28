<script setup>
import { RouterLink } from 'vue-router'
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
    </div>
  </nav>
</template>

<style scoped>
@reference 'tailwindcss';

.nav-link {
  @apply px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white rounded-full;
}

.router-link-active {
  @apply text-blue-400 bg-white/5;
}
</style>
