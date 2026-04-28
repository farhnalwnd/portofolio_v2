<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const containerRef = ref(null)

onMounted(() => {
  gsap.from(containerRef.value, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
  })
})
</script>

<template>
  <div ref="containerRef" class="max-w-4xl mx-auto px-4 py-32 text-center">
    <h1 class="text-6xl md:text-8xl font-bold mb-8 text-slate-100 tracking-tight">
      Modern <span class="text-blue-500">Portfolio</span>
    </h1>
    <p class="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
      Selamat datang di portofolio digital saya. Tempat di mana kreativitas bertemu dengan
      fungsionalitas.
    </p>
  </div>
</template>
