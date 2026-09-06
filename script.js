function hitungPajakProgresif(pkp) {
  const lapisan = [
    { batas: 60000000, tarif: 0.05 },
    { batas: 190000000, tarif: 0.15 },
    { batas: 250000000, tarif: 0.25 },
    { batas: 4500000000, tarif: 0.30 },
    { batas: Infinity, tarif: 0.35 }
  ];

  let sisa = pkp;
  let totalPajak = 0;
  const rincian = [];

  for (const { batas, tarif } of lapisan) {
    if (sisa <= 0) break;
    const kena = Math.min(sisa, batas);
    const pajakLapisan = kena * tarif;
    totalPajak += pajakLapisan;
    rincian.push({ tarif, kena, pajakLapisan });
    sisa -= kena;
  }

  return { totalPajak, rincian };
}

function hitungPTKP(status, tanggungan) {
  const dasar = 54000000;
  const tambahanKawin = status === 'K' ? 4500000 : 0;
  const tambahanTanggungan = Math.min(tanggungan, 3) * 4500000;  // maksimal 3 tanggungan
  return dasar + tambahanKawin + tambahanTanggungan;
}

function hitungBiayaJabatan(gajiBrutoTahunan) {
  const biaya = gajiBrutoTahunan * 0.05;
  const batasMaksimal = 6000000; // Rp 500.000 x 12 bulan
  return Math.min(biaya, batasMaksimal);
}

function hitungPKP(gajiBrutoTahunan, biayaJabatan, ptkp) {
  const pkp = gajiBrutoTahunan - biayaJabatan - ptkp;
  return Math.max(pkp, 0);
}

function hitungSemua(gajiBulanan, status, tanggungan) {
  const gajiBrutoTahunan = gajiBulanan * 12;
  const ptkp = hitungPTKP(status, tanggungan);
  const biayaJabatan = hitungBiayaJabatan(gajiBrutoTahunan);
  const pkp = hitungPKP(gajiBrutoTahunan, biayaJabatan, ptkp);
  const { totalPajak, rincian } = hitungPajakProgresif(pkp);
  const takeHomePerBulan = (gajiBrutoTahunan - totalPajak) / 12;

  return { ptkp, pkp, biayaJabatan, totalPajak, takeHomePerBulan, rincian };
}

const inputGaji = document.getElementById('gaji');
const inputStatus = document.getElementById('status');
const inputTanggungan = document.getElementById('tanggungan');
const btnHitung = document.getElementById('btnHitung');
const pesanError = document.getElementById('pesanError');
const kartuHasil = document.getElementById('kartuHasil');

function formatRupiah(angka) {
  return 'Rp ' + Math.round(angka).toLocaleString('id-ID');
}

function validasiInput(gaji, tanggungan) {
  if (isNaN(gaji) || gaji <= 0) {
    return 'Gaji bruto harus diisi dengan angka lebih dari 0.';
  }
  if (isNaN(tanggungan) || tanggungan < 0) {
    return 'Jumlah tanggungan tidak valid.';
  }
  return null;  // null artinya tidak ada error
}

function tampilkanHasil(hasil, gajiBrutoTahunan) {
  document.getElementById('hasilPtkp').textContent = formatRupiah(hasil.ptkp);
  document.getElementById('hasilPkp').textContent = formatRupiah(hasil.pkp);
  document.getElementById('hasilTotalPajak').textContent = formatRupiah(hasil.totalPajak);
  document.getElementById('hasilTakeHome').textContent = formatRupiah(hasil.takeHomePerBulan);
  document.getElementById('hasilBiayaJabatan').textContent = formatRupiah(hasil.biayaJabatan);


  const tabel = document.getElementById('tabelRincian');
  tabel.innerHTML = '<tr><th>Tarif</th><th>PKP Kena</th><th>Pajak</th></tr>';
  hasil.rincian.forEach(baris => {
    tabel.innerHTML += `<tr>
      <td>${baris.tarif * 100}%</td>
      <td>${formatRupiah(baris.kena)}</td>
      <td>${formatRupiah(baris.pajakLapisan)}</td>
    </tr>`;
  });

  kartuHasil.hidden = false;  // munculkan kartu hasil yang tadinya disembunyiin
}

btnHitung.addEventListener('click', () => {
  const gajiBulanan = parseFloat(inputGaji.value);
  const status = inputStatus.value;
  const tanggungan = parseInt(inputTanggungan.value);

  const error = validasiInput(gajiBulanan, tanggungan);
  if (error) {
    pesanError.textContent = error;
    kartuHasil.hidden = true;
    return;
  }
  pesanError.textContent = '';

  const hasil = hitungSemua(gajiBulanan, status, tanggungan);
  tampilkanHasil(hasil);

  const entry = {
    id: Date.now(),
    tanggal: new Date().toLocaleDateString('id-ID'),
    gajiBulanan,
    status,
    tanggungan,
    ptkp: hasil.ptkp,
    pkp: hasil.pkp,
    totalPajakTahun: hasil.totalPajak,
    takeHomePerBulan: hasil.takeHomePerBulan
  };
  simpanRiwayat(entry);
  tampilkanRiwayat();
});

// LocalStorage
function simpanRiwayat(entry) {
  const data = JSON.parse(localStorage.getItem('riwayatPajak')) || [];
  data.unshift(entry);  // taruh di depan array, biar yang terbaru muncul paling atas
  localStorage.setItem('riwayatPajak', JSON.stringify(data));
}

function tampilkanRiwayat() {
  const data = JSON.parse(localStorage.getItem('riwayatPajak')) || [];
  const daftar = document.getElementById('daftarRiwayat');
  daftar.innerHTML = '';  // kosongin dulu sebelum digambar ulang, biar nggak dobel

  data.forEach(entry => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${entry.tanggal} — Gaji ${formatRupiah(entry.gajiBulanan)}/bln
      (${entry.status}, ${entry.tanggungan} tanggungan): Pajak ${formatRupiah(entry.totalPajakTahun)}/thn</span>
      <button class="btnHapus" data-id="${entry.id}">Hapus</button>
    `;
    daftar.appendChild(li);
  });
}

document.getElementById('daftarRiwayat').addEventListener('click', (e) => {
  if (e.target.classList.contains('btnHapus')) {
    const id = Number(e.target.dataset.id);
    hapusRiwayat(id);
  }
});

function hapusRiwayat(id) {
  const data = JSON.parse(localStorage.getItem('riwayatPajak')) || [];
  const dataBaru = data.filter(entry => entry.id !== id);
  localStorage.setItem('riwayatPajak', JSON.stringify(dataBaru));
  tampilkanRiwayat();  // gambar ulang daftar setelah satu entry dihapus
}


tampilkanRiwayat();