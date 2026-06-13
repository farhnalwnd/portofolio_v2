# UI/UX Redesign Plan — Portfolio v2

## 1. Color System (Electric Blue `#0066FF`)

Mengganti accent dari `#2563EB` ke `#0066FF` sebagai warna utama, lalu membuat full semantic color tokens untuk light dan dark mode.

### Light Mode
| Token | Hex | Fungsi |
|---|---|---|
| `--bg` | `#FAFAFA` | Background utama |
| `--bg-surface` | `#FFFFFF` | Card/surface background |
| `--text` | `#09090B` | Text utama |
| `--secondary` | `#52525B` | Text sekunder (dinaikkan dari `#3f3f46` untuk kontras) |
| `--accent` | `#0066FF` | Electric Blue — CTA, link, highlight |
| `--accent-hover` | `#0052CC` | Accent hover state |
| `--accent-muted` | `rgba(0,102,255,0.10)` | Accent background subtle |
| `--primary` | `#18181B` | Primary surface (button dark) |
| `--border` | `#E4E4E7` | Border default |
| `--border-glass` | `rgba(0,0,0,0.08)` | Glass card border |
| `--muted` | `#F4F4F5` | Muted background |
| `--destructive` | `#DC2626` | Error/destructive |

### Dark Mode
| Token | Hex | Fungsi |
|---|---|---|
| `--bg` | `#050507` | Background utama (near-black, bukan pure black — avoid OLED smear) |
| `--bg-surface` | `#0A0A0F` | Card/surface background |
| `--text` | `#F4F4F5` | Text utama |
| `--secondary` | `#A1A1AA` | Text sekunder |
| `--accent` | `#3388FF` | Electric Blue lighter (desaturated untuk dark — WCAG AA contrast) |
| `--accent-hover` | `#5599FF` | Accent hover |
| `--accent-muted` | `rgba(51,136,255,0.12)` | Accent background subtle |
| `--primary` | `#18181B` | Primary surface |
| `--border` | `rgba(255,255,255,0.08)` | Border default |
| `--border-glass` | `rgba(255,255,255,0.10)` | Glass card border |
| `--muted` | `#18181B` | Muted background |
| `--destructive` | `#EF4444` | Error |

---

## 2. Glassmorphism System

Membuat konsisten pattern glassmorphism dengan variasi per konteks:

### Glass Card (default)
- **Light:** `bg-white/70 backdrop-blur-xl border border-black/8 shadow-lg`
- **Dark:** `bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl`

### Glass Card Elevated (featured/hero)
- **Light:** `bg-white/80 backdrop-blur-2xl border border-black/5 shadow-xl`
- **Dark:** `bg-white/8 backdrop-blur-2xl border border-white/12 shadow-2xl shadow-accent/5`

### Glass Navbar
- **Scrolled Light:** `bg-white/75 backdrop-blur-2xl border border-black/5 shadow-lg`
- **Scrolled Dark:** `bg-[#0A0A0F]/80 backdrop-blur-2xl border border-white/8 shadow-2xl`
- **Default:** `bg-white/5 backdrop-blur-xl border border-white/5`

### Glass Badge/Tag
- **Light:** `bg-accent/8 text-accent border border-accent/15`
- **Dark:** `bg-accent/12 text-accent border border-accent/20`

---

## 3. Background & Decorative Elements

### Global Background (App.vue)
- **Light:** Gradient halus `#FAFAFA` → subtle warm, decorative blur circles `accent/8` dan `purple-500/8`
- **Dark:** Gradient halus `#050507` → `#0A0A0F`, decorative blur circles `accent/10` dan `purple-500/8`
- **Subtle animated gradient mesh:** 2-3 large gradient blobs yang bergerak perlahan (animasi CSS 20-30s) untuk kesan "hidup".

### Per-Card Decorative Glow
- Light mode: `accent/5 blur-xl`
- Dark mode: `accent/8 blur-xl`

---

## 4. Typography (Keep Existing)

- **Archivo** (headings) — strong, geometric, modern
- **Space Grotesk** (body) — clean, technical, readable

### Perbaikan:
- Definisikan `font-archivo` sebagai Tailwind v4 `@theme` variable.
- Terapkan consistent type scale: `text-sm(14)` / `text-base(16)` / `text-lg(18)` / `text-xl(20)` / `text-2xl(24)` / `text-4xl(36)` / `text-5xl(48)` / `text-7xl(72)`.
- Heading letter-spacing: `-0.02em` untuk display size.
- Body line-height: `1.6`.

---

## 5. Component Styling Updates

