<script setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'
import { timeline } from '../data/education.js'

gsap.registerPlugin(ScrollTrigger)

let ctx
const sectionRef = ref(null)
const tracksRef = ref(null)

onMounted(async () => {
  await nextTick()
  window.scrollTo(0, 0)
  ScrollTrigger.clearScrollMemory()

  ctx = gsap.context(() => {
    const tracks = tracksRef.value
    const cards = gsap.utils.toArray('.timeline-card')
    const totalWidth = tracks.scrollWidth
    const viewportWidth = window.innerWidth

    gsap.to(tracks, {
      x: -(totalWidth - viewportWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        anticipatePin: 1,
      },
    })

    gsap.from(cards, {
      opacity: 0,
      scale: 0.9,
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top center',
      },
    })
  }, sectionRef.value)

  ScrollTrigger.refresh()
})

onUnmounted(() => {
  ctx?.revert()
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div ref="sectionRef" class="relative w-full h-screen overflow-hidden">
    <div class="absolute inset-0 flex items-center">
      <div ref="tracksRef" class="flex gap-8 px-[10vw]">
        <div
          v-for="(item, index) in timeline"
          :key="index"
          class="timeline-card flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[50vw] h-[70vh] relative"
        >
          <div
            class="w-full h-full p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col justify-between"
          >
            <div>
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
                    {{ item.type === 'education' ? 'Pendidikan' : 'Karier' }}
                  </span>
                </div>
              </div>

              <h2 class="text-3xl md:text-5xl font-bold text-text-custom mb-4 font-archivo">
                {{ item.title }}
              </h2>

              <div class="flex flex-col gap-2 mb-6">
                <p class="text-xl md:text-2xl text-accent-custom font-semibold">
                  {{ item.institution }}
                </p>
                <div class="flex items-center gap-4 text-secondary-custom">
                  <div class="flex items-center gap-2">
                    <Icon icon="lucide:calendar" class="text-lg" />
                    <span class="text-sm md:text-base">{{ item.period }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon icon="lucide:map-pin" class="text-lg" />
                    <span class="text-sm md:text-base">{{ item.location }}</span>
                  </div>
                </div>
              </div>

              <p class="text-secondary-custom text-base md:text-lg leading-relaxed">
                {{ item.description }}
              </p>
            </div>

            <div class="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
              <span class="text-sm text-secondary-custom"
                >{{ index + 1 }} / {{ timeline.length }}</span
              >
              <div class="flex gap-2">
                <div
                  v-for="i in timeline.length"
                  :key="i"
                  :class="[
                    'w-2 h-2 rounded-full transition-all',
                    i === index + 1 ? 'bg-accent-custom w-8' : 'bg-white/20',
                  ]"
                ></div>
              </div>
            </div>
          </div>

          <div
            v-if="index < timeline.length - 1"
            class="absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/20 to-transparent"
          ></div>
        </div>
      </div>
    </div>

    <div class="absolute top-8 left-1/2 -translate-x-1/2 z-10">
      <h1 class="text-4xl md:text-6xl font-bold text-text-custom font-archivo text-center">
        Pendidikan & Karier
      </h1>
      <p class="text-secondary-custom text-center mt-2">Scroll untuk menjelajahi timeline</p>
    </div>
  </div>
</template>
