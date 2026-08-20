const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { pool } = require('../db/pool');
const { requireAdmin } = require('../middleware/auth');

router.use(requireAdmin);

// ================= DASHBOARD =================
router.get('/', async (req, res, next) => {
  try {
    const [kategori, soal, materi, user, hasil, recent] = await Promise.all([
      pool.query('SELECT COUNT(*)::int AS n FROM categories'),
      pool.query('SELECT COUNT(*)::int AS n FROM questions'),
      pool.query('SELECT COUNT(*)::int AS n FROM materi'),
      pool.query('SELECT COUNT(*)::int AS n FROM users'),
      pool.query('SELECT COUNT(*)::int AS n FROM hasil_test'),
      pool.query('SELECT h.*, u.username FROM hasil_test h LEFT JOIN users u ON u.id = h.user_id ORDER BY h.id DESC LIMIT 10')
    ]);
    res.render('admin/dashboard', {
      stats: {
        kategori: kategori.rows[0].n, soal: soal.rows[0].n, materi: materi.rows[0].n,
        user: user.rows[0].n, hasil: hasil.rows[0].n
      },
      recent: recent.rows
    });
  } catch (e) { next(e); }
});

// ================= KATEGORI =================
router.get('/kategori', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT c.*, COUNT(DISTINCT q.id)::int AS jml_soal, COUNT(DISTINCT m.id)::int AS jml_materi
       FROM categories c
       LEFT JOIN questions q ON q.category_id = c.id
       LEFT JOIN materi m ON m.category_id = c.id
       GROUP BY c.id ORDER BY c.urutan`
    );
    res.render('admin/kategori', { daftar: rows });
  } catch (e) { next(e); }
});

router.get('/kategori/baru', (req, res) => res.render('admin/kategori-form', { kategori: null, pesan: null }));
router.get('/kategori/:id/edit', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).render('error', { pesan: 'Kategori tidak ditemukan.' });
    res.render('admin/kategori-form', { kategori: rows[0], pesan: null });
  } catch (e) { next(e); }
});

router.post('/kategori/simpan', async (req, res, next) => {
  try {
    const { id, tipe, kode, nama, deskripsi, urutan } = req.body;
    if (!tipe || !kode || !nama) return res.status(400).render('admin/kategori-form', { kategori: null, pesan: 'Tipe, kode, dan nama wajib diisi.' });
    if (id) {
      await pool.query('UPDATE categories SET tipe=$1, kode=$2, nama=$3, deskripsi=$4, urutan=$5 WHERE id=$6',
        [tipe, kode, nama, deskripsi || null, parseInt(urutan || 0), id]);
    } else {
      await pool.query('INSERT INTO categories (tipe, kode, nama, deskripsi, urutan) VALUES ($1,$2,$3,$4,$5)',
        [tipe, kode, nama, deskripsi || null, parseInt(urutan || 0)]);
    }
    res.redirect('/admin/kategori');
  } catch (e) { next(e); }
});

router.post('/kategori/:id/hapus', async (req, res, next) => {
  try {
    await pool.query('DELETE FROM categories WHERE id = $1', [req.params.id]);
    res.redirect('/admin/kategori');
  } catch (e) { next(e); }
});

// ================= SOAL =================
async function kategoriOptions() {
  const { rows } = await pool.query('SELECT id, kode, nama, tipe FROM categories ORDER BY urutan');
  return rows;
}

router.get('/soal', async (req, res, next) => {
  try {
    const kode = req.query.kategori || '';
    let sql = `SELECT q.id, q.pertanyaan, q.level, q.kunci, c.kode AS kategori, c.nama AS kategori_nama
               FROM questions q JOIN categories c ON c.id = q.category_id`;
    const params = [];
    if (kode) { sql += ' WHERE c.kode = $1'; params.push(kode); }
    sql += ' ORDER BY c.urutan, q.level, q.nomor_urutan';
    const [soal, kategoris] = await Promise.all([pool.query(sql, params), kategoriOptions()]);
    res.render('admin/soal', { daftar: soal.rows, kategoris: kategoris, filter: kode });
  } catch (e) { next(e); }
});

router.get('/soal/baru', async (req, res, next) => {
  try {
    res.render('admin/soal-form', { soal: null, kategoris: await kategoriOptions(), pesan: null });
  } catch (e) { next(e); }
});

router.get('/soal/:id/edit', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM questions WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).render('error', { pesan: 'Soal tidak ditemukan.' });
    res.render('admin/soal-form', { soal: rows[0], kategoris: await kategoriOptions(), pesan: null });
  } catch (e) { next(e); }
});

router.post('/soal/simpan', async (req, res, next) => {
  try {
    const { id, category_id, level, nomor_urutan, pertanyaan, diagram, opsi1, opsi2, opsi3, opsi4, opsi5, kunci, pembahasan } = req.body;
    if (!category_id || !pertanyaan || !opsi1 || !opsi2) {
      return res.status(400).render('admin/soal-form', { soal: null, kategoris: await kategoriOptions(), pesan: 'Kategori, pertanyaan, dan minimal 2 opsi wajib diisi.' });
    }
    const opsi = [opsi1, opsi2, opsi3, opsi4, opsi5].filter(o => o && String(o).trim() !== '');
    if (parseInt(kunci) < 1 || parseInt(kunci) > opsi.length) {
      return res.status(400).render('admin/soal-form', { soal: null, kategoris: await kategoriOptions(), pesan: 'Nomor kunci jawaban tidak valid.' });
    }
    const params = [category_id, level || 'mudah', parseInt(nomor_urutan || 0), pertanyaan, diagram || null, opsi, parseInt(kunci), pembahasan || null];
    if (id) {
      await pool.query('UPDATE questions SET category_id=$1, level=$2, nomor_urutan=$3, pertanyaan=$4, diagram=$5, opsi=$6, kunci=$7, pembahasan=$8 WHERE id=$9', [...params, id]);
    } else {
      await pool.query('INSERT INTO questions (category_id, level, nomor_urutan, pertanyaan, diagram, opsi, kunci, pembahasan) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', params);
    }
    res.redirect('/admin/soal');
  } catch (e) { next(e); }
});

router.post('/soal/:id/hapus', async (req, res, next) => {
  try {
    await pool.query('DELETE FROM questions WHERE id = $1', [req.params.id]);
    res.redirect('/admin/soal');
  } catch (e) { next(e); }
});

// ================= MATERI =================
router.get('/materi', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT m.id, m.judul, m.urutan, c.kode AS kategori, c.nama AS kategori_nama FROM materi m JOIN categories c ON c.id = m.category_id ORDER BY c.urutan, m.urutan'
    );
    res.render('admin/materi', { daftar: rows });
  } catch (e) { next(e); }
});

router.get('/materi/baru', async (req, res, next) => {
  try {
    res.render('admin/materi-form', { materi: null, kategoris: await kategoriOptions(), pesan: null });
  } catch (e) { next(e); }
});

router.get('/materi/:id/edit', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM materi WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).render('error', { pesan: 'Materi tidak ditemukan.' });
    res.render('admin/materi-form', { materi: rows[0], kategoris: await kategoriOptions(), pesan: null });
  } catch (e) { next(e); }
});

router.post('/materi/simpan', async (req, res, next) => {
  try {
    const { id, category_id, urutan, judul, isi } = req.body;
    if (!category_id || !judul || !isi) {
      return res.status(400).render('admin/materi-form', { materi: null, kategoris: await kategoriOptions(), pesan: 'Kategori, judul, dan isi wajib diisi.' });
    }
    if (id) {
      await pool.query('UPDATE materi SET category_id=$1, urutan=$2, judul=$3, isi=$4 WHERE id=$5',
        [category_id, parseInt(urutan || 0), judul, isi, id]);
    } else {
      await pool.query('INSERT INTO materi (category_id, urutan, judul, isi) VALUES ($1,$2,$3,$4)',
        [category_id, parseInt(urutan || 0), judul, isi]);
    }
    res.redirect('/admin/materi');
  } catch (e) { next(e); }
});

router.post('/materi/:id/hapus', async (req, res, next) => {
  try {
    await pool.query('DELETE FROM materi WHERE id = $1', [req.params.id]);
    res.redirect('/admin/materi');
  } catch (e) { next(e); }
});

// ================= USER =================
router.get('/user', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT u.*, COUNT(h.id)::int AS jml_tes FROM users u LEFT JOIN hasil_test h ON h.user_id = u.id GROUP BY u.id ORDER BY u.id'
    );
    res.render('admin/user', { daftar: rows });
  } catch (e) { next(e); }
});

router.post('/user/:id/role', async (req, res, next) => {
  try {
    const allowed = ['admin', 'user', 'psikotest', 'akuntansi'];
    const role = allowed.includes(req.body.role) ? req.body.role : 'user';
    await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, req.params.id]);
    res.redirect('/admin/user');
  } catch (e) { next(e); }
});

router.post('/user/:id/reset', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).render('error', { pesan: 'User tidak ditemukan.' });
    const pw = req.body.password || 'user123';
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [bcrypt.hashSync(pw, 10), req.params.id]);
    res.redirect('/admin/user');
  } catch (e) { next(e); }
});

router.post('/user/:id/hapus', async (req, res, next) => {
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    res.redirect('/admin/user');
  } catch (e) { next(e); }
});

// ================= HASIL =================
router.get('/hasil', async (req, res, next) => {
  try {
    const tipe = req.query.tipe || '';
    let sql = `SELECT h.*, u.username FROM hasil_test h LEFT JOIN users u ON u.id = h.user_id`;
    const params = [];
    if (tipe) { sql += ' WHERE h.tipe = $1'; params.push(tipe); }
    sql += ' ORDER BY h.id DESC LIMIT 200';
    const { rows } = await pool.query(sql, params);
    res.render('admin/hasil', { daftar: rows, filter: tipe });
  } catch (e) { next(e); }
});

module.exports = router;