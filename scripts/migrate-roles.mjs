// Migrasi aman untuk Postgres LOKAL (tanpa hapus data): buat tabel roles + isi role bawaan.
// Jalankan: $env:DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bank_soal"; node scripts/migrate-roles.mjs
import pg from 'pg';

export const DEFAULT_ROLES = [
  { kode: 'admin', nama: 'Admin', menus: ['psikotest', 'belajar', 'latihan', 'admin'] },
  { kode: 'manager', nama: 'Manager Perusahaan', menus: ['psikotest', 'belajar', 'latihan'] },
  { kode: 'user', nama: 'Peserta', menus: ['psikotest', 'belajar', 'latihan'] },
  { kode: 'psikotest', nama: 'Peserta Psikotest', menus: ['psikotest', 'latihan'] },
  { kode: 'akuntansi', nama: 'Peserta Akuntansi/Pajak', menus: ['belajar', 'latihan'] },
  { kode: 'tamu', nama: 'Peserta Tamu', menus: ['psikotest', 'belajar', 'latihan'] }
];

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL belum diisi.');
  process.exit(1);
}

const client = new pg.Client({ connectionString: url });
await client.connect();
await client.query(`CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  kode VARCHAR(30) UNIQUE NOT NULL,
  nama VARCHAR(100) NOT NULL,
  menus TEXT[] NOT NULL DEFAULT '{}'
)`);
for (const r of DEFAULT_ROLES) {
  await client.query(
    'INSERT INTO roles (kode, nama, menus) VALUES ($1,$2,$3) ON CONFLICT (kode) DO NOTHING',
    [r.kode, r.nama, r.menus]
  );
}
const { rows } = await client.query('SELECT kode, nama, menus FROM roles ORDER BY id');
console.log('Roles siap:', rows);
await client.end();
