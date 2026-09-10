'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { loginAction } from '@/lib/actions';

export default function LoginForm({ lanjut }) {
  const [state, action] = useActionState(loginAction, null);
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1>Masuk</h1>
        {state?.pesan && <div className="alert alert-error">{state.pesan}</div>}
        <form action={action}>
          <input type="hidden" name="lanjut" value={lanjut} />
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" required autoFocus />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <button className="btn btn-primary" type="submit">Masuk</button>
        </form>
        <p className="muted mt">Belum punya akun? <Link href="/register">Daftar di sini</Link></p>
      </div>
    </div>
  );
}
