import Link from 'next/link';
import Header from '@/components/Header';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { warna } from '@/lib/visuals';

export const dynamic = 'force-dynamic';

export default async function PsikotestIndex() {
  const user = await getSession();
  if (!user) redirect('/login?lanjut=/psikotest');
  const sql = db();
  const rows = await sql`SELECT c.*, (SELECT COUNT(*)::int FROM questions q WHERE q.category_id = c.id) AS jml_soal
    FROM categories c WHERE c.tipe = 'psikotest' ORDER BY c.urutan`;
  const kategoris = rows.map((k) => ({ ...k, ...warna(k.kode) }));
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; Psikotest</div>
        <section className="section">
          <div className="section-head"><h1>Pilih Kategori Psikotest</h1></div>
          <p className="muted">Kerjakan sesuai urutan tes asli. Pada tiap kategori, Anda bisa memilih level: <b>Mudah</b>, <b>Sedang</b>, <b>Sulit</b>, atau <b>Semua (bertahap)</b>.</p>
          <div className="dash-grid">
            {kategoris.map((k) => (
              <Link key={k.kode} className="tile" href={`/psikotest/${k.kode}`} style={{ '--c1': k.c1, '--c2': k.c2 }}>
                <span className="tile-ico">{k.i}</span>
                <span className="tile-body">
                  <h3>{k.nama}</h3>
                  <p>{k.deskripsi}</p>
                  <span className="badge tile-badge">{k.jml_soal} soal</span>
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
