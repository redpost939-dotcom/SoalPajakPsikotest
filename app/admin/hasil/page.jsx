import { AdminShell } from '../layout';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminHasil({ searchParams }) {
  const sp = await searchParams;
  const filter = sp?.tipe || '';
  const sql = db();
  const daftar = filter
    ? await sql`SELECT h.*, u.username FROM hasil_test h LEFT JOIN users u ON u.id = h.user_id
        WHERE h.tipe = ${filter} ORDER BY h.id DESC LIMIT 200`
    : await sql`SELECT h.*, u.username FROM hasil_test h LEFT JOIN users u ON u.id = h.user_id
        ORDER BY h.id DESC LIMIT 200`;
  return (
    <AdminShell aktif="/admin/hasil" judul="Hasil Tes">
      <form className="filter-bar" method="get" action="/admin/hasil">
        <label>Filter tipe:</label>
        <select name="tipe" defaultValue={filter}>
          <option value="">Semua</option>
          <option value="psikotest">Psikotest</option>
          <option value="belajar">Modul</option>
        </select>
        <button className="btn btn-sm btn-outline" type="submit">Terapkan</button>
      </form>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>ID</th><th>User</th><th>Tipe</th><th>Kategori</th><th>Level</th><th>Benar</th><th>Total</th><th>Skor</th><th>Tanggal</th></tr></thead>
          <tbody>
            {daftar.map((h) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.username || '-'}</td>
                <td>{h.tipe}</td>
                <td className="maxw">{h.kategori}</td>
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
    </AdminShell>
  );
}
