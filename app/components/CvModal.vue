<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click="$emit('close')">
    <div class="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4" @click.stop>
      <div class="relative">
        <BrutalistCard color="white" class="p-6">
          <div class="flex flex-col lg:flex-row gap-6">
            <!-- Left Info Panel -->
            <div class="w-full lg:w-1/3 flex flex-col justify-between border-b-3 lg:border-b-0 lg:border-r-3 border-brutal-black pb-6 lg:pb-0 lg:pr-6">
              <div>
                <BrutalistBadge color="yellow" class="mb-2">CV</BrutalistBadge>
                <h3 class="text-2xl font-black uppercase tracking-tight text-brutal-black">
                  Farhan Alwanda
                </h3>
                <p class="font-black text-sm uppercase text-brutal-blue mt-1 mb-4">
                  Curriculum Vitae
                </p>
                <p class="text-zinc-700 font-bold uppercase tracking-tight text-sm leading-relaxed mb-6">
                  Full-Stack Developer & AI Engineer
                </p>
              </div>
              
              <div class="space-y-4 pt-4 border-t-2 border-brutal-black">
                <div class="flex gap-2">
                  <a 
                    href="/CV/farhan-alwanda_cv.pdf" 
                    download
                    class="w-full bg-brutal-yellow text-brutal-black border-3 border-brutal-black font-black uppercase text-xs px-4 py-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-1 shadow-brutal text-center"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </div>

            <!-- Right Preview Panel -->
            <div class="w-full lg:w-2/3 h-[250px] sm:h-[350px] lg:h-[500px] border-3 border-brutal-black bg-white overflow-hidden relative">
              <iframe 
                src="/CV/farhan-alwanda_cv.pdf#toolbar=0&navpanes=0&scrollbar=0" 
                class="w-full h-full border-none"
              ></iframe>
            </div>
          </div>
        </BrutalistCard>
        
        <!-- Close button -->
        <button class="absolute -top-3 -right-3 w-8 h-8 bg-brutal-red text-white border-2 border-brutal-black font-black flex items-center justify-center hover:bg-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-30" @click="$emit('close')">
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>
