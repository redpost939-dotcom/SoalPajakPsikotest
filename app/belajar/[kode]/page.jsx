import Link from 'next/link';
import Header from '@/components/Header';
import { getSession, canMenu } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function BelajarModul({ params }) {
  const user = await getSession();
  if (!user) redirect('/login?lanjut=/belajar');
  if (!(await canMenu(user, 'belajar'))) redirect('/');
  const { kode } = await params;
  const sql = db();
  const cats = await sql`SELECT * FROM categories WHERE kode = ${kode} AND tipe IN ('akuntansi','pajak')`;
  if (cats.length === 0) notFound();
  const modul = cats[0];
  const materi = await sql`SELECT * FROM materi WHERE category_id = ${modul.id} ORDER BY urutan`;
  const [{ jml }] = await sql`SELECT COUNT(*)::int AS jml FROM questions WHERE category_id = ${modul.id}`;
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/belajar">Akuntansi &amp; Pajak</Link> &raquo; {modul.nama}</div>
        <section className="section">
          <div className="section-head"><h1>{modul.nama}</h1></div>
          <p>{modul.deskripsi}</p>
          <div className="material-list">
            {materi.map((m, i) => (
              <article key={m.id} className="material">
                <h2>{i + 1}. {m.judul}</h2>
                <div className="material-body" dangerouslySetInnerHTML={{ __html: m.isi }} />
              </article>
            ))}
          </div>
          <div className="quiz-start">
            <h2>Latihan Soal Modul Ini</h2>
            <p className="muted">{jml} soal pilihan ganda. Setelah selesai Anda bisa melihat kunci jawaban dan pembahasan.</p>
            {jml > 0
              ? <Link className="btn btn-primary" href={`/belajar/${kode}/kuis`}>Mulai Kuis &rarr;</Link>
              : <button className="btn btn-primary" disabled>Mulai Kuis &rarr;</button>}
          </div>
        </section>
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
