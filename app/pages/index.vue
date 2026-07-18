<template>
  <div class="w-full flex-grow flex flex-col">
    <!-- 1. Intro Section -->
    <section id="intro" class="relative min-h-[90vh] flex flex-col justify-between py-16 px-4 md:px-8 border-b-3 border-brutal-black bg-brutal-cream overflow-hidden">
      <!-- Background grid decoration -->
      <div class="absolute inset-0 opacity-10 pointer-events-none brutal-dot-pattern"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto w-full flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Text intro -->
        <div class="lg:col-span-7 flex flex-col space-y-6">
          <div class="inline-flex">
            <BrutalistBadge color="blue" class="text-sm py-1.5 px-4">Full-Stack Developer & AI Engineer</BrutalistBadge>
          </div>
          <h1 class="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-brutal-black">
            FARHAN <span class="bg-brutal-orange px-2 inline-block transform -rotate-1 border-3 border-brutal-black">ALWANDA</span>
          </h1>
          <p class="text-xl md:text-2xl font-bold uppercase tracking-tight text-brutal-black max-w-2xl">
            I am passionate about designing well-structured and highly optimized applications through the integration of Artificial Intelligence with smart IoT devices. Less clutter, pure performance, and bold aesthetics.
          </p>
          <div class="flex flex-wrap gap-4 pt-4">
            <NuxtLink to="/projects">
              <BrutalistBtn color="purple" size="lg">My Projects</BrutalistBtn>
            </NuxtLink>
            <NuxtLink to="/catch-me">
              <BrutalistBtn color="white" size="lg">Let's Talk</BrutalistBtn>
            </NuxtLink>
          </div>
        </div>

        <!-- Visual / Graphic Block -->
        <div class="lg:col-span-5 flex justify-center items-center">
          <BrutalistCard color="white" class="p-6 md:p-8 max-w-md w-full relative transform rotate-2">
            <div class="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-brutal-pink text-white font-bold uppercase tracking-wider text-xs border-2 border-brutal-black px-3 py-1.5 z-20">
              BASED IN ID
            </div>
            <div class="flex items-center space-x-3 border-b-3 border-brutal-black pb-4 mb-6">
              <div class="w-4 h-4 rounded-full bg-brutal-red border-2 border-brutal-black"></div>
              <div class="w-4 h-4 rounded-full bg-brutal-orange border-2 border-brutal-black"></div>
              <div class="w-4 h-4 rounded-full bg-brutal-blue border-2 border-brutal-black"></div>
              <span class="font-bold text-xs uppercase text-zinc-500 tracking-wider">whoami</span>
            </div>
            
            <p class="font-mono text-sm leading-relaxed text-zinc-800 mb-6">
              &gt; nick: alwand<br>
              &gt; status: fresh graduate<br>
              &gt; stack: laravel / vue / python <br>
              &gt; motto: figure out that next step and aim for it.
            </p>

            <div class="flex items-center justify-between border-t-3 border-brutal-black pt-4">
              <span class="font-black text-xl text-brutal-black uppercase tracking-wider"></span>
              <Icon name="lucide:terminal" class="w-8 h-8 text-brutal-black" />
            </div>
          </BrutalistCard>
        </div>
      </div>

      <!-- Marquee at the bottom of Intro -->
      <div class="w-auto -mx-4 md:-mx-8 mt-12">
        <MarqueeText :items="marqueeItems" />
      </div>
    </section>

    <!-- 2. Grid Section (Featured Projects & Certificates) - 3 Columns -->
    <section class="grid grid-cols-1 lg:grid-cols-3 border-b-3 border-brutal-black">
      <!-- Featured Project (Col Span 2) -->
      <div class="lg:col-span-2 p-8 border-b-3 lg:border-b-0 lg:border-r-3 border-brutal-black bg-brutal-cream flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-center border-b-3 border-brutal-black pb-4 mb-6">
            <h2 class="text-3xl font-black uppercase tracking-tight text-brutal-black">
              Featured Project
            </h2>
            <div class="flex items-center space-x-2">
              <BrutalistBtn color="white" size="sm" @click="prevProject">
                <Icon name="lucide:arrow-left" class="w-5 h-5" />
              </BrutalistBtn>
              <BrutalistBtn color="white" size="sm" @click="nextProject">
                <Icon name="lucide:arrow-right" class="w-5 h-5" />
              </BrutalistBtn>
            </div>
          </div>

          <div v-if="featuredProjects && featuredProjects.length" class="transition-all duration-300">
            <BrutalistCard color="white" class="p-6">
              <!-- Asset Image placeholder above title -->
              <div 
                :class="[
                  'w-full h-48 border-3 border-brutal-black flex flex-col items-center justify-center mb-6 relative overflow-hidden transition-colors duration-300',
                  getProjectBgColor(currentProjectIndex)
                ]"
              >
                <!-- Grid Pattern Decorator -->
                <div class="absolute inset-0 opacity-10 pointer-events-none brutal-grid-pattern"></div>
                <div class="text-white font-black text-3xl tracking-widest uppercase relative z-10 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">// PROJECT {{ currentProjectIndex + 1 }}</div>
                <div class="text-white/80 font-black text-xs tracking-wider uppercase relative z-10 mt-2 drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  click "view detail to see image"
                </div>
              </div>

              <div class="flex items-center justify-between mb-4 border-b-2 border-brutal-black pb-3">
                <h3 class="text-2xl font-black uppercase tracking-tight text-brutal-black">
                  {{ featuredProjects[currentProjectIndex].title }}
                </h3>
                <Icon name="lucide:folder-git-2" class="w-8 h-8 text-brutal-blue" />
              </div>
              
              <p class="text-zinc-700 font-medium mb-6">
                {{ featuredProjects[currentProjectIndex].description }}
              </p>

              <div class="flex flex-wrap gap-2 mb-6">
                <BrutalistBadge v-for="tag in featuredProjects[currentProjectIndex].tech" :key="tag" color="pink">
                  {{ tag }}
                </BrutalistBadge>
              </div>

              <!-- Indicator Dots -->
              <div class="flex items-center justify-center space-x-2 mb-4">
                <span 
                  v-for="(proj, idx) in featuredProjects" 
                  :key="proj.path" 
                  :class="['w-3 h-3 rounded-full border-2 border-brutal-black transition-colors', idx === currentProjectIndex ? 'bg-brutal-orange' : 'bg-white']"
                ></span>
              </div>

              <div class="flex items-center space-x-4 border-t-2 border-brutal-black pt-4">
                <NuxtLink :to="`/projects/${getProjectSlug(featuredProjects[currentProjectIndex])}/detail`" class="inline-flex">
                  <BrutalistBtn color="green" size="sm">
                    View Detail
                  </BrutalistBtn>
                </NuxtLink>
              </div>
            </BrutalistCard>
          </div>
        </div>

        <div class="mt-8 flex justify-start">
          <NuxtLink to="/projects">
            <BrutalistBtn color="white">View All Projects</BrutalistBtn>
          </NuxtLink>
        </div>
      </div>

      <!-- Featured Certificates (Col Span 1) -->
      <div class="lg:col-span-1 p-8 bg-white flex flex-col justify-between">
        <div>
          <h2 class="text-3xl font-black uppercase tracking-tight text-brutal-black border-b-3 border-brutal-black pb-4 mb-6">
            Certifications
          </h2>

          <div class="space-y-4">
            <div 
              v-for="cert in certificates?.slice(0, 3)" 
              :key="cert.path" 
              class="cursor-pointer"
              @click="openCertPreview(cert)"
            >
              <BrutalistCard color="cream" class="p-4 hover:bg-brutal-purple transition-colors">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h4 class="font-black uppercase text-sm text-brutal-black line-clamp-1">
                      {{ cert.title }}
                    </h4>
                    <p class="text-xs text-zinc-500 font-bold uppercase mt-1">
                      {{ cert.meta.issuer }}
                    </p>
                  </div>
                  <Icon name="lucide:external-link" class="w-4 h-4 text-brutal-black shrink-0" />
                </div>
                <div v-if="cert.meta.tech" class="flex flex-wrap gap-1">
                  <BrutalistBadge v-for="tag in cert.meta.tech" :key="tag" color="white" class="text-[10px] py-0.5 px-2">
                    {{ tag }}
                  </BrutalistBadge>
                </div>
              </BrutalistCard>
            </div>
          </div>
        </div>

        <div class="mt-8 flex justify-start">
          <NuxtLink to="/certificates">
            <BrutalistBtn color="black" class="text-white">View All Certs</BrutalistBtn>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 3. Skill Section (Section 3 now, custom height / not viewport height) -->
    <section class="grid grid-cols-1 lg:grid-cols-12 border-b-3 border-brutal-black">
      <!-- Grid 1 & 2: Row 2 concept (Col span 9), flexible width -->
      <div class="lg:col-span-9 p-8 border-b-3 lg:border-b-0 lg:border-r-3 border-brutal-black bg-white flex items-center justify-center">
        <div class="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-4 w-full">
          <div 
            v-for="skill in skillsWithIcons" 
            :key="skill.name" 
            class="flex items-center justify-center gap-2 p-3 border-3 border-brutal-black bg-brutal-cream shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-brutal-green transition-colors text-center"
          >
            <Icon :name="skill.icon" class="w-6 h-6 text-brutal-black shrink-0" />
            <span class="font-black text-xs uppercase tracking-wider text-brutal-black">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Grid 3 (Col span 3): Row span 2 height fit content / flex items with Arrow Icon -->
      <div class="lg:col-span-3 p-8 bg-brutal-pink flex flex-row lg:flex-col justify-between items-center w-full lg:w-auto shrink-0 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 pointer-events-none brutal-stripe-pattern"></div>
        <Icon name="lucide:arrow-left" class="w-16 h-16 text-brutal-black relative z-10" />
        <h2 class="text-3xl font-black uppercase tracking-tighter text-brutal-black relative z-10">
          MY SKILLS
        </h2>
      </div>
    </section>

    <!-- 4. Grid Section (Experience Timeline & Contact CTA) - 5 Columns (Layout 1:3:1) -->
    <section class="grid grid-cols-1 lg:grid-cols-5 border-b-3 border-brutal-black">
      <!-- Col 1: Experience title -->
      <div class="lg:col-span-1 p-8 border-b-3 lg:border-b-0 lg:border-r-3 border-brutal-black bg-brutal-orange flex flex-col justify-between items-start">
        <h2 class="text-4xl font-black uppercase tracking-tighter leading-none text-brutal-black">
          EXPERIENCE
        </h2>
        <Icon name="lucide:arrow-down-right" class="w-16 h-16 text-brutal-black hidden lg:block" />
      </div>

      <!-- Col 2-4 (Span 3): Timeline (3 items latest) -->
      <div class="lg:col-span-3 p-8 border-b-3 lg:border-b-0 lg:border-r-3 border-brutal-black bg-white flex flex-col justify-between">
        <div class="relative border-l-4 border-brutal-black pl-6 ml-2 space-y-8">
          <div 
            v-for="item in history?.slice(0, 3)" 
            :key="item.path"
            class="relative"
          >
            <!-- Timeline dot -->
            <div class="absolute -left-[28px] w-4 h-4 rounded-full bg-brutal-blue border-2 border-brutal-black"></div>
            <div>
              <span class="text-xs font-bold uppercase bg-brutal-black text-white px-2 py-0.5">
                {{ item.meta.period }}
              </span>
              <h4 class="text-xl font-black uppercase tracking-tight text-brutal-black mt-2">
                {{ item.title }}
              </h4>
              <p class="text-sm font-bold uppercase text-brutal-blue mb-2">
                {{ item.meta.institution }}
              </p>
              <p class="text-sm text-zinc-600 font-medium bg-brutal-cream p-4 border-2 border-brutal-black shadow-brutal text-left w-full">
                {{ item.meta.description || item.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <NuxtLink to="/history">
            <BrutalistBtn color="white" size="sm">View Detail Journey</BrutalistBtn>
          </NuxtLink>
        </div>
      </div>

      <!-- Col 5 (Span 1): Contact CTA text -->
      <div class="lg:col-span-1 p-8 bg-brutal-cream flex flex-col justify-between relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 pointer-events-none brutal-grid-pattern"></div>
        <div class="space-y-6 relative z-10">
          <h3 class="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none stroke-text select-none hover:text-brutal-black transition-colors duration-300">
            FIND ME HERE AND LET'S WORK TOGETHER.
          </h3>
          <p class="text-xs font-bold uppercase tracking-tight text-zinc-700">
            REACH US AT ANY TIME FOR HIRING.
          </p>
        </div>

        <div class="mt-8 relative z-10">
          <NuxtLink to="/catch-me">
            <BrutalistBtn color="green" class="w-full text-center text-xs py-2">GET IN TOUCH</BrutalistBtn>
          </NuxtLink>
        </div>
      </div>
    </section>

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
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Home',
  ogTitle: 'Farhan Alwanda - Full-Stack Developer & AI Engineer',
  ogDescription: 'I craft intelligent web applications and IoT solutions. Less clutter, pure performance, and bold aesthetics.'
})

