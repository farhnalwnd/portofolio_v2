<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { timeline } from '../../data/education.js'

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
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden">
    <!-- Header Section -->
    <div class="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-30 w-full px-4">
      <h1 class="text-3xl md:text-6xl font-bold text-text-custom font-archivo text-center">
        Pendidikan & Karier
      </h1>
    </div>

    <!-- Mobile Carousel -->
    <div
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
            class="w-full max-w-[85vw] h-[55vh] p-5 rounded-3xl bg-white/10 dark:bg-white/10 backdrop-blur-2xl border border-black/5 dark:border-white/12 shadow-lg dark:shadow-2xl flex flex-col justify-between"
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
                  class="flex items-start gap-2.5 text-xs py-1 text-secondary-custom"
                >
                  <div class="shrink-0 md:pt-1 lg:pt-1.5">
                    <Icon icon="lucide:check-circle-2" class="text-accent-custom text-sm" />
                  </div>
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
