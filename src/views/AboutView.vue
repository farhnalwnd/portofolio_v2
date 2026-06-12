<script setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'
import { skills } from '../data/skills.js'
import { certificates } from '../data/certificates.js'

gsap.registerPlugin(ScrollTrigger)

const getColorClasses = (color) => {
  switch (color) {
    case 'purple':
      return {
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20 hover:border-purple-500/40',
        glow: 'bg-purple-500/5 group-hover:bg-purple-500/10',
      }
    case 'emerald':
      return {
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20 hover:border-emerald-500/40',
        glow: 'bg-emerald-500/5 group-hover:bg-emerald-500/10',
      }
    case 'orange':
      return {
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20 hover:border-orange-500/40',
        glow: 'bg-orange-500/5 group-hover:bg-orange-500/10',
      }
    default:
      return {
        text: 'text-accent-custom',
        bg: 'bg-accent-custom/10',
        border: 'border-accent-custom/20 hover:border-accent-custom/40',
        glow: 'bg-accent-custom/5 group-hover:bg-accent-custom/10',
      }
  }
}

const getSizeClasses = (size) => {
  switch (size) {
    case 'large':
      return 'md:col-span-2 md:row-span-2'
    case 'medium':
      return 'md:col-span-2'
    default:
      return 'col-span-1'
  }
}

let ctx
const containerRef = ref(null)

