'use client';

import Link from 'next/link';
import Header from '@/components/Header';

export default function ErrorPage() {
  return (
    <>
      <Header user={null} />
      <main className="wrap">
        <section className="section">
          <h1>Terjadi Kesalahan</h1>
          <p className="muted">Maaf, terjadi kesalahan. Silakan coba lagi atau kembali ke beranda.</p>
          <p className="mt"><Link className="btn" href="/">Kembali ke Beranda</Link></p>
        </section>
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
