import Link from 'next/link';
import Header from '@/components/Header';
import Ingatan from '@/components/Ingatan';
import { getSession, can } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function IngatanPage() {
  const user = await getSession();
  if (!user || !can(user, 'latihan')) redirect('/login?lanjut=/latihan/ingatan');
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/latihan">Latihan</Link> &raquo; Tes Daya Ingat</div>
        <section className="section">
          <div className="section-head"><h1>Tes Daya Ingat</h1></div>
          <p className="muted">Hafalkan deret angka yang tampil, lalu tulis ulang dari ingatan. 5 ronde, deret makin panjang (4–8 digit). Hasil tersimpan di riwayat.</p>
          <div className="mt"><Ingatan /></div>
        </section>
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
