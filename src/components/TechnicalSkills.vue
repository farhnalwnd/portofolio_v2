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
    <!-- Single pinned container for all categories -->
    <div class="skill-category-container py-12 relative w-full bg-white/1 border-y border-white/5">
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
              class="text-xl md:text-2xl font-semibold text-accent-custom pb-2 flex items-center gap-2"
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
                      skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Intermediate'
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
</template>
