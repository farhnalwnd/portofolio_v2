---
title: "Catera (Catering Tap Entry & Record Access)"
description: "Sistem manajemen kuota makanan berbasis IoT yang menerapkan ESP32 dan RFID untuk menghapus kecurangan katering dan memastikan distribusi makanan sesuai kebijakan."
category: "Internet of Things"
categoryShort: "IoT"
featured: false
year: 2026
order: 2
tech:
  - "ESP32"
  - "RFID"
  - "Node-RED"
  - "Laravel"
  - "Filament"
  - "Livewire"
# thumbnail: "/image.png"
links:
  github: ""
  demo: null
---
**Catera** adalah solusi digital IoT end-to-end yang dirancang untuk mengoptimalkan manajemen kuota makan karyawan dan mencegah kebocoran biaya operasional.

### Fitur Utama
- **Integrasi ESP32 & RFID**: Verifikasi otomatis ID card karyawan di pintu masuk kafetaria.
- **Pipeline Data Real-Time**: Middleware berbasis `Node-RED` yang menghubungkan sensor fisik ke database server.
- **Portal Admin Filament**: Dashboard terpadu menggunakan `Laravel Filament` dan `Livewire` untuk log akses.
- **Pencegahan Kecurangan**: Membatasi ketukan ganda dan memastikan pembagian porsi makan sesuai jatah karyawan.
