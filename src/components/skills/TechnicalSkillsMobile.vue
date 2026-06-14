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
  <div class="py-8 px-4">
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
</template>

<style scoped>
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
