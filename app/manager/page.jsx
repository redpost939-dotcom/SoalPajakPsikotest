import Link from 'next/link';
import Header from '@/components/Header';
import { getSession, canMenu } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Manager({ searchParams }) {
  const user = await getSession();
  if (!user || !(await canMenu(user, 'manager'))) redirect('/login?lanjut=/manager');
  const sp = await searchParams;
  const q = (sp?.q || '').trim();
  const tipe = sp?.tipe || '';
  const sql = db();

  const cari = '%' + q + '%';
  let daftar;
  if (q && tipe) {
    daftar = await sql`SELECT h.*, u.username, u.nama AS nama_user FROM hasil_test h
      LEFT JOIN users u ON u.id = h.user_id
      WHERE (u.username ILIKE ${cari} OR u.nama ILIKE ${cari} OR h.nama ILIKE ${cari} OR h.alamat ILIKE ${cari}) AND h.tipe = ${tipe}
      ORDER BY h.id DESC LIMIT 200`;
  } else if (q) {
    daftar = await sql`SELECT h.*, u.username, u.nama AS nama_user FROM hasil_test h
      LEFT JOIN users u ON u.id = h.user_id
      WHERE (u.username ILIKE ${cari} OR u.nama ILIKE ${cari} OR h.nama ILIKE ${cari} OR h.alamat ILIKE ${cari})
      ORDER BY h.id DESC LIMIT 200`;
  } else if (tipe) {
    daftar = await sql`SELECT h.*, u.username, u.nama AS nama_user FROM hasil_test h
      LEFT JOIN users u ON u.id = h.user_id
      WHERE h.tipe = ${tipe} ORDER BY h.id DESC LIMIT 200`;
  } else {
    daftar = await sql`SELECT h.*, u.username, u.nama AS nama_user FROM hasil_test h
      LEFT JOIN users u ON u.id = h.user_id ORDER BY h.id DESC LIMIT 200`;
  }
  const [kandidat, tes, rata] = await Promise.all([
    sql`SELECT COUNT(*)::int AS n FROM (SELECT DISTINCT COALESCE(user_id::text, 'tamu:' || LOWER(nama)) FROM hasil_test) s`,
    sql`SELECT COUNT(*)::int AS n FROM hasil_test`,
    sql`SELECT ROUND(AVG(skor),1) AS n FROM hasil_test`
  ]);

  const exq = new URLSearchParams();
  if (q) exq.set('q', q);
  if (tipe) exq.set('tipe', tipe);

  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; Manager</div>
        <section className="section">
          <div className="section-head"><h1>Dashboard Skor Kandidat</h1></div>
          <p className="muted">Semua skor tes peserta tersimpan di sini — dasar laporan untuk perusahaan.</p>
          <div className="stat-grid">
            <div className="stat"><b>{kandidat[0].n}</b><span>Kandidat</span></div>
            <div className="stat"><b>{tes[0].n}</b><span>Total Tes</span></div>
            <div className="stat"><b>{rata[0].n ?? 0}%</b><span>Rata-rata Skor</span></div>
          </div>
          <form className="filter-bar" method="get" action="/manager">
            <label>Cari kandidat:</label>
            <input name="q" defaultValue={q} placeholder="nama / username" style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '7px 10px' }} />
            <select name="tipe" defaultValue={tipe}>
              <option value="">Semua tipe</option>
              <option value="psikotest">Psikotest</option>
              <option value="belajar">Modul</option>
              <option value="latihan">Latihan</option>
            </select>
            <button className="btn btn-sm btn-outline" type="submit">Terapkan</button>
            <Link className="btn btn-sm btn-primary" href={`/api/manager/export?${exq.toString()}`}>Export CSV</Link>
          </form>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>No</th><th>Kandidat</th><th>Umur</th><th>Alamat</th><th>Tipe</th><th>Kategori</th><th>Benar</th><th>Skor</th><th>Tanggal</th></tr></thead>
              <tbody>
                {daftar.map((h, i) => (
                  <tr key={h.id}>
                    <td>{i + 1}</td>
                    <td>{h.nama_user || h.nama || h.username || '-'}</td>
                    <td>{h.umur ?? '-'}</td>
                    <td className="maxw">{h.alamat || '-'}</td>
                    <td><span className="badge">{h.tipe}</span></td>
                    <td className="maxw">{h.kategori}</td>
                    <td>{h.benar}/{h.total_soal}</td>
                    <td><b>{h.skor}%</b></td>
                    <td className="muted">{h.dibuat ? new Date(h.dibuat).toLocaleString('id-ID') : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
