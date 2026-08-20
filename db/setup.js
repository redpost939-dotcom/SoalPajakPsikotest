require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const DB_NAME = process.env.PGDATABASE || 'bank_soal';
const base = {
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres'
};

const SSL = process.env.PGSSL === 'false' ? false : { rejectUnauthorized: false };

async function main() {
  // 1) Buat database kalau belum ada (hanya saat tidak memakai DATABASE_URL)
  if (!process.env.DATABASE_URL) {
    const admin = new Client({ ...base, database: 'postgres' });
    await admin.connect();
    const exists = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [DB_NAME]);
    if (exists.rowCount === 0) {
      await admin.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`Database "${DB_NAME}" dibuat.`);
    } else {
      console.log(`Database "${DB_NAME}" sudah ada.`);
    }
    await admin.end();
  }

  // 2) Jalankan schema
  const db = process.env.DATABASE_URL
    ? new Client({ connectionString: process.env.DATABASE_URL, ssl: SSL })
    : new Client({ ...base, database: DB_NAME });
  await db.connect();
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await db.query(schema);
  console.log('Schema siap.');

  // 3) Kosongkan tabel agar impor bersih (urutan penting karena foreign key)
  await db.query('TRUNCATE questions, materi, categories, hasil_test RESTART IDENTITY CASCADE');

  // 4) Impor seed
  const seedFiles = ['psikotest', 'akuntansi', 'brevet-a', 'brevet-b', 'pbb-bphtb'];
  for (const name of seedFiles) {
    const seed = require(path.join(__dirname, 'seed', name));
    await importSeed(db, seed);
    console.log(`Seed "${name}" selesai.`);
  }

  // 5) Seed user default (admin + user demo)
  const bcrypt = require('bcryptjs');
  const seedUsers = [
    { username: 'admin', password: 'admin123', nama: 'Master Admin', role: 'admin' },
    { username: 'user', password: 'user123', nama: 'User Demo', role: 'user' }
  ];
  for (const u of seedUsers) {
    const hash = bcrypt.hashSync(u.password, 10);
    await db.query(
      'INSERT INTO users (username, password, nama, role) VALUES ($1,$2,$3,$4) ON CONFLICT (username) DO NOTHING',
      [u.username, hash, u.nama, u.role]
    );
  }
  console.log('User default siap (admin/admin123 dan user/user123).');

  // 5) Cek ringkasan
  const cat = await db.query('SELECT tipe, COUNT(*) FROM categories GROUP BY tipe');
  const q = await db.query('SELECT COUNT(*) AS n FROM questions');
  const m = await db.query('SELECT COUNT(*) AS n FROM materi');
  console.log('Ringkasan kategori:', cat.rows);
  console.log('Total soal:', q.rows[0].n);
  console.log('Total materi:', m.rows[0].n);

  await db.end();
  console.log('Setup selesai. Jalankan server dengan: npm start');
  process.exit(0);
}

async function importSeed(db, seed) {
  if (seed.categories) {
    for (const c of seed.categories) {
      await db.query(
        'INSERT INTO categories (tipe, kode, nama, deskripsi, urutan) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (kode) DO NOTHING',
        [c.tipe, c.kode, c.nama, c.deskripsi, c.urutan]
      );
    }
  }
  if (seed.questions) {
    for (const s of seed.questions) {
      const cat = await db.query('SELECT id FROM categories WHERE kode = $1', [s.kode]);
      if (cat.rowCount === 0) throw new Error('Kategori tidak ditemukan: ' + s.kode);
      await db.query(
        `INSERT INTO questions (category_id, level, nomor_urutan, pertanyaan, diagram, opsi, kunci, pembahasan)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [cat.rows[0].id, s.level, s.nomor_urutan || 0, s.pertanyaan, s.diagram || null, s.opsi, s.kunci, s.pembahasan || null]
      );
    }
  }
  if (seed.materi) {
    for (const m of seed.materi) {
      const cat = await db.query('SELECT id FROM categories WHERE kode = $1', [m.kode]);
      if (cat.rowCount === 0) throw new Error('Kategori tidak ditemukan: ' + m.kode);
      await db.query(
        'INSERT INTO materi (category_id, urutan, judul, isi) VALUES ($1,$2,$3,$4)',
        [cat.rows[0].id, m.urutan, m.judul, m.isi]
      );
    }
  }
}

main().catch((err) => {
  console.error('Setup gagal:', err.message);
  process.exit(1);
});