// ============================================================
// SEED BREVET A — 4 bab: Pengantar, KUP, PPh, PPN & Bea Meterai
// ============================================================

const categories = [
  { tipe: 'pajak', kode: 'brevet-a-bab1', nama: 'Pengantar Perpajakan Indonesia', deskripsi: 'Definisi pajak, fungsi, sistem pemungutan, jenis pajak, serta subjek dan objek pajak.', urutan: 20 },
  { tipe: 'pajak', kode: 'brevet-a-bab2', nama: 'Ketentuan Umum dan Tata Cara Perpajakan (KUP)', deskripsi: 'NPWP, hak dan kewajiban wajib pajak, SPT, SKP, daluwarsa, dan sanksi administrasi.', urutan: 21 },
  { tipe: 'pajak', kode: 'brevet-a-bab3', nama: 'Pajak Penghasilan (PPh)', deskripsi: 'PPh 21, 22, 23, 24, 25, 26, PPh final 4(2), tarif progresif, PTKP, dan TER.', urutan: 22 },
  { tipe: 'pajak', kode: 'brevet-a-bab4', nama: 'PPN & Bea Meterai (Dasar)', deskripsi: 'Pengertian PPN, tarif, PKP, faktur pajak, PPN masukan/keluaran, dan bea meterai.', urutan: 23 }
];

const m = (kode, urutan, judul, isi) => ({ kode, urutan, judul, isi });
const q = (kode, urutan, pertanyaan, opsi, kunci, pembahasan) =>
  ({ kode, level: 'mudah', nomor_urutan: urutan, pertanyaan, diagram: null, opsi, kunci, pembahasan });

