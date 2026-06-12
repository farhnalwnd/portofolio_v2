<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Education', path: '/education' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
    <div class="flex justify-center p-4 md:p-6 pointer-events-none">
      <div
        :class="[
          'flex items-center gap-2 px-4 md:px-6 py-3 rounded-full transition-all duration-300 pointer-events-auto',
          isScrolled
            ? 'bg-background-custom/80 backdrop-blur-2xl border border-white/10 shadow-2xl'
            : 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl',
        ]"
      >
        <div class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="nav-link"
            @click="closeMenu"
          >
            {{ link.name }}
          </RouterLink>
        </div>

        <button
          class="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors text-secondary-custom"
          @click="toggleMenu"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        >
          <Icon :icon="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="text-xl" />
        </button>

        <div class="h-4 w-px bg-white/20 mx-1 md:mx-2"></div>

        <button
          @click="toggleDark()"
          class="p-2 rounded-full hover:bg-white/10 transition-colors text-secondary-custom hover:text-text-custom"
          aria-label="Toggle Dark Mode"
        >
          <Icon :icon="isDark ? 'ph:moon-stars-bold' : 'ph:sun-bold'" class="text-xl" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMenuOpen"
        class="md:hidden absolute top-full left-4 right-4 mt-2 p-4 bg-background-custom/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl pointer-events-auto"
      >
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="mobile-nav-link"
          @click="closeMenu"
        >
          {{ link.name }}
        </RouterLink>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
@reference "../assets/main.css";

.nav-link {
  @apply px-4 py-2 text-sm font-medium text-secondary-custom transition-colors hover:text-text-custom rounded-full;
}

.nav-link.router-link-active {
  @apply text-accent-custom bg-accent-custom/10;
}

.mobile-nav-link {
  @apply block px-4 py-3 text-sm font-medium text-secondary-custom transition-colors hover:text-text-custom hover:bg-white/5 rounded-xl;
}

.mobile-nav-link.router-link-active {
  @apply text-accent-custom bg-accent-custom/10;
}
</style>
