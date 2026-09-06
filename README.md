# Kalkulator PPh 21 Sederhana

Aplikasi web client-side untuk menghitung estimasi Pajak Penghasilan Pasal 21 (PPh 21)
tahunan, berdasarkan gaji bruto, status pernikahan, jumlah tanggungan, dan iuran pensiun.

🔗 **Live demo:** https://fachrianoegrah.github.io/kalkulator-pph21/

## Fitur
- Hitung PTKP otomatis berdasarkan status kawin & jumlah tanggungan
- Hitung Biaya Jabatan otomatis (5% dari gaji bruto, maks. Rp 500.000/bulan)
- Input Iuran Pensiun karyawan (opsional, dikurangkan dari penghasilan kena pajak)
- Hitung PKP (Penghasilan Kena Pajak)
- Breakdown pajak per lapisan tarif progresif (Pasal 17 UU HPP)
- Potongan BPJS Kesehatan otomatis (1%, maks. dasar Rp 12.000.000/bulan) — mengurangi take-home, bukan pajak
- Estimasi take-home pay per bulan
- Riwayat perhitungan tersimpan otomatis (localStorage)

## Alur Perhitungan
Gaji Bruto/Bulan
→ dikurangi Biaya Jabatan
→ dikurangi Iuran Pensiun
→ dikurangi PTKP
= Penghasilan Kena Pajak (PKP)
→ dikenakan tarif progresif berlapis (5%–35%)
= Total Pajak Setahun

Take-home/Bulan = (Gaji Bruto Tahunan − Total Pajak) / 12 − BPJS Kesehatan/Bulan


## Tech Stack
Vanilla HTML, CSS, dan JavaScript — tanpa framework atau backend.

## Dasar Hukum
- UU No. 7 Tahun 2021 (UU HPP): tarif progresif Pasal 17, dasar PTKP
- UU No. 36 Tahun 2008 Pasal 21 ayat (3) & PMK No. 168/2023 | Biaya Jabatan dan Iuran Pensiun sebagai pengurang penghasilan bruto
- Perpres No. 75 Tahun 2019: batas dasar upah iuran BPJS Kesehatan

## ⚠️ Disclaimer
Kalkulator ini menghitung estimasi **pajak tahunan** menggunakan skema tarif progresif
Pasal 17 dengan asumsi skema **Gross** (karyawan menanggung pajaknya sendiri, tanpa
tunjangan pajak dari perusahaan) — bukan skema TER (Tarif Efektif Rata-rata) yang
dipakai untuk potongan bulanan sejak 2024 (PP 58/2023), dan bukan skema Gross Up.
Hasil bisa berbeda dari slip gaji resmi atau kalkulator DJP, terutama jika perusahaan
menanggung sebagian iuran BPJS atau memberi tunjangan pajak. Alat ini dibuat untuk
keperluan edukasi dan portfolio, bukan pengganti aplikasi resmi DJP/Coretax.

## Roadmap
- [ ] V2: skema TER bulanan
- [ ] V3: mode hitung Gross Up
- [ ] V4: dark mode