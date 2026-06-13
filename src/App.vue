<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-b from-[#fafafa] to-[#f5f5f7] dark:from-[#050507] dark:to-[#0a0a0f] text-text-custom selection:bg-accent-custom/30 transition-colors duration-300"
  >
    <Navbar />

    <main class="min-h-screen">
      <router-view />
    </main>

    <!-- Decorative background elements for Glassmorphism -->
    <div class="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
      <div
        class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent-custom/8 dark:bg-accent-custom/10 blur-[120px] rounded-full animate-mesh-1"
      ></div>
      <div
        class="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/8 blur-[120px] rounded-full animate-mesh-2"
      ></div>
    </div>
  </div>
</template>

<style>
@reference "./assets/main.css";
body {
  @apply bg-background-custom;
}
</style>
