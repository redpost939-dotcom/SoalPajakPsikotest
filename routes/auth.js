const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { pool } = require('../db/pool');

router.get('/login', (req, res) => {
  res.render('auth/login', { lanjut: req.query.lanjut || '/', pesan: null });
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { rows } = await pool.query('SELECT * FROM users WHERE LOWER(username) = LOWER($1)', [username]);
    if (rows.length === 0 || !bcrypt.compareSync(password, rows[0].password)) {
      return res.status(401).render('auth/login', { lanjut: req.query.lanjut || '/', pesan: 'Username atau password salah.' });
    }
    const u = rows[0];
    req.session.user = { id: u.id, username: u.username, nama: u.nama, role: u.role };
    const lanjut = req.query.lanjut && req.query.lanjut.startsWith('/') ? req.query.lanjut : '/';
    res.redirect(lanjut);
  } catch (e) { next(e); }
});

router.get('/register', (req, res) => {
  res.render('auth/register', { pesan: null });
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, nama, password, password2 } = req.body;
    if (!username || !nama || !password) {
      return res.status(400).render('auth/register', { pesan: 'Semua kolom wajib diisi.' });
    }
    if (password.length < 6) {
      return res.status(400).render('auth/register', { pesan: 'Password minimal 6 karakter.' });
    }
    if (password !== password2) {
      return res.status(400).render('auth/register', { pesan: 'Konfirmasi password tidak cocok.' });
    }
    const cek = await pool.query('SELECT id FROM users WHERE LOWER(username) = LOWER($1)', [username]);
    if (cek.rowCount > 0) {
      return res.status(400).render('auth/register', { pesan: 'Username sudah terpakai.' });
    }
    const hash = bcrypt.hashSync(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (username, password, nama, role) VALUES ($1,$2,$3,$4) RETURNING id, username, nama, role',
      [username, hash, nama, 'user']
    );
    const u = rows[0];
    req.session.user = { id: u.id, username: u.username, nama: u.nama, role: u.role };
    res.redirect('/');
  } catch (e) { next(e); }
});

router.get('/logout', (req, res) => {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;