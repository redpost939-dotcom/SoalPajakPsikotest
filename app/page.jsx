import Link from 'next/link';
import Header from '@/components/Header';
import { getSession, can } from '@/lib/auth';
import { db } from '@/lib/db';
import { warna } from '@/lib/visuals';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const user = await getSession();
  let psikotest = [];
  let belajar = [];
  let totalSoal = 0;
  let totalMateri = 0;

  if (user) {
    const sql = db();
    const [psiko, modul, stat] = await Promise.all([
      sql`SELECT c.*, (SELECT COUNT(*)::int FROM questions q WHERE q.category_id = c.id) AS jml_soal
          FROM categories c WHERE c.tipe = 'psikotest' ORDER BY c.urutan`,
      sql`SELECT c.*,
            (SELECT COUNT(*)::int FROM questions q WHERE q.category_id = c.id) AS jml_soal,
            (SELECT COUNT(*)::int FROM materi m WHERE m.category_id = c.id) AS jml_materi
          FROM categories c WHERE c.tipe IN ('akuntansi','pajak') ORDER BY c.urutan`,
      sql`SELECT COUNT(*)::int AS total FROM questions`
    ]);
    if (can(user, 'psikotest')) psikotest = psiko.map((k) => ({ ...k, ...warna(k.kode) }));
    if (can(user, 'belajar')) belajar = modul.map((k) => ({ ...k, ...warna(k.kode) }));
    totalSoal = stat[0]?.total || 0;
    totalMateri = belajar.reduce((a, r) => a + Number(r.jml_materi || 0), 0);
  }
  const totalKategori = psikotest.length + belajar.length;

  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <section className="hero">
          <h1>Latihan Psikotest &amp; Belajar Pajak</h1>
          <p>Satu tempat untuk berlatih soal psikotest (gaya tes rekrutmen di Indonesia), mempelajari akuntansi dasar, pajak dasar, serta Brevet A dan B — lengkap dengan kunci jawaban dan pembahasan.</p>
          {totalSoal > 0 && (
            <div className="hero-stats">
              <div className="hero-stat"><b>{totalSoal}</b><span>Soal</span></div>
              <div className="hero-stat"><b>{totalMateri}</b><span>Materi</span></div>
              <div className="hero-stat"><b>{totalKategori}</b><span>Modul</span></div>
            </div>
          )}
        </section>

        {psikotest.length > 0 && (
          <section className="section">
            <div className="section-head">
              <h2>Menu Psikotest</h2>
              <Link className="btn btn-outline" href="/psikotest">Lihat semua &rarr;</Link>
            </div>
            <p className="muted">Urutan seperti tes asli: Verbal &rarr; Numerik &rarr; Logika &rarr; Spasial &rarr; Matematika &rarr; Kepribadian. Setiap kategori berlevel Mudah &rarr; Sedang &rarr; Sulit.</p>
            <div className="dash-grid">
              {psikotest.map((k) => (
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
        )}

        {belajar.length > 0 && (
          <section className="section">
            <div className="section-head">
              <h2>Menu Akuntansi &amp; Pajak</h2>
              <Link className="btn btn-outline" href="/belajar">Lihat semua &rarr;</Link>
            </div>
            <p className="muted">Materi lalu soal latihan per bab: Akuntansi Dasar, Pajak Dasar (Brevet A), Brevet B, dan PBB &amp; BPHTB.</p>
            <div className="dash-grid">
              {belajar.map((b) => (
                <Link key={b.kode} className="tile" href={`/belajar/${b.kode}`} style={{ '--c1': b.c1, '--c2': b.c2 }}>
                  <span className="tile-ico">{b.i}</span>
                  <span className="tile-body">
                    <h3>{b.nama}</h3>
                    <p>{b.deskripsi}</p>
                    <span className="badge tile-badge">{b.jml_materi} materi &middot; {b.jml_soal} soal</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {psikotest.length === 0 && belajar.length === 0 && (
          <section className="section">
            <p className="muted">Silakan <Link href="/login">masuk</Link> dengan akun Anda. Menu yang tersedia sesuai hak akses akun Anda.</p>
          </section>
        )}
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
