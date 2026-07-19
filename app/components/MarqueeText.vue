<template>
  <div class="relative w-full overflow-hidden bg-brutal-black text-brutal-yellow py-4 border-y-3 border-brutal-black select-none z-20">
    <div :class="['flex whitespace-nowrap gap-3', reverse ? 'animate-marquee-reverse' : 'animate-marquee']">
      <div v-for="n in 2" :key="n" class="flex shrink-0 items-center gap-3">
        <Icon name="lucide:star" class="ml-8 text-brutal-yellow fill-brutal-yellow w-6 h-6 md:w-8 md:h-8" />
        <span v-for="(item, idx) in items" :key="idx" class="text-2xl md:text-4xl font-black uppercase tracking-widest px-1 flex items-center">{{ item }}
        <Icon name="lucide:star" class="ml-8 text-brutal-yellow fill-brutal-yellow w-6 h-6 md:w-8 md:h-8" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    items: string[]
    reverse?: boolean
  }>(),
  {
    reverse: false
  }
)
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 40s linear infinite;
  will-change: transform;
}

.animate-marquee-reverse {
  display: flex;
  width: max-content;
  animation: marquee-reverse 40s linear infinite;
  will-change: transform;
}
</style>
