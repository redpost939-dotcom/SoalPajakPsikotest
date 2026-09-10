import Link from 'next/link';
import Header from '@/components/Header';
import Mengetik from '@/components/Mengetik';
import { getSession, can } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function MengetikPage() {
  const user = await getSession();
  if (!user || !can(user, 'latihan')) redirect('/login?lanjut=/latihan/mengetik');
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/latihan">Latihan</Link> &raquo; Tes Mengetik</div>
        <section className="section">
          <div className="section-head"><h1>Tes Mengetik</h1></div>
          <p className="muted">Ketik ulang teks di bawah secepat dan setepat mungkin dalam 60 detik. Hasil (WPM + akurasi) tersimpan di riwayat.</p>
          <div className="mt"><Mengetik /></div>
        </section>
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
