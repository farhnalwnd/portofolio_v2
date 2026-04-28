# Panduan Pengembangan Portfolio v2 - ScrollTrigger "The Gateway"

Dokumen ini berisi panduan untuk mengembangkan lebih lanjut Hero Section pada halaman utama (`/`) menggunakan **GSAP ScrollTrigger**. Instruksi ini dirancang agar mudah diikuti oleh junior developer atau model AI dengan berfokus pada fitur *pin* dan *scrub*.

## 🎯 Tujuan Utama (Task)

Menambahkan efek animasi berbasis scroll pada rute `/` menggunakan **ScrollTrigger**. 
Fokus utama adalah menahan (*pin*) layar saat pengguna melakukan scroll, dan perlahan-lahan memunculkan (*scrub*) teks identitas "THE GATEWAY" beserta elemen lain yang saat ini sudah ada di dalam tag `<template>`.

---

## 📜 Panduan Animasi dengan ScrollTrigger (Pin & Scrub)

Berdasarkan *best practice* GSAP untuk Vue (`gsap-frameworks` & `gsap-scrolltrigger`), berikut adalah cara mengimplementasikan efek tersebut tanpa membahas hal teknis yang terlalu rumit:

### 1. Registrasi Plugin ScrollTrigger
Sebelum bisa menggunakan fitur scroll, plugin harus didaftarkan terlebih dahulu. Lakukan ini di luar atau di awal blok komponen:
```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

### 2. Konsep Pin dan Scrub
- **Pin (`pin: true`)**: Berfungsi untuk menempelkan/menahan sebuah elemen (biasanya kontainer utama) agar tidak ikut ter-scroll ke atas sampai animasi selesai.
- **Scrub (`scrub: 1`)**: Menghubungkan progres animasi dengan posisi scroll pengguna. Jika pengguna scroll ke bawah, animasi maju. Jika scroll ke atas, animasi mundur. Angka `1` memberikan efek *smooth/lag* selama 1 detik agar animasi terasa lebih halus.

### 3. Integrasi ScrollTrigger ke dalam Timeline
Jangan memasukkan `ScrollTrigger` pada setiap elemen kecil. Cukup letakkan pada konfigurasi utama `gsap.timeline()`.

Contoh implementasi:
```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.value, // Elemen yang akan men-trigger animasi
    start: "top top",            // Animasi dimulai saat ujung atas elemen menyentuh ujung atas layar
    end: "+=1500",               // Animasi berakhir setelah pengguna scroll sejauh 1500px
    pin: true,                   // Tahan layar
    scrub: 1                     // Hubungkan animasi dengan scroll (halus)
  }
});
```
*Setelah timeline dibuat, Anda bisa menambahkan urutan elemen yang akan muncul (fade in/geser) seperti biasa menggunakan `tl.to(...)` atau `tl.from(...)`.*

### 4. Cleanup (Sangat Penting di Vue 3)
Pastikan semua pembuatan ScrollTrigger dan Timeline dilakukan di dalam `gsap.context()` pada `onMounted`, dan dibersihkan pada `onUnmounted` menggunakan `ctx.revert()`. `gsap.context()` akan otomatis membersihkan semua ScrollTrigger yang dibuat di dalamnya.

## 💡 Ringkasan Langkah Implementasi
1. Buka file `HomeView.vue`.
2. Import `ScrollTrigger` dari `gsap/ScrollTrigger` dan panggil `gsap.registerPlugin(ScrollTrigger)`.
3. Modifikasi `gsap.timeline` yang sudah ada agar menyertakan objek `scrollTrigger` dengan parameter `pin: true` dan `scrub: 1`.
4. Sesuaikan nilai awal elemen (misal `opacity: 0`, `y: 100`) dengan `gsap.set()`.
5. Saat pengguna melakukan scroll, timeline akan memunculkan teks "THE GATEWAY" dan elemen lainnya secara berurutan menyesuaikan dengan seberapa jauh scroll dilakukan.
