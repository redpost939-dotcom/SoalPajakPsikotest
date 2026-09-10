import Link from 'next/link';
import { AdminShell } from '../../layout';
import KategoriForm from '@/components/KategoriForm';

export const dynamic = 'force-dynamic';

export default async function KategoriBaru() {
  return (
    <AdminShell aktif="/admin/kategori" judul="Kategori Baru">
      <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/admin">Admin</Link> &raquo; <Link href="/admin/kategori">Kategori</Link> &raquo; Baru</div>
      <KategoriForm kategori={null} />
    </AdminShell>
  );
}
