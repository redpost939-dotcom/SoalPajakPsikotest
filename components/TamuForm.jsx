'use client';

import { useActionState } from 'react';
import { tamuAction } from '@/lib/actions';

export default function TamuForm() {
  const [state, action] = useActionState(tamuAction, null);
  return (
    <div className="quiz-start" id="mulai">
      <h2>Mulai Tanpa Daftar</h2>
      <p className="muted">Isi nama, umur, dan alamat — langsung buka semua menu latihan. Tanpa username &amp; password.</p>
      {state?.pesan && <div className="alert alert-error">{state.pesan}</div>}
      <form action={action}>
        <div className="form-row">
          <div className="form-group">
            <label>Nama Lengkap *</label>
            <input type="text" name="nama" required autoFocus maxLength={100} placeholder="cth: Budi Santoso" />
          </div>
          <div className="form-group">
            <label>Umur</label>
            <input type="number" name="umur" min="5" max="120" placeholder="cth: 25" />
          </div>
        </div>
        <div className="form-group">
          <label>Alamat</label>
          <input type="text" name="alamat" maxLength={255} placeholder="cth: Jl. Merdeka No. 10, Surabaya" />
        </div>
        <button className="btn btn-primary" type="submit">Masuk &amp; Mulai &rarr;</button>
      </form>
    </div>
  );
}
