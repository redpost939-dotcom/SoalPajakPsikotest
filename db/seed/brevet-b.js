// ============================================================
// SEED BREVET B — 4 bab: PPh Badan & PPh 25, PPN Lanjutan,
// PPh 24 & 26, Akuntansi Pajak / SPT / Sanksi
// ============================================================

const categories = [
  { tipe: 'pajak', kode: 'brevet-b-bab1', nama: 'PPh Badan & Angsuran PPh 25', deskripsi: 'Tarif PPh badan, fasilitas, PPh final 0,5% UMKM, kredit pajak, dan angsuran PPh 25.', urutan: 24 },
  { tipe: 'pajak', kode: 'brevet-b-bab2', nama: 'PPN Lanjutan', deskripsi: 'Faktur pajak & e-Faktur, pengkreditan PPN masukan, DPP nilai lain, dan tarif 12% barang mewah.', urutan: 25 },
  { tipe: 'pajak', kode: 'brevet-b-bab3', nama: 'PPh 24 & 26 (Aspek Internasional)', deskripsi: 'Kredit pajak luar negeri, batas maksimum kredit, PPh 26, branch profit tax, dan tax treaty.', urutan: 26 },
  { tipe: 'pajak', kode: 'brevet-b-bab4', nama: 'Akuntansi Pajak, SPT & Sanksi', deskripsi: 'Koreksi fiskal, beda tetap & beda waktu, penyusutan fiskal, pemeriksaan, keberatan, dan sanksi.', urutan: 27 }
];

const m = (kode, urutan, judul, isi) => ({ kode, urutan, judul, isi });
const q = (kode, urutan, pertanyaan, opsi, kunci, pembahasan) =>
  ({ kode, level: 'mudah', nomor_urutan: urutan, pertanyaan, diagram: null, opsi, kunci, pembahasan });

