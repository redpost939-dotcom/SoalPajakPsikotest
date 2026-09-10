import Link from 'next/link';
import { AdminShell } from '../layout';
import { db } from '@/lib/db';
import { hapusKategori } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function AdminKategori() {
  const sql = db();
  const daftar = await sql`SELECT c.*,
      (SELECT COUNT(*)::int FROM questions q WHERE q.category_id = c.id) AS jml_soal,
      (SELECT COUNT(*)::int FROM materi m WHERE m.category_id = c.id) AS jml_materi
    FROM categories c ORDER BY c.urutan`;
  return (
    <AdminShell aktif="/admin/kategori" judul="Kelola Kategori">
      <p><Link className="btn btn-primary" href="/admin/kategori/baru">+ Kategori Baru</Link></p>
      <div className="table-wrap mt">
        <table className="table">
          <thead><tr><th>ID</th><th>Tipe</th><th>Kode</th><th>Nama</th><th>Soal</th><th>Materi</th><th>Urutan</th><th>Aksi</th></tr></thead>
          <tbody>
            {daftar.map((k) => (
              <tr key={k.id}>
                <td>{k.id}</td>
                <td>{k.tipe}</td>
                <td>{k.kode}</td>
                <td className="maxw">{k.nama}</td>
                <td>{k.jml_soal}</td>
                <td>{k.jml_materi}</td>
                <td>{k.urutan}</td>
                <td>
                  <span className="actions">
                    <Link className="btn btn-sm btn-outline" href={`/admin/kategori/${k.id}`}>Edit</Link>
                    <form action={hapusKategori}>
                      <input type="hidden" name="id" value={k.id} />
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
