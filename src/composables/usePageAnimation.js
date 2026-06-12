import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function usePageAnimation(animationCallback, { onCleanup } = {}) {
  const containerRef = ref(null)
  let ctx

  onMounted(async () => {
    await nextTick()
    window.scrollTo(0, 0)
    ScrollTrigger.clearScrollMemory()

    if (animationCallback && containerRef.value) {
      ctx = gsap.context(animationCallback, containerRef.value)
    }

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  })

  onBeforeUnmount(() => {
    onCleanup?.()
    ctx?.revert()
  })

  return {
    containerRef,
  }
}
