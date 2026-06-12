# Prompt Plan: Refactoring Motion Animation on `state-name-role` and Scroll Interactions

## Objective
Melakukan refactoring pada komponen animasi, khususnya pada state `state-name-role` untuk memperbaiki layouting teks dan menambahkan efek scroll-linked animation (efek parallax/split teks saat scroll). Serta memastikan transisi global untuk state lainnya menggunakan efek fade yang konsisten.

---

## 1. Layouting & Translating Text (`state-name-role`)
Ubah struktur dan inisial state layout pada blok `state-name-role` dengan ketentuan sebagai berikut:

*   **Tambahkan Teks Baru:** Di atas blok Nama, tambahkan teks `"Hello, I'm"`. Give it a slight italic style (miring) using CSS/Tailwind (`italic`).
*   **Split & Translate X Nama:** 
    *   Pisahkan nama menjadi dua bagian/elemen terpisah: `Farhan` (First Name) dan `Alwanda` (Last Name).
    *   **First Name (`Farhan`):** Berikan default offset/translate `-x` agar posisinya sedikit bergeser ke arah kiri dari posisi center awal.
    *   **Last Name (`Alwanda`):** Berikan default offset/translate `+x` agar posisinya sedikit bergeser ke arah kanan dari posisi center awal.

---

## 2. Scroll Animation Behavior (Scroll Down & Scroll Up)
Implementasikan scroll trigger atau scroll-driven animation pada state ini dengan mekanika berikut:

### Saat Scroll Ke Bawah (Scroll Down)
*   **Nama (Split Effect):** Teks `Farhan` akan bergerak semakin jauh ke arah **kiri**, dan teks `Alwanda` akan bergerak semakin jauh ke arah **kanan** mengikuti intensitas scroll.
*   **Elemen Lain (`Hello, I'm` & Skill/Role):** Mengalami efek **Fade Out** (opacity menurun menuju 0) seiring halaman di-scroll ke bawah.

### Saat Scroll Ke Atas (Scroll Up)
*   **Nama (Reversed Effect):** Teks `Farhan` masuk kembali dari arah **kiri**, dan teks `Alwanda` masuk kembali dari arah **kanan** hingga kembali ke posisi default translate awal mereka.
*   **Elemen Lain (`Hello, I'm` & Skill/Role):** Mengalami efek **Fade In** (opacity kembali muncul menuju 1).

---

## 3. Global States Consistency (State Selebihnya)
Untuk semua state atau seksi komponen di luar `state-name-role`, pastikan perilakunya sudah seragam dan konsisten:
*   Wajib menggunakan efek **Fade In** saat elemen memasuki viewport / aktif.
*   Wajib menggunakan efek **Fade Out** saat elemen keluar dari viewport / tidak aktif.

---

## Output yang Diharapkan
Berikan update potongan kode (baik itu React dengan Framer Motion, GSAP, atau CSS Scroll-Driven Animations) yang bersih, modular, dan langsung mengimplementasikan logika pergeseran koordinat $X$ serta opacity sesuai blueprint di atas.