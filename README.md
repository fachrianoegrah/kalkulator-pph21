# Kalkulator PPh 21 Sederhana

Aplikasi web client-side untuk menghitung estimasi Pajak Penghasilan Pasal 21 (PPh 21)
tahunan, berdasarkan gaji bruto, status pernikahan, dan jumlah tanggungan.

🔗 **Live demo:** https://fachrianoegrah.github.io/kalkulator-pph21/

## Fitur
- Hitung PTKP otomatis berdasarkan status kawin & jumlah tanggungan
- Hitung Biaya Jabatan otomatis (5%, maks. Rp 500.000/bulan)
- Input Iuran Pensiun karyawan (opsional)
- Hitung PKP (Penghasilan Kena Pajak)
- Breakdown pajak per lapisan tarif progresif (Pasal 17 UU HPP)
- Estimasi take-home pay per bulan
- Riwayat perhitungan tersimpan otomatis (localStorage)

## Tech Stack
Vanilla HTML, CSS, dan JavaScript (tanpa framework atau backend).

## Dasar Hukum
- UU No. 7 Tahun 2021 (UU HPP) | tarif progresif Pasal 17, dasar PTKP

## ⚠️ Disclaimer
Kalkulator ini menghitung estimasi **pajak tahunan** menggunakan skema tarif
progresif Pasal 17, bukan skema TER (Tarif Efektif Rata-rata) yang dipakai untuk
potongan bulanan sejak 2024 (PP 58/2023). Hasil bisa berbeda dari slip gaji resmi
atau kalkulator DJP. Alat ini dibuat untuk keperluan edukasi dan portfolio, bukan
pengganti aplikasi resmi DJP/Coretax.

## Roadmap
- [ ] V2: skema TER bulanan
- [ ] V3: potongan BPJS Kesehatan (pengurang take-home, bukan PKP), mode hitung gross-up
- [ ] V4: dark mode