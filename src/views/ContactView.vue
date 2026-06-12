<script setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'
import { personalInfo } from '../data/personal.js'

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

    gsap.from('.contact-card', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 70%',
      },
    })

    gsap.from('.social-link', {
      opacity: 0,
      scale: 0.8,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.social-links-section',
        start: 'top 70%',
      },
    })
  }, containerRef.value)

  ScrollTrigger.refresh()
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="containerRef" class="min-h-screen py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="page-hero text-center mb-20">
        <div
          class="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-accent-custom border border-accent-custom/20 rounded-full bg-accent-custom/5"
        >
          Get in Touch
        </div>
        <h1 class="text-5xl md:text-7xl font-bold text-text-custom mb-6 font-archivo">
          Let's Connect
        </h1>
        <p class="text-xl text-secondary-custom max-w-2xl mx-auto leading-relaxed">
          Saya selalu terbuka untuk diskusi tentang proyek baru, peluang kolaborasi, atau sekadar
          bertukar ide tentang teknologi.
        </p>
      </div>

      <div class="contact-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="contact-card space-y-8">
          <div class="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
            <h2 class="text-2xl md:text-3xl font-bold text-text-custom mb-6 font-archivo">
              Hubungi Saya
            </h2>

            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="p-3 rounded-xl bg-accent-custom/10 text-accent-custom">
                  <Icon icon="lucide:mail" class="text-xl" />
                </div>
                <div>
                  <p class="text-sm text-secondary-custom">Email</p>
                  <a
                    :href="`mailto:${personalInfo.email}`"
                    class="text-text-custom font-medium hover:text-accent-custom transition-colors"
                  >
                    {{ personalInfo.email }}
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="p-3 rounded-xl bg-accent-custom/10 text-accent-custom">
                  <Icon icon="lucide:phone" class="text-xl" />
                </div>
                <div>
                  <p class="text-sm text-secondary-custom">Phone</p>
                  <a
                    :href="`tel:${personalInfo.phone}`"
                    class="text-text-custom font-medium hover:text-accent-custom transition-colors"
                  >
                    {{ personalInfo.phone }}
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="p-3 rounded-xl bg-accent-custom/10 text-accent-custom">
                  <Icon icon="lucide:map-pin" class="text-xl" />
                </div>
                <div>
                  <p class="text-sm text-secondary-custom">Location</p>
                  <p class="text-text-custom font-medium">Cikarang, Jawa Barat, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <a
              :href="`mailto:${personalInfo.email}`"
              class="inline-flex items-center gap-2 px-8 py-4 bg-accent-custom text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl shadow-accent-custom/20"
            >
              <Icon icon="lucide:send" class="text-xl" />
              Email Me
            </a>
            <a
              :href="personalInfo.whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold hover:scale-105 transition-transform shadow-xl shadow-[#25D366]/20"
            >
              <Icon icon="lucide:message-circle" class="text-xl" />
              WhatsApp
            </a>
          </div>
        </div>

        <div class="contact-card relative">
          <div
            class="absolute inset-0 bg-gradient-to-br from-accent-custom/10 to-purple-500/10 rounded-3xl blur-3xl opacity-30"
          ></div>

          <div
            class="relative p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-center"
          >
            <div
              class="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-accent-custom to-purple-500 p-1"
            >
              <div
                class="w-full h-full rounded-full bg-background-custom flex items-center justify-center"
              >
                <Icon icon="lucide:user" class="text-5xl text-accent-custom" />
              </div>
            </div>

            <h2 class="text-3xl font-bold text-text-custom mb-4 font-archivo">
              {{ personalInfo.name }}
            </h2>
            <p class="text-xl text-secondary-custom mb-8">{{ personalInfo.title }}</p>

            <div class="social-links-section flex justify-center gap-4">
              <a
                :href="personalInfo.github"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-custom/30 transition-all duration-300 group"
                aria-label="GitHub"
              >
                <Icon
                  icon="lucide:github"
                  class="text-2xl text-secondary-custom group-hover:text-accent-custom transition-colors"
                />
              </a>
              <a
                :href="personalInfo.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#0077B5] transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Icon
                  icon="lucide:linkedin"
                  class="text-2xl text-secondary-custom group-hover:text-[#0077B5] transition-colors"
                />
              </a>
              <a
                :href="personalInfo.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#E1306C] transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Icon
                  icon="lucide:instagram"
                  class="text-2xl text-secondary-custom group-hover:text-[#E1306C] transition-colors"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