const materi = [
  // ---------------- BAB 1 ----------------
  m('brevet-a-bab1', 1, 'Definisi dan Ciri Pajak', `<p>Menurut UU KUP, <b>pajak</b> adalah kontribusi wajib kepada negara yang terutang oleh orang pribadi atau badan yang bersifat <b>memaksa</b> berdasarkan undang-undang, dengan <b>tidak mendapatkan imbalan secara langsung</b> dan digunakan untuk keperluan negara bagi sebesar-besarnya kemakmuran rakyat.</p><p>Dasar hukum pemungutan pajak di Indonesia: <b>Pasal 23A UUD 1945</b>.</p>`),
  m('brevet-a-bab1', 2, 'Fungsi Pajak', `<ul><li><b>Fungsi budgetair (anggaran):</b> sumber penerimaan negara untuk membiayai pengeluaran.</li><li><b>Fungsi regulerend (mengatur):</b> alat kebijakan untuk mengatur masyarakat, misal pajak atas rokok untuk menekan konsumsi.</li></ul>`),
  m('brevet-a-bab1', 3, 'Sistem Pemungutan Pajak', `<ul><li><b>Official Assessment:</b> fiskus menentukan besarnya pajak terutang (sejarah, kini diterapkan terbatas).</li><li><b>Self Assessment:</b> wajib pajak menghitung, membayar, dan melaporkan sendiri — <b>dianut Indonesia saat ini</b>.</li><li><b>Withholding System:</b> pihak ketiga memotong/memungut pajak (mis. PPh 21 oleh pemberi kerja).</li></ul>`),
  m('brevet-a-bab1', 4, 'Jenis Pajak', `<ul><li><b>Pajak Pusat:</b> PPh, PPN, PPNBm, Bea Meterai, Bea &amp; Cukai (dikelola pemerintah pusat).</li><li><b>Pajak Daerah:</b> PBB-P2, BPHTB, PKB/BBNKB, Pajak Hotel, Restoran, Hiburan, dll (dikelola pemda).</li></ul>`),
  m('brevet-a-bab1', 5, 'Subjek dan Objek Pajak', `<p><b>Subjek pajak</b>: orang pribadi, badan, dan BUT (Bentuk Usaha Tetap). Wajib pajak adalah subjek yang memenuhi syarat objektif.</p><p><b>Objek pajak</b>: penghasilan, termasuk gaji, upah, honorarium, imbalan jasa, laba usaha, keuntungan penjualan, hadiah, royalti, sewa, bunga, dividen, dan lain-lain.</p>`),

  // ---------------- BAB 2 ----------------
  m('brevet-a-bab2', 1, 'NPWP dan NOPPKP', `<p><b>NPWP</b> (Nomor Pokok Wajib Pajak) adalah identitas wajib pajak untuk melaksanakan hak dan kewajiban perpajakan. <b>NOPPKP</b> adalah Nomor Identitas untuk pengusaha yang dikukuhkan sebagai Pengusaha Kena Pajak (PKP).</p><p>Setiap wajib pajak wajib mendaftarkan diri untuk memperoleh NPWP, dan dapat melalui e-Registration atau layanan kantor pajak.</p>`),
  m('brevet-a-bab2', 2, 'Surat Pemberitahuan (SPT)', `<p><b>SPT</b> adalah surat yang digunakan wajib pajak untuk <b>melaporkan penghitungan dan/atau pembayaran pajak</b>, objek pajak, dan harta/kewajiban.</p><ul><li>SPT Masa — dilaporkan secara bulanan (PPh 21/23/25, PPN, dll).</li><li>SPT Tahunan — dilaporkan setahun sekali: OP paling lambat <b>31 Maret</b>, Badan paling lambat <b>30 April</b>.</li></ul>`),
  m('brevet-a-bab2', 3, 'Surat Ketetapan dan Tagihan', `<ul><li><b>STP</b> (Surat Tagihan Pajak) — tagihan pajak, bunga, atau denda.</li><li><b>SKPKB</b> (Kurang Bayar) — hasil pemeriksaan menunjukkan pajak kurang bayar.</li><li><b>SKPLB</b> (Lebih Bayar) — pajak lebih dibayar dan dikembalikan.</li><li><b>SKPN</b> (Nihil) — tidak ada jumlah terutang.</li></ul>`),
  m('brevet-a-bab2', 4, 'Daluwarsa dan Sanksi', `<ul><li>Daluwarsa <b>penetapan</b> pajak: <b>5 tahun</b> sejak saat terutang/akhir masa.</li><li>Daluwarsa <b>penagihan</b>: 5 tahun sejak tanggal penerbitan STP/SKPKB.</li><li>Telat lapor SPT masa: denda <b>Rp100.000</b>; telat lapor SPT tahunan: denda <b>Rp100.000</b> (UU HPP).</li><li>Telat bayar/setor: sanksi <b>bunga per bulan</b> yang besarnya mengikuti tarif yang ditetapkan KMK.</li></ul>`),
  m('brevet-a-bab2', 5, 'Hak Wajib Pajak', `<ul><li>Membetulkan SPT (dengan syarat belum diperiksa).</li><li>Mengajukan <b>keberatan</b> atas SKPKB/SKPLB (dalam 3 bulan).</li><li>Mengajukan <b>banding</b> ke Pengadilan Pajak atas keputusan keberatan.</li><li>Mengajukan pengurangan/penghapusan sanksi.</li><li>Mengajukan restitusi (pengembalian kelebihan pajak).</li></ul>`),

  // ---------------- BAB 3 ----------------
  m('brevet-a-bab3', 1, 'Tarif PPh Pasal 17 (Progresif)', `<table><tr><th>Lapisan Penghasilan Kena Pajak (setahun)</th><th>Tarif</th></tr><tr><td>s.d. Rp60.000.000</td><td>5%</td></tr><tr><td>Rp60.000.000 – Rp250.000.000</td><td>15%</td></tr><tr><td>Rp250.000.000 – Rp500.000.000</td><td>25%</td></tr><tr><td>Rp500.000.000 – Rp5.000.000.000</td><td>30%</td></tr><tr><td>di atas Rp5.000.000.000</td><td>35%</td></tr></table>`),
  m('brevet-a-bab3', 2, 'Penghasilan Tidak Kena Pajak (PTKP) 2024', `<table><tr><th>Status</th><th>PTKP</th></tr><tr><td>TK/0 (lajang tanpa tanggungan)</td><td>Rp54.000.000</td></tr><tr><td>TK/1, K/0</td><td>Rp58.500.000</td></tr><tr><td>TK/2, K/1</td><td>Rp63.000.000</td></tr><tr><td>TK/3, K/2</td><td>Rp67.500.000</td></tr><tr><td>K/3</td><td>Rp72.000.000</td></tr></table><p>Tambahan Rp4.500.000 untuk status kawin dan tiap tanggungan (maks. 3).</p>`),
  m('brevet-a-bab3', 3, 'PPh 21 dan Tarif Efektif (TER)', `<p><b>PPh 21</b> dipotong oleh pemberi kerja atas penghasilan karyawan (gaji, tunjangan, bonus, honorarium).</p><p>Mulai 1 Januari 2024 (PMK 168/2023) digunakan <b>Tarif Efektif Rata-rata (TER)</b> untuk pemotongan bulanan, lalu dihitung ulang final pada akhir tahun (annualization) sehingga total pajak setahun sama.</p>`),
  m('brevet-a-bab3', 4, 'PPh 22, 23, dan PPh Final 4(2)', `<ul><li><b>PPh 22</b>: dipungut atas impor (2,5% dengan API; 7,5% tanpa API untuk barang tertentu), penjualan hasil produksi tertentu, serta penjualan BBM (0,3% oleh Pertamina).</li><li><b>PPh 23</b>: dipotong atas jasa (2%), sewa selain tanah/bangunan (2%), royalti, hadiah (15%), dan dividen.</li><li><b>PPh Final 4(2)</b>: bunga deposito 20%, hadiah undian 25%, sewa tanah/bangunan 10%, pengalihan tanah/bangunan 2,5%, jasa konstruksi 2%/3%/4%, UMKM 0,5% (PP 55/2022).</li></ul>`),
  m('brevet-a-bab3', 5, 'PPh 24, 25, dan 26', `<ul><li><b>PPh 24</b>: kredit pajak atas penghasilan yang dikenai pajak di luar negeri.</li><li><b>PPh 25</b>: angsuran pajak bulanan — (PPh terutang − kredit pajak) dibagi 12.</li><li><b>PPh 26</b>: pemotongan 20% atas penghasilan yang diterima Wajib Pajak Luar Negeri.</li></ul>`),
  m('brevet-a-bab3', 6, 'Subjek Pajak Penghasilan (Pasal 2, 2A, 3)', `<p><b>Subjek pajak dalam negeri</b> (Orang Pribadi): WNI/WNA yang (1) bertempat tinggal di Indonesia, (2) berada di Indonesia <b>lebih dari 183 hari</b> dalam 12 bulan, atau (3) dalam suatu tahun pajak berada di Indonesia dan berniat bertempat tinggal di Indonesia. Badan: didirikan/bertempat kedudukan di Indonesia. Termasuk juga <b>warisan yang belum terbagi</b> dan <b>BUT (Bentuk Usaha Tetap)</b>.</p><p><b>Subjek pajak luar negeri</b>: OP yang tidak bertempat tinggal di Indonesia, WNA yang berada di Indonesia tidak lebih dari 183 hari dalam 12 bulan, WNI yang berada di luar Indonesia lebih dari 183 hari dalam 12 bulan dan memenuhi persyaratan tertentu (tempat tinggal, pusat kegiatan utama, dll), serta badan yang tidak didirikan di Indonesia.</p><p><b>Mulai kewajiban subjektif OP</b>: sejak dilahirkan/berada/berniat bertempat tinggal di Indonesia; berakhir saat meninggal dunia atau meninggalkan Indonesia untuk selama-lamanya.</p><p><b>Bukan subjek pajak</b> (Pasal 3): pejabat perwakilan diplomatik/konsulat negara asing (dengan syarat bukan WNI, tidak menerima penghasilan lain di Indonesia, dan ada perlakuan timbal balik), serta pejabat perwakilan organisasi internasional yang bukan WNI dan tidak menjalankan usaha di Indonesia.</p>`),
  m('brevet-a-bab3', 7, 'Objek Pajak Penghasilan (Pasal 4 ayat 1)', `<p>Objek pajak adalah <b>penghasilan</b>, yaitu setiap tambahan kemampuan ekonomis yang diterima/diperoleh wajib pajak (dari Indonesia maupun luar negeri) yang dapat dipakai untuk konsumsi atau menambah kekayaan, dengan nama dan bentuk apapun, antara lain:</p><ul><li>Penggantian/imbalan sehubungan dengan pekerjaan/jasa, gaji, honorarium, tunjangan;</li><li>Hadiah dari undian/pekerjaan/kegiatan, dan penghargaan;</li><li>Laba usaha;</li><li>Keuntungan karena penjualan atau pengalihan harta;</li><li>Penerimaan kembali pembayaran pajak yang telah dibebankan sebagai biaya;</li><li>Bunga (termasuk premium, diskonto), dividen, royalti;</li><li>Sewa dan penghasilan lain sehubungan dengan penggunaan harta;</li><li>Penerimaan pembayaran berkala, keuntungan pembebasan utang, selisih kurs;</li><li>Selisih lebih penilaian kembali aktiva, premi asuransi, dan tambahan kekayaan neto yang belum dikenai pajak.</li></ul>`),
  m('brevet-a-bab3', 8, 'Bukan Objek Pajak (Pasal 4 ayat 3)', `<p>Penghasilan yang <b>bukan objek pajak</b> (dikecualikan), antara lain:</p><ul><li>Bantuan atau sumbangan yang diatur berdasarkan PP;</li><li>Harta hibahan yang diterima keluarga sedarah garis keturunan lurus satu derajat, badan keagamaan, badan pendidikan, badan sosial, koperasi, atau OP yang menjalankan usaha mikro dan kecil;</li><li>Warisan;</li><li>Harta termasuk setoran tunai sebagai pengganti saham atau penyertaan modal;</li><li>Penggantian/imbalan dalam bentuk <b>natura/kenikmatan</b> yang dikecualikan;</li><li>Pembayaran asuransi karena kecelakaan, sakit, meninggal, dan asuransi beasiswa;</li><li><b>Dividen</b> yang diterima OP (dengan pengecualian jika diinvestasikan, sesuai PMK 18/2021);</li><li>Iuran yang diterima dana pensiun, bagian laba/SHU koperasi, beasiswa yang memenuhi persyaratan, dan sisa lebih lembaga nirlaba yang ditanamkan kembali.</li></ul>`),
  m('brevet-a-bab3', 9, 'Natura dan Kenikmatan (PMK 66/2023)', `<p>Sejak UU HPP (2021), <b>natura/kenikmatan menjadi objek PPh</b> bagi penerima (karyawan). Namun dikecualikan dari objek pajak (tidak dikenakan pajak), antara lain:</p><ul><li>Makanan, minuman, bahan makanan, dan bahan minuman yang diberikan <b>kepada seluruh pegawai</b>;</li><li>Natura/kenikmatan di <b>daerah tertentu</b>;</li><li>Natura/kenikmatan yang harus diberikan dalam pelaksanaan pekerjaan (keamanan, kesehatan, keselamatan — mis. pakaian seragam, sarana antar jemput, penginapan awak kapal);</li><li>Natura/kenikmatan yang dibiayai dari APBN/APBD/APBDes;</li><li>Natura/kenikmatan dengan jenis/batasan tertentu (PMK 66/2023): bingkisan hari raya keagamaan, bingkisan di luar hari raya maks. Rp3 juta/tahun, peralatan kerja (laptop, HP, pulsa), fasilitas kesehatan untuk kecelakaan kerja, fasilitas olahraga maks. Rp1,5 juta/tahun, fasilitas tempat tinggal bersama (mes/asrama), fasilitas kendaraan (pegawai dengan penghasilan bruto maks. Rp100 juta/bulan), iuran pensiun ke OJK, dan fasilitas peribadahan.</li></ul><p>Bagi <b>pemberi kerja</b>, biaya natura/kenikmatan dapat dikurangkan dari penghasilan bruto sepanjang berhubungan dengan kegiatan usaha.</p>`),
  m('brevet-a-bab3', 10, 'Pemajakan Penghasilan Keluarga (Pasal 8) dan TER', `<p><b>Pasal 8 UU PPh:</b> penghasilan/kerugian istri dianggap sebagai penghasilan/kerugian suami, kecuali penghasilan istri semata-mata dari <b>satu pemberi kerja</b> yang sudah dipotong PPh 21. Suami-istri dikenai pajak terpisah jika hidup berpisah (putusan hakim), ada perjanjian pisah harta, atau istri memilih terpisah. Penghasilan <b>anak yang belum dewasa</b> (di bawah 18 tahun dan belum menikah) digabung dengan penghasilan orang tuanya.</p><p><b>Tarif Efektif (TER) PPh 21</b> (PMK 168/2023, berlaku 1 Januari 2024) untuk pemotongan bulanan:</p><ul><li><b>TER A</b> — PTKP TK/0, TK/1, K/0 (tarif 0% s.d. 34% berdasarkan lapisan penghasilan bruto bulanan).</li><li><b>TER B</b> — PTKP TK/2, K/1, TK/3, K/2.</li><li><b>TER C</b> — PTKP K/3.</li></ul><p>Pada <b>masa pajak terakhir (Desember)</b> dihitung ulang dengan tarif Pasal 17 (annualization), sehingga total pajak setahun tetap sama. Untuk pegawai tidak tetap: penghasilan harian ≤ Rp450.000 tidak dipotong; Rp450.000–Rp2,5 juta dikenai 0,5%; di atas Rp2,5 juta dikenai tarif Pasal 17 × 50% × penghasilan bruto.</p>`),
  m('brevet-a-bab3', 11, 'PPh Final UMKM 0,5% (PP 55/2022)', `<p>Wajib Pajak OP dengan <b>peredaran bruto sampai dengan Rp4,8 miliar</b> setahun dapat dikenai PPh final <b>0,5%</b> dari peredaran bruto (PP 23/2018 jo. PP 55/2022).</p><p>Berdasarkan <b>UU HPP</b>: bagi OP pengusaha yang memilih tarif final, <b>peredaran bruto sampai dengan Rp500 juta setahun TIDAK dikenai PPh</b> (batas tidak kena pajak untuk UMKM).</p><p>Tidak termasuk objek PP 55/2022: penghasilan dari jasa sehubungan dengan pekerjaan bebas, penghasilan dari luar negeri yang pajaknya terutang/dibayar di luar negeri, penghasilan yang sudah dikenai PPh final lain, dan penghasilan yang dikecualikan dari objek PPh.</p><p>Masa pemanfaatan PP 23/2018 bagi OP: 7 tahun pajak (3 tahun pertama 0,5%, dst).</p>`),
  m('brevet-a-bab3', 12, 'Kredit Pajak dan PPh 29', `<p>Pajak yang telah dilunasi dalam tahun berjalan dapat <b>dikreditkan</b> terhadap pajak terutang akhir tahun:</p><ul><li>Pemotongan oleh pihak lain: <b>PPh 21</b> (pekerjaan), <b>PPh 22</b> (pemungutan pembelian barang), <b>PPh 23</b> (modal/jasa), <b>PPh 24</b> (pajak luar negeri).</li><li>Dibayar sendiri: <b>PPh 25</b> (angsuran bulanan).</li></ul><p style="text-align:center;font-weight:bold;">PPh Pasal 29 = PPh terutang − (PPh 21 + PPh 22 + PPh 23 + PPh 24 + PPh 25)</p><p>Jika hasilnya lebih, menjadi <b>PPh lebih bayar (Pasal 28A)</b> yang dapat direstitusi/dikompensasi. SPT Tahunan OP dilaporkan paling lambat <b>31 Maret</b> tahun berikutnya.</p>`),

  // ---------------- BAB 4 ----------------
  m('brevet-a-bab4', 1, 'Pengertian dan Tarif PPN', `<p><b>Pajak Pertambahan Nilai (PPN)</b> dikenakan atas penyerahan <b>Barang Kena Pajak (BKP)</b> dan <b>Jasa Kena Pajak (JKP)</b> oleh pengusaha di dalam Daerah Pabean, atas impor BKP, ekspor, dan pemanfaatan BKP/JKP dari luar Daerah Pabean.</p><p>Tarif PPN: <b>11%</b> (sejak 1 April 2022). Berdasarkan UU HPP, tarif dapat dinaikkan menjadi <b>12%</b> untuk barang mewah.</p>`),
  m('brevet-a-bab4', 2, 'Pengusaha Kena Pajak (PKP)', `<p><b>PKP</b> adalah pengusaha yang wajib dikukuhkan apabila melakukan penyerahan BKP/JKP dengan peredaran bruto lebih dari <b>Rp4,8 miliar</b> setahun. Pengusaha kecil juga dapat mengajukan pengukuhan secara sukarela.</p>`),
  m('brevet-a-bab4', 3, 'PPN Masukan dan PPN Keluaran', `<ul><li><b>PPN Masukan:</b> PPN yang dibayar saat membeli BKP/JKP.</li><li><b>PPN Keluaran:</b> PPN yang dipungut saat menjual BKP/JKP.</li></ul><p>PPN Masukan dapat <b>dikreditkan</b> (dikurangkan) dari PPN Keluaran. Jika PPN Keluaran lebih besar → <b>kurang bayar</b> dan harus disetor; jika lebih kecil → <b>lebih bayar</b> (dapat dikompensasi).</p>`),
  m('brevet-a-bab4', 4, 'Faktur Pajak', `<p><b>Faktur pajak</b> adalah bukti pungutan PPN yang harus dibuat PKP saat menyerahkan BKP/JKP. Saat ini faktur pajak dibuat secara <b>elektronik (e-Faktur)</b> dan dapat digabung (faktur gabungan) untuk beberapa penyerahan dalam satu bulan.</p>`),
  m('brevet-a-bab4', 5, 'Bea Meterai', `<p>Berdasarkan UU 10/2020, tarif bea meterai: <b>Rp10.000</b> dan <b>Rp1.000</b>.</p><ul><li>Rp10.000 — dokumen yang menyebutkan jumlah uang lebih dari Rp5.000.000, surat perjanjian, akta, surat berharga.</li><li>Rp1.000 — dokumen yang menyebutkan jumlah uang lebih dari Rp250.000 sampai dengan Rp5.000.000.</li></ul>`)
];

