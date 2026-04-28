<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
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

onUnmounted(() => {
  ctx.revert()
})
</script>

<template>
  <div ref="containerRef" class="max-w-4xl mx-auto px-4 py-20">
    <h1 class="text-4xl font-bold mb-6 text-text-custom">Tentang Saya</h1>
    <p class="text-secondary-custom text-lg leading-relaxed">
      Saya adalah seorang pengembang yang berfokus pada pembuatan pengalaman web yang modern, cepat,
      dan bermakna.
    </p>
  </div>
</template>
