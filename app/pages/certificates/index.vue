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
    <div v-if="activeCert" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click="closeCertPreview">
      <div class="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4" @click.stop>
        <div class="relative">
          <BrutalistCard color="white" class="p-6">
            <div class="flex flex-col lg:flex-row gap-6">
            <!-- Left Info Panel -->
            <div class="w-full lg:w-1/3 flex flex-col justify-between border-b-3 lg:border-b-0 lg:border-r-3 border-brutal-black pb-6 lg:pb-0 lg:pr-6">
              <div>
                <BrutalistBadge color="yellow" class="mb-2">{{ activeCert.meta.year }}</BrutalistBadge>
                <h3 class="text-2xl font-black uppercase tracking-tight text-brutal-black">
                  {{ activeCert.title }}
                </h3>
                <p class="font-black text-sm uppercase text-brutal-blue mt-1 mb-4">
                  {{ activeCert.meta.issuer }}
                </p>
                <div class="prose text-zinc-700 font-bold uppercase tracking-tight text-sm leading-relaxed mb-6">
                  <ContentRenderer :value="activeCert" />
                </div>
                <div v-if="activeCert.meta.tech" class="flex flex-wrap gap-1.5 mb-6">
                  <BrutalistBadge v-for="tag in activeCert.meta.tech" :key="tag" color="cream" class="text-xs py-1 px-2.5">
                    {{ tag }}
                  </BrutalistBadge>
                </div>
              </div>
              
              <div class="space-y-4 pt-4 border-t-2 border-brutal-black">
                <div>
                  <span class="block text-xs font-mono text-zinc-500 uppercase tracking-widest">Credential ID:</span>
                  <span class="font-mono text-sm font-black text-brutal-black uppercase tracking-wider">{{ activeCert.meta.credentialId }}</span>
                </div>
                <div class="flex gap-2">
                  <BrutalistBtn :to="activeCert.meta.credentialUrl" color="blue" size="sm" class="flex-grow text-white">
                    Verify Original
                  </BrutalistBtn>
                  <a 
                    v-if="activeCert.meta.file"
                    :href="activeCert.meta.file" 
                    download
                    class="bg-brutal-yellow text-brutal-black border-3 border-brutal-black font-black uppercase text-xs px-4 py-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-1 shadow-brutal"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>

            <!-- Right Preview Panel -->
            <div class="w-full lg:w-2/3 h-[250px] sm:h-[350px] lg:h-[500px] border-3 border-brutal-black bg-white overflow-hidden relative">
              <iframe 
                v-if="activeCert.meta.file && activeCert.meta.file.endsWith('.pdf')"
                :src="`${activeCert.meta.file}#toolbar=0&navpanes=0&scrollbar=0`" 
                class="w-full h-full border-none"
              ></iframe>
              <img 
                v-else-if="activeCert.meta.file"
                :src="activeCert.meta.file"
                class="w-full h-full object-contain bg-zinc-900"
                alt="Certificate Original File"
              />
              <div v-else class="flex flex-col items-center justify-center h-full bg-brutal-cream p-8 text-center">
                <Icon name="lucide:award" class="w-16 h-16 text-brutal-yellow mb-4" />
                <span class="font-black text-lg uppercase">No document preview available</span>
              </div>
            </div>
          </div>
        </BrutalistCard>
        
        <!-- Close button -->
        <button class="absolute -top-3 -right-3 w-8 h-8 bg-brutal-red text-white border-2 border-brutal-black font-black flex items-center justify-center hover:bg-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-30" @click="closeCertPreview">
          ✕
        </button>
      </div>
    </div>
  </div>
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
