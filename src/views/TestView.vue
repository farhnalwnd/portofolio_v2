<script setup>
import gsap from 'gsap'
import { usePageAnimation } from '../composables/usePageAnimation.js'

const { containerRef } = usePageAnimation(() => {
  gsap.to('.circle', {
    y: '50vw',
    duration: 2,
    rotation: 360,
    delay: 1.5,
  })
})
</script>

<template>
  <div ref="containerRef" class="w-full flex justify-center align-center">
    <div class="circle">1</div>
  </div>
</template>
