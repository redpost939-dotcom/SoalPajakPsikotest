function mulaiKuis(req, data) {
  req.session.kuis = {
    tipe: data.tipe,
    kode: data.kode,
    kategori: data.kategori,
    level: data.level,
    ids: data.ids,
    jawaban: {}
  };
}

function ambilKuis(req) {
  return req.session.kuis || null;
}

function simpanJawaban(req, idSoal, jawaban) {
  if (req.session.kuis) {
    req.session.kuis.jawaban[idSoal] = jawaban;
  }
}

async function selesaikanKuis(req, pool) {
  const kuis = req.session.kuis;
  if (!kuis) return null;

  const { rows } = await pool.query('SELECT * FROM questions WHERE id = ANY($1::int[])', [kuis.ids]);
  const map = {};
  rows.forEach(r => { map[r.id] = r; });

  let benar = 0;
  const review = kuis.ids.map((id, idx) => {
    const q = map[id];
    const jawabanUser = kuis.jawaban[id] || 0;
    const isBenar = jawabanUser === q.kunci;
    if (isBenar) benar++;
    return {
      nomor: idx + 1,
      soal: q,
      jawabanUser,
      isBenar
    };
  });

  const total = kuis.ids.length;
  const skor = Math.round((benar / total) * 100 * 100) / 100;

  await pool.query(
    `INSERT INTO hasil_test (user_id, tipe, kategori, level, total_soal, benar, skor, detail)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb)`,
    [req.session.user ? req.session.user.id : null, kuis.tipe, kuis.kategori, kuis.level, total, benar, skor, JSON.stringify(review.map(r => ({
      nomor: r.nomor,
      jawaban: r.jawabanUser,
      kunci: r.soal.kunci,
      benar: r.isBenar
    })))]
  );

  const hasil = { tipe: kuis.tipe, kode: kuis.kode, kategori: kuis.kategori, level: kuis.level, total, benar, skor, review };

  if (kuis.tipe === 'psikotest') {
    const { penilaianKategori } = require('../lib/penilaian');
    hasil.penilaian = penilaianKategori(kuis.kode, skor, benar, total);
  }

  delete req.session.kuis;
  return hasil;
}

module.exports = { mulaiKuis, ambilKuis, simpanJawaban, selesaikanKuis };