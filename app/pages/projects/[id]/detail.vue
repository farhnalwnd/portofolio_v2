<template>
  <div class="max-w-7xl mx-auto py-12 px-4 md:px-8">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <SectionHead title="Project Detail" class="mb-0 md:mb-0" />
      <BrutalistBtn to="/projects" color="white" size="sm" class="self-start md:self-auto flex items-center gap-2">
        <Icon name="lucide:arrow-left" class="w-4 h-4" /> Back to Projects
      </BrutalistBtn>
    </div>
    <div class="mt-8">
      <div v-if="project" class="max-w-3xl mx-auto">
        <BrutalistCard color="white" class="p-8">
          <div class="border-b-3 border-brutal-black pb-6 mb-6">
            <div class="h-64 bg-brutal-cream border-3 border-brutal-black flex items-center justify-center mb-6">
              <Icon name="lucide:folder-git-2" class="w-24 h-24 text-brutal-blue" />
            </div>
            <h1 class="text-4xl font-black uppercase tracking-tight text-brutal-black">
              {{ project.title }}
            </h1>
            <p class="text-zinc-500 font-bold uppercase mt-2">
              {{ project.description }}
            </p>
          </div>

          <div class="prose max-w-none text-zinc-700 font-medium leading-relaxed mb-8">
            <ContentRenderer :value="project" />
          </div>

          <div class="flex flex-wrap gap-2 mb-8">
            <BrutalistBadge v-for="tag in project.tech" :key="tag" color="cream">
              {{ tag }}
            </BrutalistBadge>
          </div>

          <div class="flex items-center space-x-4 border-t-2 border-brutal-black pt-6">
            <BrutalistBtn v-if="project.links?.demo" :to="project.links.demo" color="yellow" size="sm" class="flex-grow">
              Live Demo
            </BrutalistBtn>
            <BrutalistBtn v-if="project.links?.github" :to="project.links.github" color="white" size="sm" class="flex-grow">
              Source Code
            </BrutalistBtn>
          </div>
        </BrutalistCard>
      </div>
      <div v-else class="text-center font-bold uppercase py-12">
        Project not found
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const projectId = route.params.id as string

const { data: project } = await useAsyncData(`project-detail-${projectId}`, async () => {
  // Try to find the project by slug / name matching or database collections
  const allProjects = await queryCollection('projects').all()
  return allProjects.find(p => p.path.endsWith(projectId) || p.path.includes(projectId) || p.title.toLowerCase().replace(/ /g, '-') === projectId) || allProjects[0]
})
</script>
