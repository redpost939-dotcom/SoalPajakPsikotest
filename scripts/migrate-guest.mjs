// Migrasi mode tamu: kolom identitas di hasil_test + role tamu.
// Lokal : $env:DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bank_soal"
// Neon  : pakai URL direct Neon. Aman (IF NOT EXISTS / ON CONFLICT).
import pg from 'pg';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL belum diisi.');
  process.exit(1);
}

const client = new pg.Client({ connectionString: url });
await client.connect();
await client.query('ALTER TABLE hasil_test ADD COLUMN IF NOT EXISTS nama VARCHAR(100)');
await client.query('ALTER TABLE hasil_test ADD COLUMN IF NOT EXISTS umur INT');
await client.query('ALTER TABLE hasil_test ADD COLUMN IF NOT EXISTS alamat TEXT');
await client.query(
  `INSERT INTO roles (kode, nama, menus) VALUES ('tamu', 'Peserta Tamu', $1)
   ON CONFLICT (kode) DO UPDATE SET nama = EXCLUDED.nama, menus = EXCLUDED.menus`,
  [['psikotest', 'belajar', 'latihan']]
);
const { rows } = await client.query('SELECT kode, nama, menus FROM roles WHERE kode = $1', ['tamu']);
console.log('Migrasi tamu OK:', rows[0]);
await client.end();
