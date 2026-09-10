import Link from 'next/link';
import { AdminShell } from '../../layout';
import KategoriForm from '@/components/KategoriForm';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function KategoriEdit({ params }) {
  const { id } = await params;
  const sql = db();
  const rows = await sql`SELECT * FROM categories WHERE id = ${Number(id)}`;
  if (rows.length === 0) notFound();
  return (
    <AdminShell aktif="/admin/kategori" judul="Edit Kategori">
      <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/admin">Admin</Link> &raquo; <Link href="/admin/kategori">Kategori</Link> &raquo; Edit</div>
      <KategoriForm kategori={rows[0]} />
    </AdminShell>
  );
}
