import Link from 'next/link';
import Header from '@/components/Header';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Riwayat() {
  const user = await getSession();
  if (!user) redirect('/login?lanjut=/riwayat');
  const sql = db();
  const daftar = await sql`SELECT * FROM hasil_test WHERE user_id = ${user.id} ORDER BY id DESC LIMIT 100`;
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; Riwayat Saya</div>
        <section className="section">
          <div className="section-head"><h1>Riwayat Tes Saya</h1></div>
          {daftar.length === 0 ? (
            <p className="muted">Belum ada tes yang dikerjakan. Mulai dari <Link href="/psikotest">Psikotest</Link> atau <Link href="/belajar">Akuntansi &amp; Pajak</Link>.</p>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>No</th><th>Jenis</th><th>Kategori</th><th>Level</th><th>Benar</th><th>Total</th><th>Skor</th><th>Tanggal</th></tr></thead>
                <tbody>
                  {daftar.map((h, i) => (
                    <tr key={h.id}>
                      <td>{i + 1}</td>
                      <td><span className={`badge ${h.tipe === 'psikotest' ? 'ok' : ''}`}>{h.tipe === 'psikotest' ? 'PSIKOTEST' : h.tipe === 'latihan' ? 'LATIHAN' : 'MODUL'}</span></td>
                      <td>{h.kategori}</td>
                      <td>{h.level}</td>
                      <td>{h.benar}</td>
                      <td>{h.total_soal}</td>
                      <td><b>{h.skor}%</b></td>
                      <td className="muted">{h.dibuat ? new Date(h.dibuat).toLocaleString('id-ID') : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
