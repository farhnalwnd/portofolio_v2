<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useGsapStore } from '../stores/gsap'

const gsapStore = useGsapStore()
const isDev = import.meta.env.DEV
const currentState = ref('No active timeline')
const progress = ref(0)
const timePosition = ref(0)
const duration = ref(0)

let updateHandler = null

watch(
  () => gsapStore.activeTimeline,
  (newTimeline) => {
    if (updateHandler) {
      updateHandler = null
    }

    if (newTimeline) {
      duration.value = newTimeline.duration()

      updateHandler = () => {
        progress.value = newTimeline.progress() * 100
        timePosition.value = newTimeline.time()

        const labels = newTimeline.labels
        const currentTime = newTimeline.time()

        let activeLabel = 'Initial'
        for (const [labelName, labelTime] of Object.entries(labels)) {
          if (currentTime >= labelTime) {
            activeLabel = labelName
          }
        }

        currentState.value = activeLabel
      }

      newTimeline.eventCallback('onUpdate', updateHandler)
    } else {
      currentState.value = 'No active timeline'
      progress.value = 0
      timePosition.value = 0
      duration.value = 0
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (gsapStore.activeTimeline && updateHandler) {
    gsapStore.activeTimeline.eventCallback('onUpdate', null)
  }
})
</script>

<template>
  <div v-if="isDev" class="fixed top-4 right-4 z-[10000] pointer-events-none">
    <div
      class="bg-black/90 backdrop-blur-xl border border-accent-custom/30 rounded-xl p-4 shadow-2xl pointer-events-auto min-w-[280px]"
    >
      <div class="text-xs font-bold uppercase tracking-wider text-accent-custom mb-3">
        GSAP Debug Overlay
      </div>

      <div class="space-y-2 text-sm">
        <div class="flex justify-between items-center">
          <span class="text-secondary-custom">State:</span>
          <span class="font-bold text-accent-custom">{{ currentState }}</span>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-secondary-custom">Progress:</span>
          <span class="font-mono text-text-custom">{{ progress.toFixed(1) }}%</span>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-secondary-custom">Time:</span>
          <span class="font-mono text-text-custom"
            >{{ timePosition.toFixed(2) }}s / {{ duration.toFixed(2) }}s</span
          >
        </div>
      </div>

      <div class="mt-3 w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          class="h-full bg-accent-custom transition-all duration-100"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>
