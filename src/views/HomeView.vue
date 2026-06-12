<script setup>
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapStore } from '../stores/gsap'

gsap.registerPlugin(ScrollTrigger)

const gsapStore = useGsapStore()
let ctx
const heroRef = ref(null)

onMounted(async () => {
  await nextTick()
  window.scrollTo(0, 0)
  ScrollTrigger.clearScrollMemory()

  ctx = gsap.context(() => {
    gsap.set('.hero-greeting', { opacity: 1, y: 0, visibility: 'visible' })
    gsap.set('.hero-firstname', { opacity: 1, xPercent: -8, visibility: 'visible' })
    gsap.set('.hero-lastname', { opacity: 1, xPercent: 8, visibility: 'visible' })
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
        end: '+=3200',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    gsapStore.setActiveTimeline(tl)

    tl.to('.scroll-indicator', { opacity: 0, visibility: 'hidden', duration: 0.3 })
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
        { visibility: 'visible', opacity: 1, y: 0, stagger: 0.3, duration: 1, ease: 'power2.out' },
        '-=0.6',
      )
  }, heroRef.value)

  ScrollTrigger.refresh()
})

onBeforeUnmount(() => {
  gsapStore.setActiveTimeline(null)
  ctx?.revert()
})
</script>

<template>
  <div class="relative w-full">
    <!-- Pinned Hero Section -->
    <section
      ref="heroRef"
      class="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div
        class="absolute -z-10 w-[50vw] h-[50vw] max-w-125 max-h-125 bg-accent-custom/10 blur-[140px] rounded-full"
      ></div>

      <div class="relative w-full h-full flex items-center justify-center">
        <div class="state-name-role absolute inset-0 flex flex-col items-center justify-center">
          <p
            class="hero-greeting italic text-xl md:text-2xl text-secondary-custom font-medium mb-2"
          >
            Hello, I'm
          </p>
          <div class="flex flex-col items-center">
            <span
              class="hero-firstname font-archivo text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-text-custom leading-none"
              >Farhan</span
            >
            <span
              class="hero-lastname font-archivo text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-text-custom leading-none"
              >Alwanda</span
            >
          </div>
          <p class="hero-role-text mt-6 text-xl md:text-2xl text-secondary-custom font-medium">
            Full-Stack Developer & AI Engineer
          </p>
        </div>

        <div class="state-education absolute inset-0 flex flex-col items-center justify-center">
          <span
            class="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-accent-custom border border-accent-custom/20 rounded-full bg-accent-custom/5"
          >
            Pendidikan Terakhir
          </span>
          <h2 class="font-archivo text-4xl md:text-6xl font-bold text-text-custom mb-4">
            S1 Teknik Informatika
          </h2>
          <p class="text-xl md:text-2xl text-secondary-custom font-medium">President University</p>
        </div>

        <div class="state-job absolute inset-0 flex flex-col items-center justify-center">
          <span
            class="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-accent-custom border border-accent-custom/20 rounded-full bg-accent-custom/5"
          >
            Pekerjaan Terbaru
          </span>
          <h2 class="font-archivo text-4xl md:text-6xl font-bold text-text-custom mb-4">
            Full-Stack Developer
          </h2>
          <p class="text-xl md:text-2xl text-secondary-custom font-medium">Oneject Indonesia</p>
        </div>

        <div class="state-final absolute inset-0 flex flex-col items-center justify-center">
          <h1
            class="final-name font-archivo text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-text-custom mb-8"
          >
            Farhan <br class="hidden md:block" />Alwanda
          </h1>
          <div class="flex flex-col items-center gap-2">
            <span class="role-item text-2xl md:text-4xl font-semibold text-accent-custom"
              >Full-Stack Developer</span
            >
            <span class="role-item text-2xl md:text-4xl font-semibold text-accent-custom"
              >& AI Engineer</span
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
      class="relative min-h-screen w-full flex flex-col items-center justify-center bg-background-custom/50 backdrop-blur-xs border-t border-text-custom/5"
    >
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="font-archivo text-3xl md:text-5xl font-bold mb-6 text-text-custom">
          Explore My Journey
        </h2>
        <p class="text-secondary-custom text-lg md:text-xl mb-8 max-w-2xl mx-auto font-medium">
          Explore my journey, projects, and skills by navigating through the links above or clicking
          below.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/projects"
            class="px-6 py-3 bg-accent-custom text-white font-medium rounded-lg hover:bg-accent-custom/90 transition duration-300"
          >
            View Projects
          </router-link>
          <router-link
            to="/about"
            class="px-6 py-3 border border-text-custom/15 text-text-custom font-medium rounded-lg hover:bg-text-custom/5 transition duration-300"
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
.hero-lastname {
  text-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.dark .hero-firstname,
.dark .hero-lastname {
  text-shadow: 0 0 60px rgba(59, 130, 246, 0.15);
}
</style>
