# Codebase Index - Portofolio v2

## Tech Stack
- **Framework:** Nuxt 4 (Vue 3, Vue Router 5)
- **Styling:** Tailwind CSS (via `@nuxtjs/tailwindcss` with Neon/Brutalist extension color palette: yellow, blue, red, cream, black, green, purple, orange, pink)
- **Content:** Nuxt Content v3 (via `@nuxt/content` & `better-sqlite3`)
- **Fonts:** Space Grotesk (`@nuxtjs/google-fonts`)
- **Icons:** `@nuxt/icon` (Lucide, Logos)
- **Utilities:** VueUse (`@vueuse/nuxt`)

## Directory Structure
- `/app` - Root Nuxt application code
  - `/app/components` - UI Components (Brutalist style)
    - `BrutalistBadge.vue` - Badge UI
    - `BrutalistBtn.vue` - Button UI
    - `BrutalistCard.vue` - Card UI
    - `MarqueeText.vue` - Marquee effect
    - `SectionHead.vue` - Section header UI
    - `TheNavbar.vue` - Navigation bar
    - `TheFooter.vue` - Footer
  - `/app/layouts` - Layout templates
    - `default.vue` - Default layout with Navbar and Footer
  - `/app/pages`
    - `index.vue` - Main landing page (portfolio entry point)
  - `/app/assets/css`
    - `main.css` - Global stylesheet
- `/content` - Markdown source files for Nuxt Content
  - `/content/certificates` - Professional certificates (with `tech` frontmatter array variable for badges)
  - `/content/history` - Experience & education history
  - `/content/projects` - Project details
  - `/content/profile` - Personal bio info (dataDiri.md)
  - `/content/skills` - Skills listing (skillsData.md)

## Design Guidelines (Brutalist Style)
- Bold thick borders (`border-4 border-black` or similar).
- High contrast, raw styling (black shadow with offset e.g. `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`).
- Clean font (Space Grotesk).

## Dev Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Static site generation
- `npm run preview` - Preview production build
