<template>
  <div class="max-w-7xl mx-auto py-12 px-4 md:px-8">
    <SectionHead title="Journey History" />
    <div class="mt-8">
      <NuxtLink to="/">
        <BrutalistBtn color="white" class="mb-8">Back to Home</BrutalistBtn>
      </NuxtLink>
      
      <div v-if="history && history.length" class="space-y-6">
        <div v-for="item in history" :key="item.path" class="mb-6">
          <BrutalistCard :color="item.meta.type === 'career' ? 'white' : 'cream'" class="p-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-brutal-black pb-3 mb-4">
              <div>
                <BrutalistBadge :color="item.meta.type === 'career' ? 'yellow' : 'blue'" class="mb-2">
                  {{ item.meta.type }}
                </BrutalistBadge>
                <h4 class="text-2xl font-black uppercase tracking-tight text-brutal-black">
                  {{ item.title }}
                </h4>
              </div>
              <div class="text-right">
                <p class="font-bold text-sm bg-brutal-black text-white px-3 py-1 uppercase inline-block">
                  {{ item.meta.period }}
                </p>
                <p class="font-black text-sm uppercase text-brutal-blue mt-1">
                  {{ item.meta.institution }}
                </p>
              </div>
            </div>
            <div class="prose max-w-none text-zinc-700 font-medium leading-relaxed">
              <ContentRenderer :value="item" />
            </div>
          </BrutalistCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: history } = await useAsyncData('history-detail', () => queryCollection('history').order('order', 'ASC').all())
</script>
