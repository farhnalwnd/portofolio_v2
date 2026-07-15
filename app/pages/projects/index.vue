<template>
  <div class="max-w-7xl mx-auto py-12 px-4 md:px-8">
    <SectionHead title="Projects Detail" />
    <div class="mt-8">
      <NuxtLink to="/">
        <BrutalistBtn color="white" class="mb-8">Back to Home</BrutalistBtn>
      </NuxtLink>
      <div v-if="projects && projects.length" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="project in projects" :key="project.path" class="mb-8">
          <BrutalistCard color="white" class="h-full flex flex-col justify-between p-6">
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
                <BrutalistBadge v-for="tag in project.meta.tech" :key="tag" color="cream">
                  {{ tag }}
                </BrutalistBadge>
              </div>
              <div class="prose max-w-none text-zinc-600 font-mono mb-6">
                <ContentRenderer :value="project" />
              </div>
            </div>
            <div class="flex items-center space-x-4 border-t-2 border-brutal-black pt-4 mt-auto">
              <BrutalistBtn :to="project.meta.demo" color="yellow" size="sm" class="flex-grow">
                Live Demo
              </BrutalistBtn>
              <BrutalistBtn :to="project.meta.github" color="white" size="sm" class="flex-grow">
                Source Code
              </BrutalistBtn>
            </div>
          </BrutalistCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: projects } = await useAsyncData('projects-detail', () => queryCollection('projects').order('order', 'ASC').all())
</script>
