import Link from 'next/link';
import Header from '@/components/Header';
import AdminNav from '@/components/AdminNav';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  const user = await getSession();
  if (!user || user.role !== 'admin') {
    redirect('/login?lanjut=/admin');
  }
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; Admin</div>
        {children}
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}

export function AdminShell({ aktif, children, judul }) {
  return (
    <section className="section">
      <div className="section-head"><h1>{judul}</h1></div>
      <AdminNav aktif={aktif} />
      {children}
    </section>
  );
}
