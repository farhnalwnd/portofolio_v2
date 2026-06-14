<script setup>
import { useAppBreakpoints } from '../composables/useBreakpoints.js'
import TechnicalSkillsMobile from './skills/TechnicalSkillsMobile.vue'
import TechnicalSkillsDesktop from './skills/TechnicalSkillsDesktop.vue'

const { isDesktop } = useAppBreakpoints()

defineProps({
  skills: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="hard-skills-section mb-32 w-full">
    <TechnicalSkillsDesktop v-if="isDesktop" :skills="skills" />
    <TechnicalSkillsMobile v-else :skills="skills" />
  </section>
</template>
