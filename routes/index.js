const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');
const { requireLogin, can } = require('../middleware/auth');
const { warna } = require('../lib/visuals');

router.get('/', async (req, res, next) => {
  try {
    const [psikoRaw, belajarRaw, statistik] = await Promise.all([
      pool.query(
        "SELECT c.*, COUNT(q.id)::int AS jml_soal FROM categories c LEFT JOIN questions q ON q.category_id = c.id WHERE c.tipe = 'psikotest' GROUP BY c.id ORDER BY c.urutan"
      ),
      pool.query(
        "SELECT c.*, COUNT(q.id)::int AS jml_soal, COUNT(m.id)::int AS jml_materi FROM categories c LEFT JOIN questions q ON q.category_id = c.id LEFT JOIN materi m ON m.category_id = c.id WHERE c.tipe IN ('akuntansi','pajak') GROUP BY c.id ORDER BY c.urutan"
      ),
      pool.query(
        "SELECT c.tipe, COUNT(q.id)::int AS total FROM questions q JOIN categories c ON c.id = q.category_id GROUP BY c.tipe"
      )
    ]);
    const hias = (k) => Object.assign(k, warna(k.kode));
    const psikotest = can(req.session.user, 'psikotest') ? psikoRaw.rows.map(hias) : [];
    const belajar = can(req.session.user, 'belajar') ? belajarRaw.rows.map(hias) : [];
    const totalSoal = statistik.rows.reduce((a, r) => a + r.total, 0);
    const totalMateri = belajar.reduce((a, r) => a + Number(r.jml_materi || 0), 0);
    const totalKategori = psikotest.length + belajar.length;
    res.render('index', {
      psikotest,
      belajar,
      statistik: statistik.rows,
      totalSoal,
      totalMateri,
      totalKategori
    });
  } catch (e) { next(e); }
});

router.get('/riwayat', requireLogin, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM hasil_test WHERE user_id = $1 ORDER BY id DESC LIMIT 100',
      [req.session.user.id]
    );
    res.render('riwayat', { daftar: rows });
  } catch (e) { next(e); }
});

module.exports = router;