<script setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'
import { skills } from '../data/skills.js'

gsap.registerPlugin(ScrollTrigger)

let ctx
const containerRef = ref(null)
const certsSectionRef = ref(null)
const certsTrackRef = ref(null)

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

    // Floating animation for soft skills
    gsap.utils.toArray('.soft-skill-item').forEach((el) => {
      gsap.to(el, {
        y: 'random(-10, 10)',
        x: 'random(-5, 5)',
        rotation: 'random(-3, 3)',
        duration: 'random(2.5, 4.5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 'random(0, 1.5)',
      })
    })

    // Horizontal Scroll for Certificates
    const viewportWidth = window.innerWidth
    if (viewportWidth >= 768 && certsTrackRef.value && certsSectionRef.value) {
      const scrollWidth = certsTrackRef.value.scrollWidth - window.innerWidth
      gsap.to(certsTrackRef.value, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: certsSectionRef.value,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      })
    } else {
      // Mobile: standard vertical stagger
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
    }
  }, containerRef.value)

  ScrollTrigger.refresh()
})

onUnmounted(() => {
  ctx?.revert()
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

        <div class="space-y-16">
          <div
            v-for="category in skills.hardSkills"
            :key="category.category"
            class="skill-category"
          >
            <h3 class="text-xl md:text-2xl font-semibold text-accent-custom mb-6 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-accent-custom"></span>
              {{ category.category }}
            </h3>
            
            <!-- Bento Grid Layout -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[160px]">
              <div
                v-for="(skill, index) in category.items"
                :key="skill.name"
                :class="[
                  'group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-accent-custom/30 transition-all duration-300 flex flex-col justify-between overflow-hidden',
                  // Pola Bento Grid dinamis berdasarkan index item
                  index % 3 === 0 ? 'md:col-span-2' : '',
                  index % 4 === 1 ? 'md:row-span-2 flex-col justify-around' : ''
                ]"
              >
                <!-- Decorative Accent Glow Background -->
                <div class="absolute -right-10 -bottom-10 w-24 h-24 bg-accent-custom/5 group-hover:bg-accent-custom/10 blur-xl rounded-full transition-colors duration-300"></div>

                <div class="flex justify-between items-start w-full">
                  <Icon :icon="skill.icon" class="text-5xl text-accent-custom group-hover:scale-110 transition-transform duration-300" />
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent-custom/10 text-accent-custom border border-accent-custom/20">
                    {{ skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Intermediate' }}
                  </span>
                </div>

                <div class="w-full">
                  <span class="text-text-custom font-bold text-lg block mb-2">{{ skill.name }}</span>
                  <div class="flex items-center gap-3">
                    <div class="grow h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-accent-custom rounded-full transition-all duration-1000"
                        :style="{ width: skill.level + '%' }"
                      ></div>
                    </div>
                    <span class="text-xs text-secondary-custom font-semibold shrink-0">{{ skill.level }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="soft-skills-section mb-20 overflow-hidden py-10">
        <h2 class="text-3xl md:text-4xl font-bold text-text-custom mb-10 font-archivo">
          Soft Skills
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-2">
          <div
            v-for="skill in skills.softSkills"
            :key="skill.name"
            class="soft-skill-item p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer aspect-square shadow-lg"
          >
            <div class="relative mb-3 flex items-center justify-center">
              <div class="absolute inset-0 bg-purple-500/20 blur-md rounded-full scale-0 group-hover:scale-110 transition-transform duration-300"></div>
              <Icon
                :icon="skill.icon"
                class="text-4xl relative z-10 text-purple-400 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span class="text-sm text-text-custom font-semibold tracking-wide">{{ skill.name }}</span>
          </div>
        </div>
      </section>

      <!-- Certificates & Achievements Section -->
      <section ref="certsSectionRef" class="certificates-section min-h-screen flex flex-col justify-center py-20 relative overflow-hidden">
        <div class="mb-10">
          <div
            class="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-accent-custom border border-accent-custom/20 rounded-full bg-accent-custom/5"
          >
            Credentials
          </div>
          <h2 class="text-3xl md:text-5xl font-bold text-text-custom font-archivo">
            Certificates & Achievements
          </h2>
          <p class="text-secondary-custom text-sm md:text-base mt-2">
            Beberapa sertifikasi dan pencapaian profesional yang telah saya raih.
          </p>
        </div>

        <!-- Horizontal Track for Desktop, standard layout is adapted for mobile via CSS -->
        <div class="w-full relative">
          <div
            ref="certsTrackRef"
            class="flex flex-col md:flex-row gap-6 md:w-max pb-6"
          >
            <a
              v-for="cert in skills.certificates"
              :key="cert.id"
              :href="cert.credential"
              target="_blank"
              rel="noopener noreferrer"
              class="certificate-card group block p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-accent-custom/30 transition-all duration-300 hover:scale-[1.02] md:w-[380px] shrink-0 shadow-xl flex flex-col justify-between h-[260px]"
            >
              <div>
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
                  class="text-lg font-bold text-text-custom mb-3 group-hover:text-accent-custom transition-colors font-archivo line-clamp-2"
                >
                  {{ cert.name }}
                </h3>
              </div>

              <div class="space-y-1.5 pt-4 border-t border-white/5">
                <div class="flex items-center gap-2 text-secondary-custom text-sm">
                  <Icon icon="lucide:award" class="text-base text-accent-custom" />
                  <span class="font-medium text-text-custom/80">{{ cert.issuer }}</span>
                </div>

                <div class="flex items-center gap-2 text-secondary-custom text-sm">
                  <Icon icon="lucide:calendar" class="text-base text-purple-400" />
                  <span>{{ cert.year }}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
