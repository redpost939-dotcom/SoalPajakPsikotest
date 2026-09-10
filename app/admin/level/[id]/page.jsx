import Link from 'next/link';
import { AdminShell } from '../../layout';
import LevelForm from '@/components/LevelForm';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function LevelEdit({ params }) {
  const { id } = await params;
  const sql = db();
  const rows = await sql`SELECT * FROM roles WHERE id = ${Number(id)}`;
  if (rows.length === 0) notFound();
  return (
    <AdminShell aktif="/admin/level" judul="Edit Level">
      <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/admin">Admin</Link> &raquo; <Link href="/admin/level">Level</Link> &raquo; Edit</div>
      <LevelForm level={rows[0]} />
    </AdminShell>
  );
}
