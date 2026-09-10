import { getSession, canMenu } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req) {
  const user = await getSession();
  if (!user || !(await canMenu(user, 'manager'))) {
    return new Response('Akses ditolak.', { status: 403 });
  }
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').trim();
  const tipe = searchParams.get('tipe') || '';
  const sql = db();

  const cari = '%' + q + '%';
  let daftar;
  if (q && tipe) {
    daftar = await sql`SELECT h.*, u.username, u.nama AS nama_user FROM hasil_test h
      LEFT JOIN users u ON u.id = h.user_id
      WHERE (u.username ILIKE ${cari} OR u.nama ILIKE ${cari} OR h.nama ILIKE ${cari} OR h.alamat ILIKE ${cari}) AND h.tipe = ${tipe}
      ORDER BY h.id DESC LIMIT 1000`;
  } else if (q) {
    daftar = await sql`SELECT h.*, u.username, u.nama AS nama_user FROM hasil_test h
      LEFT JOIN users u ON u.id = h.user_id
      WHERE (u.username ILIKE ${cari} OR u.nama ILIKE ${cari} OR h.nama ILIKE ${cari} OR h.alamat ILIKE ${cari})
      ORDER BY h.id DESC LIMIT 1000`;
  } else if (tipe) {
    daftar = await sql`SELECT h.*, u.username, u.nama AS nama_user FROM hasil_test h
      LEFT JOIN users u ON u.id = h.user_id
      WHERE h.tipe = ${tipe} ORDER BY h.id DESC LIMIT 1000`;
  } else {
    daftar = await sql`SELECT h.*, u.username, u.nama AS nama_user FROM hasil_test h
      LEFT JOIN users u ON u.id = h.user_id ORDER BY h.id DESC LIMIT 1000`;
  }

  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const baris = [
    'id,kandidat,umur,alamat,username,tipe,kategori,level,benar,total,skor,tanggal',
    ...daftar.map((h) => [
      h.id, esc(h.nama_user || h.nama || h.username), h.umur ?? '', esc(h.alamat), esc(h.username),
      h.tipe, esc(h.kategori), h.level, h.benar, h.total_soal, h.skor,
      h.dibuat ? new Date(h.dibuat).toISOString() : ''
    ].join(','))
  ];
  return new Response('\uFEFF' + baris.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="skor-kandidat.csv"'
    }
  });
}
