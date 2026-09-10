import Link from 'next/link';
import Header from '@/components/Header';
import QuizRunner from '@/components/QuizRunner';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function PsikotestKuis({ params, searchParams }) {
  const user = await getSession();
  if (!user) redirect('/login?lanjut=/psikotest');
  const { kode } = await params;
  const sp = await searchParams;
  const level = sp?.level || 'semua';
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/psikotest">Psikotest</Link> &raquo; <Link href={`/psikotest/${kode}`}>{kode}</Link></div>
        <QuizRunner tipe="psikotest" kode={kode} level={level} kembali="/psikotest" />
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
