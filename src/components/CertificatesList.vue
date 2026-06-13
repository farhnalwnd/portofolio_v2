<script setup>
import { Icon } from '@iconify/vue'
import { getColorClasses } from '../data/colorMap.js'

defineProps({
  certificates: {
    type: Array,
    required: true,
  },
})

const getGridClasses = (index) => {
  switch (index) {
    // Baris 1 & 2: Kolom 1 digabung (row-span-2)
    case 0:
      return 'md:col-span-1 md:col-start-1 md:row-start-1 md:row-span-2'
    // Baris 1: Kolom 2
    case 1:
      return 'md:col-span-1 md:col-start-2 md:row-start-1'
    // Baris 1: Kolom 3-4 (span-2)
    case 2:
      return 'md:col-span-2 md:col-start-3 md:row-start-1'
    // Baris 2: Kolom 2-3 (span-2)
    case 3:
      return 'md:col-span-2 md:col-start-2 md:row-start-2'
    // Baris 2: Kolom 4
    case 4:
      return 'md:col-span-1 md:col-start-4 md:row-start-2'
    // Baris 3: Kolom 1 (tunggal), Kolom 2 (tunggal), Kolom 3-4 (span-2)
    case 5:
      return 'md:col-span-1 md:col-start-1 md:row-start-3'
    case 6:
      return 'md:col-span-1 md:col-start-2 md:row-start-3'
    case 7:
      return 'md:col-span-2 md:col-start-3 md:row-start-3'
    // Baris 4: Kolom 1, Kolom 2, Kolom 3, Kolom 4 (masing-masing tunggal)
    case 8:
      return 'md:col-span-1 md:col-start-1 md:row-start-4'
    case 9:
      return 'md:col-span-1 md:col-start-2 md:row-start-4'
    case 10:
      return 'md:col-span-1 md:col-start-3 md:row-start-4'
    case 11:
      return 'md:col-span-1 md:col-start-4 md:row-start-4'
    default:
      return 'col-span-1'
  }
}
</script>

<template>
  <section class="certificates-section py-20">
    <div class="mb-10">
      <div
        class="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-accent-custom border border-accent-custom/20 rounded-full bg-accent-custom/5"
      >
        Credentials
      </div>
      <h2 class="text-3xl md:text-5xl font-bold text-text-custom font-archivo py-3">
        Certificates & Achievements
      </h2>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[25vh]"
    >
      <a
        v-for="(cert, index) in certificates"
        :key="cert.id"
        :href="cert.credential"
        target="_blank"
        rel="noopener noreferrer"
        :class="[
          'certificate-card group relative p-6 rounded-2xl bg-white/35 dark:bg-white/10 backdrop-blur-2xl border border-black/5 dark:border-white/12 flex flex-col justify-between overflow-hidden transition-all duration-300 ease-out hover:scale-[1.02] shadow-lg dark:shadow-2xl hover:shadow-accent-custom/10 h-full',
          getGridClasses(index),
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
            <div class="flex items-start justify-between pb-3">
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
              class="text-base md:text-lg font-bold text-text-custom pb-2 group-hover:text-accent-custom transition-colors font-archivo line-clamp-2"
            >
              {{ cert.name }}
            </h3>

            <!-- Show description on medium & large cards
            <p
              v-if="cert.size !== 'small' && cert.description"
              class="text-xs text-secondary-custom line-clamp-2 pb-3 leading-relaxed"
            >
              {{ cert.description }}
            </p> -->

            <!-- Show skills tags on medium & large cards -->
            <div v-if="cert.size !== 'small' && cert.skills" class="flex flex-wrap gap-1.5 pb-2">
              <span
                v-for="s in cert.skills"
                :key="s"
                class="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-secondary-custom border border-black/5 dark:border-white/5"
              >
                {{ s }}
              </span>
            </div>
          </div>

          <div
            class="space-y-1.5 pt-3 border-t border-black/5 dark:border-white/5 w-full flex items-center justify-between text-secondary-custom text-xs"
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
</template>
