import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession, canMenu } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const LV = { mudah: 1, sedang: 2, sulit: 3 };

export async function GET(req, { params }) {
  const user = await getSession();
  const { tipe, kode } = await params;
  const menu = tipe === 'psikotest' ? 'psikotest' : 'belajar';
  if (!user || !(await canMenu(user, menu))) {
    return NextResponse.json({ pesan: 'Akses ditolak. Silakan masuk.' }, { status: 403 });
  }
  const { searchParams } = new URL(req.url);
  const level = searchParams.get('level') || 'semua';
  const sql = db();

  let cat;
  if (tipe === 'psikotest') {
    const r = await sql`SELECT * FROM categories WHERE kode = ${kode} AND tipe = 'psikotest'`;
    cat = r[0];
  } else if (tipe === 'belajar') {
    const r = await sql`SELECT * FROM categories WHERE kode = ${kode} AND tipe IN ('akuntansi','pajak')`;
    cat = r[0];
  }
  if (!cat) return NextResponse.json({ pesan: 'Kategori tidak ditemukan.' }, { status: 404 });

  let rows;
  if (tipe === 'psikotest' && level !== 'semua') {
    rows = await sql`SELECT id, level, nomor_urutan, pertanyaan, diagram, opsi
      FROM questions WHERE category_id = ${cat.id} AND level = ${level}`;
  } else {
    rows = await sql`SELECT id, level, nomor_urutan, pertanyaan, diagram, opsi
      FROM questions WHERE category_id = ${cat.id}`;
  }
  if (!rows || rows.length === 0) {
    return NextResponse.json({ pesan: 'Belum ada soal pada pilihan ini.' }, { status: 404 });
  }
  rows.sort((a, b) => (LV[a.level] || 9) - (LV[b.level] || 9) || (a.nomor_urutan - b.nomor_urutan));
  const soal = rows.map(({ kunci, pembahasan, level, nomor_urutan, ...rest }) => rest);
  return NextResponse.json({ kategori: cat.nama, kode: cat.kode, tipe, level, total: soal.length, soal });
}
