import Link from 'next/link';
import { AdminShell } from '../../layout';
import SoalForm from '@/components/SoalForm';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function SoalBaru() {
  const sql = db();
  const kategoris = await sql`SELECT id, kode, nama, tipe FROM categories ORDER BY urutan`;
  return (
    <AdminShell aktif="/admin/soal" judul="Soal Baru">
      <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/admin">Admin</Link> &raquo; <Link href="/admin/soal">Soal</Link> &raquo; Baru</div>
      <SoalForm soal={null} kategoris={kategoris} />
    </AdminShell>
  );
}
