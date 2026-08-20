// ============================================================
// SEED PBB & BPHTB — 2 bab: PBB-P2 dan BPHTB
// Sumber: materi upload "PBB & BPHTB.pdf"
// ============================================================

const categories = [
  { tipe: 'pajak', kode: 'pbb-bab1', nama: 'PBB Pedesaan & Perkotaan (PBB-P2)', deskripsi: 'Dasar hukum, objek/subjek PBB, NJOP, NJOPTKP, tarif, dan rumus perhitungan PBB-P2.', urutan: 28 },
  { tipe: 'pajak', kode: 'pbb-bab2', nama: 'BPHTB', deskripsi: 'Objek, subjek, dasar pengenaan (NPOP), tarif 5%, NPOPTKP, serta BPHTB karena waris/hibah wasiat.', urutan: 29 }
];

const m = (kode, urutan, judul, isi) => ({ kode, urutan, judul, isi });
const q = (kode, urutan, pertanyaan, opsi, kunci, pembahasan) =>
  ({ kode, level: 'mudah', nomor_urutan: urutan, pertanyaan, diagram: null, opsi, kunci, pembahasan });

const materi = [
  // ---------------- BAB 1: PBB P-2 ----------------
  m('pbb-bab1', 1, 'Dasar Hukum dan Pengertian PBB', `<p><b>PBB</b> (Pajak Bumi dan Bangunan) adalah pajak yang dikenakan atas <b>bumi dan/atau bangunan</b>. Dasar hukum utama: UU No. 12/1985 jo. UU No. 12/1994, dan sejak desentralisasi fiskal diatur dalam UU No. 28/2009 (PDRD) serta <b>UU No. 1/2022 (HKPD)</b>.</p><ul><li>PBB bersifat <b>kebendaan</b>: besarnya pajak ditentukan oleh keadaan objek (bumi/tanah dan/atau bangunan), bukan oleh keadaan subjek (siapa yang membayar).</li><li>Sejak UU 28/2009, <b>PBB-P2</b> (Perdesaan dan Perkotaan) menjadi <b>pajak daerah</b> dan bagian dari Pendapatan Asli Daerah (PAD).</li></ul>`),
  m('pbb-bab1', 2, 'Objek PBB', `<p><b>Bumi</b> adalah permukaan bumi yang meliputi tanah dan perairan pedalaman serta laut wilayah Indonesia. <b>Bangunan</b> adalah konstruksi teknik yang ditanam atau dilekatkan secara tetap pada tanah dan/atau perairan.</p><p>Objek pajak sektor Perdesaan dan Perkotaan adalah bumi dan/atau bangunan yang dimiliki, dikuasai, dan/atau dimanfaatkan oleh orang pribadi atau badan, <b>kecuali</b> objek sektor perkebunan, perhutanan, dan pertambangan (yang masih menjadi PBB pusat sektor tertentu).</p>`),
  m('pbb-bab1', 3, 'Objek yang Tidak Dikenakan PBB', `<ul><li>Digunakan semata-mata untuk melayani kepentingan umum (ibadah, sosial, kesehatan, pendidikan nasional, kebudayaan).</li><li>Digunakan untuk kuburan, peninggalan purbakala, atau yang sejenis.</li><li>Merupakan hutan lindung, suaka alam, hutan wisata, taman nasional, tanah penggembalaan yang dikuasai desa, dan tanah negara yang belum dibebani hak.</li><li>Digunakan oleh perwakilan diplomatik dan konsulat berdasarkan perlakuan timbal balik.</li><li>Digunakan oleh badan/perorangan untuk penyelenggaraan ibadah dan kegiatan keagamaan.</li></ul>`),
  m('pbb-bab1', 4, 'Subjek PBB-P2', `<p>Subjek PBB adalah <b>orang pribadi atau badan yang secara nyata</b>:</p><ul><li><b>mempunyai hak atas bumi</b> dan/atau</li><li><b>memperoleh manfaat atas bumi</b> dan/atau</li><li><b>memiliki, menguasai, dan/atau memperoleh manfaat atas bangunan</b>.</li></ul><p>Wajib pajak adalah subjek pajak yang dikenai kewajiban membayar pajak.</p>`),
  m('pbb-bab1', 5, 'NJOP dan Cara Penentuan', `<p><b>Nilai Jual Objek Pajak (NJOP)</b> adalah harga rata-rata yang diperoleh dari:</p><ul><li><b>Transaksi jual beli</b> yang terjadi secara wajar;</li><li><b>Perbandingan harga</b> dengan objek lain yang sejenis (letak berdekatan, fungsi sama);</li><li><b>Nilai perolehan baru</b> (total biaya perolehan dikurangi penyusutan);</li><li><b>Nilai jual pengganti</b> (berdasarkan hasil produksi objek pajak).</li></ul><p>Berdasarkan UU 1/2022 (HKPD), NJOP yang digunakan untuk perhitungan PBB-P2 ditetapkan <b>paling rendah 20% dan paling tinggi 100%</b> dari NJOP setelah dikurangi NJOPTKP, dan besarnya ditetapkan oleh <b>Kepala Daerah</b>.</p>`),
  m('pbb-bab1', 6, 'NJOPTKP', `<p><b>NJOPTKP</b> (Nilai Jual Objek Pajak Tidak Kena Pajak) adalah batas NJOP yang tidak kena pajak.</p><ul><li>Setiap wajib pajak memperoleh pengurangan NJOPTKP <b>satu kali dalam satu tahun pajak</b>.</li><li>Jika wajib pajak memiliki beberapa objek pajak, pengurangan hanya diberikan pada <b>satu objek dengan nilai terbesar</b> dan tidak dapat digabung dengan objek lain.</li><li>Besaran NJOPTKP: minimal <b>Rp10.000.000</b> dan maksimal <b>Rp24.000.000</b> (ditetapkan Perda). Contoh: DKI Jakarta mulai tahun 2012 sebesar Rp15.000.000.</li></ul>`),
  m('pbb-bab1', 7, 'Tarif PBB-P2', `<ul><li>UU 1/2022 (HKPD) Pasal 41 ayat (1): tarif PBB-P2 ditetapkan <b>paling tinggi 0,5%</b> (naik dari sebelumnya maksimal 0,3% menurut UU PDRD).</li><li>Besaran tarif ditetapkan oleh <b>Peraturan Daerah</b> (Pemda) dan dapat bersifat progresif.</li><li>Contoh DKI Jakarta: NJOP &lt; Rp200 juta tarif 0,01%; Rp200 juta–Rp2 miliar 0,1%; Rp2 miliar–Rp10 miliar 0,2%; di atas Rp10 miliar 0,3%.</li></ul>`),
  m('pbb-bab1', 8, 'Rumus Perhitungan PBB', `<p style="font-weight:bold;">PBB = Tarif × Nilai Jual Kena Pajak (NJKP)</p><ul><li><b>NJKP</b> = persentase tertentu × (NJOP − NJOPTKP).</li><li>Persentase <b>40%</b> jika NJOP lebih dari Rp1.000.000.000.</li><li>Persentase <b>20%</b> jika NJOP sama dengan atau kurang dari Rp1.000.000.000.</li></ul><p>Jadi: <b>PBB = Tarif (maks 0,5%) × (20% atau 40%) × (NJOP − NJOPTKP)</b>.</p>`),
  m('pbb-bab1', 9, 'Contoh Perhitungan PBB', `<p><b>Soal:</b> PT AAA memiliki tanah seluas 1.000 m² (NJOP Rp5.000.000/m²) dan bangunan seluas 800 m² (NJOP Rp1.000.000/m²). NJOPTKP Rp12.000.000, NJKP 40%, tarif 0,5%. Berapa PBB terutang?</p><p><b>Jawab:</b><br>NJOP Bumi = 1.000 × Rp5.000.000 = Rp5.000.000.000<br>NJOP Bangunan = 800 × Rp1.000.000 = Rp800.000.000<br>NJOP total = <b>Rp5.800.000.000</b><br>NJKP = 40% × (Rp5.800.000.000 − Rp12.000.000) = <b>Rp2.315.200.000</b><br>PBB = 0,5% × Rp2.315.200.000 = <b>Rp4.630.400</b></p>`),

  // ---------------- BAB 2: BPHTB ----------------
  m('pbb-bab2', 1, 'Pengertian BPHTB', `<p><b>BPHTB</b> (Bea Perolehan Hak atas Tanah dan Bangunan) adalah pajak atas <b>perolehan hak atas tanah dan/atau bangunan</b>. Sejak UU 28/2009, BPHTB menjadi <b>pajak daerah</b> dan salah satu sumber PAD yang potensial.</p><p>Hak atas tanah yang dimaksud: hak milik, hak guna usaha (HGU), hak guna bangunan (HGB), hak pakai, hak milik satuan rumah susun, dan hak pengolahan.</p>`),
  m('pbb-bab2', 2, 'Objek BPHTB', `<p>Objek BPHTB adalah <b>perolehan hak atas tanah dan/atau bangunan</b> yang meliputi: jual beli, tukar menukar, hibah, hibah wasiat, waris, pemasukan dalam perseroan/badan hukum, pemisahan hak, pelaksanaan putusan hakim, penggabungan/peleburan/pemekaran usaha, dan hadiah.</p><p><b>Objek yang tidak dikenakan BPHTB</b>: perolehan hak untuk wakaf, perwakilan diplomatik (timbal balik), penggunaan oleh negara, dan untuk kepentingan ibadah.</p>`),
  m('pbb-bab2', 3, 'Subjek BPHTB', `<p>Subjek BPHTB adalah <b>orang pribadi atau badan yang memperoleh hak</b> atas tanah dan/atau bangunan. Wajib pajak adalah orang pribadi atau badan yang menjadi subjek pajak sesuai ketentuan.</p>`),
  m('pbb-bab2', 4, 'Dasar Pengenaan (NPOP)', `<p>Dasar pengenaan BPHTB adalah <b>Nilai Perolehan Objek Pajak (NPOP)</b>:</p><ul><li>Jual beli: <b>harga transaksi</b>.</li><li>Tukar menukar, hibah, hibah wasiat, waris, pemasukan dalam perseroan, pemisahan hak, putusan hakim, penggabungan/peleburan usaha, hadiah: <b>harga pasar</b>.</li><li>Lelang: harga transaksi dalam <b>risalah lelang</b>.</li><li>Jika NPOP tidak diketahui atau lebih rendah dari <b>NJOP PBB</b> pada tahun perolehan, maka dasar pengenaannya adalah <b>NJOP PBB</b>.</li></ul>`),
  m('pbb-bab2', 5, 'Tarif dan Perhitungan BPHTB', `<p style="font-weight:bold;">BPHTB = 5% × NPOPKP</p><p>NPOPKP (Nilai Perolehan Objek Pajak Kena Pajak) = <b>NPOP − NPOPTKP</b>.</p><ul><li>Tarif BPHTB sebesar <b>5%</b> dari NPOPKP.</li><li><b>NPOPTKP</b>: maksimum <b>Rp60.000.000</b> menjadi <b>Rp80.000.000</b> (ditetapkan Perda daerah).</li><li>NPOPTKP untuk perolehan karena <b>waris/hibah wasiat</b>: maksimum <b>Rp300.000.000</b> untuk keluarga sedarah garis lurus satu derajat ke atas/bawah termasuk suami/istri.</li></ul><p>Saat terutang: pada saat terjadinya perolehan hak. SKBKB diterbitkan jika pajak kurang bayar dengan sanksi 2% per bulan maksimal 24 bulan.</p>`),
  m('pbb-bab2', 6, 'BPHTB karena Waris/Hibah Wasiat', `<ul><li>Perolehan hak karena <b>waris</b>: perolehan hak oleh ahli waris dari pewaris, berlaku setelah pewaris meninggal dunia.</li><li>Perolehan hak karena <b>hibah wasiat</b>: perolehan hak dari pemberi hibah wasiat, berlaku setelah pemberi meninggal dunia.</li><li>BPHTB yang dibayar atas perolehan waris dan hibah wasiat adalah <b>50% dari BPHTB yang seharusnya terutang</b>.</li></ul>`),
  m('pbb-bab2', 7, 'Contoh Perhitungan BPHTB', `<p><b>Soal:</b> Pada 17 Agustus 2020, Tn. Alan membeli tanah dengan NPOP Rp80.000.000, NPOPTKP Rp60.000.000. Hitung BPHTB terutang!</p><p><b>Jawab:</b><br>NPOPKP = Rp80.000.000 − Rp60.000.000 = <b>Rp20.000.000</b><br>BPHTB = 5% × Rp20.000.000 = <b>Rp1.000.000</b></p>`)
];