// Fetch data
const { data: history } = await useAsyncData('history', () => queryCollection('history').order('order', 'ASC').all(), { default: () => [] })
const { data: projects } = await useAsyncData('projects', () => queryCollection('projects').order('order', 'ASC').all(), { default: () => [] })
const { data: certificates } = await useAsyncData('certificates', () => queryCollection('certificates').order('order', 'ASC').all(), { default: () => [] })

const featuredProjects = computed(() => {
  if (!projects.value) return []
  return projects.value.filter((p: any) => p.featured === true || p.featured === 1)
})

// Project placeholder assets (storing local assets in variables)
const projectImages = ref<string[]>([
  '', // empty string uses brutalist fallback pattern
  ''
])

// Get slug from project file path or title
const getProjectSlug = (project: any) => {
  if (!project) return ''
  const parts = project.path.split('/')
  const lastPart = parts[parts.length - 1]
  return lastPart.replace('.md', '')
}

// Project slider index
const currentProjectIndex = ref(0)
const prevProject = () => {
  if (!featuredProjects.value.length) return
  if (currentProjectIndex.value === 0) {
    currentProjectIndex.value = featuredProjects.value.length - 1
  } else {
    currentProjectIndex.value--
  }
}
const nextProject = () => {
  if (!featuredProjects.value.length) return
  if (currentProjectIndex.value === featuredProjects.value.length - 1) {
    currentProjectIndex.value = 0
  } else {
    currentProjectIndex.value++
  }
}

