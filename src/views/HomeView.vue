<script setup>
import { ref, computed } from 'vue'
import gsap from 'gsap'
import { useGsapStore } from '../stores/gsap'
import { personalInfo } from '../data/personal.js'
import { usePageAnimation } from '../composables/usePageAnimation.js'
import { useAppBreakpoints } from '../composables/useBreakpoints.js'

const { isMobile } = useAppBreakpoints()

const gsapStore = useGsapStore()
const heroRef = ref(null)
let mm

const firstName = computed(() => personalInfo.name.split(' ')[0])
const lastName = computed(() => personalInfo.name.split(' ')[1])
const educationParts = computed(() => {
  const parts = personalInfo.lastEducation.split(' - ')
  return { institution: parts[0], program: parts[1] }
})
const jobParts = computed(() => {
  const parts = personalInfo.lastJob.split(' - ')
  return { company: parts[0], role: parts[1] }
})

const { containerRef } = usePageAnimation(
  () => {
    mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.hero-greeting', { opacity: 1, y: 0, visibility: 'visible' })
      gsap.set('.hero-firstname', { opacity: 1, visibility: 'visible' })
      gsap.set('.hero-lastname', { opacity: 1, visibility: 'visible' })
      gsap.set('.hero-role-text', { opacity: 1, y: 0, visibility: 'visible' })
      gsap.set('.scroll-indicator', { opacity: 1, visibility: 'visible' })
      gsap.set('.state-education', { opacity: 1, visibility: 'visible' })
      gsap.set('.state-job', { opacity: 1, visibility: 'visible' })
      gsap.set('.final-name', { opacity: 1, scale: 1, visibility: 'visible' })
      gsap.set('.role-item', { opacity: 1, y: 0, visibility: 'visible' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'top top',
          end: () => (isMobile.value ? '+=1600' : '+=3200'),
          pin: true,
          scrub: false,
          anticipatePin: 1,
        },
      })

      gsapStore.setActiveTimeline(tl)
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set('.hero-greeting', { opacity: 1, y: 0, visibility: 'visible' })
      gsap.set('.hero-firstname', { opacity: 1, xPercent: -20, visibility: 'visible' })
      gsap.set('.hero-lastname', { opacity: 1, xPercent: 20, visibility: 'visible' })
      gsap.set('.hero-role-text', { opacity: 1, y: 0, visibility: 'visible' })
      gsap.set('.scroll-indicator', { opacity: 1, visibility: 'visible' })
      gsap.set('.state-education', { opacity: 0, y: 50, visibility: 'hidden' })
      gsap.set('.state-job', { opacity: 0, y: 50, visibility: 'hidden' })
      gsap.set('.final-name', { opacity: 0, scale: 0.85, visibility: 'hidden' })
      gsap.set('.role-item', { opacity: 0, y: 30, visibility: 'hidden' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'top top',
          end: () => (isMobile.value ? '+=1600' : '+=3200'),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      gsapStore.setActiveTimeline(tl)

      tl.to('.scroll-indicator', { opacity: 0, duration: 0.7 })
        .to('.hero-firstname', { xPercent: -120, opacity: 0, duration: 1.2 })
        .to('.hero-lastname', { xPercent: 120, opacity: 0, duration: 1.2 }, '<')
        .to('.hero-greeting', { opacity: 0, y: -30, visibility: 'hidden', duration: 0.8 }, '-=1')
        .to('.hero-role-text', { opacity: 0, y: -50, visibility: 'hidden', duration: 0.8 }, '-=0.6')
        .addLabel('education')
        .to('.state-education', { visibility: 'visible', opacity: 1, y: 0, duration: 0.8 })
        .to({}, { duration: 1.8 })
        .addLabel('education-hide')
        .to('.state-education', { opacity: 0, y: -50, visibility: 'hidden', duration: 0.8 })
        .addLabel('job')
        .to('.state-job', { visibility: 'visible', opacity: 1, y: 0, duration: 0.8 })
        .to({}, { duration: 1.8 })
        .addLabel('job-hide')
        .to('.state-job', { opacity: 0, y: -50, visibility: 'hidden', duration: 0.8 })
        .addLabel('final')
        .to('.final-name', {
          visibility: 'visible',
          opacity: 1,
          scale: 1,
          duration: 1.15,
          ease: 'power3.out',
        })
        .addLabel('roles')
        .to(
          '.role-item',
          {
            visibility: 'visible',
            opacity: 1,
            y: 0,
            stagger: 0.3,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.6',
        )
    })
  },
  {
    onCleanup: () => {
      gsapStore.setActiveTimeline(null)
      mm?.revert()
    },
  },
)
</script>

