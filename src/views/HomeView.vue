<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import gsap from 'gsap'

let ctx
const containerRef = ref(null)

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(containerRef.value, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    })
  })
})

onUnmounted(() => {
  ctx.revert()
})
</script>

<template>
  <div ref="containerRef" class="max-w-4xl mx-auto px-4 py-32 text-center">
    <h1 class="text-6xl md:text-8xl font-bold mb-8 text-text-custom tracking-tight">
      Modern <span class="text-accent-custom">Portfolio</span>
    </h1>
    <p class="text-secondary-custom text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
      Selamat datang di portofolio digital saya. Tempat di mana kreativitas bertemu dengan
      fungsionalitas.
    </p>
  </div>
</template>
