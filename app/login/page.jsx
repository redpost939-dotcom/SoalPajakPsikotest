import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage({ searchParams }) {
  const user = await getSession();
  if (user) redirect('/');
  const sp = await searchParams;
  const lanjut = sp?.lanjut && String(sp.lanjut).startsWith('/') ? String(sp.lanjut) : '/';
  return (
    <>
      <Header user={null} />
      <main className="wrap">
        <LoginForm lanjut={lanjut} />
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
