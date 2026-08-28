require('dotenv').config();
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { pool } = require('./db/pool');
const { locals } = require('./middleware/auth');

const app = express();
const PORT = Number(process.env.PORT || 3005);

app.set('view engine', 'ejs');
app.set('trust proxy', 1);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  store: new pgSession({ pool, tableName: 'session', createTableIfMissing: true }),
  secret: process.env.SESSION_SECRET || 'rahasia-bank-soal-lokal',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
}));

app.use(locals);

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/psikotest', require('./routes/psikotest'));
app.use('/belajar', require('./routes/belajar'));
app.use('/admin', require('./routes/admin'));

// 404 + handler error
app.use((req, res) => res.status(404).render('error', { pesan: 'Halaman tidak ditemukan.' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { pesan: 'Terjadi kesalahan server: ' + err.message });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('Server berjalan di http://localhost:' + PORT);
  });
}
module.exports = app;