// Certificate Preview Modal state
const activeCert = ref<any>(null)
const openCertPreview = (cert: any) => {
  activeCert.value = cert
}
const closeCertPreview = () => {
  activeCert.value = null
}

const marqueeItems = [
  'LARAVEL', 'FILAMENT', 'FLUTTER', 'GO / GIN', 'FASTAPI', 'PYTHON', 
  'DOCKER COMPOSE', 'ESP32', 'MQTT PROTOCOL', 'NODE-RED', 
  'CONVOLUTIONAL NEURAL NETWORKS', 'MODEL OPTIMIZATION', 'LINUX'
]

const getProjectBgColor = (idx: number) => {
  const colors = [
    'bg-brutal-purple',
    'bg-brutal-blue',
    'bg-brutal-red',
    'bg-brutal-green',
    'bg-brutal-orange',
    'bg-brutal-pink'
  ]
  return colors[idx % colors.length]
}

// Highly curated essential skills only
const skillsWithIcons = [
  { name: 'Laravel', icon: 'logos:laravel' },
  { name: 'Vue.js', icon: 'logos:vue' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
  { name: 'TypeScript', icon: 'logos:typescript-icon' },
  { name: 'Go', icon: 'logos:go' },
  { name: 'Python', icon: 'logos:python' },
  { name: 'Docker', icon: 'logos:docker-icon' }
]
</script>

<style scoped>
.stroke-text {
  -webkit-text-stroke: 2px #09090B;
  color: transparent;
}
</style>
