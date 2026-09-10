'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { registerAction } from '@/lib/actions';

export default function RegisterForm() {
  const [state, action] = useActionState(registerAction, null);
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1>Daftar Akun</h1>
        {state?.pesan && <div className="alert alert-error">{state.pesan}</div>}
        <form action={action}>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input type="text" name="nama" required autoFocus />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" required />
          </div>
          <div className="form-group">
            <label>Password (minimal 6 karakter)</label>
            <input type="password" name="password" required />
          </div>
          <div className="form-group">
            <label>Ulangi Password</label>
            <input type="password" name="password2" required />
          </div>
          <button className="btn btn-primary" type="submit">Daftar</button>
        </form>
        <p className="muted mt">Sudah punya akun? <Link href="/login">Masuk di sini</Link></p>
      </div>
    </div>
  );
}
