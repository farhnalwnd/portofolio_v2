<template>
  <span
    :class="[
      'inline-block px-3 py-1 font-bold text-xs uppercase border-2 border-brutal-black select-none',
      colorClass
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    color?: 'yellow' | 'blue' | 'red' | 'white' | 'cream'
  }>(),
  {
    color: 'white'
  }
)

const colorClass = computed(() => {
  switch (props.color) {
    case 'yellow':
      return 'bg-brutal-yellow text-brutal-black'
    case 'blue':
      return 'bg-brutal-blue text-white'
    case 'red':
      return 'bg-brutal-red text-white'
    case 'cream':
      return 'bg-brutal-cream text-brutal-black'
    case 'white':
    default:
      return 'bg-white text-brutal-black'
  }
})
</script>
