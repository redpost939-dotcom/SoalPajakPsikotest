import Link from 'next/link';
import { can } from '@/lib/roles';

export default function Header({ user }) {
  return (
    <header className="topbar">
      <div className="wrap topbar-in">
        <Link className="brand" href="/">BankSoal <span>Psikotest &amp; Pajak</span></Link>
        <nav>
          {user && can(user, 'psikotest') && <Link href="/psikotest">Psikotest</Link>}
          {user && can(user, 'belajar') && <Link href="/belajar">Akuntansi &amp; Pajak</Link>}
          {user ? (
            <>
              <Link href="/riwayat">Riwayat</Link>
              {can(user, 'admin') && <Link href="/admin" className="nav-admin">Admin</Link>}
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
