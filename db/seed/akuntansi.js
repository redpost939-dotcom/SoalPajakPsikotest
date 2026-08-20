// ============================================================
// SEED AKUNTANSI DASAR — 4 bab, tiap bab: materi + soal
// ============================================================

const categories = [
  { tipe: 'akuntansi', kode: 'akuntansi-bab1', nama: 'Konsep Dasar Akuntansi', deskripsi: 'Pengertian akuntansi, persamaan dasar, jenis akun, dan aturan debit-kredit.', urutan: 10 },
  { tipe: 'akuntansi', kode: 'akuntansi-bab2', nama: 'Siklus Akuntansi & Jurnal', deskripsi: 'Tahapan siklus akuntansi, jurnal umum, buku besar, dan neraca saldo.', urutan: 11 },
  { tipe: 'akuntansi', kode: 'akuntansi-bab3', nama: 'Laporan Keuangan', deskripsi: 'Laba rugi, neraca, laporan perubahan ekuitas, dan laporan arus kas.', urutan: 12 },
  { tipe: 'akuntansi', kode: 'akuntansi-bab4', nama: 'Jurnal Penyesuaian', deskripsi: 'Penyesuaian beban dibayar di muka, pendapatan diterima di muka, penyusutan, dan beban terutang.', urutan: 13 }
];

const m = (kode, urutan, judul, isi) => ({ kode, urutan, judul, isi });
const q = (kode, urutan, pertanyaan, opsi, kunci, pembahasan) =>
  ({ kode, level: 'mudah', nomor_urutan: urutan, pertanyaan, diagram: null, opsi, kunci, pembahasan });