<template>
  <div ref="containerRef" class="relative w-full">
    <!-- Pinned Hero Section -->
    <section
      ref="heroRef"
      class="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div
        class="absolute -z-10 w-[70vw] h-[70vw] max-w-180 max-h-180 bg-accent-custom/16 dark:bg-accent-custom/20 blur-[110px] rounded-full"
      ></div>

      <div class="relative w-full h-full flex items-center justify-center">
        <div class="state-name-role absolute inset-0 flex flex-col items-center justify-center">
          <p
            class="hero-greeting italic text-xl md:text-2xl text-secondary-custom font-medium mb-2"
          >
            Hello, I'm
          </p>
          <div class="flex flex-col items-center py-2">
            <span
              class="hero-firstname font-archivo text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-text-custom leading-none"
              >{{ firstName }}</span
            >
            <span
              class="hero-lastname font-archivo text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-text-custom leading-none"
              >{{ lastName }}</span
            >
          </div>
          <p
            class="hero-role-text mt-6 text-lg sm:text-xl md:text-2xl text-secondary-custom font-medium text-center px-4"
          >
            {{ personalInfo.title }}
          </p>
        </div>

        <div class="state-education absolute inset-0 flex flex-col items-center justify-center p-4">
          <span
            class="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-custom border border-accent-custom/20 rounded-full bg-accent-custom/5"
          >
            Pendidikan Terakhir
          </span>
          <h2
            class="font-archivo text-3xl sm:text-4xl md:text-6xl font-bold text-text-custom py-5 text-center"
          >
            {{ educationParts.program }}
          </h2>
          <p class="text-lg sm:text-xl md:text-2xl text-secondary-custom font-medium text-center">
            {{ educationParts.institution }}
          </p>
        </div>

        <div class="state-job absolute inset-0 flex flex-col items-center justify-center p-4">
          <span
            class="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-custom border border-accent-custom/20 rounded-full bg-accent-custom/5"
          >
            Pekerjaan Terbaru
          </span>
          <h2
            class="font-archivo text-3xl sm:text-4xl md:text-6xl font-bold text-text-custom py-5 text-center"
          >
            {{ jobParts.role }}
          </h2>
          <p class="text-lg sm:text-xl md:text-2xl text-secondary-custom font-medium text-center">
            {{ jobParts.company }}
          </p>
        </div>

        <div class="state-final absolute inset-0 flex flex-col items-center justify-center p-4">
          <h1
            class="final-name font-archivo text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-text-custom pb-8 text-center"
          >
            {{ firstName }} {{ lastName }}
          </h1>
          <div class="flex flex-col items-center gap-2 text-center">
            <span
              class="role-item text-xl sm:text-2xl md:text-4xl font-semibold text-accent-custom"
              >{{ personalInfo.title.split(' & ')[0] }}</span
            >
            <span class="role-item text-xl sm:text-2xl md:text-4xl font-semibold text-accent-custom"
              >& {{ personalInfo.title.split(' & ')[1] }}</span
            >
          </div>
        </div>
      </div>

      <div
        class="scroll-indicator absolute bottom-10 flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <span class="text-xs uppercase tracking-[0.2em] text-secondary-custom"
          >Scroll to Explore</span
        >
        <div class="w-px h-16 bg-linear-to-b from-accent-custom to-transparent"></div>
      </div>
    </section>

    <!-- Subsequent Section (Provides DOM height for scrolling) -->
    <section
      class="relative min-h-screen w-full flex flex-col items-center justify-center bg-white/80 dark:bg-[#0A0A0F]/80 backdrop-blur-2xl border-t border-black/5 dark:border-white/8"
    >
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="font-archivo text-3xl md:text-5xl font-bold mb-6 text-text-custom">
          Explore My Journey
        </h2>
        <p class="text-secondary-custom text-lg md:text-xl py-8 max-w-2xl mx-auto font-medium">
          Explore my journey, projects, and skills by navigating through the links above or clicking
          below.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/projects"
            class="px-6 py-3 bg-accent-custom text-white font-medium rounded-xl hover:bg-accent-hover-custom transition-all duration-300 shadow-lg shadow-accent-custom/25 hover:shadow-accent-custom/40 hover:scale-[1.02]"
          >
            View Projects
          </router-link>
          <router-link
            to="/about"
            class="px-6 py-3 border border-accent-custom/20 text-accent-custom font-medium rounded-xl hover:bg-accent-custom/5 transition-all duration-300"
          >
            About Me
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-firstname,
.hero-lastname,
.final-name,
.dark .hero-firstname,
.dark .hero-lastname,
.dark .final-name {
  text-shadow:
    0 0 20px rgba(0, 102, 255, 0.15),
    0 0 40px rgba(0, 102, 255, 0.1),
    0 0 80px rgba(0, 102, 255, 0.05);
}
</style>
