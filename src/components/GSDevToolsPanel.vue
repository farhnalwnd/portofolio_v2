<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useGsapStore } from '../stores/gsap'

const gsapStore = useGsapStore()
const isDev = import.meta.env.DEV
let devToolsInstance = null

onMounted(async () => {
  if (isDev) {
    const { default: gsap } = await import('gsap')
    const { GSDevTools } = await import('gsap/GSDevTools')
    gsap.registerPlugin(GSDevTools)

    watch(
      () => gsapStore.activeTimeline,
      (newTimeline) => {
        if (devToolsInstance) {
          devToolsInstance.kill()
          devToolsInstance = null
        }
        if (newTimeline) {
          devToolsInstance = GSDevTools.create({
            animation: newTimeline,
            globalSync: false,
          })
        }
      },
      { immediate: true },
    )
  }
})

onBeforeUnmount(() => {
  if (devToolsInstance) {
    devToolsInstance.kill()
  }
})
</script>

<template>
  <div v-if="isDev" class="gs-dev-tools-wrapper"></div>
</template>
