<script setup>
import { Icon } from '@iconify/vue'
import { onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

defineProps({
  skills: {
    type: Object,
    required: true,
  },
})

let ctx
const cleanups = []

function setupMarquee(track, direction) {
  const items = track.querySelectorAll('.skill-card')
  if (!items.length) return

  const speed = 0.5
  const trackWidth = track.scrollWidth / 2
  const start = direction === 'left' ? 0 : -trackWidth
  const end = direction === 'left' ? -trackWidth : 0

  gsap.set(track, { x: start })

  let activeTween = null
  let isDragging = false

  function startLoop() {
    if (isDragging) return

    const currentX = gsap.getProperty(track, 'x')
    const remaining = Math.abs(currentX - end)

    if (remaining <= 0.5) {
      gsap.set(track, { x: start })
    }

    const fromX = gsap.getProperty(track, 'x')
    const toX = end
    const distance = Math.abs(toX - fromX)
    const duration = distance / (speed * 60)

    activeTween = gsap.to(track, {
      x: toX,
      duration,
      ease: 'none',
      onComplete() {
        gsap.set(track, { x: start })
        startLoop()
      },
    })
  }

  startLoop()

  const draggable = Draggable.create(track, {
    type: 'x',
    inertia: false,
    edgeResistance: 0.75,
    onDragStart() {
      isDragging = true
      if (activeTween) {
        activeTween.kill()
        activeTween = null
      }
    },
    onDrag() {
      const x = gsap.getProperty(track, 'x')
      if (direction === 'left') {
        if (x <= -trackWidth) gsap.set(track, { x: x + trackWidth })
        else if (x >= 0) gsap.set(track, { x: x - trackWidth })
      } else {
        if (x >= 0) gsap.set(track, { x: x - trackWidth })
        else if (x <= -trackWidth) gsap.set(track, { x: x + trackWidth })
      }
    },
    onDragEnd() {
      isDragging = false
      startLoop()
    },
  })[0]

  cleanups.push(() => {
    if (activeTween) activeTween.kill()
    draggable.kill()
  })
}

onMounted(async () => {
  await nextTick()

  ctx = gsap.context(() => {
    gsap.utils.toArray('.mobile-marquee-track').forEach((track, index) => {
      const direction = index % 2 === 0 ? 'left' : 'right'
      setupMarquee(track, direction)
    })
  })
})

onUnmounted(() => {
  cleanups.forEach((fn) => fn())
  ctx?.revert()
})
</script>

<template>
  <div class="py-8 px-4 overflow-hidden">
    <h2 class="text-3xl font-bold text-text-custom font-archivo pb-6">Technical Skills</h2>

    <div
      v-for="(category, index) in skills.hardSkills"
      :key="category.category"
      class="mobile-skill-category mb-8"
    >
      <h3 class="text-lg font-semibold text-accent-custom pb-3 flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-accent-custom"></span>
        {{ category.category }}
      </h3>

      <div class="w-full overflow-hidden py-2 -mx-4 px-4">
        <div
          class="mobile-marquee-track flex gap-4 w-max cursor-grab active:cursor-grabbing"
        >
          <template v-for="n in 2" :key="n">
            <div
              v-for="skill in category.items"
              :key="skill.name + '-' + n"
              class="skill-card group relative p-5 rounded-2xl bg-white dark:bg-white/10 backdrop-blur-2xl border border-black/5 dark:border-white/12 flex flex-col justify-between overflow-hidden w-52 shrink-0 h-40"
            >
              <div
                class="absolute -right-10 -bottom-10 w-24 h-24 bg-accent-custom/5 blur-xl rounded-full"
              ></div>

              <div class="flex justify-between items-start w-full mb-6 z-10">
                <Icon :icon="skill.icon" class="text-4xl text-accent-custom" />
                <span
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent-custom/10 text-accent-custom border border-accent-custom/20"
                >
                  {{
                    skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Intermediate'
                  }}
                </span>
              </div>

              <div class="w-full z-10">
                <span class="text-text-custom font-bold text-base block mb-2">{{
                  skill.name
                }}</span>
                <div class="flex items-center gap-3">
                  <div class="grow h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-accent-custom rounded-full"
                      :style="{ width: skill.level + '%' }"
                    ></div>
                  </div>
                  <span class="text-xs text-secondary-custom font-semibold shrink-0"
                    >{{ skill.level }}%</span
                  >
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
