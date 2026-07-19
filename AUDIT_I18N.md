# Audit Implementasi i18n - Portofolio v2

## 1. Best Practice Code
- **useAsyncData Key Collision:** Key `useAsyncData` sudah ditambahkan suffix `locale.value` dan menggunakan `watch: [locale]`.
- **Lokalisasi Navigasi:** `localePath()` digunakan secara konsisten.
- **Masalah Footer Query:** `TheFooter.vue` mengambil data profile pertama tanpa filter locale: `queryCollection('profile').first()`. Bisa mengambil data EN/ID secara acak.
- **Fragile Fallback Detail Project:** `projects/[id]/detail.vue` menggunakan `|| allProjects[0]` saat slug tidak cocok, yang akan menampilkan proyek acak alih-alih halaman 404.

## 2. SEO
- **htmlAttrs.lang Hardcoded:** `nuxt.config.ts` meng-hardcode `htmlAttrs: { lang: 'en' }`. Crawler akan menganggap situs bahasa Inggris meskipun sedang membuka halaman Bahasa Indonesia.
- **Hardcoded Metadata SEO:** Semua halaman menggunakan `useSeoMeta()` dengan judul/deskripsi hardcoded dalam bahasa Inggris (e.g., `'Journey History'`, `'Certificates'`).
- **Missing English Routes Prerender:** `nitro.prerender.routes` di `nuxt.config.ts` hanya mendaftarkan rute default (`/`, `/history`, dll.). Rute dengan prefix `/en/*` tidak akan di-prerender saat build statis.
- **Missing Alternate Tags:** Tidak ada tag `hreflang` dinamis untuk memandu search engine tentang hubungan antar locale.

## 3. Performance
- **Parallel Query Await:** Halaman `index.vue` menjalankan 3 `await useAsyncData` secara terpisah di setup script. Di server, ini memicu waterfall request yang lebih lambat dibanding membungkusnya dengan `Promise.all` atau menggunakan async data non-blocking.
- **Client-side Flash:** Ganti bahasa memicu re-fetch dari client, data lama tampil sesaat sebelum data baru ter-render karena absennya loading state / skeleton loader.

## 4. Rendering
- **Hydration Mismatch Risk:** Server merender `htmlAttrs.lang` sebagai `'en'`, sementara client mungkin mengubahnya ke `'id'` di default locale, berpotensi memicu hydration warning.
- **Missing Canonical Tag:** Halaman detail tidak memiliki tag canonical dinamis untuk menghindari duplicate content issue antara rute EN dan ID.

## 5. Rencana Perbaikan (Plan of Action)
1. **Perbaikan Langsung (Bugs):**
   - Hapus/dinamiskan `htmlAttrs.lang` di `nuxt.config.ts`.
   - Tambah filter locale pada query di `TheFooter.vue`.
   - Ganti fallback slug di `projects/[id]/detail.vue` agar memicu 404.
2. **Perbaikan Lokalisasi UI:**
   - Ubah string hardcoded seperti `"Featured"` di halaman proyek dan `"Click to View & Verify"` di sertifikat menggunakan `$t()`.
   - Lokalisasikan form submission status & error messages di `catch-me/index.vue`.
3. **Peningkatan SEO:**
   - Dinamiskan `useSeoMeta` menggunakan reactive computed properties yang terintegrasi dengan `$t()`.
   - Update `nitro.prerender.routes` agar mencakup `/en/*`.
