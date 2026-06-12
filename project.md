# Portofolio V2 Project Analysis

## What the Project Is
A personal portfolio for Farhan Alwanda, a Full-Stack Developer & AI Engineer. Showcases skills, education/career timeline, certificates, and projects. Built custom from scratch using Vue 3, Vite, Tailwind CSS v4, and GSAP 3. Currently in active development; the data layer contains placeholder/test entries.

## Tech Stack
- **Framework**: Vue 3 `<script setup>` (^3.5.32)
- **Build**: Vite (^8.0.8)
- **CSS**: Tailwind CSS v4 (`@theme`) (^4.2.4)
- **Animation**: GSAP 3 + ScrollTrigger (^3.12.7)
- **State**: Pinia (^3.0.4)
- **Router**: Vue Router (^5.0.4)
- **Icons**: @iconify/vue (^4.3.0)
- **Lint/Format**: oxlint, ESLint, Prettier

## Critical Bugs to Fix
1. [Fixed] `src/data/projects.js` uses absolute filesystem paths (e.g., `/home/kuliah/.../image.png`). Change to `/image.png` or `src/assets/`.
2. [Fixed] `src/data/projects.js` has duplicate `slug: 'yaya'` which breaks `ProjectDetailView` routing.
3. [Fixed] `index.html` has empty `lang=""`. Set to `lang="id"`.
4. [Fixed] `index.html` title is "Vite App". Update to portfolio name.
5. [Fixed] `GSDevToolsPanel.vue` uses paid GSAP Club plugin. Will crash dev mode without license.
6. [Fixed] `GSDevToolsPanel.vue` calls `watch()` inside async `onMounted()`, causing memory leaks.

## Code Quality Issues
- [Fixed] Remove unused `motion` package from dependencies.
- [Fixed] Remove dead `counter.js` store and unused `logo.svg`.
- [Fixed] Remove dead `certificates` array from `src/data/skills.js`.
- [Fixed] Remove junk test entries from `projects.js` (`aaaaa`, `teas`).
- [Fixed] Add 404 catch-all route to Vue Router.
- [Fixed] Move `gsap.registerPlugin(ScrollTrigger)` from views to `main.js`.
- [Fixed] Replace custom `line-clamp-2` CSS with Tailwind utilities.
- [Fixed] Fix `ProjectsView.vue` empty state check (use `regularProjects.length`).
- [Fixed] Use `personalInfo` data instead of hardcoded strings in `HomeView.vue`.
- [Fixed] Add `prefers-reduced-motion` handling with `gsap.matchMedia()`.

## Architectural Polish
- [Fixed] Add SEO meta tags and Open Graph to `index.html`.
- [Fixed] Add router navigation guard to update `document.title`.
- [Fixed] Add `loading="lazy"` to project card images.
- [Fixed] Implement GSAP page transitions on `<router-view>` (App.vue).
- [Fixed] Create `usePageAnimation()` composable to DRY up GSAP boilerplate in views.
- [Fixed] Split monolithic `AboutView.vue` (372 lines) into sub-components.
- [Fixed] Move Google Fonts `@import` from `main.css` to HTML `<link>` for better performance.

## Specific Code Issues

### 1. [Fixed] `getColorClasses` di `AboutView.vue` (lines 11-42)

**Masalah**: Fungsi `getColorClasses()` menggunakan switch-case hardcoded di dalam komponen. Hanya mendukung 4 warna (`purple`, `emerald`, `orange`, default `accent`). Jika `certificates.js` menambahkan warna baru, perlu edit fungsi ini secara manual.

**Lokasi**: `src/views/AboutView.vue:11-42`

**Contoh kasus**:
```javascript
// certificates.js memiliki cert dengan color: 'accent'
{ color: 'accent', ... }

// Tapi getColorClasses() tidak punya case 'accent', jadi fallback ke default
```

