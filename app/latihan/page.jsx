import Link from 'next/link';
import Header from '@/components/Header';
import { getSession, canMenu } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { warna } from '@/lib/visuals';

export const dynamic = 'force-dynamic';

const DAFTAR = [
  { kode: 'mengetik', nama: 'Tes Mengetik', deskripsi: 'Ketik teks Bahasa Indonesia selama 60 detik. Diukur kecepatan (kata per menit/WPM) dan akurasi pengetikan.', info: 'WPM + akurasi' },
  { kode: 'ingatan', nama: 'Tes Daya Ingat', deskripsi: 'Hafalkan deret angka yang tampil beberapa detik, lalu tulis ulang dari ingatan. Deret bertambah tiap ronde.', info: '5 ronde' },
  { kode: 'teliti', nama: 'Tes Ketelitian', deskripsi: 'Penjumlahan cepat ala tes koran Pauli/Kraepelin selama 60 detik. Melatih kecepatan dan akurasi berhitung.', info: '60 detik' },
  { kode: 'konsentrasi', nama: 'Tes Konsentrasi', deskripsi: 'Tes Stroop: pilih WARNA TINTA dari kata warna yang tampil selama 30 detik. Melatih fokus dan ketahanan terhadap distraksi.', info: '30 detik' }
];

export default async function LatihanIndex() {
  const user = await getSession();
  if (!user) redirect('/#mulai');
  if (!(await canMenu(user, 'latihan'))) redirect('/');
  const sql = db();
  const tb = await sql`SELECT kategori, MAX(skor) AS skor FROM hasil_test
    WHERE user_id = ${user.id} AND tipe = 'latihan' GROUP BY kategori`;
  const skorMap = Object.fromEntries(tb.map((t) => [t.kategori, Number(t.skor)]));
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; Latihan</div>
        <section className="section">
          <div className="section-head"><h1>Latihan Keterampilan</h1></div>
          <p className="muted">Latihan mandiri untuk menunjang daya ingat, fokus, dan ketelitian saat psikotest. Hasil tiap latihan tersimpan di <Link href="/riwayat">riwayat</Link>.</p>
          <div className="dash-grid">
            {DAFTAR.map((t) => {
              const w = warna(t.kode);
              return (
                <Link key={t.kode} className="tile" href={`/latihan/${t.kode}`} style={{ '--c1': w.c1, '--c2': w.c2 }}>
                  <span className="tile-ico">{w.i}</span>
                  <span className="tile-body">
                    <h3>{t.nama}</h3>
                    <p>{t.deskripsi}</p>
                    <span className="badge tile-badge">{t.info}</span>
                    {' '}
                    {skorMap[t.nama] !== undefined
                      ? <span className="badge ok">Terbaik: {skorMap[t.nama]}%</span>
                      : <span className="badge">Belum dicoba</span>}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
