import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGsapStore = defineStore('gsap', () => {
  const activeTimeline = ref(null)

  function setActiveTimeline(timeline) {
    activeTimeline.value = timeline
  }

  return { activeTimeline, setActiveTimeline }
})
