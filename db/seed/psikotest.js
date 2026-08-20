// ============================================================
// SEED PSIKOTEST — 6 kategori, berurutan seperti tes asli
// Kategori: verbal, numerik, logika, spasial, matematika, kepribadian
// Level: mudah -> sedang -> sulit
// ============================================================

const categories = [
  { tipe: 'psikotest', kode: 'verbal', nama: 'Tes Verbal', deskripsi: 'Sinonim, antonim, dan analogi kata untuk mengukur kemampuan berbahasa dan pemahaman kosakata.', urutan: 1 },
  { tipe: 'psikotest', kode: 'numerik', nama: 'Tes Numerik', deskripsi: 'Deret angka dan kemampuan hitung cepat yang mengukur ketajaman berpikir angka.', urutan: 2 },
  { tipe: 'psikotest', kode: 'logika', nama: 'Tes Logika', deskripsi: 'Penalaran logis, silogisme, dan kesimpulan untuk mengukur daya nalar.', urutan: 3 },
  { tipe: 'psikotest', kode: 'spasial', nama: 'Tes Spasial & Figural', deskripsi: 'Rotasi, pencerminan, dan pola gambar untuk mengukur kemampuan visual-spasial (dalam bentuk diagram).', urutan: 4 },
  { tipe: 'psikotest', kode: 'matematika', nama: 'Tes Matematika Dasar', deskripsi: 'Pecahan, persen, rasio, kecepatan, untung-rugi: materi dasar yang sering muncul saat tes.', urutan: 5 },
  { tipe: 'psikotest', kode: 'kepribadian', nama: 'Tes Kepribadian', deskripsi: 'Pilihan sikap dalam situasi kerja untuk melihat karakter (tidak ada jawaban salah mutlak).', urutan: 6 }
];

const q = (kode, level, urutan, pertanyaan, diagram, opsi, kunci, pembahasan) =>
  ({ kode, level, nomor_urutan: urutan, pertanyaan, diagram, opsi, kunci, pembahasan });

