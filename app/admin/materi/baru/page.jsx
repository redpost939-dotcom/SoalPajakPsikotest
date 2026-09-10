import Link from 'next/link';
import { AdminShell } from '../../layout';
import MateriForm from '@/components/MateriForm';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function MateriBaru() {
  const sql = db();
  const kategoris = await sql`SELECT id, kode, nama, tipe FROM categories ORDER BY urutan`;
  return (
    <AdminShell aktif="/admin/materi" judul="Materi Baru">
      <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/admin">Admin</Link> &raquo; <Link href="/admin/materi">Materi</Link> &raquo; Baru</div>
      <MateriForm materi={null} kategoris={kategoris} />
    </AdminShell>
  );
}
