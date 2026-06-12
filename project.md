# Portfolio Project Specification

## Tujuan
1. **Personal Branding**: Menampilkan informasi mendalam tentang identitas profesional diri sendiri.
2. **High-Impact First Impression**: Memberikan impresi visual yang kuat, interaktif, dan profesional saat pengunjung pertama kali membuka landing page.
3. **Showcase Expertises**: Berfungsi sebagai platform interaktif untuk memamerkan skill, pengalaman kerja, proyek, dan sertifikasi yang dimiliki.

---

## Fitur & Spesifikasi Komponen

### 1. Hero / Home Section (Introduction Sequence)
* **Scroll-Driven Text Sequence**:
    * Bagian perkenalan singkat ini akan berganti kontennya secara dinamis berbasis urutan scroll (*sequence layout*).
    * **Urutan Kemunculan Konten (State Sequence)**:
        1. **First State**: Menampilkan nama lengkap saya (**Farhan Alwanda**).
        2. **Second State**: Di bawah nama, muncul deskripsi kecil mengenai *role* profesional saya saat ini.
        3. **Third State**: Konten berganti menampilkan informasi **Pendidikan Terakhir** (Lulusan S1 Teknik Informatika / Informatika Engineering dari President University).
        4. **Fourth State**: Konten berganti menampilkan informasi **Pekerjaan Terbaru** (Full-Stack Developer di Oneject Indonesia).
        5. **Final State (Hero Highlight Motion)**: Di akhir urutan scroll seksi ini, nama saya akan keluar kembali, lalu mengunci posisinya tepat di tengah layar (*centered*). Setelah nama terkunci, tampilkan *role* utama yang saya sukai dan geluti, yaitu: **Full-Stack Developer** & **AI Engineer** (menggunakan efek mesin tik atau *staggered fade-in-up*).
* **Skill Agent Target**: `.agent/skills/motion`, `.agents/skills` (GSAP ScrollTrigger & TextPlugin)

### 2. Education & Career Section (Horizontal Timeline)
* **Behavior (GSAP Pinning)**: 
    * Menggunakan teknik *Virtual Horizontal Scroll via Vertical Scroll*. Ketika user melakukan scroll vertikal, halaman akan terkunci (*pinned*) dan konten bergerak secara horizontal.
    * Tampilan awal (*default state*) adalah data **Last Education** (Pendidikan Terakhir) yang memenuhi layar (*viewport*).
    * Saat user lanjut melakukan scroll ke bawah, timeline akan bergeser ke kiri menampilkan riwayat edukasi dan karier terdahulu (*time series sequential*). Setelah batas horizontal habis, halaman kembali bisa di-scroll vertikal seperti biasa.
* **Skill Agent Target**: `.agents/skills` (GSAP ScrollTrigger & Pinning)

### 3. Project Section
* **Layout & Information**: 
    * Menampilkan daftar proyek dalam bentuk grid/list menggunakan **Card Component** yang menyerupai layout blog modern.
    * Setiap card menampilkan *thumbnail*, judul, deskripsi singkat, dan *tech stack tags* (seperti proyek IoT Catera, sistem SSO "The Bridge", atau Sortify).
* **Animation**: Memberikan efek *hover state* yang halus pada card (seperti *scale up*, *shadow lift*) dan animasi *staggered fade-in* saat section ini memasuki *viewport*.
* **Skill Agent Target**: `.agent/skills/vue`, `.agent/skills/ui-ux-pro-max`

### 4. About & Skills Section
* **Keahlian & Kompetensi**:
    * **Hard Skills & Tools**: Tampilan grid ikon interaktif untuk tools development, frameworks, dan core hardware/cloud tech yang dikuasai (Laravel, Filament, Flutter, Go, Python/FastAPI, Docker, ESP32, MQTT).
    * **Soft Skills**: Representasi visual yang minimalis.
    * **Sertifikat**: Komponen slider/carousel atau modal pop-up untuk menampilkan sertifikasi profesional yang valid (seperti dari Dicoding atau IBM SkillsBuild).
* **Skill Agent Target**: `.agent/skills/vue`, `.agent/skills/ui-ux-pro-max`

### 5. Contact Section
* **Minimalist Contact Form**:
    * Sisi Kiri/Kanan: Hiasan visual berupa ilustrasi/gambar statis yang estetik beserta tautan media sosial aktif (Instagram, WhatsApp, LinkedIn, dan Email).
    * Sisi Formulir: Input teks fungsional (`Name`, `Email`, `Message`) dengan validasi form (v-model di Vue). Form ini harus bisa memicu pengiriman pesan langsung ke email pemilik portofolio.
* **Skill Agent Target**: `.agent/skills/vue`, `.agent/skills/ui-ux-pro-max`

---

## Technical Stack & Agent Guidelines

### Technology Stack
* *Detail Framework dan Utilities dikonfigurasi berdasarkan isi dari `@AGENTS.md`.*

### Agent Skills Reference
Untuk memastikan hasil coding dan performa animasi optimal, manfaatkan modul internal berikut selama proses *code generation*:
* **Motion Architecture**: Gunakan modul `.agent/skills/motion` untuk transisi mikro halaman.
* **Vue Component Architecture**: Gunakan standar komponen modular berdasarkan `.agent/skills/vue`.
* **UI/UX Design Tokens**: Terapkan prinsip desain premium dari `.agent/skills/ui-ux-pro-max` (jarak/spacing, harmoni warna, dan responsivitas).
* **GSAP Core Implementation**: Untuk interaksi scroll kompleks di section Home dan Education, wajib merujuk pada *.agents/skills* (khususnya konfigurasi `ScrollTrigger` dan `TextPlugin` untuk animasi pergantian teks agar berjalan mulus).