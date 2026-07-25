<template>
  <div 
    class="border-3 border-brutal-black bg-zinc-300 animate-pulse shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
    :class="[width, height]"
  ></div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  width?: string
  height?: string
}>(), {
  width: 'w-full',
  height: 'h-4'
})
</script>
