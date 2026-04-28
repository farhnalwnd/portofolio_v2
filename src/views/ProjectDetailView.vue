<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'

const route = useRoute()
const containerRef = ref(null)

onMounted(() => {
  gsap.from(containerRef.value, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out'
  })
})
</script>

<template>
  <div ref="containerRef" class="max-w-4xl mx-auto px-4 py-20">
    <h1 class="text-4xl font-bold mb-6 text-slate-100">Detail Proyek: {{ route.params.slug }}</h1>
    <p class="text-slate-400 text-lg leading-relaxed">
      Informasi lengkap mengenai proyek ini.
    </p>
  </div>
</template>
