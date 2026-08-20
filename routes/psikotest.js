const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');
const { mulaiKuis, ambilKuis, simpanJawaban, selesaikanKuis } = require('./kuis-helper');
const { requireMenu } = require('../middleware/auth');
const { warna } = require('../lib/visuals');

router.use(requireMenu('psikotest'));

const LEVEL_ORDER = "CASE WHEN level='mudah' THEN 1 WHEN level='sedang' THEN 2 ELSE 3 END";

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT c.*, COUNT(q.id)::int AS jml_soal FROM categories c LEFT JOIN questions q ON q.category_id = c.id WHERE c.tipe = 'psikotest' GROUP BY c.id ORDER BY c.urutan"
    );
    res.render('psikotest/index', { kategoris: rows.map(k => Object.assign(k, warna(k.kode))) });
  } catch (e) { next(e); }
});

router.get('/:kode', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories WHERE kode = $1 AND tipe = $2', [req.params.kode, 'psikotest']);
    if (rows.length === 0) return res.status(404).render('error', { pesan: 'Kategori psikotest tidak ditemukan.' });
    const level = await pool.query(
      'SELECT level, COUNT(*)::int AS jml FROM questions WHERE category_id = $1 GROUP BY level ORDER BY ' + LEVEL_ORDER,
      [rows[0].id]
    );
    res.render('psikotest/kategori', { kategori: rows[0], level: level.rows });
  } catch (e) { next(e); }
});

router.post('/:kode/mulai', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories WHERE kode = $1 AND tipe = $2', [req.params.kode, 'psikotest']);
    if (rows.length === 0) return res.status(404).render('error', { pesan: 'Kategori psikotest tidak ditemukan.' });
    const level = req.body.level || 'semua';
    const params = [rows[0].id];
    let where = 'category_id = $1';
    if (level !== 'semua') { where += ' AND level = $2'; params.push(level); }
    const soal = await pool.query(
      'SELECT id, level, nomor_urutan FROM questions WHERE ' + where + ' ORDER BY ' + LEVEL_ORDER + ', nomor_urutan',
      params
    );
    if (soal.rows.length === 0) {
      return res.render('error', { pesan: 'Tidak ada soal untuk pilihan level ini.' });
    }
    mulaiKuis(req, {
      tipe: 'psikotest',
      kode: rows[0].kode,
      kategori: rows[0].nama,
      level,
      ids: soal.rows.map(r => r.id)
    });
    res.redirect('/psikotest/' + rows[0].kode + '/soal/1');
  } catch (e) { next(e); }
});

router.get('/:kode/soal/:nomor', async (req, res, next) => {
  try {
    const kuis = ambilKuis(req);
    if (!kuis || kuis.tipe !== 'psikotest' || kuis.kode !== req.params.kode) {
      return res.redirect('/psikotest/' + req.params.kode);
    }
    const nomor = parseInt(req.params.nomor, 10);
    if (nomor < 1 || nomor > kuis.ids.length) return res.redirect('/psikotest/' + req.params.kode + '/hasil');
    const { rows } = await pool.query('SELECT * FROM questions WHERE id = $1', [kuis.ids[nomor - 1]]);
    res.render('kuis/soal', {
      kuis,
      nomor,
      total: kuis.ids.length,
      soal: rows[0],
      alur: '/psikotest/' + req.params.kode + '/soal'
    });
  } catch (e) { next(e); }
});

router.post('/:kode/soal/:nomor', async (req, res, next) => {
  try {
    const kuis = ambilKuis(req);
    if (!kuis || kuis.tipe !== 'psikotest' || kuis.kode !== req.params.kode) {
      return res.redirect('/psikotest/' + req.params.kode);
    }
    const nomor = parseInt(req.params.nomor, 10);
    const id = kuis.ids[nomor - 1];
    simpanJawaban(req, id, parseInt(req.body.jawaban, 10));
    if (nomor >= kuis.ids.length) return res.redirect('/psikotest/' + req.params.kode + '/hasil');
    res.redirect('/psikotest/' + req.params.kode + '/soal/' + (nomor + 1));
  } catch (e) { next(e); }
});

router.get('/:kode/hasil', async (req, res, next) => {
  try {
    const kuis = ambilKuis(req);
    if (!kuis || kuis.tipe !== 'psikotest' || kuis.kode !== req.params.kode) {
      return res.redirect('/psikotest/' + req.params.kode);
    }
    const hasil = await selesaikanKuis(req, pool);
    res.render('kuis/hasil', { hasil, alur: '/psikotest' });
  } catch (e) { next(e); }
});

module.exports = router;