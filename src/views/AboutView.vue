<script setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'
import { skills } from '../data/skills.js'

gsap.registerPlugin(ScrollTrigger)

let ctx
const containerRef = ref(null)

onMounted(async () => {
  await nextTick()
  window.scrollTo(0, 0)
  ScrollTrigger.clearScrollMemory()

  ctx = gsap.context(() => {
    gsap.from('.page-hero', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
    })

    gsap.from('.skill-category', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.hard-skills-section',
        start: 'top 70%',
      },
    })

    gsap.from('.soft-skill-item', {
      opacity: 0,
      scale: 0.8,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.soft-skills-section',
        start: 'top 70%',
      },
    })

    gsap.from('.certificate-card', {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.certificates-section',
        start: 'top 70%',
      },
    })
  }, containerRef.value)

  ScrollTrigger.refresh()
})

onUnmounted(() => {
  ctx?.revert()
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div ref="containerRef" class="min-h-screen py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="page-hero text-center mb-20">
        <div
          class="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-accent-custom border border-accent-custom/20 rounded-full bg-accent-custom/5"
        >
          About Me
        </div>
        <h1 class="text-5xl md:text-7xl font-bold text-text-custom mb-6 font-archivo">
          Skills & Expertise
        </h1>
        <p class="text-xl text-secondary-custom max-w-3xl mx-auto leading-relaxed">
          Saya adalah seorang Full-Stack Developer dan AI Engineer yang berfokus pada pembuatan
          solusi teknologi modern, efisien, dan inovatif untuk berbagai kebutuhan bisnis dan
          industri.
        </p>
      </div>

      <section class="hard-skills-section mb-20">
        <h2 class="text-3xl md:text-4xl font-bold text-text-custom mb-10 font-archivo">
          Technical Skills
        </h2>

        <div class="space-y-12">
          <div
            v-for="category in skills.hardSkills"
            :key="category.category"
            class="skill-category"
          >
            <h3 class="text-xl md:text-2xl font-semibold text-accent-custom mb-6">
              {{ category.category }}
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div
                v-for="skill in category.items"
                :key="skill.name"
                class="group relative p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-accent-custom/30 transition-all duration-300 flex flex-col items-center text-center"
              >
                <Icon :icon="skill.icon" class="text-5xl mb-3 text-accent-custom" />
                <span class="text-text-custom font-medium mb-2">{{ skill.name }}</span>
                <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-accent-custom rounded-full transition-all duration-1000"
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
                <span class="text-xs text-secondary-custom mt-1">{{ skill.level }}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="soft-skills-section mb-20">
        <h2 class="text-3xl md:text-4xl font-bold text-text-custom mb-10 font-archivo">
          Soft Skills
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div
            v-for="skill in skills.softSkills"
            :key="skill.name"
            class="soft-skill-item p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 flex flex-col items-center text-center group"
          >
            <Icon
              :icon="skill.icon"
              class="text-4xl mb-2 text-purple-400 group-hover:scale-110 transition-transform"
            />
            <span class="text-sm text-text-custom font-medium">{{ skill.name }}</span>
          </div>
        </div>
      </section>

      <section class="certificates-section">
        <h2 class="text-3xl md:text-4xl font-bold text-text-custom mb-10 font-archivo">
          Certificates & Achievements
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            v-for="cert in skills.certificates"
            :key="cert.id"
            :href="cert.credential"
            target="_blank"
            rel="noopener noreferrer"
            class="certificate-card group block p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-accent-custom/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <div class="flex items-start justify-between mb-4">
              <span
                class="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent-custom/10 text-accent-custom border border-accent-custom/20 rounded-full"
              >
                {{ cert.type }}
              </span>
              <Icon
                icon="lucide:external-link"
                class="text-xl text-secondary-custom group-hover:text-accent-custom transition-colors"
              />
            </div>

            <h3
              class="text-lg font-bold text-text-custom mb-2 group-hover:text-accent-custom transition-colors"
            >
              {{ cert.name }}
            </h3>

            <div class="flex items-center gap-2 text-secondary-custom text-sm mb-1">
              <Icon icon="lucide:award" class="text-base" />
              <span>{{ cert.issuer }}</span>
            </div>

            <div class="flex items-center gap-2 text-secondary-custom text-sm">
              <Icon icon="lucide:calendar" class="text-base" />
              <span>{{ cert.year }}</span>
            </div>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>
