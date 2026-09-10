import Link from 'next/link';

const ITEMS = [
  ['/admin', 'Dashboard'],
  ['/admin/kategori', 'Kategori'],
  ['/admin/soal', 'Soal'],
  ['/admin/materi', 'Materi'],
  ['/admin/user', 'User'],
  ['/admin/hasil', 'Hasil']
];

export default function AdminNav({ aktif }) {
  return (
    <nav className="admin-nav">
      {ITEMS.map(([href, label]) => (
        <Link key={href} href={href} className={aktif === href ? 'on' : ''}>{label}</Link>
      ))}
    </nav>
  );
}
