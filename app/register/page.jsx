import Header from '@/components/Header';
import RegisterForm from '@/components/RegisterForm';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const user = await getSession();
  if (user) redirect('/');
  return (
    <>
      <Header user={null} />
      <main className="wrap">
        <RegisterForm />
      </main>
      <footer>Bank Soal Psikotest &amp; Pajak</footer>
    </>
  );
}
