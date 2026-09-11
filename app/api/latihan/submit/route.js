import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession, canMenu } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  const user = await getSession();
  if (!user || !(await canMenu(user, 'latihan'))) {
    return NextResponse.json({ pesan: 'Silakan masuk dulu.' }, { status: 401 });
  }
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ pesan: 'Data tidak valid.' }, { status: 400 });
  }
  const { kategori = '', total = 0, benar = 0, detail = null } = body || {};
  const t = Number(total);
  const b = Number(benar);
  if (!kategori || !Number.isInteger(t) || t <= 0 || !Number.isInteger(b) || b < 0 || b > t) {
    return NextResponse.json({ pesan: 'Data latihan tidak valid.' }, { status: 400 });
  }
  const skor = Math.round((b / t) * 100 * 100) / 100;
  const sql = db();
  await sql`INSERT INTO hasil_test (user_id, tipe, kategori, level, total_soal, benar, skor, detail, nama, umur, alamat)
    VALUES (${user.id ?? null}, 'latihan', ${String(kategori).slice(0, 120)}, '-', ${t}, ${b}, ${skor}, ${detail ? JSON.stringify(detail) : null}::jsonb,
      ${user.tamu ? user.nama : null}, ${user.tamu ? user.umur : null}, ${user.tamu ? user.alamat : null})`;
  return NextResponse.json({ ok: true, skor });
}