### 5a. Navbar.vue
- Fix light mode: ganti `bg-white/5` (invisible) → `bg-white/75 dark:bg-white/5`.
- Active link: `text-accent bg-accent/10`.
- Hover: `hover:bg-accent/5`.
- Dark mode toggle: smooth rotate transition pada icon swap.

### 5b. Cards (ProjectCard, FeaturedProjectCard, Education cards)
- Terapkan glass card system di atas.
- Hover state: `hover:border-accent/30 hover:shadow-accent/10 hover:scale-[1.02]`.
- Transition: `transition-all duration-300 ease-out`.

### 5c. Contact Social Links
- Ganti per-platform coloring dengan unified glass card + accent hover.
- Hover: border berubah ke accent, icon scale up subtle.

### 5d. Badges/Tags
- Unified: `bg-accent/8 dark:bg-accent/12 text-accent border border-accent/15 dark:border-accent/20 rounded-full`.
- Tech stack tags: keep per-tech colors via colorMap (sudah bagus).

### 5e. Buttons
- Primary: `bg-accent hover:bg-accent-hover text-white rounded-xl px-6 py-3 shadow-lg shadow-accent/25 hover:shadow-accent/40`.
- Secondary: glass card style + `text-accent border-accent/20 hover:bg-accent/5`.
- Destructive: `bg-destructive text-white`.

---

## 6. Dark Mode Fixes

### Masalah yang harus diperbaiki:
1. **base.css cleanup:** Hapus `@media (prefers-color-scheme: dark)` block — konflik dengan `.dark` class toggle.
2. **Light mode invisible elements:** Semua `bg-white/5`, `border-white/10` tanpa `dark:` prefix harus diberi dual variant.
3. **Accent contrast:** Dark mode accent `#3388FF` sudah memenuhi WCAG AA (4.5:1 on `#050507`).
4. **Text shadow:** HomeView text-shadow perlu dark variant dengan accent glow (`0 0 40px accent/30`).

---

## 7. Animation Guidelines (GSAP — Tidak Diubah Konsepnya)

Konsep animasi existing tetap, hanya polish:
- Page transitions di App.vue: enter: `opacity 0→1, y 50→0, 0.8s, power3.out` / leave: `opacity→0, y→-50, 0.5s, power3.in`.
- Stagger: 30-50ms per item.
- Durasi micro-interaction: 150-300ms.
- `prefers-reduced-motion` dihandle di HomeView (extend ke semua views).
- Exit faster than enter (60-70% durasi).

---

## 8. File Changes Summary

| File | Perubahan |
|---|---|
| `src/assets/main.css` | Update color tokens (accent → `#0066FF`), tambah `--bg-surface`, `--border-glass`, `--accent-hover`, `--accent-muted`. Tambah `font-archivo` di `@theme`. Tambah animated bg mesh keyframes. |
| `src/assets/base.css` | Hapus `@media (prefers-color-scheme: dark)` block (konflik). |
| `src/App.vue` | Update decorative blur circles. Tambah `<Transition>` dengan GSAP page transition. Tambah animated gradient mesh background. |
| `src/components/Navbar.vue` | Fix light/dark glass variants. Update accent color classes. |
| `src/components/ProjectCard.vue` | Apply unified glass card system dengan proper light/dark. |
| `src/components/FeaturedProjectCard.vue` | Same glass card update. |
| `src/components/TechnicalSkills.vue` | Glass card update. |
| `src/components/SoftSkills.vue` | Glass card update. |
| `src/components/CertificatesList.vue` | Glass card update. |
| `src/views/HomeView.vue` | Update text-shadow, accent colors, decorative elements. |
| `src/views/EducationView.vue` | Glass card dual-variant fix. Timeline line color → accent. |
| `src/views/ProjectDetailView.vue` | Glass card fix, button styling update. |
| `src/views/ContactView.vue` | Glass card fix (sudah punya dual variant, perlu konsistenkan). |
| `src/views/AboutView.vue` | Glass card fix. |
| `src/views/ProjectsView.vue` | Minor accent color update. |

---

## 9. Yang TIDAK Diubah
- Layout/structure setiap halaman
- Routing & navigation flow
- GSAP animation concepts (scroll-pin, stagger, entrance)
- Data structure
- Component architecture
- UX flow & user journey

---

## 10. Pre-Delivery Checklist
- [ ] Contrast 4.5:1 di light & dark mode
- [ ] Glass cards visible di kedua mode
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px / 768px / 1024px / 1440px
- [ ] No emoji icons (sudah pakai @iconify)
- [ ] cursor-pointer pada semua clickable
- [ ] Hover states smooth 150-300ms
- [ ] `npm run lint` pass
- [ ] `npm run build` pass
