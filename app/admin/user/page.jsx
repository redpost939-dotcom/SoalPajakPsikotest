import { AdminShell } from '../layout';
import { db } from '@/lib/db';
import { getRoleMap } from '@/lib/roles';
import { ubahRole, resetPassword, hapusUser } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function AdminUser({ searchParams }) {
  const sp = await searchParams;
  const q = (sp?.q || '').trim();
  const sql = db();
  const daftar = q
    ? await sql`SELECT u.*, (SELECT COUNT(*)::int FROM hasil_test h WHERE h.user_id = u.id) AS jml_tes,
        (SELECT ROUND(AVG(skor),1) FROM hasil_test h WHERE h.user_id = u.id) AS rata
      FROM users u WHERE (u.username ILIKE ${'%' + q + '%'} OR u.nama ILIKE ${'%' + q + '%'}) ORDER BY u.id`
    : await sql`SELECT u.*, (SELECT COUNT(*)::int FROM hasil_test h WHERE h.user_id = u.id) AS jml_tes,
        (SELECT ROUND(AVG(skor),1) FROM hasil_test h WHERE h.user_id = u.id) AS rata
      FROM users u ORDER BY u.id`;
  const roles = await getRoleMap();
  const roleList = Object.entries(roles).map(([kode, r]) => ({ kode, nama: r.nama }));
  return (
    <AdminShell aktif="/admin/user" judul="Master User">
      <form className="filter-bar" method="get" action="/admin/user">
        <label>Cari user:</label>
        <input name="q" defaultValue={q} placeholder="nama / username" style={{ border: '1px solid var(--line)', borderRadius: 8, padding: '7px 10px' }} />
        <button className="btn btn-sm btn-outline" type="submit">Cari</button>
      </form>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>ID</th><th>Username</th><th>Nama</th><th>Level</th><th>Tes</th><th>Rata2</th><th>Aksi</th></tr></thead>
          <tbody>
            {daftar.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.nama}</td>
                <td>
                  <form action={ubahRole} className="actions">
                    <input type="hidden" name="id" value={u.id} />
                    <select name="role" defaultValue={u.role}>
                      {roleList.map((r) => <option key={r.kode} value={r.kode}>{r.kode} - {r.nama}</option>)}
                    </select>
                    <button className="btn btn-sm btn-outline" type="submit">Ubah</button>
                  </form>
                </td>
                <td>{u.jml_tes}</td>
                <td>{u.rata ?? 0}%</td>
                <td>
                  <span className="actions">
                    <form action={resetPassword}>
                      <input type="hidden" name="id" value={u.id} />
                      <input type="hidden" name="password" value="user123" />
                      <button className="btn btn-sm btn-outline" type="submit">Reset PW</button>
                    </form>
                    <form action={hapusUser}>
                      <input type="hidden" name="id" value={u.id} />
                      <button className="btn btn-sm btn-danger" type="submit">Hapus</button>
                    </form>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
