import Link from 'next/link';
import Header from '@/components/Header';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { warna } from '@/lib/visuals';

export const dynamic = 'force-dynamic';

export default async function BelajarIndex() {
  const user = await getSession();
  if (!user) redirect('/login?lanjut=/belajar');
  const sql = db();
  const rows = await sql`SELECT c.*,
      (SELECT COUNT(*)::int FROM questions q WHERE q.category_id = c.id) AS jml_soal,
      (SELECT COUNT(*)::int FROM materi m WHERE m.category_id = c.id) AS jml_materi
    FROM categories c WHERE c.tipe IN ('akuntansi','pajak') ORDER BY c.urutan`;
  const moduls = rows.map((k) => ({ ...k, ...warna(k.kode) }));
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; Akuntansi &amp; Pajak</div>
        <section className="section">
          <div className="section-head"><h1>Modul Akuntansi &amp; Pajak</h1></div>
          <p className="muted">Setiap modul berisi <b>materi</b> lalu <b>soal latihan</b> per bab. Urut dari dasar sampai lanjutan.</p>
          <div className="dash-grid">
            {moduls.map((m) => (
              <Link key={m.kode} className="tile" href={`/belajar/${m.kode}`} style={{ '--c1': m.c1, '--c2': m.c2 }}>
                <span className="tile-ico">{m.i}</span>
                <span className="tile-body">
                  <h3>{m.nama}</h3>
                  <p>{m.deskripsi}</p>
                  <span className="badge tile-badge">{m.jml_materi} materi &middot; {m.jml_soal} soal</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
