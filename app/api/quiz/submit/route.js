import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession, can } from '@/lib/auth';
import { penilaianKategori } from '@/lib/penilaian';

export async function POST(req) {
  const user = await getSession();
  if (!user) return NextResponse.json({ pesan: 'Silakan masuk dulu.' }, { status: 401 });
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ pesan: 'Data tidak valid.' }, { status: 400 });
  }
  const { tipe, kode, level = 'semua', ids = [], jawaban = {} } = body || {};
  const menu = tipe === 'psikotest' ? 'psikotest' : 'belajar';
  if ((tipe !== 'psikotest' && tipe !== 'belajar') || !kode || !Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ pesan: 'Data kuis tidak valid.' }, { status: 400 });
  }
  if (!can(user, menu)) return NextResponse.json({ pesan: 'Akses ditolak.' }, { status: 403 });

  const sql = db();
  const cat = tipe === 'psikotest'
    ? (await sql`SELECT * FROM categories WHERE kode = ${kode} AND tipe = 'psikotest'`)[0]
    : (await sql`SELECT * FROM categories WHERE kode = ${kode} AND tipe IN ('akuntansi','pajak')`)[0];
  if (!cat) return NextResponse.json({ pesan: 'Kategori tidak ditemukan.' }, { status: 404 });

  const qids = ids.map(Number).filter((n) => Number.isInteger(n) && n > 0);
  const rows = await sql`SELECT * FROM questions WHERE id = ANY(${qids}) AND category_id = ${cat.id}`;
  const map = {};
  rows.forEach((r) => { map[r.id] = r; });

  let benar = 0;
  const review = qids.map((id, idx) => {
    const q = map[id];
    if (!q) return { nomor: idx + 1, soal: null, jawabanUser: 0, isBenar: false };
    const jawabanUser = Number(jawaban[String(id)] ?? jawaban[id] ?? 0);
    const isBenar = jawabanUser === q.kunci;
    if (isBenar) benar++;
    return { nomor: idx + 1, soal: q, jawabanUser, isBenar };
  });

  const total = qids.length;
  const skor = Math.round((benar / total) * 100 * 100) / 100;
  const detail = review.map((r) => ({
    nomor: r.nomor,
    jawaban: r.jawabanUser,
    kunci: r.soal ? r.soal.kunci : 0,
    benar: r.isBenar
  }));
  await sql`INSERT INTO hasil_test (user_id, tipe, kategori, level, total_soal, benar, skor, detail)
    VALUES (${user.id}, ${tipe}, ${cat.nama}, ${String(level)}, ${total}, ${benar}, ${skor}, ${JSON.stringify(detail)}::jsonb)`;

  const hasil = { tipe, kode, kategori: cat.nama, level: String(level), total, benar, skor, review };
  if (tipe === 'psikotest') {
    hasil.penilaian = penilaianKategori(kode, skor, benar, total);
  }
  return NextResponse.json({ hasil });
}
