<script setup>
import { ref } from 'vue'
import gsap from 'gsap'
import Icon from '../components/icons/Icon.vue'
import IconUser from '~icons/lucide/user'
import IconMapPin from '~icons/lucide/map-pin'
import { personalInfo, contactChannels } from '../data/personal.js'
import { usePageAnimation } from '../composables/usePageAnimation.js'
import { useResponsiveTheme } from '../composables/useResponsiveTheme.js'

const imageError = ref(false)

const { text, spacing } = useResponsiveTheme()

const { containerRef } = usePageAnimation(() => {
  gsap.fromTo(
    '.page-hero',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all' },
  )

  gsap.fromTo(
    '.profile-card-container',
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2, clearProps: 'all' },
  )

  gsap.fromTo(
    '.social-link-item',
    { opacity: 0, x: 40 },
    {
      opacity: 1,
      x: 0,
      stagger: 0.3,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3,
      clearProps: 'all',
    },
  )
})
</script>

<template>
  <div
    ref="containerRef"
    :class="[
      'min-h-screen py-24 px-4 relative overflow-hidden flex items-center justify-center',
      spacing.containerPadding,
    ]"
  >
    <!-- Decorative Blurs -->
    <div
      class="fixed top-2/4 right-1/6 w-96 h-96 bg-accent-custom/40 blur-[120px] rounded-full pointer-events-none"
    ></div>
    <div
      class="fixed bottom-[35%] left-1/12 w-96 h-96 bg-purple-500/40 blur-[120px] rounded-full pointer-events-none"
    ></div>

    <div class="w-full max-w-5xl mx-auto relative z-10">
      <!-- Hero -->
      <div class="page-hero text-center pb-10">
        <h1 :class="['font-bold text-text-custom mb-4 font-archivo', text.sectionTitle]">
          Let's Connect
        </h1>
      </div>

      <!-- Grid Layout with centered items (no vertical stretch) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center">
        <!-- Grid Kiri: Profile Card (Nempel Kanan, layout horizontal dengan foto di kiri) -->
        <div
          class="profile-card-container w-full md:justify-self-end md:ml-auto max-w-xl mx-auto md:mx-0"
        >
          <div
            :class="[
              'relative rounded-3xl bg-white/5 backdrop-blur-2xl border border-black/5 dark:border-white/12 shadow-xl dark:shadow-2xl dark:shadow-accent-custom/5 flex flex-col gap-6 overflow-hidden',
              spacing.cardPadding,
            ]"
          >
            <!-- Background Glow -->
            <div
              class="absolute -right-10 -top-10 w-32 h-32 bg-accent-custom/10 blur-2xl rounded-full"
            ></div>

            <!-- Top Row: Profile (Left) + Name, Role, Moto (Right) -->
            <div class="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <!-- Avatar / Photo Frame -->
              <div
                class="w-28 h-28 rounded-2xl bg-linear-to-br from-accent-custom to-purple-500 p-0.5 shadow-xl shadow-accent-custom/10 shrink-0 flex items-center justify-center relative overflow-hidden"
              >
                <div
                  class="w-full h-full rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden"
                >
                  <img
                    v-if="!imageError"
                    src="/profile/header.webp"
                    alt="Profile Header"
                    class="w-full h-full object-cover"
                    @error="imageError = true"
                  />
                  <IconUser v-else class="text-5xl text-accent-custom" />
                </div>
              </div>

              <!-- Name, Role, Moto -->
              <div class="flex-1 text-center sm:text-left">
                <h2 class="text-2xl font-bold text-text-custom mb-1 font-archivo">
                  {{ personalInfo.name }}
                </h2>
                <p class="text-sm font-semibold text-accent-custom mb-3">
                  {{ personalInfo.title }}
                </p>
                <p class="text-xs md:text-sm text-secondary-custom leading-relaxed italic">
                  "{{ personalInfo.description }}"
                </p>
              </div>
            </div>

            <!-- Bottom Row: Location (Left) + Availability (Right) -->
            <div
              class="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/5 dark:border-white/8 text-secondary-custom"
            >
              <div class="flex items-center gap-2">
                <IconMapPin class="text-lg text-accent-custom" />
                <span class="text-xs md:text-sm font-medium">Cikarang, Jawa Barat, Indonesia</span>
              </div>

              <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
              >
                <span class="relative flex h-2 w-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                  ></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span
                  class="text-[9px] md:text-[10px] font-bold tracking-wide uppercase text-emerald-600 dark:text-emerald-400"
                  >Available for Projects</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Grid Kanan: Social Links (Nempel Kiri) -->
        <div
          class="flex flex-col gap-4 md:justify-self-start md:mr-auto w-full max-w-xl md:max-w-sm mx-auto md:mx-0"
        >
          <a
            v-for="channel in contactChannels"
            :key="channel.name"
            :href="channel.href"
            :target="channel.external ? '_blank' : undefined"
            :rel="channel.external ? 'noopener noreferrer' : undefined"
            class="social-link-item flex items-center gap-4 group p-3.5 rounded-2xl bg-white/5 dark:bg-white/5 border border-black/5 dark:border-white/8 hover:border-accent-custom/30 dark:hover:border-accent-custom/50 transition-all duration-300 ease-out shadow-lg dark:shadow-xl cursor-pointer"
          >
            <!-- Icon Frame -->
            <div
              class="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/8 transition-all duration-300 group-hover:scale-105 group-hover:border-accent-custom/30 shrink-0"
              :class="channel.colorClass"
            >
              <Icon
                :icon="channel.icon"
                class="text-xl transition-colors duration-300"
                :class="channel.iconColor"
              />
            </div>

            <!-- Details -->
            <div class="overflow-hidden">
              <span
                class="text-[10px] font-bold uppercase tracking-wider text-secondary-custom block mb-0.5"
              >
                {{ channel.name }}
              </span>
              <span
                class="text-sm text-text-custom font-semibold group-hover:text-accent-custom transition-colors truncate block"
              >
                {{ channel.label }}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
