<template>
  <div class="relative min-h-screen py-12 px-4 md:px-8 overflow-hidden">
    <!-- Dot Pattern Background -->
    <div class="absolute inset-0 opacity-10 pointer-events-none brutal-dot-pattern z-0"></div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <SectionHead :title="$t('history.title')" tag="h1" />
      <div class="mt-12 relative border-l-4 border-brutal-black pl-8 ml-4 md:ml-8 space-y-12">
        <!-- Vertically Centered Dot Indicator (Brutalist style) -->
        <div v-for="item in history" :key="item.path" class="relative">
          <!-- Dot -->
          <span 
            :class="[
              'absolute -left-[45px] top-1.5 w-7 h-7 rounded-full border-3 border-brutal-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors',
              item.meta.type === 'career' ? 'bg-brutal-yellow' : 'bg-brutal-blue'
            ]"
          ></span>
          
          <!-- Timeline Content Card -->
          <BrutalistCard :color="item.meta.type === 'career' ? 'white' : 'cream'" class="p-6 md:p-8">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-brutal-black pb-4 mb-6">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <BrutalistBadge :color="item.meta.type === 'career' ? 'bg-brutal-yellow' : 'bg-brutal-blue'" class="text-xs uppercase">
                    {{ item.meta.type }}
                  </BrutalistBadge>
                  <span class="text-xs font-black uppercase text-zinc-700 tracking-wider">
                    {{ item.meta.location }}
                  </span>
                </div>
                <h2 class="text-2xl md:text-3xl font-black uppercase tracking-tight text-brutal-black">
                  {{ item.title }}
                </h2>
              </div>
              <div class="flex flex-col items-start md:items-end">
                <span class="font-black text-sm bg-brutal-black text-white px-3 py-1.5 uppercase tracking-wider inline-block border-2 border-brutal-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {{ item.meta.period }}
                </span>
                <p class="font-black text-sm uppercase text-brutal-blue mt-2 tracking-wide">
                  {{ item.meta.institution }}
                </p>
              </div>
            </div>
            
            <div class="prose max-w-none text-zinc-800 font-bold uppercase tracking-tight leading-relaxed">
              <ContentRenderer :value="item" />
            </div>
          </BrutalistCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Journey History',
  ogTitle: 'Journey History | Farhan Alwanda',
  ogDescription: 'Experience timeline, career history, and educational journey of Farhan Alwanda.'
})

const { data: history } = await useAsyncData('history-detail', () => queryCollection('history').order('order', 'ASC').all(), { default: () => [] })
</script>
