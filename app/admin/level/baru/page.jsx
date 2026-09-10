import Link from 'next/link';
import { AdminShell } from '../../layout';
import LevelForm from '@/components/LevelForm';

export const dynamic = 'force-dynamic';

export default async function LevelBaru() {
  return (
    <AdminShell aktif="/admin/level" judul="Level Baru">
      <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/admin">Admin</Link> &raquo; <Link href="/admin/level">Level</Link> &raquo; Baru</div>
      <LevelForm level={null} />
    </AdminShell>
  );
}
