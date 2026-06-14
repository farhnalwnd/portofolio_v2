# Plan & Laporan Optimalisasi GSAP Mobile - portofolio-v2

Dokumen ini berisi analisis masalah, rencana optimalisasi (plan) dari Fase 1 hingga Fase 4, serta laporan pembaruan status implementasi yang telah diselesaikan.

---

## 1. Analisis Masalah & Rencana Optimalisasi

### A. Animasi Salah & Layout Thrashing (Properti CSS)
*   **Analisis**: Animasi yang menggunakan properti layout (`top`, `left`, `width`, `height`, `margin`, `padding`) memaksa browser melakukan kalkulasi ulang layout (*reflow*) dan menggambar ulang (*repaint*).
*   **Rencana**: Memastikan semua animasi perpindahan/posisi menggunakan properti transform (`x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`) dan `opacity` yang diakselerasi oleh hardware GPU.
*   **Status**: **Terverifikasi Aman**. Seluruh animasi di codebase telah dikonfigurasi menggunakan transform (`x`, `y`, `xPercent`) dan `opacity`.

### B. Beban Grafis Berat & Efek Jank pada Mobile
*   **Analisis**: 
    1.  Penggunaan filter blur yang besar (`blur-[90px]`, `blur-[110px]`) pada dekorasi latar belakang (blobs) sangat membebani GPU perangkat seluler.
    2.  Animasi mesh (`animate-mesh-1`, `animate-mesh-2`) yang bergerak secara terus-menerus (*infinite CSS animation*) menyebabkan pemakaian CPU/GPU yang konstan.
    3.  Animasi melayang (*infinite floating loop*) pada seluruh kartu `soft-skill-item` berjalan di latar belakang tanpa henti, memicu render cycle yang berat.
*   **Rencana**:
    -   Mematikan animasi CSS keyframes untuk mesh blobs di layar mobile, membiarkannya statis.
    -   Membatasi trigger inisiasi transisi masuk menggunakan `scrollTrigger` dengan parameter `once: true`.
*   **Status**: **Selesai Diimplementasikan**.
    -   Ditambahkan CSS media query `@media (max-width: 767px)` di `main.css` untuk menonaktifkan `@keyframes float-mesh`.
    -   Animasi floating soft skills tetap dipertahankan untuk semua ukuran layar (berjalan secara global di luar matchMedia `min-width: 768px`) untuk menjaga estetika transisi floating yang interaktif di mobile.

### C. Ukuran Layar Dinamis & Pengaturan Refresh
*   **Analisis**:
    1.  ScrollTrigger terkadang menghitung posisi trigger sebelum elemen/font termuat sepenuhnya, menghasilkan posisi trigger meleset (*misaligned*).
    2.  Penggunaan timeout fixed (`setTimeout 100ms`) pada fungsi refresh tidak selalu andal untuk berbagai kecepatan perangkat dan seringkali masih terlalu cepat.
*   **Rencana**:
    -   Mengoptimalkan fungsi `usePageAnimation.js` agar memicu `ScrollTrigger.refresh()` setelah DOM benar-benar siap menggunakan `requestAnimationFrame` ganda (`double-rAF`), yang lebih presisi dibandingkan `setTimeout` fixed.
*   **Status**: **Selesai Diimplementasikan** pada `usePageAnimation.js`.

    **Perubahan aktual pada `src/composables/usePageAnimation.js`:**
    ```javascript
    // Sebelum (broken/terlalu cepat)
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    // Sesudah (presisi, menunggu frame render berikutnya)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    })
    ```

### D. Fitur Scroll Horizontal Technical Skills (AboutView.vue)
*   **Analisis**:
    -   Horizontal scroll diatur menggunakan GSAP ScrollTrigger dengan pin di container, namun ditargetkan hanya pada desktop (`min-width: 768px`).
    -   Di mobile, scroll horizontal tidak aktif sama sekali dan konten terpotong karena pembungkus luar (`AboutView.vue`) dipasangi properti CSS `overflow-x-hidden` di tingkat root.
*   **Rencana**:
    -   Menghapus `overflow-x-hidden` dari root container `AboutView.vue` agar container tidak terpotong.
    -   Mengimplementasikan native touch scroll (`overflow-x-auto`) CSS di mobile untuk `TechnicalSkills.vue` agar user bisa menggeser skill secara horizontal tanpa jank.
    -   Memberikan efek snap scroll agar interaksi terasa native dan responsif.
