import { AdminShell } from '../layout';
import { db } from '@/lib/db';
import { ubahRole, resetPassword, hapusUser } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function AdminUser() {
  const sql = db();
  const daftar = await sql`SELECT u.*, (SELECT COUNT(*)::int FROM hasil_test h WHERE h.user_id = u.id) AS jml_tes
    FROM users u ORDER BY u.id`;
  return (
    <AdminShell aktif="/admin/user" judul="Kelola User">
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>ID</th><th>Username</th><th>Nama</th><th>Role</th><th>Tes</th><th>Aksi</th></tr></thead>
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
                      {['admin', 'user', 'psikotest', 'akuntansi'].map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <button className="btn btn-sm btn-outline" type="submit">Ubah</button>
                  </form>
                </td>
                <td>{u.jml_tes}</td>
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
