<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  skills: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="hard-skills-section mb-32 w-full">
    <!-- Desktop: Single pinned container for GSAP horizontal scroll -->
    <div
      class="skill-category-container hidden md:block py-12 relative w-full bg-transparent backdrop-blur-2xl border-y border-black/5 dark:border-white/8"
    >
      <div class="max-w-7xl mx-auto px-4 mb-12">
        <h2 class="text-3xl md:text-5xl font-bold text-text-custom font-archivo pb-4">
          Technical Skills
        </h2>
      </div>

      <div class="w-full overflow-x-auto scrollbar-none">
        <div
          class="skill-category-track flex flex-row gap-8 md:gap-16 pb-4 w-max overflow-x-visible scrollbar-none px-4 md:px-12"
        >
          <div
            v-for="category in skills.hardSkills"
            :key="category.category"
            class="category-block shrink-0"
          >
            <h3
              class="text-xl md:text-2xl font-semibold text-accent-custom pb-1 md:pb-2 flex items-center gap-2"
            >
              <span class="w-2.5 h-2.5 rounded-full bg-accent-custom"></span>
              {{ category.category }}
            </h3>

            <div class="grid grid-rows-2 grid-flow-col gap-4 auto-cols-max">
              <div
                v-for="skill in category.items"
                :key="skill.name"
                class="skill-card group relative p-5 md:p-6 rounded-2xl bg-white dark:bg-white/10 backdrop-blur-2xl border border-black/5 dark:border-white/12 hover:border-accent-custom/30 hover:shadow-accent-custom/10 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden w-64 md:w-70 shrink-0 h-44 md:h-50 hover:scale-[1.02]"
              >
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
                      skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Intermediate'
                    }}
                  </span>
                </div>

                <div class="w-full z-10">
                  <span class="text-text-custom font-bold text-lg block mb-2">{{
                    skill.name
                  }}</span>
                  <div class="flex items-center gap-3">
                    <div
                      class="grow h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden"
                    >
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

    <!-- Mobile: Native touch horizontal scroll per category -->
    <div class="md:hidden py-8 px-4">
      <h2 class="text-3xl font-bold text-text-custom font-archivo pb-6">Technical Skills</h2>

      <div
        v-for="category in skills.hardSkills"
        :key="category.category"
        class="mobile-skill-category mb-8"
      >
        <h3 class="text-lg font-semibold text-accent-custom pb-3 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-accent-custom"></span>
          {{ category.category }}
        </h3>

        <div class="mobile-scroll-wrapper overflow-x-auto -mx-4 px-4 pb-3">
          <div class="flex gap-4 w-max">
            <div
              v-for="skill in category.items"
              :key="skill.name"
              class="skill-card group relative p-5 rounded-2xl bg-white dark:bg-white/10 backdrop-blur-2xl border border-black/5 dark:border-white/12 flex flex-col justify-between overflow-hidden w-56 shrink-0 h-44"
            >
              <div
                class="absolute -right-10 -bottom-10 w-24 h-24 bg-accent-custom/5 blur-xl rounded-full"
              ></div>

              <div class="flex justify-between items-start w-full mb-6 z-10">
                <Icon :icon="skill.icon" class="text-4xl text-accent-custom" />
                <span
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent-custom/10 text-accent-custom border border-accent-custom/20"
                >
                  {{
                    skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Intermediate'
                  }}
                </span>
              </div>

              <div class="w-full z-10">
                <span class="text-text-custom font-bold text-base block mb-2">{{
                  skill.name
                }}</span>
                <div class="flex items-center gap-3">
                  <div class="grow h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-accent-custom rounded-full"
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
  </section>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.mobile-scroll-wrapper::-webkit-scrollbar {
  display: none;
}
.mobile-scroll-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
}
.mobile-scroll-wrapper > div > * {
  scroll-snap-align: start;
}
</style>
