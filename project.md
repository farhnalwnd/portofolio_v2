# Prompt Plan: Refactoring Histories Page to alternating Zig-Zag Timeline with Scroll Animations

## Objective
Mengubah struktur layout dan animasi pada halaman **Histories**. Setelah tampilan utama (*initial state*) di-scroll, card utama (*Latest Card*) akan bergeser ke kiri untuk menjadi bagian dari awal timeline. Selanjutnya, proses scroll akan memunculkan garis tali (timeline bar) di tengah layar, dan card dari `education.js` akan muncul secara bergantian di sisi kiri dan kanan tali tersebut dengan efek animasi masuk yang halus.

---

## 1. Initial State & First Scroll Transition
* **Initial View:** Saat halaman pertama kali dibuka, *Latest Card* berada tepat di tengah viewport sebagai sorotan utama, dilengkapi dengan Header di bagian atas.
* **First Scroll Action:** 
    * Teks Header akan mengalami efek **Fade Out**.
    * *Latest Card* akan mengecil secara proporsional dan melakukan **Translate X ke arah kiri** untuk memposisikan dirinya sebagai titik awal (node pertama) di sebelah kiri garis tengah.

---

## 2. The Mid-Line (Tali Timeline) & Alternating Layout
Setelah *Latest Card* berpindah ke kiri, elemen-elemen berikut akan aktif secara dinamis berbasis progress scroll:

* **Tali Timeline (Center Line):** Sebuah garis vertikal di tengah layar (`left: 50%` atau `justify-center`) akan memanjang ke bawah mengikuti arah scroll pengguna (*scroll-driven height/draw effect*).
* **Alternating Cards (Data dari `education.js`):**
    * Card yang di-render dari `education.js` harus tersusun secara **zig-zag (bergantian)** di sepanjang tali tengah.
    * Jika *Latest Card* sudah berada di Kiri, maka card pertama dari `education.js` akan berada di **Kanan**, card berikutnya di **Kiri**, lalu **Kanan**, dan seterusnya (menggunakan kondisi indeks `index % 2 === 0`).

---

## 3. Scroll-Linked Animation Details
Berikan efek interaksi mikro (*micro-interactions*) pada setiap card dan tali saat viewport mendeteksinya (*scroll-triggered* atau *scroll-linked*):

* **Animasi Tali Tengah:** Garis timeline vertikal tampak seperti "digambar" dari atas ke bawah seiring bertambahnya progress scroll.
* **Card Masuk dari Kiri (Index Genap):** Muncul dengan kombinasi **Fade In** dan sedikit sentuhan **Translate X dari kiri ke kanan** (seperti ditarik mendekati tali tengah) serta sedikit rotasi ringan (*subtle tilt*).
* **Card Masuk dari Kanan (Index Ganjil):** Muncul dengan kombinasi **Fade In** dan **Translate X dari kanan ke kiri** (mendekati tali tengah).
* **Scroll Reversed (Up):** Ketika di-scroll ke atas, semua komponen akan melakukan transisi mundur secara halus (*fade out* dan kembali ke posisi luar) hingga *Latest Card* kembali ke posisi tengah semula.

---

## Output yang Diharapkan
Berikan struktur kode komponen yang diperbarui (disarankan menggunakan React, Tailwind CSS, dan Framer Motion/GSAP). Pastikan logika pembagian indeks ganjil/genap untuk posisi kiri-kanan berjalan otomatis berdasarkan urutan data di `education.js`.