const materi = [
  // ---------------- BAB 1 ----------------
  m('akuntansi-bab1', 1, 'Pengertian dan Tujuan Akuntansi', `<p><b>Akuntansi</b> adalah proses mencatat, mengklasifikasikan, meringkas, melaporkan, dan menafsirkan informasi keuangan suatu entitas, sehingga penggunanya dapat mengambil keputusan ekonomi.</p><p>Informasi akuntansi disajikan dalam <b>laporan keuangan</b>: laporan laba rugi, laporan perubahan ekuitas, neraca, laporan arus kas, dan catatan atas laporan keuangan.</p>`),
  m('akuntansi-bab1', 2, 'Persamaan Dasar Akuntansi', `<p>Dasar seluruh pencatatan adalah persamaan:</p><p style="text-align:center;font-weight:bold;">ASET = LIABILITAS + EKUITAS</p><ul><li><b>Aset</b> — sumber daya yang dimiliki perusahaan (kas, piutang, persediaan, peralatan).</li><li><b>Liabilitas</b> — utang/kewajiban perusahaan kepada pihak lain.</li><li><b>Ekuitas</b> — hak pemilik atas aset setelah dikurangi liabilitas (modal).</li></ul><p>Setiap transaksi selalu menjaga keseimbangan persamaan ini (double-entry).</p>`),
  m('akuntansi-bab1', 3, 'Aturan Debit dan Kredit', `<table><tr><th>Jenis Akun</th><th>Bertambah</th><th>Berkurang</th><th>Saldo Normal</th></tr><tr><td>Aset</td><td>Debit</td><td>Kredit</td><td>Debit</td></tr><tr><td>Liabilitas</td><td>Kredit</td><td>Debit</td><td>Kredit</td></tr><tr><td>Ekuitas</td><td>Kredit</td><td>Debit</td><td>Kredit</td></tr><tr><td>Pendapatan</td><td>Kredit</td><td>Debit</td><td>Kredit</td></tr><tr><td>Beban</td><td>Debit</td><td>Kredit</td><td>Debit</td></tr></table>`),
  m('akuntansi-bab1', 4, 'Pengguna Informasi Akuntansi', `<ul><li><b>Eksternal:</b> investor, kreditur/bank, pemerintah, masyarakat.</li><li><b>Internal:</b> manajemen, pemilik perusahaan.</li></ul>`),

  // ---------------- BAB 2 ----------------
  m('akuntansi-bab2', 1, 'Siklus Akuntansi', `<ol><li>Transaksi terjadi & dokumen sumber</li><li>Analisis transaksi & pencatatan ke <b>jurnal umum</b></li><li>Posting ke <b>buku besar</b> (akun T)</li><li>Menyusun <b>neraca saldo</b></li><li>Jurnal penyesuaian & neraca saldo disesuaikan</li><li>Menyusun <b>laporan keuangan</b></li><li>Jurnal penutup & neraca saldo setelah penutupan</li></ol>`),
  m('akuntansi-bab2', 2, 'Jurnal Umum', `<p>Jurnal mencatat transaksi secara kronologis (double-entry): minimal satu sisi debit dan satu sisi kredit. Contoh:</p><ul><li>Membeli peralatan tunai: <b>Peralatan (D)</b> / <b>Kas (K)</b></li><li>Penjualan tunai: <b>Kas (D)</b> / <b>Penjualan (K)</b></li><li>Pemilik menyetor modal: <b>Kas (D)</b> / <b>Modal (K)</b></li></ul>`),
  m('akuntansi-bab2', 3, 'Buku Besar dan Neraca Saldo', `<p><b>Buku besar</b> memindahkan (posting) ayat jurnal ke akun masing-masing. <b>Neraca saldo</b> mendaftar saldo semua akun untuk memastikan total debit = total kredit.</p>`),

  // ---------------- BAB 3 ----------------
  m('akuntansi-bab3', 1, 'Laporan Laba Rugi', `<p>Menunjukkan kinerja perusahaan dalam satu periode:</p><p style="text-align:center;font-weight:bold;">PENDAPATAN − BEBAN = LABA BERSIH</p><p>Laba bersih akan menambah ekuitas (laba ditahan).</p>`),
  m('akuntansi-bab3', 2, 'Neraca', `<p>Menyajikan posisi keuangan pada satu titik waktu. Isinya: <b>Aset</b>, <b>Liabilitas</b>, dan <b>Ekuitas</b> (persamaan dasar akuntansi).</p>`),
  m('akuntansi-bab3', 3, 'Laporan Perubahan Ekuitas & Arus Kas', `<p><b>Perubahan ekuitas:</b> modal awal + laba bersih − prive/pemilik + setoran = modal akhir.</p><p><b>Arus kas:</b> kegiatan operasi, investasi, dan pendanaan.</p>`),
  m('akuntansi-bab3', 4, 'Harga Pokok Penjualan (HPP)', `<p style="text-align:center;font-weight:bold;">HPP = Persediaan awal + Pembelian − Persediaan akhir</p>`),

  // ---------------- BAB 4 ----------------
  m('akuntansi-bab4', 1, 'Tujuan Jurnal Penyesuaian', `<p>Agar laporan keuangan mencerminkan <b>pendapatan dan beban pada periode yang tepat</b> (accrual basis). Penyesuaian dilakukan di akhir periode.</p>`),
  m('akuntansi-bab4', 2, 'Jenis Penyesuaian', `<table><tr><th>Jenis</th><th>Jurnal</th></tr><tr><td>Beban dibayar di muka</td><td>Beban (D) / Aset (K)</td></tr><tr><td>Beban terutang (akrual)</td><td>Beban (D) / Utang (K)</td></tr><tr><td>Pendapatan diterima di muka</td><td>Liabilitas (D) / Pendapatan (K)</td></tr><tr><td>Penyusutan aset tetap</td><td>Beban penyusutan (D) / Akumulasi penyusutan (K)</td></tr><tr><td>Pendapatan yang masih akan diterima</td><td>Piutang (D) / Pendapatan (K)</td></tr></table>`)
];

