<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import gsap from 'gsap'

const onEnter = (el, done) => {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: done,
    },
  )
}

const onLeave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    y: -50,
    duration: 0.5,
    ease: 'power3.in',
    onComplete: done,
  })
}
</script>

<template>
  <div
    class="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B] text-[#09090B] dark:text-[#FAFAFA] selection:bg-blue-500/30"
  >
    <Navbar />

    <main class="pt-24 min-h-screen">
      <router-view v-slot="{ Component }">
        <transition mode="out-in" :css="false" @enter="onEnter" @leave="onLeave">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Decorative background elements for Glassmorphism -->
    <div class="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
      <div
        class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"
      ></div>
      <div
        class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"
      ></div>
    </div>
  </div>
</template>

<style>
body {
  @apply bg-[#FAFAFA] dark:bg-[#09090B];
}

/* Ensure global transitions and base styles */
.page-transition-container {
  width: 100%;
}
</style>
