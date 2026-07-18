<template>
  <div class="relative min-h-screen py-12 px-4 md:px-8 overflow-hidden">
    <!-- Grid Pattern Background -->
    <div class="absolute inset-0 opacity-10 pointer-events-none brutal-grid-pattern z-0"></div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <SectionHead title="Certifications" />
      <div class="mt-8">
        <div v-if="certificates && certificates.length" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(cert, idx) in certificates" 
            :key="cert.path" 
            class="mb-8 cursor-pointer"
            @click="openCertPreview(cert)"
          >
            <!-- Card -->
            <BrutalistCard :color="getCertCardColor(idx)" class="p-6 h-full flex flex-col justify-between hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-100">
              <!-- Main Content -->
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
                  <BrutalistBadge color="yellow" class="shrink-0 border-2">
                    {{ cert.meta.year }}
                  </BrutalistBadge>
                </div>
                <div class="prose max-w-none text-zinc-700 font-bold uppercase tracking-tight leading-relaxed mb-6">
                  <ContentRenderer :value="cert" />
                </div>
                <div v-if="cert.meta.tech" class="flex flex-wrap gap-1.5 mb-6">
                  <BrutalistBadge v-for="tag in cert.meta.tech" :key="tag" color="white" class="text-xs py-1 px-2.5">
                    {{ tag }}
                  </BrutalistBadge>
                </div>
              </div>

              <!-- Footer Details -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t-2 border-brutal-black pt-4 mt-auto">
                <span class="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                  ID: {{ cert.meta.credentialId }}
                </span>
                <span class="font-black text-xs text-brutal-blue uppercase hover:underline">
                  Click to View & Verify
                </span>
              </div>
            </BrutalistCard>
          </div>
        </div>
      </div>
    </div>

    <!-- Certificate Preview Modal -->
    <CertModal :cert="activeCert" @close="closeCertPreview" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useSeoMeta({
  title: 'Certificates',
  ogTitle: 'Certifications | Farhan Alwanda',
  ogDescription: 'Verified professional certifications and technical achievements of Farhan Alwanda.'
})

const { data: certificates } = await useAsyncData('certificates-detail', () => queryCollection('certificates').order('order', 'ASC').all(), { default: () => [] })

const activeCert = ref<any>(null)

const openCertPreview = (cert: any) => {
  activeCert.value = cert
}

const closeCertPreview = () => {
  activeCert.value = null
}

const getCertCardColor = (idx: number) => {
  const colors = ['white', 'cream']
  return colors[idx % colors.length] as any
}
</script>
