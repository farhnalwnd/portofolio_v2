<script setup>
import gsap from 'gsap'
import { skills } from '../data/skills.js'
import { certificates } from '../data/certificates.js'
import { usePageAnimation } from '../composables/usePageAnimation.js'
import { useAppBreakpoints } from '../composables/useBreakpoints.js'
import TechnicalSkills from '../components/TechnicalSkills.vue'
import SoftSkills from '../components/SoftSkills.vue'
import CertificatesList from '../components/CertificatesList.vue'

const { isDesktop } = useAppBreakpoints()

const { containerRef } = usePageAnimation(() => {
  gsap.from('.page-hero', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
  })

  if (isDesktop.value) {
    gsap.utils.toArray('.skill-category-container').forEach((container) => {
      const track = container.querySelector('.skill-category-track')
      if (track) {
        const getScrollWidth = () => track.scrollWidth - container.clientWidth
        if (getScrollWidth() > 0) {
          gsap.to(track, {
            x: () => -getScrollWidth(),
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              pin: true,
              scrub: 1,
              start: 'top 20%',
              end: () => `+=${getScrollWidth()}`,
              invalidateOnRefresh: true,
            },
          })
        }
      }
    })
  } else {
    gsap.utils.toArray('.mobile-skill-category').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          once: true,
        },
      })
    })
  }

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
})
</script>

<template>
  <div ref="containerRef" class="relative min-h-screen py-28 px-4">
    <!-- Decorative Blobs -->
    <div
      class="fixed top-1/12 -right-1/12 w-[35vw] h-[35vw] bg-accent-custom/10 dark:bg-accent-custom/50 blur-[95px] rounded-full animate-mesh-2 pointer-events-none"
    ></div>
    <div
      class="fixed bottom-[5%] left-1/12 w-[30vw] h-[20vw] bg-purple-500/20 dark:bg-purple-500/40 blur-[90px] rounded-full animate-mesh-1 pointer-events-none"
    ></div>

    <div class="w-full relative z-10">
      <div class="page-hero text-center mb-20">
        <h1 class="text-5xl md:text-7xl font-bold text-text-custom mb-6 font-archivo">
          Skills & Expertise
        </h1>
      </div>
    </div>

    <TechnicalSkills :skills="skills" />

    <div class="w-full mx-auto">
      <SoftSkills :skills="skills" />
      <CertificatesList :certificates="certificates" />
    </div>
  </div>
</template>
