import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
})

export function useAppBreakpoints() {
  return {
    isMobile: breakpoints.smaller('md'),
    isTablet: breakpoints.between('md', 'lg'),
    isDesktop: breakpoints.greaterOrEqual('md'),
    isLarge: breakpoints.greaterOrEqual('lg'),
    isXLarge: breakpoints.greaterOrEqual('xl'),
  }
}
