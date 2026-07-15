<template>
  <div
    :class="[
      'border-3 border-brutal-black bg-white transition-all duration-150',
      hover ? 'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg shadow-brutal' : 'shadow-brutal',
      colorClass
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    color?: 'white' | 'yellow' | 'blue' | 'red' | 'cream'
    hover?: boolean
  }>(),
  {
    color: 'white',
    hover: true
  }
)

const colorClass = computed(() => {
  switch (props.color) {
    case 'white':
      return 'bg-white text-brutal-black'
    case 'yellow':
      return 'bg-brutal-yellow text-brutal-black'
    case 'blue':
      return 'bg-brutal-blue text-white'
    case 'red':
      return 'bg-brutal-red text-white'
    case 'cream':
      return 'bg-brutal-cream text-brutal-black'
    default:
      return 'bg-white text-brutal-black'
  }
})
</script>