onMounted(async () => {
  await nextTick()
  window.scrollTo(0, 0)
  ScrollTrigger.clearScrollMemory()

  ctx = gsap.context(() => {
    // 1. Page Hero entrance
    gsap.from('.page-hero', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
    })

    // 2. Technical Skills scroll / horizontal scrolling
    const viewportWidth = window.innerWidth
    if (viewportWidth >= 768) {
      // Horizontal Scroll for each Category
      gsap.utils.toArray('.skill-category-container').forEach((container) => {
        const track = container.querySelector('.skill-category-track')
        if (track) {
          const scrollWidth = track.scrollWidth - container.clientWidth
          if (scrollWidth > 0) {
            gsap.to(track, {
                x: -scrollWidth,
                ease: 'none',
                scrollTrigger: {
                  trigger: container,
                  pin: true,
                  scrub: 1,
                  start: 'top 20%',
                  end: () => `+=${scrollWidth}`,
                  invalidateOnRefresh: true,
                },
              })
          }
        }
      })
    } else {
      // Mobile: stagger entrance
      gsap.from('.skill-card', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hard-skills-section',
          start: 'top 85%',
          once: true,
        },
      })
    }

    // 3. Soft Skills float animation (runs immediately on mount)
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
  }, containerRef.value)

  // Wait a split second to ensure everything is rendered before calculating layout values
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 100)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="containerRef" class="min-h-screen py-28 px-4 overflow-x-hidden">
    <div class="w-full">
      <div class="page-hero text-center mb-20">
        <h1 class="text-5xl md:text-7xl font-bold text-text-custom mb-6 font-archivo">
          Skills & Expertise
        </h1>
        <p class="text-xl text-secondary-custom mx-auto leading-relaxed">
          Saya adalah seorang Full-Stack Developer dan AI Engineer yang berfokus pada pembuatan
          solusi teknologi modern, efisien, dan inovatif untuk berbagai kebutuhan bisnis dan
          industri.
        </p>
      </div>
    </div>

    <section class="hard-skills-section mb-32 w-full">
      <!-- Single pinned container for all categories -->
      <div
        class="skill-category-container py-12 relative w-full bg-white/1 border-y border-white/5"
      >
        <div class="max-w-7xl mx-auto px-4 mb-12">
          <h2 class="text-3xl md:text-5xl font-bold text-text-custom font-archivo pb-4">
            Technical Skills
          </h2>
        </div>

        <div class="w-full overflow-hidden">
          <div
            class="skill-category-track flex flex-row gap-16 pb-4 md:w-max overflow-x-auto md:overflow-x-visible scrollbar-none px-12"
          >
            <div
              v-for="category in skills.hardSkills"
              :key="category.category"
              class="category-block shrink-0"
            >
              <h3
                class="text-xl md:text-2xl font-semibold text-accent-custom mb-8 flex items-center gap-2"
              >
                <span class="w-2.5 h-2.5 rounded-full bg-accent-custom"></span>
                {{ category.category }}
              </h3>

              <div class="grid grid-rows-2 grid-flow-col gap-4 auto-cols-max">
                <div
                  v-for="skill in category.items"
                  :key="skill.name"
                  class="skill-card group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-accent-custom/30 transition-all duration-300 flex flex-col justify-between overflow-hidden w-70 shrink-0 shadow-md h-50"
                >
                  <!-- Decorative Accent Glow Background -->
                  <div
                    class="absolute -right-10 -bottom-10 w-24 h-24 bg-accent-custom/5 group-hover:bg-accent-custom/10 blur-xl rounded-full transition-colors duration-300"
                  ></div>

                  <div class="flex justify-between items-start w-full mb-8 z-10">
                    <Icon
                      :icon="skill.icon"
                      class="text-5xl text-accent-custom group-hover:scale-110 transition-transform duration-300"
                    />
                    <span
                      class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent-custom/10 text-accent-custom border border-accent-custom/20"
                    >
                      {{
                        skill.level >= 90
                          ? 'Expert'
                          : skill.level >= 80
                            ? 'Advanced'
                            : 'Intermediate'
                      }}
                    </span>
                  </div>

                  <div class="w-full z-10">
                    <span class="text-text-custom font-bold text-lg block mb-2">{{
                      skill.name
                    }}</span>
                    <div class="flex items-center gap-3">
                      <div class="grow h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          class="h-full bg-accent-custom rounded-full transition-all duration-1000"
                          :style="{ width: skill.level + '%' }"
                        ></div>
                      </div>
                      <span class="text-xs text-secondary-custom font-semibold shrink-0"
                        >{{ skill.level }}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="w-full mx-auto">
      <section class="soft-skills-section mb-20 py-10">
        <h2 class="text-3xl md:text-4xl font-bold text-text-custom mb-10 font-archivo pb-4">
          Soft Skills
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-2">
          <div
            v-for="skill in skills.softSkills"
            :key="skill.name"
            class="soft-skill-item p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer aspect-square shadow-lg"
          >
            <div class="relative mb-3 flex items-center justify-center">
              <div
                class="absolute inset-0 bg-purple-500/20 blur-md rounded-full scale-0 group-hover:scale-110 transition-transform duration-300"
              ></div>
              <Icon
                :icon="skill.icon"
                class="text-4xl relative z-10 text-purple-400 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span class="text-sm text-text-custom font-semibold tracking-wide">{{
              skill.name
            }}</span>
          </div>
        </div>
      </section>

      <!-- Certificates & Achievements Section -->
      <section class="certificates-section py-20">
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

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[260px]"
        >
          <a
            v-for="cert in certificates"
            :key="cert.id"
            :href="cert.credential"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'certificate-card group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg',
              getSizeClasses(cert.size),
              getColorClasses(cert.color).border,
            ]"
          >
            <!-- Decorative Accent Glow Background -->
            <div
              :class="[
                'absolute -right-10 -bottom-10 w-32 h-32 blur-2xl rounded-full transition-all duration-500 pointer-events-none z-0',
                getColorClasses(cert.color).glow,
              ]"
            ></div>

            <div class="relative z-10 flex flex-col justify-between h-full w-full">
              <div>
                <div class="flex items-start justify-between mb-3">
                  <span
                    :class="[
                      'inline-block px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider border rounded-full',
                      getColorClasses(cert.color).text,
                      getColorClasses(cert.color).bg,
                      getColorClasses(cert.color).border,
                    ]"
                  >
                    {{ cert.type }}
                  </span>
                  <div class="flex items-center gap-3">
                    <Icon
                      :icon="cert.issuerLogo || 'lucide:award'"
                      :class="['text-xl', getColorClasses(cert.color).text]"
                    />
                    <Icon
                      icon="lucide:external-link"
                      class="text-lg text-secondary-custom group-hover:text-text-custom transition-colors"
                    />
                  </div>
                </div>

                <h3
                  class="text-base md:text-lg font-bold text-text-custom mb-2 group-hover:text-accent-custom transition-colors font-archivo line-clamp-2"
                >
                  {{ cert.name }}
                </h3>

                <!-- Show description on medium & large cards -->
                <p
                  v-if="cert.size !== 'small' && cert.description"
                  class="text-xs text-secondary-custom line-clamp-2 mb-3 leading-relaxed"
                >
                  {{ cert.description }}
                </p>

                <!-- Show skills tags on large cards -->
                <div
                  v-if="cert.size === 'large' && cert.skills"
                  class="flex flex-wrap gap-1.5 mb-2"
                >
                  <span
                    v-for="s in cert.skills"
                    :key="s"
                    class="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 text-secondary-custom border border-white/5"
                  >
                    {{ s }}
                  </span>
                </div>
              </div>

              <div
                class="space-y-1.5 pt-3 border-t border-white/5 w-full flex items-center justify-between text-secondary-custom text-xs"
              >
                <div class="flex items-center gap-1.5">
                  <span class="font-medium text-text-custom/80">{{ cert.issuer }}</span>
                </div>

                <div class="flex items-center gap-1">
                  <Icon icon="lucide:calendar" class="text-xs text-purple-400" />
                  <span>{{ cert.month }} {{ cert.year }}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>
