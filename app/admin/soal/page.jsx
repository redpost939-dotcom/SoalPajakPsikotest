import Link from 'next/link';
import { AdminShell } from '../layout';
import { db } from '@/lib/db';
import { hapusSoal } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function AdminSoal({ searchParams }) {
  const sp = await searchParams;
  const filter = sp?.kategori || '';
  const sql = db();
  const daftar = filter
    ? await sql`SELECT q.id, q.pertanyaan, q.level, q.kunci, c.kode AS kategori, c.nama AS kategori_nama
        FROM questions q JOIN categories c ON c.id = q.category_id
        WHERE c.kode = ${filter} ORDER BY c.urutan, q.nomor_urutan`
    : await sql`SELECT q.id, q.pertanyaan, q.level, q.kunci, c.kode AS kategori, c.nama AS kategori_nama
        FROM questions q JOIN categories c ON c.id = q.category_id
        ORDER BY c.urutan, q.nomor_urutan`;
  const kategoris = await sql`SELECT id, kode, nama, tipe FROM categories ORDER BY urutan`;
  return (
    <AdminShell aktif="/admin/soal" judul="Kelola Soal">
      <p><Link className="btn btn-primary" href="/admin/soal/baru">+ Soal Baru</Link></p>
      <form className="filter-bar" method="get" action="/admin/soal">
        <label>Filter kategori:</label>
        <select name="kategori" defaultValue={filter}>
          <option value="">Semua</option>
          {kategoris.map((k) => <option key={k.kode} value={k.kode}>{k.kode} - {k.nama}</option>)}
        </select>
        <button className="btn btn-sm btn-outline" type="submit">Terapkan</button>
      </form>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>ID</th><th>Kategori</th><th>Level</th><th>Pertanyaan</th><th>Kunci</th><th>Aksi</th></tr></thead>
          <tbody>
            {daftar.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.kategori}</td>
                <td>{s.level}</td>
                <td className="maxw">{String(s.pertanyaan).slice(0, 80)}</td>
                <td>{s.kunci}</td>
                <td>
                  <span className="actions">
                    <Link className="btn btn-sm btn-outline" href={`/admin/soal/${s.id}`}>Edit</Link>
                    <form action={hapusSoal}>
                      <input type="hidden" name="id" value={s.id} />
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
