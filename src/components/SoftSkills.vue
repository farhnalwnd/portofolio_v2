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
  <section class="soft-skills-section mb-20 py-10">
    <h2 class="text-3xl md:text-4xl font-bold text-text-custom mb-10 font-archivo pb-4">
      Soft Skills
    </h2>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-2">
      <div
        v-for="skill in skills.softSkills"
        :key="skill.name"
        class="soft-skill-item p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer aspect-square shadow-lg"
      >
        <div class="relative mb-3 flex items-center justify-center">
          <div
            class="absolute inset-0 bg-purple-500/20 blur-md rounded-full scale-0 group-hover:scale-110 transition-transform duration-300"
          ></div>
          <Icon
            :icon="skill.icon"
            class="text-4xl relative z-10 text-purple-400 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <span class="text-sm text-text-custom font-semibold tracking-wide">{{ skill.name }}</span>
      </div>
    </div>
  </section>
</template>
