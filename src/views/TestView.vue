<script setup>
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to('.circle', {
      y: '50vw',
      duration: 2,
      rotation: 360,
      delay: 1.5,
    })
  })
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <div class="w-full flex justify-center align-center">
    <div class="circle">1</div>
  </div>
</template>
