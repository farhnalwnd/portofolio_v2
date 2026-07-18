<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click="$emit('close')">
    <div class="w-full max-w-md p-4 animate-in fade-in zoom-in-95 duration-100" @click.stop>
      <BrutalistCard :color="status === 'success' ? 'green' : 'red'" class="p-6">
        <div class="flex flex-col items-center text-center space-y-6">
          <!-- Icon wrapper -->
          <div class="w-16 h-16 border-3 border-brutal-black bg-white flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Icon 
              :name="status === 'success' ? 'lucide:check-circle-2' : 'lucide:alert-triangle'" 
              class="w-10 h-10" 
              :class="status === 'success' ? 'text-brutal-green' : 'text-brutal-red'"
            />
          </div>

          <!-- Content -->
          <div class="space-y-2">
            <h3 class="text-2xl font-black uppercase tracking-tight text-brutal-black">
              {{ status === 'success' ? 'SUCCESS!' : 'FAILED!' }}
            </h3>
            <p class="font-bold uppercase tracking-tight text-sm text-brutal-black/80">
              {{ message }}
            </p>
          </div>

          <!-- Action button -->
          <BrutalistBtn 
            color="white" 
            class="w-full text-center"
            @click="$emit('close')"
          >
            Close
          </BrutalistBtn>
        </div>
      </BrutalistCard>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
  status: 'success' | 'error'
  message: string
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>
