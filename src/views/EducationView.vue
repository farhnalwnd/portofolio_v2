<script setup>
import { useAppBreakpoints } from '../composables/useBreakpoints.js'
import EducationViewMobile from './education/EducationViewMobile.vue'
import EducationViewDesktop from './education/EducationViewDesktop.vue'

const { isMobile } = useAppBreakpoints()
</script>

<template>
  <div class="w-full">
    <!-- Decorative Blobs -->
    <div
      class="fixed bottom-2/4 -left-14 w-[30vw] h-[40vh] bg-accent-custom/40 blur-[90px] rounded-full animate-mesh-1 pointer-events-none"
    ></div>
    <div
      class="fixed bottom-1/4 -right-1/12 w-[55vw] h-[40vh] bg-accent-custom/35 blur-[80px] rounded-full animate-mesh-2 pointer-events-none"
    ></div>
    <div
      class="fixed bottom-1/12 left-1/5 w-[30vw] h-[30vh] bg-purple-500/35 blur-[80px] rounded-full animate-mesh-2 pointer-events-none"
    ></div>

    <EducationViewDesktop v-if="!isMobile" />
    <EducationViewMobile v-else />
  </div>
</template>
