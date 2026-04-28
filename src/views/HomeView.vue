<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let ctx
const containerRef = ref(null)
const heroContentRef = ref(null)

onMounted(() => {
  ctx = gsap.context(() => {
    // Initial setup: move everything down and hide
    gsap.set(['.hero-title', '.hero-subtitle', '.hero-cta', '.hero-visual'], {
      opacity: 0,
      y: 100,
    })
    gsap.set('.hero-visual', { scale: 0.5 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top top',
        end: '+=2000',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    tl.to('.hero-title', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 2,
    })
      .to(
        '.hero-subtitle',
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 2,
        },
        '-=1.5',
      )
      .to(
        '.hero-visual',
        {
          opacity: 1,
          scale: 1,
          duration: 3,
        },
        '-=2',
      )
      .to(
        '.hero-cta',
        {
          opacity: 1,
          y: 0,
          duration: 2,
        },
        '-=1.5',
      )
      .to(
        '.scroll-indicator',
        {
          opacity: 0,
          duration: 0.5,
        },
        0,
      )
  }, containerRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <div ref="containerRef" class="relative w-full overflow-hidden">
    <!-- Hero Section -->
    <section
      class="relative h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden"
    >
      <!-- Decorative background element -->
      <div
        class="hero-visual absolute -z-10 w-[600px] h-[600px] bg-accent-custom/10 blur-[120px] rounded-full opacity-0"
      ></div>

      <div ref="heroContentRef" class="max-w-5xl mx-auto z-10">
        <div
          class="inline-block px-4 py-1.5 mb-6 border border-accent-custom/20 rounded-full bg-accent-custom/5 hero-subtitle opacity-0"
        >
          <span class="text-xs font-bold uppercase tracking-widest text-accent-custom"
            >AI-Native Engineer</span
          >
        </div>

        <h1
          class="hero-title text-6xl md:text-9xl font-bold mb-8 text-text-custom tracking-tighter leading-none opacity-0"
        >
          THE <br class="md:hidden" />
          <span class="text-accent-custom italic">GATEWAY</span>
        </h1>

        <p
          class="hero-subtitle text-secondary-custom text-xl md:text-3xl max-w-3xl mx-auto leading-relaxed mb-12 opacity-0"
        >
          Digital portal of a
          <span class="text-text-custom font-semibold">Fullstack & AI Engineer</span> crafting the
          future with intelligent systems.
        </p>

        <div class="hero-cta flex flex-wrap justify-center gap-4 opacity-0">
          <router-link
            to="/projects"
            class="px-8 py-4 bg-accent-custom text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl shadow-accent-custom/20"
          >
            Explore Work
          </router-link>
          <router-link
            to="/contact"
            class="px-8 py-4 bg-white/5 border border-white/10 text-text-custom rounded-full font-bold hover:bg-white/10 transition-colors"
          >
            Get in Touch
          </router-link>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="scroll-indicator absolute bottom-10 flex flex-col items-center gap-2 animate-bounce"
      >
        <span class="text-xs uppercase tracking-widest text-secondary-custom">Scroll to Enter</span>
        <div class="w-px h-12 bg-linear-to-b from-accent-custom to-transparent"></div>
      </div>
    </section>

    <!-- Content spacer for pinning effect -->
    <!-- <div class="h-[10vh]"></div> -->
  </div>
</template>

<style scoped>
.hero-title {
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.dark .hero-title {
  text-shadow: 0 0 40px rgba(37, 99, 235, 0.1);
}
</style>