**Solusi**:
- **Opsi 1**: Pindahkan mapping warna ke file terpisah `src/data/colorMap.js` yang export object dengan semua warna yang tersedia
- **Opsi 2**: Ubah struktur data certificate di `certificates.js` untuk langsung include class Tailwind-nya sendiri
- **Opsi 3**: Extend switch-case untuk menambahkan case `'accent'` secara eksplisit

**Rekomendasi**: Opsi 1 — centralized color mapping yang bisa dipakai di semua komponen.

---

### 2. [Fixed] `techIcons` di `ProjectDetailView.vue` (lines 31-52)

**Masalah**: Object `techIcons` hardcoded di dalam komponen. Mapping teknologi → icon tidak reusable dan tidak konsisten dengan `skills.js` yang sudah memiliki mapping serupa untuk hard skills.

**Lokasi**: `src/views/ProjectDetailView.vue:31-52`

**Dampak**:
- Duplikasi data: `skills.js` sudah punya icon mapping untuk Vue.js, Laravel, Python, dll
- Maintenance: Setiap tech stack baru perlu ditambahkan manual di `techIcons`
- Tidak reusable: Komponen lain (ProjectCard, FeaturedProjectCard) tidak bisa pakai mapping ini

**Solusi**:
- **Opsi 1**: Buat file `src/data/techMeta.js` yang export mapping lengkap `{ [techName]: { icon, defaultColor } }`
- **Opsi 2**: Extend `skills.js` dengan universal tech mapping (merge hard skills icons + additional techs)
- **Opsi 3**: Ubah struktur `techStack` di `projects.js` dari array of strings menjadi array of objects `[{ name, icon }]`

**Rekomendasi**: Opsi 2 — leverage existing `skills.js`, tambahkan section `techIcons` yang comprehensive untuk reuse di semua project components.

---

### 3. [Fixed] GSAP Cleanup: `onBeforeUnmount` vs `onUnmounted`

**Masalah**: Inconsistency dalam lifecycle hook yang digunakan untuk cleanup GSAP context. Beberapa view pakai `onBeforeUnmount` (correct), beberapa pakai `onUnmounted` (suboptimal).

**Status per View**:

| View | Hook | Status | Location |
|---|---|---|---|
| `HomeView.vue` | `onBeforeUnmount` | ✅ Benar | line 76 |
| `EducationView.vue` | `onBeforeUnmount` | ✅ Benar | line 186 |
| `AboutView.vue` | `onBeforeUnmount` | ✅ Benar | line 133 |
| `ProjectDetailView.vue` | `onBeforeUnmount` | ✅ Benar | line 99 |
| `ContactView.vue` | `onBeforeUnmount` | ✅ Benar | line 97 |

**Best Practice GSAP + Vue**:
- **Gunakan `onBeforeUnmount`** untuk cleanup GSAP context
- **Alasan**: `ctx.revert()` perlu akses DOM yang masih hidup untuk:
  - Remove inline styles yang di-inject GSAP
  - Kill ScrollTrigger instances
  - Remove pin spacers dari ScrollTrigger pinning
  - Cleanup event listeners

**Dampak pakai `onUnmounted`**:
- DOM sudah detached saat `ctx.revert()` dipanggil
- Inline styles mungkin tidak ter-cleanup dengan benar
- ScrollTrigger pin spacers bisa tertinggal di DOM
- Potential memory leak jika ScrollTrigger tidak ter-kill sempurna

**Solusi**: 
Standarkan semua view ke `onBeforeUnmount` untuk GSAP cleanup:

```javascript
// ❌ BEFORE (suboptimal)
onUnmounted(() => {
  ctx?.revert()
})

// ✅ AFTER (best practice)
onBeforeUnmount(() => {
  ctx?.revert()
})
```

**Files to fix**:
1. `src/views/AboutView.vue:133`
2. `src/views/ProjectDetailView.vue:99`
3. `src/views/ContactView.vue:97`
