import { AdminShell } from './layout';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const sql = db();
  const [kategori, soal, materi, user, hasil, recent] = await Promise.all([
    sql`SELECT COUNT(*)::int AS n FROM categories`,
    sql`SELECT COUNT(*)::int AS n FROM questions`,
    sql`SELECT COUNT(*)::int AS n FROM materi`,
    sql`SELECT COUNT(*)::int AS n FROM users`,
    sql`SELECT COUNT(*)::int AS n FROM hasil_test`,
    sql`SELECT h.*, u.username FROM hasil_test h LEFT JOIN users u ON u.id = h.user_id ORDER BY h.id DESC LIMIT 10`
  ]);
  const stats = {
    kategori: kategori[0].n, soal: soal[0].n, materi: materi[0].n,
    user: user[0].n, hasil: hasil[0].n
  };
  return (
    <AdminShell aktif="/admin" judul="Panel Admin">
      <div className="stat-grid">
        <div className="stat"><b>{stats.kategori}</b><span>Kategori</span></div>
        <div className="stat"><b>{stats.soal}</b><span>Soal</span></div>
        <div className="stat"><b>{stats.materi}</b><span>Materi</span></div>
        <div className="stat"><b>{stats.user}</b><span>User</span></div>
        <div className="stat"><b>{stats.hasil}</b><span>Hasil Tes</span></div>
      </div>
      <h2 className="mt">Hasil Terbaru</h2>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>ID</th><th>User</th><th>Tipe</th><th>Kategori</th><th>Skor</th><th>Tanggal</th></tr></thead>
          <tbody>
            {recent.map((h) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.username || '-'}</td>
                <td>{h.tipe}</td>
                <td className="maxw">{h.kategori}</td>
                <td><b>{h.skor}%</b></td>
                <td className="muted">{h.dibuat ? new Date(h.dibuat).toLocaleString('id-ID') : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
