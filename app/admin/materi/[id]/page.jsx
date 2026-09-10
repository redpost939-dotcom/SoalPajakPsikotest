import Link from 'next/link';
import { AdminShell } from '../../layout';
import MateriForm from '@/components/MateriForm';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function MateriEdit({ params }) {
  const { id } = await params;
  const sql = db();
  const rows = await sql`SELECT * FROM materi WHERE id = ${Number(id)}`;
  if (rows.length === 0) notFound();
  const kategoris = await sql`SELECT id, kode, nama, tipe FROM categories ORDER BY urutan`;
  return (
    <AdminShell aktif="/admin/materi" judul="Edit Materi">
      <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/admin">Admin</Link> &raquo; <Link href="/admin/materi">Materi</Link> &raquo; Edit</div>
      <MateriForm materi={rows[0]} kategoris={kategoris} />
    </AdminShell>
  );
}
