<template>
  <nav class="sticky top-0 z-50 bg-brutal-cream border-b-3 border-brutal-black px-4 md:px-8 py-4 flex items-center justify-between">
    <NuxtLink to="/" class="text-xl md:text-2xl font-black uppercase tracking-wider select-none hover:text-brutal-blue transition-colors">
      DEV // PORTFOLIO
    </NuxtLink>
    
    <div class="hidden md:flex items-center space-x-6">
      <NuxtLink v-for="link in navLinks" :key="link.href" :to="link.href" class="font-bold uppercase text-sm hover:underline hover:text-brutal-blue transition-colors">
        {{ link.label }}
      </NuxtLink>
    </div>
    
    <div>
      <NuxtLink to="/catch-me">
        <BrutalistBtn size="sm" color="yellow">Hire Me</BrutalistBtn>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navLinks = [
  { label: 'Intro', href: '/' },
  { label: 'History', href: '/history' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Certs', href: '/certificates' }
]
</script>
