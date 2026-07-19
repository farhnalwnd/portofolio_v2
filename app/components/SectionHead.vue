<template>
  <div class="relative mb-12 select-none section-head-container">
    <component
      :is="tag || 'h2'"
      class="text-5xl md:text-8xl font-black uppercase tracking-tighter text-transparent opacity-20 absolute -top-4 -left-2 md:-top-8 md:-left-4 z-0 pointer-events-none"
      :style="{ '-webkit-text-stroke': '2px #09090B' }"
    >
      {{ title }}
    </component>
    <component
      :is="tag || 'h2'"
      class="relative z-10 text-4xl md:text-7xl font-black uppercase tracking-tight text-brutal-black"
    >
      {{ title }}
    </component>
    <div class="w-24 h-3 bg-brutal-blue border-3 border-brutal-black mt-2"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>()
</script>
