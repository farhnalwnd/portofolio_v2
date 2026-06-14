<script setup>
import { ref, computed } from 'vue'
import gsap from 'gsap'
import { Icon } from '@iconify/vue'
import { useWindowSize } from '@vueuse/core'
import { timeline } from '../data/education.js'
import { useGsapStore } from '../stores/gsap'
import { usePageAnimation } from '../composables/usePageAnimation.js'

const gsapStore = useGsapStore()
const headerRef = ref(null)
const trackContainerRef = ref(null)
const lineRef = ref(null)

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)
const activeIndex = ref(0)

const nextSlide = () => {
  if (activeIndex.value < timeline.length - 1) {
    activeIndex.value++
  }
}

const prevSlide = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--
  }
}

const setSlide = (index) => {
  activeIndex.value = index
}

const touchStart = ref(0)
const touchEnd = ref(0)

const handleTouchStart = (e) => {
  touchStart.value = e.targetTouches[0].clientX
  touchEnd.value = e.targetTouches[0].clientX
}

const handleTouchMove = (e) => {
  touchEnd.value = e.targetTouches[0].clientX
}

const handleTouchEnd = () => {
  const diff = touchStart.value - touchEnd.value
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
}

const { containerRef: pinContainerRef } = usePageAnimation(
  () => {
    // Only register desktop matchMedia since mobile is a Carousel
    const mm = gsap.matchMedia()
    const cardGap = 75 // vh
    const numCards = timeline.length
    const cards = gsap.utils.toArray('.timeline-card')
    const line = lineRef.value

    mm.add('(min-width: 768px)', () => {
      const gapPx = 24 // px gap from center line

      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, {
            xPercent: -50,
            x: 0,
            y: 0,
            opacity: 1,
            rotation: 0,
          })
        } else {
          const isLeft = index % 2 === 0
          gsap.set(card, {
            xPercent: isLeft ? -100 : 0,
            x: isLeft ? -200 : 200,
            y: 0,
            opacity: 0,
            rotation: isLeft ? -5 : 5,
          })
        }
      })

      gsap.set(line, {
        scaleY: 0,
        transformOrigin: 'top center',
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.value,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${window.innerWidth * 5}`,
          anticipatePin: 1,
        },
      })

      tl.to(headerRef.value, {
        opacity: 0,
        y: -30,
        duration: 0.5,
      })

      tl.to(
        cards[0],
        {
          xPercent: -100,
          x: -gapPx,
          y: 60,
          duration: 1.0,
          ease: 'power2.inOut',
        },
        '<',
      )

      tl.to(
        line,
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
        },
        '>',
      )

      const totalScrollY = (numCards - 1) * cardGap
      tl.to(
        trackContainerRef.value,
        {
          y: `-=${totalScrollY}vh`,
          duration: numCards - 1,
          ease: 'none',
        },
        '<',
      )

      cards.forEach((card, index) => {
        if (index > 0) {
          const isLeft = index % 2 === 0
          const cardPosition = 1.0 + (index - 1)
          tl.to(
            card,
            {
              opacity: 1,
              x: isLeft ? -gapPx : gapPx,
              rotation: 0,
              duration: 0.6,
              ease: 'power2.out',
            },
            cardPosition,
          )
        }
      })

      gsapStore.setActiveTimeline(tl)
    })
  },
  {
    onCleanup: () => {
      gsapStore.setActiveTimeline(null)
    },
  },
)
</script>

<template>
  <div class="w-full">
    <div ref="pinContainerRef" class="relative w-full h-screen overflow-hidden">
      <!-- Decorative Blobs -->
      <div
        class="fixed bottom-2/4 -left-14 w-[30vw] h-[40vh] bg-accent-custom/40 blur-[90px] rounded-full animate-mesh-1 pointer-events-none"
      ></div>
      <div
        class="fixed bottom-1/4 -right-1/12 w-[55vw] h-[40vh] bg-accent-custom/35 blur-[80px] rounded-full animate-mesh-2 pointer-events-none"
      ></div>
      <div
        class="fixed bottom-1/12 left-1/5 w-[30vw] h-[30vh] bg-purple-500/35 blur-[80px] rounded-full animate-mesh-2 pointer-events-none"
      ></div>

      <!-- Header Section -->
      <div
        ref="headerRef"
        class="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-30 w-full px-4"
      >
        <h1 class="text-3xl md:text-6xl font-bold text-text-custom font-archivo text-center">
          Pendidikan & Karier
        </h1>
      </div>

      <!-- Mobile Carousel -->
      <div
        v-if="isMobile"
        class="absolute inset-0 top-28 bottom-16 flex flex-col items-center"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="relative flex-1 w-full flex items-center justify-center px-4">
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-x-8"
            enter-to-class="opacity-100 scale-100 translate-x-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-x-0"
            leave-to-class="opacity-0 scale-95 -translate-x-8"
            mode="out-in"
          >
            <div
              :key="activeIndex"
              class="w-full max-w-[85vw] h-[55vh] p-5 rounded-3xl bg-white/35 dark:bg-white/10 backdrop-blur-2xl border border-black/5 dark:border-white/12 shadow-lg dark:shadow-2xl flex flex-col justify-between"
            >
              <div class="flex-1 min-h-0 overflow-y-auto pr-1 -mr-1 custom-scrollbar">
                <div class="flex items-center gap-3 mb-4">
                  <div
                    :class="[
                      'p-2.5 rounded-xl',
                      timeline[activeIndex].type === 'education'
                        ? 'bg-accent-custom/10 text-accent-custom'
                        : 'bg-purple-500/10 text-purple-400',
                    ]"
                  >
                    <Icon
                      :icon="
                        timeline[activeIndex].type === 'education'
                          ? 'lucide:graduation-cap'
                          : 'lucide:briefcase'
                      "
                      class="text-2xl"
                    />
                  </div>
                  <div>
                    <span
                      :class="[
                        'inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full',
                        timeline[activeIndex].type === 'education'
                          ? 'bg-accent-custom/10 text-accent-custom border border-accent-custom/20'
                          : 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
                      ]"
                    >
                      {{ timeline[activeIndex].type === 'education' ? 'Education' : 'Carier' }}
                    </span>
                  </div>
                </div>

                <h2 class="text-xl font-bold text-text-custom py-1 font-archivo">
                  {{ timeline[activeIndex].title }}
                </h2>

                <div class="flex flex-col gap-2 mb-4">
                  <p class="text-base text-accent-custom font-semibold">
                    {{ timeline[activeIndex].institution }}
                  </p>
                  <div class="flex items-center justify-between text-secondary-custom">
                    <div class="flex items-center gap-2">
                      <Icon icon="lucide:map-pin" class="text-base" />
                      <span class="text-xs">{{ timeline[activeIndex].location }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon icon="lucide:calendar" class="text-base" />
                      <span class="text-xs">{{ timeline[activeIndex].period }}</span>
                    </div>
                  </div>
                </div>

                <p class="text-secondary-custom text-xs leading-relaxed py-1">
                  {{ timeline[activeIndex].summary }}
                </p>
                <ul class="space-y-1.5">
                  <li
                    v-for="(point, i) in timeline[activeIndex].highlights"
                    :key="i"
                    class="flex items-start gap-2.5 text-xs text-secondary-custom"
                  >
                    <Icon icon="lucide:check-circle-2" class="mt-0.5 shrink-0 text-accent-custom" />
                    <span class="leading-relaxed">{{ point }}</span>
                  </li>
                </ul>
              </div>

              <div
                class="flex items-center justify-between mt-3 pt-3 border-t border-black/5 dark:border-white/10"
              >
                <span class="text-xs text-secondary-custom">
                  {{
                    activeIndex === 0
                      ? 'Riwayat Terkini'
                      : `${activeIndex + 1} / ${timeline.length}`
                  }}
                </span>
                <div
                  v-if="activeIndex === 0"
                  class="px-2.5 py-0.5 rounded-full bg-accent-custom/20 text-accent-custom text-[10px] font-semibold"
                >
                  Latest
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Carousel Controls -->
        <div class="flex items-center justify-center gap-6 pb-4 pt-2 w-full">
          <button
            :disabled="activeIndex === 0"
            class="p-2.5 rounded-full bg-white/50 dark:bg-white/10 border border-black/5 dark:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-accent-custom/10 hover:border-accent-custom/30 active:scale-95"
            @click="prevSlide"
          >
            <Icon icon="lucide:chevron-left" class="text-xl text-text-custom" />
          </button>

          <div class="flex gap-2">
            <button
              v-for="(_, index) in timeline"
              :key="index"
              :class="[
                'h-2 rounded-full transition-all duration-300',
                index === activeIndex
                  ? 'bg-accent-custom w-6'
                  : 'bg-black/10 dark:bg-white/20 w-2 hover:bg-accent-custom/50',
              ]"
              @click="setSlide(index)"
            ></button>
          </div>

          <button
            :disabled="activeIndex === timeline.length - 1"
            class="p-2.5 rounded-full bg-white/50 dark:bg-white/10 border border-black/5 dark:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-accent-custom/10 hover:border-accent-custom/30 active:scale-95"
            @click="nextSlide"
          >
            <Icon icon="lucide:chevron-right" class="text-xl text-text-custom" />
          </button>
        </div>
      </div>

      <!-- Desktop Scrolling Track Container -->
      <div v-else ref="trackContainerRef" class="absolute inset-y-10 w-full h-full">
        <!-- Center Timeline Line -->
        <div
          ref="lineRef"
          class="absolute left-1/2 -translate-x-1/2 w-0.5 bg-accent-custom/30 origin-top z-0"
          :style="{ top: '50vh', height: `${(timeline.length - 1) * 75}vh` }"
        ></div>

        <!-- Cards -->
        <div
          v-for="(item, index) in timeline"
          :key="index"
          class="timeline-card absolute left-1/2 -translate-x-1/2 w-[45vw] lg:w-[32vw] h-[60vh] z-10 pointer-events-none"
          :style="{ top: `${20 + index * 75}vh` }"
        >
          <div
            class="w-full h-full p-10 rounded-3xl bg-white/35 dark:bg-white/10 backdrop-blur-2xl border border-black/5 dark:border-white/12 shadow-lg dark:shadow-2xl flex flex-col justify-between pointer-events-auto"
          >
            <div class="flex-1 min-h-0 overflow-y-auto pr-1 -mr-1 custom-scrollbar">
              <div class="flex items-center gap-3 mb-6">
                <div
                  :class="[
                    'p-3 rounded-xl',
                    item.type === 'education'
                      ? 'bg-accent-custom/10 text-accent-custom'
                      : 'bg-purple-500/10 text-purple-400',
                  ]"
                >
                  <Icon
                    :icon="item.type === 'education' ? 'lucide:graduation-cap' : 'lucide:briefcase'"
                    class="text-3xl"
                  />
                </div>
                <div>
                  <span
                    :class="[
                      'inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full',
                      item.type === 'education'
                        ? 'bg-accent-custom/10 text-accent-custom border border-accent-custom/20'
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
                    ]"
                  >
                    {{ item.type === 'education' ? 'Education' : 'Carier' }}
                  </span>
                </div>
              </div>

              <h2 class="text-3xl lg:text-4xl font-bold text-text-custom py-2 font-archivo">
                {{ item.title }}
              </h2>

              <div class="flex flex-col gap-2 mb-6">
                <p class="text-xl text-accent-custom font-semibold">
                  {{ item.institution }}
                </p>
                <div class="flex items-center justify-between text-secondary-custom">
                  <div class="flex items-center gap-2">
                    <Icon icon="lucide:map-pin" class="text-lg" />
                    <span class="text-base">{{ item.location }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon icon="lucide:calendar" class="text-lg" />
                    <span class="text-base">{{ item.period }}</span>
                  </div>
                </div>
              </div>

              <p class="text-secondary-custom text-base leading-relaxed py-2">
                {{ item.summary }}
              </p>
              <ul class="space-y-2">
                <li
                  v-for="(point, i) in item.highlights"
                  :key="i"
                  class="flex items-start gap-2.5 text-base text-secondary-custom"
                >
                  <Icon icon="lucide:check-circle-2" class="mt-0.5 shrink-0 text-accent-custom" />
                  <span class="leading-relaxed">{{ point }}</span>
                </li>
              </ul>
            </div>

            <div
              class="flex items-center justify-between mt-6 pt-6 border-t border-black/5 dark:border-white/10"
            >
              <span class="text-sm text-secondary-custom">
                {{ index === 0 ? 'Riwayat Terkini' : `${index + 1} / ${timeline.length}` }}
              </span>
              <div
                v-if="index === 0"
                class="px-3 py-1 rounded-full bg-accent-custom/20 text-accent-custom text-xs font-semibold"
              >
                Latest
              </div>
              <div v-else class="flex gap-2">
                <div
                  v-for="i in timeline.length"
                  :key="i"
                  :class="[
                    'w-2 h-2 rounded-full transition-all',
                    i === index + 1 ? 'bg-accent-custom w-8' : 'bg-black/10 dark:bg-white/20',
                  ]"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.5);
}
</style>
