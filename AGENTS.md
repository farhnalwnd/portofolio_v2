# AGENTS.md — portofolio-v2

## Tujuan Project

Personal portfolio yang menarik dan elegan. Tujuan utama: showcase skill, project, dan pendidikan dengan animasi GSAP yang smooth dan desain glassmorphism modern. Bukan template — dibuat custom dari nol dengan fokus pada UI/UX premium.

---

## Stack

- **Vue 3** (SFC `<script setup>`) + **Vite 8** — JavaScript only, no TypeScript
- **Tailwind CSS v4** — via `@theme` block di `main.css`, no `tailwind.config.js`
- **GSAP 3** — animasi utama: page transitions, entrance animations, scroll effects
- **Motion** — animasi tambahan (complement GSAP)
- **Pinia** — state management
- **Vue Router 5** — 7 routes, lazy-loaded kecuali `/`
- **@vueuse/core** — composable utilities
- **@iconify/vue** — icon library

---

## Tech Dependencies

### Production
| Package | Version | Fungsi |
|---|---|---|
| `vue` | `^3.5.32` | Framework utama |
| `vue-router` | `^5.0.4` | Client-side routing |
| `pinia` | `^3.0.4` | State management |
| `gsap` | `^3.12.7` | Animasi utama (page transitions, entrance, scroll) |
| `motion` | `^12.4.7` | Animasi tambahan |
| `tailwindcss` | `^4.2.4` | Utility CSS |
| `@tailwindcss/vite` | `^4.2.4` | Tailwind v4 Vite plugin |
| `@vueuse/core` | `^14.2.1` | Composable utilities (useToggle, useDark, dll) |
| `@iconify/vue` | `^4.3.0` | Icon component |

### Dev
| Package | Fungsi |
|---|---|
| `vite` | Build tool + dev server |
| `@vitejs/plugin-vue` | Vue SFC support |
| `vite-plugin-vue-devtools` | Vue DevTools |
| `oxlint` + `eslint` | Linting (oxlint first, then ESLint) |
| `prettier` | Code formatting |
| `eslint-plugin-vue` | Vue-specific lint rules |
| `eslint-plugin-oxlint` | Bridge oxlint rules ke ESLint |

---

## Struktur Project

```
portofolio-v2/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── main.css          # Entry CSS: Google Fonts import + Tailwind @theme + dark mode vars
│   │   └── base.css          # Vue scaffold CSS vars (imported by main.css)
│   ├── components/
│   │   ├── Navbar.vue        # Navbar utama (dipakai di App.vue)
│   │   ├── icons/            # Icon SVG components (scaffold defaults)
│   │   ├── HelloWorld.vue    # Scaffold default (tidak dipakai)
│   │   ├── TheWelcome.vue    # Scaffold default (tidak dipakai)
│   │   └── WelcomeItem.vue   # Scaffold default (tidak dipakai)
│   ├── router/
│   │   └── index.js          # Route definitions (7 routes)
│   ├── stores/
│   │   └── counter.js        # Scaffold store (placeholder, belum dipakai)
│   ├── views/
│   │   ├── HomeView.vue          # Landing page — route: /
│   │   ├── AboutView.vue         # Skills & Expertise — route: /skills
│   │   ├── EducationView.vue     # Riwayat pendidikan & karier — route: /timeline
│   │   ├── ProjectsView.vue      # Daftar project — route: /projects
│   │   ├── ProjectDetailView.vue # Detail project — route: /projects/:slug
│   │   ├── ContactView.vue       # Kontak — route: /contact
│   │   └── TestView.vue          # Halaman testing/dev — route: /test
│   ├── App.vue               # Root: Navbar + RouterView + GSAP page transitions
│   └── main.js               # Entry: mount app, register Pinia + Router
├── index.html
├── vite.config.js            # Plugins: vue, vueDevTools, tailwindcss + alias @→src
├── jsconfig.json             # Path alias untuk editor
├── eslint.config.js          # ESLint flat config
├── .oxlintrc.json            # oxlint rules
├── .prettierrc.json          # Prettier config
├── .editorconfig             # Editor settings
└── AGENTS.md                 # File ini
```

---

## Routing

| Path | Name | View | Load |
|---|---|---|---|
| `/` | `home` | `HomeView.vue` | Eager |
| `/timeline` | `timeline` | `EducationView.vue` | Lazy |
| `/projects` | `projects` | `ProjectsView.vue` | Lazy |
| `/projects/:slug` | `project-detail` | `ProjectDetailView.vue` | Lazy |
| `/skills` | `skills` | `AboutView.vue` | Lazy |
| `/contact` | `contact` | `ContactView.vue` | Lazy |
| `/test` | `test` | `TestView.vue` | Lazy |

---

## Animasi (GSAP)

GSAP adalah inti animasi project ini. Semua page transition dikontrol GSAP via Vue `<transition>` hooks.

**Page Transition (App.vue):**
- Enter: `fromTo` — opacity 0→1, y 50→0, 0.8s, `power3.out`
- Leave: `to` — opacity→0, y→-50, 0.5s, `power3.in`
- Mode: `out-in`, `:css="false"` (bypass Vue CSS transition)

**Background:** dua circle blur besar (accent + purple) posisi fixed — glassmorphism decorative effect.

**Pola animasi di views:** gunakan `onMounted` + GSAP `context` untuk scoping, cleanup di `onUnmounted`.

---

## Theming

Tailwind v4 `@theme` di `src/assets/main.css`:

| Utility | Light | Dark |
|---|---|---|
| `bg-background-custom` | `#fafafa` | `#09090b` |
| `text-text-custom` | `#09090b` | `#fafafa` |
| `bg-accent-custom` | `#2563eb` | `#3b82f6` |
| `text-secondary-custom` | `#3f3f46` | `#a1a1aa` |
| `bg-primary-custom` | `#18181b` | `#18181b` |

Dark mode: toggle `.dark` class pada `<html>`. Bukan `prefers-color-scheme`.

Fonts: **Space Grotesk** (body) + **Archivo** (headings h1-h6) via Google Fonts.

---

## Commands

```
npm run dev          # Vite dev server with hot reload
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # oxlint --fix then eslint --fix --cache (sequential)
npm run format       # prettier --write --experimental-cli src/
```

## Lint/Format Gotchas

- `npm run lint` runs **oxlint first**, then ESLint. Both use `--fix`.
- ESLint config loads oxlint rules via `eslint-plugin-oxlint` bridged from `.oxlintrc.json`.
- Prettier uses `--experimental-cli` — do not drop this flag.
- VS Code: format-on-save enabled, Prettier is default formatter.

---

## Style

- 2-space indent, LF, semicolons **off**, single quotes, 100 char max line
- ESLint: flat config, Vue essential rules + oxlint correctness=error

## Node

- Engines: `^20.19.0 || >=22.12.0`
