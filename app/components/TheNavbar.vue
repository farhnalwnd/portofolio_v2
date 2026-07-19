<template>
  <nav class="sticky top-0 z-50 bg-brutal-cream border-b-3 border-brutal-black px-4 md:px-8 py-4 flex items-center justify-between">
    <NuxtLink to="/" class="text-xl md:text-2xl font-black uppercase tracking-wider select-none hover:text-brutal-blue transition-colors">
      Farhan_Alwanda;
    </NuxtLink>
    
    <!-- Desktop Navigation -->
    <div class="hidden xl:flex items-center space-x-6">
      <NuxtLink 
        v-for="link in navLinks" 
        :key="link.href" 
        :to="link.href" 
        class="font-bold uppercase text-sm hover:text-brutal-blue transition-colors px-2 py-1 border-2 border-transparent"
        active-class="bg-brutal-black text-white border-brutal-black"
        exact-active-class="bg-brutal-black text-white border-brutal-black"
      >
        {{ link.label }}
      </NuxtLink>
    </div>
    
    <div class="flex items-center gap-4">
      <NuxtLink to="/catch-me" class="hidden xl:inline-block">
        <BrutalistBtn size="sm" color="yellow">Touch Me</BrutalistBtn>
      </NuxtLink>

      <!-- Mobile Menu Button -->
      <button 
        class="xl:hidden flex items-center justify-center p-2 border-3 border-brutal-black bg-white hover:bg-brutal-yellow transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        @click="toggleMenu"
      >
        <Icon :name="isOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6 text-brutal-black" />
      </button>
    </div>

    <!-- Mobile Drawer Overlay -->
    <Teleport to="body">
      <div 
        v-if="isOpen"
        class="xl:hidden fixed top-[75px] left-0 w-full h-[calc(100vh-75px)] bg-brutal-black/50 z-40"
        @click="closeMenu"
      >
        <!-- Mobile Drawer Content -->
        <div 
          class="w-3/4 max-w-sm h-full bg-brutal-cream border-r-3 border-brutal-black p-6 flex flex-col justify-between shadow-[4px_0px_0px_0px_rgba(0,0,0,1)]"
          @click.stop
        >
          <div class="flex flex-col space-y-6">
            <span class="font-black text-xl border-b-3 border-brutal-black pb-2 text-brutal-black">MENU</span>
            <NuxtLink 
              v-for="link in navLinks" 
              :key="link.href" 
              :to="link.href" 
              class="font-black uppercase text-lg text-brutal-black hover:text-brutal-blue py-2 px-3 border-3 border-transparent"
              active-class="bg-brutal-black text-white border-brutal-black"
              exact-active-class="bg-brutal-black text-white border-brutal-black"
              @click="closeMenu"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
          <div class="pt-6 border-t-3 border-brutal-black">
            <NuxtLink to="/catch-me" @click="closeMenu">
              <BrutalistBtn size="md" color="yellow" class="w-full text-center">Touch Me</BrutalistBtn>
            </NuxtLink>
          </div>
        </div>
      </div>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const navLinks = [
  { label: 'Intro', href: '/' },
  { label: 'History', href: '/history' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Certs', href: '/certificates' }
]
</script>
