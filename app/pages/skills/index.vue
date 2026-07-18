<template>
  <div class="relative min-h-screen py-12 px-4 md:px-8 overflow-hidden">
    <!-- Dot Pattern Background -->
    <div class="absolute inset-0 opacity-10 pointer-events-none brutal-dot-pattern z-0"></div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <SectionHead title="Tech Stack & Skills" />
      <div v-if="skills" class="mt-8">
        <!-- Hard Skills Grid -->
        <h3 class="text-3xl font-black uppercase tracking-tight text-brutal-black mb-8 border-b-4 border-brutal-black pb-2 inline-block">
          Hard Skills
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <BrutalistCard v-for="(group, idx) in skills.meta.hardSkills" :key="group.category" color="white" class="p-6">
            <h3 :class="[
              'text-2xl font-black uppercase tracking-tight border-b-3 border-brutal-black pb-3 mb-6 flex items-center justify-between -mx-6 -mt-6 p-6',
              getHeaderColorClass(idx)
            ]">
              {{ group.category }}
              <Icon :name="getCategoryIcon(group.category)" class="w-6 h-6" />
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="tech in group.items" :key="tech.name" class="flex items-center space-x-3 p-3 border-2 border-brutal-black bg-brutal-cream shadow-brutal hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                <Icon :name="getTechIcon(tech.name)" class="w-8 h-8 shrink-0" />
                <span class="font-black text-sm uppercase text-brutal-black">{{ tech.name }}</span>
              </div>
            </div>
          </BrutalistCard>
        </div>

        <!-- Soft Skills Section -->
        <h3 class="text-3xl font-black uppercase tracking-tight text-brutal-black mb-8 border-b-4 border-brutal-black pb-2 inline-block">
          Soft Skills
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          <div 
            v-for="(skill, idx) in skills.meta.softSkills" 
            :key="skill.name" 
            :class="[
              'flex items-center justify-center p-4 border-3 border-brutal-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center',
              getSoftSkillColorClass(idx)
            ]"
          >
            <span class="font-black text-sm uppercase text-brutal-black">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Skills & Tech Stack',
  ogTitle: 'Skills & Tech Stack | Farhan Alwanda',
  ogDescription: 'Detailed technical skills, frameworks, languages, and tools mastered by Farhan Alwanda.'
})

const { data: skills } = await useAsyncData('skills-content', () => queryCollection('skills').first(), { default: () => ({ meta: { hardSkills: [], softSkills: [] } } as any) })

const getSoftSkillColorClass = (idx: number) => {
  const colors = [
    'bg-brutal-yellow',
    'bg-brutal-blue text-white',
    'bg-brutal-red text-white',
    'bg-brutal-green',
    'bg-brutal-orange',
    'bg-brutal-pink text-white',
    'bg-brutal-purple text-white',
    'bg-brutal-cream'
  ]
  return colors[idx % colors.length]
}

const getHeaderColorClass = (idx: number) => {
  const colors = [
    'bg-brutal-yellow text-brutal-black',
    'bg-brutal-blue text-white',
    'bg-brutal-red text-white',
    'bg-brutal-green text-brutal-black',
    'bg-brutal-orange text-brutal-black'
  ]
  return colors[idx % colors.length]
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'frontend':
      return 'lucide:monitor'
    case 'backend':
      return 'lucide:server'
    case 'database':
      return 'lucide:database'
    case 'devops & cloud':
      return 'lucide:wrench'
    case 'iot & hardware':
      return 'lucide:cpu'
    default:
      return 'lucide:code'
  }
}

const getTechIcon = (name: string) => {
  const icons: Record<string, string> = {
    'Vue.js': 'logos:vue',
    'Tailwind CSS': 'logos:tailwindcss-icon',
    'JavaScript': 'logos:javascript',
    'Flutter': 'logos:flutter',
    'Laravel': 'logos:laravel',
    'Filament': 'mdi:view-dashboard',
    'Go': 'logos:go',
    'Python': 'logos:python',
    'FastAPI': 'simple-icons:fastapi',
    'PostgreSQL': 'logos:postgresql',
    'MySQL': 'logos:mysql',
    'Redis': 'logos:redis',
    'MongoDB': 'logos:mongodb',
    'Docker': 'logos:docker-icon',
    'Git': 'logos:git-icon',
    'Linux': 'logos:linux-tux',
    'Nginx': 'logos:nginx',
    'ESP32': 'mdi:chip',
    'MQTT': 'lucide:radio',
    'Arduino': 'logos:arduino',
    'Raspberry Pi': 'logos:raspberry-pi'
  }
  return icons[name] || 'lucide:terminal'
}
</script>
