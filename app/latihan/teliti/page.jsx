import Link from 'next/link';
import Header from '@/components/Header';
import Teliti from '@/components/Teliti';
import { getSession, can } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function TelitiPage() {
  const user = await getSession();
  if (!user || !can(user, 'latihan')) redirect('/login?lanjut=/latihan/teliti');
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/latihan">Latihan</Link> &raquo; Tes Ketelitian</div>
        <section className="section">
          <div className="section-head"><h1>Tes Ketelitian</h1></div>
          <p className="muted">Jawab penjumlahan sederhana secepat dan setepat mungkin selama 60 detik (gaya tes koran Pauli/Kraepelin). Hasil tersimpan di riwayat.</p>
          <div className="mt"><Teliti /></div>
        </section>
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
