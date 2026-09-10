import Link from 'next/link';
import Header from '@/components/Header';
import TamuForm from '@/components/TamuForm';
import { getSession, canMenu } from '@/lib/auth';
import { db } from '@/lib/db';
import { warna } from '@/lib/visuals';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const user = await getSession();
  let psikotest = [];
  let belajar = [];
  let totalSoal = 0;
  let totalMateri = 0;
  let sayaStats = { tes: 0, rata: 0, rata_psi: 0 };

  if (user) {
    const sql = db();
    const [psiko, modul, stat, saya] = await Promise.all([
      sql`SELECT c.*, (SELECT COUNT(*)::int FROM questions q WHERE q.category_id = c.id) AS jml_soal
          FROM categories c WHERE c.tipe = 'psikotest' ORDER BY c.urutan`,
      sql`SELECT c.*,
            (SELECT COUNT(*)::int FROM questions q WHERE q.category_id = c.id) AS jml_soal,
            (SELECT COUNT(*)::int FROM materi m WHERE m.category_id = c.id) AS jml_materi
          FROM categories c WHERE c.tipe IN ('akuntansi','pajak') ORDER BY c.urutan`,
      sql`SELECT COUNT(*)::int AS total FROM questions`,
      sql`SELECT COUNT(*)::int AS tes, ROUND(AVG(skor),1) AS rata,
          ROUND(AVG(CASE WHEN tipe = 'psikotest' THEN skor END),1) AS rata_psi
        FROM hasil_test WHERE user_id = ${user.id}`
    ]);
    const [bolehPsi, bolehBel] = await Promise.all([canMenu(user, 'psikotest'), canMenu(user, 'belajar')]);
    if (bolehPsi) psikotest = psiko.map((k) => ({ ...k, ...warna(k.kode) }));
    if (bolehBel) belajar = modul.map((k) => ({ ...k, ...warna(k.kode) }));
    totalSoal = stat[0]?.total || 0;
    totalMateri = belajar.reduce((a, r) => a + Number(r.jml_materi || 0), 0);
    sayaStats = saya[0] || { tes: 0, rata: 0, rata_psi: 0 };
  }
  const totalKategori = psikotest.length + belajar.length;
  const latihan = user && (await canMenu(user, 'latihan')) ? [
    { kode: 'mengetik', nama: 'Tes Mengetik', deskripsi: 'Ketik teks 60 detik. Diukur kecepatan (WPM) dan akurasi.', info: 'WPM + akurasi', ...warna('mengetik') },
    { kode: 'ingatan', nama: 'Tes Daya Ingat', deskripsi: 'Hafalkan deret angka lalu tulis ulang. Melatih memori jangka pendek.', info: '5 ronde', ...warna('ingatan') },
    { kode: 'teliti', nama: 'Tes Ketelitian', deskripsi: 'Penjumlahan cepat gaya tes koran Pauli. Melatih kecepatan + akurasi.', info: '60 detik', ...warna('teliti') },
    { kode: 'konsentrasi', nama: 'Tes Konsentrasi', deskripsi: 'Tes Stroop: pilih warna tinta kata. Melatih fokus untuk psikotest.', info: '30 detik', ...warna('konsentrasi') }
  ] : [];

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

        {user && (
          <section className="section">
            <div className="section-head"><h2>Ringkasan Saya</h2><Link className="btn btn-outline" href="/riwayat">Riwayat &rarr;</Link></div>
            <div className="stat-grid">
              <div className="stat"><b>{sayaStats.tes}</b><span>Tes Dikerjakan</span></div>
              <div className="stat"><b>{sayaStats.rata ?? 0}%</b><span>Rata-rata Skor</span></div>
              <div className="stat"><b>{sayaStats.rata_psi ?? 0}%</b><span>Rata-rata Psikotest</span></div>
            </div>
            <div className="grid mt">
              {psikotest.length > 0 && <Link className="btn btn-primary" href="/psikotest">Mulai Psikotest &rarr;</Link>}
              {belajar.length > 0 && <Link className="btn btn-primary" href="/belajar">Belajar Akuntansi &amp; Pajak &rarr;</Link>}
              {latihan.length > 0 && <Link className="btn btn-primary" href="/latihan">Latihan Keterampilan &rarr;</Link>}
            </div>
          </section>
        )}

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

        {latihan.length > 0 && (
          <section className="section">
            <div className="section-head">
              <h2>Menu Latihan</h2>
              <Link className="btn btn-outline" href="/latihan">Lihat semua &rarr;</Link>
            </div>
            <p className="muted">Latihan keterampilan: mengetik, daya ingat, ketelitian, dan konsentrasi. Hasil tersimpan di riwayat.</p>
            <div className="dash-grid">
              {latihan.map((t) => (
                <Link key={t.kode} className="tile" href={`/latihan/${t.kode}`} style={{ '--c1': t.c1, '--c2': t.c2 }}>
                  <span className="tile-ico">{t.i}</span>
                  <span className="tile-body">
                    <h3>{t.nama}</h3>
                    <p>{t.deskripsi}</p>
                    <span className="badge tile-badge">{t.info}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {!user && (
          <section className="section">
            <TamuForm />
            <p className="muted mt">Staff (admin/manager)? <Link href="/login">Masuk di sini</Link>.</p>
          </section>
        )}
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