const materi = [
  // ---------------- BAB 1 ----------------
  m('brevet-b-bab1', 1, 'Tarif PPh Badan', `<p>Tarif PPh Badan menurut UU PPh (jo. UU HPP): <b>22%</b> dari Penghasilan Kena Pajak.</p><ul><li><b>Peredaran bruto s.d. Rp4,8 miliar:</b> PPh final <b>0,5%</b> dari peredaran bruto (PP 55/2022), kecuali WP memilih dikenai tarif umum.</li><li><b>Peredaran bruto Rp4,8 miliar – Rp50 miliar:</b> mendapat <b>fasilitas pengurangan 50%</b> atas PKP dari bagian peredaran bruto sampai Rp4,8 miliar.</li></ul>`),
  m('brevet-b-bab1', 2, 'Penghasilan Kena Pajak Badan', `<p style="text-align:center;font-weight:bold;">PKP = Penghasilan neto fiskal − Kompensasi kerugian</p><p><b>Penghasilan neto fiskal</b> dihitung dari laba komersial setelah <b>koreksi fiskal</b> (positif dan negatif).</p>`),
  m('brevet-b-bab1', 3, 'Kredit Pajak Badan', `<p>PPh terutang badan dapat dikurangi kredit pajak berupa <b>PPh 22</b> (yang dipungut), <b>PPh 23/26</b> (yang dipotong), <b>PPh 24</b> (pajak luar negeri), dan <b>PPh 25</b> (angsuran yang telah dibayar).</p>`),
  m('brevet-b-bab1', 4, 'Angsuran PPh 25', `<p style="text-align:center;font-weight:bold;">Angsuran PPh 25 = (PPh terutang − kredit pajak) : 12</p><p>Angsuran dibayar paling lambat <b>tanggal 15</b> bulan berjalan, dan dilaporkan dalam SPT Masa.</p>`),
  m('brevet-b-bab1', 5, 'Konsep Biaya (Deductible)', `<p>Biaya yang dapat dikurangkan dari penghasilan bruto adalah biaya untuk <b>mendapatkan, menagih, dan memelihara penghasilan</b>, antara lain: biaya bahan baku, gaji/upah, bunga, sewa, royalti, iuran pensiun, biaya promosi dan penjualan yang wajar (PMK-2/2010), biaya penelitian dan pengembangan yang dilakukan di Indonesia, beasiswa/magang/pelatihan, serta sumbangan yang diizinkan (keagamaan wajib, bencana, pendidikan, penelitian, sosial, dan sumbangan fasilitas umum yang ditetapkan).</p><p><b>Piutang yang nyata-nyata tidak dapat ditagih</b> dapat dibebankan sebagai biaya jika memenuhi persyaratan: telah dibebankan pada laba rugi komersial, diserahkan daftar piutang kepada DJP, dan telah diserahkan penagihannya ke Pengadilan Negeri/instansi pemerintah (salah satu syarat c cukup).</p>`),
  m('brevet-b-bab1', 6, 'Biaya yang Tidak Dapat Dibebankan', `<p>Biaya yang <b>tidak dapat dikurangkan</b> dari penghasilan bruto antara lain:</p><ul><li>Pembentukan/pemupukan <b>dana cadangan</b> (dikecualikan: cadangan piutang tak tertagih bank, cadangan asuransi, cadangan penjaminan LPS, cadangan reklamasi pertambangan, dan cadangan penanaman kembali kehutanan).</li><li>Pengeluaran pribadi pemilik/pengurus (prive, natura/kenikmatan yang dikecualikan bagi pegawai).</li><li>Gaji yang dibayarkan kepada anggota persekutuan/firma/perseroan komanditer yang modalnya tidak terbagi atas saham.</li><li>Sanksi perpajakan (denda, bunga, kenaikan).</li><li>Pengeluaran untuk kepentingan pribadi yang tidak berhubungan dengan usaha.</li></ul><p>Natura/kenikmatan: berdasarkan <b>PMK 66/2023</b>, biaya natura/kenikmatan yang diberikan pemberi kerja dapat dikurangkan dari penghasilan bruto sepanjang berhubungan dengan kegiatan usaha.</p>`),
  m('brevet-b-bab1', 7, 'Penyusutan Fiskal (Pasal 11) dan Amortisasi (Pasal 11A)', `<table><tr><th>Kelompok</th><th>Masa Manfaat</th><th>Saldo Menurun</th><th>Garis Lurus</th></tr><tr><td>I</td><td>4 tahun</td><td>50%</td><td>25%</td></tr><tr><td>II</td><td>8 tahun</td><td>25%</td><td>12,5%</td></tr><tr><td>III</td><td>16 tahun</td><td>12,5%</td><td>6,25%</td></tr><tr><td>IV</td><td>20 tahun</td><td>10%</td><td>5%</td></tr></table><p>Bangunan permanen: <b>5%</b> (garis lurus); bangunan tidak permanen: <b>10%</b>.</p><p><b>Amortisasi</b> (Pasal 11A) atas harta tidak berwujud menggunakan metode garis lurus atau saldo menurun sesuai kelompok masa manfaat. WP dapat memilih masa manfaat lebih dari 20 tahun untuk bangunan permanen (dengan pemberitahuan).</p>`),
  m('brevet-b-bab1', 8, 'Rekonsiliasi Fiskal', `<p>Laba komersial (akuntansi) berbeda dengan <b>laba fiskal</b> (pajak), sehingga perlu <b>koreksi fiskal</b>:</p><ul><li><b>Koreksi positif:</b> menambah penghasilan neto — beban yang tidak boleh dikurangkan (sanksi pajak, pengeluaran pribadi, cadangan umum), penghasilan yang sudah dipotong PPh final dikoreksi untuk dipisahkan.</li><li><b>Koreksi negatif:</b> mengurangi penghasilan neto — penyusutan fiskal lebih besar dari komersial, penghasilan yang bukan objek pajak, kompensasi kerugian.</li></ul><p>Hasil rekonsiliasi dituangkan dalam <b>Lampiran I SPT Tahunan Badan (1771)</b>.</p>`),
  m('brevet-b-bab1', 9, 'Kompensasi Kerugian dan Lampiran SPT 1771', `<p><b>Kompensasi kerugian</b> fiskal dapat dikompensasikan dengan penghasilan neto/pada tahun-tahun berikutnya berturut-turut <b>paling lama 5 tahun</b>. Kerugian dari luar negeri hanya dapat dikompensasi dari penghasilan luar negeri.</p><p>SPT Tahunan Badan (1771) terdiri dari induk dan lampiran: <b>Lampiran I</b> (rekonsiliasi laporan keuangan), <b>Lampiran II</b> (daftar kepemilikan), <b>Lampiran III</b> (daftar PPh dipotong/dipungut), <b>Lampiran IV</b> (penghasilan final & bukan objek), <b>Lampiran V</b> (rekapitulasi peredaran bruto), <b>Lampiran VI</b> (angsuran PPh tahun berjalan), <b>Lampiran VII</b> (kompensasi kerugian), <b>Lampiran VIII</b> (fasilitas Pasal 31E), <b>Lampiran IX</b> (penyusutan/amortisasi fiskal), dan lainnya.</p>`),

  // ---------------- BAB 2 ----------------
  m('brevet-b-bab2', 1, 'Faktur Pajak dan e-Faktur', `<p>Faktur pajak dibuat saat <b>penyerahan BKP/JKP</b> atau saat pembayaran (mana yang lebih dahulu). Dapat dibuat <b>faktur gabungan</b> untuk seluruh penyerahan dalam satu bulan, paling lambat akhir bulan penyerahan. Saat ini faktur pajak wajib dibuat melalui aplikasi <b>e-Faktur</b>.</p>`),
  m('brevet-b-bab2', 2, 'Pengkreditan PPN Masukan', `<p>PPN Masukan dikreditkan dengan PPN Keluaran pada masa pajak yang sama. <b>Tidak dapat dikreditkan</b> antara lain: perolehan BKP/JKP yang tidak berhubungan langsung dengan kegiatan usaha, perolehan yang PPN-nya <b>tidak dipungut/dibebaskan</b>, dan faktur pajak yang tidak lengkap (faktur tidak sesuai ketentuan).</p>`),
  m('brevet-b-bab2', 3, 'DPP Nilai Lain dan Tarif 12%', `<p>Untuk penyerahan tertentu (mis. agen perjalanan, pengiriman paket, voucher) digunakan <b>DPP Nilai Lain</b> sehingga beban PPN menjadi lebih kecil. Berdasarkan UU HPP + PMK terkait, tarif PPN <b>12%</b> diterapkan untuk <b>barang mewah</b>; untuk BKP/JKP lainnya berlaku tarif 11% dengan mekanisme DPP nilai lain 11/12 × harga jual.</p>`),
  m('brevet-b-bab2', 4, 'Retur dan PMKE', `<p><b>Retur (pengembalian) BKP</b> mengurangi PPN Keluaran (bagi penjual) dan PPN Masukan (bagi pembeli). <b>PMKE</b> (PPN Masukan Tidak Dapat Dikreditkan) dilaporkan dan tidak dapat diperhitungkan.</p>`),
  m('brevet-b-bab2', 5, 'e-Faktur dan Adaptasi Coretax 2025', `<p><b>e-Faktur</b> adalah aplikasi resmi DJP untuk membuat faktur pajak elektronik (e-invoice). Sejak tahun 2025 faktur pajak beralih ke sistem <b>Coretax</b> (DJP), dengan beberapa perubahan:</p><ul><li><b>Akses rekam faktur:</b> login dengan NPWP sendiri (impersonating) dan sertel WP <b>Orang Pribadi</b> (dahulu sertel WP Badan).</li><li><b>Identitas lawan transaksi</b> (NPWP/nama/alamat) muncul <b>otomatis</b> (prepopulated), tidak diinput manual.</li><li><b>Nomor Seri Faktur Pajak (NSFP)</b> otomatis muncul sendiri, tidak lagi permintaan via e-NOFA.</li><li><b>Skema impor</b> berubah dari format CSV menjadi format XML.</li></ul>`),
  m('brevet-b-bab2', 6, 'Format Nomor Seri Faktur Pajak Coretax', `<p>Format lama: <b>010.012-24.12345678</b> (01 = kode jenis pajak, 0 = normal/pengganti, 012-24.12345678 = nomor seri).</p><p>Format baru (Coretax): <b>01.00.24.000-12345678</b></p><ul><li><b>01</b> = kode jenis pajak</li><li><b>00</b> = normal/pengganti</li><li><b>24</b> = tahun</li><li><b>000-12345678</b> = nomor seri</li></ul>`),
  m('brevet-b-bab2', 7, 'Kode Transaksi Faktur Pajak', `<table><tr><th>Kode</th><th>Keterangan</th></tr><tr><td>01</td><td>Penyerahan BKP yang tergolong mewah (kepada konsumen akhir).</td></tr><tr><td>02</td><td>Penyerahan kepada pemungut PPN instansi pemerintah.</td></tr><tr><td>03</td><td>Penyerahan kepada pemungut PPN lainnya (selain instansi pemerintah).</td></tr><tr><td>04</td><td>Penyerahan yang DPP-nya menggunakan nilai lain (Pasal 8A).</td></tr><tr><td>05</td><td>Penyerahan yang PPN-nya dipungut dengan besaran tertentu (Pasal 9A), mis. kendaraan bekas, LPG, jasa agen asuransi.</td></tr><tr><td>06</td><td>Penyerahan lain dengan tarif selain Pasal 7 (mis. penyerahan ke turis).</td></tr><tr><td>07</td><td>Penyerahan yang mendapat fasilitas <b>tidak dipungut</b> atau ditanggung pemerintah (DTP).</td></tr><tr><td>08</td><td>Penyerahan yang mendapat fasilitas <b>dibebaskan</b> dari pengenaan PPN.</td></tr><tr><td>09</td><td>Penyerahan aktiva yang menurut tujuan semula tidak untuk diperjualbelikan (Pasal 16D).</td></tr></table>`),

  // ---------------- BAB 3 ----------------
  m('brevet-b-bab3', 1, 'PPh 24: Kredit Pajak Luar Negeri', `<p>Penghasilan yang diperoleh dari luar negeri tetap digabung dalam penghasilan dan dihitung PPh terutangnya di Indonesia. Pajak yang dibayar di luar negeri dapat <b>dikreditkan</b> dengan batas maksimum:</p><p style="text-align:center;font-weight:bold;">(Penghasilan LN : Penghasilan Kena Pajak) × PPh terutang</p>`),
  m('brevet-b-bab3', 2, 'PPh 26 Wajib Pajak Luar Negeri', `<p>Penghasilan yang diterima WPLN (dividen, bunga, royalti, sewa, imbalan jasa) dikenai PPh 26 sebesar <b>20%</b> atau sesuai <b>tax treaty (P3B)</b> bila lebih rendah. <b>Branch profit tax:</b> laba setelah pajak BUT yang dikirim ke luar negeri dikenai 20%.</p>`),
  m('brevet-b-bab3', 3, 'Tax Treaty / P3B', `<p>Perjanjian penghindaran pajak berganda antara dua negara untuk mencegah pemajakan ganda, berbagi hak pemajakan, dan pertukaran informasi. Tarif PPh 26 dapat menjadi lebih rendah sesuai ketentuan P3B.</p>`),

  // ---------------- BAB 4 ----------------
  m('brevet-b-bab4', 1, 'Koreksi Fiskal', `<p>Laba komersial (menurut akuntansi) berbeda dengan laba fiskal (menurut pajak), sehingga perlu <b>koreksi fiskal</b>:</p><ul><li><b>Koreksi positif</b> — menambah penghasilan neto (mis. beban yang tidak boleh dikurangkan: sanksi pajak, pengeluaran pribadi, pengeluaran tanpa bukti).</li><li><b>Koreksi negatif</b> — mengurangi penghasilan neto (mis. penghasilan final yang dipisahkan, penyusutan fiskal lebih besar).</li></ul>`),
  m('brevet-b-bab4', 2, 'Beda Tetap dan Beda Waktu', `<ul><li><b>Beda tetap:</b> perbedaan selamanya (tidak akan diakui di masa depan) — mis. sanksi pajak, pengeluaran pribadi.</li><li><b>Beda waktu:</b> perbedaan sementara, diakui di periode lain — mis. penyusutan komersial vs fiskal, cadangan.</li></ul>`),
  m('brevet-b-bab4', 3, 'Penyusutan Fiskal', `<table><tr><th>Kelompok</th><th>Masa Manfaat</th><th>Tarif Saldo Menurun</th><th>Tarif Garis Lurus</th></tr><tr><td>I</td><td>4 tahun</td><td>50%</td><td>25%</td></tr><tr><td>II</td><td>8 tahun</td><td>25%</td><td>12,5%</td></tr><tr><td>III</td><td>16 tahun</td><td>12,5%</td><td>6,25%</td></tr><tr><td>IV</td><td>20 tahun</td><td>10%</td><td>5%</td></tr></table><p>Bangunan permanen: 5% (garis lurus), non-permanen: 10%.</p>`),
  m('brevet-b-bab4', 4, 'Pemeriksaan, Keberatan, Banding, dan Sanksi', `<ul><li><b>Pemeriksaan</b> dilakukan untuk menguji kepatuhan pelaksanaan kewajiban perpajakan.</li><li><b>Keberatan</b> atas SKPKB diajukan dalam <b>3 bulan</b>; <b>banding</b> ke Pengadilan Pajak atas keputusan keberatan.</li><li><b>Sanksi:</b> denda telat lapor SPT Rp100.000 (masa & tahunan, UU HPP); bunga per bulan atas telat bayar mengikuti KMK; <b>kenaikan 50%</b> (pasal 13(3)) karena SPT tidak sesuai hasil pemeriksaan karena melaporkan tidak benar; <b>kenaikan 100%</b> (pasal 13A) karena tidak menyelenggarakan pembukuan.</li></ul>`),
  m('brevet-b-bab4', 5, 'SPT Tahunan Badan', `<p>SPT Tahunan Badan (1771) paling lambat <b>30 April</b> tahun berikutnya, dilaporkan secara elektronik (<b>e-Form/e-Filing</b>) lengkap dengan lampiran laporan keuangan.</p>`)
];

