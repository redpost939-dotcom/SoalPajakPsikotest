import Link from 'next/link';
import Header from '@/components/Header';
import { getSession, canMenu } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

const LV_LABEL = { mudah: 'Mudah', sedang: 'Sedang', sulit: 'Sulit' };

export default async function PsikotestKategori({ params }) {
  const user = await getSession();
  if (!user) redirect('/login?lanjut=/psikotest');
  if (!(await canMenu(user, 'psikotest'))) redirect('/');
  const { kode } = await params;
  const sql = db();
  const cats = await sql`SELECT * FROM categories WHERE kode = ${kode} AND tipe = 'psikotest'`;
  if (cats.length === 0) notFound();
  const kategori = cats[0];
  const levels = await sql`SELECT level, COUNT(*)::int AS jml FROM questions
    WHERE category_id = ${kategori.id} GROUP BY level`;
  const order = { mudah: 1, sedang: 2, sulit: 3 };
  levels.sort((a, b) => (order[a.level] || 9) - (order[b.level] || 9));
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/psikotest">Psikotest</Link> &raquo; {kategori.nama}</div>
        <section className="section">
          <div className="section-head"><h1>{kategori.nama}</h1></div>
          <p>{kategori.deskripsi}</p>
          <h3 className="mt">Pilih Level dan Mulai</h3>
          <div className="grid small">
            <Link className="card" href={`/psikotest/${kode}/kuis?level=semua`}>
              <h3>Semua (Bertahap)</h3>
              <p className="muted">Mudah &rarr; Sedang &rarr; Sulit dalam satu sesi.</p>
              <span className="btn">Mulai &rarr;</span>
            </Link>
            {levels.map((l) => (
              <Link key={l.level} className="card" href={`/psikotest/${kode}/kuis?level=${l.level}`}>
                <h3>{LV_LABEL[l.level] || l.level}</h3>
                <p className="muted">{l.jml} soal</p>
                <span className="btn">Mulai &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
