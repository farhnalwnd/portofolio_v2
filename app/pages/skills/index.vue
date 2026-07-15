<template>
  <div class="max-w-7xl mx-auto py-12 px-4 md:px-8">
    <SectionHead title="Tech Stack & Skills" />
    <div class="mt-8">
      <NuxtLink to="/">
        <BrutalistBtn color="white" class="mb-8">Back to Home</BrutalistBtn>
      </NuxtLink>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Frontend -->
        <BrutalistCard color="white" class="p-6">
          <h3 class="text-2xl font-black uppercase tracking-tight border-b-3 border-brutal-black pb-3 mb-6 flex items-center justify-between bg-brutal-yellow -mx-6 -mt-6 p-6">
            Frontend Development
            <Icon name="lucide:monitor" class="w-6 h-6 text-brutal-black" />
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="tech in techStack.frontend" :key="tech.name" class="flex items-center space-x-3 p-3 border-2 border-brutal-black bg-brutal-cream shadow-brutal hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              <Icon :name="tech.icon" class="w-8 h-8 shrink-0" />
              <span class="font-black text-sm uppercase text-brutal-black">{{ tech.name }}</span>
            </div>
          </div>
        </BrutalistCard>

        <!-- Backend -->
        <BrutalistCard color="white" class="p-6">
          <h3 class="text-2xl font-black uppercase tracking-tight border-b-3 border-brutal-black pb-3 mb-6 flex items-center justify-between bg-brutal-blue text-white -mx-6 -mt-6 p-6">
            Backend Development
            <Icon name="lucide:server" class="w-6 h-6 text-white" />
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="tech in techStack.backend" :key="tech.name" class="flex items-center space-x-3 p-3 border-2 border-brutal-black bg-brutal-cream shadow-brutal hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              <Icon :name="tech.icon" class="w-8 h-8 shrink-0" />
              <span class="font-black text-sm uppercase text-brutal-black">{{ tech.name }}</span>
            </div>
          </div>
        </BrutalistCard>

        <!-- Tools -->
        <BrutalistCard color="white" class="p-6">
          <h3 class="text-2xl font-black uppercase tracking-tight border-b-3 border-brutal-black pb-3 mb-6 flex items-center justify-between bg-brutal-red text-white -mx-6 -mt-6 p-6">
            DevOps & Tools
            <Icon name="lucide:wrench" class="w-6 h-6 text-white" />
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="tech in techStack.tools" :key="tech.name" class="flex items-center space-x-3 p-3 border-2 border-brutal-black bg-brutal-cream shadow-brutal hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              <Icon :name="tech.icon" class="w-8 h-8 shrink-0" />
              <span class="font-black text-sm uppercase text-brutal-black">{{ tech.name }}</span>
            </div>
          </div>
        </BrutalistCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const techStack = {
  frontend: [
    { name: 'Nuxt', icon: 'logos:nuxt-icon' },
    { name: 'Vue 3', icon: 'logos:vue' },
    { name: 'Tailwind', icon: 'logos:tailwindcss-icon' },
    { name: 'VueUse', icon: 'logos:vueuse' }
  ],
  backend: [
    { name: 'Node.js', icon: 'logos:nodejs-icon' },
    { name: 'TypeScript', icon: 'logos:typescript-icon' },
    { name: 'PostgreSQL', icon: 'logos:postgresql' },
    { name: 'NestJS', icon: 'logos:nestjs' }
  ],
  tools: [
    { name: 'Git', icon: 'logos:git-icon' },
    { name: 'Docker', icon: 'logos:docker-icon' },
    { name: 'VS Code', icon: 'logos:visual-studio-code' }
  ]
}
</script>
