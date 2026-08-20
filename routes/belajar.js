const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');
const { mulaiKuis, ambilKuis, simpanJawaban, selesaikanKuis } = require('./kuis-helper');
const { requireMenu } = require('../middleware/auth');
const { warna } = require('../lib/visuals');

router.use(requireMenu('belajar'));

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT c.*, COUNT(DISTINCT q.id)::int AS jml_soal, COUNT(DISTINCT m.id)::int AS jml_materi, COALESCE(MAX(m.urutan),0)::int AS bab_terakhir FROM categories c LEFT JOIN questions q ON q.category_id = c.id LEFT JOIN materi m ON m.category_id = c.id WHERE c.tipe IN ('akuntansi','pajak') GROUP BY c.id ORDER BY c.urutan"
    );
    res.render('belajar/index', { moduls: rows.map(k => Object.assign(k, warna(k.kode))) });
  } catch (e) { next(e); }
});

router.get('/:kode', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories WHERE kode = $1 AND tipe IN ($2, $3)', [req.params.kode, 'akuntansi', 'pajak']);
    if (rows.length === 0) return res.status(404).render('error', { pesan: 'Modul tidak ditemukan.' });
    const materi = await pool.query('SELECT * FROM materi WHERE category_id = $1 ORDER BY urutan', [rows[0].id]);
    const soal = await pool.query('SELECT COUNT(*)::int AS jml FROM questions WHERE category_id = $1', [rows[0].id]);
    res.render('belajar/materi', { modul: rows[0], materi: materi.rows, jmlSoal: soal.rows[0].jml });
  } catch (e) { next(e); }
});

router.post('/:kode/mulai', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories WHERE kode = $1 AND tipe IN ($2, $3)', [req.params.kode, 'akuntansi', 'pajak']);
    if (rows.length === 0) return res.status(404).render('error', { pesan: 'Modul tidak ditemukan.' });
    const soal = await pool.query('SELECT id, nomor_urutan FROM questions WHERE category_id = $1 ORDER BY nomor_urutan', [rows[0].id]);
    if (soal.rows.length === 0) return res.render('error', { pesan: 'Belum ada soal pada modul ini.' });
    mulaiKuis(req, {
      tipe: 'belajar',
      kode: rows[0].kode,
      kategori: rows[0].nama,
      level: 'semua',
      ids: soal.rows.map(r => r.id)
    });
    res.redirect('/belajar/' + rows[0].kode + '/soal/1');
  } catch (e) { next(e); }
});

router.get('/:kode/soal/:nomor', async (req, res, next) => {
  try {
    const kuis = ambilKuis(req);
    if (!kuis || kuis.tipe !== 'belajar' || kuis.kode !== req.params.kode) {
      return res.redirect('/belajar/' + req.params.kode);
    }
    const nomor = parseInt(req.params.nomor, 10);
    if (nomor < 1 || nomor > kuis.ids.length) return res.redirect('/belajar/' + req.params.kode + '/hasil');
    const { rows } = await pool.query('SELECT * FROM questions WHERE id = $1', [kuis.ids[nomor - 1]]);
    res.render('kuis/soal', {
      kuis,
      nomor,
      total: kuis.ids.length,
      soal: rows[0],
      alur: '/belajar/' + req.params.kode + '/soal'
    });
  } catch (e) { next(e); }
});

router.post('/:kode/soal/:nomor', async (req, res, next) => {
  try {
    const kuis = ambilKuis(req);
    if (!kuis || kuis.tipe !== 'belajar' || kuis.kode !== req.params.kode) {
      return res.redirect('/belajar/' + req.params.kode);
    }
    const nomor = parseInt(req.params.nomor, 10);
    const id = kuis.ids[nomor - 1];
    simpanJawaban(req, id, parseInt(req.body.jawaban, 10));
    if (nomor >= kuis.ids.length) return res.redirect('/belajar/' + req.params.kode + '/hasil');
    res.redirect('/belajar/' + req.params.kode + '/soal/' + (nomor + 1));
  } catch (e) { next(e); }
});

router.get('/:kode/hasil', async (req, res, next) => {
  try {
    const kuis = ambilKuis(req);
    if (!kuis || kuis.tipe !== 'belajar' || kuis.kode !== req.params.kode) {
      return res.redirect('/belajar/' + req.params.kode);
    }
    const hasil = await selesaikanKuis(req, pool);
    res.render('kuis/hasil', { hasil, alur: '/belajar' });
  } catch (e) { next(e); }
});

module.exports = router;