<template>
  <div class="max-w-7xl mx-auto py-12 px-4 md:px-8">
    <SectionHead title="Certifications" />
    <div class="mt-8">
      <NuxtLink to="/">
        <BrutalistBtn color="white" class="mb-8">Back to Home</BrutalistBtn>
      </NuxtLink>
      <div v-if="certificates && certificates.length" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="cert in certificates" :key="cert.path" class="mb-8">
          <BrutalistCard color="white" class="p-6 h-full flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-4 border-b-2 border-brutal-black pb-3 mb-4">
                <div>
                  <h3 class="text-xl font-black uppercase tracking-tight text-brutal-black">
                    {{ cert.title }}
                  </h3>
                  <p class="font-bold text-sm text-brutal-blue uppercase mt-1">
                    {{ cert.meta.issuer }}
                  </p>
                </div>
                <BrutalistBadge color="yellow" class="shrink-0">
                  {{ cert.meta.year }}
                </BrutalistBadge>
              </div>
              <div class="prose max-w-none text-zinc-700 font-medium leading-relaxed mb-6">
                <ContentRenderer :value="cert" />
              </div>
              <div v-if="cert.meta.tech" class="flex flex-wrap gap-1.5 mb-6">
                <BrutalistBadge v-for="tag in cert.meta.tech" :key="tag" color="cream" class="text-xs py-1 px-2.5">
                  {{ tag }}
                </BrutalistBadge>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t-2 border-brutal-black pt-4 mt-auto">
              <span class="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                ID: {{ cert.meta.credentialId }}
              </span>
              <BrutalistBtn color="white" size="sm" class="sm:w-auto">
                Verify Link
              </BrutalistBtn>
            </div>
          </BrutalistCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: certificates } = await useAsyncData('certificates-detail', () => queryCollection('certificates').order('order', 'ASC').all())
</script>