const questions = [
  // BAB 1
  q('brevet-a-bab1', 1, 'Menurut UU KUP, pajak adalah kontribusi wajib kepada negara yang bersifat...',
    ['Memaksa berdasarkan undang-undang, tanpa imbalan langsung', 'Sukarela dengan imbalan langsung', 'Berdasarkan perjanjian kerja', 'Hanya untuk orang pribadi', 'Tidak wajib bagi badan'],
    1, 'Pajak bersifat memaksa berdasarkan undang-undang dan tidak mendapat imbalan secara langsung.'),
  q('brevet-a-bab1', 2, 'Fungsi pajak untuk membiayai pengeluaran negara disebut fungsi...',
    ['Budgetair', 'Regulerend', 'Redistribusi', 'Stabilisasi', 'Fiskal daerah'],
    1, 'Fungsi budgetair (anggaran): pajak sebagai sumber penerimaan negara.'),
  q('brevet-a-bab1', 3, 'Sistem pemungutan pajak yang dianut Indonesia, di mana wajib pajak menghitung, membayar, dan melaporkan sendiri pajaknya, disebut...',
    ['Self assessment', 'Official assessment', 'Withholding system', 'Penagihan aktif', 'Pemungutan langsung'],
    1, 'Self assessment: wajib pajak menghitung, membayar, dan melapor sendiri.'),
  q('brevet-a-bab1', 4, 'Berikut yang termasuk PAJAK PUSAT adalah...',
    ['PPh, PPN, dan Bea Meterai', 'Pajak Hotel dan Restoran', 'PBB-P2', 'PKB dan BBNKB', 'Pajak Hiburan'],
    1, 'PPh, PPN, PPNBm, dan Bea Meterai adalah pajak pusat.'),
  q('brevet-a-bab1', 5, 'Dasar hukum pemungutan pajak di Indonesia adalah...',
    ['Pasal 23A UUD 1945', 'Pasal 27 UUD 1945', 'Pasal 33 UUD 1945', 'Pasal 22E UUD 1945', 'Pasal 28A UUD 1945'],
    1, 'Pasal 23A UUD 1945: "Segala pajak dan pungutan lain yang bersifat memaksa untuk keperluan negara diatur dengan undang-undang."'),

  // BAB 2
  q('brevet-a-bab2', 1, 'SPT Tahunan Wajib Pajak orang pribadi paling lambat disampaikan pada...',
    ['31 Maret tahun berikutnya', '30 April tahun berikutnya', '31 Desember', '20 bulan berjalan', '30 Juni tahun berikutnya'],
    1, 'SPT Tahunan OP paling lambat 31 Maret; badan 30 April.'),
  q('brevet-a-bab2', 2, 'Surat yang diterbitkan fiskus karena hasil pemeriksaan menunjukkan pajak kurang dibayar adalah...',
    ['SKPKB', 'SKPLB', 'SKPN', 'STP', 'Surat setoran'],
    1, 'SKPKB (Surat Ketetapan Pajak Kurang Bayar) diterbitkan jika pajak kurang dibayar.'),
  q('brevet-a-bab2', 3, 'Daluwarsa penetapan pajak adalah...',
    ['5 tahun', '3 tahun', '10 tahun', '2 tahun', 'Tidak ada daluwarsa'],
    1, 'Daluwarsa penetapan pajak adalah 5 tahun sejak saat pajak terutang.'),
  q('brevet-a-bab2', 4, 'Besarnya denda keterlambatan pelaporan SPT (masa maupun tahunan) menurut UU HPP adalah...',
    ['Rp100.000', 'Rp500.000', 'Rp1.000.000', 'Rp50.000', 'Rp250.000'],
    1, 'UU HPP menetapkan denda telat lapor SPT masa maupun tahunan = Rp100.000.'),
  q('brevet-a-bab2', 5, 'Wajib pajak yang tidak setuju atas SKPKB dapat mengajukan...',
    ['Keberatan dalam waktu 3 bulan', 'Banding langsung tanpa keberatan', 'Restitusi', 'Pembetulan SPT', 'Pengurangan SPT'],
    1, 'Keberatan diajukan dalam 3 bulan sejak SKPKB diterbitkan/diterima; banding ke Pengadilan Pajak setelah keputusan keberatan.'),
  q('brevet-a-bab2', 6, 'NPWP adalah singkatan dari...',
    ['Nomor Pokok Wajib Pajak', 'Nomor Pengurus Wajib Pajak', 'Nomor Pajak Wajib Pembayar', 'Nama Pokok Wajib Pajak', 'Nomor Pembayaran Wajib Pajak'],
    1, 'NPWP = Nomor Pokok Wajib Pajak.'),

  // BAB 3
  q('brevet-a-bab3', 1, 'Tarif PPh untuk penghasilan kena pajak sampai dengan Rp60.000.000 per tahun adalah...',
    ['5%', '15%', '25%', '30%', '35%'],
    1, 'Lapisan pertama tarif progresif pasal 17 adalah 5% untuk PKP sampai Rp60 juta.'),
  q('brevet-a-bab3', 2, 'Besarnya PTKP untuk wajib pajak lajang tanpa tanggungan (TK/0) tahun 2024 adalah...',
    ['Rp54.000.000', 'Rp50.000.000', 'Rp58.500.000', 'Rp63.000.000', 'Rp60.000.000'],
    1, 'PTKP TK/0 = Rp54.000.000 per tahun (PMK 101/2024).'),
  q('brevet-a-bab3', 3, 'Siapa yang wajib memotong PPh 21 atas gaji karyawan?',
    ['Pemberi kerja/pemotong', 'Karyawan itu sendiri', 'Bank', 'Pengusaha Kena Pajak', 'Kantor Pajak'],
    1, 'PPh 21 dipotong oleh pemberi kerja (withholding system).'),
  q('brevet-a-bab3', 4, 'PPh 23 atas imbalan jasa (umumnya) dikenakan tarif sebesar...',
    ['2%', '10%', '15%', '20%', '5%'],
    1, 'Tarif PPh 23 untuk jasa adalah 2% (sejak UU Cipta Kerja/PP 12/2020).'),
  q('brevet-a-bab3', 5, 'PPh Final atas sewa tanah dan/atau bangunan adalah sebesar...',
    ['10%', '2%', '5%', '20%', '25%'],
    1, 'PPh final 4(2) sewa tanah/bangunan = 10% dari jumlah bruto sewa.'),
  q('brevet-a-bab3', 6, 'Angsuran PPh 25 dihitung dengan rumus...',
    ['(PPh terutang - kredit pajak) : 12', 'PPh terutang × 12', 'PPh terutang : 2', 'Kredit pajak × 12', 'Peredaran bruto : 12'],
    1, 'Angsuran PPh 25 = (PPh terutang − kredit pajak) dibagi 12 bulan.'),
  q('brevet-a-bab3', 7, 'Orang pribadi dikategorikan sebagai subjek pajak dalam negeri apabila berada di Indonesia lebih dari...',
    ['183 hari dalam jangka waktu 12 bulan', '90 hari dalam 12 bulan', '30 hari dalam 6 bulan', '365 hari dalam 2 tahun', '120 hari dalam 12 bulan'],
    1, 'OP yang berada di Indonesia lebih dari 183 hari dalam jangka waktu 12 bulan termasuk subjek pajak dalam negeri (Pasal 2).'),
  q('brevet-a-bab3', 8, 'Yang termasuk BUKAN subjek pajak adalah...',
    ['Pejabat perwakilan diplomatik negara asing dengan perlakuan timbal balik', 'WNA yang bekerja di Indonesia', 'Badan yang didirikan di Indonesia', 'Warisan yang belum terbagi', 'BUT di Indonesia'],
    1, 'Pejabat perwakilan diplomatik/konsulat negara asing yang bukan WNI, tidak menerima penghasilan lain di Indonesia, dan ada perlakuan timbal balik = bukan subjek pajak (Pasal 3).'),
  q('brevet-a-bab3', 9, 'Berikut yang termasuk BUKAN OBJEK pajak penghasilan adalah...',
    ['Warisan', 'Gaji karyawan', 'Bunga deposito', 'Hadiah undian', 'Keuntungan penjualan harta'],
    1, 'Warisan bukan objek pajak (Pasal 4 ayat 3).'),
  q('brevet-a-bab3', 10, 'Berdasarkan PMK 66/2023, natura atau kenikmatan yang DIKECUALIKAN dari objek pajak adalah...',
    ['Makanan dan minuman yang diberikan kepada seluruh pegawai', 'Mobil pribadi direktur', 'Rumah mewah pribadi', 'Biaya liburan keluarga', 'Kendaraan mewah pribadi'],
    1, 'Makanan, minuman, bahan makanan, dan bahan minuman untuk seluruh pegawai dikecualikan dari objek pajak natura (PMK 66/2023).'),
  q('brevet-a-bab3', 11, 'Penghasilan istri yang semata-mata diperoleh dari satu pemberi kerja dan sudah dipotong PPh 21 menurut Pasal 8 UU PPh diperlakukan sebagai...',
    ['Tidak digabung dengan penghasilan suami', 'Selalu digabung dengan suami', 'Objek PPh 23', 'Dikenai PPh 26', 'Dikecualikan dari PTKP'],
    1, 'Pasal 8: penghasilan istri yang semata-mata dari satu pemberi kerja yang sudah dipotong PPh 21 tidak digabung dengan penghasilan suami.'),
  q('brevet-a-bab3', 12, 'Tarif Efektif Rata-rata (TER) kategori A berlaku untuk wajib pajak dengan status PTKP...',
    ['TK/0, TK/1, dan K/0', 'K/3', 'TK/2 dan K/1', 'TK/3 dan K/2', 'Semua status'],
    1, 'TER A untuk PTKP TK/0, TK/1, K/0; TER B untuk TK/2, K/1, TK/3, K/2; TER C untuk K/3.'),
  q('brevet-a-bab3', 13, 'Berdasarkan UU HPP, wajib pajak orang pribadi UMKM dengan peredaran bruto sampai dengan Rp500 juta setahun...',
    ['Tidak dikenai PPh (batas tidak kena pajak UMKM)', 'Dikenai PPh final 0,5%', 'Dikenai PPh 5%', 'Dikenai PPh 0,1%', 'Wajib membayar PBB'],
    1, 'UU HPP: peredaran bruto sampai Rp500 juta setahun tidak dikenai PPh bagi OP pengusaha PP 55/2022.'),
  q('brevet-a-bab3', 14, 'PPh Pasal 29 adalah...',
    ['Kekurangan pembayaran pajak pada akhir tahun', 'Angsuran pajak bulanan', 'Pajak dipotong pemberi kerja', 'Pajak luar negeri', 'Pengembalian kelebihan bayar'],
    1, 'PPh 29 = PPh terutang setahun dikurangi seluruh kredit pajak (21/22/23/24/25); jika lebih = kurang bayar yang dilunasi sebelum SPT Tahunan disampaikan.'),
  q('brevet-a-bab3', 15, 'Penghasilan yang TIDAK termasuk objek PPh final Pasal 4 ayat (2) adalah...',
    ['Gaji dan tunjangan karyawan', 'Bunga deposito dan tabungan', 'Hadiah undian', 'Transaksi penjualan saham di bursa', 'Sewa tanah dan/atau bangunan'],
    1, 'PPh final 4(2) mencakup bunga deposito, hadiah undian, saham bursa, pengalihan tanah/bangunan, jasa konstruksi, sewa tanah/bangunan — bukan gaji (yang masuk PPh 21).'),

  // BAB 4
  q('brevet-a-bab4', 1, 'Tarif PPN umum di Indonesia saat ini adalah...',
    ['11%', '10%', '12%', '15%', '5%'],
    1, 'PPN 11% berlaku sejak 1 April 2022; barang mewah dapat dikenai 12% sesuai UU HPP.'),
  q('brevet-a-bab4', 2, 'PPN dikenakan atas...',
    ['Penyerahan BKP/JKP oleh PKP di dalam Daerah Pabean', 'Seluruh transaksi di luar negeri', 'Penghasilan karyawan', 'Setoran modal pemilik', 'Pembelian pribadi non-usahawan'],
    1, 'Objek PPN: penyerahan BKP/JKP di dalam Daerah Pabean oleh PKP, impor, ekspor, dan pemanfaatan dari luar pabean.'),
  q('brevet-a-bab4', 3, 'Pengusaha wajib dikukuhkan sebagai PKP apabila peredaran bruto setahunnya melebihi...',
    ['Rp4,8 miliar', 'Rp600 juta', 'Rp500 juta', 'Rp4,8 juta', 'Rp48 miliar'],
    1, 'Batas pengukuhan PKP = Rp4,8 miliar per tahun.'),
  q('brevet-a-bab4', 4, 'Jika PPN Keluaran lebih besar daripada PPN Masukan, maka PKP tersebut...',
    ['Kurang bayar dan harus menyetor selisihnya', 'Lebih bayar dan mendapat restitusi', 'Tidak perlu menyetor', 'Mendapat kredit pajak', 'Nihil PPN'],
    1, 'Selisih keluaran > masukan merupakan PPN kurang bayar yang wajib disetor.'),
  q('brevet-a-bab4', 5, 'Bukti pungutan PPN yang dibuat oleh PKP disebut...',
    ['Faktur pajak', 'Bukti potong', 'Surat setoran', 'Surat tagihan', 'Kuitansi'],
    1, 'Faktur pajak adalah bukti pungutan PPN, kini dibuat secara elektronik (e-Faktur).'),
  q('brevet-a-bab4', 6, 'Berdasarkan UU 10/2020, tarif bea meterai yang berlaku adalah...',
    ['Rp10.000 dan Rp1.000', 'Rp6.000 dan Rp3.000', 'Rp5.000 dan Rp2.000', 'Rp12.000 dan Rp6.000', 'Rp10.000 dan Rp6.000'],
    1, 'UU 10/2020 menetapkan bea meterai Rp10.000 dan Rp1.000.')
];

module.exports = { categories, questions, materi };