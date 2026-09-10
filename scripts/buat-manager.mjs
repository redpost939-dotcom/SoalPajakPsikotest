// Buat akun manager demo (idempotent). Target DB via DATABASE_URL.
// Lokal: $env:DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bank_soal"
// Neon : pakai URL direct Neon.
import pg from 'pg';
import bcrypt from 'bcryptjs';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL belum diisi.');
  process.exit(1);
}

let rows;
if (/localhost|127\.0\.0\.1/.test(url)) {
  const client = new pg.Client({ connectionString: url });
  await client.connect();
  const hash = bcrypt.hashSync('manager123', 10);
  const r = await client.query(
    `INSERT INTO users (username, password, nama, role) VALUES ('manager', $1, 'Manager Demo', 'manager')
     ON CONFLICT (username) DO UPDATE SET role = 'manager' RETURNING id, username, nama, role`,
    [hash]
  );
  rows = r.rows;
  await client.end();
} else {
  const { neon } = await import('@neondatabase/serverless');
  const sql = neon(url);
  const hash = bcrypt.hashSync('manager123', 10);
  rows = await sql`INSERT INTO users (username, password, nama, role) VALUES ('manager', ${hash}, 'Manager Demo', 'manager')
    ON CONFLICT (username) DO UPDATE SET role = 'manager' RETURNING id, username, nama, role`;
}
console.log('Manager demo siap (manager/manager123):', rows[0]);