*   **Status**: **Selesai Diimplementasikan**.
    -   `AboutView.vue` diperbarui untuk menghapus kelas `overflow-x-hidden`.
    -   `TechnicalSkills.vue` dirombak dengan memisahkan layout desktop (GSAP ScrollTrigger Pinned) dan layout mobile (Native CSS Scroll Snap & Touch).

### E. Animasi Timeline Education (EducationView.vue)
*   **Analisis**:
    -   Pada mobile, timeline horizontal disimulasikan dengan mem-pin layar penuh (`h-screen`) dan menerjemahkan track secara vertikal. 
    -   Rasio scroll range (`window.innerWidth * 2`) terlalu kecil dibanding total gap card vertikal (`75vh * 6 cards` = 450vh), membuat perpindahan kartu terasa sangat liar, liar, dan cepat.
*   **Rencana**:
    -   Mengganti sistem pin-scroll di mobile dengan **Carousel Horizontal Sederhana** berbasis swipe/sentuhan.
    -   Menggunakan Vue `Transition` untuk transisi slide yang mulus dan bebas jank.
    -   Menambahkan dot navigasi dan button navigasi.
    -   Mempertahankan animasi GSAP ScrollTrigger desktop yang asli secara utuh untuk ukuran layar `>= 768px`.
*   **Status**: **Selesai Diimplementasikan**.
    -   Carousel mobile diimplementasikan di `EducationView.vue` dengan pemrosesan sentuh (`touchstart`, `touchmove`, `touchend`).
    -   Transisi slide diatur menggunakan transisi Vue 3 dengan efek scale & slide yang mulus.

---

## 2. Rincian Perubahan File & Pembuktian Code

### 1. `src/assets/main.css` (Menonaktifkan animasi berat di mobile)
```css
@media (max-width: 767px) {
  .animate-mesh-1,
  .animate-mesh-2 {
    animation: none;
  }
}
```

### 2. `src/views/AboutView.vue` (Pemisahan MatchMedia & Penghapusan Overflow)
*   Menghapus `overflow-x-hidden` dari container root.
*   Mempertahankan infinite float `soft-skill-item` agar tetap aktif di semua ukuran layar untuk interaktivitas mobile.
*   Menambahkan entrance trigger `once: true` untuk mobile skill categories.

### 3. `src/components/TechnicalSkills.vue` (Native touch scroll & snap)
*   Membuat dual template: `hidden md:block` (Desktop GSAP layout) dan `md:hidden` (Mobile CSS Snap Scroll layout).
*   Menambahkan style:
    ```css
    .mobile-scroll-wrapper {
      -ms-overflow-style: none;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      scroll-snap-type: x proximity;
    }
    .mobile-scroll-wrapper > div > * {
      scroll-snap-align: start;
    }
    ```

### 4. `src/views/EducationView.vue` (Mobile Carousel & Desktop Timeline Scroll)
*   Mengintegrasikan `@vueuse/core` `useWindowSize` untuk mendeteksi mode mobile secara dinamis.
*   Menyediakan fungsi navigasi `nextSlide` / `prevSlide` / `setSlide` yang merubah `activeIndex`.
*   Menerapkan fungsi swipe detection berdasarkan koordinat `clientX`.
*   Menyematkan Vue `<Transition>` di template mobile untuk menggerakkan kartu ketika slide digeser.

### 5. `src/composables/usePageAnimation.js` (Refresh Timing Lebih Presisi)
*   Mengganti `setTimeout(() => ScrollTrigger.refresh(), 100)` dengan pola `requestAnimationFrame` ganda.
*   Menjamin posisi ScrollTrigger dihitung ulang tepat setelah browser selesai me-render frame terbaru.

---

## 3. Hasil Pengujian Verifikasi
- **Linting & Formatting**: Dijalankan menggunakan `npm run format` dan `npm run lint`. Hasil: **0 warnings, 0 errors**.
- **Build Compiling**: Dijalankan dengan `npm run build`. Hasil: **Sukses terkompilasi** dengan ukuran bundle yang efisien dan optimal.
