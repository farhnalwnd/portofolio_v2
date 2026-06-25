<script setup>
import { ref, computed } from 'vue'
import gsap from 'gsap'
import { useGsapStore } from '../stores/gsap'
import { personalInfo } from '../data/personal.js'
import { usePageAnimation } from '../composables/usePageAnimation.js'
import { useAppBreakpoints } from '../composables/useBreakpoints.js'
import Icon from '../components/icons/Icon.vue'

const { isMobile } = useAppBreakpoints()

const gsapStore = useGsapStore()
const heroRef = ref(null)
let mm

const desktopIcons = [
  'logos:vue',
  'logos:javascript',
  'logos:tailwindcss-icon',
  'logos:typescript-icon',
  'logos:nodejs-icon',
  'logos:python',
  'logos:go',
  'logos:laravel',
  'logos:postgresql',
  'logos:docker-icon',
  'logos:git-icon',
  'logos:linux-tux',
  'logos:mysql',
  'logos:redis',
  'logos:mongodb',
  'logos:nginx',
  'lucide:cpu',
  'lucide:radio',
  'lucide:microchip',
  'lucide:server',
]

const mobileIcons = [
  'logos:vue',
  'logos:javascript',
  'logos:tailwindcss-icon',
  'logos:nodejs-icon',
  'logos:python',
  'logos:go',
  'logos:postgresql',
  'logos:docker-icon',
  'logos:laravel',
  'logos:git-icon',
  'logos:mysql',
  'logos:linux-tux',
]

const floatingIcons = computed(() => (isMobile.value ? mobileIcons : desktopIcons))

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
      gsap.set('.floating-icon', { opacity: 0, visibility: 'hidden' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'top top',
          end: () => (isMobile.value ? '+=2400' : '+=4800'),
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

      floatingIcons.value.forEach((_, idx) => {
        const total = floatingIcons.value.length
        const goldenAngle = Math.PI * (3 - Math.sqrt(5))
        const innerRadius = isMobile.value ? 28 : 32
        const outerRadius = isMobile.value ? 44 : 50
        const radiusRange = outerRadius - innerRadius

        const t = (idx + 0.5) / total
        const radius = innerRadius + Math.sqrt(t) * radiusRange
        const angle = idx * goldenAngle

        gsap.set(`.floating-icon-${idx}`, {
          x: Math.cos(angle) * radius + 'vw',
          y: Math.sin(angle) * radius + 'vh',
          rotation: gsap.utils.random(-30, 30),
          scale: 1.1,
          opacity: 0.4,
          visibility: 'visible',
        })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'top top',
          end: () => (isMobile.value ? '+=3300' : '+=6600'),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      gsapStore.setActiveTimeline(tl)

      tl.to('.scroll-indicator', { opacity: 0, duration: 0.7 })
        .addLabel('icons-gather')
        .to(
          '.floating-icon',
          {
            x: 0,
            y: isMobile.value ? '35vh' : '38vh',
            rotation: 0,
            scale: 0.7,
            opacity: 0.9,
            duration: 2.0,
            ease: 'power2.inOut',
            stagger: {
              each: 0.08,
              from: 'random',
            },
          },
          '+=0.2',
        )
        .to({}, { duration: 0.4 })
        .addLabel('icons-shake')
        .to('.floating-icon', {
          x: '+=3',
          y: '-=3',
          rotation: 2,
          duration: 0.15,
          ease: 'power1.inOut',
          stagger: {
            each: 0.02,
            yoyo: true,
            repeat: 1,
          },
        })
        .to('.floating-icon', {
          x: '-=3',
          y: '+=3',
          rotation: -2,
          duration: 0.15,
          ease: 'power1.inOut',
          stagger: {
            each: 0.02,
            yoyo: true,
            repeat: 1,
          },
        })
        .to('.floating-icon', {
          x: 0,
          y: isMobile.value ? '35vh' : '38vh',
          rotation: 0,
          duration: 0.15,
          ease: 'power1.inOut',
        })
        .to({}, { duration: 0.6 })
        .to('.hero-firstname', { xPercent: -120, opacity: 0, duration: 1.5 })
        .to('.hero-lastname', { xPercent: 120, opacity: 0, duration: 1.5 }, '<')
        .addLabel('icons-burst')
        .to(
          '.floating-icon',
          {
            x: (idx) => {
              const angleRange = 240
              const baseAngle = 150
              const angle = baseAngle + ((idx * 137.508) % angleRange)
              const distance = isMobile.value ? 200 : 280
              const variance = 0.8 + (idx % 4) * 0.15
              return Math.cos((angle * Math.PI) / 180) * distance * variance
            },
            y: (idx) => {
              const angleRange = 240
              const baseAngle = 150
              const angle = baseAngle + ((idx * 137.508) % angleRange)
              const distance = isMobile.value ? 200 : 280
              const variance = 0.8 + (idx % 4) * 0.15
              return Math.sin((angle * Math.PI) / 180) * distance * variance
            },
            opacity: 0,
            scale: 1.3,
            rotation: () => gsap.utils.random(-270, 270),
            duration: 3.0,
            ease: 'power3.out',
            stagger: {
              each: 0.04,
              from: 'random',
            },
          },
          '-=0.5',
        )
        .to('.hero-greeting', { opacity: 0, y: -30, visibility: 'hidden', duration: 0.8 }, '-=0.8')
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

      <div class="icon-container absolute top-2/4 pointer-events-none z-5">
        <Icon
          v-for="(iconName, idx) in floatingIcons"
          :key="iconName"
          :icon="iconName"
          :class="`floating-icon floating-icon-${idx}`"
          class="absolute w-12 h-12 md:w-16 md:h-16 opacity-0"
        />
      </div>

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
          Ready to See What I've Built?
        </h2>
        <p class="text-secondary-custom text-lg md:text-xl py-8 max-w-2xl mx-auto font-medium">
          Specialized in full-stack development and AI engineering. Check out my featured work or
          dive into my technical background.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/projects"
            class="px-6 py-3 bg-accent-custom text-white font-medium rounded-xl hover:bg-accent-hover-custom transition-all duration-300 shadow-lg shadow-accent-custom/25 hover:shadow-accent-custom/40 hover:scale-[1.02]"
          >
            View Featured Projects
          </router-link>
          <router-link
            to="/timeline"
            class="px-6 py-3 border border-accent-custom/20 text-accent-custom font-medium rounded-xl hover:bg-accent-custom/5 transition-all duration-300"
          >
            My Timeline
          </router-link>
          <router-link
            to="/skills"
            class="px-6 py-3 border border-accent-custom/20 text-accent-custom font-medium rounded-xl hover:bg-accent-custom/5 transition-all duration-300"
          >
            Technical Skills
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

.floating-icon {
  filter: drop-shadow(0 4px 12px rgba(37, 99, 235, 0.2));
}

.dark .floating-icon {
  filter: drop-shadow(0 4px 16px rgba(59, 130, 246, 0.25));
}

.icon-container {
  z-index: 5;
}

.state-name-role {
  z-index: 10;
}
</style>
