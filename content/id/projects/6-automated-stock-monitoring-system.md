---
title: "Automated Stock Monitoring System"
description: "Sistem inventaris real-time dengan deteksi ambang batas otomatis dan pelaporan Excel otomatis."
category: "Web Development"
categoryShort: "Web"
featured: false
year: 2025
order: 6
tech:
  - "Laravel"
  - "Laravel Jobs"
  - "Laravel Mail"
  - "PHP"
links:
  github: ""
  demo: null
---
Sistem otomatisasi backend untuk memantau status inventaris gudang dan meminimalkan keterlambatan pelacakan logistik.

### Fitur Utama
- **Antrean Pemantauan Asinkron**: Analisis stok secara berkala menggunakan `Laravel Jobs` untuk efisiensi beban server.
- **Notifikasi Email Otomatis**: Mengirimkan peringatan instan ke person-in-charge saat stok berada di bawah batas minimum via `Laravel Mail`.
- **Ekspor Laporan Terjadwal**: Mengompilasi data log inventaris mingguan/bulanan langsung ke lampiran Excel.
