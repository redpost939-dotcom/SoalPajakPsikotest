import Link from 'next/link';
import { canMenu } from '@/lib/roles';

export default async function Header({ user }) {
  const [psikotest, belajar, latihan, admin, manager] = user
    ? await Promise.all([
        canMenu(user, 'psikotest'),
        canMenu(user, 'belajar'),
        canMenu(user, 'latihan'),
        canMenu(user, 'admin'),
        canMenu(user, 'manager')
      ])
    : [false, false, false, false, false];
  return (
    <header className="topbar">
      <div className="wrap topbar-in">
        <Link className="brand" href="/">BankSoal <span>Psikotest &amp; Pajak</span></Link>
        <nav>
          {user && psikotest && <Link href="/psikotest">Psikotest</Link>}
          {user && belajar && <Link href="/belajar">Akuntansi &amp; Pajak</Link>}
          {user && latihan && <Link href="/latihan">Latihan</Link>}
          {user ? (
            <>
              <Link href="/riwayat">Riwayat</Link>
              {manager && <Link href="/manager">Manager</Link>}
              {admin && <Link href="/admin" className="nav-admin">Admin</Link>}
              <span className="nav-user">{user.nama} ({user.username})</span>
              <Link href="/logout">Keluar</Link>
            </>
          ) : (
            <>
              <Link href="/login">Masuk</Link>
              <Link href="/register">Daftar</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