const questions = [
  // BAB 1
  q('akuntansi-bab1', 1, 'Persamaan dasar akuntansi yang benar adalah...',
    ['Aset = Liabilitas + Ekuitas', 'Aset = Liabilitas - Ekuitas', 'Liabilitas = Aset + Ekuitas', 'Ekuitas = Aset + Liabilitas', 'Aset = Beban + Pendapatan'],
    1, 'Persamaan dasar: Aset = Liabilitas + Ekuitas.'),
  q('akuntansi-bab1', 2, 'Pemilik menyetor modal tunai Rp10.000.000. Pengaruhnya terhadap persamaan akuntansi adalah...',
    ['Kas bertambah dan ekuitas bertambah', 'Kas bertambah dan liabilitas bertambah', 'Kas berkurang dan ekuitas bertambah', 'Kas bertambah dan aset berkurang', 'Tidak ada pengaruh'],
    1, 'Setoran modal: aset (kas) +10 juta dan ekuitas (modal) +10 juta.'),
  q('akuntansi-bab1', 3, 'Pembelian peralatan secara kredit akan menyebabkan...',
    ['Aset bertambah dan liabilitas bertambah', 'Aset bertambah dan ekuitas bertambah', 'Aset berkurang dan liabilitas berkurang', 'Liabilitas bertambah dan ekuitas bertambah', 'Hanya aset yang berubah'],
    1, 'Peralatan (aset) + dan utang (liabilitas) +, tanpa memengaruhi ekuitas.'),
  q('akuntansi-bab1', 4, 'Berikut yang termasuk pengguna laporan keuangan EKSTERNAL adalah...',
    ['Investor dan kreditur', 'Manajemen', 'Pemilik', 'Kepala bagian akuntansi', 'Karyawan bagian pemasaran'],
    1, 'Investor dan kreditur berada di luar perusahaan (eksternal).'),
  q('akuntansi-bab1', 5, 'Jika akun aset bertambah, pencatatannya berada di sisi...',
    ['Debit', 'Kredit', 'Kanan', 'Bawah', 'Tidak berpengaruh'],
    1, 'Aset bertambah dicatat di debit (saldo normal aset = debit).'),

  // BAB 2
  q('akuntansi-bab2', 1, 'Urutan yang benar dalam siklus akuntansi adalah...',
    ['Transaksi → Jurnal → Buku besar → Neraca saldo → Laporan keuangan', 'Jurnal → Transaksi → Neraca saldo → Laporan', 'Neraca saldo → Jurnal → Transaksi', 'Buku besar → Transaksi → Jurnal', 'Laporan keuangan → Jurnal → Buku besar'],
    1, 'Siklus dimulai dari transaksi, dicatat di jurnal, diposting ke buku besar, lalu neraca saldo dan laporan keuangan.'),
  q('akuntansi-bab2', 2, 'Membeli perlengkapan secara tunai sebesar Rp500.000. Jurnalnya adalah...',
    ['Perlengkapan (D) / Kas (K) Rp500.000', 'Kas (D) / Perlengkapan (K)', 'Perlengkapan (D) / Utang (K)', 'Kas (D) / Penjualan (K)', 'Beban (D) / Kas (K)'],
    1, 'Pembelian tunai: aset perlengkapan bertambah (debit), kas berkurang (kredit).'),
  q('akuntansi-bab2', 3, 'Aturan pencatatan yang benar adalah...',
    ['Aset dan beban bertambah di debit; liabilitas, ekuitas, dan pendapatan bertambah di kredit', 'Semua akun bertambah di debit', 'Liabilitas bertambah di debit', 'Pendapatan bertambah di debit', 'Aset bertambah di kredit'],
    1, 'Aturan debit-kredit: aset & beban di debit; liabilitas, ekuitas, pendapatan di kredit.'),
  q('akuntansi-bab2', 4, 'Penjualan barang secara tunai Rp2.000.000. Jurnalnya adalah...',
    ['Kas (D) / Penjualan (K) Rp2.000.000', 'Penjualan (D) / Kas (K)', 'Kas (D) / Piutang (K)', 'Piutang (D) / Penjualan (K)', 'Beban (D) / Kas (K)'],
    1, 'Kas bertambah (debit), pendapatan penjualan bertambah (kredit).'),
  q('akuntansi-bab2', 5, 'Fungsi neraca saldo adalah...',
    ['Memastikan total debit sama dengan total kredit', 'Menghitung laba bersih', 'Mencatat transaksi harian', 'Menghitung HPP', 'Menghitung arus kas'],
    1, 'Neraca saldo menguji keseimbangan debit-kredit sebelum laporan keuangan.'),

  // BAB 3
  q('akuntansi-bab3', 1, 'Laba bersih dalam laporan laba rugi dihitung dengan rumus...',
    ['Pendapatan - Beban', 'Aset - Liabilitas', 'Pendapatan + Beban', 'Kas masuk - Kas keluar', 'Modal akhir - Modal awal'],
    1, 'Laba bersih = Pendapatan - Beban.'),
  q('akuntansi-bab3', 2, 'Berikut yang disajikan dalam NERACA adalah...',
    ['Aset, liabilitas, dan ekuitas', 'Pendapatan dan beban', 'Penjualan dan HPP', 'Arus kas operasi', 'Dividen'],
    1, 'Neraca menyajikan posisi aset, liabilitas, dan ekuitas.'),
  q('akuntansi-bab3', 3, 'Akun "Beban sewa" akan dilaporkan pada...',
    ['Laporan laba rugi', 'Neraca', 'Laporan perubahan ekuitas', 'Laporan arus kas', 'Catatan atas laporan'],
    1, 'Semua beban masuk laporan laba rugi.'),
  q('akuntansi-bab3', 4, 'Harga pokok penjualan dihitung dengan...',
    ['Persediaan awal + Pembelian - Persediaan akhir', 'Persediaan awal - Pembelian + Persediaan akhir', 'Pembelian - Penjualan', 'Persediaan akhir - Persediaan awal', 'Pendapatan - Beban'],
    1, 'HPP = Persediaan awal + Pembelian − Persediaan akhir.'),
  q('akuntansi-bab3', 5, 'Jika laba bersih meningkat, maka ekuitas akan...',
    ['Bertambah', 'Berkurang', 'Tetap', 'Menjadi nol', 'Tidak berubah'],
    1, 'Laba bersih menambah laba ditahan, sehingga ekuitas bertambah.'),

  // BAB 4
  q('akuntansi-bab4', 1, 'Perusahaan membayar sewa Rp12.000.000 untuk 1 tahun pada bulan Januari. Jika dicatat sebagai aset, jurnal penyesuaian di akhir bulan adalah...',
    ['Beban sewa (D) / Sewa dibayar di muka (K)', 'Sewa dibayar di muka (D) / Kas (K)', 'Beban sewa (D) / Kas (K)', 'Kas (D) / Beban sewa (K)', 'Tidak perlu penyesuaian'],
    1, 'Sebagian sewa yang sudah menjadi beban dipindahkan dari aset ke beban.'),
  q('akuntansi-bab4', 2, 'Pencatatan penyusutan peralatan pada akhir periode adalah...',
    ['Beban penyusutan (D) / Akumulasi penyusutan (K)', 'Akumulasi penyusutan (D) / Peralatan (K)', 'Peralatan (D) / Beban penyusutan (K)', 'Beban penyusutan (D) / Kas (K)', 'Kas (D) / Peralatan (K)'],
    1, 'Penyusutan: beban di debit, akumulasi penyusutan (kontra-aset) di kredit.'),
  q('akuntansi-bab4', 3, 'Gaji karyawan Rp2.000.000 belum dibayar sampai akhir periode. Jurnal penyesuaian yang benar adalah...',
    ['Beban gaji (D) / Utang gaji (K)', 'Utang gaji (D) / Beban gaji (K)', 'Kas (D) / Beban gaji (K)', 'Beban gaji (D) / Kas (K)', 'Gaji dibayar di muka (D) / Kas (K)'],
    1, 'Beban yang belum dibayar: beban di debit, utang di kredit (akrual).'),
  q('akuntansi-bab4', 4, 'Pendapatan diterima di muka Rp3.000.000, baru Rp1.000.000 yang menjadi hak perusahaan. Jumlah yang diakui sebagai pendapatan adalah...',
    ['Rp1.000.000', 'Rp3.000.000', 'Rp2.000.000', 'Rp4.000.000', 'Rp0'],
    1, 'Hanya bagian yang sudah menjadi hak (earned) yang diakui sebagai pendapatan.'),
  q('akuntansi-bab4', 5, 'Tujuan utama jurnal penyesuaian adalah...',
    ['Mencocokkan pendapatan dan beban dengan periode yang bersangkutan', 'Menutup buku', 'Menghitung HPP', 'Mencatat transaksi penjualan', 'Menghitung pajak'],
    1, 'Penyesuaian menerapkan prinsip pencocokan (matching principle) pada basis akrual.')
];

module.exports = { categories, questions, materi };