const questions = [
  // BAB 1
  q('brevet-b-bab1', 1, 'Tarif PPh Badan (non-final) saat ini adalah...',
    ['22%', '25%', '20%', '30%', '11%'],
    1, 'Tarif PPh badan = 22% (UU PPh jo. UU HPP).'),
  q('brevet-b-bab1', 2, 'Wajib Pajak badan dengan peredaran bruto sampai dengan Rp4,8 miliar dikenai PPh final sebesar...',
    ['0,5% dari peredaran bruto', '1% dari peredaran bruto', '22% dari laba', '25% dari laba', '11% dari omzet'],
    1, 'PP 55/2022: PPh final UMKM = 0,5% dari peredaran bruto.'),
  q('brevet-b-bab1', 3, 'Angsuran PPh 25 dihitung dengan rumus...',
    ['(PPh terutang - kredit pajak) : 12', 'PPh terutang : 4', 'Kredit pajak × 12', 'Peredaran bruto : 12', 'Laba bersih × 22%'],
    1, 'Angsuran PPh 25 = (PPh terutang − kredit pajak) ÷ 12.'),
  q('brevet-b-bab1', 4, 'Berikut yang termasuk KREDIT PAJAK bagi Wajib Pajak badan adalah...',
    ['PPh 22, PPh 23, PPh 24, dan PPh 25', 'PPN masukan', 'PPh 21', 'Bea meterai', 'PBB'],
    1, 'Kredit pajak badan: PPh 22, 23, 24, 25 (dan PPh 26 yang dipotong).'),
  q('brevet-b-bab1', 5, 'Badan dengan peredaran bruto antara Rp4,8 miliar sampai Rp50 miliar mendapat fasilitas...',
    ['Pengurangan tarif 50% atas PKP dari bagian peredaran bruto sampai Rp4,8 miliar', 'Bebas pajak penuh', 'Pengurangan 100%', 'PPh final 1%', 'Tidak ada fasilitas'],
    1, 'Fasilitas 50% berlaku atas PKP yang berasal dari peredaran bruto sampai Rp4,8 miliar.'),
  q('brevet-b-bab1', 6, 'PPh terutang badan dihitung dari...',
    ['Penghasilan Kena Pajak × tarif (22%)', 'Peredaran bruto × 22%', 'Laba komersial × 22%', 'Laba bersih × 11%', 'Aset × 22%'],
    1, 'PPh badan = PKP × tarif. PKP = penghasilan neto fiskal setelah kompensasi kerugian.'),
  q('brevet-b-bab1', 7, 'Berikut yang TIDAK dapat dikurangkan dari penghasilan bruto adalah...',
    ['Pembentukan/pemupukan dana cadangan (umum)', 'Biaya bahan baku', 'Gaji karyawan', 'Biaya promosi yang wajar', 'Bunga pinjaman usaha'],
    1, 'Pembentukan dana cadangan umum tidak boleh dikurangkan, kecuali cadangan tertentu (bank, asuransi, LPS, reklamasi, penanaman kembali).'),
  q('brevet-b-bab1', 8, 'Untuk dapat dibebankan sebagai biaya, piutang yang nyata-nyata tidak dapat ditagih harus...',
    ['Memenuhi persyaratan tertentu (telah dibebankan komersial, dilaporkan ke DJP, dan upaya penagihan)', 'Cukup dengan memo internal', 'Disetujui auditor', 'Cukup dengan bukti retur', 'Tidak perlu syarat'],
    1, 'Piutang tak tertagih dapat dibebankan jika telah dibebankan pada laba rugi komersial, diserahkan daftar ke DJP, dan telah dilakukan upaya penagihan (Pengadilan Negeri/instansi).'),
  q('brevet-b-bab1', 9, 'Masa manfaat dan tarif penyusutan fiskal golongan II adalah...',
    ['8 tahun, 25% saldo menurun', '4 tahun, 50% saldo menurun', '16 tahun, 12,5%', '20 tahun, 10%', '10 tahun, 20%'],
    1, 'Golongan II: masa manfaat 8 tahun, tarif 25% saldo menurun (atau 12,5% garis lurus).'),
  q('brevet-b-bab1', 10, 'Bangunan permanen disusutkan dengan tarif...',
    ['5% (garis lurus)', '10% (garis lurus)', '50% saldo menurun', '25% saldo menurun', '12,5% garis lurus'],
    1, 'Bangunan permanen: 5% garis lurus; bangunan tidak permanen: 10%.'),
  q('brevet-b-bab1', 11, 'Koreksi fiskal POSITIF dilakukan karena...',
    ['Ada beban yang tidak boleh dikurangkan (mis. sanksi pajak)', 'Penyusutan fiskal lebih besar dari komersial', 'Ada penghasilan bukan objek pajak', 'Ada kompensasi kerugian', 'Penerimaan piutang'],
    1, 'Koreksi positif menambah penghasilan neto, mis. beban yang tidak boleh dikurangkan seperti sanksi pajak dan pengeluaran pribadi.'),
  q('brevet-b-bab1', 12, 'Kompensasi kerugian fiskal dapat dilakukan paling lama...',
    ['5 tahun berturut-turut', '3 tahun', '2 tahun', '10 tahun', 'Tidak ada batasan'],
    1, 'Kerugian fiskal dikompensasikan dengan penghasilan neto tahun-tahun berikutnya berturut-turut paling lama 5 tahun.'),

  // BAB 2
  q('brevet-b-bab2', 1, 'Faktur pajak harus dibuat paling lambat...',
    ['Saat penyerahan BKP/JKP atau saat pembayaran, mana yang lebih dahulu', 'Akhir tahun pajak', 'Saat pelaporan SPT', '1 bulan setelah transaksi', 'Tidak ada batasan waktu'],
    1, 'Faktur pajak dibuat saat penyerahan atau pembayaran, mana yang lebih dahulu.'),
  q('brevet-b-bab2', 2, 'Faktur pajak gabungan untuk satu bulan penyerahan harus dibuat paling lambat...',
    ['Akhir bulan penyerahan', 'Awal bulan berikutnya', '31 Desember', '15 bulan berjalan', 'Tidak dibatasi'],
    1, 'Faktur gabungan dibuat paling lambat akhir bulan penyerahan.'),
  q('brevet-b-bab2', 3, 'Berikut yang PPN Masukannya TIDAK dapat dikreditkan adalah...',
    ['Perolehan BKP yang tidak berhubungan langsung dengan kegiatan usaha', 'Pembelian bahan baku produksi', 'Pembelian alat kantor', 'Pembelian komputer operasional', 'Pembelian mesin produksi'],
    1, 'PPN masukan atas perolehan yang tidak berhubungan langsung dengan kegiatan usaha tidak dapat dikreditkan.'),
  q('brevet-b-bab2', 4, 'Berdasarkan UU HPP, tarif PPN 12% diterapkan khusus untuk...',
    ['Barang mewah', 'Semua barang', 'Jasa kesehatan', 'Bahan pokok', 'Ekspor'],
    1, 'UU HPP: tarif 12% untuk barang mewah; BKP/JKP lain tetap efektif 11% via DPP nilai lain.'),
  q('brevet-b-bab2', 5, 'Retur (pengembalian) BKP oleh pembeli akan...',
    ['Mengurangi PPN keluaran penjual dan PPN masukan pembeli', 'Menambah PPN keluaran', 'Tidak berpengaruh apa pun', 'Menjadi objek PPh final', 'Mengurangi omzet saja'],
    1, 'Retur mengurangi PPN keluaran (penjual) dan PPN masukan (pembeli).'),
  q('brevet-b-bab2', 6, 'Aplikasi resmi Direktorat Jenderal Pajak untuk membuat faktur pajak elektronik adalah...',
    ['e-Faktur', 'e-Bupot', 'e-SPT', 'e-Form', 'e-Registration'],
    1, 'e-Faktur adalah aplikasi pembuatan faktur pajak elektronik (e-invoice).'),
  q('brevet-b-bab2', 7, 'Pada sistem Coretax (2025), identitas lawan transaksi (NPWP/nama/alamat) dalam faktur pajak...',
    ['Muncul otomatis (prepopulated)', 'Selalu diinput manual', 'Tidak dicantumkan', 'Diberi tanda bintang', 'Diambil dari NIK'],
    1, 'Di Coretax identitas lawan transaksi muncul otomatis, tidak lagi diinput manual.'),
  q('brevet-b-bab2', 8, 'Contoh format Nomor Seri Faktur Pajak pada sistem Coretax adalah...',
    ['01.00.24.000-12345678', '010.012-24.12345678', '01.02.2024-12345', '24.000.01-12345678', '012-24.12345678'],
    1, 'Format Coretax: 01.00.24.000-12345678 (kode pajak 01, normal 00, tahun 24, nomor seri).'),
  q('brevet-b-bab2', 9, 'Faktur pajak dengan kode transaksi 07 digunakan untuk penyerahan yang mendapat fasilitas...',
    ['Tidak dipungut atau ditanggung pemerintah (DTP)', 'Dibebaskan dari pengenaan PPN', 'Besaran tertentu', 'Nilai lain', 'Kepada turis'],
    1, 'Kode 07 = fasilitas tidak dipungut/ditanggung pemerintah; kode 08 = dibebaskan.'),
  q('brevet-b-bab2', 10, 'Kode transaksi 05 pada faktur pajak digunakan untuk penyerahan yang PPN-nya dipungut dengan...',
    ['Besaran tertentu (mis. kendaraan bekas, LPG)', 'Nilai lain', 'Tarif normal', 'Dibebaskan', 'Tidak dipungut'],
    1, 'Kode 05 = PPN dipungut dengan besaran tertentu (Pasal 9A), mis. kendaraan bermotor bekas, LPG, jasa agen asuransi.'),
  q('brevet-b-bab2', 11, 'PT Brigha (PKP) menjual barang ke PT RNI (BUMN, pemungut PPN). Atas penyerahan ini faktur pajak yang dibuat menggunakan kode transaksi...',
    ['03', '01', '05', '07', '09'],
    1, 'Penyerahan kepada pemungut PPN lainnya selain instansi pemerintah (BUMN) = kode 03.'),
  q('brevet-b-bab2', 12, 'Retur atas penjualan BKP akan...',
    ['Mengurangi PPN keluaran penjual dan PPN masukan pembeli', 'Menambah PPN keluaran penjual', 'Menjadi objek PPh final', 'Tidak berpengaruh', 'Menambah PPN masukan pembeli'],
    1, 'Retur mengurangi PPN keluaran (penjual) dan PPN masukan (pembeli) pada SPT Masa PPN.'),

  // BAB 3
  q('brevet-b-bab3', 1, 'PPh 24 adalah kredit pajak atas...',
    ['Pajak yang dibayar di luar negeri', 'Pajak yang dipotong pemberi kerja', 'PPh 21 yang dipotong', 'PPN masukan', 'Pajak daerah'],
    1, 'PPh 24 mengkreditkan pajak penghasilan yang dibayar/dipotong di luar negeri.'),
  q('brevet-b-bab3', 2, 'Batas maksimum kredit pajak luar negeri dihitung dengan rumus...',
    ['(Penghasilan LN : PKP) × PPh terutang', 'Penghasilan LN × 20%', 'PPh terutang × 12', 'Penghasilan LN : 2', 'PPh terutang - PPh 25'],
    1, 'Batas maksimum = (penghasilan LN / PKP) × PPh terutang.'),
  q('brevet-b-bab3', 3, 'Tarif PPh 26 atas penghasilan yang diterima Wajib Pajak Luar Negeri adalah...',
    ['20%', '10%', '15%', '25%', '30%'],
    1, 'PPh 26 = 20%, atau sesuai tax treaty (P3B) bila lebih rendah.'),
  q('brevet-b-bab3', 4, 'Branch profit tax adalah pajak atas...',
    ['Laba setelah pajak BUT yang dikirim ke luar negeri', 'Bunga deposito', 'Sewa tanah bangunan', 'Impor barang', 'Penjualan dalam negeri'],
    1, 'Laba setelah pajak BUT yang dikirim ke luar negeri dikenai branch profit tax 20%.'),
  q('brevet-b-bab3', 5, 'Perjanjian penghindaran pajak berganda antarnegara disebut...',
    ['P3B / Tax Treaty', 'SKPKB', 'STP', 'PBB', 'NPWP'],
    1, 'P3B = Persetujuan Penghindaran Pajak Berganda (tax treaty).'),
  q('brevet-b-bab3', 6, 'Jika pajak yang dibayar di luar negeri lebih besar dari batas maksimum kredit, maka...',
    ['Kelebihannya tidak dapat dikreditkan', 'Seluruhnya dapat dikreditkan', 'Dikompensasikan ke tahun berikutnya', 'Dianggap sebagai kredit PPN', 'Dikembalikan negara'],
    1, 'Kredit dibatasi sampai batas maksimum; kelebihannya tidak dapat dikreditkan.'),

  // BAB 4
  q('brevet-b-bab4', 1, 'Sanksi administrasi berupa denda yang dibayarkan wajib pajak merupakan contoh...',
    ['Koreksi fiskal positif', 'Koreksi fiskal negatif', 'Beda waktu', 'Beda tetap negatif', 'Pengurang laba'],
    1, 'Sanksi pajak tidak dapat dikurangkan dari penghasilan → koreksi fiskal positif (beda tetap).'),
  q('brevet-b-bab4', 2, 'Beda tetap (permanent difference) terjadi karena...',
    ['Pengeluaran yang tidak diakui selamanya oleh fiskal', 'Perbedaan waktu pengakuan', 'Selisih kurs', 'Perubahan metode penyusutan', 'Kesalahan pencatatan'],
    1, 'Beda tetap: pengeluaran/penghasilan yang selamanya tidak diakui fiskal.'),
  q('brevet-b-bab4', 3, 'Perbedaan penyusutan komersial dan fiskal termasuk...',
    ['Beda waktu', 'Beda tetap', 'Koreksi negatif permanen', 'Pengurang PKP', 'Selisih kurs'],
    1, 'Penyusutan yang diakui berbeda waktunya antara komersial dan fiskal = beda waktu.'),
  q('brevet-b-bab4', 4, 'Tarif penyusutan fiskal golongan I (saldo menurun) adalah...',
    ['50%', '25%', '12,5%', '10%', '5%'],
    1, 'Kelompok I (masa manfaat 4 tahun): 50% saldo menurun atau 25% garis lurus.'),
  q('brevet-b-bab4', 5, 'Keberatan atas SKPKB diajukan paling lama...',
    ['3 bulan sejak SKPKB diterima/diterbitkan', '6 bulan', '1 tahun', '14 hari', '5 tahun'],
    1, 'Keberatan diajukan dalam jangka waktu 3 bulan.'),
  q('brevet-b-bab4', 6, 'Wajib pajak yang tidak menyelenggarakan pembukuan sehingga jumlah pajak tidak sesuai dapat dikenai sanksi kenaikan...',
    ['100%', '50%', '25%', '10%', '2%'],
    1, 'Pasal 13A: kenaikan 100% untuk WP yang tidak menyelenggarakan pembukuan.')
];

module.exports = { categories, questions, materi };