const questions = [
  // ============ TES VERBAL ============
  q('verbal', 'mudah', 1, 'Sinonim kata "mendapatkan" adalah...', null,
    ['memperoleh', 'menyerahkan', 'membuang', 'mengabaikan', 'menyimpan'],
    1, 'Memperoleh = mendapatkan. Pilihan lain justru kebalikan atau tidak sepadan.'),
  q('verbal', 'mudah', 2, 'Antonim (lawan kata) dari "terang" adalah...', null,
    ['gelap', 'cerah', 'jelas', 'bersinar', 'putih'],
    1, 'Lawan kata terang adalah gelap.'),
  q('verbal', 'mudah', 3, 'Lengkapilah analogi: "Burung : Terbang = Ikan : ..."', null,
    ['Berenang', 'Berjalan', 'Terbang', 'Merayap', 'Melompat'],
    1, 'Burung bergerak dengan cara terbang, ikan bergerak dengan cara berenang.'),
  q('verbal', 'mudah', 4, 'Sinonim kata "abadi" adalah...', null,
    ['kekal', 'sementara', 'fana', 'sesaat', 'singkat'],
    1, 'Abadi = kekal, tidak berkesudahan.'),
  q('verbal', 'sedang', 5, 'Antonim kata "optimis" adalah...', null,
    ['pesimis', 'semangat', 'yakin', 'berharap', 'gigih'],
    1, 'Optimis = berpandangan baik/semangat; lawannya pesimis (berpandangan buruk).'),
  q('verbal', 'sedang', 6, 'Lengkapilah analogi: "Pedagang : Toko = Dokter : ..."', null,
    ['Rumah sakit', 'Pasar', 'Apotek', 'Laboratorium', 'Sekolah'],
    1, 'Tempat kerja pedagang adalah toko; tempat kerja dokter adalah rumah sakit.'),
  q('verbal', 'sedang', 7, 'Sinonim kata "kontemporer" adalah...', null,
    ['modern', 'kuno', 'tradisional', 'klasik', 'lampau'],
    1, 'Kontemporer = masa kini / modern.'),
  q('verbal', 'sedang', 8, 'Antonim kata "mayoritas" adalah...', null,
    ['minoritas', 'keseluruhan', 'dominan', 'sebagian besar', 'umum'],
    1, 'Mayoritas = bagian terbesar; lawannya minoritas.'),
  q('verbal', 'sulit', 9, 'Lengkapilah analogi: "Pohon : Hutan = Bintang : ..."', null,
    ['Galaksi', 'Planet', 'Matahari', 'Satelit', 'Komet'],
    1, 'Kumpulan pohon membentuk hutan; kumpulan bintang membentuk galaksi.'),
  q('verbal', 'sulit', 10, 'Sinonim kata "paradoks" adalah...', null,
    ['pertentangan', 'kesamaan', 'persetujuan', 'keselarasan', 'kejelasan'],
    1, 'Paradoks = pernyataan yang seolah bertentangan / bertentangan dengan akal sehat.'),
  q('verbal', 'sulit', 11, 'Antonim kata "eksternal" adalah...', null,
    ['internal', 'luar', 'tambahan', 'lengkap', 'tidak langsung'],
    1, 'Eksternal = dari luar; lawannya internal (dari dalam).'),
  q('verbal', 'sulit', 12, 'Lengkapilah analogi: "Demokrasi : Rakyat = Otokrasi : ..."', null,
    ['Penguasa', 'Parlemen', 'Hukum', 'Konstitusi', 'Hakim'],
    1, 'Dalam demokrasi kekuasaan di tangan rakyat; dalam otokrasi kekuasaan di tangan penguasa tunggal.'),

  // ============ TES NUMERIK ============
  q('numerik', 'mudah', 1, 'Lanjutkan deret: 2, 4, 6, 8, ...', null,
    ['10', '11', '12', '9', '14'],
    1, 'Pola: tambah 2 setiap langkah, sehingga 8 + 2 = 10.'),
  q('numerik', 'mudah', 2, 'Lanjutkan deret: 3, 6, 12, 24, ...', null,
    ['48', '36', '42', '30', '54'],
    1, 'Pola: dikali 2, sehingga 24 × 2 = 48.'),
  q('numerik', 'mudah', 3, 'Hitung: 5 + 7 × 2 = ...', null,
    ['19', '24', '26', '17', '14'],
    1, 'Kerjakan perkalian dulu: 7 × 2 = 14, lalu 5 + 14 = 19.'),
  q('numerik', 'mudah', 4, 'Hitung: 1/2 + 1/4 = ...', null,
    ['3/4', '2/3', '1/5', '1/3', '1'],
    1, 'Samakan penyebut: 2/4 + 1/4 = 3/4.'),
  q('numerik', 'sedang', 5, 'Lanjutkan deret: 1, 1, 2, 3, 5, 8, ...', null,
    ['13', '11', '12', '14', '10'],
    1, 'Pola Fibonacci: bilangan berikutnya = jumlah dua bilangan sebelumnya (5 + 8 = 13).'),
  q('numerik', 'sedang', 6, 'Lanjutkan deret: 100, 95, 85, 70, 50, ...', null,
    ['25', '30', '35', '20', '40'],
    1, 'Pola: dikurangi 5, 10, 15, 20, 25 → 50 - 25 = 25.'),
  q('numerik', 'sedang', 7, 'Berapakah 25% dari 240?', null,
    ['60', '75', '48', '80', '50'],
    1, '25% = 1/4 → 240 : 4 = 60.'),
  q('numerik', 'sedang', 8, 'Bilangan ganjil ke-9 adalah...', null,
    ['17', '15', '19', '21', '13'],
    1, 'Deret ganjil: 1,3,5,7,9,11,13,15,17 → yang ke-9 = 17.'),
  q('numerik', 'sulit', 9, 'Lanjutkan deret: 2, 3, 5, 8, 12, 17, ...', null,
    ['23', '22', '21', '24', '20'],
    1, 'Pola: +1, +2, +3, +4, +5, +6 → 17 + 6 = 23.'),
  q('numerik', 'sulit', 10, 'Rata-rata dari bilangan 8, 12, 16, 20, 24 adalah...', null,
    ['16', '18', '15', '17', '14'],
    1, 'Jumlah = 80, banyak data = 5, rata-rata = 80 : 5 = 16.'),
  q('numerik', 'sulit', 11, 'Harga sebuah barang naik 20% lalu turun 10%. Harga akhir barang tersebut adalah... (dibanding harga awal)', null,
    ['naik 8%', 'turun 8%', 'tetap', 'naik 10%', 'turun 10%'],
    1, 'Misal awal 100 → naik 20% = 120 → turun 10% dari 120 = 12 → 108. Berarti naik 8%.'),
  q('numerik', 'sulit', 12, 'Jika x + 2y = 10 dan x - y = 4, maka nilai y adalah...', null,
    ['2', '3', '4', '5', '6'],
    1, 'Kurangkan: (x+2y)-(x-y)=10-4 → 3y=6 → y=2.'),

  // ============ TES LOGIKA ============
  q('logika', 'mudah', 1, 'Semua kucing suka ikan. Miko adalah seekor kucing. Kesimpulan yang benar adalah...', null,
    ['Miko suka ikan', 'Miko tidak suka ikan', 'Semua yang suka ikan adalah kucing', 'Miko bukan kucing', 'Tidak dapat disimpulkan'],
    1, 'Dari "semua kucing suka ikan" dan "Miko kucing", maka pasti Miko suka ikan (silogisme).'),
  q('logika', 'mudah', 2, 'Jika hujan, maka jalan basah. Ternyata jalan tidak basah. Kesimpulan yang benar adalah...', null,
    ['Tidak hujan', 'Pasti hujan', 'Hujan tapi jalan kering', 'Tidak dapat disimpulkan', 'Ada angin kencang'],
    1, 'Modus tollens: jika p→q dan q salah, maka p salah. Tidak hujan.'),
  q('logika', 'mudah', 3, 'A lebih tinggi daripada B, dan B lebih tinggi daripada C. Siapa yang paling tinggi?', null,
    ['A', 'B', 'C', 'A dan B sama tinggi', 'Tidak dapat disimpulkan'],
    1, 'Karena A > B dan B > C, maka A paling tinggi.'),
  q('logika', 'mudah', 4, 'Semua karyawan rajin. Andi tidak rajin. Kesimpulan yang benar adalah...', null,
    ['Andi bukan karyawan', 'Andi adalah karyawan', 'Andi karyawan yang rajin', 'Andi malas tapi karyawan', 'Tidak dapat disimpulkan'],
    1, 'Jika semua karyawan rajin, maka yang tidak rajin bukanlah karyawan.'),
  q('logika', 'sedang', 5, 'Semua burung bertelur. Sebagian burung adalah hewan peliharaan. Kesimpulan yang paling sahih adalah...', null,
    ['Sebagian hewan peliharaan adalah burung yang bertelur', 'Semua hewan peliharaan bertelur', 'Semua burung adalah hewan peliharaan', 'Tidak ada hewan peliharaan yang bertelur', 'Semua hewan peliharaan adalah burung'],
    1, 'Karena sebagian burung adalah hewan peliharaan dan semua burung bertelur, maka sebagian hewan peliharaan (yang burung) bertelur.'),
  q('logika', 'sedang', 6, 'Di rak buku: buku A terletak di kiri B, buku C di kanan B, dan D berada paling kiri. Urutan buku dari kiri ke kanan adalah...', null,
    ['D, A, B, C', 'A, D, B, C', 'D, B, A, C', 'C, B, A, D', 'A, B, C, D'],
    1, 'D paling kiri; A di kiri B; C di kanan B. Maka: D, A, B, C.'),
  q('logika', 'sedang', 7, 'Jika harga BBM naik, maka harga angkutan umum naik. Ternyata harga angkutan umum naik. Apakah bisa disimpulkan harga BBM pasti naik?', null,
    ['Belum tentu, sebab bisa ada faktor lain', 'Pasti BBM naik', 'Pasti BBM tidak naik', 'Tidak ada hubungan', 'BBM naik setelah angkutan naik'],
    1, 'Ini kesalahan logika "mengafirmasi konsekuen" — kenaikan angkutan bisa disebabkan faktor lain.'),
  q('logika', 'sedang', 8, 'Budi lebih tua dari Dewi. Cici lebih muda dari Dewi dan lebih tua dari Budi. Siapa yang paling muda?', null,
    ['Dewi', 'Budi', 'Cici', 'Budi dan Cici sama', 'Tidak dapat disimpulkan'],
    1, 'Urutan umur: Cici > Budi > Dewi (sebab Cici lebih muda dari Dewi tapi lebih tua dari Budi → berarti Cici < Dewi). Perhatikan: "Cici lebih muda dari Dewi" dan "Cici lebih tua dari Budi" → Budi < Cici < Dewi. Jadi Dewi paling muda.'),
  q('logika', 'sulit', 9, 'Semua pensiunan adalah warga senior. Sebagian warga senior adalah pengurus RT. Kesimpulan yang TIDAK sahih adalah...', null,
    ['Sebagian pengurus RT adalah pensiunan', 'Sebagian warga senior bukan pensiunan', 'Semua pensiunan warga senior', 'Ada warga senior yang menjadi pengurus RT', 'Sebagian pensiunan adalah warga senior'],
    1, 'Dari premis tersebut, tidak dapat dipastikan pengurus RT itu pensiunan — boleh jadi warga senior yang bukan pensiunan.'),
  q('logika', 'sulit', 10, 'Jika A=1, B=2, C=3, ... , maka jumlah nilai huruf dari kata "PADU" adalah...', null,
    ['42', '40', '36', '38', '44'],
    1, 'P=16, A=1, D=4, U=21 → 16+1+4+21 = 42.'),
  q('logika', 'sulit', 11, 'Dalam lomba balap: W finish sebelum X, Y finish sebelum W, dan Z finish setelah Y. Jika hanya ada 4 pembalap, urutan finis ke-1 sampai ke-4 adalah...', null,
    ['Y, W, X, Z', 'W, X, Y, Z', 'Y, W, Z, X', 'W, Y, Z, X', 'Z, Y, W, X'],
    1, 'Y < W, W < X, dan Z setelah Y → kemungkinan: Y, W, X, Z (Z harus setelah Y dan posisi tersisa paling akhir).'),
  q('logika', 'sulit', 12, 'Semua A adalah B. Semua B adalah C. Tidak ada C yang merupakan D. Kesimpulan yang benar adalah...', null,
    ['Tidak ada A yang merupakan D', 'Semua C adalah A', 'Sebagian A adalah D', 'Semua D adalah A', 'Tidak dapat disimpulkan'],
    1, 'Karena semua A ⊂ B ⊂ C dan C tidak beririsan dengan D, maka A pasti tidak beririsan dengan D.'),

  // ============ TES SPASIAL & FIGURAL ============
  q('spasial', 'mudah', 1, 'Perhatikan pola perpindahan titik hitam berikut. Pola selanjutnya (nomor 4) adalah...', `
Pola 1:   Pola 2:   Pola 3:
. . .     . . .     . . .
. . .     . . .     . . .
. . .     . . .     . . .
(titik   (titik    (titik
 berpindah dari
 pojok kiri atas
 turun diagonal)
`,
    ['Titik berpindah ke pojok kanan bawah', 'Titik kembali ke pojok kiri atas', 'Titik di tengah', 'Titik di pojok kiri bawah', 'Titik di pojok kanan atas'],
    1, 'Pola 1→2→3 titik bergerak diagonal satu langkah ke kanan bawah; langkah ke-4 sampai di pojok kanan bawah.'),
  q('spasial', 'mudah', 2, 'Sebuah persegi dibagi menjadi 4 bagian sama besar. Berapa jumlah seluruh persegi (termasuk yang besar) pada gambar tersebut?', `
+---+---+
|   |   |
+---+---+
|   |   |
+---+---+
`,
    ['5', '4', '3', '6', '7'],
    1, 'Ada 4 persegi kecil + 1 persegi besar = 5 persegi.'),
  q('spasial', 'mudah', 3, 'Manakah bangun yang memiliki sumbu simetri vertikal (terbelah kiri-kanan sama)?', null,
    ['Segitiga sama kaki', 'Huruf "F"', 'Zigzag tidak beraturan', 'Bentuk panah miring', 'Tidak ada yang benar'],
    1, 'Segitiga sama kaki dapat dibagi menjadi dua bagian yang identik oleh sumbu vertikal.'),
  q('spasial', 'mudah', 4, 'Huruf "L" berikut diputar 90 derajat searah jarum jam. Bentuk hasil putarannya adalah...', `
Bentuk awal:
.
.
.
. . .
`,
    ['Berbentuk L terbalik menghadap kanan-bawah (berputar)', 'Tetap sama seperti awal', 'Menjadi garis lurus', 'Menjadi huruf "T"', 'Menjadi huruf "V"'],
    1, 'Memutar bentuk L sebesar 90 derajat akan mengubah arah "kakinya" menjadi menghadap kanan-bawah.'),
  q('spasial', 'sedang', 5, 'Hitung jumlah segitiga pada gambar piramida berikut:', `
   /\\
  /__\\
 /\\  /\\
/__\\/__\\
`,
    ['5', '3', '4', '6', '7'],
    1, 'Ada 4 segitiga kecil + 1 segitiga besar = 5 segitiga.'),
  q('spasial', 'sedang', 6, 'Sebuah lingkaran kecil berputar searah jarum jam mengelilingi sudut-sudut persegi (posisi 1: kiri-atas, posisi 2: kanan-atas, posisi 3: kanan-bawah). Posisi ke-4 adalah...', `
Posisi 1    Posisi 2    Posisi 3
o-----      ----o       ----
|    |      |    |      |    |
|    |      |    |      |    |
-----       -----       ----o
`,
    ['Kiri-bawah', 'Kiri-atas', 'Tengah', 'Kanan-atas', 'Kiri-tengah'],
    1, 'Urutan searah jarum jam: kiri-atas → kanan-atas → kanan-bawah → kiri-bawah.'),
  q('spasial', 'sedang', 7, 'Huruf "b" jika dicerminkan terhadap garis mendatar (horizontal) akan menjadi...', null,
    ['p', 'd', 'q', 'b', '6'],
    1, 'Huruf b dicerminkan horizontal menjadi p (lengkungan tetap di sisi yang sama secara horizontal).'),
  q('spasial', 'sedang', 8, 'Manakah di antara berikut yang BUKAN merupakan hasil pencerminan cermin dari angka 6?', null,
    ['6', 'g', 'seperti angka 6 terbalik', 'bentuk cermin cermin', 'tidak ada'],
    1, 'Pencerminan angka 6 akan terlihat seperti "e" atau "g" tergantung cerminnya; angka 6 yang utuh bukan hasil cermin.'),
  q('spasial', 'sulit', 9, 'Deret berikut menunjukkan banyak titik: 1, 3, 5, ... Banyak titik pada pola ke-5 adalah...', null,
    ['9', '7', '11', '10', '8'],
    1, 'Pola ganjil: 1,3,5,7,9 → pola ke-5 = 9.'),
  q('spasial', 'sulit', 10, 'Huruf "F" diputar 90 derajat berlawanan arah jarum jam. Bentuk hasilnya paling mirip dengan...', null,
    ['huruf F yang miring ke kiri (kaki atas jadi bawah)', 'huruf F biasa', 'huruf E', 'huruf T', 'garis lurus'],
    1, 'Memutar F berlawanan arah jarum jam membuat bagian atas (garis pendek) berpindah ke kiri-bawah.'),
  q('spasial', 'sulit', 11, 'Perhatikan urutan gambar berikut. Gambar yang berbeda (tidak sesuai pola) adalah...', null,
    ['Gambar ketiga yang bentuknya terbalik dari pola', 'Gambar pertama', 'Gambar kedua', 'Gambar keempat', 'Semua sama'],
    1, 'Pada deret yang polanya konsisten, satu gambar dengan orientasi terbalik dianggap ganjil.'),
  q('spasial', 'sulit', 12, 'Berapa banyak kubus paling sedikit untuk menyusun bentuk berikut ini? (susunan: 1 di lapis atas, 4 di lapis bawah)', `
  X
XXXX
`,
    ['5', '4', '6', '7', '8'],
    1, 'Lapis bawah 4 kubus + 1 kubus di atas = 5 kubus.'),

  // ============ TES MATEMATIKA DASAR ============
  q('matematika', 'mudah', 1, 'Berapakah 3/5 dari 100?', null,
    ['60', '50', '40', '75', '80'],
    1, '3/5 × 100 = 300/5 = 60.'),
  q('matematika', 'mudah', 2, 'Berapakah 15% dari 200?', null,
    ['30', '25', '20', '35', '15'],
    1, '15/100 × 200 = 30.'),
  q('matematika', 'mudah', 3, 'Harga sebuah tas Rp50.000 mendapat diskon 10%. Berapa yang harus dibayar?', null,
    ['Rp45.000', 'Rp40.000', 'Rp47.500', 'Rp42.500', 'Rp50.000'],
    1, 'Diskon = 10% × 50.000 = 5.000 → bayar 50.000 - 5.000 = 45.000.'),
  q('matematika', 'mudah', 4, 'Hitung: 120 + 45 - 60 = ...', null,
    ['105', '115', '95', '125', '85'],
    1, '120 + 45 = 165; 165 - 60 = 105.'),
  q('matematika', 'sedang', 5, 'Dua bilangan memiliki perbandingan 3 : 5 dan jumlah keduanya 80. Bilangan terkecil adalah...', null,
    ['30', '50', '40', '20', '35'],
    1, 'Jumlah bagian = 8. Satu bagian = 80/8 = 10. Bilangan terkecil = 3 × 10 = 30.'),
  q('matematika', 'sedang', 6, 'Sebuah mobil melaju 60 km/jam dan menempuh jarak 150 km. Berapa waktu yang dibutuhkan?', null,
    ['2,5 jam', '2 jam', '3 jam', '1,5 jam', '4 jam'],
    1, 'Waktu = jarak / kecepatan = 150 / 60 = 2,5 jam.'),
  q('matematika', 'sedang', 7, 'Andi membeli barang seharga Rp80.000 lalu menjualnya dengan untung 20%. Harga jualnya adalah...', null,
    ['Rp96.000', 'Rp100.000', 'Rp90.000', 'Rp86.000', 'Rp104.000'],
    1, 'Untung = 20% × 80.000 = 16.000 → harga jual = 96.000.'),
  q('matematika', 'sedang', 8, 'Rata-rata dari 5, 8, 9, 12, 6 adalah...', null,
    ['8', '9', '7', '8,5', '10'],
    1, 'Jumlah = 40, banyak data = 5 → rata-rata = 8.'),
  q('matematika', 'sulit', 9, 'Uang Rp1.000.000 ditabung dengan bunga tunggal 6% per tahun. Setelah 2 tahun jumlah uangnya menjadi...', null,
    ['Rp1.120.000', 'Rp1.060.000', 'Rp1.200.000', 'Rp1.180.000', 'Rp1.100.000'],
    1, 'Bunga = 6% × 2 × 1.000.000 = 120.000 → total = 1.120.000.'),
  q('matematika', 'sulit', 10, 'Andi dapat menyelesaikan pekerjaan dalam 6 hari, Budi dalam 12 hari. Jika dikerjakan bersama-sama, pekerjaan selesai dalam...', null,
    ['4 hari', '5 hari', '3 hari', '6 hari', '2 hari'],
    1, 'Kecepatan bersama = 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4 → selesai dalam 4 hari.'),
  q('matematika', 'sulit', 11, 'Harga awal Rp1.200.000, diskon 25%, lalu mendapat tambahan potongan 10% dari harga setelah diskon. Uang yang dibayar adalah...', null,
    ['Rp810.000', 'Rp780.000', 'Rp900.000', 'Rp840.000', 'Rp820.000'],
    1, 'Setelah diskon 25%: 1.200.000 × 0,75 = 900.000. Potongan 10% lagi: 900.000 × 0,9 = 810.000.'),
  q('matematika', 'sulit', 12, 'Perbandingan umur Ayah : Anak = 5 : 2. Selisih umur mereka 18 tahun. Umur Ayah adalah...', null,
    ['30 tahun', '12 tahun', '25 tahun', '36 tahun', '28 tahun'],
    1, 'Selisih bagian = 3 → 1 bagian = 18/3 = 6. Umur Ayah = 5 × 6 = 30 tahun.'),

  // ============ TES KEPRIBADIAN ============
  q('kepribadian', 'sedang', 1, 'Tim Anda menghadapi tenggat pekerjaan yang sangat ketat. Sikap Anda yang paling tepat adalah...', null,
    ['Membagi tugas secara jelas sesuai kemampuan anggota', 'Mengerjakan semuanya sendiri agar cepat', 'Menunggu instruksi pimpinan tanpa inisiatif', 'Mengeluh dan menyalahkan anggota lain', 'Mengabaikan tenggat karena terburu-buru'],
    1, 'Kerja tim yang baik ditandai pembagian tugas dan koordinasi. Menumpuk pekerjaan sendiri berisiko kualitas menurun.'),
  q('kepribadian', 'sedang', 2, 'Saat menerima kritik atas hasil kerja Anda, reaksi yang paling baik adalah...', null,
    ['Menerima dengan terbuka dan memperbaiki diri', 'Membela diri habis-habisan', 'Diam dan tersinggung', 'Menyalahkan kondisi', 'Menghindar dari penilaian'],
    1, 'Kritik membangun diterima secara terbuka untuk perbaikan — tanda kedewasaan dan mau belajar.'),
  q('kepribadian', 'sedang', 3, 'Seorang rekan kerja mengalami kesulitan menyelesaikan tugasnya. Anda akan...', null,
    ['Menawarkan bantuan dan berbagi cara', 'Membiarkan karena itu tugasnya', 'Mengerjakan semua tugasnya', 'Melaporkan ke atasan tanpa berdiskusi', 'Menertawakan kesulitannya'],
    1, 'Saling membantu tanpa merampas tanggung jawab rekan mencerminkan sikap kolaboratif.'),
  q('kepribadian', 'sedang', 4, 'Anda mendapat tugas di luar deskripsi pekerjaan Anda. Tindakan terbaik adalah...', null,
    ['Mempelajarinya dan mengerjakannya dengan baik', 'Menolak karena bukan tugas Anda', 'Mengerjakan asal-asalan', 'Meminta orang lain mengerjakan', 'Mengeluh kepada semua orang'],
    1, 'Fleksibel dan mau belajar hal baru adalah nilai plus di dunia kerja.'),
  q('kepribadian', 'sedang', 5, 'Prioritas Anda saat bekerja adalah...', null,
    ['Hasil yang berkualitas dan selesai tepat waktu', 'Selesai cepat walau berantakan', 'Mendapat pujian atasan', 'Menghindari kesalahan apa pun', 'Mengikuti kebiasaan lama'],
    1, 'Keseimbangan kualitas dan ketepatan waktu menunjukkan profesionalisme dan tanggung jawab.'),
  q('kepribadian', 'sedang', 6, 'Terjadi perbedaan pendapat dengan rekan dalam rapat. Sikap Anda adalah...', null,
    ['Mendengarkan, lalu mencari solusi terbaik bersama', 'Memaksa pendapat Anda menang', 'Diam tanpa menyampaikan pendapat', 'Meninggalkan rapat', 'Membuat suasana memanas'],
    1, 'Musyawarah yang sehat dan saling menghargai pendapat adalah ciri komunikasi yang baik.')
];

module.exports = { categories, questions };