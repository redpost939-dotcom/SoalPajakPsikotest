import Link from 'next/link';
import { AdminShell } from '../layout';
import { getAllRoles } from '@/lib/roles';
import { hapusLevel } from '@/lib/actions';
import { MENU_LABEL } from '@/lib/menus';

export const dynamic = 'force-dynamic';

export default async function AdminLevel() {
  const daftar = await getAllRoles();
  return (
    <AdminShell aktif="/admin/level" judul="Master Level Manager">
      <p><Link className="btn btn-primary" href="/admin/level/baru">+ Level Baru</Link></p>
      <div className="table-wrap mt">
        <table className="table">
          <thead><tr><th>ID</th><th>Kode</th><th>Nama</th><th>Hak Akses</th><th>User</th><th>Aksi</th></tr></thead>
          <tbody>
            {daftar.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td><span className="badge">{r.kode}</span></td>
                <td>{r.nama}</td>
                <td className="maxw">{(r.menus || []).map((m) => MENU_LABEL[m] || m).join(', ')}</td>
                <td>{r.jml_user}</td>
                <td>
                  <span className="actions">
                    <Link className="btn btn-sm btn-outline" href={`/admin/level/${r.id}`}>Edit</Link>
                    {r.kode !== 'admin' && (
                      <form action={hapusLevel}>
                        <input type="hidden" name="id" value={r.id} />
                        <button className="btn btn-sm btn-danger" type="submit">Hapus</button>
                      </form>
                    )}
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
