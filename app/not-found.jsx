import Link from 'next/link';
import Header from '@/components/Header';
import { getSession } from '@/lib/auth';

export default async function NotFound() {
  const user = await getSession().catch(() => null);
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <section className="section">
          <h1>Halaman tidak ditemukan.</h1>
          <p className="mt"><Link className="btn" href="/">Kembali ke Beranda</Link></p>
        </section>
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
