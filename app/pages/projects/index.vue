<template>
  <div class="relative min-h-screen py-12 px-4 md:px-8 overflow-hidden">
    <!-- Stripe Pattern Background -->
    <div class="absolute inset-0 opacity-10 pointer-events-none brutal-stripe-pattern z-0"></div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <SectionHead title="Projects" />
      <div class="mt-8">
        <div v-if="projects && projects.length" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="project in projects" :key="project.path" class="mb-8">
            <BrutalistCard :color="project.featured ? 'cream' : 'white'" class="h-full flex flex-col justify-between p-6 relative">
              <div v-if="project.featured" class="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-brutal-pink text-white font-bold uppercase tracking-wider text-xs border-2 border-brutal-black px-3 py-1.5 z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Featured
              </div>
              <div>
                <div class="flex items-center justify-between mb-4 border-b-2 border-brutal-black pb-3">
                  <h3 class="text-2xl font-black uppercase tracking-tight text-brutal-black">
                    {{ project.title }}
                  </h3>
                  <Icon name="lucide:folder-git-2" class="w-8 h-8 text-brutal-blue" />
                </div>
                <p class="text-zinc-700 font-medium mb-6">
                  {{ project.description }}
                </p>
                <div class="flex flex-wrap gap-2 mb-6">
                  <BrutalistBadge v-for="tag in project.tech" :key="tag" color="white">
                    {{ tag }}
                  </BrutalistBadge>
                </div>
              </div>
              <div class="flex items-center gap-4 border-t-2 border-brutal-black pt-4 mt-auto">
                <BrutalistBtn :to="`/projects/${getProjectSlug(project)}/detail`" color="yellow" size="sm" class="flex-grow">
                  View Detail
                </BrutalistBtn>
                <BrutalistBtn v-if="project.links?.demo" :to="project.links.demo" color="blue" size="sm" class="flex-grow">
                  Live Demo
                </BrutalistBtn>
                <BrutalistBtn v-if="project.links?.github" :to="project.links.github" color="white" size="sm" class="flex-grow">
                  Source Code
                </BrutalistBtn>
              </div>
            </BrutalistCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: projects } = await useAsyncData('projects-detail', () => queryCollection('projects').order('order', 'ASC').all())

const getProjectSlug = (project: any) => {
  if (!project) return ''
  const parts = project.path.split('/')
  const lastPart = parts[parts.length - 1]
  return lastPart.replace('.md', '')
}
</script>
