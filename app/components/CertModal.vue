<template>
  <div v-if="cert" class="brutal-modal-backdrop" @click="$emit('close')">
    <div class="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4" @click.stop>
      <div class="relative">
        <BrutalistCard color="white" class="p-6">
          <div class="flex flex-col lg:flex-row gap-6">
            <!-- Left Info Panel -->
            <div class="w-full lg:w-1/3 flex flex-col justify-between border-b-3 lg:border-b-0 lg:border-r-3 border-brutal-black pb-6 lg:pb-0 lg:pr-6">
              <div>
                <BrutalistBadge color="yellow" class="mb-2">{{ cert.meta.year }}</BrutalistBadge>
                <h3 class="text-2xl font-black uppercase tracking-tight text-brutal-black">
                  {{ cert.title }}
                </h3>
                <p class="font-black text-sm uppercase text-brutal-blue mt-1 mb-4">
                  {{ cert.meta.issuer }}
                </p>
                <div class="prose text-zinc-700 font-bold uppercase tracking-tight text-sm leading-relaxed mb-6">
                  <ContentRenderer :value="cert" />
                </div>
                <div v-if="cert.meta.tech" class="flex flex-wrap gap-1.5 mb-6">
                  <BrutalistBadge v-for="tag in cert.meta.tech" :key="tag" color="cream" class="text-xs py-1 px-2.5">
                    {{ tag }}
                  </BrutalistBadge>
                </div>
              </div>
              
              <div class="space-y-4 pt-4 border-t-2 border-brutal-black">
                <div>
                  <span class="block text-xs font-mono text-zinc-500 uppercase tracking-widest">Credential ID:</span>
                  <span class="font-mono text-sm font-black text-brutal-black uppercase tracking-wider">{{ cert.meta.credentialId }}</span>
                </div>
                <div class="flex gap-2">
                  <BrutalistBtn :to="cert.meta.credentialUrl" color="blue" size="sm" class="flex-grow text-white">
                    Verify Original
                  </BrutalistBtn>
                  <a 
                    v-if="cert.meta.file"
                    :href="cert.meta.file" 
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
                v-if="cert.meta.file && cert.meta.file.endsWith('.pdf')"
                :src="`${cert.meta.file}#toolbar=0&navpanes=0&scrollbar=0`" 
                class="w-full h-full border-none"
              ></iframe>
              <img 
                v-else-if="cert.meta.file"
                :src="cert.meta.file"
                class="w-full h-full object-contain bg-zinc-900 aspect-video"
                width="800"
                height="450"
                loading="lazy"
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
        <button class="brutal-close-btn" aria-label="Close certificate modal" @click="$emit('close')">
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cert: any
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>
