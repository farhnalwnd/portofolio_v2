<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import GSDevToolsPanel from './components/GSDevToolsPanel.vue'
import GSAPDebugOverlay from './components/GSAPDebugOverlay.vue'

const isDev = import.meta.env.DEV
</script>

<template>
  <div
    class="min-h-screen bg-background-custom text-text-custom selection:bg-accent-custom/30 transition-colors duration-300"
  >
    <Navbar />

    <main class="min-h-screen">
      <router-view />
    </main>

    <!-- Decorative background elements for Glassmorphism -->
    <div class="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
      <div
        class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-custom/10 blur-[120px] rounded-full"
      ></div>
      <div
        class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"
      ></div>
    </div>

    <GSDevToolsPanel v-if="isDev" />
    <GSAPDebugOverlay v-if="isDev" />
  </div>
</template>

<style>
@reference "./assets/main.css";
body {
  @apply bg-background-custom;
}
</style>
