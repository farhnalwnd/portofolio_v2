# Farhan Alwanda - Portfolio

Repositori ini berisi kode sumber untuk situs portofolio pribadi Farhan Alwanda (Full-Stack Developer & AI Engineer).

## 🚀 Tentang Project

Situs ini berfungsi sebagai portofolio interaktif untuk menampilkan proyek, riwayat pengalaman/pendidikan, sertifikasi profesional, keahlian teknis (skills), serta opsi untuk mengunduh CV dan menghubungi langsung via form kontak.

---

## 🛠️ Konsep Frontend & Tech Stack

### Tech Stack Utama
* **Framework:** [Nuxt 4](https://nuxt.com/) (Vue 3 Composition API dengan `<script setup>`).
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) dengan kustomisasi tema khusus.
* **Content Database:** [Nuxt Content v3](https://content.nuxt.com/) (menggunakan berkas Markdown yang diolah via `better-sqlite3`).
* **Icons:** `@nuxt/icon` (koleksi ikon dari Lucide, Logos, Simple Icons, MDI).
* **Fonts:** `@nuxtjs/google-fonts` menggunakan font *Space Grotesk*.
* **Utilities:** `@vueuse/nuxt` untuk fungsi reaktif tambahan.
* **Analytics:** `@vercel/analytics` & `@vercel/speed-insights`.

### Konsep Desain & Interaksi Frontend
* **Neo-Brutalism Style:** Menggunakan border hitam tebal (`border-3` / `border-4`), bayangan hitam bersudut tajam (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`), serta warna kontras tinggi (raw design).
* **Custom Cursor & Scrollbar:** Kustomisasi scrollbar brutalist (kombinasi warna kuning, merah, dan hitam) dan pointer cursor berbentuk SVG khusus.
* **Background Patterns:** Variasi motif background menggunakan CSS pattern (seperti `brutal-dot-pattern`, `brutal-grid-pattern`, dan `brutal-stripe-pattern`).
* **Interactive UI:**
  * Project carousel/slider interaktif.
  * Preview modal untuk sertifikat dan berkas CV.
  * Teks berjalan (marquee effect) pada bagian hero section.

---

## 🎨 Warna & Tema (Brutalist Theme)

Konfigurasi warna didefinisikan secara khusus pada berkas `tailwind.config.js` di bawah objek `colors.brutal`:

| Nama Warna | Kode Hex | Deskripsi/Penggunaan |
| :--- | :--- | :--- |
| **Cream** | `#F4F4F0` | Latar belakang utama halaman (`bg-brutal-cream`) |
| **Black** | `#09090B` | Warna teks utama, border tebal, dan elemen kontras tinggi |
| **Yellow** | `#DFE104` | Scrollbar thumb, highlight tombol |
| **Blue** | `#2196F3` | Badge, timeline dot, ikon dekorasi |
| **Red** | `#FF5252` | Tombol close modal, tombol hover scrollbar |
| **Green** | `#00FF41` | Tombol aksi (CTA), latar belakang hover kartu skill |
| **Purple** | `#B388FF` | Tombol navigasi proyek, hover card sertifikat |
| **Orange** | `#FFAB40` | Highlight nama di hero section, timeline background |
| **Pink** | `#FF4081` | Badge teknologi proyek, background sidebar visual |

---

## 📂 Struktur Project

```text
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css         # Styling global, kustomisasi cursor, scrollbar, & pattern background
│   ├── components/              # Komponen UI Brutalist (BrutalistCard, BrutalistBtn, Modals, dll)
│   ├── layouts/
│   │   └── default.vue          # Layout standar dengan Navbar dan Footer
│   ├── pages/
│   │   ├── index.vue            # Halaman utama (Landing page)
│   │   ├── catch-me/            # Halaman kontak
│   │   ├── certificates/        # Halaman galeri sertifikat
│   │   ├── history/             # Halaman riwayat pengalaman & pendidikan
│   │   └── projects/            # Halaman daftar proyek & detail proyek
│   └── plugins/
│       └── gtag.client.ts       # Integrasi Google Analytics
├── content/                     # Data konten berbasis Markdown (.md)
│   ├── certificates/            # Markdown data sertifikat
│   ├── history/                 # Markdown data riwayat hidup
│   ├── profile/                 # Bio pribadi (dataDiri.md)
│   ├── projects/                # Detail proyek
│   └── skills/                  # Data keahlian (skillsData.md)
├── public/                      # Aset statis (Gambar proyek, PDF CV, favicon)
├── server/
│   └── plugins/
│       └── sitemap.ts           # Integrasi sitemap server
├── nuxt.config.ts               # Konfigurasi Nuxt modules & build
└── tailwind.config.js           # Konfigurasi tema Tailwind & warna Brutalist
```

---

## 🛠️ Perintah Pengembangan (Dev Commands)

Pastikan dependensi telah diinstal menggunakan package manager pilihan Anda:

```bash
# Instalasi Dependensi
npm install

# Menjalankan Server Pengembangan (http://localhost:3000)
npm run dev

# Membangun Aplikasi untuk Produksi
npm run build

# Menghasilkan Situs Statis (Static Site Generation / SSG)
npm run generate

# Melakukan Preview Build Produksi secara Lokal
npm run preview
```
