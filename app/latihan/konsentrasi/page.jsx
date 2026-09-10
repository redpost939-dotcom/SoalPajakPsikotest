import Link from 'next/link';
import Header from '@/components/Header';
import Konsentrasi from '@/components/Konsentrasi';
import { getSession, canMenu } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function KonsentrasiPage() {
  const user = await getSession();
  if (!user || !(await canMenu(user, 'latihan'))) redirect('/login?lanjut=/latihan/konsentrasi');
  return (
    <>
      <Header user={user} />
      <main className="wrap">
        <div className="crumbs"><Link href="/">Beranda</Link> &raquo; <Link href="/latihan">Latihan</Link> &raquo; Tes Konsentrasi</div>
        <section className="section">
          <div className="section-head"><h1>Tes Konsentrasi</h1></div>
          <p className="muted">Tes Stroop 30 detik: pilih <b>warna tinta</b>, bukan arti katanya. Melatih fokus dan ketahanan distraksi untuk psikotest. Hasil tersimpan di riwayat.</p>
          <div className="mt"><Konsentrasi /></div>
        </section>
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
