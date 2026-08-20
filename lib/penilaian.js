// Penilaian psikotest: profil per kategori + predikat & saran

const PROFIL = {
  verbal: { nama: 'Tes Verbal', pengukuran: 'Pemahaman kosakata, sinonim-antonim, dan analogi kata. Kunci untuk komunikasi tulis maupun lisan.' },
  numerik: { nama: 'Tes Numerik', pengukuran: 'Ketajaman berpikir angka, pola deret, dan kecepatan hitung. Berguna untuk pekerjaan analitis.' },
  logika: { nama: 'Tes Logika', pengukuran: 'Daya nalar, silogisme, dan pengambilan kesimpulan. Indikator kemampuan memecahkan masalah.' },
  spasial: { nama: 'Tes Spasial & Figural', pengukuran: 'Kemampuan visual-spasial, rotasi, pencerminan, dan membaca pola gambar.' },
  matematika: { nama: 'Tes Matematika Dasar', pengukuran: 'Perhitungan dasar: pecahan, persen, rasio, kecepatan, untung-rugi.' },
  kepribadian: { nama: 'Tes Kepribadian', pengukuran: 'Karakter dan sikap dalam situasi kerja. Bukan soal benar-salah, melainkan refleksi diri.' }
};

function nilaiSkor(skor, kepribadian) {
  if (kepribadian) {
    return { predikat: 'Refleksi', saran: 'Tes kepribadian tidak memiliki nilai benar/salah. Gunakan hasilnya untuk mengenali kecenderungan karakter Anda dan kembangkan yang positif.' };
  }
  if (skor >= 85) return { predikat: 'Sangat Baik', saran: 'Penguasaan sangat baik. Pertahankan dan terus berlatih soal dengan tingkat lebih sulit.' };
  if (skor >= 70) return { predikat: 'Baik', saran: 'Penguasaan baik. Latihan sedikit lagi untuk menutup kelemahan pada bagian yang salah.' };
  if (skor >= 50) return { predikat: 'Cukup', saran: 'Penguasaan cukup. Baca pembahasan soal yang salah lalu ulangi dengan fokus pada tipe soal itu.' };
  return { predikat: 'Perlu Latihan', saran: 'Masih perlu banyak latihan. Pelajari pembahasan, lalu coba ulangi dari level mudah terlebih dahulu.' };
}

function penilaianKategori(kode, skor, benar, total) {
  const p = PROFIL[kode] || { nama: 'Tes', pengukuran: 'Penilaian umum' };
  const n = nilaiSkor(skor, kode === 'kepribadian');
  return {
    nama: p.nama,
    pengukuran: p.pengukuran,
    predikat: n.predikat,
    saran: n.saran,
    skor,
    benar,
    total
  };
}

module.exports = { penilaianKategori };