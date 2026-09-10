// Seed database Neon memakai ulang db/seed/*.js dan db/schema.sql yang sudah ada.
// Jalankan: npm run db:setup   (butuh DATABASE_URL di .env / environment)
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL belum diisi. Lihat .env.example');
  process.exit(1);
}
const sql = neon(process.env.DATABASE_URL);

async function importSeed(seed) {
  if (seed.categories) {
    for (const c of seed.categories) {
      await sql`INSERT INTO categories (tipe, kode, nama, deskripsi, urutan)
        VALUES (${c.tipe}, ${c.kode}, ${c.nama}, ${c.deskripsi}, ${c.urutan})
        ON CONFLICT (kode) DO NOTHING`;
    }
  }
  if (seed.questions) {
    for (const s of seed.questions) {
      const cat = await sql`SELECT id FROM categories WHERE kode = ${s.kode}`;
      if (cat.length === 0) throw new Error('Kategori tidak ditemukan: ' + s.kode);
      await sql`INSERT INTO questions (category_id, level, nomor_urutan, pertanyaan, diagram, opsi, kunci, pembahasan)
        VALUES (${cat[0].id}, ${s.level}, ${s.nomor_urutan || 0}, ${s.pertanyaan}, ${s.diagram || null}, ${s.opsi}, ${s.kunci}, ${s.pembahasan || null})`;
    }
  }
  if (seed.materi) {
    for (const m of seed.materi) {
      const cat = await sql`SELECT id FROM categories WHERE kode = ${m.kode}`;
      if (cat.length === 0) throw new Error('Kategori tidak ditemukan: ' + m.kode);
      await sql`INSERT INTO materi (category_id, urutan, judul, isi)
        VALUES (${cat[0].id}, ${m.urutan}, ${m.judul}, ${m.isi})`;
    }
  }
}

async function main() {
  const schema = fs.readFileSync(path.join(root, 'db', 'schema.sql'), 'utf8');
  for (const stmt of schema.split(';').map((s) => s.trim()).filter(Boolean)) {
    await sql(stmt);
  }
  console.log('Schema siap.');

  await sql`TRUNCATE questions, materi, categories, hasil_test RESTART IDENTITY CASCADE`;

  for (const r of [
    { kode: 'admin', nama: 'Admin', menus: ['psikotest', 'belajar', 'latihan', 'admin'] },
    { kode: 'manager', nama: 'Manager Perusahaan', menus: ['psikotest', 'belajar', 'latihan'] },
    { kode: 'user', nama: 'Peserta', menus: ['psikotest', 'belajar', 'latihan'] },
    { kode: 'psikotest', nama: 'Peserta Psikotest', menus: ['psikotest', 'latihan'] },
    { kode: 'akuntansi', nama: 'Peserta Akuntansi/Pajak', menus: ['belajar', 'latihan'] },
    { kode: 'tamu', nama: 'Peserta Tamu', menus: ['psikotest', 'belajar', 'latihan'] }
  ]) {
    await sql`INSERT INTO roles (kode, nama, menus)
      VALUES (${r.kode}, ${r.nama}, ${r.menus})
      ON CONFLICT (kode) DO NOTHING`;
  }
  console.log('Seed "roles" selesai.');

  for (const name of ['psikotest', 'akuntansi', 'brevet-a', 'brevet-b', 'pbb-bphtb']) {
    const seed = require(path.join(root, 'db', 'seed', name + '.js'));
    await importSeed(seed);
    console.log(`Seed "${name}" selesai.`);
  }

  for (const u of [
    { username: 'admin', password: 'admin123', nama: 'Master Admin', role: 'admin' },
    { username: 'manager', password: 'manager123', nama: 'Manager Demo', role: 'manager' },
    { username: 'user', password: 'user123', nama: 'User Demo', role: 'user' }
  ]) {
    const hash = bcrypt.hashSync(u.password, 10);
    await sql`INSERT INTO users (username, password, nama, role)
      VALUES (${u.username}, ${hash}, ${u.nama}, ${u.role})
      ON CONFLICT (username) DO NOTHING`;
  }
  console.log('User default siap (admin/admin123, manager/manager123, user/user123).');

  const cat = await sql`SELECT tipe, COUNT(*) FROM categories GROUP BY tipe`;
  const q = await sql`SELECT COUNT(*) AS n FROM questions`;
  const m = await sql`SELECT COUNT(*) AS n FROM materi`;
  console.log('Ringkasan kategori:', cat);
  console.log('Total soal:', q[0].n);
  console.log('Total materi:', m[0].n);
  console.log('Setup selesai.');
}

main().catch((err) => {
  console.error('Setup gagal:', err.message);
  process.exit(1);
});
