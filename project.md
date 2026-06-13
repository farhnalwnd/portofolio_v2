## 🤖 2. Prompt Instruksi (Jika Ingin Dipakai ke AI Lain)

Jika Anda butuh teks penjelasan (*prompt*) untuk menyuruh AI menghasilkan kode pemrograman spesifik dari diagram grid Anda yang baru (6 baris), gunakan prompt ini:

> **Prompt:**
> "Buatkan kode layout grid kustom dengan basis matriks **6 baris (c1 s.d c6)** dan **4 kolom (r1 s.d r4)** menggunakan [Sebutkan teknologi: Tailwind CSS / CSS Grid / HTML Table]. 
> 
> Lakukan penggabungan sel (cell spanning/merging) dengan aturan per baris sebagai berikut:
> 1. **Baris 1 (c1):** Gabungkan kolom 1-2 (span 2), lalu gabungkan kolom 3-4 (span 2).
> 2. **Baris 2 (c2):** Gabungkan kolom 1-2 (span 2), lalu gabungkan kolom 3-4 (span 2).
> 3. **Baris 3 (c3):** Kolom 1 (sel tunggal), Kolom 2 (sel tunggal), lalu gabungkan kolom 3-4 (span 2).
> 4. **Baris 4 (c4):** Kolom 1 (sel tunggal), lalu gabungkan kolom 2-3 (span 2), Kolom 4 (sel tunggal).
> 5. **Baris 5 (c5):** Gabungkan kolom 1-2 (span 2), Kolom 3 (sel tunggal), Kolom 4 (sel tunggal).
> 6. **Baris 6 (c6):** Gabungkan kolom 1-2 (span 2), lalu gabungkan kolom 3-4 (span 2).
> 
> Berikan styling border pembatas hitam tipis dan warna latar belakang (*background tint*) yang berbeda pada sel-sel hasil gabungan (span) agar terlihat jelas polanya."