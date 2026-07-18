<template>
  <footer class="bg-brutal-cream text-brutal-black border-t-3 border-brutal-black grid grid-cols-1 md:grid-cols-12 text-center md:text-left">
    <!-- Section 1: Hardcoded Text and Icon, with color background (Start) -->
    <div class="md:col-span-2 p-4 flex gap-3 items-center justify-center border-b-3 md:border-b-0 md:border-r-3 border-brutal-black bg-brutal-green">
      <Icon name="lucide:terminal" class="w-5 h-5 text-brutal-black" />
      <span class="font-black uppercase text-sm tracking-wider">~/alwand ></span>
    </div>

    <!-- Section 2: Credential (Center, more space) -->
    <div class="md:col-span-8 p-4 flex items-center justify-center border-b-3 md:border-b-0 md:border-r-3 border-brutal-black">
      <p class="font-black uppercase tracking-wider text-sm">
        © 2026 — ALL RIGHTS RESERVED ALWAND
      </p>
    </div>

    <!-- Section 3: Social Icons (End) -->
    <div v-if="profile" class="md:col-span-2 p-4 flex items-center justify-center gap-6">
      <a :href="profile.meta.github" target="_blank" class="hover:text-brutal-blue transition-colors">
        <Icon name="lucide:github" class="w-6 h-6" />
      </a>
      <a :href="profile.meta.whatsapp" target="_blank" class="hover:text-brutal-blue transition-colors">
        <Icon name="lucide:message-circle" class="w-6 h-6" />
      </a>
      <a :href="profile.meta.instagram" target="_blank" class="hover:text-brutal-blue transition-colors">
        <Icon name="lucide:instagram" class="w-6 h-6" />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { data: profile } = useLazyAsyncData('profile-footer', () => queryCollection('profile').first())
</script>
