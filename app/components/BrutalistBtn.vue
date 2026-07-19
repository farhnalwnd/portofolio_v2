<template>
  <NuxtLink
    v-if="to && !isExternal"
    :to="to"
    class="inline-flex items-center justify-center font-bold uppercase tracking-wider border-3 border-brutal-black transition-all duration-100 select-none cursor-pointer hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none shadow-brutal active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
    :class="[colorClass, sizeClass]"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="to && isExternal"
    :href="to"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center justify-center font-bold uppercase tracking-wider border-3 border-brutal-black transition-all duration-100 select-none cursor-pointer hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none shadow-brutal active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
    :class="[colorClass, sizeClass]"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    class="inline-flex items-center justify-center font-bold uppercase tracking-wider border-3 border-brutal-black transition-all duration-100 select-none cursor-pointer hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none shadow-brutal active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
    :class="[colorClass, sizeClass]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    to?: string
    type?: 'button' | 'submit' | 'reset'
    color?: 'yellow' | 'blue' | 'red' | 'white' | 'black' | 'purple' | 'pink' | 'green' | 'orange' | 'cream'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    type: 'button',
    color: 'yellow',
    size: 'md'
  }
)

const isExternal = computed(() => {
  return props.to ? /^(https?:)?\/\//.test(props.to) : false
})

const colorClass = computed(() => {
  switch (props.color) {
    case 'yellow':
      return 'bg-brutal-yellow text-brutal-black'
    case 'blue':
      return 'bg-brutal-blue text-white font-black'
    case 'red':
      return 'bg-brutal-red text-white font-black'
    case 'white':
      return 'bg-white text-brutal-black'
    case 'black':
      return 'bg-brutal-black text-white font-black'
    case 'purple':
      return 'bg-brutal-purple text-white font-black'
    case 'pink':
      return 'bg-brutal-pink text-white font-black'
    case 'green':
      return 'bg-brutal-green text-brutal-black'
    case 'orange':
      return 'bg-brutal-orange text-brutal-black'
    case 'cream':
      return 'bg-brutal-cream text-brutal-black'
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
