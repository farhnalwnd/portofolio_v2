import { ref, watch, onUnmounted, type Ref } from 'vue'

export const useDelayedPending = (
  pending: Ref<boolean>,
  delay = 200,
  minDuration = 1000
) => {
  const showSkeleton = ref(false)
  let showTimer: ReturnType<typeof setTimeout> | null = null
  let hideTimer: ReturnType<typeof setTimeout> | null = null
  let shownAt = 0

  watch(pending, (val) => {
    if (val) {
      if (hideTimer) clearTimeout(hideTimer)
      showTimer = setTimeout(() => {
        showSkeleton.value = true
        shownAt = Date.now()
      }, delay)
    } else {
      if (showTimer) clearTimeout(showTimer)
      const elapsed = shownAt ? Date.now() - shownAt : Infinity
      const remaining = Math.max(minDuration - elapsed, 0)
      hideTimer = setTimeout(() => {
        showSkeleton.value = false
        shownAt = 0
      }, remaining)
    }
  }, { immediate: true })

  onUnmounted(() => {
    if (showTimer) clearTimeout(showTimer)
    if (hideTimer) clearTimeout(hideTimer)
  })

  return showSkeleton
}