const questions = [
  // BAB 1: PBB P-2
  q('pbb-bab1', 1, 'PBB adalah pajak yang dikenakan atas...',
    ['Bumi dan/atau bangunan', 'Penghasilan wajib pajak', 'Pertambahan nilai barang', 'Kendaraan bermotor', 'Impor barang'],
    1, 'PBB dikenakan atas bumi (tanah) dan/atau bangunan.'),
  q('pbb-bab1', 2, 'Sifat pajak PBB ditinjau dari besarnya pajak terutang ditentukan oleh keadaan objek adalah...',
    ['Kebendaan', 'Subjektif', 'Objektif personal', 'Tidak langsung', 'Final'],
    1, 'PBB bersifat kebendaan: besarnya pajak ditentukan keadaan objek (bumi/bangunan), bukan siapa subjeknya.'),
  q('pbb-bab1', 3, 'Besarnya NJOPTKP yang dapat ditetapkan oleh daerah adalah...',
    ['Minimal Rp10.000.000 dan maksimal Rp24.000.000', 'Tetap Rp12.000.000', 'Maksimal Rp60.000.000', 'Minimal Rp54.000.000', 'Tidak ada batasan'],
    1, 'NJOPTKP minimal Rp10 juta dan maksimal Rp24 juta, ditetapkan Perda.'),
  q('pbb-bab1', 4, 'Jika wajib pajak memiliki beberapa objek pajak PBB, pengurangan NJOPTKP diberikan pada...',
    ['Satu objek dengan nilai terbesar', 'Seluruh objek', 'Dua objek terbesar', 'Objek yang paling kecil', 'Semua objek digabung'],
    1, 'NJOPTKP hanya diberikan satu kali pada objek dengan nilai terbesar, tidak dapat digabung.'),
  q('pbb-bab1', 5, 'Nilai Jual Kena Pajak (NJKP) ditetapkan 40% jika...',
    ['NJOP lebih dari Rp1.000.000.000', 'NJOP kurang dari Rp1.000.000.000', 'NJOPTKP besar', 'Tarif 0,3%', 'NJOP sama dengan NJOPTKP'],
    1, 'NJKP = 40% bila NJOP > Rp1 miliar, dan 20% bila NJOP ≤ Rp1 miliar.'),
  q('pbb-bab1', 6, 'Rumus perhitungan PBB yang benar adalah...',
    ['PBB = tarif (maks 0,5%) x NJKP', 'PBB = 5% x NJOP', 'PBB = 20% x NJOP', 'PBB = tarif x NJOPTKP', 'PBB = 0,5% x harga transaksi'],
    1, 'PBB = tarif × NJKP, dengan NJKP = 20%/40% × (NJOP − NJOPTKP).'),
  q('pbb-bab1', 7, 'Berdasarkan UU 1/2022 (HKPD), tarif PBB-P2 paling tinggi adalah...',
    ['0,5%', '0,3%', '5%', '0,01%', '1%'],
    1, 'UU HKPD menaikkan batas tertinggi tarif PBB-P2 menjadi 0,5% (sebelumnya 0,3% menurut UU PDRD).'),
  q('pbb-bab1', 8, 'Tn. Hakim memiliki NJOP Rp600.000.000, NJOPTKP Rp12.000.000, NJKP 20%, tarif 0,5%. Besarnya PBB terutang adalah...',
    ['Rp588.000', 'Rp600.000', 'Rp1.176.000', 'Rp3.000.000', 'Rp294.000'],
    1, 'NJKP = 20% × (600.000.000 − 12.000.000) = 117.600.000; PBB = 0,5% × 117.600.000 = Rp588.000.'),

  // BAB 2: BPHTB
  q('pbb-bab2', 1, 'Tarif BPHTB adalah sebesar...',
    ['5%', '0,5%', '10%', '2,5%', '20%'],
    1, 'BPHTB = 5% × NPOPKP.'),
  q('pbb-bab2', 2, 'Dasar pengenaan BPHTB pada transaksi jual beli adalah...',
    ['Harga transaksi', 'Harga pasar', 'NJOP PBB selalu', 'Harga lelang', 'Nilai buku'],
    1, 'Jual beli: NPOP = harga transaksi.'),
  q('pbb-bab2', 3, 'Jika NPOP tidak diketahui atau lebih rendah dari NJOP PBB, maka dasar pengenaan BPHTB adalah...',
    ['NJOP PBB pada tahun perolehan', 'Harga pasar', 'Harga transaksi', 'Nilai perolehan baru', 'Harga lelang'],
    1, 'Bila NPOP tidak diketahui/NPOP < NJOP, dipakai NJOP PBB tahun perolehan.'),
  q('pbb-bab2', 4, 'Besarnya NPOPTKP untuk perolehan karena waris/hibah wasiat maksimum adalah...',
    ['Rp300.000.000', 'Rp60.000.000', 'Rp80.000.000', 'Rp24.000.000', 'Rp15.000.000'],
    1, 'NPOPTKP waris/hibah wasiat maksimum Rp300 juta untuk keluarga sedarah garis lurus termasuk suami/istri.'),
  q('pbb-bab2', 5, 'BPHTB yang dibayar atas perolehan hak karena waris adalah sebesar...',
    ['50% dari BPHTB yang seharusnya terutang', '100% dari BPHTB', '25% dari BPHTB', 'Dibebaskan seluruhnya', '75% dari BPHTB'],
    1, 'Perolehan waris/hibah wasiat dikenai BPHTB 50% dari yang seharusnya terutang.'),
  q('pbb-bab2', 6, 'Yang TIDAK termasuk objek BPHTB adalah perolehan hak karena...',
    ['Wakaf', 'Jual beli', 'Hibah', 'Waris', 'Lelang'],
    1, 'Perolehan hak untuk wakaf, diplomatik (timbal balik), penggunaan oleh negara, dan kepentingan ibadah tidak dikenakan BPHTB.'),
  q('pbb-bab2', 7, 'Tn. Bela membeli tanah dengan NPOP Rp150.000.000, NPOPTKP Rp60.000.000. BPHTB terutang adalah...',
    ['Rp4.500.000', 'Rp7.500.000', 'Rp750.000', 'Rp1.050.000', 'Rp9.000.000'],
    1, 'NPOPKP = 150.000.000 − 60.000.000 = 90.000.000; BPHTB = 5% × 90.000.000 = Rp4.500.000.'),
  q('pbb-bab2', 8, 'Saat terutangnya BPHTB adalah pada saat...',
    ['Terjadinya perolehan hak', 'Penerbitan sertifikat', 'Pembayaran pajak', 'Pengumuman lelang', 'Tanda tangan akta saja'],
    1, 'BPHTB terutang pada saat terjadinya perolehan hak atas tanah dan/atau bangunan.')
];

module.exports = { categories, questions, materi };