<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    :to="to"
    :type="to ? undefined : type"
    :class="[
      'inline-flex items-center justify-center font-bold uppercase tracking-wider border-3 border-brutal-black transition-all duration-100 select-none cursor-pointer',
      colorClass,
      sizeClass,
      'hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none shadow-brutal active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    to?: string
    type?: 'button' | 'submit' | 'reset'
    color?: 'yellow' | 'blue' | 'red' | 'white' | 'black'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    type: 'button',
    color: 'yellow',
    size: 'md'
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
    case 'white':
      return 'bg-white text-brutal-black'
    case 'black':
      return 'bg-brutal-black text-white'
    default:
      return 'bg-brutal-yellow text-brutal-black'
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-4 py-2 text-sm'
    case 'md':
      return 'px-6 py-3 text-base'
    case 'lg':
      return 'px-8 py-4 text-lg'
    default:
      return 'px-6 py-3'
  }
})
</script>
