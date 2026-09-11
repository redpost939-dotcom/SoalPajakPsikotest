'use client';

import { hapusTamuLocal } from '@/lib/tamu-local';

export default function LogoutLink() {
  function keluar(e) {
    e.preventDefault();
    hapusTamuLocal();
    window.location.href = '/logout';
  }
  return (
    <a href="/logout" onClick={keluar}>Keluar</a>
  );
}
