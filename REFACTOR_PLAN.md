# Refactor Plan: Mobile-First & Responsive Optimization

## 1. Pendahuluan
Kita akan merestrukturisasi beberapa component dan view untuk mendukung pendekatan **mobile-first**, memisahkan kode desktop dan mobile yang memiliki kompleksitas/tampilan berbeda, dan mengoptimasi rendering (`v-if` vs `v-show`) memanfaatkan VueUse `useBreakpoints`.

---

## 2. Strategi & Pembagian Komponen

| Komponen / View | Strategi Refaktor | Alasan | Mode Rendering |
|:---|:---|:---|:---|
| **EducationView.vue** | **Split** ke file terpisah (`EducationViewMobile.vue` dan `EducationViewDesktop.vue`) | Struktur mobile (carousel + touch slider) dan desktop (GSAP scroll-pinned timeline) sangat berbeda secara interaksi dan DOM. | `v-if` / `v-else` berdasarkan status breakpoint. |
| **TechnicalSkills.vue** | **Split** ke file terpisah (`TechnicalSkillsMobile.vue` dan `TechnicalSkillsDesktop.vue`) | Desktop memerlukan wrapper track lebar untuk di-pin GSAP oleh parent, sedangkan mobile hanya native snap scroll wrapper. | `v-if` / `v-else` berdasarkan status breakpoint. |
| **Navbar.vue** | Satukan dalam satu file, optimasi rendering logic menu dropdown dan item nav. | Item nav ringan dan dropdown mobile hanya butuh toggle visibility cepat tanpa harus re-mount DOM. | `v-show` untuk transisi cepat. |
| **HomeView.vue** | Satukan dalam satu file, integrasikan `useBreakpoints` untuk adaptasi script GSAP. | Struktur DOM hampir identik, penyesuaian hanya pada nilai timeline GSAP dan distance scroll. | Pure responsive CSS + adaptasi GSAP via JS. |
| **AboutView.vue** | Ganti penggunaan `gsap.matchMedia` manual dengan `useBreakpoints` composable. | Clean up logic inisialisasi GSAP berdasarkan reactive breakpoint. | Adaptasi GSAP via JS. |
| **ProjectsView.vue** | Nonaktifkan mouse-drag handler di mobile viewport. | Mencegah konflik gesture touch slider bawaan mobile browser dengan custom mouse-drag handler desktop. | JS-level conditional event. |

---

## 3. Detail Implementasi

### A. Centralized Breakpoint Composable (`src/composables/useBreakpoints.js`)
Gunakan `@vueuse/core` `useBreakpoints` untuk mendefinisikan standar breakpoint Tailwind.

```javascript
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
})

export function useAppBreakpoints() {
  return {
    isMobile: breakpoints.smaller('md'),         // < 768px
    isTablet: breakpoints.between('md', 'lg'),   // 768px - 1023px
    isDesktop: breakpoints.greaterOrEqual('md'), // >= 768px
    isLarge: breakpoints.greaterOrEqual('lg'),   // >= 1024px
    isXLarge: breakpoints.greaterOrEqual('xl'),  // >= 1280px
  }
}
```

### B. Komponen Baru
1. `src/views/education/EducationViewMobile.vue` (Touch Carousel)
2. `src/views/education/EducationViewDesktop.vue` (GSAP Pinned Timeline)
3. `src/components/skills/TechnicalSkillsMobile.vue` (Native snap scroll)
4. `src/components/skills/TechnicalSkillsDesktop.vue` (Wide layout track for GSAP)

---

## 4. Urutan Pengerjaan
1. Buat `src/composables/useBreakpoints.js`
2. Pecah `EducationView.vue` ke komponen mobile & desktop, lalu buat entry wrapper
3. Pecah `TechnicalSkills.vue` ke komponen mobile & desktop, lalu buat entry wrapper
4. Adaptasi breakpoint pada `HomeView.vue` dan `AboutView.vue`
5. Optimasi `Navbar.vue` menggunakan `v-show`
6. Pasang conditional logic drag handler pada `ProjectsView.vue`
7. Verifikasi linting dan build script (`npm run lint` & `npm run build`)
