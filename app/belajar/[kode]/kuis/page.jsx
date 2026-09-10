import Link from 'next/link';
import Header from '@/components/Header';
import QuizRunner from '@/components/QuizRunner';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function BelajarKuis({ params }) {
  const user = await getSession();
  if (!user) redirect('/login?lanjut=/belajar');
  const { kode } = await params;
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/belajar">Akuntansi &amp; Pajak</Link> &raquo; <Link href={`/belajar/${kode}`}>{kode}</Link></div>
        <QuizRunner tipe="belajar" kode={kode} level="semua" kembali="/belajar" />
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
