import { computed } from 'vue'
import { useAppBreakpoints } from './useBreakpoints.js'

export function useResponsiveTheme() {
  const { isMobile, isTablet, isDesktop } = useAppBreakpoints()

  const spacing = computed(() => ({
    sectionPadding: isMobile.value ? 'px-4 py-16' : 'px-8 py-24 lg:px-12 lg:py-32',
    containerPadding: isMobile.value ? 'px-4' : 'px-8 lg:px-12',
    gap: isMobile.value ? 'gap-4' : 'gap-6 lg:gap-8',
    cardPadding: isMobile.value ? 'p-5' : 'p-6 md:p-8',
  }))

  const text = computed(() => ({
    heroTitle: isMobile.value ? 'text-4xl' : 'text-6xl lg:text-8xl',
    sectionTitle: isMobile.value ? 'text-3xl' : 'text-5xl lg:text-6xl',
    subtitle: isMobile.value ? 'text-lg' : 'text-xl lg:text-2xl',
    body: isMobile.value ? 'text-sm' : 'text-base lg:text-lg',
  }))

  const layout = computed(() => ({
    gridCols: isMobile.value ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3',
  }))

  return {
    isMobile,
    isTablet,
    isDesktop,
    spacing,
    text,
    layout,
  }
}
