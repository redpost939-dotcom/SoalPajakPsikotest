import Link from 'next/link';
import { AdminShell } from '../layout';
import { db } from '@/lib/db';
import { hapusMateri } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function AdminMateri() {
  const sql = db();
  const daftar = await sql`SELECT m.id, m.judul, m.urutan, c.kode AS kategori, c.nama AS kategori_nama
    FROM materi m JOIN categories c ON c.id = m.category_id ORDER BY c.urutan, m.urutan`;
  return (
    <AdminShell aktif="/admin/materi" judul="Kelola Materi">
      <p><Link className="btn btn-primary" href="/admin/materi/baru">+ Materi Baru</Link></p>
      <div className="table-wrap mt">
        <table className="table">
          <thead><tr><th>ID</th><th>Kategori</th><th>Urutan</th><th>Judul</th><th>Aksi</th></tr></thead>
          <tbody>
            {daftar.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.kategori}</td>
                <td>{m.urutan}</td>
                <td className="maxw">{m.judul}</td>
                <td>
                  <span className="actions">
                    <Link className="btn btn-sm btn-outline" href={`/admin/materi/${m.id}`}>Edit</Link>
                    <form action={hapusMateri}>
                      <input type="hidden" name="id" value={m.id} />
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
